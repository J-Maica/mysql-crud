import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeTable from "./pages/EmployeeTable";
import Form from "./pages/Form";
import "../src/App.css";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
