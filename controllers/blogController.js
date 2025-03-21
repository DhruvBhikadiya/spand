const Blogs = require('../models/blogModel');

exports.createBlog = async (req, res) => {
  try {
    const result = await Blogs.create(req.body);
    res.status(201).json({ message: 'Blog created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const results = await Blogs.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Blogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBlogsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Blogs.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Blogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Blogs.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Blogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blogs.update(id, req.body);
    res.status(200).json({ message: 'Blog updated' });
  } catch (err) {
    console.error('Error updating Blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blogs.delete(id,req.userDetails);
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('Error deleting Blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
