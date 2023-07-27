import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/cmps/_add-post.scss";

export default function AddPost({ onAddPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === "") return;

    onAddPost(content);
    setContent("");
  };

  return (
    <form className="add-new-post" onSubmit={handleSubmit}>
      <textarea
        className="add-new-post-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <button type="submit" className="btn-add-post">
        + Add Post
      </button>
    </form>
  );
}

AddPost.propTypes = {
  onAddPost: PropTypes.func.isRequired,
};
