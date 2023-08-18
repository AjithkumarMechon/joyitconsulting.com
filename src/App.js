import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Container/Footer";
import TotalProductsFetch from "./Component/Container/TotalProductsFetch";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TotalProductsFetch />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
