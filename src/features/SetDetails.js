// for creating the tables whereever needed

import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'

function SetDetails (props) {
    const dispatch = useDispatch();
    const [alreadyAddedInList, setAddedList] = useState([]);
    const currentState = useSelector(state=> state);
    const handleInput = (value, checked, index) => {
        if (checked) {
            dispatch({type: 'ADD_IDS',  ids_details: props.movies[index]}) 
        } else {
            currentState.ids_details.map((id, index)=>{
                if (id.imdbID === value) {
                    currentState.ids_details[index] = null
                }
            })
            var current_value = currentState.ids_details.filter(function (el) {
                return el != null;
            });
            dispatch({type: 'REMOVE_IDS', ids_details: current_value});
        }
    } 

    useEffect(() => {
        if (Object.keys(props.movies).length != 0  && props.mode === 'movie') {
            var listArray = props.movies.filter(item => currentState.list.find(index => index.imdbID === item.imdbID));
            var watchArray = props.movies.filter(item => currentState.watched.find(index => index.imdbID === item.imdbID));
            var listDetails = [];
            listArray.map((item) => {
                listDetails[item.imdbID] = 'fa fa-list';
            });
            watchArray.map((item) => {
                listDetails[item.imdbID] = 'fa fa-clock-o';
            });
            // doesn't need to save data for the listDetails
            setAddedList(listDetails);
        }
    }, []);


    if (props.response === "True") {
        return (
            <table border="1">
                <thead>
                    <tr> 
                        <th>Add</th>
                        <th>Poster</th>
                        <th>Title </th>
                        <th>Year</th>     
                    </tr>
                </thead>
                <tbody>
                    {
                        props.movies.map((movie, index) => {
                            return (
                                <tr key={movie.imdbID + currentState.list_mode}>
                                    <td className="align_middle">
                                        {
                                            alreadyAddedInList[movie.imdbID] ? <div className="badge"><i className={alreadyAddedInList[movie.imdbID]}></i></div>
                                            : <input type="checkbox" value={movie.imdbID} data-index={index} id={movie.imdbID} onChange={e => handleInput(e.target.value, e.target.checked, e.target.dataset.index)}/>
                                        }
                                    </td>
                                    <td className="align_middle">
                                        {(movie.Poster === 'N/A') ? 'No Image in Api' : <img width="100" src={movie.Poster} alt="Poster" />}
                                    </td>
                                    <td>{movie.Title}</td>
                                    <td>{movie.Year}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    } else {
        return (<div className="align_middle">{currentState.error}</div>)
    }
}
export default SetDetails
