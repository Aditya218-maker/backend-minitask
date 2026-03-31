// Now we'll again perform teh same notes task but this time data will be stored in Database
//after creating nodes well develeop frontend and then try to deploy it
const express = require("express")
const app = express()
app.use(express.json())
const noteModel = require("./models/notes.model")

//POST:  /api/notes
// req.body = {title, description}
app.post("/api/notes", async (req, res)=>{
  //req.body se jo data aaya usko kara destructure
  const { title, description} = req.body
  //ab hame is data ka note create krna jiska data mumbain server k cluster me store hona cahiye
  //we know ki model k bina ham CRUD operations perform nahi krskte isliye model ko export krke yaha require krna padega

  const notes = await noteModel.create({//ye ek note ko create karegi aur data mubai wle cluster me store krti hai
    //ab server mere device pe chalra hai aur mai delhi ab delhi se data mumbai jaayega internet k through aur wha pe save hoga aur waha se response milega
    // is me lagta h time aur kitna time lagega pata nhi as it depends on Internet quality isliye We'll use await ,async
    title, description 
  })
  res.status(201).json({
    message: " Note created! ",
    notes //shared notes data  
//go to postman and send reuest using post methos and youll get o/p:
//{
//     "message": " Note created! ",
//     "notes": {
//         "title": "title1",
//         "description": "decription1",
//         "_id": "69c8ac2f0b6f28a998db9a99",
//         "__v": 0
//     }
// }

// Now go in compass to the connections you created => establish the connection => see a folder named day-6 will be created having another folder named notes=> this notes is an Collection
//as we have created the model named notes 
// In that folder nortes youll have and it has 4 properties;- 
// {
//   "_id": {
//     "$oid": "69c7752aa2bfe7d9b1c62389"   // _id: we can create multiple notes in the database thats why this id exists uniue identification provided by mongo db to uniquely identify diferent notes
// oid means objectb id   
//   },
//   "title": "title1",
//   "description": "decription1",
//   "__v": 0
// }

//to add new feature after description write it in schema you cretaed first then in the post function
// install dotenv package and require it in server file
// create an env file and paste the link there. The same link which we used tpo link to database

  })

})


//GET: /api/notes : fetch all the notes data from mongodb and send them in the response
app.get("/api/notes", async (req, res)=>{
  const notes = await noteModel.find()     //reads all data in the database and returnand we save it in notes variable
//find method hamesha array of object me data return krti hai
  res.status(200).json({
    message: "Notes fetched",
    notes
  })
})
//o/p: 
// {
//     "message": "Notes fetched",
//     "notes": [
//         {
//             "_id": "69cb59ae45355ed3a51b1d12",
//             "title": "title1",
//             "description": "decription1",
//             "__v": 0
//         }
//     ]
// }
// URI is kind of a private link that cant be posted on github
// Anything that cant be written in github will be written on env file  


// DELETE /api/notes/:id => Delete node id from req.params
// Youve to go to compass => copy the id of the node you want to delete => then paste it in delete method in Postman 
// eg: http://localhost:3000/api/notes/69cb5af41b2326247e76a0c2
app.delete('/api/notes/:id', async (req, res)=>{
  const id = req.params.id
  await noteModel.findByIdAndDelete(id)
  res.status(200).json({
    message:"Note deleted"
  })
  //o/p: the node of the pasted id will be deleted from databse you can go n see it in Compass
})


// Patch /api/notes/:id => update the description of the note by id
// req.body will have description here
app.patch('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const { description } = req.body

  await noteModel.findByIdAndUpdate(id, {description}) //descp ko object k form me bhejna hai

  res.status(200).json({
    message: "Note updated"
  })
})

module.exports = app
 