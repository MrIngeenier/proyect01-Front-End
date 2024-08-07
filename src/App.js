import Principal from './pages/Principal';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={< Principal/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
