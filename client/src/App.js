import './App.css';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import signIn from './redux/actions';
// import signOut from './redux/action2';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './Pages/Registration';
import Login from './Pages/Login'
import Home from './Components/Home/Home';
import Layout from './Layout';
import CreatePost from './Components/CreatePost/CreatePost';
import Header from './Components/Header/Header';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import Practice from './Components/Practice';
import Blog from './Components/Blog/Blog';




function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get('http://localhost:9000/auth/redirecthome', { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data, 'response in protected routes')
  //       if (res.data.message) {
  //         dispatch(signIn())
  //       }
  //     })
  //     // .then((res) => {

  //     // })
  //     .catch((err) => {
  //       console.log(err)
  //       dispatch(signOut())
  //     })
  // }, [])


  return (
    <div className="App">

      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path="/currentBlog/:id" element={<Blog />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/createPost" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
