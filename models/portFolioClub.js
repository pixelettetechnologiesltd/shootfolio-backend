const mongoose = require("mongoose");
const portFolioClubSchema = new mongoose.Schema({
  coinName: {
    type: String,
    required: true,
    unique: true,
  },
   numberOfUnits: {
    type: Number,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

const portFolioClub = mongoose.model("portFolioClub", portFolioClubSchema);

module.exports = portFolioClub;
