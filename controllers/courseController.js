const Courses = require('../models/courseModel');

exports.createCourse = async (req, res) => {
  try {
    const result = await Courses.create(req.body);
    res.status(201).json({ message: 'Course created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const results = await Courses.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Courses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCoursesByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Courses.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Courses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getCourseDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Courses.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCourseByCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Courses.getByCategory(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    await Courses.update(id, req.body);
    res.status(200).json({ message: 'Course updated' });
  } catch (err) {
    console.error('Error updating Course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    await Courses.delete(id,req.userDetails);
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    console.error('Error deleting Course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
