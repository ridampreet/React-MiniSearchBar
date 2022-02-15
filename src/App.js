import Signup from "./component/Signup";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Items from "./component/ItemDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/details/:id" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
