const { createLead } = require("../services/lead.service");

const create = async (req, res) => createLead(req.body, req.user, res);
module.exports = { create };
