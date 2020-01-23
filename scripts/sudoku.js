function solve_board(board){

    // get a new position/values pair
    let pos = board_options(board);

    // return true if no more positions are empty
    if(pos === true){
        return true;
    }
    
    // try all values in place of (r, c)
    for(d in pos[1]){
        board[pos[0][0]][pos[0][1]] = pos[1][d];

        // if recursion below works then return true
        if(solve_board(board)) {
            return true;
        }
        
        // else reset (r, c) to 0
        board[pos[0][0]][pos[0][1]] = 0;
    }
    
    // backtrace
    return false;
}

function board_options(board){
    let r = 0, c;

    // check every positon for an empty spot
    while(r < 9){
        c = 0;
        while(c < 9){
            if(board[r][c] === 0){

                // remove all values from row, column, and group
                let options = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                let taken = union(union(new Set(get_vert(board, c)), new Set(get_horz(board, r))), new Set(get_quad(board, r, c)));
                console.log([r, c], options, taken, new Array(difference(options, taken)));
                return [[r, c], Array.from(difference(options, taken))];
            }
            c++;
        }
        r++;
    }
    
    // if no more positions need to be filled
    return true
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function get_vert(board, c){
    let col = [];
    for(row in board){
        col.push(board[row][c]);
    }
    return col;
}

function get_horz(board, r){
    return board[r];
}

function get_quad(board, r, c){

    // find the midpoint of the 3 by 3 section
    let r_c = 1 + r - (r % 3);
    let c_c = 1 + c - (c % 3);
    let i = r_c - 1;

    // get all values from that section
    let output = [];
    while(i < r_c + 2){
        let row = [];
        let j = c_c - 1;
        while(j < c_c + 2){
            output.push(board[i][j]);
            j++;
        }
        i++;
    }
    return output;
}
