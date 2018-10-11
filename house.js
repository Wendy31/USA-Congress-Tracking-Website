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