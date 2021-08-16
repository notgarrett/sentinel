import mongoose from "mongoose";

const User = mongoose.model("Users", ProfileSchema);

//Checks if user has a verification code

export const checkVerifyKey = async (fields) => {
  return new Promise((resolve, reject) => {
    Verification.make({ DiscordId: discordMemberId }, (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        resolve(doc);
      }
      resolve(false);
    });
  });
};
