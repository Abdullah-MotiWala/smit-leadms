const { createLead, getLeads, getLead } = require("../services/lead.service");

const create = async (req, res) => createLead(req.body, req.user, res);
const getAllUserLeads = async (req, res) => {
  getLeads(req.user, req.query, res);
};
const getAllUserLeadsAdmin = async (req, res) => {
  getLeads(req.user, req.query, res);
};
const getOneLead = async (req, res) => {
  getLead(req.user, req.params, res);
};
module.exports = { create, getAllUserLeads,getAllUserLeadsAdmin, getOneLead };
