const Lead = require("../models/lead.model");

const createLead = async (body, user, res) => {
  await Lead.create({ ...body, createdBy: user.id });
  res.status(201).send("Lead Created");
};

const getLeads = async (user, paginationfilters, res) => {
  const { page, limit } = paginationfilters;
  const leads = await Lead.find({
    // $or: [{ status: "UPDATEd" }, { createdBy: user.id }],
    createdBy: user.id,
  }).select("-linkedin")
    .limit(limit)
    .skip((page - 1) * limit)
    .populate({ path: "createdBy",model:"user", select:"email" });
  res.status(201).send({ leads });
};

const getLead = async (user, params, res) => {
  console.log(params.id, "==all");
  const lead = await Lead.findOne({ _id: params.id });
  if (!lead) {
    return res.status(404).send("Lead not found");
  }

  const isSameUser = user.id === lead.createdBy;
  console.log(isSameUser);
  if (!isSameUser) {
    return res.status(403).send("You are not allowed to check this");
  }

  console.log(lead);
  res.status(200).send(lead);
};

module.exports = { createLead, getLeads, getLead };
