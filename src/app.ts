import { add, multiply } from './utils';

let tipButtons: NodeListOf<HTMLElement>;
let message: HTMLElement
let inputAmt: HTMLInputElement
let billAmt: HTMLElement
let tipPct: HTMLElement
let tipAmt: HTMLElement
let total: HTMLElement

export function runApp() {

    tipButtons = document.querySelectorAll('.btn');
    tipButtons.forEach((tipButton) => {
        tipButton.addEventListener('click', handleClick);
    })
    message = document.getElementById('tip-perct-msg');
    inputAmt = document.getElementById('bill-amount-input') as HTMLInputElement;
    billAmt = document.getElementById('bill-amount');
    tipPct = document.getElementById('percentage');
    tipAmt = document.getElementById('tip-amount');
    total = document.getElementById('total');
    inputAmt.addEventListener('focus', resetTipButtons);
}

function handleClick() {
    resetTipButtons();
    const that = this as HTMLButtonElement;
    that.disabled = true;
    if (inputAmt.value.length > 0) {
        let perct = that.dataset.perct;
        message.innerText = `You are tipping ${perct}%`;
        if (parseInt(inputAmt.value) >= 0) {
            inputAmt.classList.remove('negative');
            calculateTip(perct, inputAmt.value);
        }
        else {
            resetCalculator();
            inputAmt.classList.add('negative');
        }

    }
}

function calculateTip(perct: string, amt: string) {
    let perctAmt: number = +perct * .01;
    let amount: number = +amt;
    let tip: number = multiply(amount, perctAmt);
    let totalNum: number = add(amount, tip);

    billAmt.innerText = `Bill Amount: $${amt}`;
    tipPct.innerText = `Tip Percentage: ${perct}%`;
    tipAmt.innerText = `Amount of tip: $${tip}`;
    total.innerText = `Total to be Paid: $${totalNum}`;

}

function resetCalculator() {
    resetTipButtons();
    message.innerText = "";
    billAmt.innerText = `Bill Amount:`;
    tipPct.innerText = `Tip Percentage:`;
    tipAmt.innerText = `Amount of tip:`;
    total.innerText = `Total to be Paid:`;
}

function resetTipButtons() {
    tipButtons.forEach((tipButton) => {
        if (tipButton.attributes.getNamedItem('disabled'))
            tipButton.attributes.removeNamedItem('disabled');
    })
}