function showReadMoreReadLess() {
    /* 
    1. Get ID from HTML to JS
    2. if content is hidden show "read more"
    3. else show "read less"
    */


    var moreText = document.getElementById("more");
    var btnText = document.getElementById("hideshowbtn");
    if (moreText.style.display = "block") {
        btnText.innerHTML = "Read more";
    } else {
        moreText.style.display = "none";
        btnText.innerHTML = "Read less";
    }
}

document.getElementById("hideshowbtn").addEventListener("click", showReadMoreReadLess);
