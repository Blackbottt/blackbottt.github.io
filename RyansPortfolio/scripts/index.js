const navbar = document.getElementById("navbar");     //get navbar
const explore = document.getElementById('popup');      //get popup calling button
const popupBox = document.getElementById('popup-box');      //get popup dialog box
const popupClose = document.getElementById('popup-close');     //get popup dialogue box close button
const scrollLeft = document.getElementById("left");      //scroll left button
const scrollRight = document.getElementById("right");       //scroll right button
// const page = document.getElementById("landing-page");     //get page
// const portfolio = document.getElementById("portfolio");     //get portfolio
// const about = document.getElementById("about");     //get about
// const contacts = document.getElementById("contacts");     //get navbar
const submit = document.getElementById("submit");       //login form submit button
const github = document.getElementById("profile-link1");        //github profile link
const codepen = document.getElementById("profile-link2");       //codepen link
const phone = document.getElementById("profile-link3");     //phone number
const call = document.getElementById("call");
const fcc = document.getElementById("profile-link4");       //freecodecamp profile link
let activelink = "HOME";     //sets active navbar link

// 1. When scrolling nav active label should change
// 3.if page is about scroll positions should be at the top
// 4.form should submit client request
// 5.implement node for client-server side features

//addEvent functions deal with cross browser compatibility issues that come with IE 5-8
function addEvent (el, event, callback) {
    if (el.addEventListener) {     //if eventListener works
        el.addEventListener(event, callback, false);    //Use it
    } else{    //otherwise
        // Note the DOM node el has a method name added which should be unique to it [e + event + callback], then a 2nd method with its own unique method name [event + callback], this could lead to long event names but they save the purpose
        el['e' + event + callback] = callback;     //Make callback a method of el
        el[ event + callback ] = function() {   //Add 2nd method
            el['e' + event + callback](window.event);     //Use it to call prev func
        };
        el.attachEvent('on' + event, el[event + callback])      //Use attachevent() to call the 2nd func, which then calls the first one
    }
}

addEvent(navbar, 'click', function(e) {
    // This function changes active nav link based on clicked navbar link
    let clicked = e.target;     //get clicked element
    activelink = clicked.innerText;     //set active navbar link
    if (clicked.tagName.toLowerCase() === "navbar") return;     //if user clicks on navbar but no specific link do nothing
    // remove all active navbar links on click by looping thru each a tag and each a tag's span tag
    navbar.childNodes.forEach(a => {
        if(a.nodeName !== "#text") {        //skip text nodes in IE
            a.classList.remove("active");       //remove active class from a tag
            a.childNodes.forEach(span => {
                if(span.nodeName !== "#text") {         //skip text nodes in IE
                    span.classList.remove("active");        //remove active class from span tag
                }
            });
        };   
    });
    var children = navbar.childNodes;       //get a tags from navbar
    if (clicked.tagName.toLowerCase() === "span") {     //check if span
        clicked.classList.add("active");        //add active class to span tag
        clicked.parentNode.classList.add("active");     //add active class to a tag
    } else if(clicked.tagName.toLowerCase() === "a") {      //if a tag
        clicked.classList.add("active");        //add active class to a tag
    }
});

// display popup dialog box
addEvent(explore, 'click', function(e) {
    popupBox.className = "popup-shown"; 
});
// close popup dialog box
addEvent(popupClose, 'click', function(e) {
    popupBox.className = "popup"; 
});
// get popup option page
addEvent(popupBox, 'click', function(e) {
    popupBox.className = "popup"; 
    let clicked = e.target;     //get scroll a tag
    let parent, id;     
    // REMOVE ACTIVE CLASS FROM ALL 4 NAVBAR LINKS
    navbar.childNodes[1].classList.remove('active');
    navbar.childNodes[3].classList.remove('active');
    navbar.childNodes[5].classList.remove('active');
    navbar.childNodes[7].classList.remove('active');
    if(clicked.nodeName !== "A") {       //if mouse clicks the img then get parent a tag 
        parent = clicked.parentNode;        //if img get a tag
        var ids = parent.href.split("#");       //split href string to get our id
    }   else {
        var ids = clicked.href.split("#");      //split href string to get our id
    }   
    id = ids[1];        //select id text
    // MATCH ID TEXT TO NAVBAR HEADER LINKS
    if(id.toUpperCase() == "PORTFOLIO"){        
        navbar.childNodes[3].classList.add('active');       //ADD ACTIVE CLASS
        activelink = "PORTFOLIO";
    } else if(id.toUpperCase() == "ABOUT"){
        navbar.childNodes[5].classList.add('active');       //ADD ACTIVE CLASS
        activelink = "ABOUT";
    } else {
        navbar.childNodes[7].classList.add('active');       //ADD ACTIVE CLASS
        activelink = "CONTACT";
    } 
});

