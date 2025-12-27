const SubService = require("../models/subServiceModel.js");
const Category = require("../models/Category.js");

exports.createSubService = async (req, res) => {
    try {
        const { name, icon, price, description, duration, categoryId } = req.body;

        const sub = await SubService.create({
            name, icon, price, description, duration, categoryId
        });

        // Add subservice inside category
        await Category.findByIdAndUpdate(categoryId, { $push: { subServices: sub._id } });

        res.json({ message: "Sub-service created", sub });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSubServicesByCategory = async (req, res) => {
    try {
        const subservices = await SubService.find({ categoryId: req.params.id });
        res.json({ subservices });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
