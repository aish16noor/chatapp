import logo from './logo.svg';
import './App.css';
import { getDatabase,push,ref,set,onChildAdded } from "firebase/database";

import { useEffect, useState } from 'react';
// import { getDatabase ,push,ref,set,onChildAdded, update} from "firebase/database";
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";


function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const GoogleLogin=()=>{signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser({name:result.user.displayName, email:user.email})
      console.log(token,user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });}

  const [user, setUser]=useState("");
  const [chats, setChats]=useState([]);
  const [msg, setMsg]=useState("")

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  



const  updateHeight=()=>{
    const el=document.getElementById('chat');
    if (el) {
      el.scrollTop=el.scrollHeight;
    }
    
  }

  useEffect(()=>{
    onChildAdded(chatListRef, (data) => {
      
      setChats(chats=>[...chats,data.val()])
      console.log(data.val());
      setTimeout(()=>{
        updateHeight()
      },100)

      
    });

  },[])


  const sendChat=()=>{

// const chatListRef = ref(db, 'chats');
const chatRef = push(chatListRef);
set(chatRef, {
  user,message:msg
});
    // const c = [...chats];
    // c.push();
    // setChats(c);
    setMsg("")
  }
  return (
   <div>

    {user.email? null:
      <div className='button'>
      {/* <input type='text' placeholder='Enter name to start' onBlur={e=>setName(e.target.value)}>
</input> */}

<button onClick={e=>{GoogleLogin()}}>Google SignIn</button>
    </div>
    }

  {user.email?

<div >
<h3>User: {user.name}</h3>
 <div id='chat' className='chat-container'>
  {console.log("chats",chats,user)}
  {
     chats.map((c)=> <div className={`container ${c.user.email===user.email?'me': ""}`} >

   <p className='chat-box'>
      <strong>{c.user.name}</strong>
      <span>{c.message}</span>
    </p>
   </div>
  )}

  {/* <div className='container'>

  <p className='chat-box'>
     <strong>name:</strong>
     <span>chat msg</span>
   </p>
  </div> */}

 </div>

 <div className='btn'>
 <input type='text'onInput={e=>setMsg(e.target.value) }value={msg}
  placeholder='enter your msg'>

 </input>
 <button onClick={e=>sendChat(e.target.value)}>send</button>
 </div>

</div>
  :null}
   </div>
  );
}

// function App(){
//   const [name, setName]=useState("");
//   const [chats, setChats]=useState([]);
//   const [msg, setMsg]=useState("")

//   const db = getDatabase();
//   const chatListRef = ref(db, 'chats');

//   useEffect(()=>{
//     onChildAdded(chatListRef, (data) => {
//       setChats(chats=>[...chats,data.val()])

//     });

//   },[])


//   const sendChat=()=>{
    
//     const chatRef = push(chatListRef);
    
//     set(chatRef, {
//       name,message:msg||""
//     });

//     // const c =[...chats];
//     // c.push();
//     // setChats(c);
//     setMsg("");

//   };
//   return(
//     <div>
//       {name? null:
//         <div>
//         <input type='text' placeholder='Enter your text' onBlur={(e)=>setName(e.target.value)}></input>
//       </div>
//       }
//  {name?
//        <div>

//        <h1>User: {name}</h1>
//  <div  className="chat-container">
//   {chats.map((c,i)=>(
//     <div key={i} className={`container ${c.name === name? 'me':''}`}>
//     <p className="chat-box">
//       <strong>{c.name}:</strong>
//       <span>{c.message}</span>
//     </p>
 
//   </div>
//   ))}
    
//  </div>
 
//  <div className='btn'>
//    <input type='text' onInput={e=>setMsg(e.target.value)} value={msg} placeholder='Enter your chat'></input>
//    <button onClick={e=>sendChat()}>Send</button>
//  </div>
//        </div> :null }

//   </div>

//   );

 
// }


export default App;
