import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import s from "./Filters.module.css"

export default function Filters({handlerGenres, handlerCreated, source, genrechange}) {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);


    return (
        <div className={s.divSourceGenres}>

            <div className={s.divSource}>
                <p className={s.titles}>SOURCE</p>

                <div className={s.divSource}>
                    
                    <button className={s.source} onClick={() => handlerCreated('Created')}>
                        <img className={s.imgs} src='https://www.pngitem.com/pimgs/m/222-2225376_data-source-icon-png-clipart-png-download-data.png' alt="ALL"/>
                    </button>
                    <button className={s.source} onClick={() => handlerCreated('Api')}>
                        <img className={s.imgs} src='https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png' alt="ALL"/>
                    </button>
                    <button className={s.source} onClick={() => handlerCreated('All')} >
                        <img className={s.imgs} src='https://i.pinimg.com/564x/ec/08/7a/ec087abfa8ad81de72e07be92815d962.jpg' alt="ALL"/>
                    </button>
                </div>
            </div>

            <div>
                <p className={s.titles}>GENRES</p>

                <select value={genrechange} onChange={(e) => handlerGenres(e)} className={s.select}>
                    <option value=''>--Select--</option>
                    <option value='All'>All</option>
                    {
                        genres && genres.map(g => (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        ))
                    }
                </select>
            </div>

        </div>
    )
}