import "react";
import "./App.css";
import PostApi from "./components/PostAPI";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <h1>Post</h1>

      <PostApi />
    </>
  );
}

export default App;
