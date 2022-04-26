import "./Post.css";
import { Avatar } from "@mui/material";

function Post({ username, imageUrl, caption }) {
  return (
    <div className="post">
      <div className="postHeader">
        <Avatar
          className="postAvatar"
          alt="Sanni emmanuel"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/*header -- avatar + username  */}

      <img
        className="postImage"
        src={imageUrl}
        alt=""
      />
      {/*image  */}

      <h4 className="postText">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Post;
