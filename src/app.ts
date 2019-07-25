import { add, multiply, divide } from './utils';

let tipButtons: NodeListOf<HTMLButtonElement>;
let messageOutput: HTMLElement
let billAmtInput: HTMLInputElement
let billAmtOutput: HTMLElement
let tipPctOutput: HTMLElement
let tipAmtOutput: HTMLElement
let totalOuput: HTMLUListElement
let custInput: HTMLInputElement
let custTipBtn: HTMLButtonElement
let splitBillBtn: HTMLButtonElement
let splitBillInput: HTMLInputElement
let splitBillOutput: HTMLParagraphElement
let resetCalcBtn: HTMLButtonElement
let perct: string
let totalOuputAmt: number

export function runApp() {

    tipButtons = document.querySelectorAll('.tip') as NodeListOf<HTMLButtonElement>;
    messageOutput = document.getElementById('tip-perct-msg');
    billAmtInput = document.getElementById('bill-amount-input') as HTMLInputElement;
    billAmtOutput = document.getElementById('bill-amount');
    tipPctOutput = document.getElementById('percentage');
    tipAmtOutput = document.getElementById('tip-amount');
    totalOuput = document.getElementById('total') as HTMLUListElement;
    custInput = document.getElementById('custom-tip-input') as HTMLInputElement;
    custTipBtn = document.getElementById('cust-tip-btn') as HTMLButtonElement;
    splitBillBtn = document.getElementById('bill-split-btn') as HTMLButtonElement;
    splitBillInput = document.getElementById('bill-split-number') as HTMLInputElement;
    splitBillOutput = document.getElementById('bill-split-msg') as HTMLParagraphElement;
    resetCalcBtn = document.getElementById('reset-btn') as HTMLButtonElement;

    custInput.disabled = true;
    tipButtons.forEach(b => b.addEventListener('click', handleClick));
    custInput.addEventListener('keyup', calcCustOnKeyup);
    custTipBtn.addEventListener('click', handleCustTipClick);
    billAmtInput.addEventListener('keyup', calcOnKeyup);
    splitBillBtn.addEventListener('click', handleBillSplitClick);
    resetCalcBtn.addEventListener('click', handleResetClick);

    perct = localStorage.getItem('perct');
    console.log("perct " + perct);
    if (perct) {
        setPercentButton();
    }
}

function handleResetClick() {

}

function handleBillSplitClick() {
    if (totalOuputAmt) {
        splitBillBtn.disabled = true;
        let splitAmt = divide(totalOuputAmt, +splitBillInput.value);
        splitBillOutput.innerText = `Bill split by ${splitBillInput.value}: ${splitAmt.toFixed(2)}/ea`;
    }
}

function handleCustTipClick() {
    resetTipButtons();
    custInput.value = '';
    messageOutput.innerText = "";
    custTipBtn.disabled = true;
    custInput.disabled = false;
}

function setPercentButton() {
    tipButtons.forEach((tipButton) => {
        if (tipButton.dataset.perct === perct) {
            //const that = tipButton as HTMLButtonElement;
            //that.disabled = true;
            tipButton.disabled = true;
        }
    })
}

function calcCustOnKeyup() {
    calculateTip(custInput.value, billAmtInput.value);

}

function calcOnKeyup() {
    tipButtons.forEach((tipButton) => {
        if (tipButton.disabled) {
            calculateTip(perct, billAmtInput.value);
        }
    })
    if (custTipBtn.disabled) {
        calculateTip(custInput.value, billAmtInput.value);
    }
}

function handleClick() {
    resetTipButtons();
    custInput.disabled = true;
    const that = this as HTMLButtonElement;
    that.disabled = true;
    if (billAmtInput.value.length > 0) {
        perct = that.dataset.perct;
        localStorage.setItem('perct', perct);
        if (parseInt(billAmtInput.value) >= 0) {
            billAmtInput.classList.remove('negative');
            calculateTip(perct, billAmtInput.value);
        }
        else {
            resetCalculator();
            billAmtInput.classList.add('negative');
        }

    }
}

function calculateTip(p: string, amt: string) {
    console.log("p " + p);
    let perctAmt: number = +p * .01;
    let amount: number = +amt;
    let tip: number = multiply(amount, perctAmt);
    totalOuputAmt = add(amount, tip);
    messageOutput.innerText = `You are tipping ${p}%`;
    billAmtOutput.innerText = `Bill Amount: $${amount.toFixed(2)}`;
    tipPctOutput.innerText = `Tip Percentage: ${p}%`;
    tipAmtOutput.innerText = `Amount of tip: $${tip.toFixed(2)}`;
    totalOuput.innerText = `Total to be Paid: $${totalOuputAmt.toFixed(2)}`;

}

function resetCalculator() {
    resetTipButtons();
    messageOutput.innerText = "";
    splitBillOutput.innerHTML = "";
    billAmtOutput.innerText = `Bill Amount:`;
    tipPctOutput.innerText = `Tip Percentage:`;
    tipAmtOutput.innerText = `Amount of tip:`;
    totalOuput.innerText = `Total Amount to be Paid:`;
}

function resetTipButtons() {
    tipButtons.forEach((tipButton) => {
        if (tipButton.attributes.getNamedItem('disabled'))
            tipButton.attributes.removeNamedItem('disabled');
    })
    if (custTipBtn.attributes.getNamedItem('disabled')) {
        custTipBtn.attributes.removeNamedItem('disabled');
    }
}