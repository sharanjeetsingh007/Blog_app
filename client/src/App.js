import './App.css';
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
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import Blog from './Components/Blog/Blog';




function App() {

  return (
    <div className="App">

      <BrowserRouter>
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
