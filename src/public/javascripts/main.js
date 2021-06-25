// hide/show the login dialog
function switchLoginDialog() {
    let loginDialog = document.getElementById("login-dialog");

    if (loginDialog.style.display === "block")
    {
        showButtons();
        loginDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        loginDialog.style.display = "block";
    }
}

// hide/show the signup dialog
function switchSignupDialog() {
    let signupDialog = document.getElementById("signup-dialog");

    if (signupDialog.style.display === "block")
    {
        showButtons();
        signupDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        signupDialog.style.display = "block";
    }
}

// hide/show the checkin dialog
function switchCheckInDialog() {
    let checkInDialog = document.getElementById("checkin-dialog");

    if (checkInDialog.style.display === "block")
    {
        showButtons();
        checkInDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        checkInDialog.style.display = "block";
    }
}

// hide/show the welcome dialog
function switchWelcomeDialog() {
    let welcomeDialog = document.getElementById("welcome-dialog");

    if (welcomeDialog.style.display === "block")
    {
        showButtons();
        welcomeDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        welcomeDialog.style.display = "block";
    }
}

// hide/show the left menu bar
function switchMenu() {
    let menu = document.getElementById("menu");

    if (menu.style.display === "block")
    {
        showSide();
        menu.style.display = "none";
    }
    else
    {
        hideSide();
        menu.style.display = "block";
    }
}

// hide/show the right profile bar
function switchProfile() {
    let profile = document.getElementById("profile");

    if (profile.style.display === "block")
    {
        showSide();
        profile.style.display = "none";
    }
    else
    {
        hideSide();
        profile.style.display = "block";
    }
}

// hide buttons
function hideButtons() {
    let buttons = document.getElementById("buttons");
    buttons.style.display = "none";
}

// show buttons
function showButtons() {
    let buttons = document.getElementById("buttons");
    buttons.style.display = "block";
}

// hide all dialogs
function hideAllDialogs() {
    let dialogs = document.getElementsByClassName("dialog");

    for(let d of dialogs)
    {
        d.style.display = "none";
    }
}

// hide the menu bar and profile bar
function hideAllSidebars() {
    let sidebars = document.getElementsByClassName("sidebar");

    for(let s of sidebars)
    {
        s.style.display = "none";
    }
}

// update user profile tab
function updateUser(username,fullname,email,phone) {
    let navbarLogin = document.getElementById("navbar-login");
    let logoutButton = document.getElementById("logout-button");
    let profileUserInfo = document.getElementById("profile-user-info");
    let profileHistory = document.getElementById("profile-history");

    if(username){
        // user is logged in
        navbarLogin.innerHTML = fullname;
        navbarLogin.setAttribute("onclick","switchProfile()");

        logoutButton.innerHTML = "Logout";
        logoutButton.setAttribute("onclick","logout()");

        profileUserInfo.innerHTML = `<h3>${fullname}</h3>
                                    <p>${username}</p>
                                    <p>${email}</p>
                                    <p>${phone}</p>
                                    <br>
                                    <a onclick="switchEditProfileDialog()">Edit Profile</a>`;
        profileHistory.innerHTML = `<h3>Check-In History</h3>
                                    <a>View All</a>`;

        // fetch check-in info here
        // <h3>Check-In History</h3>

        // <p>14/05/2021 9:41AM</p>
        // <p>The University of Adelaide</p>
        // <br />

        // <p>14/05/2021 12:12PM</p>
        // <p>Hungry Jacks Rundle Mall</p>
        // <br />

        // <p>14/05/2021 4:55PM</p>
        // <p>Coles Rundle Mall</p>
        // <br />

        // <a>View All</a>
    }else{
        // user not logged in
        navbarLogin.innerHTML = "Login";
        navbarLogin.setAttribute("onclick","switchLoginDialog()");

        logoutButton.innerHTML = "Login";
        logoutButton.setAttribute("onclick","switchLoginDialog()");

        profileUserInfo.innerHTML = "<h3>Please Login</h3>";
        profileHistory.innerHTML = "";
    }
}

