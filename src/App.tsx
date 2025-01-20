import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Centre from "./pages/Centre";
import CentralMinistries from "./pages/CentralMinistries";
import States from "./pages/States";
import StateMinistries from "./pages/StateMinistries";
import Local from "./pages/Local";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/centre" element={<Centre />} />
        <Route path="/centre/ministries" element={<CentralMinistries />} />
        <Route path="/centre/states" element={<States />} />
        <Route path="/state" element={<States />} />
        <Route path="/state/:state" element={<StateMinistries />} />
        <Route path="/local" element={<Local />} />
        <Route path="/revenue" element={<div className="text-center py-12"><h1 className="text-3xl font-bold">Revenue Page</h1></div>} />
        <Route path="/expenditure" element={<div className="text-center py-12"><h1 className="text-3xl font-bold">Expenditure Page</h1></div>} />
        <Route path="/about" element={<div className="text-center py-12"><h1 className="text-3xl font-bold">About Us Page</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;