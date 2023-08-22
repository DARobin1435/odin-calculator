const display = document.querySelector('.display-container>input');
const calcContainer = document.querySelector('.button-container');

// Small values
const condFirstValue = document.querySelector(".condensed.first-value");
const condOperator = document.querySelector(".condensed.operator");
const condSecondValue = document.querySelector(".condensed.second-value");

let currentValues = [];
const operationValues = [];

let tempValue = null;
let operator = null;
let result = 0;

// Functions for operations
function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;
}


function changeDisplay(n=null){
    if (n){
        display.value = n;
        return;
    }
    display.value = parseInt(currentValues.join(""),10); 
    tempValue = display.value;

}

function updateMiniDisplay(){
    
    if (operationValues.length < 2){
        if (!operationValues[1]){
            condSecondValue.innerText = "";
        }else{
            condSecondValue.innerText = operationValues[1];
        }
        condFirstValue.innerText = operationValues[0];
        
        condOperator.innerText = operator;

    }
}

// Build calculator function
function makeCalc(){

    const buttonValues = ["+", "-", "*", "/", "=", "clear"];
    let newDiv = null;
    // Make numerals and add them to buttonValues array
    for (let i = 0; i <= 9; i++){
        buttonValues.unshift(i);
    }
    // Make operators
    buttonValues.forEach(item=>{

        newDiv = document.createElement('div');
        newDiv.textContent = item;
        newDiv.classList.add("buttons");
        newDiv.addEventListener("mouseover", (e)=>{
            e.target.classList.add("highlighted");
        })
        newDiv.addEventListener("mouseout", (e)=>{
            e.target.classList.remove("highlighted");
        })
        newDiv.addEventListener("click", (e)=>{
            currentValues.push(e.target.textContent);
            if (!isNaN(item)){
                // changeDisplay();
            }    
            })
        if (item == "+" || item =="-" || item == "*" ||
        item == "/"){
            newDiv.addEventListener("click",e=>{

                if (operationValues.length < 2){

                    operationValues.push(tempValue); 
                    currentValues = [];
                    operator = e.target.textContent;
                    
                }else{
                
                    result = operate(operationValues[0], operationValues[1], e.target.textContent);
                  
                }
                
        })
        }
        if (item == "="){
            
            newDiv.addEventListener("click", (e)=>{
                result = operate(operationValues[0], operationValues[1], operator);
                console.log(`Values: ${operationValues[0]} || ${operationValues[1]}`);
                displayValue.value = result;
            })

        }
        // Remove values in array and operators
        if (item == "clear"){
            newDiv.addEventListener("click", () =>{
                clearValues();
            })
        }
        calcContainer.appendChild(newDiv);

    })
}
function operate(val1, val2, op){
    val1 = parseInt(val1, 10);
    val2 = parseInt(val2, 10);
    switch (op){
        case "+":
            return add(val1, val2);
        case "-":
            return subtract(val1, val2);
        case "*":
            return multiply(val1, val2);
        case "/":
            return divide(val1, val2);
    }
}
function clearValues(){

    currentValues = [];
    displayValue.value = null;
    operationValues[0] = null;
    operationValues[1] = null;
    tempValue = 0;
    result = 0;

}
// Event listeners


// Function calls
makeCalc();
