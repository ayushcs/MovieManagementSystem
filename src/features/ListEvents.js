// contains the list handle functions
export const removesFromExisting = (visibleList, selectedRows, dispatch, action) => {
    dispatch({type: action, list: fetchedRemovedList(visibleList, selectedRows)});
}

const fetchedRemovedList = (visibleList, selectedRows) =>{
    var currentList = visibleList.filter(item => !selectedRows.find(index => index.imdbID === item.imdbID));
    return currentList;
}

const fetchAddedList = (visibleList, selectedRows) => {
    var currentList = [];
    if (visibleList.length !== 0) {
        var currentArray=[...visibleList,...selectedRows];
        var lookup = {};
        for (var curData, curIndex = 0; curData = currentArray[curIndex++];) {
            var name = curData.imdbID;
            if (!(name in lookup)) {
                lookup[name] = 1;
                currentList.push(curData);
            }
        }
    } else {
        currentList = selectedRows;
    }
    return currentList;
}

export const addFromExisting = (visibleList, selectedRows, dispatch, action) => {
    dispatch({type: action, list: fetchAddedList(visibleList, selectedRows)});
}

export const addRemoveFromExisting = (addList, selectedRows, removeList, dispatch, action) => {
    var currentList = fetchAddedList(addList, selectedRows);
    var removedList = fetchedRemovedList(removeList, selectedRows)
    dispatch({type: action, watchedList: currentList , myList: removedList});
}


export default {removesFromExisting, addFromExisting, addRemoveFromExisting};