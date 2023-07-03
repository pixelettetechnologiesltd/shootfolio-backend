const service = require('./service');

const create = async (req, res) => {
  try {
    const doc = await service.create(req.body);
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await service.get(id);
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};

const query = async (req, res) => {
  try {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['page', 'limit']);
    const result = await service.query(filter, options);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await service.remove(id);
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const doc = await service.update(id, body);
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  create,
  get,
  query,
  remove,
  update,
};
