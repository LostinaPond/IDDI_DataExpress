

var itemValueData11 = 1;
var itemValueData12 = 0;
var itemValueData13 = 1;
var itemValueData14 = 1;
var itemValueData21 = 3;
var itemValueData22 = 0;
var itemValueData23 = 1;
var itemValueData24 = 0;
var itemValueData31 = 1;
var itemValueData32 = 1;
var itemValueData33 = 0;
var itemValueData34 = 1;
var count = 0;
var Val_Max = count + 10;
var Val_Min;
var sections;
var xScale;
var yScale;
var y;
// values of each item on the graph
var itemName = ["Mtn. Dew", "Coke", "Dr. Pepper", "Pepsi"];
var itemValue = [itemValueData11, itemValueData12, itemValueData13, itemValueData14];
var itemName1 = ["Burger", "Pizza", "Chow Mein", "I don't like food"];
var itemValue1 = [itemValueData21, itemValueData22, itemValueData23, itemValueData24];
var itemName2 = ["Red", "Blue", "Green", "Orange"];
var itemValue2 = [itemValueData31, itemValueData32, itemValueData33, itemValueData34];

function init() {
    // intialize values for each variables
    sections = 4;
    //needs to see how big the database is 
    var stepSize = 1;
    var columnSize = 50;
    var rowSize = 60;
    var margin = 10;
    var header = "# of People"

    function diffCanvas(canvasName, name, value) {


        canvas = document.getElementById(canvasName);
        context = canvas.getContext("2d");
        context.fillStyle = "#000;"

        yScale = (canvas.height - columnSize - margin) / (Val_Max);
        xScale = (canvas.width - rowSize) / (sections + 1);

        context.strokeStyle = "#000;"; // background black lines
        context.beginPath();
        // column names 
        context.font = "36 pt Arial;"
        context.fillText(header, 0, columnSize - margin);
        // draw lines in the background
        context.font = "19 pt Helvetica"
        var count = 0;
        for (scale = Val_Max; scale >= 0; scale = scale - stepSize) {
            y = columnSize + (yScale * count * stepSize);
            context.fillText(scale, margin, y + margin);
            context.moveTo(rowSize, y)
            context.lineTo(canvas.width, y)
            count++;
        }
        context.stroke();

        // print names of each data entry
        context.font = "20 pt Verdana";
        context.textBaseline = "bottom";
        for (i = 0; i < 5; i++) {
            computeHeight(value[i]);
            context.fillText(name[i], xScale * (i + 1), y - margin);
        }

        // shadow for graph's bar lines with color and offset

        context.fillStyle = "#9933FF;";
        context.shadowColor = 'rgba(128,128,128, 0.5)';

        //shadow offset along X and Y direction 
        context.shadowOffsetX = 9;
        context.shadowOffsetY = 3;

        // translate to bottom of graph  inorder to match the data 
        context.translate(0, canvas.height - margin);
        context.scale(xScale, -1 * yScale);

        // draw each graph bars	
        for (i = 0; i < 5; i++) {
            context.fillRect(i + 1, 0, 0.3, value[i]);
        }
    }
    diffCanvas("myCanvas", itemName, itemValue);
    diffCanvas("myCanvas2", itemName1, itemValue1);
    diffCanvas("myCanvas1", itemName2, itemValue2);
}

function computeHeight(value) {
    y = canvas.height - value * yScale;
}
