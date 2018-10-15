// House Data
var arrayHouseMembers = data.results[0].members;

function createTable() {


    var tbl = document.getElementById("house-data");
    var tblBody = document.getElementById("tblBod");


    for (var i = 0; i < arrayHouseMembers.length; i++) {
        var tableRow = document.createElement("tr");
        tblBody.appendChild(tableRow);


        var fullName;

        if (arrayHouseMembers[i].middle_name === null) {
            fullName = arrayHouseMembers[i].first_name + " " + arrayHouseMembers[i].last_name;
        } else {
            fullName = arrayHouseMembers[i].first_name + " " + arrayHouseMembers[i].middle_name + " " + arrayHouseMembers[i].last_name;
        }

        var link = document.createElement("a");
        link.setAttribute("href", arrayHouseMembers[i].url);
        link.textContent = fullName;

        var memberInfo = [link, arrayHouseMembers[i].party, arrayHouseMembers[i].state, arrayHouseMembers[i].seniority, arrayHouseMembers[i].votes_with_party_pct];


        for (var j = 0; j < memberInfo.length; j++) {
            var tableCells = document.createElement("td");
            tableRow.appendChild(tableCells);
            tableCells.append(memberInfo[j]);
        }
    }
    tbl.appendChild(tblBody);
    console.log(tbl);
}

createTable();

//................. Populate state names to dropdown menu ..................//

function populateStateDropdown() {
    // Get the Table
    var tableData = document.getElementById("tblBod"); // tablebody from HTML to JS
    var rows = tblBod.getElementsByTagName("tr"); // get all rows 
    var arrayStates = []; // creating variable arrayStates and setting it to an empty array

    // get thirdTD column "state" by looping all the rows first
    for (var i = 0; i < rows.length; i++) {
        var thirdTD = rows[i].getElementsByTagName("td")[2].innerText //text inside third cell of a row
        // to not add same states inside the array we check if arrayStates has states inside already
        if (!arrayStates.includes(thirdTD)) { // if not inside the array, we want to add it. Stops dublicates.
            arrayStates.push(thirdTD); // put each state in the array 
            arrayStates.sort(); // sort in alphabetical order
        }
    }
    // console.log(arrayStates) // list of states 
    // get the dropdown from HTML
    var dropdown = document.getElementById("housedropdown"); // dropdown menu from HTML to JS
    // Populate the menu by adding an option element for each state in arrayStates
    for (var i = 0; i < arrayStates.length; i++) {
        // take a state from arraystates
        var state = arrayStates[i]
        // add it to the dropdown element as an <option>
        var option = document.createElement("option"); //created option element
        // add the state into the option as a value
        option.setAttribute("value", state) // added array states into option
        option.innerText = state // added states as text to option
        // add the option to the dropdown element
        dropdown.add(option); // no array of states anymore, all inside 
        //        <select><option></option></select> as text
    }
    // end goal is to have a select that looks something like this
    // <select>
    //     <option></option>
    //     <option value="All">All</option>
    //     <option value="Texas">Texas</option>
    //     <option value="Hawaii">Hawaii</option>
    // </select>
}
populateStateDropdown();


//......................... Combine both Checkbox and Dropdown Menu filters ....................... //
/* LOGIC:
 Goal: when checkbox checked and state name selected display rows that contain both
 1. function getPartyAndState
 2. Get table, tr and td2
 2. if party.checked === secondTD && selectedStates.includes(party.checked) --> display rows
 3. loop all rows and display relevant rows 
 */

function getPartyAndState() {
    var dropmenu = document.getElementById("housedropdown").value;


    // get checkbox to filter table
    var arrayCheckedbox = []; // Array of all checked items
    var CheckedBoxes = document.getElementsByName("partyforhouse"); // pass checkbox names to function
    for (var n = 0; n < CheckedBoxes.length; n++) { //loop over all checkboxes//
        if (CheckedBoxes[n].checked) {
            arrayCheckedbox.push(CheckedBoxes[n].value);
        }
    }

    var tblBody = document.getElementById("tblBod");
    var rows = tblBody.getElementsByTagName("tr");

    // After any checkbox is changed, Loop through all checkboxes and show only those marked as checked
    // Loop through all table rows
    // check the party columm. If value is in arrayCheckBox then show, else hide

    for (var i = 0; i < rows.length; i++) //loop over all rows and get second td
    {
        var thirdTD = rows[i].getElementsByTagName("td")[2].innerText
        var secondTD = rows[i].getElementsByTagName("td")[1].innerText // text inside second cell of a row (repeats thru all rows to get 2nd td)
        // console.log(secondTD)  // R
        // arrayCheckedeBox = ["R", "D"]
        // includes function checks if the given string is inside the array
        if (arrayCheckedbox.includes(secondTD) && (dropmenu.includes(thirdTD) || dropmenu.includes("All"))) //if secondTD (from table) & array both contain (secondTD)
        {
            rows[i].style.display = "table-row";
        } else {
            rows[i].style.display = "none";
        }
    }
    // if arrayCheckBox is empty then display everything
    if (arrayCheckedbox.length === 0) { // now array is empty
        for (var i = 0; i < rows.length; i++) //loop over all rows
        {
            var thirdTD = rows[i].getElementsByTagName("td")[2].innerText;

            if (dropmenu.includes(thirdTD) || dropmenu.includes("All")) {
                rows[i].style.display = "table-row";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

// JS lets you execute code when events are detected. "Click" checkbox to run function.
document.getElementById("clickR").addEventListener("click", getPartyAndState);
document.getElementById("clickD").addEventListener("click", getPartyAndState);
document.getElementById("clickI").addEventListener("click", getPartyAndState);
document.getElementById("housedropdown").addEventListener("change", getPartyAndState);
