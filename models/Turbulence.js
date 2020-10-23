const mongoose = require("mongoose");

const TurbulenceSchema = mongoose.Schema({
  routefrom: {
    type: String,
    required: true,
  },
  routeto: {
    type: String,
    required: true,
  },
  altitude: {
    type: Number,
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model user with TurbulenceSchema
const Turbulence = mongoose.model("Turbulence", TurbulenceSchema);
module.exports = Turbulence;
