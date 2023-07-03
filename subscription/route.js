const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.route('/').post(controller.create).get(controller.query);

router
  .route('/:id')
  .get(controller.get)
  .delete(controller.remove)
  .patch(controller.update);

module.exports = {
  subcriptionRoutes: router,
};
