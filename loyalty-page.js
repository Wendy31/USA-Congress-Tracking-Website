//var arrayMembers = data.results[0].members; // global array

var arrayMembers;

if (window.location.pathname == "/loyalty-senate.html") {
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (window.location.pathname == "/loyalty-house.html") {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json"
}


fetch(url, {
        headers: {
            'X-API-KEY': 'XPayM8RaBlLPv6ALgIuIRn0L6ubyFRKxDVNTrFgR'
        }
    })
    .then(function (data) {
        return data.json();
        app.loading = true; //loading show when no data
    })

    .then(function (myData) {
        console.log(myData);
        arrayMembers = myData.results[0].members;
        app.members = arrayMembers;
        app.loading = false; //loading stop when data shows

        getMemberNoForEachParty();

        app.bottomTenPctMembers = getMembersInOrder("ascending");

        app.topTenPctMembers = getMembersInOrder("descending");
    })

// show loader before data is fetched. show = true
// show false when data is present. When fetch is success

//..............Vue object to make table...............//
var app = new Vue({
    el: '#app',
    data: {
        loading: true, //show loading right before all data
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

    // asign all data to Statistics object
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


//.......Orders Members in top/ bottom 10%.......//
// this function puts members in ascending and descending order
// then gets bottom or top 10%
// it is ordered by the given order (i.e. "lowest","highest")
function getMembersInOrder(order) {

    var myArray = Array.from(arrayMembers);

    if (order === "descending") { // if order is lowest sort array decendingly 
        myArray.sort(function (a, b) {
            return b.votes_with_party_pct - a.votes_with_party_pct;
        })
    } else if (order === "ascending") { // else if order is highest sort array ascendingly 
        myArray.sort(function (a, b) {
            return a.votes_with_party_pct - b.votes_with_party_pct;
        })
    }

    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen);
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) {
        arrayFirstEleven.push(myArray[i]);
    }

    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].votes_with_party_pct === myArray[i].votes_with_party_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    return arrayFirstEleven; // return an ordered array
}
