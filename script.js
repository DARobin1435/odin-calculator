const buttonContainer = document.querySelector('.button-container');
const display = document.querySelector('.display-container > input');

// An array for values more than one digit
let currentValues = [];

let num1 = 0;
let num2 = 0;
let operator = null;
let operatorSelected = false;


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
    display.value = val;
}

// collapses the values in the array into a single base-10 number
function collapseValues(arr){

    return  parseInt(arr.join(""),10);

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
                currentValues.push(e.target.textContent);
                num2 = collapseValues(currentValues);
                updateDisplay(num2);
                // alert(`Alerted num2: ${num2} of type ${typeof num2}`);
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
                operatorSelected = true;
            }
            // if (operatorSelected){
            //     updateDisplay(operate(num1, num2, operator));
            // }
        })
    }

    if(ele.textContent == "="){
        ele.addEventListener("click", e => {
            alert(`Performing operation: ${num1} ${operator} ${num2}`)
            updateDisplay(operate(num1, num2, operator));

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

    const buttonValues = ["+", "-","*","/","=", "clear"];
    let newDiv;
    // add numerals to start
    for (let i=0;i<=9;i++){
        buttonValues.unshift(i);
    }
    // Add all buttons
    buttonValues.forEach(btn => {

        newDiv = document.createElement('div');
        newDiv.classList.add("buttons");
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

// 

// Run the calculator
makeCalculator()