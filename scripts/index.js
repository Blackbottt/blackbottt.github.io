const navbar = document.getElementById("navbar");     //get navbar
const explore = document.getElementById('popup');      //get popup calling button
const popupBox = document.getElementById('popup-box');      //get popup dialog box
const popupClose = document.getElementById('popup-close');     //get popup dialogue box close button
const scrollLeft = document.getElementById("left");      //scroll left button
const scrollRight = document.getElementById("right");       //scroll right button
const submit = document.getElementById("submit");       //login form submit button
const github = document.getElementById("profile-link1");        //github profile link
const codepen = document.getElementById("profile-link2");       //codepen link
const phone = document.getElementById("profile-link3");     //phone number
const call = document.getElementById("call");
const fcc = document.getElementById("profile-link4");       //freecodecamp profile link
let activelink = "HOME";     //sets active navbar link

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
        el.attachEvent('on' + event, el[event + callback]);      //Use attachevent() to call the 2nd func, which then calls the first one
    }
}

addEvent(window, 'load', function(e){
    id = e.target.location.hash.slice(1,);
    activelink = id.toUpperCase();
    if(activelink == "PORTFOLIO") return navbar.childNodes[3].classList.add('active');
    else if(activelink == "ABOUT") return navbar.childNodes[5].classList.add('active');
    else if(activelink == "CONTACTS") return navbar.childNodes[7].classList.add('active');
    else return navbar.childNodes[1].classList.add('active');
});

addEvent(navbar, 'click', function(e) {
    // This function changes active nav link based on clicked navbar link
    let clicked = e.target;     //get clicked element
    activelink = clicked.innerText;     //set active navbar link
    if (clicked.tagName.toLowerCase() === "navbar") return;     //if user clicks on navbar but no specific link do nothing
    // remove all active navbar links on click by looping thru each a tag and each a tag's span tag
    navbar.childNodes.forEach(a => {
        if(a.nodeName !== "#text") {        //skip text nodes in IE
            a.childNodes.forEach(span => {
                if(span.nodeName !== "#text") {         //skip text nodes in IE
                    span.classList.remove("active");        //remove active class from span tag
                }
            });
        };   
    });
    remover();
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
    navbar.childNodes[1].classList.add('active');
    activelink = "HOME";
});
// get popup option page
addEvent(popupBox, 'click', function(e) {
    popupBox.className = "popup"; 
    let clicked = e.target;     //get scroll a tag
    let parent, id, ids;     
    // REMOVE ACTIVE CLASS FROM ALL 4 NAVBAR LINKS
    remover();
    if(clicked.nodeName !== "A" && clicked.nodeName != "svg" && clicked.nodeName != "path") {       //if mouse clicks the img then get parent a tag 
        parent = clicked.parentNode;        //if img get a tag
        ids = parent.href.split("#");       //split href string to get our id
    }   else if(clicked.nodeName !== "A"){
        ids = clicked.href.split("#");      //split href string to get our id
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

function remover(){
    navbar.childNodes[1].classList.remove('active');
    navbar.childNodes[3].classList.remove('active');
    navbar.childNodes[5].classList.remove('active');
    navbar.childNodes[7].classList.remove('active');
}
addEvent(window, "scroll", function myFunction(e) {
    var pageId = page.getBoundingClientRect();
    var portfolioId = portfolio.getBoundingClientRect(); 
    var aboutId = about.getBoundingClientRect(); 
    var contactsId = contacts.getBoundingClientRect(); 
    var isVisiblePage = (0 >= pageId.y) && (pageId.y > -500); 
    if(isVisiblePage) {
        remover();
        navbar.childNodes[1].classList.add('active');
    }
    var isVisiblePortfolio = (276 >= portfolioId.y); 
    if(isVisiblePortfolio) {
        remover();
        navbar.childNodes[3].classList.add('active');
    }
    var isVisibleAbout = (228 >= aboutId.y) ; 
    if(isVisibleAbout) {
        remover();
        navbar.childNodes[5].classList.add('active');
    }
    var isVisibleContacts = (99 >= contactsId.y); 
    if(isVisibleContacts) {
        remover();
        navbar.childNodes[7].classList.add('active');
    }
});
