const buttonContainer = document.querySelector('.button-container');
const display = document.querySelector('.display-container > input');
const currentOperator = document.querySelector('.current-operator');

const history = {};

// An array for values more than one digit
let currentValues = [];

let num1 = 0;
let num2 = 0;
let operator = null;
let result = 0;


function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if (b == 0){

        return "IMPOSSIBLE!";
    }
    return a/b;

}

function operate(a,b,op){

    switch (op){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}

function updateDisplay(val){
    if (typeof val == "object" && val[val.length - 1] == "."){
        val += ".";
    }
    display.value = val;
    
}

// collapses the values in the array into a single base-10 number
function collapseValues(arr){

    return  arr.length > 0 ? parseFloat(arr.join("")): 0;
}

function clickWithKeyDown(key){
   
    switch (key){
        case "Backspace":
            key = "back";
            break;
        case "Delete":
            key = "clear";
            break;

   } 
   let selectedElement = document.querySelector(`.buttons.${key}`);
   
   if(selectedElement){
        // buttonContainer.removeChild(selectedElement);
        selectedElement.click();

   }else{
    // alert(`No element matching the keypress ${key} exists`)
   }
}
// Listeners for divs
function newListeners(ele){

    if (!isNaN(ele.textContent)){
        // Reacts to numbers being pressed
        ele.addEventListener("click", e => {
            
            if (!operator){
                currentValues.push(e.target.textContent);
                num1 = collapseValues(currentValues);
                updateDisplay(num1);
                // alert(`Alerted num1: ${num1} of type ${typeof num1}`);
            }else {
                // THEN: Reassign values for num1, num2
                currentValues.push(e.target.textContent);
                num2 = collapseValues(currentValues);
                updateDisplay(num2);
                // alert(`Alerted num2: ${num2} of type ${typeof num2}`);
            }
        })
    }
        if(ele.textContent == "back"){
        ele.addEventListener("click", e => {
            goBack();
        })
    }
    if(ele.textContent == "."){
        ele.addEventListener("click", e => {
            if(!currentValues.includes(".")){
                if (!num1){
                    currentValues.push("0");
                }
                currentValues.push(".");
                updateDisplay(collapseValues(currentValues));
            }
        })
    }  
    if(ele.textContent == "+" || ele.textContent == "-" || ele.textContent == "*" ||
    ele.textContent == "/" ){
        ele.addEventListener("click", (e) =>{
            // Sets operator if no operator is already selected
            if (!operator){ 
                operator = e.target.textContent;
                currentValues = [];
            }else if (operator && num2){
                // If an operator has already been selected and num2 has a value
                // THEN: calculate with the values in memory, store them temporarily in
                // THEN: store the result into num1, update the display, change operators
                // THEN: reset num2 to zero 
                // Calculate result with current operator
                result = operate(num1, num2, operator);
                console.log(`Operation result is ${result}`);
                num1 = result;
                updateDisplay(num1);
                operator = e.target.textContent;
                currentValues = [];
                num2 = 0;
            }
        })
    }

    if(ele.textContent == "="){
        ele.addEventListener("click", e => {
            if (num1 && num2 && operator){
                result = operate(num1, num2, operator)
                updateDisplay(result);
                num1 = result;
                num2 = 0;
                currentValues = [];
                operator = null;
            }    
        })
    }

    if(ele.textContent == "back"){
        ele.addEventListener("click", e => {
            goBack();
        })
    } 
    if(ele.textContent == "clear"){
        ele.addEventListener("click", e => {
            clear();
        })
    }
    
    ele.addEventListener("mouseover", (e) => {
        e.target.classList.add("highlighted");
    })
    ele.addEventListener("mouseout", (e) => {
        e.target.classList.remove("highlighted");
    })

}


function makeCalculator(){

    const buttonValues = [".","+", "-","*","/","=",
     "back","clear"];
    let newDiv;
    // add numerals to start
    for (let i=0;i<=9;i++){
        buttonValues.unshift(i);
    }
    // Add all buttons
    buttonValues.forEach(btn => {

        newDiv = document.createElement('div');
        newDiv.classList.add("buttons", btn);
        newDiv.textContent = btn;
        newListeners(newDiv);
        buttonContainer.appendChild(newDiv);
    })

    
}

function clear(){
    num1 = 0;
    num2 = 0;
    operator = null;
    updateDisplay(0);
    currentValues = [];
}
function goBack(){
    
    console.log(currentValues);
    currentValues.pop();
    console.log("   ", currentValues);
    updateDisplay(collapseValues(currentValues));
    return;
}

// Event listener to keyboard presses
document.addEventListener("keydown", e => {

    clickWithKeyDown(e.key);

})
// Run the calculator
makeCalculator();