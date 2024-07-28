import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar/NavBar';
import Error404 from './components/404/404';
import Home from './components/home/Home';
import ImageCropper from './components/cropper/Cropper';

export default function App() {
  return (
    <div className="min-h-screen antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cropper" element={<ImageCropper />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}
