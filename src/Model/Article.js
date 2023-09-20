const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articleSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        require: true
    },
    prix: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
})
const Article = model("Article", articleSchema)
module.exports = Article