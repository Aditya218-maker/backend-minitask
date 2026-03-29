// Now we'll again perform teh same notes task but this time data will be stored in Database

// Databse stores data but you'll have to tell it in which FORMAT youll store data in it
// This is called Schema creation
/*
eg: Notes-
{
title: string
desc: string
}

again create a differnet folder "models"for schema and a file in int

To perform CRUD operation in DATABASE you need models
*/
const express = require("express")
const app = express()
app.use(express.json())
const noteModel = require("./models/notes.model")

app.post("/notes", async (req, res)=>{
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

// Now go in compass to the connections you created => establ;ish the connection => see a folder named day-6 will be created having another folder named notes=> this notes is an Collection
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

module.exports = app
 