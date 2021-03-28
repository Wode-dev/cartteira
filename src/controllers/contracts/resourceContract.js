module.exports = {
  create: async (req, res, { Model, data }) => {
    let record = new Model(data);
    let saved = await record.save();

    if (saved) {
      return res.json(record);
    }

    return res.status(400).json();
  },
  index: async (req, res, { Model }) => {
    let records = await Model.find();
    return res.json(records);
  },
  view: async (req, res, { Model, id }) => {
    console.log({ id });
    let record = await Model.findById(id);
    res.json(record);
  },
  update: async (req, res, { Model, id, data }) => {
    console.log({ id, data });
    let record = await Model.findById(id);

    record.overwrite(data);
    let saved = await record.save();
    if (saved) return res.json(record);

    return res.status(400).json();
  },
  delete: async (req, res, { Model, id }) => {
    let record = await Model.findById(id);

    let deleted = await record.delete();
    if (deleted) return res.json();

    return res.status(400).json();
  },
};
