import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Home } from "../components/Home/Home";
import { SignUp } from "../components/SignUp/SignUp";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

export function MyRoutes(){

    const [username, setUserName] = useState([])
    useEffect(()=>{
       auth.onAuthStateChanged((user)=>{
        if(user){
            setUserName(user.displayName)
        }else setUserName("")
       })
    },[])

    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/home" element={ <Home name={username}/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
            </Routes>
        </Router>
    )
}