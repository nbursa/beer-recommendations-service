import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import BeerDetailsPage from "./pages/BeerDetailsPage.tsx";
import ManagementPage from "./pages/ManagementPage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/beer/:id" element={<BeerDetailsPage />} />
        <Route path="/management" element={<ManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
