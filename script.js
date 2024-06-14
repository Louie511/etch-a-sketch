let selectedColor = "#FCF5E5";
let brushColor = "#db4646";
let erasersColor = "";
let isDrawing = false;
let useRainbowColors = false;

//  Creates default 16x16 canvas
function boardSize (size){
    let contents = document.querySelector(".contents");
    let squares = contents.querySelectorAll("div");
       
    squares.forEach(div => div.remove());
    contents.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    contents.style.gridTemplateRows = `repeat(${size} 1fr)`;

    const maxSize = size * size;
    for (let i=0; i<maxSize; i++){
        const square = document.createElement("div");
        square.style.backgroundColor = selectedColor;
        contents.insertAdjacentElement("beforeend", square);
    }
    backgroundColor();
    paintCanvas();
}
boardSize(16)


// Size bubble---
function updateBubble(value){
    const bubble = document.querySelector("#bubble")
    bubble.innerHTML = `${value} x ${value}`;
}

const rangeSlider = document.querySelector(".slider");
rangeSlider.addEventListener("input", (event) => {
    const size = event.target.value;
    updateBubble(size);
    boardSize(size);
})
updateBubble(rangeSlider.value);


// Canvas Color---
document.getElementById("backgroundColor").addEventListener("input", function() {
    selectedColor = this.value;
    const squares = document.querySelectorAll("contents div");
    squares.forEach(function(square){
        square.style.backgroundColor = selectedColor;
    });
});

function backgroundColor(){
    let contents = document.querySelector(".contents");
    let squares = contents.querySelectorAll("div");
    let colorValue = document.getElementById("backgroundColor");
    const eraserButton = document.querySelector(".eraserButton");

    colorValue.addEventListener("input", function() {
        eraserButton.style.backgroundColor = selectedColor;
        squares.forEach(function(square){
            square.style.backgroundColor = colorValue.value;
        });
    });
}


// Reset Button---
document.querySelector(".resetButton").addEventListener("click", function(){
    window.location.reload();
});


// Eraser Button---
function eraser (){
    const eraserButton = document.querySelector(".eraserButton");
    eraserButton.addEventListener("click", function(){
        
        useRainbowColors = false;
        brushColor = selectedColor;
    });
};


// Black Color Button---
function blackColorButton (){
    const blackButton = document.querySelector(".blackButton");

    blackButton.addEventListener("click", function(){
        useRainbowColors = false;
        brushColor = "rgba(0, 0, 0, 0.774)";
    });
};


// Rainbow Color Button---
function rainbowColorButton(){
    const rainbowButton = document.querySelector(".rainbowButton");
    rainbowButton.addEventListener("click", function(){
        useRainbowColors = true;
    });
};


// Color Picker---
function colorPicker(){
    const colorPicker =  document.getElementById("colorpicker");

    colorPicker.addEventListener("input", function(){
        useRainbowColors = false;
        if(brushColor !== colorPicker.value){
            previousColor = brushColor;
        }
        
        brushColor = colorPicker.value;
    });
};


// paint Canvas---
function paintCanvas(){
    let squares = document.querySelectorAll(".contents div");

    squares.forEach((square) => {   
        square.addEventListener("mousedown", function(){
            isDrawing = true;
            square.style.backgroundColor = getCurrentColor();
        });
        square.addEventListener("mousemove", function(){
            if(isDrawing){
                square.style.backgroundColor = getCurrentColor();
            }
        });
        square.addEventListener("mouseup", function(){
            isDrawing = false;
        });
    })
    document.addEventListener("mouseup", function(){
        isDrawing = false;
    });
};

function getCurrentColor(){
    if(useRainbowColors){
        let colors = ["#FF0000", "#FF00FF", "#FFFF00", "#0000FF", "#8B008B", "#778899", "#008B8B"];
        return colors[Math.floor(Math.random() * colors.length)]; 
    }else {
        return brushColor;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    eraser();
    paintCanvas();
    blackColorButton();
    rainbowColorButton();
    colorPicker();
});



