const express = require('express');
const router = express.Router();

router.route('/users')
.get((req, res) => {
  return new req.database.User().fetchAll()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})
.post((req, res) => {
  const username = req.body.username;
  const password = '$2a$12$NzjfpQc8rTlMarLj7TXu6eC/EonpotMXyFX7U5dUAQyBgg2XWtoJO';
  return new req.database.User({ username, password }).save()
    .then((user) => {
      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
