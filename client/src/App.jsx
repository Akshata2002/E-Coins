import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import PrivateRoutes from './helpers/routes/PrivateRoutes';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import Transactions from './pages/Transactions';
import TransferEcoins from './pages/TransferEcoins';
import ProfilePage from './pages/ProfilePage';
import LeaderBoard from './pages/LeaderBoard';

function App() {
 
  return (


    <>
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<PrivateRoutes/>}>
          <Route path='/student/dashboard' element={<StudentDashboard/>}/>
          <Route path='/student/transactions' element={<Transactions/>}/>
          <Route path='/student/transfer/ecoins' element={<TransferEcoins/>}/>
          <Route path='/leaderboard' element={<LeaderBoard/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Route>
       
      </Routes>
    </Router>
    </>
  )
}

export default App