// normal login
function login() {

    // fetch user info from input
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    // contents of the dialog
    let msg;
    let loginAlert = document.getElementById("login-alert");
    let welcomeButton = document.getElementById("welcome-button");

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            user = JSON.parse(this.responseText);
            msg = "Welcome, " + user.firstName + " " + user.lastName;
            welcomeButton.innerHTML = "OK";
            welcomeButton.setAttribute("onclick","switchWelcomeDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
            updateUser(user.username,user.firstName + " " + user.lastName,user.email,user.phone);
        } else if (this.readyState == 4 && this.status >= 400) {
            msg = "Login failed, please check your credentials";
            welcomeButton.innerHTML = "Retry";
            welcomeButton.setAttribute("onclick","switchLoginDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}

// OAuth with Google
function onSignIn(googleUser) {
    // fetch profile from google
    var profile = googleUser.getBasicProfile();

    // Prepare to send the TOKEN to the server for validation
    var id_token = { token: googleUser.getAuthResponse().id_token };

    // contents of the dialog
    let msg;
    let loginAlert = document.getElementById("login-alert");
    let welcomeButton = document.getElementById("welcome-button");

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            msg = "Welcome, " + profile.getName();
            welcomeButton.innerHTML = "OK";
            welcomeButton.setAttribute("onclick","switchWelcomeDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
            updateUser(profile.getId(),profile.getName(),profile.getEmail(),'');
        } else if (this.readyState == 4 && this.status >= 400) {
            msg = "Login failed, please check your credentials";
            welcomeButton.innerHTML = "Retry";
            welcomeButton.setAttribute("onclick","switchLoginDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
        }
    };

    // Open connection to server & send the token using a POST request
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(id_token));
}

// logout current user
function logout() {
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // contents of the dialog
    let msg;
    let loginAlert = document.getElementById("login-alert");
    let welcomeButton = document.getElementById("welcome-button");

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            msg = "Good Bye";
            welcomeButton.innerHTML = "OK";
            welcomeButton.setAttribute("onclick","switchWelcomeDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
            updateUser('','','','');
        } else if (this.readyState == 4 && this.status >= 400) {
            msg = "Logout failed, please try again";
            welcomeButton.innerHTML = "Retry";
            welcomeButton.setAttribute("onclick","switchWelcomeDialog()");
            loginAlert.innerHTML = msg;
            switchWelcomeDialog();
        }
    };

    // Open connection to server & send the token using a POST request
    xmlhttp.open("POST", "/users/logout", true);
    xmlhttp.send();
}

// signup to a new user
function signup() {
    // do something
}

// check-in using code
function checkin() {
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // fetch check-in code
    let msg = {
        code: document.getElementById("checkin-code").value
    };
    let loginAlert = document.getElementById("login-alert");
    let welcomeButton = document.getElementById("welcome-button");
    let location;

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // update dialog
            location = JSON.parse(this.responseText);
            loginAlert.innerHTML = "Checked in at " + location['name'];
            welcomeButton.innerHTML = "Confirm";
            welcomeButton.setAttribute("onclick","switchWelcomeDialog()");
            switchWelcomeDialog();

            // update hotspot draw
            map.removeLayer(location['code']);
            map.removeSource(location['code']);
            draw(location['code'],location['coor'],location['size'],location['cases']/location['checkins'],
                    `<div class='popup'>
                        <h2>${location['name']}</h2>
                        <h3>Area Code: ${location['code']}</h3>
                        <h3>Confirmed Cases: ${location['cases']}</h3>
                        <h3>Total Check-ins: ${location['checkins']}</h3>
                    </div>`
            );
        } else if (this.readyState == 4 && this.status >= 400) {
            loginAlert.innerHTML = "Invalid Check-in Code";
            welcomeButton.innerHTML = "Retry";
            welcomeButton.setAttribute("onclick","switchCheckInDialog()");
            switchWelcomeDialog();
        }
    };

    // Open connection to server & send the token using a POST request
    xmlhttp.open("POST", "/users/checkin", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(msg));
}

