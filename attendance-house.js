//var arrayMembers = data.results[0].members; // global array

var arrayMembers;

var url = "https://api.propublica.org/congress/v1/113/house/members.json";

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

        getMemberNoForEachParty();
        createGlanceTable(statistics.members);
        getMembersInOrder("lowest");
        createEngagementTable(getMembersInOrder("lowest"), "tblBodyLeastEngaged");
        getMembersInOrder("highest");
        createEngagementTable(getMembersInOrder("highest"), "tblBodyMostEngaged");
    })



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

// calling functions 
getMemberNoForEachParty(); // to count and get avg vote
createGlanceTable(statistics.members); // calls table function with given data (stats object) 


//.........Count each member of each party........//
// count each member and push to separate arrays
function getMemberNoForEachParty() {
    var arrayDemocrats = [];
    var arrayRepublicans = [];
    var arrayIndependents = [];
    var myArray = Array.from(arrayMembers);

    for (var i = 0; i < myArray.length; i++) {
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

    // to calculate the avg, call the avg function to do the task and put the approriate array inside parameter 
    statistics.members[0].avg_votes = calculateAverage(arrayDemocrats);
    statistics.members[1].avg_votes = calculateAverage(arrayRepublicans);
    statistics.members[2].avg_votes = calculateAverage(arrayIndependents);
    statistics.members[3].avg_votes =
        calculateAverage(myArray);
}

// .............Average Calculator.............//
function calculateAverage(arrayParty) {

    var sum = 0;
    for (var i = 0; i < arrayParty.length; i++) {
        sum += arrayParty[i].votes_with_party_pct;
    }
    var average = sum / arrayParty.length; // get average
    var roundedAverage = average.toFixed(2);

    if (isNaN(roundedAverage)) {
        roundedAverage = 0;
    }

    return roundedAverage + " %"; // return the result each time
}



// ..........Senate at a glance table...........//
// creates table using the given input data. Which is an array
function createGlanceTable(arrayStatisticsMembers) {

    var tblbody = document.getElementById("tblBodyHouseGlance");

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



//.......Orders Members in top/ bottom 10%.......//
// this function puts members in ascending and descending order
// then gets bottom or top 10%
// it is ordered by the given order (i.e. "lowest","highest")
function getMembersInOrder(order) {

    var myArray = Array.from(arrayMembers);

    if (order === "lowest") { // if order is lowest sort array decendingly 
        myArray.sort(function (a, b) {
            return b.missed_votes_pct - a.missed_votes_pct;
        })
    } else if (order === "highest") { // else if order is highest sort array ascendingly 
        myArray.sort(function (a, b) {
            return a.missed_votes_pct - b.missed_votes_pct;
        })
    }

    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen);
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) {
        arrayFirstEleven.push(myArray[i]);
    }

    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].missed_votes_pct === myArray[i].missed_votes_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    return arrayFirstEleven; // return an ordered array
}


//........... Senate engagement table.............//
// this function creates a table using the given data 
// and puts table to the given table body in the HTML
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

        var memberInfo = [link, data[i].missed_votes, data[i].missed_votes_pct + " %"];

        for (var j = 0; j < memberInfo.length; j++) {
            var tblCells = document.createElement("td");
            tblCells.append(memberInfo[j]);
            tblRows.appendChild(tblCells);
        }
        tblbody.appendChild(tblRows);
    }
}


getMembersInOrder("lowest"); // calls function that returns an ordered array, in desceding order
createEngagementTable(getMembersInOrder("lowest"), "tblBodyLeastEngaged"); // calls table function that uses the given ordered array and puts into the given table body

getMembersInOrder("highest"); // calls function that returns an ordered array, in ascending order
createEngagementTable(getMembersInOrder("highest"), "tblBodyMostEngaged"); // calls table function that uses the given ordered array and puts into the given table body
