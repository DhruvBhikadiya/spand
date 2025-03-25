const Testimonials = require('../models/testimonialModel');

exports.createTestimonial = async (req, res) => {
  try {
    const result = await Testimonials.create(req.body);
    res.status(201).json({ message: 'Testimonial created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Testimonial:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const results = await Testimonials.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Testimonials:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTestimonialsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Testimonials.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Testimonials:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTestimonial = async (req, res) => {
  const id = req.params.id;
  try {
    await Testimonials.update(id, req.body);
    res.status(200).json({ message: 'Testimonial updated' });
  } catch (err) {
    console.error('Error updating Testimonial:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  const id = req.params.id;
  try {
    await Testimonials.delete(id,req.userDetails);
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error('Error deleting Testimonial:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
