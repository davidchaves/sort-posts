import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const postData = await response.json();
      setPosts(postData);
    };

    fetchUserData();
  }, []); // A dependência é um array vazio para garantir que o fetch só ocorre uma vez

  useEffect(() => {
    if (posts.length > 0) {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % posts.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [posts]);

  return (
    <>
      {posts.length > 0 && (
        <div key={posts[index].id}>
          <h2>{posts[index].title}</h2>
          <p>{posts[index].body}</p>
        </div>
      )}
    </>
  );
}

export default App;
