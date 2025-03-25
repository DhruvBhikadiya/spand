const Paymentsettings = require('../models/paymentsettingModel');

exports.createPaymentsetting = async (req, res) => {
    try {
        const result = await Paymentsettings.create(req.body);
        res.status(201).json({ message: 'Paymentsetting created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Paymentsetting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllPaymentsettings = async (req, res) => {
    try {
        const results = await Paymentsettings.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Paymentsettings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePaymentsetting = async (req, res) => {
    const id = req.params.id;
    try {
        await Paymentsettings.update(id, req.body,req.userDetails);
        res.status(200).json({ message: 'Paymentsetting updated' });
    } catch (err) {
        console.error('Error updating Paymentsetting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePaymentsetting = async (req, res) => {
    const id = req.params.id;
    try {
        await Paymentsettings.delete(id);
        res.status(200).json({ message: 'Paymentsetting deleted' });
    } catch (err) {
        console.error('Error deleting Paymentsetting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};