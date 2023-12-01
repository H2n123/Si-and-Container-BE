// controllers/logbook.controller.js

// const Logbook = require('../models/logbook.model');

// exports.createLogbook = async (req, res) => {
//   try {
//     const { action, userId, siId, containerId } = req.body;
//     const logbookData = {
//       action,
//       userId,
//       siId,
//       containerId,
//     };
//     // Logic untuk membuat logbook
//     const logbook = await Logbook.create(logbookData);
//     res.status(201).json(logbook);
//   } catch (error) {
//     console.error('Error creating logbook:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.createLogbookForCreate = async (req, res) => {
//   await this.createLogbook(req, res, 'Create');
// };

// exports.createLogbookForUpdate = async (req, res) => {
//   await this.createLogbook(req, res, 'Update');
// };

// exports.createLogbookForDelete = async (req, res) => {
//   await this.createLogbook(req, res, 'Delete');
// };
