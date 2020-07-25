import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import SetDetails from './SetDetails';
import {Link} from 'react-router-dom';
import {removesFromExisting, addRemoveFromExisting} from './ListEvents';

function MyList() {
    const currentState = useSelector(state => state);
    const dispatch = useDispatch();

    var list = currentState.list_mode ? currentState.list : currentState.watched
    const handleMode = (value) => {
        dispatch({type:'LIST_MODE', mode: value})
    }
    return (
        <div className="screen">
            <div className="toggle_btn" title={currentState.list_mode ? 'Toggle in My Watched List' : 'Toggle in My List'}>
                <div className="toggle_label">{currentState.list_mode ? 'Toggle in My Watched List' : 'Toggle in My List'}</div>
                <label className="switch">
                    <input type="checkbox" onChange={e=>handleMode(e.target.checked)} checked={currentState.list_mode}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <h1 className="align_middle">My { !currentState.list_mode ? 'Watched ' : ''}List</h1>
            { (list.length !== 0) ? 
                <div>
                    <SetDetails movies={list} response={currentState.response} mode='list'/> 
                    <div className="align_middle">
                        { currentState.list_mode ? 
                            <div>
                                <Link to="/list">
                                    <button className="btn-primary" disabled={currentState.ids_details.length === 0} onClick={()=>removesFromExisting(currentState.list, currentState.ids_details ,dispatch, 'REMOVE_LIST')}>Remove From My list</button>
                                </Link>
                                <Link to="/list">
                                    <button className="btn-primary" disabled={currentState.ids_details.length === 0} onClick={()=>addRemoveFromExisting(currentState.watched, currentState.ids_details ,currentState.list, dispatch, 'ADD_FROM_LIST')}>Add To Watched List </button>
                                </Link>
                            </div>
                        :   
                            <Link to="/list">
                                <button className="btn-primary" disabled={currentState.ids_details.length === 0} onClick={()=>removesFromExisting(currentState.watched, currentState.ids_details ,dispatch, 'REMOVED_WATCHED')}>Remove From My Watched list</button>
                            </Link>
                        }
                    </div>
                </div> 
                : <div className="align_middle">Add Movies into My { !currentState.list_mode ? 'Watched List From Movie List or My List' : 'List From Movie List'}</div>
            }
        </div>
    )
}

export default MyList
