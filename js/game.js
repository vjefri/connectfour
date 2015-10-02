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
                // TODO: check for winner, if true, announce winner 
                var column = $(this).attr("class").split('');
                columnNumber = Number(column[column.length - 1]);
                // get the number of the row with empty cell
                var firstPass = true;
                var rowMatch;

                // marks the position of turn in gridArr
                connectFour.reverseEach(gridArr, function(row, i) {
                    if (row[columnNumber] === 0 && firstPass) {
                        row[columnNumber] = currentPlayer;
                        firstPass = false;
                        rowMatch = i;
                    }
                });

                console.log("Winner: " + connectFour.checkForWinner(gridArr, rowMatch, columnNumber, currentPlayer));
                // make selector for clicked cell
                var selectorColorChange = ".row" + rowMatch + " .column" + columnNumber;
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
        checkForWinner: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            if (this.verticalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            if (this.horizontalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            if (this.leftDownDiagonalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            if (this.rightDownDiagonalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            if (this.leftUpDiagonalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            if (this.rightUpDiagonalCheck(gridArr, rowMatch, columnNumber, currentPlayer)) return true;
            return false;
        },

        verticalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            // if current player NOT in row 0 - 2, return false
            // if current player, 3 rows below current column are the same value as current player return true, otherwise false
            if (rowMatch > 2) return false;
            for (var row = 0; row < 3; row++) {
                if (currentPlayer == gridArr[row + 1][columnNumber] &&
                    currentPlayer == gridArr[row + 2][columnNumber] &&
                    currentPlayer == gridArr[row + 3][columnNumber]) return true;
            }
            return false;

        },

        horizontalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {

            // if columnNumber > 3, check left, else if columnNumber < 3, check right, else check both
            // check right
            console.log("Column: " + columnNumber);
            console.log("Row: " + rowMatch);
            console.log("Player: " + currentPlayer);
            if (columnNumber < 3) {
                for (var column = columnNumber; column < 7; column++) {
                    if (currentPlayer == gridArr[rowMatch][column + 1] &&
                        currentPlayer == gridArr[rowMatch][column + 2] &&
                        currentPlayer == gridArr[rowMatch][column + 3]) return true;
                }
                return false;
            }
            // check left
            else if (columnNumber > 3) {
                for (var column = columnNumber; column > 0; column--) {
                    if (currentPlayer == gridArr[rowMatch][column - 1] &&
                        currentPlayer == gridArr[rowMatch][column - 2] &&
                        currentPlayer == gridArr[rowMatch][column - 3]) return true;
                }
                return false;
            }
            // in the middle, check left and right
            else {
                for (var column = columnNumber; column < 7; column++) {
                    if (currentPlayer == gridArr[rowMatch][column + 1] &&
                        currentPlayer == gridArr[rowMatch][column + 2] &&
                        currentPlayer == gridArr[rowMatch][column + 3]) return true;
                }
                for (var column = columnNumber; column > 0; column--) {
                    if (currentPlayer == gridArr[rowMatch][column - 1] &&
                        currentPlayer == gridArr[rowMatch][column - 2] &&
                        currentPlayer == gridArr[rowMatch][column - 3]) return true;
                }
                return false;
            }
        },

        // if they click in the upper right corner, check left down diagonal
        leftDownDiagonalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            if (columnNumber > 2 && rowMatch < 3) {
                if (currentPlayer == gridArr[rowMatch + 1][columnNumber - 1] &&
                    currentPlayer == gridArr[rowMatch + 2][columnNumber - 2] &&
                    currentPlayer == gridArr[rowMatch + 3][columnNumber - 3]) return true;
            }
            return false;
        },

        // if they click in the upper left corner, check right down diagonal
        rightDownDiagonalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            if (columnNumber < 4 && rowMatch < 3) {
                if (currentPlayer == gridArr[rowMatch + 1][columnNumber + 1] &&
                    currentPlayer == gridArr[rowMatch + 2][columnNumber + 2] &&
                    currentPlayer == gridArr[rowMatch + 3][columnNumber + 3]) return true;
            }
            return false;
        },

         // if they click in the lower left corner, check right up diagonal
        rightUpDiagonalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            if (columnNumber < 4 && rowMatch > 2) {
                if (currentPlayer == gridArr[rowMatch - 1][columnNumber + 1] &&
                    currentPlayer == gridArr[rowMatch - 2][columnNumber + 2] &&
                    currentPlayer == gridArr[rowMatch - 3][columnNumber + 3]) return true;
            }
            return false;
        },

         // if they click in the lower left corner, check left up diagonal
        leftUpDiagonalCheck: function(gridArr, rowMatch, columnNumber, currentPlayer) {
            if (columnNumber > 2 && rowMatch > 2) {
                if (currentPlayer == gridArr[rowMatch - 1][columnNumber - 1] &&
                    currentPlayer == gridArr[rowMatch - 2][columnNumber - 2] &&
                    currentPlayer == gridArr[rowMatch - 3][columnNumber - 3]) return true;
            }
            return false;
        },

        showWinner: function(gridArr) {
            
        },

        reverseEach: function(array, callback) {
            for (var i = array.length - 1; i >= 0; i--) {
                callback(array[i], i);
            }
        },

        init: function() {
            var rows = 6;
            var columns = 7;
            var currentPlayer = 1;
            var gridArr = this.createGridArray(rows, columns);
            this.createGrid(rows, columns);
            this.columnClicked(gridArr, currentPlayer);
            $('.turn-btn').css({
                'background-color': 'red',
            });

            $(".blindMode").on('click', function() {
                connectFour.blindMode()
            });
        }
    };

    connectFour.init();
    // restart
    $(".btn").on('click', function() {
        $('.grid').empty();
        connectFour.init();
    });
})();
