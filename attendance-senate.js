var arrayMembers = data.results[0].members; // global data of members

//.......Statistics object.......//
var statistics = {
    "members": [
        {
            "party": "Democrats",
            "no_representatives": 0,
            "avg_votes": 0,
        },
        {
            "party": "Republicans",
            "no_representatives": 0,
            "avg_votes": 0,
        },
        {
            "party": "Independents",
            "no_representatives": 0,
            "avg_votes": 0,
        },
        {
            "party": "Total",
            "no_representatives": 0,
            "avg_votes": 0,
        }
    ]
}

getMemberNoForEachParty(); // calls the count function
createGlanceTable(statistics.members); //calls table function with statistics object inside param to populate table


//.........Count each member of each party........//
//Make three array lists, one for each party, and get the length
function getMemberNoForEachParty() {
    var arrayDemocrats = [];
    var arrayRepublicans = [];
    var arrayIndependents = [];
    var myArray = Array.from(arrayMembers); //create local array

    // loop through myArray and push items into separate party arrays 
    for (var i = 0; i < myArray.length; i++) {
        // Hint: Could use a Switch Statement here 
        // See: https://www.w3schools.com/js/js_switch.asp for more information
        if (myArray[i].party === "D") {
            arrayDemocrats.push(myArray[i]);
        } else if (myArray[i].party === "R") {
            arrayRepublicans.push(myArray[i]);
        } else {
            arrayIndependents.push(myArray[i]);
        }
    }

    // append all data to Statistics object
    statistics.members[0].no_representatives = arrayDemocrats.length;
    statistics.members[1].no_representatives = arrayRepublicans.length;
    statistics.members[2].no_representatives = arrayIndependents.length;
    statistics.members[3].no_representatives =
        myArray.length;

    // call calculate avg function to do its task
    statistics.members[0].avg_votes = calculateAverage(arrayDemocrats);
    statistics.members[1].avg_votes = calculateAverage(arrayRepublicans);
    statistics.members[2].avg_votes = calculateAverage(arrayIndependents);
    statistics.members[3].avg_votes =
        calculateAverage(myArray);
}

// .............Average Calculator.............//
function calculateAverage(arrayParty) { // params can be any name. It's what will be passed inside later i.e an arrray list. Name doesn't matter, the position matters.

    // loop around array and sum up all % votes
    var sum = 0;
    for (var i = 0; i < arrayParty.length; i++) {
        sum += arrayParty[i].votes_with_party_pct;
    }
    var average = sum / arrayParty.length; // get average
    var roundedAverage = average.toFixed(2);
    return roundedAverage; // return if you want to return anything as a RESULT of this function call
}


// ..........Senate at a glance table...........//
function createGlanceTable(arrayStatisticsMembers) {

    var tblbody = document.getElementById("tblBodySenateGlance"); //get tbody from HTML

    for (var i = 0; i < arrayStatisticsMembers.length; i++) {
        var tblRows = document.createElement("tr"); //create tr

        var tblColumns = [arrayStatisticsMembers[i].party,
        arrayStatisticsMembers[i].no_representatives,
        arrayStatisticsMembers[i].avg_votes];

        for (var j = 0; j < tblColumns.length; j++) {
            var tblCells = document.createElement("td");
            tblCells.append(tblColumns[j]);
            tblRows.appendChild(tblCells);
        }
        tblbody.appendChild(tblRows);
    }
}



// Note: It does not matter where global "vars" are delcarted in the code because javascript has hoisting
// https://www.w3schools.com/js/js_hoisting.asp

getMembersInOrder("lowest")
createEngagementTable(getMembersInOrder("lowest"), "tblBodyLeastEngaged");

getMembersInOrder("highest"); // calling the function that calculates and returns an array

// table function that is passed a function that returns an ordered array, and name of a table body. 
createEngagementTable(getMembersInOrder("highest"), "tblBodyMostEngaged");


//.......Orders Members in top/ bottom 10%.......//

// getMembersInOrder is a function which calculates the top and bottom 10% of members by engagmenet, ordered by the given order ("highest","lowest")
function getMembersInOrder(order) {

    // 1. get global array and make local array
    var myArray = Array.from(arrayMembers);

    // 2. sort array of ALL members out in descending and ascending order, use IF statement:
    if (order === "lowest") { // if order is "lowest"
        myArray.sort(function (a, b) { // sort myArray list from highest missed %vote to lowest to get the least engaged members
            return b.missed_votes_pct - a.missed_votes_pct;
        }) // return the result of highest to lowest sorting order
    } else if (order === "highest") { // else if order is "highest"
        myArray.sort(function (a, b) { // sort myArray order from lowest to highest of % votes to get most engaged member
            return a.missed_votes_pct - b.missed_votes_pct;
        }) // return the result of low to high sorting order
    }


    // 3. work out 10% of the total senate number (105)= members.length * 0.10 = 10.50 and math.round
    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen); // round 10.50 up

    // 4. Loop thru all 11 members and put them into a new array
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) {
        arrayFirstEleven.push(myArray[i]);
    }

    // 5. Loop around all members starting from 12th position. If % vote === to last % vote of other array, push number into arrayFirstEleven.
    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].missed_votes_pct === myArray[i].missed_votes_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    return arrayFirstEleven; // returns an ordered array in either the top or bottom 10%
}


//........... Senate engagement table.............//

// General rules for refactoring:
// 1) Find the variables that are different
// 2) Pass them in as paramaters

// this function creates a table using the given input data which must be an array of members, 
// and puts the data into the given tablebody ref
function createEngagementTable(data, tblBodyName) {
    var tblbody = document.getElementById(tblBodyName);

    for (var i = 0; i < data.length; i++) {
        var tblRows = document.createElement("tr");

        var fullName;
        if (data[i].middle_name === null) {
            fullName = data[i].first_name + " " + data[i].last_name;
        } else {
            fullName = data[i].first_name + " " + data[i].middle_name + " " + data[i].last_name;
        }

        var link = document.createElement("a");
        link.setAttribute("href", data[i].url);
        link.textContent = fullName;

        var memberInfo = [link, data[i].missed_votes, data[i].missed_votes_pct];

        for (var j = 0; j < memberInfo.length; j++) {
            var tblCells = document.createElement("td");
            tblCells.append(memberInfo[j]);
            tblRows.appendChild(tblCells);
        }
        tblbody.appendChild(tblRows);
    }
}
