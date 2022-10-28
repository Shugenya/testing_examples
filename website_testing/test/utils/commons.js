module.exports = {
    sortedNumbers: function (array, isAscending){
        let second_index;
        for(let first_index = 0; first_index < array.length - 1 ; first_index++){
            second_index = first_index + 1;
            let diff = array[second_index] - array[first_index];
            if(isAscending &&  diff < 0) return false;
            if(!isAscending && diff > 0) return false;
        }
        return true;
    },

    sortedStrings : function (array, isAscending){
        let second_index;
        for(let first_index = 0; first_index < array.length - 1; first_index++){
            second_index = first_index + 1;
            let compare = array[second_index].localeCompare(array[first_index]);
            if(isAscending && compare < 0) return false;
            if(!isAscending && compare > 0) return false;
        }
        return true;
    },

    areAllElementsAtEnd: function (array, atEndString){
        let first_diff = 0;
        for(let index = array.length - 1; index >= 0; index--){
            let element = array[index].toLowerCase();
            if( first_diff == 0 && element !== atEndString){
                first_diff = index;
            }
            else if(first_diff > 0 && element === atEndString){
                return false;
            }
        }
        return true;
    }
};