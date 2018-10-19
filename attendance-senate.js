var arrayMembers = data.results[0].members; // get data of members

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
//Glance Data
getMemberNoForEachParty();
createTable(statistics.members);

getLeastEngagedMembers();
getMostEngagedMembers();
//populateFromObject();

//..............Get number of members of each party...............//

//Make three array lists, one for each party, and get the length

// Empty arrays to push number of members in later
function getMemberNoForEachParty() {
    var arrayDemocrats = [];
    var arrayRepublicans = [];
    var arrayIndependents = [];
    var myArray = Array.from(arrayMembers);

    //Then update your statistics object with the number of members in each party, e.g. "Number of Democrats" with the length of the list of Democrat objects.

    // 1. loop through all arrayMembers and find party "D"
    // 2. var democrat:
    // 3. get element by name and put into array
    // 4. then loop through array to get length

    // loop through arrayMembers and push items into separate arrays 
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

    statistics.members[0].avg_votes = average_calculator(arrayDemocrats);
    statistics.members[1].avg_votes = average_calculator(arrayRepublicans);
    statistics.members[2].avg_votes = average_calculator(arrayIndependents);
    statistics.members[3].avg_votes =
        average_calculator(myArray);
}


// ...............loop all votes and get numbers into array................//

// Calculate average "Votes with Party" for each party
// var arrayDemVotes
// loop all votes and get numbers into array
// Calculate the sum
// divide by the size of array.length

function average_calculator(arrayParty) {

    // get sum and average for each array
    //loop around Dem array and get sum

    var sum = 0;
    for (var i = 0; i < arrayParty.length; i++) {
        sum += arrayParty[i].votes_with_party_pct;
    }
    var average = sum / arrayParty.length;
    var roundedAverage = average.toFixed(2);
    return roundedAverage; // return if you want to return something as a variable
}




//var sumDem = 0;
//for (var i = 0; i < arrayDemVote.length; i++) {
//    sumDem += arrayDemVote[i];
//}
//var avgDem = sumDem / arrayDemVote.length;
//return avgDem;
//
//
//// loop around Rep array and get sum
//var sumRep = 0;
//for (var i = 0; i < arrayRepVote.length; i++) {
//    sumRep += arrayRepVote[i];
//}
//var avgRep = sumRep / arrayRepVote.length;
//return avgRep;
//
//
//// loop around Ind array and get sum
//var sumInd = 0;
//for (var i = 0; i < arrayIndVote.length; i++) {
//    sumInd += arrayIndVote[i];
//}
//var avgInd = sumInd / arrayIndVote.length;
//return avgInd;
//}
//


//.............Find Members Who vote the least with their Party .............//
// 1. Get array of all member objects: arrayMembers[i]
// 2. sort array of objects by the % for each object
// 3. work out 10% of the total senate number (105)= members.length * 0.10 = 10.50 and math.round
// 4. Loop to find members in 11th postion and put them in new array
// 5. Loop through main array, if members with same % as last member (.length -1) of new array, push into new array. 

getLeastAndMostEngagedMembers(arrayTotalMembers, "most")

function getLeastAndMostEngagedMembers(arrayTotalMembers, least) {

    var myArray = Array.from(arrayMembers);

    // 1. Get array of all member objects: arrayMembers[i]
    // 2. sort array of objects by the % for each object
    arrayTotalMembers.sort(function (a, b) { // by default sorts in ascending order. Reverse order of arguement to get decending order. 
        return b.missed_votes_pct - a.missed_votes_pct;
    })

    // 3. work out 10% of the total senate number (105)= members.length * 0.10 = 10.50 and math.round
    var pctTen = arrayTotalMembers.length * 0.10;
    var roundedPosition = Math.round(pctTen); // round 10.50 up
    console.log(roundedPosition);


    // 4. Loop thru all 11 members and put them into a new array
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) { // do 11 loops
        arrayFirstEleven.push(arrayTotalMembers[i]); // and push members 
    }

    // 5. Loop around all members starting from 12th position. If % vote === to last % vote of other array, push number into arrayFirstEleven.
    for (var i = roundedPosition + 1; i < arrayTotalMembers.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].missed_votes_pct === arrayTotalMembers[i].missed_votes_pct) {
            arrayFirstEleven.push(arrayTotalMembers[i]);
        }
    }
    
    if(least == "most")
    return arrayFirstEleven;
    else
        return arrayFirstEleven.reverse()
        // all members with the highest missed votes %. People who vote the least.
}



//...................Most Engaged Members.................//
// Find members who vote the most

function getMostEngagedMembers() {

    var myArray = Array.from(arrayMembers);
    // 1. Get array of all member objects: arrayMembers[i]
    // 2. sort array of objects by the % for each object
    myArray.sort(function (a, b) { // by default sorts in ascending order. Reverse order of arguement to get decending order. 
        return a.missed_votes_pct - b.missed_votes_pct;
    })

    // 3. work out 10% of the total senate number (105)= members.length * 0.10 = 10.50 and math.round
    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen); // round 10.50 up


    // 4. Loop thru all 11 members and put them into a new array
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) { // do 11 loops
        arrayFirstEleven.push(myArray[i]); // and push members 
    }

    // 5. Loop around all members starting from 12th position. If % vote === to last % vote of other array, push number into arrayFirstEleven.
    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].missed_votes_pct === myArray[i].missed_votes_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    console.log(arrayFirstEleven); // all members with the highest missed votes %. People who vote the least.
}



////...................Senate at a glance..................//
//// JSON object with Keys and Values 
//
//function populateFromObject() {
//    var myArray = Array.from(arrayMembers);
//
//    var tbl = document.getElementById("senate-stats");
//    var tblbody = document.getElementById("tblBody");
//    var tblHead = document.getElementsByTagName("th");
//    var arrayTblHead = [];
//    arrayTblHead.push(tblHead);


// loop thru all members. If party === "D" add one to stats.Number of Democrats
//    for (var i = 0; i < myArray.length; i++) {
//        if (myArray[i].party === "D" && myArray[i].votes_with_party_pct) {
//            statistics.members[0].no_representatives += 1;
//            statistics.members[0].avg_votes += myArray[i].votes_with_party_pct;
//
//        } else if (myArray[i].party === "R" && myArray[i].votes_with_party_pct) {
//            statistics.members[1].no_representatives += 1;
//            statistics.members[1].avg_votes += myArray[i].votes_with_party_pct
//        } else {
//            statistics.members[2].no_representatives += 1;
//            statistics.members[2].avg_votes += myArray[i].votes_with_party_pct
//        }
//    }

//put stats into a table. Add total at the bottom.
// loop through the array of members and make 3 rows



function createTable(arrayStatisticsMembers) {


    var tblbody = document.getElementById("tblBody");

    for (var i = 0; i < arrayStatisticsMembers.length; i++) {
        var tblRows = document.createElement("tr");

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
