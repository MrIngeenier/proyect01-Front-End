import Principal from './pages/Principal';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//const homePath = process.env.REACT_APP_HOME_PATH || '/home';
//const authPath = process.env.REACT_APP_AUTH_PATH || '/';


function App() {
  return (
    <BrowserRouter>
      <Routes>
     {/* <Route path={homePath} element={<HomePage />} />
      <Route path={authPath} element={<Principal />} />*/} 

        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={< Principal/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
