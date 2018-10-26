//var arrayMembers = data.results[0].members; // global data of members

var arrayMembers;

// get file name
if (window.location.pathname == "/attendance-senate.html") { // if file is this, then URL is that
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (window.location.pathname == "/attendance-house.html") {
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

        getMemberNoForEachParty();

        app.bottomTenPctMembers = getMembersInOrder("descending");

        app.topTenPctMembers = getMembersInOrder("ascending");
    })


//..............Vue object to make table...............//
var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        members: [],
        membersStats: { // an object with keys(parties). Each key has an object. 
            Democrats: {
                "no_representatives": 0,
                "avg_votes": 0,
            },
            Republicans: {
                "no_representatives": 0,
                "avg_votes": 0,
            },
            Independents: {
                "no_representatives": 0,
                "avg_votes": 0,
            },
            Total: {
                "no_representatives": 0,
                "avg_votes": 0,
            }
        },
        bottomTenPctMembers: [],
        topTenPctMembers: [],
    },
})



//.........Count each member of each party........//
//Make three array lists, one for each party, and get the length
function getMemberNoForEachParty() {
    var arrayDemocrats = [];
    var arrayRepublicans = [];
    var arrayIndependents = [];
    var myArray = Array.from(arrayMembers); //create local array

    // loop through myArray and push items into separate party arrays 
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
    app.membersStats.Democrats.no_representatives = arrayDemocrats.length;
    app.membersStats.Republicans.no_representatives = arrayRepublicans.length;
    app.membersStats.Independents.no_representatives = arrayIndependents.length;
    app.membersStats.Total.no_representatives =
        myArray.length;

    // call calculate avg function to do its task
    app.membersStats.Democrats.avg_votes = calculateAverage(arrayDemocrats);
    app.membersStats.Republicans.avg_votes = calculateAverage(arrayRepublicans);
    app.membersStats.Independents.avg_votes = calculateAverage(arrayIndependents);
    app.membersStats.Total.avg_votes =
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

    if (isNaN(roundedAverage)) {
        roundedAverage = 0;
    }

    return roundedAverage + " %"; // return if you want to return anything as a RESULT of this function call
}



//.......Orders Members in top/ bottom 10%.......//

// getMembersInOrder is a function which calculates the top and bottom 10% of members by engagmenet, ordered by the given order ("highest","lowest")
function getMembersInOrder(order) {

    // 1. get global array and make local array
    var myArray = Array.from(arrayMembers);

    // 2. sort array of ALL members out in descending and ascending order, use IF statement:
    if (order === "descending") { // if order is "lowest"
        myArray.sort(function (a, b) { // sort myArray list from highest missed %vote to lowest to get the least engaged members
            return b.missed_votes_pct - a.missed_votes_pct;
        }) // return the result of highest to lowest sorting order
    } else if (order === "ascending") { // else if order is "highest"
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
    // returns an ordered array of either the top or bottom 10%
    return arrayFirstEleven;
}
