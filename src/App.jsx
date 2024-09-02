import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";


export default function App() {

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/SignIn" element={<SignIn />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />

  </Routes>

  </BrowserRouter>;
  
}
