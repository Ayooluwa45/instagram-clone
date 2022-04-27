/* import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react'
import { auth } from "./firebase.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSignIn, setOpenSignIn]= useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null);



  const signIn = async (e)=>{
    try {
        e.preventDefault();
        const user = await signInWithEmailAndPassword( email, password);
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
      setOpenSignIn(false)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Sign In</Button>
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
    </div>
  );
}  */

 