const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60a1be538397ca8e7081b990',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/', cardsRoutes);

app.listen(PORT, () => {});
