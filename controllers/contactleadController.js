const Contactleads = require('../models/contactleadModel');

exports.createContactlead = async (req, res) => {
  try {
    const result = await Contactleads.create(req.body);
    res.status(201).json({ message: 'Contactlead created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Contactlead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllContactleads = async (req, res) => {
  try {
    const results = await Contactleads.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Contactleads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllContactleadsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Contactleads.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Contactleads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateContactlead = async (req, res) => {
  const id = req.params.id;
  try {
    await Contactleads.update(id, req.body);
    res.status(200).json({ message: 'Contactlead updated' });
  } catch (err) {
    console.error('Error updating Contactlead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteContactlead = async (req, res) => {
  const id = req.params.id;
  try {
    await Contactleads.delete(id,req.userDetails);
    res.status(200).json({ message: 'Contactlead deleted' });
  } catch (err) {
    console.error('Error deleting Contactlead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
