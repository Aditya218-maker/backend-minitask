import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import axios from "axios";
// In Backend we had four APIs for CRUD .
// Now we have to somehoe call those APIs in React : Thats Where Axios comes
// Axios is a Package which helps us to call APIs from react
// npm i axios
function App() {
  const [notes, setnotes] = useState([]);
  // ab jis bhi method post ya get ya patch ya delete ki api call krni hai usko . laga k likho
  // Hame get method ki API call krni hai

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      //console.log(res.data);//an error will occur telling access to XMLGttpRequest has been blocked by CORS policy
      // CORS policy: Imagine youre using a browser and in that browser you use NetBanking and youve accounts etc login in that
      // Ab Tumhare bank se paise kahi aur transfer kiye ja skte hai.
      // Socho ksii hacker ne tumhe apne website pe bulaaya aur ek code run krdi jisme ek request jaatai hai bank ko ki iske bank se paise transfer krdo
      // isi se protection k liye hoti h CORS policy jo ki client side pe run hoti hai jo kehti h aap ek website pe rehte hue dusre website pe request nahi krskte, yaani cross origin request nahi krskte
      // ab frontend ek alag website pe hai aur Baxckend alag website pe hai is wajh se ye dikkat aati hai

      // iske liye hame apne server ko configure krna padega so that it accepts cross origin requests yaani bank allow krrha baaki users ko access krne k liye jo ki ideally nahi hona chaiye
      // toh isko ham production me solve krenge, abhi development me nahi
      // For that now install: npm i cors and reuire it and call it in app.js
      // Now youll see this:-
      // {message: 'Notes fetched', notes: Array(0)}
      // {message: 'Notes fetched', notes: Array(0)}

      setnotes(res.data.notes); //now if you goto postman and send requests with the title and description it will be shown here
      //toh yaha hamen api call kiya aur data laya aur Notes state variable me set krdenege
    });
  }

  useEffect(() => {
    //ye jo useeffect ka call back hai ye ek cheez hame deta hai kya? jab bhi apka component render hua hai toh render hone k tym pe ek baar isko chalaega aur uske baad re execute nhi krta
    //ab instead wo pura code yaha likho wo code hamne ek alag function me likh diya aur yahacall krdiya

    fetchNotes();

    // Problem : App() ek componenet hai jisme likhi gyi cheeze baar baar re render hote rehte hai
    // Ab setNotes(res.data.notes) state variable ko jaise hi change krte ho to jis Component( here App() ) k andr aapne state variable( setnotes ) banaya tha wo component re render hota hai
    // iska Soln h USEEFFECT
  }, []);

  function handleSubmit(e) {
    // function me e event object pass kra
    e.preventDefault(); // react me jab bhi from submit krte ho page reload hojata h usko preventDeafult rokta hai
    const { title, description } = e.target.elements; // title aur description ko destructure krke print krwaenge
    // e.target hamara form hai jisme teen eleemnts the title field, description field aur ek button
    console.log(title.value, description.value);
    // now hame note create krna hai note create krne wli api post method k saath use hoti thi
    // postman me data create krne k liye body me json format me likhte the
    // yaha body me data bhejne k liye aap pehle url likhdo phir , do uske baad ek object k andr jo b data aapko bhejna ho wo bhejo
    // ye data phir req.body me jaega
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      //aur jo bhi response aaega .then laga k print krlo
      .then((res) => {
        console.log(res.data);
        fetchNotes()
      });

    // o/p: bridge to teribithia a novel
    // {message: ' Note created! ', notes: {…}}
    // message
    // :
    // " Note created! "
    // notes
    // :
    // {title: 'bridge to teribithia', description: 'a novel', _id: '69cf54e94fc3f7fb10e3ff63', __v: 0}
    // [[Prototype]]...

    //ab naye node ko page pe bane hu dekhne k liye page ko reload krna padta hai wo kaise solve hoga 
    // toh uske liye .then() method me fetchnotes ko call krdo.  Wo get method wli api ko call karega aur unhe render krwa deta hai
  }
  function handleDelete(noteId){
    axios.delete("http://localhost:3000/api/notes/" + noteId)
    .then(res=>{
      console.log(res.data);//in console you can see {message: 'Note deleted'}
      //But agar render bhi krwana h ki page pe wo node na dikhe for that:
      fetchNotes()
    })
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        {" "}
        {/* on submit matlab create node pe tab karoge toh it means jab bhi ye form submit hoga toh handlesubmit function chala do */}
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              {/* _id mongo db compass me unique id number h jo ki saare notes ko milta h by the mongo DB aur delete ham uniquely notes ko identify krke hi kr skte h isliye id pass krrrhe ha */}
              <button onClick={()=>{handleDelete(note._id)}}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
