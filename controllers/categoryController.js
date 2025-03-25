const Categorys = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const result = await Categorys.create(req.body);
    res.status(201).json({ message: 'Category created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCategorys = async (req, res) => {
  try {
    const results = await Categorys.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Categorys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCategorysByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Categorys.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Categorys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await Categorys.update(id, req.body);
    res.status(200).json({ message: 'Category updated' });
  } catch (err) {
    console.error('Error updating Category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await Categorys.delete(id,req.userDetails);
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Error deleting Category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
