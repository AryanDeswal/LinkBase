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
  
  Presentation_Drawings: [String],
  Submission_Drawing: [String],
  Floor: [String],
  Section: [String],
  Elevation: [String],
  Toilet_Layout: [String],
  Electric_Drawing: [String],
  Tile_Layout: [String],
  Grills: [String],
  Railing: [String],
  Column_footing: [String],
  Pleanth_Beam: [String],
  StairCase_Drawing: [String],
  Slab: [String],
  Property_Card: [String],
  Property_Map: [String],
  Completion_Drawing: [String],
  Sanction_Drawing: [String],
  Revise_Sanction: [String],
  Completion_Letter: [String],
  Estimate: [String],
  Bill: [String],
  Site_Photo: [String],
});

modalDataSchema.pre('save', async function (next) {
  // Pre-save hook logic can be added here
  next();
});

module.exports = mongoose.model("ModalData", modalDataSchema);
