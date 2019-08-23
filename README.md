# Front-End Web 100 Starter Project

This is a project created for the Front-End Web 100 Class.

It is a starter project that has WebPack installed, and the Babel loader, as well as loaders for CSS.

## Some Commands

This project uses NPM scripts, configured in the `package.json` file.
These commands should be run in the root directory of this project from a terminal window.

### To Install the Dependencies

`npm install`

### To run your specs (tests)

`npm test`

### To run your application in development mode

`npm run dev`

### To build your application

`npm run build`

### Instructions

Provide a simple app that allows one to calculate an amount of a tip to apply to a bill.
Enter the total amount of the bill.
User selects 10%, 15%, 20% and it displays the amount that should be left as a tip, and a total to be paid (bill amount plus tip).
Optional Iteration 1:
Store the selected preferred tip amount in web storage and retrieve its value at application start.
Optional Iteration 2:
Add an option to add a custom tip amount.
Optional Iteration 3:
Make an option to split the bill n ways, showing the amount due for each person.
Optional Iteration 4:
Unit test all the application behavior.

### Some Tips:
* The button which indicates the selected tip amount should be disabled. The others should not.
*	The input should be limited to numbers. If a number less than zero is indicated, make the border of the amount input red and clear out the calculated values in the list.
*	Make sure you are formatting the output correctly.
*	The calculated amounts in the list should update automatically as the user enters a value. No waiting for “enter”, no “do it” button.
*	You can use the elements id property to identify meaningful elements. Please, no hooking to events in the HTML source.
