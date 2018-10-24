// function hiwendy(arguments,arg1,arg2) {
//     console.log(arg1) //blah2

//     // return // always end the function execution
// }

// hiwendy(blah,blah2,blah3)

//...........Senate Party Checkbox.............//
//
//function getCheckBoxValue() {
//
//    // Logic: 
//    // 1. Get the value of each checkbox
//    // 2. For each checked, checkbox, add the value to the array
//    var arrayCheckedbox = []; // Array of all checked items
//    var senateCheckedBoxes = document.getElementsByName("partyforsenate"); // pass checkbox names to function
//    for (var n = 0; n < senateCheckedBoxes.length; n++) { //loop over all checkboxes//
//        if (senateCheckedBoxes[n].checked) {
//            arrayCheckedbox.push(senateCheckedBoxes[n].value);
//        }
//    }
//    var tblBody = document.getElementById("tblBody");
//    var rows = tblBody.getElementsByTagName("tr");
//
//    // If arrayCheckBox is empty then display everything
//    if (arrayCheckedbox.length === 0) {
//        for (var i = 0; i < rows.length; i++) //loop over all rows
//        {
//            rows[i].style.display = "table-row" // and display all table rows
//        }
//        return // always ends the function execution
//    }
//    // After any checkbox is changed, Loop through all checkboxes and show only those marked as checked
//    // Loop through all table rows
//    // check the party columm. If value is in arrayCheckBox then show, else hide
//
//    for (var i = 0; i < rows.length; i++) //loop over all rows and get second td
//    {
//        var secondTD = rows[i].getElementsByTagName("td")[1].innerText // text inside second cell of a row (repeats thru all rows to get 2nd td)
//        // console.log(secondTD)  // R
//        // arrayCheckedeBox = ["R", "D"]
//        // includes function checks if the given string is inside the array
//        if (secondTD && arrayCheckedbox.includes(secondTD)) //if secondTD (from table) & array both contain (secondTD)
//        {
//            rows[i].style.display = "table-row";
//        } else {
//            rows[i].style.display = "none";
//        }
//    }
//}
//// JS lets you execute code when events are detected. "Click" checkbox to run function.
//document.getElementById("clickR").addEventListener("click", getCheckBoxValue);
//document.getElementById("clickD").addEventListener("click", getCheckBoxValue);
//document.getElementById("clickI").addEventListener("click", getCheckBoxValue);
//
//
//// Fitler table by state name //
//
//function filterByStates() {
//    // Get the Table
//    var tableData = document.getElementById("tblBody"); // tablebody from HTML to JS
//    var rows = tblBody.getElementsByTagName("tr"); // get all rows 
//    // get thirdTD column "state" by looping all the rows first
//
//    // get the dropdown menu
//    var dropmenu = document.getElementById("statedropdown");
//    // get the state thats selected
//    var selectedStates = dropmenu[dropmenu.selectedIndex].value;
//    // if selectedStates Value === to table td3 then show tr by looping and show all relevant TRs
//
//    // if item in dropdown includes TD3 then show TR
//    for (var i = 0; i < rows.length; i++) { // loop over all rows 
//        var thirdTD = rows[i].getElementsByTagName("td")[2].innerText; // to get thirdTD
//        if (thirdTD && selectedStates.includes(thirdTD)) { //if thirdTD (from table) & dropDown contains (thirdTD)
//            rows[i].style.display = "table-row"; //display all rows
//        } else {
//            rows[i].style.display = "none"; // else hide the rows
//        }
//    }
//
//    // then show all rows when "ALL" from HTML is selected 
//    var all = document.getElementsByTagName("option")[0].value; // get value from HTML to JS (why .firstChild returns "text") 
//    if (selectedStates.includes(all)) { // if "All" selected, display all rows. 
//        for (var i = 0; i < rows.length; i++) { // loop all rows
//            rows[i].style.display = "table-row"; // and display all
//        }
//        return;
//    }
//}
//document.getElementById("statedropdown").addEventListener("change", filterByStates);
//

//var arrayMembers = data.results[0].members;

//..............Fetch live data..............//
var arrayMembers;

var url = "https://api.propublica.org/congress/v1/113/senate/members.json";

fetch(url, {
        headers: {
            'X-API-KEY': 'XPayM8RaBlLPv6ALgIuIRn0L6ubyFRKxDVNTrFgR'
        }
    })
    .then(function (data) {
        return data.json();
    })
    .then(function (myData) {
        console.log(myData);
        arrayMembers = myData.results[0].members;
        app.members = arrayMembers;
        // createTable()
        populateStateDropdown()
    });


document.getElementById("clickR").addEventListener("click", getPartyAndState);
document.getElementById("clickD").addEventListener("click", getPartyAndState);
document.getElementById("clickI").addEventListener("click", getPartyAndState);
document.getElementById("statedropdown").addEventListener("change", getPartyAndState);



// Vue object to make table
var app = new Vue({
    el: '#app',
    data: {
        members: []
    },
    methods: {
//on-click
        activateCheckBoxFilters: function() {
            getPartyAndState()
        } 
    },
    computed: {
        populateStateDropdown: function () { // function name and then declare function
            return [...new Set(this.members.map((member) => member.state).sort())]
            // inside Set is an array with no dublicates. 
            // members.map = a loop of all members
            // to get thru each member and return member.state
            // => arrow function (anonymous) = function () {} and returns state
            // and sort
            // this will return an array of strings
            // all states in strings in alphabetical order

        }
    }
})



