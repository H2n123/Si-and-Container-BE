// app/controllers/container.controller.js

const db = require("../models");
const Si = db.Si;
const Container = db.Container;
const Sequelize = require('sequelize');

exports.createContainer = async (req, res) => {
  try {
    const { siNo, containerNo, sealNo } = req.body;
    // const siNo = req.params.siNo;

    // Temukan Si berdasarkan siNo
    const si = await Si.findOne({ where: { siNo } });

    if (!si) {
      return res.status(404).json({ message: `Si ${siNo} not found.` });
    }

    // Cek jumlah container terkait dengan siId
    const currentNumContainers = await Container.count({
      where: { siId: si.id },
    }); 

    console.log(`TOTAL CONTAINER: ${currentNumContainers}`)

    // Cek apakah jumlah container sudah mencapai numContainer pada Si
    if (currentNumContainers >= si.numContainer) {
      return res.status(400).json({ message: "Maximum container limit reached for this SI." });
    }

    // Cek apakah containerNo sudah pernah diinput untuk siId yang sama
    const existingContainer = await Container.findOne({
      where: { containerNo, siId: si.id },
    });

    if (existingContainer) {
      return res.status(400).json({ message: `ContainerNo ${containerNo} already exists for this SI.` });
    }

    // Cari nomor id terakhir, harusnya sih pakai increment auto ya... :-D
    const lastSi = await Container.findOne({
      attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'lastContId']]
    });
    const lastContId = lastSi.get('lastContId');
    id = lastContId + 1

    // Membuat data container 
    const newContainer = await Container.create({
      id,
      containerNo,
      sealNo,
      siId: si.id,
    });

    // Mengaitkan Container dengan Si
    // await si.addContainer(newContainer);

    res.status(201).json({ message: "Container created successfully.", container: newContainer });
  } catch (error) {
    console.error("Error creating container:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllContainers = async (req, res) => {
  try {
    const containers = await Container.findAll({include: ['Si']});

    res.status(200).json(containers);
  } catch (error) {
    console.error("Error retrieving containers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getContainerBySi = async (req, res) => {  
  try {
    const { siNo } = req.body;

    const si = await Si.findOne({where: {siNo: siNo} });
    
    if (!si) {
      return res.status(404).json({ message: `Si no ${siNo} not found.`})
    }

    const container = await Container.findAll( 
      { where: { siId: si.id, },
        include: ['Si']
      }
    )

    if (!container) {
      return res.status(404).json({ message: `Container not found in Si ${siNo}.` });
    }

    res.status(200).json(container);
  } catch (error) {
    console.error("Error retrieving container by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateContainer = async (req, res) => {
  try {
    const { siNo, containerNo, newContainerNo, newSealNo} = req.body;

    if (!newContainerNo) {
      return res.status(404).json({ message: `New Container no cannot be empty ${newContainerNo}.` });
    }
    
    // Temukan Si berdasarkan siNo
    const si = await Si.findOne({ where: { siNo } });

    if (!si) {
      return res.status(404).json({ message: `Si ${siNo} not found.` });
    }

    // Check apakah containerNo yang diubah ada dalam si
    const existingContainer = await Container.findOne({
      where: { containerNo: containerNo, siId: si.id }
    });

    if (!existingContainer) {
      return res.status(400).json({ message: `Container no ${containerNo} not found in Si ${siNo}.` });
    }

    // Update container
    const updatedContainer = await Container.update(
      { containerNo: newContainerNo, sealNo: newSealNo },
      { where: { siId: si.id } }
    );

    // if (updatedContainer[0] === 0) {
    //   return res.status(404).json({ message: "Container not found." });
    // }

    res.status(200).json({ message: "Container updated successfully." });
  } catch (error) {
    console.error("Error updating container:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteContainer = async (req, res) => {
  try {
    const {siNo, containerNo} = req.body;
    // const siNo  = req.params.siNo;

    const si = await Si.findOne({ where: { siNo } });
    if (!si) {
      return res.status(404).json({ message: `Si ${siNo} not found.` });
    }

    // chek container existing yang dari params
    const existingcontainer = await Container.findOne({
      where: { containerNo:containerNo, siId: si.id }
    });
    if (!existingcontainer) {
      return res.status(404).json({ message: `Container ${containerNo} not found in Si ${siNo}` });
    }

    // Delete container
    const deletedContainerCount = await Container.destroy({
      where: { containerNo: containerNo, siId: si.id }
    });

    if (deletedContainerCount === 0) {
      return res.status(404).json({ message:  `Container ${containerNo} not found in Si ${siNo}` });
    }

    res.status(200).json({ message: `Container ${containerNo} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting container:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
