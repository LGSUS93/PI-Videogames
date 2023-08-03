import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import Nav from "../Nav/Nav";
import CardVideogame from "../CardVideogame/CardVideogame";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import OrderBy from "../OrderBy/OrderBy";
import { filterByGenres, filterByCreated } from "../../redux/actions";
import { orderByName, orderByRating } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import imgDefault from "../../images/imgDefault.png";

export default function Home() {

    let dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const [source, setSource] = useState("All");
    const [namechange, setNamechange] = useState('');
    const [ratingchange, setRatingchange] = useState('');
    const [genrechange, setGenrechange] = useState('');
    const [, setOrder] = useState()

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    function handleClickReset(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setNamechange("");
        setRatingchange("");
        setGenrechange("")
        setCurrentPage(1);
        setSource("All");
    }

    function handlerGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
        setSource("All");
        setGenrechange(e.target.value);
        setOrder("Order" + e.target.value)
    }
    
    function handlerCreated(e) {
        dispatch(filterByCreated(e));
        setSource(e);
        setCurrentPage(1);
        setGenrechange("");
        setOrder("Order" + e)
    }

    function handlerByName(e) { //no puedo pasar un estado local a otro componente?
        dispatch(orderByName(e))
        setCurrentPage(1);
        setRatingchange("");
        setNamechange(e);                      
        setOrder("Order" + e) 
    }

    function handlerByRating(e) { 
        dispatch(orderByRating(e));
        setCurrentPage(1);   
        setNamechange("");                   
        setRatingchange(e); 
        setOrder("Order" + e); 
    }

    return (
        <div>

            <Nav/>

            <div className={s.divTwoColum}>
                
                <div className={s.firstColum}>
                    <OrderBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange}/>
                    <Filters handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange}/>
                    <button onClick={e => {handleClickReset(e)}} className={s.btn}>
                        <img className={s.imgs} src='https://cdn-icons-png.flaticon.com/512/2618/2618245.png' alt="RESET"/>
                    </button>
                </div>

                <div className={s.secondColum}>
                    <br></br>
                    <img className={s.title_img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Videogames1991-01_%28logo%29.svg/700px-Videogames1991-01_%28logo%29.svg.png" alt="VIDEOGAMES" width="150px"/>
                    <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                    
                    <div className={s.home}>
                        <Link to='/'>
                            <button className={s.btnLeave}>
                                <img className={s.exit_img} src="https://cdn-icons-png.flaticon.com/512/3094/3094700.png" alt="VIDEOGAMES" width="150px"/>
                            </button>
                        </Link>
                        <p id="mensaje" className={s.message}></p>

                        {currentVideogames.length > 0 ?
                        <div className={s.divCards}>
                            {currentVideogames.map( el => {
                                return (
                                    <div key={el.id}>
                                        <CardVideogame name={el.name} genres={el.genres} image = {el.image ? el.image : imgDefault} rating={el.rating} id={el.id} createdInDb={el.createdInDb}/>
                                    </div>
                                );
                            })}
                        </div> 
                        : 
                        <div className={s.divLoading}>
                            <img className={s.loading} src="https://img1.picmix.com/output/stamp/normal/8/5/2/9/509258_fb107.gif" alt="Img not found" width="150px"/>                            
                        </div>}
                        
                    </div>
                    <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    )
}