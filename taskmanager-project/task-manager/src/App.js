import React, { useState } from "react";
import Login from "./components/Login";
import Layout from "./components/Layout";
import "./styles/style.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn ? (
        <Login onSuccess={() => setLoggedIn(true)} />
      ) : (
        <Layout />
      )}
    </>
  );
}

export default App;
