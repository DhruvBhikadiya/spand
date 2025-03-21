const AboutUss = require('../models/aboutusModel');

exports.createAboutUs = async (req, res) => {
    try {
        const result = await AboutUss.create(req.body);
        res.status(201).json({ message: 'AboutUs created', id: result.insertId });
    } catch (err) {
        console.error('Error creating AboutUs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllAboutUss = async (req, res) => {
    try {
        const results = await AboutUss.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching AboutUss:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateAboutUs = async (req, res) => {
    const id = req.params.id;
    try {
        await AboutUss.update(id, req.body,req.userDetails);
        res.status(200).json({ message: 'AboutUs updated' });
    } catch (err) {
        console.error('Error updating AboutUs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAboutUs = async (req, res) => {
    const id = req.params.id;
    try {
        await AboutUss.delete(id);
        res.status(200).json({ message: 'AboutUs deleted' });
    } catch (err) {
        console.error('Error deleting AboutUs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};