import Nav from "../Nav/Nav"
import s from "./About.module.css"
import linkedin from '../../images/linkedin.png';
import github from '../../images/github.png';
import logo_react from '../../images/react.png';
import logo_redux from '../../images/redux.png';
import logo_express from '../../images/express.png';
import logo_sequelize from '../../images/sequelize.png';
import logo_postgres from '../../images/postgres.png';

export default function About() {

    return(
        <div className={s.divGeneral}>
            
            <Nav/>

            <div className={s.divDetail}>

            <img className={s.title_img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Videogames1991-01_%28logo%29.svg/700px-Videogames1991-01_%28logo%29.svg.png" alt="VIDEOGAMES" width="150px"/>

                <p className={s.text}>
                    Hello👋, my name is Jesús López, and this is my Individual Project
                    with you, MY VIDEOGAMES app 🎮 .
                    <br/>
                    <br/>
                    Videogames Individual Project, consist in a Single Page Application (SPA).
                    We get the data from the API https://api.rawg.io/ 
                    <br/>
                    <br/>
                    This is the largest video game database and game discovery service.
                    has a pagination and also has the functionality to search,
                    filter, order and create video games.
                    <br/>
                    <br/>
                    This application was developed using:
                    Javascript, React, Redux, Node.js, Express, PostgreSQL,
                    Sequalize and pure CSS 👩💻.
                </p>
                <div className={s.conteiner_tecnologias}>
                    <img className={s.image_tecnologias} src={logo_react} alt="react" />
                    <img className={s.image_tecnologias} src={logo_redux} alt="redux" />
                    <img className={s.image_tecnologias} src={logo_express} alt="express" />
                    <img className={s.image_tecnologias} src={logo_sequelize} alt="sequelize" />
                    <img className={s.image_tecnologias} src={logo_postgres} alt="postgres" />
                </div> 
                <br></br>
                <div className={s.divRedes}>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jesus-lopez-gomez-93-01-07-lgsus" className={s.redes}>
                        <img className={s.imagenL} src={linkedin} alt="img not found"/>
                        <p className={s.textRedes}>LinkedIn</p>
                    </a>
                    
                    <a target="_blank" rel="noreferrer" href="https://github.com/LGSUS93" className={s.redes}>
                        <img className={s.imagenG} src={github} alt="img not found"/>
                        <p className={s.textRedes}>GitHub</p>
                    </a>
                </div>
                 
            </div>
           
        </div>
    )
}