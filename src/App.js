import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDash from './Dashboard';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Upload from './components/UploadPage/upload';
// import TablePage from './components/TablePage/TablePage'


import Page from './components/View/Page';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          {/* <Route path="/table" element={<TablePage />} /> */}
          <Route path="/dashboard" element={<MainDash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/page" element={<Page />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
