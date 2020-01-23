# Max Herman - Sudoku Solver - 1/2/2020

import sys
import time

# Helper Method to create a board
# Return a row from the board
# input - filename string
# output - board: list of lists of numbers
# effects - none
def create_board(filename):
    f = open(filename)

    # for each character on each line, if it is a digit then add its integer value
    board = [[int(digit) for digit in line if digit.isdigit()] for line in f.readlines()]

    f.close()
    return board


# Main recursive method to find a solution to the puzzle
# Get a new position to check, if True is found then end the loop, else try all
#       possible values in the place of (r, c), if they work then 
#       continue, if not then backtrack to another solution
# Return a row from the board
# input - board
# output - True/False, if a solution is found
# effects - Recursively check options
def solve_board(board):

    # get a new position/values pair
    pos = board_options(board)

    # return true if no more positions are empty
    if pos == True:
        return True
    
    # try all values in place of (r, c)
    for d in pos[1]:
        board[pos[0][0]][pos[0][1]] = d

        # if recursion below works then return true
        if solve_board(board):
            return True
        
        # else reset (r, c) to 0
        board[pos[0][0]][pos[0][1]] = 0
    
    # backtrace
    return False


# Helper Method to find next position to fill
# Check all positions until one is not filled, then find all possible values for that
#       position and return the row,column position with all possible values
# input - board
# output - (row, column), [possible digits to fill with]
# output - True if no more empty positions
# effects - If return True, recursion will end and a solution was found
def board_options(board):

    # check every positon for an empty spot
    for r in range(9):
        for c in range(9):
            if(board[r][c] == 0):

                # remove all values from row, column, and group
                options = set({1, 2, 3, 4, 5, 6, 7, 8, 9})
                taken = set(get_vert(board, c)) | set(get_horz(board, r)) | set(get_quad(board, r, c))
                return [[r, c], list(options - taken)]
    
    # if no more positions need to be filled
    return True


# Helper Method to find all numbers in vertical line
# Get the column value from each row in the board
# input - board, c: column integer
# output - list of 9 numbers in line
# effects - none
def get_vert(board, c):
    col = []
    for row in board:
        col.append(row[c])
    return col


# Helper Method to find all numbers in horizontal line
# Return a row from the board
# input - board, r: row integer
# output - list of 9 numbers in line
# effects - none
def get_horz(board, r):
    return board[r]


# Helper Method to find all numbers in a 3 by 3 grouping
# Find the midpoint of the grouping then loop through all 9 numbers, adding them to an output list
# input - board, r: row integer, c: column integer
# output - list of 9 numbers in group
# effects - none
def get_quad(board, r, c):

    # find the midpoint of the 3 by 3 section
    r_c = 1 + r - (r % 3)
    c_c = 1 + c - (c % 3)

    # get all values from that section
    output = []
    for i in range(r_c - 1, r_c + 2):
        for j in range(c_c - 1, c_c + 2):
            output.append(board[i][j])
    return output


# Helper Method to print a board
# input - board
# output - none
# effects - none
def print_board(board):
    for r in range(9):
        for c in range(9):
            print(board[r][c], end=" ")
        print()

def hello():
    return "hello"

if __name__ == "__main__":

    # Create initial board
    board = create_board(sys.argv[1])

    print("Puzzle:")
    t = time.time()
    print_board(board)

    # If a solution is found, print the board, else print no solution
    if solve_board(board):
        print("\nSolution:")
        print_board(board)
        print("Runtime:", time.time() - t)
    else:
        print("No Solution")
