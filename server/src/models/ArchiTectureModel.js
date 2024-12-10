// src/models/modalData.js
const mongoose = require('mongoose');

const modalDataSchema = new mongoose.Schema({
  title: { type: String },
  clientName: { type: String },
  projectType: { type: String },
  siteAddress: { type: String },
  gstNo: { type: String },
  mahareraNo: { type: String },
  projectHead: { type: String },
  rccDesignerName: { type: String },
  Pan: { type: String },
  Aadhar: { type: String },
  Pin: { type: String },
  email: { type: String },
  Presentation_Drawing: [String],
  File_Model_3D: [String],
  Drawings: [String],
  Working_Drawings: [String],
  All_Floor: [String],
  All_Section: [String],
  All_Elevation: [String],
  Site_Photo: [String],
});

modalDataSchema.pre('save', async function (next) {
  // Pre-save hook logic can be added here
  next();
});

module.exports = mongoose.model("ModalData", modalDataSchema);
