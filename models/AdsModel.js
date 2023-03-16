import mongoose from "mongoose";
import isURL from "validator/lib/isURL";

const AdsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
    validate: isURL,
  },

  // should we add the devices that plays this ad in here or create another function for this
});

const Ads = mongoose.models.Ads || mongoose.model("Ads", AdsSchema);

export default Ads;
