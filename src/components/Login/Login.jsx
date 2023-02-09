import styles from "./login.module.css"
import { InputControl } from "../InputControl/InputControl"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"


export function Login(){

  const navigate = useNavigate();
  const [values, setValues] = useState({email:"",pass:""})
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);
  const Logging=()=>{
    if(!values.email || !values.pass){
      setErrorMsg("Faltan datos");
      return
    }
    setErrorMsg("");
    setSubmitButtonDisable(true);
    signInWithEmailAndPassword(auth,values.email,values.pass)
    .then(async(res)=>{
      setSubmitButtonDisable(false);
      navigate("/home");
    })
    .catch((err)=>{
      setSubmitButtonDisable(false);
      setErrorMsg(err.message);
    });
  };

    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>
            <InputControl label="Email" onChange={(event)=>setValues((prev)=>({...prev,email:event.target.value}))} placeholder="Ingrese su correo"/>
            <InputControl label="Contraseña" onChange={(event)=>setValues((prev)=>({...prev,pass:event.target.value}))} placeholder="Ingrese su contraseña"/>
                <div className={styles.footer}>
                  <b className={styles.error}>{errorMsg}</b>
                  <button onClick={Logging} disabled={submitButtonDisabled}>Entrar</button>
                  <p>
                  Crear cuenta:
                  <span>
                    <Link to="/signup"> Registrar</Link>
                  </span>
                  </p>
                </div>
            </div>

        </div>
    )
}