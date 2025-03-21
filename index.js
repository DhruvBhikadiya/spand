require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const siteconfigRoutes = require('./routes/siteconfigRoutes');
const paymentsettingRoutes = require('./routes/paymentsettingRoutes');
const fileuploadRoutes = require("./routes/fileuploadRoutes");
const contactleadRoutes = require("./routes/contactleadRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const aboutusRoutes = require('./routes/aboutusRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: '*', // If you want any URL then use '*'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/siteconfig', siteconfigRoutes);
app.use('/api/paymentsetting', paymentsettingRoutes);
app.use("/api/file", fileuploadRoutes);
app.use('/api/contactlead', contactleadRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/aboutus', aboutusRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonial', testimonialRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});