// fetch hotspots from server
function getHotspots() {
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    let hotspots;
    let risk;

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let hotspots = JSON.parse(this.responseText);
            for(let h of hotspots){
                // risk = confirmed cases / total check-ins
                risk = h['cases']/h['checkins'];
                draw(h['code'],h['coor'],h['size'],risk,
                    `<div class='popup'>
                        <h2>${h['name']}</h2>
                        <h3>Area Code: ${h['code']}</h3>
                        <h3>Confirmed Cases: ${h['cases']}</h3>
                        <h3>Total Check-ins: ${h['checkins']}</h3>
                    </div>`
                );
            }
        } else if (this.readyState == 4 && this.status >= 400) {
            return;
        }
    };

    // Open connection to server & send the token using a GET request
    xmlhttp.open("GET", "/users/hotspots", true);
    xmlhttp.send();
}

function switchCheckHistoryDialog() {
    let checkInDialog = document.getElementById("checkin-history-dialog");

    if (checkInDialog.style.display === "block")
    {
        showButtons();
        checkInDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        checkInDialog.style.display = "block";
    }
}

function switchEditProfileDialog() {
    let editDialog = document.getElementById("profile-dialog");

    if (editDialog.style.display === "block")
    {
        showButtons();
        editDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        editDialog.style.display = "block";
    }
}

function switchManagerDialog() {
    let managerDialog = document.getElementById("manager-history");

    if (managerDialog.style.display === "block")
    {
        showButtons();
        managerDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        managerDialog.style.display = "block";
    }
}

// Vue.js object
var app = new Vue({
  el: '#app',
  data: {
  },
  methods: {

  }
});

// mapbox api

mapboxgl.accessToken = 'pk.eyJ1IjoiZm15MDgwMSIsImEiOiJja29qd2NmcGMwM2cxMndscGhiNnl4OW5oIn0.wo5eTQAhvYw3JkdTGeGTYQ';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [138.6007, -34.9285], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

function generateCircleData(point,scale,HTML) {
    var coors = [];
    var rds, x, y;

    //do the math
    for(let i=0; i<64; i++) {
        rds = (i*Math.PI/32);
        x = scale/80*Math.cos(rds);
        y = scale/100*Math.sin(rds);
        coors.push([point[0]+x, point[1]+y]);
    }
    coors.push(coors[0]);

    return {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [coors]
                },
               "properties":{
                 "coordinates":[point],
                 "des":HTML
                }
            }]
        }
    };
}

//parameters:ID(could be any ID)，Position, size(Circle size), risky(Transparency), Description(HTML content showed in the popup)
function draw(id,location,size,risk,HTML){
    map.addSource(id, generateCircleData(location,size,HTML));
    map.addLayer({
     "id": id,
     "type": "fill",
     "source": id,
      "paint": {
         "fill-color": "red",
          "fill-opacity": risk
          }
    });
    map.on('click', id, function (e) {
        var popup = new mapboxgl.Popup({ closeOnClick: true,className: "pop-up-window"})
        .setLngLat(location)
        .setHTML(HTML)
        .addTo(map);
    });
}

// fetch hotspots from server when map finish loading
map.on('load', function() {
    getHotspots();
});

function hideSide(){
    let bottomLeft = document.getElementById("bottom-left");
    let bottomRight = document.getElementById("bottom-right");
    bottomLeft.style.display = "none";
    bottomRight.style.display = "none";
}

function showSide(){
    let bottomLeft = document.getElementById("bottom-left");
    let bottomRight = document.getElementById("bottom-right");
    bottomLeft.style.display = "block";
    bottomRight.style.display = "block";
}

function switchHelpDialog(){
    let checkInDialog = document.getElementById("help-dialog");
    if (checkInDialog.style.display === "block")
    {
        showButtons();
        checkInDialog.style.display = "none";
    }
    else
    {
        hideButtons();
        hideAllDialogs();
        checkInDialog.style.display = "block";
    }
}