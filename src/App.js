import { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase.js";
import ImageUpload from "./ImageUpload.jsx";
import BasicModal from "./Model";


function App() {
  /*  const [posts, setPosts] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );

  }, []);  */


  return (
    <div className="app">
   
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
          <BasicModal />
    

       <h1>Lets build an app</h1>
    {/*    {posts.map(({ id, post }) => (
       <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}   */} 
    </div>
  );
}

export default App;
