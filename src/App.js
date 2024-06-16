// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reg from './Account/Reg';
import Login from './Account/Login';
import AllBlogs from './Pages/AllBlogs';
import BlogDetails from './Pages/BlogDetails';
import AllCourses from './Pages/AllCourses';
import AllServices from './Pages/AllServices';
import TestimonialsPage from './Pages/TestimonialsPage';
import TeamPage from './Pages/TeamPage';
import Contact from './Pages/Contact';
import UpdatePassword from './Account/UpdatePassword';
import CategoryPost from './Pages/CategoryPost';


function App() {
  
  const PrivateRoute = ({children})=>{
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth")
    return token!==null && token!==undefined ? (

      children
      
    ) : (
        <Navigate to="/login" />
    )
 
  }

  const PublicRoute = [
    {  path: "/", component: <Home /> },
    {  path: "/reg", component: <Reg />},
    { path: "/login",  component: <Login /> },
    { path: "/allservices",  component: <AllServices/> },
    { path: "/testimonials",  component: <TestimonialsPage/> },
    { path: "/teams",  component: <TeamPage/> },
    { path: "/contact",  component: <Contact/> },
  ]

  const ProtectedRoute = [
    { path: "/allblogs", component: <AllBlogs /> },
    { path: "/blogdetails/:id", component: <BlogDetails /> },
    { path: "/catgerorypost/:id", component: <CategoryPost /> },
    { path: "/allcourses", component: <AllCourses /> },   
    { path: "/updatepassword", component: <UpdatePassword /> },   
  ]


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          {
            PublicRoute.map((item,index) => {
              return (
                
                  <Route key={index} path={item.path} element={item.component} />
               
              )
            })
          }
          {
            ProtectedRoute.map((item,index) => {
              return (
                
                  <Route key={index} path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
               
              )
            })
          }

        </Routes>
      </Router>
    </>
  );
}

export default App;
