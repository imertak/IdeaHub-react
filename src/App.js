import { BrowserRouter, Route, Routes } from "react-router-dom";
import OffcanvasExample from "./components/OffcanvasExample";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rules from "./pages/Rules";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AddTopic from "./pages/AddTopic";
import Dictionary from "./pages/Dictionary";
import TopicPage from "./pages/TopicPage";
import MyProfile from "./pages/MyProfile";
import SearchTopic from "./pages/SearchTopic";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <OffcanvasExample></OffcanvasExample>
      <Routes>
        <Route path="/giris" element={<Login></Login>}></Route>
        <Route path="/kayit-ol" element={<Register></Register>}></Route>
        <Route path="/kurallar" element={<Rules></Rules>}></Route>
        <Route path="/soru-sor" element={<AddTopic></AddTopic>}></Route>
        <Route path="/" index element={<Home></Home>}></Route>
        <Route path="/sozluk" index element={<Dictionary></Dictionary>}></Route>
        <Route
          path="/kullanici/:id"
          element={<UserProfile></UserProfile>}
        ></Route>
        <Route path="/konu/:id" element={<TopicPage></TopicPage>}></Route>
        <Route path="/profilim" element={<MyProfile></MyProfile>}></Route>
        <Route
          path="/konular/:searchTopic"
          element={<SearchTopic></SearchTopic>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
