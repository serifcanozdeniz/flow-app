import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  //   kullanıcı sayfaya girince verileri al
  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  //   post gönderme
  const addPost = (newPost) => {
    // 1) veritabanına yeni postu ekle
    axios.post("/posts", newPost).then((res) => {
      // 2) state'in en başına yeni postu ekle
      setPosts([newPost, ...posts]);
    });
  };
  //   post silme
  //   post güncelleme

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
