// Senate Members

var arrayMembers = data.results[0].members;

function createTable() {


    var tbl = document.getElementById("senate-data");
    var tblBody = document.getElementById("tblBody");


    for (var i = 0; i < arrayMembers.length; i++) {
        var tableRow = document.createElement("tr");
        tblBody.appendChild(tableRow);


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
    }
    tbl.appendChild(tblBody);
    console.log(tbl);
}

createTable();

//...........Senate Party Checkbox.............//

function getCheckBoxValue() {

    var tblBody = document.getElementById("tblBody");
    var rows = tblBody.children;
    var secondTD = rows[0].childNodes[1];
    console.log(secondTD);

    var senateCheckedBoxes = document.getElementsByName("partyforsenate"); // pass checkbox names to function
    for (var n = 0; n < senateCheckedBoxes.length; n++) { //loop over all checkboxes//
        if (senateCheckedBoxes[n].checked && "R" === senateCheckedBoxes[n].value) {
            // secondTD.style.display= "none";
        }
    }


}

var clickButton = document.getElementById("clickButton");
clickButton.addEventListener("click", getCheckBoxValue);
