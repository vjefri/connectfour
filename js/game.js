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
            for (var x = 0; x < rows; x++) {
                grid[x] = [];
                for (var y = 0; y < columns; y++) {
                    grid[x][y] = 0;
                }
            }
            return grid;
        },

        columnClicked: function(gridArr, currentPlayer) {
            // if player clicks on column, get the column id
            $(".cell").on('click', function() {
                var column = $(this).attr("class").split('');
                columnNumber = column[column.length - 1];
                // get the number of the row with empty cell
                var firstPass = true;
                var rowMatch;
                connectFour.reverseEach(gridArr, function(row, i) {
                    if (row[columnNumber] === 0 && firstPass) {
                        row[columnNumber] = 1;
                        firstPass = false;
                        rowMatch = i;
                    }
                });
                // make selector for clicked cell
                var selectorColorChange = ".row" + rowMatch + " .column" + columnNumber;

                // change color according to current player
                if (currentPlayer == 1) {
                    $(selectorColorChange).css({
                        'background-color': 'red',
                    });
                } else if (currentPlayer == 2) {
                    $(selectorColorChange).css({
                        'background-color': 'black',
                    });
                }
                // switch player
                currentPlayer = connectFour.switchPlayer(currentPlayer);
            });
        },

        highlightcolumn: function() {
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
            // this.highlightcolumn();
        }
    };

    connectFour.init();
    // restart
    $(".btn").on('click', function() {
        $('.grid').empty();
        connectFour.init();
    });
})();
