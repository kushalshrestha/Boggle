export function generateAlphabets(sum,alphabet_distribution,box_size) {
    var min = 1;
    var max = sum;
    var size = alphabet_distribution.length;
    var array_list=alphabet_distribution;
    var total_required_characters = Math.pow(box_size,2);
    var selected='';
    for(var i=0;i<total_required_characters;i++){
        var random_number = Math.floor(Math.random()*(max-min)+min);
        for(var j=0; j<size;j++){
            if(random_number<=array_list[j].cumulativefrequency){
                // console.log(array_list[j].cumulativefrequency);
                selected+=array_list[j].letter;
                break;
            }
        }
    }
     return selected;
}    


export function generatePossibleMoves(selected_alphabets,size) {
    var available_characters = selected_alphabets;
    var possiblities = {};
    let box_size = parseInt(size);

    for (var i = 0; i < available_characters.length; i++) {
        var possible_move_index = [];
        var index_detail = {};
        var current_row = Math.floor(i / box_size);


        var right = calculateMoveRight(i, current_row, box_size);
        var bottom = calculateMoveBottom(i, current_row, box_size);
        var left = calculateMoveLeft(i, current_row, box_size);
        var top = calculateMoveTop(i, current_row, box_size);
        var bottom_right = calculateMoveBottomRight(i, current_row, box_size);
        var bottom_left = calculateMoveBottomLeft(i, current_row, box_size);
        var top_left = calculateMoveTopLeft(i, current_row, box_size);
        var top_right = calculateMoveTopRight(i, current_row, box_size);

        if (right != null) {
            possible_move_index.push(right);
        }
        if (bottom != null) {
            possible_move_index.push(bottom);
        }
        if (left != null) {
            possible_move_index.push(left);
        }
        if (top != null) {
            possible_move_index.push(top);
        }
        if (bottom_right != null) {
            possible_move_index.push(bottom_right);
        }
        if (bottom_left != null) {
            possible_move_index.push(bottom_left);
        }
        if (top_left != null) {
            possible_move_index.push(top_left);
        }
        if (top_right != null) {
            possible_move_index.push(top_right);
        }
        index_detail = {
            "value": available_characters.charAt(i),
            "possible_moves": possible_move_index
        };

        possiblities[i] = index_detail;
    }
    return possiblities;

}


export function calculateMoveRight(i, current_row, box_size) {
    var target_index = i + 1;
    var target_row = Math.floor(target_index / box_size);
    if ((target_row - current_row) == 0 && target_index < Math.pow(box_size, 2)) {
        return target_index;
    }
    return null;
}
export function calculateMoveBottom(i, current_row, box_size) {
    var target_index = i + box_size;
    var target_row = Math.floor(target_index / box_size);
    if ((target_row - current_row) == 1 && target_index < Math.pow(box_size, 2)) {
        return target_index;
    }
    return null;
}
export function calculateMoveLeft(i, current_row, box_size) {
    var target_index = i - 1;
    var target_row = Math.floor(target_index / box_size);
    if ((target_row - current_row) == 0 && target_index >= 0) {
        return target_index;
    }
    return null;
}
export function calculateMoveTop(i, current_row, box_size) {
    var target_index = i - box_size;
    var target_row = Math.floor(target_index / box_size);
    if ((current_row - target_row) == 1 && target_index >= 0) {
        return target_index;
    }
    return null;
}
export function calculateMoveBottomRight(i, current_row, box_size) {
    var target_index = i + (box_size + 1);
    var target_row = Math.floor(target_index / box_size);
    if ((target_row - current_row) == 1 && target_index < Math.pow(box_size, 2)) {
        return target_index;
    }
    return null;
}
export function calculateMoveBottomLeft(i, current_row, box_size) {
    var target_index = i + (box_size - 1);
    var target_row = Math.floor(target_index / box_size);
    if ((target_row - current_row) == 1 && target_index < Math.pow(box_size, 2)) {
        return target_index;
    }
    return null;
}
export function calculateMoveTopLeft(i, current_row, box_size) {
    var target_index = i - (box_size + 1);
    var target_row = Math.floor(target_index / box_size);
    if ((current_row - target_row) == 1 && target_index >= 0) {
        return target_index;
    }
    return null;
}
export function calculateMoveTopRight(i, current_row, box_size) {
    var target_index = i - (box_size - 1);
    var target_row = Math.floor(target_index / box_size);
    if ((current_row - target_row) == 1 && target_index >= 0) {
        return target_index;
    }
    return null;
}




export function validateWord(word,selected_alphabets,possibleMoves) {

    var boggle_alphabets = selected_alphabets;
    var possible_movesList = possibleMoves;

    var first_word = word.charAt(0);
    var match_pos = [];


    //finding possible indexes of starting word
    for (var i = 0, j = (boggle_alphabets.length - 1); i < Math.ceil(boggle_alphabets.length/2); i++, j--) {
        if (i >= j) {
            if (boggle_alphabets.charAt(i) == first_word) {
                match_pos.push(i);
            }
            break;
        }

        if (boggle_alphabets.charAt(i) == first_word) {
            match_pos.push(i);
        }
        if (boggle_alphabets.charAt(j) == first_word) {
            match_pos.push(j);
        }

    }


    var result = checkTraverseValidity(1, match_pos, possible_movesList, boggle_alphabets, word);
    return result;
}



export function checkTraverseValidity(position, match_position, possible_movesList, boggle_alphabets, entered_word) {
    // console.log(position+"st/nd/th letter in entered word matches on following positions: "+JSON.stringify(match_position));
    var match_position_next = [];

    for (var j = 0; j < match_position.length; j++) {
        var index = match_position[j];
        for (var k = 0; k < possible_movesList[index].possible_moves.length; k++) {
            if (entered_word.charAt(position) == boggle_alphabets.charAt(possible_movesList[index].possible_moves[k])) {
                match_position_next.push(possible_movesList[index].possible_moves[k]);
            }
        }

    }

    if (match_position_next.length == 0 && position != (entered_word.length - 1)) {
        return false;
    } else if (match_position_next.length >= 1 && position == (entered_word.length - 1)) {
        return true;
    } else {
        return (checkTraverseValidity(position + 1, match_position_next, possible_movesList, boggle_alphabets, entered_word));
    }

}