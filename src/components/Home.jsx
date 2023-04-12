import React, { useEffect } from "react";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Posts from "./Posts";
import Post from "./Post";
import PostCreation from "./PostCreation";
import Footer from "./Footer";
import Homepage from "./Homepage";
import "./Home.css";
import logo from "../util/Reddit-Logo-2005.png";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "FakeReddit.com";
  });
  return (
    <>
      <div>
        <nav
          style={{
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "flex-start",
            padding: "1rem",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <img src={logo} alt="" style={{ maxWidth: "100px" }} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "30rem",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "10rem",
              }}
              className={location.pathname === "/Home" ? "active" : ""}
              to="/Home"
            >
              <p>Home</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              className={location.pathname === "/posts" ? "active" : ""}
              to="/posts"
            >
              <p>Posts</p>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/Home" element={<Homepage />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/PostCreation/:id" element={<PostCreation />} />
          <Route path="/PostCreation" element={<PostCreation />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
