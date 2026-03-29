const mongoose = require("mongoose")

// Schema creation
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const noteModel = mongoose.model("notes", noteSchema)//this line creates a model that requires a string "notes". We have to store data of multiple notes in our Database ansd every Note has title and description and everuy note will have common schema: title and descripition (values may be different).
// Toh aise hi jab boht ksi object jaise notes k data common hote hai toh unhe COLLECTION bolte hai. Multiple collections bhi ho skte hai

module.exports = noteModel