const mongoose = require("mongoose");
const crypto = require("crypto");
const { kStringMaxLength } = require("buffer");

const medallionProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  middleName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: false,
    unique: false,
  },
  relationship: {
    type: String,
    required: false,
    unique: false,
  },
  profilePicture: {
    type: String,
    contentType: String,
    required: false,
    unique: false,
  },
  // profilePicture: {
  //   data: Buffer, // Use Buffer type to store binary data (image)
  //   contentType: String, // Store content type of the image
  // },
  textOrPhrase: {
    type: String,
    required: false,
    unqiue: false,
  },
  linkToObituary: {
    type: String,
    required: false,
    unique: false,
  },
  bioInfo: {
    type: String,
    required: false,
    unique: false,
  },
  birthDate: {
    type: String, // Use Date type to store dates we used String as we modify format
    required: true,
    unique: false,
  },
  deathDate: {
    type: String, // Use Date type to store dates we used String as we modify format
    required: true,
    unique: false,
  },
  city: {
    type: String,
    required: false,
    unique: false,
  },
  state: {
    type: String,
    required: false,
    unique: false,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // ensure the type is a point
      required: false,
    },
  },
  coordinates: {
    type: [Number], // array of numbers [longitude, latitude]
    required: false,
  },
  quoteSection: {
    type: String,
    required: false,
    unique: false,
  },
  cemeteryName: {
    type: String,
    required: false,
    unique: false,
  },
  cemeteryPlotNumber: {
    type: String,
    required: false,
    unique: false,
  },
  cemeteryCity: {
    type: String,
    required: false,
    unique: false,
  },
  cemeteryState: {
    type: String,
    required: false,
    unique: false,
  },
  media: [
    {
      title: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      mediaType: {
        type: String,
        required: false,
      },
      mediaLink: {
        type: String,
        required: false,
      },
    },
  ],
});

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  qrCodeId: {
    type: String,
    required: true,
    unique: true,
  },
  dateCreated: {
    type: Date,
    required: false,
    unique: false,
  },
  bio: String,
  // Add other profile-related fields as needed
  medallionProfile: medallionProfileSchema, // Embed MedallionProfile schema

  salt: {
    type: String,
    required: false,
  },
  hashedPassword: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
});

// Virtual Field for handling plain text password during user registration
profileSchema.virtual("password").set(function (password) {
  // Generate a unqiue salt for each user
  this.salt = crypto.randomBytes(16).toString("hex");
  // Hash the password with the salt
  this.hashedPassword = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
});

// Method to validate a password during login
profileSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
  return this.hashedPassword === hash;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