addEvent(scrollLeft, 'click', function(e) {
    let clicked = e.target;     //get scroll a tag
    let parent;     
    if(clicked.nodeName !== "A") { parent = clicked.parentNode; }       //if mouse clicks the icon then get parent a tag
    if(activelink == "PORTFOLIO"){
        clicked.href = "#landing-page";
        activelink = "HOME";
        navbar.childNodes[3].classList.remove('active');
        navbar.childNodes[1].classList.add('active');
    }
    else if(activelink == "ABOUT"){
        clicked.href = "#portfolio";
        activelink = "PORTFOLIO";
        navbar.childNodes[5].classList.remove('active');
        navbar.childNodes[3].classList.add('active');
    }
    else if(activelink == "CONTACT"){
        clicked.href = "#about";
        activelink = "ABOUT";
        navbar.childNodes[7].classList.remove('active');
        navbar.childNodes[5].classList.add('active');
    }
    else {}
});

addEvent(scrollRight, 'click', function(e) {
    let clicked = e.target;        //get scroll a tag
    let parent;
    if(clicked.nodeName !== "A") { parent = clicked.parentNode; }       //if mouse clicks the icon then get parent a tag
    if(activelink == "HOME"){
        clicked.href = "#portfolio";
        activelink = "PORTFOLIO";
        navbar.childNodes[1].classList.remove('active');
        navbar.childNodes[3].classList.add('active');
    }
    else if(activelink == "PORTFOLIO"){
        clicked.href = "#about";
        activelink = "ABOUT";
        navbar.childNodes[3].classList.remove('active');
        navbar.childNodes[5].classList.add('active');
    }
    else if(activelink == "ABOUT"){
        clicked.href = "#contacts";
        activelink = "CONTACT";
        navbar.childNodes[5].classList.remove('active');
        navbar.childNodes[7].classList.add('active');
    }
    else {}
});

addEvent(phone, 'click', function(e){
    e.preventDefault();
    call.className = "call-on";
});

addEvent(call, 'click', function(e){
    call.className = "call-off";
});

// function activelink(idx){
//     var nodes = navbar.childNodes;
//     // console.log(nodes);
//     for(let i = 0; i < nodes.length; i++){
//         if(nodes[i].nodeName == "#text") continue;
//         if(nodes[i].classList.length == 4){
//             nodes[i].classList.remove("active");      //remove active class
//         }
//     }
//     // console.log("55", nodes[idx].nodeValue == "     ");
//     if(nodes[idx].nodeValue !== "A"){
//         return nodes[idx].classList.add("active");
//     }
// }

// function myFunction() {
//     var pageId = page.getBoundingClientRect();
//     console.log("rect...", pageId)
//     var portfolioId = portfolio.getBoundingClientRect(); 
//     console.log("rect...", portfolioId)
//     var aboutId = about.getBoundingClientRect(); 
//     console.log("rect...", aboutId)
//     var contactsId = contacts.getBoundingClientRect(); 
//     console.log("rect...", contactsId)

//     console.log("window", window)

//     var isVisiblePage = (pageId.top >= 0) && (pageId.bottom <= window.innerHeight || pageId.bottom - 100 <= window.innerHeight || pageId.bottom + 100 <= window.innerHeight);
//     console.log("visible?1", pageId.top);
//     console.log("visible?2", pageId.bottom);
//     console.log("visible?3", window.innerHeight);
//     console.log("visible?3", "(pageId.top >= 0) && (pageId.bottom <= window.innerHeight || pageId.bottom - 100 <= window.innerHeight || pageId.bottom + 100 <= window.innerHeight)");
//     console.log("visible?", isVisiblePage);
//     var isVisiblePortfolio = (portfolioId.top >= 0) && (portfolioId.bottom <= window.innerHeight || portfolioId.bottom - 100 <= window.innerHeight || portfolioId.bottom + 100 <= window.innerHeight );
//     console.log("visible?", isVisiblePortfolio);
//     var isVisibleAbout = (aboutId.top >= 0) && (aboutId.bottom <= window.innerHeight || aboutId.bottom - 100 <= window.innerHeight || aboutId.bottom + 100 <= window.innerHeight);
//     console.log("visible?", isVisibleAbout);
//     var isVisibleContacts = (contactsId.top >= 0) && (contactsId.bottom <= window.innerHeight || contactsId.bottom - 100 <= window.innerHeight || contactsId.bottom + 100 <= window.innerHeight);
//     console.log("visible?", isVisibleContacts);
//         // console.log('linkIdx');

//     if(isVisiblePage) {
//         linkIdx = 1;
//         // console.log(linkIdx);
//         activelink(linkIdx);
//     }
//     if(isVisiblePortfolio) {
//         linkIdx = 3;
//         // console.log(linkIdx);
//         activelink(linkIdx);
//     }
//     if(isVisibleAbout) {
//         linkIdx = 5;
//         // console.log(linkIdx);
//         activelink(linkIdx);
//     }
//     if(isVisibleContacts) {
//         linkIdx = 7;
//         // console.log(linkIdx);
//         activelink(linkIdx);
//     }
// }    

// window.addEventListener("scroll", myFunction());
