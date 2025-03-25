const express = require('express');
const router = express.Router();
const BlogsController = require('../controllers/blogController');
const { auth } = require('../middlewares/auth.js');

router.post('/createBlog', auth, BlogsController.createBlog);
router.get('/getAllBlogsByPage', BlogsController.getAllBlogsByPage);
router.get('/getAllBlogs', BlogsController.getAllBlogs);
router.get('/getBlogById/:id', BlogsController.getBlogById);
router.put('/updateBlog/:id',auth, BlogsController.updateBlog);
router.delete('/deleteBlog/:id',auth, BlogsController.deleteBlog);

module.exports = router;