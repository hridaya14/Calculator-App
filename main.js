const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-display]')
const deleteButton = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-all-clear]')
const prevTextElement = document.querySelector('[data-prev-text]')
const currTextElement = document.querySelector('[data-curr-text]')

class Calculator{
    constructor (prevTextElement, currTextElement) {
        this.prevTextElement = prevTextElement;
        this.currTextElement = currTextElement;
        this.clear();
    }

    clear(){
        this.prevOperand  = '';
        this.currOperand = '';
        this.operation = undefined;

    }

    delete(){
        this.currOperand = this.currOperand.slice(0,-1)
    }

    

    addNumber(number){
        if (this.currOperand.length >= 8) return
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    selectOperator(operation){
        this.operation = operation;
        this.prevOperand = this.currOperand + operation.toString()
        this.currOperand = '';
    }

    compute(){
        this.prevOperand = this.prevOperand.slice(0,-1)
        switch (this.operation) {
            case '×':
                this.currOperand = parseFloat(this.prevOperand) * parseFloat(this.currOperand)
                this.prevOperand = ''
                break
            case '+':
                this.currOperand = parseFloat(this.prevOperand) + parseFloat(this.currOperand)
                this.prevOperand = ''
                break
            case '-' :
                this.currOperand = parseFloat(this.prevOperand) - parseFloat(this.currOperand)
                this.prevOperand = ''
                break;
            case '÷':
                this.currOperand = parseFloat(this.prevOperand)/parseFloat(this.currOperand)
                this.prevOperand = ''
                break
        }}
            
    display(){
        this.currTextElement.innerText = this.currOperand
        this.prevTextElement.innerText = this.prevOperand
    }
}

const calculator = new Calculator(prevTextElement,currTextElement) // creating a new calculator object

numberButton.forEach(button => {       // defining action of clicking numberButton
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.display()
    })
})

operationButton.forEach(button => {       // defining action of clicking numberButton
    button.addEventListener('click', () => {
        calculator.selectOperator(button.innerText)
        calculator.display()
    })
})

allClear.addEventListener('click', button => {
    calculator.clear()
    calculator.display()
  })

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.display()
})

equals.addEventListener('click', button => {
    calculator.compute()
    calculator.display()
})

