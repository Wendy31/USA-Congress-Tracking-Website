var arrayMembers = data.results[0].members;

//...............Least Engaged................//
function getLeastEngagedMembers() {
    var myArray = Array.from(arrayMembers);
    myArray.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    })

    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen);
    console.log(roundedPosition);

    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) {
        arrayFirstEleven.push(myArray[i]);
    }

    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].missed_votes_pct === myArray[i].missed_votes_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    console.log(arrayFirstEleven); // all members 
}
getLeastEngagedMembers();



//...............Most Engaged................//
function getMostEngagedMembers() {

    var myArray = Array.from(arrayMembers);
    myArray.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    })

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
    console.log(arrayFirstEleven);
}
getMostEngagedMembers();
