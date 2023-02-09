import styles from "./signup.module.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { InputControl } from "../InputControl/InputControl"

export function SignUp(){

    const navigate = useNavigate();
    const [values, setValues] = useState({name:"", email:"", pass:""});
    const [errorMsg, setErrorMsg] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);

    const register = ()=>{
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("Rellene todos los campos")
            return;
        }
        setErrorMsg("")
        setSubmitButtonDisable(true)
        createUserWithEmailAndPassword(auth,values.email,values.pass)
        .then(async (res)=>{
            setSubmitButtonDisable(false);
            const user = res.user;
            await updateProfile(user,{
                displayName: values.name,
            });
            navigate("/home")
        })
        .catch((err)=>{
            setSubmitButtonDisable(false)
            setErrorMsg(err.message)
        });
    };

    return(
        <div className={styles.container}>
            <div className={styles.innerBox}>
            <h1 className={styles.heading}>Registro</h1>
            <InputControl label="Email" placeholder="ejemplo@ejemplo.com" onChange={(event)=> setValues((prev)=>({...prev, email:event.target.value}))}/>
            <InputControl label="Nombre" placeholder="Nombre de usuario" onChange={(event)=> setValues((prev)=>({...prev, name:event.target.value}))}/>
            <InputControl label="Contraseña" placeholder="Contraseña segura" onChange={(event)=> setValues((prev)=>({...prev, pass:event.target.value}))}/>
                <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={register} disabled={submitButtonDisabled}>Enviar</button>
                <p>
                Si ya tiene una cuenta,
                <span>
                    <Link to="/"> Inicie sesión</Link>
                </span>
                </p>
                </div>
            </div>
        </div>
    )
}