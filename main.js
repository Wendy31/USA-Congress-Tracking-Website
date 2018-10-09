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




//// House Data
//var arrayHouseMembers = data.results[0].members;
//
//function createTable() {
//
//
//    var tbl = document.getElementById("senate-data");
//    var tblBody = document.getElementById("tblBody");
//
//
//    for (var i = 0; i < arrayHouseMembers.length; i++) {
//        var tableRow = document.createElement("tr");
//        tblBody.appendChild(tableRow);
//
//
//        var fullName;
//
//        if (arrayHouseMembersMembers[i].middle_name === null) {
//            fullName = arrayHouseMembersMembers[i].first_name + " " + arrayHouseMembersMembers[i].last_name;
//        } else {
//            fullName = arrayHouseMembersMembers[i].first_name + " " + arrayHouseMembersMembers[i].middle_name + " " + arrayHouseMembersMembers[i].last_name;
//        }
//
//        var link = document.createElement("a");
//        link.setAttribute("href", arrayHouseMembersMembers[i].url);
//        link.textContent = fullName;
//
//        var memberInfo = [link, arrayHouseMembersMembers[i].party, arrayHouseMembersMembers[i].state, arrayHouseMembersMembers[i].seniority, arrayHouseMembersMembers[i].votes_with_party_pct];
//
//        
//        for (var j = 0; j < memberInfo.length; j++) {
//            var tableCells = document.createElement("td");
//            tableRow.appendChild(tableCells);
//            tableCells.append(memberInfo[j]);
//        }
//    }
//    tbl.appendChild(tblBody);
//    console.log(tbl);
//}
//
//createTable();