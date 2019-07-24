import { add, multiply, divide } from './utils';

let tipButtons: NodeListOf<HTMLButtonElement>;
let message: HTMLElement
let billAmtInput: HTMLInputElement
let billAmt: HTMLElement
let tipPct: HTMLElement
let tipAmt: HTMLElement
let totalOuput: HTMLUListElement
let custInput: HTMLInputElement
let custTipBtn: HTMLButtonElement
let splitBillBtn: HTMLButtonElement
let splitBillInput: HTMLInputElement
let splitBillOutput: HTMLParagraphElement
let perct: string
let totalOuputAmt: number

export function runApp() {

    tipButtons = document.querySelectorAll('.tip') as NodeListOf<HTMLButtonElement>;
    message = document.getElementById('tip-perct-msg');
    billAmtInput = document.getElementById('bill-amount-input') as HTMLInputElement;
    billAmt = document.getElementById('bill-amount');
    tipPct = document.getElementById('percentage');
    tipAmt = document.getElementById('tip-amount');
    totalOuput = document.getElementById('total') as HTMLUListElement;
    custInput = document.getElementById('custom-tip-input') as HTMLInputElement;
    custTipBtn = document.getElementById('cust-tip-btn') as HTMLButtonElement;
    splitBillBtn = document.getElementById('bill-split-btn') as HTMLButtonElement;
    splitBillInput = document.getElementById('bill-split-number') as HTMLInputElement;
    splitBillOutput = document.getElementById('bill-split-msg') as HTMLParagraphElement;

    tipButtons.forEach((tipButton) => {
        tipButton.addEventListener('click', handleClick);
    })
    custInput.addEventListener('keyup', calcCustOnKeyup);
    custTipBtn.addEventListener('click', handleCustTipClick);
    billAmtInput.addEventListener('keyup', calcOnKeyup);
    splitBillBtn.addEventListener('click', handleBillSplitClick);

    perct = localStorage.getItem('perct');
    if (perct) {
        setPercentButton(perct);
    }
}

function handleBillSplitClick() {
    if (totalOuputAmt) {
        let splitAmt = divide(totalOuputAmt, +splitBillInput.value);
        splitBillOutput.innerText = `Bill split $${splitBillInput.value} ways: ${splitAmt.toFixed(2)}/ea`;
    }
}

function handleCustTipClick() {
    resetTipButtons();
    custInput.value = '';
    message.innerText = "";
    custTipBtn.disabled = true;
}

function setPercentButton(p: string) {
    tipButtons.forEach((tipButton) => {
        if (tipButton.dataset.perct === p) {
            const that = tipButton as HTMLButtonElement;
            that.disabled = true;
        }
    })
}

function calcCustOnKeyup() {
    calculateTip(custInput.value, billAmtInput.value);

}

function calcOnKeyup() {
    tipButtons.forEach((tipButton) => {
        if (tipButton.attributes.getNamedItem('disabled')) {
            let perct = tipButton.dataset.perct;
            calculateTip(perct, billAmtInput.value);
        }
        else {
            calculateTip(custInput.value, billAmtInput.value);
        }
    })
}

function handleClick() {
    resetTipButtons();
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

function calculateTip(perct: string, amt: string) {
    let perctAmt: number = +perct * .01;
    let amount: number = +amt;
    let tip: number = multiply(amount, perctAmt);
    totalOuputAmt = add(amount, tip);
    message.innerText = `You are tipping ${perct}%`;
    billAmt.innerText = `Bill Amount: $${amount.toFixed(2)}`;
    tipPct.innerText = `Tip Percentage: ${perct}%`;
    tipAmt.innerText = `Amount of tip: $${tip.toFixed(2)}`;
    totalOuput.innerText = `Total to be Paid: $${totalOuputAmt.toFixed(2)}`;

}

// function calculate(perct: string, amt: string) {
//     let perctAmt: number = +perct * .01;
//     let amount: number = +amt;
//     let tip: number = calculateTip(amount, perctAmt);
//     let totalOuputPaid: number = calculatetotalOuput()
// }

function resetCalculator() {
    resetTipButtons();
    message.innerText = "";
    billAmt.innerText = `Bill Amount:`;
    tipPct.innerText = `Tip Percentage:`;
    tipAmt.innerText = `Amount of tip:`;
    totalOuput.innerText = `totalOuput to be Paid:`;
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