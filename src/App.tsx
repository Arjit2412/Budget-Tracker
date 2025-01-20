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
      </Routes>
    </BrowserRouter>
  );
};

export default App;