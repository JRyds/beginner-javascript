//Select the elements on the page- canvas, shake button 
const canvas = document.querySelector("#etch-a-sketch");

const ctx = canvas.getContext("2d")

const shakeButton = document.querySelector(".shake");

const MOVE_AMOUNT = 25;

// Setup canvas for drawing

const { width, height } = canvas; //destructuring. Takes the height and width properties of the canvas object and makes two variables of the properties


//create random x and y start point

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = Math.floor(Math.random() * 360);

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;
ctx.strokeStyle = hue;


ctx.beginPath(); //start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function.  This is also destructured raw( { key }). this frees the values of the key pair in the options object.

function draw({ key }) { //(options) is a param that is waiting for an options{object} that will conscisley allow multiple params to be passed in
    hue = hue + 1;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);
    ctx.beginPath(); //start drawing
    ctx.moveTo(x, y);


    switch (key) {
        case "ArrowUp":
            y = y - MOVE_AMOUNT;
            break;
        case "ArrowDown":
            y = y + MOVE_AMOUNT;
            break;
        case "ArrowLeft":
            x = x - MOVE_AMOUNT;
            break;
        case "ArrowRight":
            x = x + MOVE_AMOUNT;
            break;
        default:
            break;

    }
    ctx.lineTo(x, y)
    ctx.stroke();
}
// handler for keys

function handleKey(e) { //(e) is the representation of the "keydown" event that was listed  to call handleKey()
    if (e.key.includes("Arrow")) {
        e.preventDefault();
        draw({ key: e.key });
    }
}



// clear or shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationend',
        function () {
            console.log('Done the shake!');
            canvas.classList.remove('shake');
        },
        { once: true }
    );
}
//listen for arrowkeys
window.addEventListener("keydown", handleKey);
shakeButton.addEventListener("click", clearCanvas)