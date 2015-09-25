var connectFour = {

    // create the playing area DOM
    createGrid: function() {
        var rows = 6;
        var columns = 7;
        var $grid = $('.grid');

        // create rows
        for (var x = 0; x < rows; x++) {
            $grid.append('<div class="row grid-row x' + x + '"></div>');

            // create columns
            for (var y = 0; y < columns; y++) {
                $(".x" + x).append('<div class="cell"' + 'id=' + y + "></div>");
            }
        }
    },
    // if player clicks on column, get the column id fill the color yellow or red
    
    columnClicked: function() {
        var id;
        $(".grid").click(function(event) {
            id = event.target.id;
            alert(id);
        });
    },

    // when column clicked, change the color of the first cell that is white
    // check first row in that column that is white
    init: function() {
        connectFour.createGrid();
        connectFour.columnClicked();
    }
};

//Game starts on Document Ready
$(document).ready(function() {
    //Play the game
    connectFour.init();
});
