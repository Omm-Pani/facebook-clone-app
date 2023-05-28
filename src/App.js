import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedinRoutes from "./routes/LoggedinRoutes";
import NotLoggedinRoutes from "./routes/NotLoggedinRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ posts, loading, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    error: "",
    posts: [],
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({ type: "POST_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: "POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "POST_ERROR", payload: error.response?.data.message });
    }
  };

  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedinRoutes />}>
          <Route
            path="/profile"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedinRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
