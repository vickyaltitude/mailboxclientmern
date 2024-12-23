import { Routes,Route, useNavigate } from "react-router-dom";
import NavbarComponent from "./Components/NavBar/NavBarComponent";
import SignUpPage from "./Components/SignUp/SignUpPage";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {emailReducerAction} from './Components/store/EmailReducer'
import { userReducerAction } from "./Components/store/UserReducer";
import InboxPage from "./Components/Home/Inbox";
import MailDetailPage from "./Components/Home/MailDetailPage";
import About from "./Components/Home/About";





function App() {
   
  const dispatch = useDispatch();
   const navigate = useNavigate();
   const currentUser = useSelector(state => state.userReducer.currentUserToken);
  const [isLoading,setIsloading] = useState(false)
  


  useEffect(()=>{

      
  if(localStorage.getItem('userAuthId')){

    dispatch(userReducerAction.setIsLoggedIn())
    dispatch(userReducerAction.setCurrentUserToken(localStorage.getItem('userAuthId')))
  }else{
    dispatch(userReducerAction.setCurrentUserToken(null))
    navigate('/login')
  }


  },[])

  
  useEffect(()=>{

    setIsloading(true)

    if(localStorage.getItem('userAuthId')){
         
      fetch('http://localhost:8000/getemail',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('userAuthId')
        }
      }).then(async resp =>{
       const parsedData = await resp.json();
      console.log(parsedData)
      dispatch(emailReducerAction.setEmails(parsedData.data))
       
      }).catch(err => console.log(err))
  

    }

    setIsloading(false)
  },[currentUser])

 

  return (
    <>
     <NavbarComponent />
    
      {isLoading && <h6>Loading please wait ...</h6>}
      {!isLoading &&  <Routes> <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<SignUpPage />} /> 
        <Route path='/login' element={<Login /> }/>
        <Route path='/inbox' element={<InboxPage />} />
        <Route path='/inbox/:emailId' element={<MailDetailPage /> } /> 
        <Route path='/about' element={<About />} />
        </Routes>  
        }
   
    </>
  );
}

export default App;
