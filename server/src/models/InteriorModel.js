const mongoose = require("mongoose");
const InteriorDataSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  clientName: {
    type: String,
  },
  projectType: {
    type: String,
  },
  siteAddress: {
    type: String,
  },
  gstNo: {
    type: String,
  },
  mahareraNo: {
    type: String,
  },
  projectHead: {
    type: String,
  },
  rccDesignerName: {
    type: String,
  },
  Pan: {
    type: String,
  },
  Aadhar: {
    type: String,
  },
  Pin: {
    type: String,
  },
  email: {
    type: String,
  },
  Floor_Plan: [String],
  Section: [String],
  Elevation: [String],
  ThreeD_Model: [String],
  Detail_Working: [String],
  Flooring: [String],
  Furniture: [String],
  Presentation: [String],
  Ceiling: [String],
  Electrical: [String],
  Plumbing: [String],
  Estimate: [String],
  Onsite: [String],
});
InteriorDataSchema.pre("save", async function (next) {
  const InteriorDataSchema = this;
  next();
});

module.exports = mongoose.model("InteriorDataSchema", InteriorDataSchema);
