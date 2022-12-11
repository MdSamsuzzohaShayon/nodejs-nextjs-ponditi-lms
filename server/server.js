const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './.env.local' });
} else {
  dotenv.config({ path: './.env' });
}
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const outputFile = require('./swagger-output.json');
const userRoutes = require('./routes/userRouter');
const searchRoutes = require('./routes/searchRouter');
const adminRoutes = require('./routes/adminRouter');
const classtypeRoutes = require('./routes/classtypeRouter');
const subjectRoutes = require('./routes/subjectRouter');
const scheduledclassRoutes = require('./routes/scheduledclassRouter');
const reviewRoutes = require('./routes/reviewRouter');
// eslint-disable-next-line no-unused-vars
const db = require('./models');

const app = express();
// middleware




app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

app.use((req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', `${req.method} - ${req.url}`);
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputFile));

/**
 * @openapi
 * /api:
 *   get:
 *     description: Official documentation of ponditi API
 *     responses:
 *       200:
 *         description: Just for testing perpuse that API is working or not
 */
app.get('/api', (req, res) => {
  res.send('Hello World');
});
// app.use('/api/subscriber', subscriberRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/classtype', classtypeRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/scheduledclass', scheduledclassRoutes);
app.use('/api/review', reviewRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// IF THERE ARE NO TABLE THIS WILL CREATE
// db.sequelize.sync({ alter: true, force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
//   });
// });
