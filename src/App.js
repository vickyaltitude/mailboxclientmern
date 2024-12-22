import { Routes,Route } from "react-router-dom";
import NavbarComponent from "./Components/NavBar/NavBarComponent";
import SignUpPage from "./Components/SignUp/SignUpPage";
import Login from "./Components/Login/Login";



function App() {
  return (
    <>
     <NavbarComponent />
     <h1>Welcome to mailbox client please signup or login</h1>
     <Routes>
        <Route path='/signup' element={<SignUpPage />} /> 
      <Route path='/login' element={<Login /> }/>
     </Routes>
    </>
  );
}

export default App;
