import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword, 
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase.js";
import ImageUpload from "./ImageUpload.jsx";
import { storage, db } from "./firebase";
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Post from "./Post";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSignIn, setOpenSignIn]= useState(false)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

   const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");


  const [posts, setPosts] = useState();
  const imageListRef = ref(storage, 'images/')
 

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
listAll(imageListRef).then((response)=>{
  response.items.forEach((item)=>{
    getDownloadURL(item).then((url)=>{
      setImage((prev)=>[...prev, url])
    })
  })
})
  }, []);


  const handleChange = (e) => {
     if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
 

  const handleUpload = () => {
    if(image == null) return
const imageRef = ref(storage, `images/${image.name + v4()}`)
uploadBytes(imageRef, image).then(()=>{
  alert('Image Uploaded')
})
  }
  useEffect(() => {
    /*  onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    }) */

    const unsubscribed = auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        //user has logged in
        console.log(userCredential);
        setUser(userCredential);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup actions
      unsubscribed();
    };
  }, [user, username]);

  const signUp = async (e) => {
    e.preventDefault();

   /* try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
    
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: username
      })
      
    } catch (error) {
      console.log(error.message)
    }  */
      try {
    
      const user = await createUserWithEmailAndPassword(auth, email, password);
     updateProfile(auth.currentUser, {
        displayName: username
      })
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }  

    setOpen(false)

    /* .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */
    /*  const auth = getAuth()
  
   createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential)=>{
      return userCredential.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message))  */
  };

  
  const signIn = async (e)=>{
    try {
        e.preventDefault();
        const user = await signInWithEmailAndPassword( auth,email, password);
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        console.log(user);
      } catch (error) {
        alert(error.message);
      }
      setOpenSignIn(false)
  }

  return (
  
    <div>
      
      {user ? (
        <button onClick={() => auth.signOut()}> Logout</button>
      ) : (
        <div className="loginContainer"> 
        <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={handleOpen}>Sign Up</Button>
    
        </div>
        
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <div className="app__header">
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <form className="signUp">
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={signUp}>
                  Sign Up
                </button>
              </form>
            </div>
          </center>
        </Box>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <div className="app__header">
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <form className="signUp">
         

                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={signIn}>
                  Sign In
                </button>
              </form>
            </div>
          </center>
        </Box>
      </Modal>
     
       {user?.displayName ? (
            <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a Caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>  

  // <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry you need to login to upload</h3>
      )}  
     
     {posts.map(({ id, post }) => (
       <Post
       key={id}
       username={post.username}
       caption={post.caption}
       imageUrl={post.imageUrl}
     />
      ))} 
    </div>
  );
}
