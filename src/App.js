
import './App.css';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Dashboard from './Task-Management/Dashboard';
function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
