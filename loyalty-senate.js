var arrayMembers = data.results[0].members;

//....................Least Loyal.....................//
function getLeastLoyalMembers() {

    var myArray = Array.from(arrayMembers);

    // 1. Get array of all member objects: arrayMembers[i]
    // 2. sort array of objects by the % for each object
    myArray.sort(function (a, b) { // by default sorts in ascending order. Reverse order of arguement to get decending order. 
        return a.votes_with_party_pct - b.votes_with_party_pct;
    })

    // 3. work out 10% of the total senate number (105)= members.length * 0.10 = 10.50 and math.round
    var pctTen = myArray.length * 0.10;
    var roundedPosition = Math.round(pctTen); // round 10.50 up
    console.log(roundedPosition);


    // 4. Loop thru all 11 members and put them into a new array
    var arrayFirstEleven = [];
    for (var i = 0; i < roundedPosition; i++) { // do 11 loops
        arrayFirstEleven.push(myArray[i]); // and push members 
    }

    // 5. Loop around all members starting from 12th position. If % vote === to last % vote of other array, push number into arrayFirstEleven.
    for (var i = roundedPosition + 1; i < myArray.length; i++) {
        if (arrayFirstEleven[arrayFirstEleven.length - 1].votes_with_party_pct === myArray[i].votes_with_party_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    console.log(arrayFirstEleven); // all members with the highest missed votes %. People who vote the least.
}
getLeastLoyalMembers();



//...................Most Loyal Members.................//
// Find members who vote the most

function getMostLoyalMembers() {

    var myArray = Array.from(arrayMembers);
    // 1. Get array of all member objects: arrayMembers[i]
    // 2. sort array of objects by the % for each object
    myArray.sort(function (a, b) { // by default sorts in ascending order. Reverse order of arguement to get decending order. 
        return b.votes_with_party_pct - a.votes_with_party_pct;
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
        if (arrayFirstEleven[arrayFirstEleven.length - 1].votes_with_party_pct === myArray[i].votes_with_party_pct) {
            arrayFirstEleven.push(myArray[i]);
        }
    }
    console.log(arrayFirstEleven); // all members with the highest missed votes %. People who vote the least.
}
getMostLoyalMembers();

