import React from "react";
import './Post.css'
import { Avatar } from "@mui/material";

function Post() {
  return (
    <div className="post">
<div className="postHeader">
<Avatar className="postAvatar" alt='Sanni emmanuel' src='/static/images/avatar/1.jpg'/>
      <h3>Username</h3>
</div>
        
      {/*header -- avatar + username  */}

      <img className="postImage" src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" alt="" />
      {/*image  */}

      <h4 className="postText"><strong>sanniemmanuel:</strong> I love my mom</h4>
      {/*username + caption  */}
    </div>
  );
}

export default Post;
