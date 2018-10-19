var arrayMembers = data.results[0].members;

//............Least Loyal Members...............//
function getLeastLoyalMembers() {

    var myArray = Array.from(arrayMembers);

    myArray.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    })

    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen);
    console.log(roundedPosition);

    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) {
        arrayFirstEleven.push(myArray[i]);
    }

    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].votes_with_party_pct === myArray[i].votes_with_party_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    console.log(arrayFirstEleven);
}
getLeastLoyalMembers();



//...........Most Loyal Members...........//


function getMostLoyalMembers() {

    var myArray = Array.from(arrayMembers);

    myArray.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    })

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
    console.log(arrayFirstEleven);
}
getMostLoyalMembers();
