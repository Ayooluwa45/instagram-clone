import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase.js";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    try {
      e.preventDefault();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

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

  return (
    <div>
      {user ? (
        <button onClick={() => auth.signOut()}> Logout</button>
      ) : (
        <Button onClick={handleOpen}>Sign Up</Button>
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
    </div>
  );
}
