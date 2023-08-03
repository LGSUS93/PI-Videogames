import React from "react";
import { Link } from "react-router-dom";
import s from "./CardVideogame.module.css"
import { deleteVideogame } from "../../redux/actions";
import { getVideogames } from "../../redux/actions";
import { useDispatch } from "react-redux";


export default function CardVideogame({name, genres, image, rating, id, createdInDb}) {

    let dispatch = useDispatch();
      
    function handlerClickDelete(id) {
        document.getElementById("mensaje").style.opacity = 1;
        let mensaje;
        var opcion = window.confirm("Are you sure you want to delete this? ");
        if (opcion === true) {
            dispatch(deleteVideogame(id));
            dispatch(getVideogames())
            mensaje = "The videogame has been deleted successfully";
            document.getElementById("mensaje").style.marginLeft = "23%";
            document.getElementById("mensaje").style.backgroundColor = "green";
        } else {
            mensaje = "The videogame is safe";
            document.getElementById("mensaje").style.marginLeft = "35%";
            document.getElementById("mensaje").style.backgroundColor = "red";
        }
        document.getElementById("mensaje").innerHTML = mensaje;
        window.setTimeout(function() {
            document.getElementById("mensaje").style.opacity = 0.0;
        },2000);
    
    }


    return (
        
        <div className={s.div}>

            <Link to={`/videogame/${id}`}>
                <h3 className={s.title}>{name}</h3>
            </Link>
            <Link to={`/videogame/${id}`}>
                <img className={s.imgs} src={image} alt="img not found"/>
            </Link>


                <div className={s.afterImg}>
                    <p className={s.text}>{genres.join(", ")}</p>
                    <p className={s.rating} style={
                        rating < 1
                        ? { backgroundColor: "rgb(255, 77, 91)" }
                        : rating < 4
                        ? { backgroundColor: "rgb(253, 158, 81)" }
                        : { backgroundColor: "rgb(4, 201, 4)" }
                        }>
                        {rating}
                    </p>
                </div>
                <br></br>
                <div>
                    {
                        createdInDb === true ? 
                        <button className={s.btnDelete} onClick={() => handlerClickDelete(id)}>
                             <img className={s.imgs_delete} src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg" alt="VIDEOGAMES" width="150px"/>
                        </button>
                        : undefined
                    }     
                </div>
        </div>
    )
}