import { Link } from "react-router-dom"
import { auth } from "../../firebase"
import styles from "./home.module.css"

function exit(){
    return auth.signOut()
}


export function Home(props){

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{props.name?`Bienvenido { ${props.name} }`:"Inicie sesión"}</h1>
            <div className={styles.btnContainer}>
            <Link to="/"><button onClick={exit} className={styles.btn}>Salir</button></Link>
            </div>
        </div>
    )
}