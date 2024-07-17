import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login';
import Resgiter from './pages/Resgiter';
import UserManager from './pages/UserManager';
import Home from './pages/Home';
import RecoveryPassword from './pages/RecoveryPassword';
import Blog from './pages/Blog/Blog';
import TwitterPage from './pages/TwitterPage';



function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/resgiter' element={<Resgiter/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/homeAdmin' element={<HomeAdmin/>} />
      <Route path='/users' element={<UserManager/>}/>
      <Route path='/recovery' element={<RecoveryPassword/>} />
      <Route path='/blog' element={<Blog/>} />
      <Route path='/twitterPage' element={<TwitterPage/>} />
    </Routes>
    </>
  );
}

export default App;
