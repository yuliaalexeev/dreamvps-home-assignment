import express from "express";
import cors from "cors";
import { database } from "./database.js";
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.json(database.posts);
});

app.post("/posts", (req, res) => {
  const { username } = req.body.by;
  const { content } = req.body;
  const newPost = {
    id: uuidv4(),
    content,
    time: Date.now(),
    by: { username },
  };
  database.posts.push(newPost);
  res.json({ message: "Post created successfully!", posts: database.posts });
});

app.put("/posts", (req, res) => {
  const postId = req.body.id;
  const newPostContent = req.body.content;

  const postIndex = database.posts.findIndex((post) => post.id === postId);
  database.posts[postIndex].content = newPostContent;
  res.send("Post updated successfully.");
});

app.post("/register", (req, res) => {
  const { username, password, repeatPassword } = req.body;

  const isUsernameUnique = !database.users.some(
    (user) => user.username === username
  );

  if (!isUsernameUnique) {
    return res.status(400).json({ error: "Username already exists!" });
  } else {
    const id = uuidv4();
    const newUser = { username, password, repeatPassword, id };
    database.users.push(newUser);
    return res.json({ message: "Registration successful!" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = database.users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  } else {
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password!" });
    }
  }
  const userData = { id: user.id, username: user.username };
  return res.json({ message: "Login successful!", user: userData });
});

app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const postIdx = database.posts.findIndex((post) => post.id === postId);
  database.posts.splice(postIdx, 1);
  res.json({ message: "Post deleted successfully!", posts: database.posts });
});

app.listen(3001);
