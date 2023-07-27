import React from "react";
import UserPost from "./UserPost";
import PropTypes from "prop-types";

export default function UserPostsList({
  posts,
  user,
  onRemovePost,
  onUpdatePost,
}) {
  if (posts.length === 0) {
    return <p>No posts yet</p>;
  }

  return (
    <div className="user-posts-list">
      {posts.map((post) => (
        <UserPost
          key={post.id}
          post={post}
          user={user}
          onRemovePost={onRemovePost}
          onUpdatePost={onUpdatePost}
        />
      ))}
    </div>
  );
}

UserPostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onRemovePost: PropTypes.func,
  onUpdatePost: PropTypes.func,
};
