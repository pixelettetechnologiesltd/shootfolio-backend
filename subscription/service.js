const Subscription = require('./entity/modal');

const create = async (body) => {
  return await Subscription.create(body);
};

const get = async (id) => {
  const doc = await Subscription.findOne({ _id: id });
  if (!doc) {
    return { message: 'UseSubscription not found' };
  }
  return doc;
};

const query = async (filter, options) => {
  return await Subscription.paginate(filter, options);
};

const remove = async (id) => {
  const doc = Subscription.findOne({ _id: id });
  if (!doc) {
    return { message: 'UseSubscription not found' };
  }
  await doc.remove();
};

const update = async (id, body) => {
  const doc = await Subscription.findOne({ _id: id });
  if (!doc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  Object.assign(doc, body);
  return await doc.save();
};

module.exports = {
  create,
  get,
  query,
  remove,
  update,
};
