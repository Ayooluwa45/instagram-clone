/* import { useState } from "react";
import { Button } from "@mui/material";
import { storage, db } from "./firebase";
import { FirebaseError } from "firebase/app";
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import {
    collection,
    onSnapshot
  } from "firebase/firestore";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");


  const handleChange = (e) => {
     if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {

     // this is for uploading
     const uploadTask = storage.ref(`images/${image.name}`).put(image);

     uploadTask.on(
       "state_changed",
       (snapshot) => {
         const progress = Math.round(
           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
         setProgress(progress);
       },
       (error) => {
         console.log(error);
         alert(error.message);
       },
       () => {
         //To get the downloadlink from db
         storage
           .ref("images")
           .child(image.name)
           .getDownloadUrl()
           .then((url) => {
             //post image inside db
           collection(db,"posts").add({
               timestamp: FirebaseError.firestore.Fieldvalue.serverTimestamp,
               caption: caption,
               imageUrl: url,
               username: username,
             });
             setProgress(0);
             setCaption("");
             setImage(null);
           });
       }
 
 
     );
   }; 
   /*   const imageRef = ref(storage, `images/${image.name + v4()}`)
uploadBytes(imageRef, image).then((snapshot)=>{
    getDownloadURL(snapshot.ref).then((url)=>{
       // setImage((prev)=>[...prev, url])
    })
})

const imageListRef = ref(storage, 'images/')
listAll(imageListRef).then((response)=>{
    response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
         //   setImageList((prev)=>[...prev, url])
            collection(db,"posts").add({
                timestamp: FirebaseError.firestore.Fieldvalue.serverTimestamp,
                caption: caption,
                imageUrl: url,
                username: username,
              });
        })
    })
})
  }*/

   

  /*  
// Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

 */

  /* return (
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
  );
}

export default ImageUpload; */