//...............Table function............//
function createTable() {
    var tbl = document.getElementById("senate-data");
    var tblBody = document.getElementById("tblBody");


    for (var i = 0; i < arrayMembers.length; i++) {
        var tableRow = document.createElement("tr");

        var fullName;

        if (arrayMembers[i].middle_name === null) {
            fullName = arrayMembers[i].first_name + " " + arrayMembers[i].last_name;
        } else {
            fullName = arrayMembers[i].first_name + " " + arrayMembers[i].middle_name + " " + arrayMembers[i].last_name;
        }

        var link = document.createElement("a");
        link.setAttribute("href", arrayMembers[i].url);
        link.textContent = fullName;

        var memberInfo = [link, arrayMembers[i].party, arrayMembers[i].state, arrayMembers[i].seniority, arrayMembers[i].votes_with_party_pct];


        for (var j = 0; j < memberInfo.length; j++) {
            var tableCells = document.createElement("td");
            tableRow.appendChild(tableCells);
            tableCells.append(memberInfo[j]);
        }
        tblBody.appendChild(tableRow);
    }
    tbl.appendChild(tblBody);
    console.log(tbl);
}
//createTable();


//................. Populate state names to dropdown menu ..................//

function populateStateDropdown() {
    // Get the Table
    var tableData = document.getElementById("tblBody"); // tablebody from HTML to JS
    var rows = tableData.getElementsByTagName("tr"); // get all rows 
    var arrayStates = []; // creating variable arrayStates and setting it to an empty array

    console.log(rows.length)
    // get thirdTD column "state" by looping all the rows first
    for (var i = 0; i < rows.length; i++) {

        console.log("Ye")
        var thirdTD = rows[i].getElementsByTagName("td")[2].innerText //text inside third cell of a row
        // to not add same states inside the array we check if arrayStates has states inside already
        if (!arrayStates.includes(thirdTD)) { // if not inside the array, we want to add it. Stops dublicates.
            arrayStates.push(thirdTD); // put each state in the array 
        }
    }
    // console.log(arrayStates) // list of states 
    // get the dropdown from HTML
    arrayStates.sort(); // sort in alphabetical order
    var dropdown = document.getElementById("statedropdown"); // dropdown menu from HTML to JS
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

    console.log(arrayStates)
    // end goal is to have a select that looks something like this
    // <select>
    //     <option></option>
    //     <option value="All">All</option>
    //     <option value="Texas">Texas</option>
    //     <option value="Hawaii">Hawaii</option>
    // </select>
}
//populateStateDropdown();


//......................... Combine both Checkbox and Dropdown Menu filters ....................... //
/* LOGIC:
 Goal: when checkbox checked and state name selected display rows that contain both
 1. function getPartyAndState
 2. Get table, tr and td2
 2. if party.checked === secondTD && selectedStates.includes(party.checked) --> display rows
 3. loop all rows and display relevant rows 
 */

function getPartyAndState() {
    var dropmenu = document.getElementById("statedropdown").value; // get dropmenu <select> from HTML to JS

    // get checkbox to filter table
    var arrayCheckedbox = []; // Empty array to put all checked items in
    var senateCheckedBoxes = document.getElementsByName("partyforsenate"); // pass checkbox names to from HTML to JS function
    for (var n = 0; n < senateCheckedBoxes.length; n++) { //loop over all checkboxes
        if (senateCheckedBoxes[n].checked) { // if checkbox(es) checked
            arrayCheckedbox.push(senateCheckedBoxes[n].value); // push checked ones into empty array
        }
    }

    var tblBody = document.getElementById("tblBody"); // get table body from HTML to JS
    var rows = tblBody.getElementsByTagName("tr"); // get tr from inside tblbody by tag name

    // After any checkbox is changed, Loop through all checkboxes and show only those marked as checked
    // Loop through all table rows
    // check the party columm. If value is in arrayCheckBox then show, else hide

    for (var i = 0; i < rows.length; i++) { //loop over all rows and get second and third td
        var secondTD = rows[i].getElementsByTagName("td")[1].innerText // text inside second cell of a row
        var thirdTD = rows[i].getElementsByTagName("td")[2].innerText // text inside third cell of a row
        // arrayCheckedeBox = ["R", "D"]
        // 'includes' function checks if the given string is inside the array
        if (arrayCheckedbox.includes(secondTD) && (dropmenu.includes(thirdTD) || dropmenu.includes("All"))) { //if array includes secondTD and dropmenu includes thirdTD or "All"
            rows[i].style.display = "table-row"; // display table rows
        } else {
            rows[i].style.display = "none"; // else hide rows
        }
    }
    // if arrayCheckBox is empty and dropmenu incluse thirdTD and "All", display everything. This allows drop menu to work without checkbox checked. 
    if (arrayCheckedbox.length === 0) { // now array is empty
        for (var i = 0; i < rows.length; i++) { //loop over all rows
            var thirdTD = rows[i].getElementsByTagName("td")[2].innerText; // get thirdTD
            if (dropmenu.includes(thirdTD) || dropmenu.includes("All")) { // if dropmenu includes thirdTD and "All"
                rows[i].style.display = "table-row"; // display all rows
            } else {
                rows[i].style.display = "none"; // else hide
            }
        }
    }
}

// JS lets you execute code when events are detected. "Click" checkbox and "change" dropmenu to run function.
//document.getElementById("clickR").addEventListener("click", getPartyAndState);
//document.getElementById("clickD").addEventListener("click", getPartyAndState);
//document.getElementById("clickI").addEventListener("click", getPartyAndState);
//document.getElementById("statedropdown").addEventListener("change", getPartyAndState);
