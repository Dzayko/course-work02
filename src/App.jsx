import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Report from "./pages/Report/Report";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
