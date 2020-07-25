const initialState = {
    movies: {},
    error: '',
    response: 'False',
    watched: [],
    list: [],
    list_mode: true,
    ids_details: [],
    year_filter: '', 
}

const moviesReducers = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS' : return {
            ...state,
            movies: action.movieDetails,
            response: action.response,
            error: action.error
        }
        case 'FETCH_ERROR' : return {
            ...state,
            response: action.response,
            error: action.error,
        }
        case 'ADD_IDS' : return {
            ...state,
            ids_details: [...state.ids_details, action.ids_details],
        }
        case 'ADD_LIST':
        case 'REMOVE_LIST': return {
            ...state,
            ids_details: [],
            list_mode: true,
            list: action.list
        }
        case 'ADD_WATCHED' :
        case 'REMOVED_WATCHED': return {
            ...state,
            ids_details: [],
            list_mode: false,
            watched: action.list
        }
        case 'REMOVE_IDS' : return {
            ...state,
            ids_details: action.ids_details
        }
        case 'YEAR_FILTER' : return {
            ...state,
            year_filter: action.year_filter
        }
        case 'LIST_MODE' : return {
            ...state,
            list_mode: action.mode
        }
        case 'ADD_FROM_LIST': return {
            ...state,
            ids_details: [],
            watched: action.watchedList,
            list: action.myList,
            list_mode: false,
        }
        default : return state
    }
}
export default moviesReducers