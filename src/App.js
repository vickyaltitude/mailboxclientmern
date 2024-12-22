import { Routes,Route, useNavigate } from "react-router-dom";
import NavbarComponent from "./Components/NavBar/NavBarComponent";
import SignUpPage from "./Components/SignUp/SignUpPage";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userReducerAction } from "./Components/store/UserReducer";



function App() {
   
  const dispatch = useDispatch();
   const navigate = useNavigate();


  useEffect(()=>{

      
  if(localStorage.getItem('userAuthId')){

    dispatch(userReducerAction.setIsLoggedIn())
    dispatch(userReducerAction.setCurrentUserToken(localStorage.getItem('userAuthId')))
     navigate('/home')
  }else{
    dispatch(userReducerAction.setCurrentUserToken(null))
    navigate('/signup')
  }


  },[])

 

  return (
    <>
     <NavbarComponent />
     <Routes>
     
      <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<SignUpPage />} /> 
        <Route path='/login' element={<Login /> }/>
     </Routes>
    </>
  );
}

export default App;
