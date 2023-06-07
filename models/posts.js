import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',//name - prima stringa del modello per gli users//
  },

  rate: {
    type: Number,
    required: false,
    max: 5,
    min: 0,
    default: 0,
  },
});

const PostModel = mongoose.model("Post", PostSchema, "posts");

export default PostModel;
