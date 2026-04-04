const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json())
const noteModel = require("./models/notes.model")
app.use(express.static("./public"))

app.use(cors()) 

app.post("/api/notes", async (req, res)=>{
  const { title, description} = req.body
  
  const notes = await noteModel.create({
    title, description 
  })
  res.status(201).json({
    message: " Note created! ",
    notes 
  })

})

app.get("/api/notes", async (req, res)=>{
  const notes = await noteModel.find()     
  res.status(200).json({
    message: "Notes fetched",
    notes
  })
})

app.delete('/api/notes/:id', async (req, res)=>{
  const id = req.params.id
  await noteModel.findByIdAndDelete(id)
  res.status(200).json({
    message:"Note deleted"
  })
})

app.patch('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const { description } = req.body
  const { title } = req.body

  await noteModel.findByIdAndUpdate(id, {title}, {description}) 

  res.status(200).json({
    message: "Note updated"
  })
})

app.use('*name', (req, res)=>{
  res.sendFile(path.join(__dirname,"..", "/public/index.html"))
})


module.exports = app
 