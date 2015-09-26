var connectFour = {

    // create the playing area DOM
    createGrid: function() {
        var rows = 6;
        var columns = 7;
        var $grid = $('.grid');

        // create rows
        for (var x = 1; x <= rows; x++) {
            $grid.append('<div class="row table-row row' + x + '"></div>');

            // create columns
            for (var y = 1; y <= columns; y++) {
                $(".row" + x).append('<div class="cell column' + y + '"></div>');
            }
        }
    },

    columnClicked: function() {
        // if player clicks on column, get the column id
        $(".cell").click(function(event) {
            var selectedColumn = $(this).attr("class").split(' ');
            console.log(selectedColumn[1]);

            // when column clicked, check to see if 

        });
    },

    highlightSelectedColumn: function() {
        $('.cell').hover(function() {
            // change background color
            var selectedColumn = $(this).attr("class").split(' ');
            selectedColumn = "." + selectedColumn[1];
            $(selectedColumn).css({'background-color':'#FFF4C1', 'opacity': '0.5'});
        }, function() {
            var selectedColumn = $(this).attr("class").split(' ');
            selectedColumn = "." + selectedColumn[1];
            // on mouseout, reset the background colour
            $(selectedColumn).css({'background-color':'', 'opacity': ''});
        });
    },

    init: function() {
        this.createGrid();
        this.columnClicked();
        this.highlightSelectedColumn();
    }
};

// game starts when DOM is Ready
$(function() {
    // calls initiation function of game
    connectFour.init();
});
