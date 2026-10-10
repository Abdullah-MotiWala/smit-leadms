const { createLead } = require("../services/lead.service");

const create = async (req, res) => createLead(req.body, res);
module.exports = { create };
