(function() {

    var connectFour = {

        // drawing the grid and creating the grid array
        createGrid: function(rows, columns) {
            var $grid = $('.grid');
            // create rows
            for (var x = 0; x < rows; x++) {
                $grid.append('<div class="row table-row row' + x + '"></div>');
                // create columns
                for (var y = 0; y < columns; y++) {
                    $(".row" + x).append('<div class="cell column' + y + '"></div>');
                }
            }
        },

        // create grid array that tracks player moves
        createGridArray: function(rows, columns) {
            var grid = [];
            var rows = _.range(0, rows);
            var columns = _.range(0, columns);

            _.each(rows, function(row) {
                grid[row] = [];
                _.each(columns, function(column) {
                    grid[row][column] = 0;
                });
            });
            return grid;
        },

        columnClicked: function(gridArr, currentPlayer) {
            // if player clicks on column, get the column id
            $(".cell").on('click', function() {
                var column = $(this).attr("class").split('');
                columnNumber = Number(column[column.length - 1]);
                // get the number of the row with empty cell
                var firstPass = true;
                var row;
                // marks the position of turn in gridArr
                connectFour.reverseEach(gridArr, function(currRow, i) {
                    if (currRow[columnNumber] === 0 && firstPass) {
                        currRow[columnNumber] = currentPlayer;
                        firstPass = false;
                        row = i;
                    }
                });

                console.log("column: " + columnNumber);
                console.log("row: " + row);

                var weHaveWinner = connectFour.checkForWinner(gridArr, row, columnNumber, currentPlayer);

                console.log(weHaveWinner);

                if (weHaveWinner) {
                    connectFour.showWinner(currentPlayer);
                }
                // make selector for clicked cell
                var selectorColorChange = ".row" + row + " .column" + columnNumber;
                // change color according to current player
                if (currentPlayer == 1) {
                    $(selectorColorChange).css({
                        'background-color': 'red',
                    });
                    $('.turn-btn').css({
                        'background-color': 'black',
                    });

                } else if (currentPlayer == 2) {
                    $(selectorColorChange).css({
                        'background-color': 'black',
                    });
                    $('.turn-btn').css({
                        'background-color': 'red',
                    });
                }
                // switch player
                currentPlayer = connectFour.switchPlayer(currentPlayer);
            });
        },

        blindMode: function() {
            $('.turn-btn').css({
                'background-color': 'red',
            });
            $('.cell').hover(function() {
                // change background color
                var column = $(this).attr("class").split(' ');
                column = "." + column[1];
                $(column).css({
                    'background-color': '#FFF4C1',
                    'opacity': '0.5'
                });
            }, function() {
                var column = $(this).attr("class").split(' ');
                column = "." + column[1];
                // on mouseout, reset the background colour
                $(column).css({
                    'background-color': '',
                    'opacity': ''
                });
            });
        },

        switchPlayer: function(currentPlayer) {
            if (currentPlayer == 1) {
                return currentPlayer = 2
            } else {
                return currentPlayer = 1
            }
        },

        // checkForWinner every time user makes a move
        checkForWinner: function(gridArr, row, column, currentPlayer) {
            if (this.verticalCheck(gridArr, row, column, currentPlayer)) return true;
            if (this.horizontalCheck(gridArr, row, column, currentPlayer)) return true;
            if (this.leftDownDiagonalCheck(gridArr, row, column, currentPlayer)) return true;
            if (this.rightDownDiagonalCheck(gridArr, row, column, currentPlayer)) return true;
            if (this.leftUpDiagonalCheck(gridArr, row, column, currentPlayer)) return true;
            if (this.rightUpDiagonalCheck(gridArr, row, column, currentPlayer)) return true;
            return false;
        },

        verticalCheck: function(gridArr, row, columnNumber, currentPlayer) {
            // if current player NOT in row 0 - 2, return false
            // if current player, 3 rows below current column are the same value as current player return true, otherwise false
            if (row > 2) return false;

            if (row < 3) {
                if (currentPlayer == gridArr[row + 1][columnNumber] &&
                    currentPlayer == gridArr[row + 2][columnNumber] &&
                    currentPlayer == gridArr[row + 3][columnNumber]) {
                    return true;
                }
            }
            return false;
        },

        horizontalCheck: function(gridArr, row, column, currentPlayer) {

            // if column > 3, check left, else if column < 3, check right, else check both
            // check right
            if (column < 3) {
                if (currentPlayer == gridArr[row][column + 1] &&
                    currentPlayer == gridArr[row][column + 2] &&
                    currentPlayer == gridArr[row][column + 3]) return true;
                return false;
            }
            // check left
            else if (column > 3) {
                if (currentPlayer == gridArr[row][column - 1] &&
                    currentPlayer == gridArr[row][column - 2] &&
                    currentPlayer == gridArr[row][column - 3]) return true;

                return false;
            }
            // in the middle, check left and right
            else {
                if (currentPlayer == gridArr[row][column + 1] &&
                    currentPlayer == gridArr[row][column + 2] &&
                    currentPlayer == gridArr[row][column + 3]) return true;

                if (currentPlayer == gridArr[row][column - 1] &&
                    currentPlayer == gridArr[row][column - 2] &&
                    currentPlayer == gridArr[row][column - 3]) return true;

                return false;
            }
        },

        // if they click in the upper right corner, check left down diagonal
        leftDownDiagonalCheck: function(gridArr, row, column, currentPlayer) {
            if (column > 2 && row < 3) {
                if (currentPlayer == gridArr[row + 1][column - 1] &&
                    currentPlayer == gridArr[row + 2][column - 2] &&
                    currentPlayer == gridArr[row + 3][column - 3]) return true;
            }
            return false;
        },

        // if they click in the upper left corner, check right down diagonal
        rightDownDiagonalCheck: function(gridArr, row, column, currentPlayer) {
            if (column < 4 && row < 3) {
                if (currentPlayer == gridArr[row + 1][column + 1] &&
                    currentPlayer == gridArr[row + 2][column + 2] &&
                    currentPlayer == gridArr[row + 3][column + 3]) return true;
            }
            return false;
        },

        // if they click in the lower left corner, check right up diagonal
        rightUpDiagonalCheck: function(gridArr, row, column, currentPlayer) {
            if (column < 4 && row > 2) {
                if (currentPlayer == gridArr[row - 1][column + 1] &&
                    currentPlayer == gridArr[row - 2][column + 2] &&
                    currentPlayer == gridArr[row - 3][column + 3]) return true;
            }
            return false;
        },

        // if they click in the lower left corner, check left up diagonal
        leftUpDiagonalCheck: function(gridArr, row, column, currentPlayer) {
            if (column > 2 && row > 2) {
                if (currentPlayer == gridArr[row - 1][column - 1] &&
                    currentPlayer == gridArr[row - 2][column - 2] &&
                    currentPlayer == gridArr[row - 3][column - 3]) return true;
            }
            return false;
        },

        showWinner: function(currentPlayer) {
            $('.grid').empty();
            var colorWinner;
            currentPlayer === 1 ? colorWinner = "Red" : colorWinner = "Black";
            $('.grid').addClass("won");
            $('.grid').text("Winner is " + colorWinner + "!");
        },

        // check each element from right to left
        reverseEach: function(array, callback) {
            for (var i = array.length - 1; i >= 0; i--) {
                callback(array[i], i);
            }
        },

        init: function() {
            var rows = 6;
            var columns = 7;
            // starts with red
            var currentPlayer = 1;
            var gridArr = this.createGridArray(rows, columns);
            this.createGrid(rows, columns);
            this.columnClicked(gridArr, currentPlayer);
            $('.turn-btn').css({
                'background-color': 'red',
            });
        }
    };

    connectFour.init();
    // restart
    $(".btn").on('click', function() {
        $('.grid').removeClass("won");
        $('.grid').empty();
        connectFour.init();
        $('.blindMode').css({
            'background-color': '#2ECD71',
        });
    });

    // start blindMode
    $(".blindMode").on('click', function() {
        connectFour.blindMode();
        $('.blindMode').css({
            'background-color': 'orange',
        });
    });
})();
