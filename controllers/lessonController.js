const Lessons = require('../models/lessonModel');

exports.createLesson = async (req, res) => {
  try {
    const result = await Lessons.create(req.body);
    res.status(201).json({ message: 'Lesson created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Lesson:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const results = await Lessons.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Lessons:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllLessonsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Lessons.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Lessons:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllLessonsByCourse = async (req, res) => {
    const id = req.params.id;
    try {
      const results = await Lessons.getByCourse(id);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching Lessons:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.updateLesson = async (req, res) => {
  const id = req.params.id;
  try {
    await Lessons.update(id, req.body);
    res.status(200).json({ message: 'Lesson updated' });
  } catch (err) {
    console.error('Error updating Lesson:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLesson = async (req, res) => {
  const id = req.params.id;
  try {
    await Lessons.delete(id,req.userDetails);
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (err) {
    console.error('Error deleting Lesson:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
