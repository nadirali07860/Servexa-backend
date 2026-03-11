const slotRelease = require('../../modules/slotLock/slotRelease.service');
const { runTechnicianGuard } = require('../../services/technicianAutoGuard.service');
const { retryDispatch } = require('../../services/dispatchRetry.service');

const { calculateDemandHeatmap } = require('../../services/demandHeatmap.service');

const { predictDemand } = require('../../services/demandPrediction.service');
const { triggerIncentives } = require('../../services/technicianIncentive.service');
const { suggestRelocation } = require('../../services/technicianRelocation.service');

const pool = require('../database');

function startCron() {

  console.log("🚀 Enterprise Cron Engine Started");


  /*
  SLOT LOCK CLEANUP
  */

  setInterval(async () => {

    try {

      await slotRelease.releaseExpiredLocks();

    } catch (err) {

      console.error("Slot release cron failed:", err);

    }

  }, 30000);



  /*
  TECHNICIAN GUARD AI
  */

  setInterval(async () => {

    try {

      await runTechnicianGuard();

      console.log("Technician guard check executed");

    } catch (err) {

      console.error("Technician guard cron failed:", err);

    }

  }, 3600000);



  /*
  AUTO REASSIGNMENT ENGINE
  */

  setInterval(async () => {

    try {

      const stuckBookings = await pool.query(`
        SELECT id
        FROM bookings
        WHERE status = 'ASSIGNED'
        AND created_at < NOW() - INTERVAL '2 minutes'
      `);

      for (const b of stuckBookings.rows) {

        await retryDispatch(b.id);

      }

      if (stuckBookings.rows.length) {

        console.log("Auto dispatch retry executed");

      }

    } catch (err) {

      console.error("Dispatch retry cron failed:", err);

    }

  }, 60000);



  /*
  TECHNICIAN ACCEPTANCE AI
  */

  setInterval(async () => {

    try {

      const expired = await pool.query(`
        SELECT id
        FROM bookings
        WHERE status = 'ASSIGNED'
        AND created_at < NOW() - INTERVAL '1 minute'
      `);

      for (const booking of expired.rows) {

        await pool.query(`
          UPDATE bookings
          SET status = 'REJECTED'
          WHERE id = $1
        `,[booking.id]);

        await retryDispatch(booking.id);

      }

      if (expired.rows.length) {

        console.log("Acceptance AI triggered");

      }

    } catch (err) {

      console.error("Acceptance AI cron failed:", err);

    }

  }, 60000);



  /*
  LEVEL-5 DEMAND HEATMAP ENGINE
  */

  setInterval(async () => {

    try {

      await calculateDemandHeatmap();

      console.log("Demand heatmap updated");

    } catch (err) {

      console.error("Heatmap engine failed:", err);

    }

  }, 300000);



  /*
  LEVEL-6 SURGE DETECTION ENGINE
  */

  setInterval(async () => {

    try {

      const demand = await pool.query(`
        SELECT society_id, COUNT(*) as bookings
        FROM bookings
        WHERE created_at > NOW() - INTERVAL '10 minutes'
        GROUP BY society_id
      `);

      for (const row of demand.rows) {

        if (parseInt(row.bookings) > 10) {

          console.log("🔥 Surge detected in society:", row.society_id);

        }

      }

    } catch (err) {

      console.error("Surge engine failed:", err);

    }

  }, 300000);



  /*
  LEVEL-6 SYSTEM HEALTH WATCHDOG
  */

  setInterval(async () => {

    try {

      const stuck = await pool.query(`
        SELECT COUNT(*) as pending
        FROM bookings
        WHERE status IN ('CREATED','ASSIGNED')
      `);

      if (parseInt(stuck.rows[0].pending) > 50) {

        console.warn("⚠️ Dispatch congestion detected");

      }

    } catch (err) {

      console.error("System watchdog failed:", err);

    }

  }, 300000);



  /*
  LEVEL-7 DEMAND PREDICTION
  */

  setInterval(async () => {

    try {

      await predictDemand();

      console.log("Demand prediction updated");

    } catch (err) {

      console.error("Demand prediction failed", err);

    }

  }, 600000);



  /*
  LEVEL-7 TECHNICIAN INCENTIVE ENGINE
  */

  setInterval(async () => {

    try {

      await triggerIncentives();

    } catch (err) {

      console.error("Incentive engine failed", err);

    }

  }, 600000);



  /*
  LEVEL-7 TECHNICIAN RELOCATION AI
  */

  setInterval(async () => {

    try {

      await suggestRelocation();

    } catch (err) {

      console.error("Relocation AI failed", err);

    }

  }, 600000);

}

module.exports = startCron;
