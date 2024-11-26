import Principal from './pages/Principal';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import CasherDashboard from './components/HomePage/Sidebar/CasherDashboard';
import CasherDashboard2 from './components/HomePage/Sidebar/CasherDashboard2';
import SalesDashboard from './components/HomePage/Sidebar/SalesDashboard';
import SalesDashboard2 from './components/HomePage/Sidebar/SalesDashboard2';
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
        <Route path="/admin" element={< Dashboard/>} />
        
        <Route path="/casher" element={< CasherDashboard/>} />
        <Route path="/casher2" element={< CasherDashboard2/>} />

        <Route path="/sales" element={< SalesDashboard/>} />
        <Route path="/sales2" element={< SalesDashboard2/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
