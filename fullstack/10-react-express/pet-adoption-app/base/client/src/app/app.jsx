import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css";
import { AddPet } from "../pages/addPet/addPet";
import { Home } from "../pages/home/home";
import { PetList } from "../pages/petList/petList";

export function App() {
  return (
    <Router>
      <div className="main-content">
        <nav>
          <Link to="/">Home</Link> | <Link to="/pets">Pets</Link> | <Link to="/add">Add Pet</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/add" element={<AddPet />} />
        </Routes>
      </div>
    </Router>
  );
}
