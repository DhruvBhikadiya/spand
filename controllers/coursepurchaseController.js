const Coursepurchases = require('../models/coursepurchaseModel');

exports.createCoursepurchase = async (req, res) => {
  try {
    const result = await Coursepurchases.create(req.body);
    res.status(201).json({ message: 'Coursepurchase created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Coursepurchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCoursepurchases = async (req, res) => {
  try {
    const results = await Coursepurchases.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Coursepurchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCoursepurchasesByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Coursepurchases.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Coursepurchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCourseByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Coursepurchases.getByUserId(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Coursepurchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateCoursepurchase = async (req, res) => {
  const id = req.params.id;
  try {
    await Coursepurchases.update(id, req.body);
    res.status(200).json({ message: 'Coursepurchase updated' });
  } catch (err) {
    console.error('Error updating Coursepurchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCoursepurchase = async (req, res) => {
  const id = req.params.id;
  try {
    await Coursepurchases.delete(id,req.userDetails);
    res.status(200).json({ message: 'Coursepurchase deleted' });
  } catch (err) {
    console.error('Error deleting Coursepurchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
