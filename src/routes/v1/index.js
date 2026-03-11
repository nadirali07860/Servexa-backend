const express = require('express');
const router = express.Router();

/*
=====================================
MODULE IMPORTS
=====================================
*/

/* Auth */
const authRoutes = require('../../modules/auth/auth.routes');

/* Users */
const userRoutes = require('../../modules/users/user.routes');

/* Technician */
const technicianRoutes = require('../../modules/technician/technician.routes');
const technicianProtectedRoutes = require('../../modules/technician/technician.protected.routes');
const technicianWalletRoutes = require('../../modules/technician/technician.wallet.routes');
const technicianLocationRoutes = require('../../modules/technician/technician.location.routes');
const technicianStatusRoutes = require('../../modules/technician/technician.status.routes');

/* Bookings */
const bookingRoutes = require('../../modules/bookings/booking.routes');
const bookingHistoryRoutes = require('../../modules/bookings/history/booking.history.routes');

/* Refund */
const refundRoutes = require('../../modules/refunds/refund.routes');

/* Withdraw */
const withdrawRoutes = require('../../modules/withdraw/withdraw.routes');

/* Ratings */
const ratingRoutes = require('../../modules/ratings/rating.routes');

/* Admin */
const adminSettingsRoutes = require('../../modules/admin/admin.settings.routes');
const adminDashboardRoutes = require('../../modules/admin/admin.dashboard.routes');
const adminBookingsRoutes = require('../../modules/admin/admin.bookings.routes');
const adminCustomersRoutes = require('../../modules/admin/admin.customers.routes');
const adminTechniciansRoutes = require('../../modules/admin/admin.technicians.routes');
const adminUsersRoutes = require('../../modules/admin/admin.users.routes');
const adminEarningsRoutes = require('../../modules/admin/admin.earnings.routes');
const adminWalletRoutes = require('../../modules/admin/admin.wallet.routes');

/* Service Availability */
const serviceAvailabilityRoutes = require('../../modules/serviceAvailability/serviceAvailability.routes');

/* Technician Schedule */
const technicianScheduleRoutes = require('../../modules/technicianSchedule/technicianSchedule.routes');

/* Slot Booking */
const slotRoutes = require('../../modules/slotBooking/slot.routes');

/* Slot Lock */
const slotLockRoutes = require('../../modules/slotLock/slotLock.routes');

/* Cancellation */
const cancellationRoutes = require('../../modules/cancellation/cancellation.routes');

/* Reschedule */
const rescheduleRoutes = require('../../modules/reschedule/reschedule.routes');

/* Analytics */
const analyticsRoutes = require('../../modules/analytics/analytics.routes');

/* Services */
const servicesRoutes = require('../../modules/services/services.routes');

/* Customer */
const customerProfileRoutes = require('../../modules/customer/customer.profile.routes');

/* Notifications */
const notificationRoutes = require('../../modules/notifications/notification.routes');

/* Dispatch */
const dispatchRoutes = require('../../modules/dispatch/dispatch.routes');

/* System */
const systemRoutes = require('../../modules/system/system.routes');

/* SaaS Platform */
const saasRoutes = require('../../modules/saas/saas.routes');

/*
=====================================
ROUTE MOUNTING
=====================================
*/

/* Auth */
router.use('/auth', authRoutes);

/* Users */
router.use('/users', userRoutes);

/* Technician */
router.use('/technician', technicianRoutes);
router.use('/technician', technicianProtectedRoutes);
router.use('/technician', technicianWalletRoutes);
router.use('/technician', technicianLocationRoutes);
router.use('/technician', technicianStatusRoutes);

/* Bookings */
router.use('/bookings', bookingRoutes);
router.use('/bookings/history', bookingHistoryRoutes);

/* Refund */
router.use('/refunds', refundRoutes);

/* Withdraw */
router.use('/withdraw', withdrawRoutes);

/* Ratings */
router.use('/ratings', ratingRoutes);

/* Admin */
router.use('/admin', adminSettingsRoutes);
router.use('/admin', adminDashboardRoutes);
router.use('/admin/bookings', adminBookingsRoutes);
router.use('/admin/customers', adminCustomersRoutes);
router.use('/admin/technicians', adminTechniciansRoutes);
router.use('/admin/users', adminUsersRoutes);
router.use('/admin/earnings', adminEarningsRoutes);
router.use('/admin', adminWalletRoutes);

/* Service Availability */
router.use('/service-availability', serviceAvailabilityRoutes);

/* Technician Schedule */
router.use('/technician-schedule', technicianScheduleRoutes);

/* Slot Booking */
router.use('/slots', slotRoutes);

/* Slot Lock */
router.use('/slot-lock', slotLockRoutes);

/* Cancellation */
router.use('/cancellation', cancellationRoutes);

/* Reschedule */
router.use('/reschedule', rescheduleRoutes);

/* Analytics */
router.use('/analytics', analyticsRoutes);

/* Services */
router.use('/services', servicesRoutes);

/* Customer */
router.use('/customer', customerProfileRoutes);

/* Notifications */
router.use('/notifications', notificationRoutes);

/* Dispatch */
router.use('/dispatch', dispatchRoutes);

/* System */
router.use('/system', systemRoutes);

/* SaaS */
router.use('/saas', saasRoutes);

module.exports = router;
