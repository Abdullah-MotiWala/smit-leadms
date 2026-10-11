const Lead = require("../models/lead.model");

const createLead = async (body, user, res) => {
  console.log(user, "===user")

  await Lead.create({ ...body, createdBy: user.id });
  res.status(201).send("Lead Created");
};


module.exports = { createLead };
