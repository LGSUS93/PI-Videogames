import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { postVideogames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import s from "./CreateVideogame.module.css"

export default function CreateVideogame() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres);

    const platformsApi = [
        "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
        "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: []
    })

    function handlerChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handlerSelectPlatforms(e) {
        setInput({
            ...input,
            platforms: input.platforms.includes(e.target.value) ? input.platforms : [...input.platforms, e.target.value]
        });
    }

    function handlerDeletePlatforms(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== el)
        });
    }

    function handlerSelectGenres(e) {
        setInput({
            ...input,
            genres: input.genres.includes(e.target.value) ? input.genres : [...input.genres, e.target.value]
        });
    }

    function handlerDeleteGenres(el) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== el)
        });
    }

    function handlerSubmit(e) {
        e.preventDefault();
        if(validarFormulario()){
            dispatch(postVideogames(input));
            window.setTimeout(function() {
                document.getElementById("mensaje").style.opacity = 1;
                document.getElementById("mensaje").style.marginLeft = "23%";
                document.getElementById("mensaje").style.backgroundColor = "green";
                document.getElementById("mensaje").innerHTML = "The videogame has been created successfully";;
            },1000);

            window.setTimeout(function() {
                document.getElementById("mensaje").style.opacity = 0.0;
            },4000);

            setInput({
                name: "",
                description: "",
                released: "",
                rating: "",
                platforms: [],
                image: "",
                genres: []
            })

            history.push("/home")
        }
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    //validaciones Javascript
    function validarFormulario() {

        if(input.name.trim().length === 0) {
            alert('the name is empty');
            return false;
        }
        if (input.description.trim().length === 0) {
            alert('the description is empty');
            return false;
        }
        if(input.released.trim().length <= 0){
            alert('select a valid date');
            return false;
        }
        if(input.rating < 0 && input.rating > 5){
            alert('your rating should be between 0 and 5');
            return false;
        }
        if(input.genres.length === 0){
            alert('you should select at least 1 genre');
            return false;
        }
        if(input.platforms.length === 0){
            alert('you should select at least 1 platform');
            return false;
        }
        return true;
    }

    return(
        <div className={s.divGeneral}>

            <Nav/>

            <div className={s.divCreate}>

                <h1 className={s.title}>New Videogame</h1>

                <form  onSubmit={(e) => {handlerSubmit(e)}} id="formulario">
                    <div className={s.data}>
                        <div className={s.firstColumn}>

                            <div>
                                <label>Name: </label>
                                <input
                                    type="text"
                                    value={input.name}
                                    name= "name"
                                    onChange={(e) => handlerChange(e)}
                                    required= "required"
                                    placeholder="Videogame"
                                    className={s.input}
                                />
                            </div>
                            <br></br>
                            <div>
                                <label>Description: </label>
                                <textarea
                                    type="text"
                                    value={input.description}
                                    name= "description"
                                    onChange={(e) => handlerChange(e)}
                                    required="required"
                                    placeholder="Enter a description"
                                    className={s.inputDescription}
                                />
                            </div>
                            <br></br>
                            <div>
                                <label>Image: </label>
                                <input
                                    type="text"
                                    value={input.image}
                                    name= "image"
                                    onChange={(e) => handlerChange(e)}
                                    placeholder="Imagen URL"
                                    className={s.input}
                                />
                            </div>
                        </div>
                        <div className={s.secondColumn}>
                            <div>
                                <label>Released: </label>
                                <input
                                    type="date"
                                    value={input.released}
                                    name= "released"
                                    onChange={(e) => handlerChange(e)}
                                    className={s.input}
                                    required="required"
                                />
                            </div>
                            <br></br>
                            <div>
                                <label>Platforms: </label>
                                <select className={s.input} required="required" onChange={(e) =>{handlerSelectPlatforms(e)}}>
                                    <option value="">Choose 1 or more</option>
                                    {
                                        platformsApi && platformsApi.map((p, index) => (
                                            <option key={index} value={p}>{p}</option>
                                        ))
                                    }
                                </select>
                                {
                                    input.platforms.map((el, index) =>
                                        <div key={index} className={s.divMultiSelect}>
                                            <p className={s.multiSelect}>{el}</p>&nbsp; 
                                            <button onClick={() => {handlerDeletePlatforms(el)}}>
                                                <img className={s.imgs_delete} src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg" alt="VIDEOGAMES" width="150px"/>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Rating: <br></br></label>
                                <input
                                    type="number"
                                    value={input.rating}
                                    name= "rating"
                                    onChange={(e) => handlerChange(e)}
                                    className={s.input}
                                    id={s.inputRating}
                                    step = {0.01}
                                    placeholder= "0.00 - 5.00"
                                    min= {0.00}
                                    max= {5}
                                    required="required"
                                />
                            </div>
                            <br></br>
                            <div>
                                <label>Genres: </label>
                                <select className={s.selectGenres} required="required" onChange={(e) =>{handlerSelectGenres(e)}}>
                                    <option value="">Choose 1 or more</option>
                                    {
                                        genres && genres.map(g => (
                                            <option key={g.id} value={g.name}>{g.name}</option>
                                        ))
                                    }
                                </select>

                                {
                                    input.genres.map((el, index) =>
                                        <div key={index} className={s.divMultiSelect}>
                                            <p className={s.multiSelect}>{el}</p>
                                            <button className={s.btnMultiSelect} onClick={() => {handlerDeleteGenres(el)}}>X</button>
                                        </div>
                                    )
                                }
                            </div>
                        
                        </div>
                    </div>
                    <div className={s.crt_cncl}>
                        <button className={s.btn} type="submit">
                            <img className={s.imgs_crt} src="https://www.shareicon.net/download/2016/06/26/623157_game.ico" alt="VIDEOGAMES" width="150px"/>
                        </button>

                        <Link to='/home'>
                            <button className={s.btn_cncl}>
                                <img className={s.imgs_crt} src="https://cdn-icons-png.flaticon.com/512/10100/10100000.png" alt="VIDEOGAMES" width="150px"/>
                            </button>
                        </Link>
                    </div>

                </form>

            </div>
        </div>
    )
}