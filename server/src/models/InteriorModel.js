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
    Presentation_Drawing: [String],
      Ceiling: [String],
      Electrical: [String],
      Door_Handle: [String],
      Curtains: [String],
      Furniture: [String],
      Laminates: [String],
      Venner: [String],
      Hinges: [String],
     
      Plumbing: [String],
      ThreeD_Model: [String],
      Flooring: [String],
      Estimate: [String],
      Bill: [String],
      Site_Photo: [String],
});
InteriorDataSchema.pre("save", async function (next) {
  const InteriorDataSchema = this;
  next();
});

module.exports = mongoose.model("InteriorDataSchema", InteriorDataSchema);
