const express = require('express');
const userRouter = require('./route/userRouter');
const teamRouter = require('./route/teamRouter');
const gameRouter = require('./route/gameRouter');
const passport = require('./config/passport');
const session = require('express-session');
const dotenv = require('dotenv');
const AppError = require('./utils/appError');
const errorController = require('./controller/errorController');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { subcriptionRoutes } = require('./subscription/route');
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: '*' }));

app.set('view engine', 'ejs');
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
const apilimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again after 5 minutes',
});
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/shootfolio', userRouter);
app.use('/api/coinMarketCap', userRouter);
app.use('/api/shootfolio/team', teamRouter);
app.use('/api/shootfolio/game', gameRouter);
app.use('/api/shootfolio/subcription', subcriptionRoutes);

app.use('/api', apilimiter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});
app.use(errorController);
module.exports = app;
