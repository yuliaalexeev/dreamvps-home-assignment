import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/cmps/_user-post.scss";

export default function UserPost({ post, user, onRemovePost, onUpdatePost }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing(true);
  };

  let viewMode = {};
  let editMode = {};
  if (isEditing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const isUserAuthor = user.username === post.by.username;

  const handleUpdatedDone = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  function convertTime(timeStamp) {
    const now = new Date(timeStamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return now.toLocaleString(undefined, options);
  }

  return (
    <div className="user-post">
      <p style={viewMode}>{post.content}</p>
      <input
        type="text"
        value={post.content}
        className="user-post-input"
        style={editMode}
        onChange={(e) => onUpdatePost(e.target.value, post.id)}
        onKeyDown={handleUpdatedDone}
      />
      <small className="user-post-author">
        <strong>{post.by.username}</strong> at {""}
        <strong>{convertTime(post.time)}</strong>
      </small>

      {isUserAuthor && (
        <div className="user-post-buttons" style={viewMode}>
          <button className="btn btn-edit" onClick={handleEditing}>
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onRemovePost(post.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

UserPost.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onRemovePost: PropTypes.func,
  onUpdatePost: PropTypes.func,
};
