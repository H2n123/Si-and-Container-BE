// app/controllers/si.controller.js
const db = require("../models");
const Si = db.Si;
const Container = db.Container;
const Sequelize = require('sequelize');
// const { createLogbookForCreate } = require("./logbook.controller");

exports.createSi = async (req, res) => {
  try {
    const { siNo, siDate, siBatch, numContainer, siDestination } = req.body;
    // Validate input
    if (!siNo || !siDate || !siBatch || !numContainer || !siDestination) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Temukan Si berdasarkan siNo
    const si = await Si.findOne({ where: { siNo } });

    if (si) {
      return res.status(404).json({ message: `Si ${siNo} already exist.` });
    }

    // Menomori id Si dengan yg terakhir + 1
    const lastSi = await Si.findOne({
      attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'lastSiId']]
    });
    const lastSiId = lastSi.get('lastSiId');
    console.log(lastSiId);
    id = lastSiId + 1

    // Create a new SI
    const newSi = await Si.create({
      id,
      siNo,
      siDate,
      siBatch,
      numContainer,
      siDestination,
    });
    // memasukkan ke dalam logbook saat create
    // sementara dimatikan, mungkin akan dipikirkan dibuat logbook pada Front End
    // await createLogbookForCreate(req, res, { 
    //   action: "Create", 
    //   userId: req.body.userId, 
    //   siId: req.body.siId });

    res.status(201).json(newSi);
    // console.log(req.username)
  } catch (error) {
    console.error("Error creating SI:", error);
    res.status(500).json(error); //message: "Internal Server Error"
  }
};

// semua data SI
exports.getAllSis = async (req, res) => {
  try {
    // dari database
    const allSis = await Si.findAll();
    // Kirim data SI sebagai respons JSON
    res.status(200).json(allSis);
  } catch (error) {
    console.error("Error retrieving SIs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// SI berdasarkan siNo
exports.getSiBySiNo = async (req, res) => {
  try {
    const { siNo }  = req.body;
    const si = await Si.findOne({ where: { siNo: siNo } });

    if (!si) {
      return res.status(404).json({ message: "SI not found." });
    }

    res.status(200).json(si);
  } catch (error) {
    console.error("Error retrieving SI by siNo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update SI
exports.updateSi = async (req, res) => {
  try {
    const { siNo, newSiBatch, newSiDate, newNumContainer, newSiDestination } = req.body; 
    /* perlu diingat jika cari si nantinya perlu cari 
     per tahun karena nomor si reset tiap tahun
     tambah paramater siYear mungkin */

    const si = await Si.findOne({ where: { siNo } });

    if (!si) {
      return res.status(404).json({ message: "SI not found." });
    };

    await si.update({
      where : { siNo : siNo, siId: si.id }, // mungkin tidak perlu siNo, karena sudah ada si.id
      siBatch : newSiBatch,
      siDate : newSiDate,
      numContainer : newNumContainer,
      siDestination : newSiDestination,
    });
    console.log(`si update ${siNo} - ${si.id}`);
    console.log(req.body);

    res.status(200).json({ message: "SI updated successfully.", data: req.body });
  } catch (error) {
    console.error("Error updating SI:", error);
    res.status(500).json(error); //message: "Internal Server Error" 
  }
};

// Hapus SI
exports.deleteSi = async (req, res) => {
  try {
    const siNo = req.body.siNo;
    const si = await Si.findOne({where : { siNo }});

    if (!si) {
      return res.status(404).json({ message: "SI not found." });
    }

    const container = Container.findAll({where: {siId: si.id}})

    if (container) {
      return res.status(500).json({message: "Si has container data, delete container data before deleting Si, need authorized party."})
    }

    await si.destroy();
    // perlu cek juga apakah sudah ada data container, jika ya maka dihapus juga atau tidak (opsional)

    res.status(200).json({ message: "SI deleted successfully." });
  } catch (error) {
    console.error("Error deleting SI:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};