import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux'
import SetDetails from './SetDetails';
import {addFromExisting} from './ListEvents';

// Create option only for once as needed statically
const createOption = () => {
    var options = [];
    for (var index = 2000; index < 2021; index ++) {
        options.push(<option key={index} value={index}>Filter On The Basis of {index} Year</option>);
    }
    return options;
}

function FetchData() {
    const state = useSelector(state=> state);
    const dispatch = useDispatch();

    // call useeffect for the data fetching only when year changed 
    useEffect(() => {
        axios.get('http://www.omdbapi.com/?apikey=32395055&type=movie&s=bad&y='+state.year_filter)
            .then(res => {
                dispatch({type: 'FETCH_SUCCESS',movieDetails: res.data.Search, response: res.data.Response, error: (res.data.Error !== undefined) ? res.data.Error: ''});
            })
            .catch(e => {
                dispatch({type: 'FETCH_ERROR', error: 'Something Went wrong', response: 'False'});
            })
    }, [state.year_filter])

    var handle = (value) => {
        dispatch({type:'YEAR_FILTER', year_filter: value})
    }

    return (
            <div className="screen">
                {state.response === 'True' ?
                    <div className="select_container align_middle">
                        <select value={state.year_filter} onChange = {e=>handle(e.target.value)}>
                            <option value="">Clear Filter</option>
                            {createOption()}
                        </select>
                        {state.year_filter !== '' ? <div className="filter">Data on the basis of {state.year_filter}</div> : ''}
                    </div> 
                : null}
                <div className="movie_details">
                    <SetDetails movies={state.movies} response={state.response} mode='movie'/>
                </div>
                {state.response === 'True' ?
                    <div className="align_middle">
                        <Link to="/list">
                            <button className="btn-primary" disabled={state.ids_details.length === 0} onClick={()=>addFromExisting(state.list, state.ids_details ,dispatch, 'ADD_LIST')}>Add To My list</button>
                        </Link>
                        <Link to="/list">
                            <button className="btn-primary" disabled={state.ids_details.length === 0} onClick={()=>addFromExisting(state.watched, state.ids_details ,dispatch, 'ADD_WATCHED')}>Add To Watched List </button>
                        </Link>
                    </div>
                : null }

            </div>
    )
}

export default FetchData
