const Lead = require("../models/lead.model");

const createLead = async (body, res) => {
  await Lead.create(body);
  res.status(201).send("Lead Created");
};

module.exports = { createLead };
