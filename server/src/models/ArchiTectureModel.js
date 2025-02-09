// src/models/modalData.js
const mongoose = require('mongoose');

const modalDataSchema = new mongoose.Schema({
  title: { type: String },
  clientName: { type: String },
  siteAddress: { type: String },
  gstNo: { type: String },
  projectHead: { type: String },
  leadFirm: { type: String },
  rccDesignerName: { type: String },
  PAN: { type: String },
  Aadhar: { type: String },
  Pin: { type: String },
  email: { type: String },
  
  Area_Calculations: [String],
  Presentation_Drawings: [String],
  Submission_Drawings: [String],
  Center_Line: [String],
  Floor_Plans: [String],
  Sections: [String],
  Elevations: [String],
  Compound_Wall_Details: [String],
  Toilet_Layouts: [String],
  Electric_Layouts: [String],
  Tile_Layouts: [String],
  Grill_Details: [String],
  Railing_Details: [String],
  Column_footing_Drawings: [String],
  Plinth_Beam_Drawings: [String],
  StairCase_Details: [String],
  Slab_Drawings: [String],
  Property_Card: [String],
  Property_Map: [String],
  Sanction_Drawings: [String],
  Revise_Sanction_Drawings: [String],
  Completion_Drawings: [String],
  Completion_Letter: [String],
  Estimate: [String],
  Bills_Documents: [String],
  Consultancy_Fees:[String],
  Site_Photos: [String],
  Other_Documents: [String],
});

modalDataSchema.pre('save', async function (next) {
  // Pre-save hook logic can be added here
  next();
});

module.exports = mongoose.model("ModalData", modalDataSchema);
