//var arrayMembers = data.results[0].members;

//..............Fetch live data..............//
var arrayMembers;

if (window.location.pathname == "/senate-data.html") { // if file is this, then URL is that
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (window.location.pathname == "/house-data.html") {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json"
}


fetch(url, {
        headers: {
            'X-API-KEY': 'XPayM8RaBlLPv6ALgIuIRn0L6ubyFRKxDVNTrFgR'
        }
    })
    .then(function (data) {
        return data.json();
        app.loading = true;
    })

    .then(function (myData) {
        console.log(myData);
        arrayMembers = myData.results[0].members;
        app.members = arrayMembers;
        app.loading = false;

        populateStateDropdown()
    });


document.getElementById("clickR").addEventListener("click", getPartyAndState);
document.getElementById("clickD").addEventListener("click", getPartyAndState);
document.getElementById("clickI").addEventListener("click", getPartyAndState);
document.getElementById("statedropdown").addEventListener("change", getPartyAndState);



//..............Vue object to make table...............//
var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        members: []
    },
    methods: {
        activateCheckBoxFilters: function () {
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



function getPartyAndState() {
    var dropmenu = document.getElementById("statedropdown").value; // get dropmenu <select> from HTML to JS

    // get checkbox to filter table
    var arrayCheckedbox = []; // Empty array to put all checked items in
    var checkedBoxes = document.getElementsByName("party"); // pass checkbox names to from HTML to JS function
    for (var n = 0; n < checkedBoxes.length; n++) { //loop over all checkboxes
        if (checkedBoxes[n].checked) { // if checkbox(es) checked
            arrayCheckedbox.push(checkedBoxes[n].value); // push checked ones into empty array
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
