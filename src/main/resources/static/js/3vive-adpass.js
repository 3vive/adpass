/*****
 Copyright 3Vive Company
 *****/

(function (window) {
    // You can enable the strict mode commenting the following line
    'use strict';

    alert("here")

    // This function will contain all our code
    function threeVive() {
        var _threeViveObject = {};
        var hostUrl = 'http://app.3vive.com:8080';
        if (location.hostname === "localhost") {
            hostUrl = "http://localhost:8080"
        }
        else {
            hostUrl = "http://app.3vive.com:8080";
        }

        alert(hostUrl)
        //Generate the iframe in parent window
        // var iframe = document.createElement('iframe');
        // var html = '<body><div id="testerFrame"> Test </div></body>';
        // iframe.src = 'http://app.3vive.com:8080';
        // document.body.appendChild(iframe);
        // console.log('iframe.contentWindow =', iframe.contentWindow);


        //read that cookie and pass it back
        var threeViveCookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)threeViveCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");


        //Communicate through iframe using postmessage
        // var myObj = {
        //   test: "test",
        //   parentCookieInfo: threeViveCookieValue
        // };
        // Window.parent.postmessage(myObj, document.getElementById("testerFrame"));


        _threeViveObject.checkCookieState = function () {
            //Check if cookie has value if it does pass it to the registerServiceWorker

            //read that cookie and pass it back
            var threeViveCookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)3ViveCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");


            if (threeViveCookieValue == true) {

                _threeViveObject.loadAllAdRevenue();
                _threeViveObject.load3ViveModule();
                _threeViveObject.hideArticleContent();


            } else if (threeViveCookieValue == false) {

                //generate cookie info from parent
                //contentDocument.cookie = "threeViveCookie=Test_CookieRandomStringOfChars";  //this one once it's in the iframe
                document.cookie = "3ViveCookie=true"; // this is we push it from the parent to the iframe
                _threeViveObject.generateButtons();
            }


        }


        _threeViveObject.generateButtons = function () {


            var inputStyles = "background:none;border-color:#888;border-width:0 0 1px 0;width:100%;color:#fff;padding:5px;margin:5px;",
                btnStyles = "background:#32CD32;border:none;width:100%;color:#fff;padding:5px;margin:5px;border-radius: 15px",
                forgetStyles = "color:#fff;",
                startYears = 10,
                endYears = 70,
                i;
            var buttonDiv = document.createElement('div');
            buttonDiv.innerHTML = "<input type='button' onclick='threeVive.loadAllAdRevenue();' value='Continue With Ads' style='" + btnStyles + "' />" +
                "<input type='button' onclick='threeVive.scrollTrigger();' value='Register with Adpass' style='" + btnStyles + "' />";

            var whereToAppendButtons = document.getElementsByClassName("entry-content")[0];
            whereToAppendButtons.appendChild(buttonDiv);
        }

        _threeViveObject.scrollTrigger = function () {


            //if (window.scrollY > 200) {


            // create the elements
            var div = document.createElement('div'),
                centeredDiv = document.createElement('div'),
                loginForm = document.createElement('form');
            //  registerForm
            // set body styles
            document.body.style.color = '#fff';
            document.body.style.textTransform = 'capitalize';
            //document.body.style.background = "url('https://cdn.lennar.net/images/com/images/new-homes/3/63/mhi/El%20Dorado%20Hills%20Sunset-1200x540.jpg?w=1200&h=540&as=1 no-repeat";
            document.body.style.backgroundSize = "cover";


            centeredDiv.style.padding = '10px';
            centeredDiv.style.position = 'fixed';
            centeredDiv.style.zIndex = 999;
            centeredDiv.style.left = 0;
            centeredDiv.style.top = 0;
            centeredDiv.style.width = '100%';
            centeredDiv.style.height = '100%';
            centeredDiv.style.overflow = 'auto';

            // set main-div styles
            div.style.background = "rgba(0,0,0,0.5)";
            div.style.width = '300px';
            div.style.margin = '30px auto';
            div.style.padding = '10px';
            div.style.borderRadius = '10px';
            div.style.paddingTop = '100px';
            //  div.style.position = 'fixed';
            div.style.left = 0;
            div.style.top = 0;
            div.style.width = '400px';
            div.style.height = '600px';
            div.style.overflow = 'auto';

            div.innerHTML = '<h1 style="text-align: center;color: lawngreen;font-family: "Helvetica Neue", sans-serif;font-weight: bold;letter-spacing: -1px;">ADPASS</h1>';


            // hide login form and show register form


            // create some variables for styling
            var inputStyles = "background:none;border-color:#888;border-width:0 0 1px 0;width:100%;color:#fff;padding:5px;margin:5px;",
                btnStyles = "background:#32CD32;border:none;width:100%;color:#fff;padding:5px;margin:5px;border-radius: 15px",
                forgetStyles = "color:#fff;",
                startYears = 10,
                endYears = 70,
                i;

            // set loginForm styles
            loginForm.style.margin = '50px 20px 20px 20px';
            loginForm.id = 'loginForm';
            //  loginForm.action = "http://app.3vive.com:8080/api/v1/partners";
            // set the elements and styles on the form
            loginForm.innerHTML = "<label>username</label><br/>" +
                "<input id='adPassUserNameLog' type='text' placeholder='type username' style='" + inputStyles + "' /><br/>" +
                "<label>password</label><br/>" +
                "<input id='adPassUsernamePassword' type='password' placeholder='*************' style='" + inputStyles + "' /><br/>" +
                "<input type='button' value='Login'onclick='threeVive.loginUser()'   style='" + btnStyles + "' />" +
                "<p><a style='" + forgetStyles + "' href='#'>forget password ?</a></p><br/>" +

                "<label>username</label><br/>" +
                "<input id='adPassUserNameReg' type='text' placeholder='type username' style='" + inputStyles + "' /><br/>" + "<label>e-mail</label><br/>" +
                "<input id='adPassEmailName' type='email' placeholder='your email' style='" + inputStyles + "' /><br/>" +
                "<label>password</label><br/>" +
                "<input id='adPassRegPassword' type='password' placeholder='*************' style='" + inputStyles + "' /><br/>" +
                "<label>confirm password</label><br/>" +
                "<input type='password' placeholder='*************' style='" + inputStyles + "' /><br/>" +
                "<input type='button' onclick='threeVive.createNewUser();' value='Register' style='" + btnStyles + "' />";

            // set registerForm styles
            // registerForm.style.margin = '50px 20px 20px 20px';
            // registerForm.style.display = 'none';
            // registerForm.id = 'registerForm';

            // set the elements and styles on the form
            //  registerForm.innerHTML =

            // append the bottons and form on main-div

            div.appendChild(loginForm);

            centeredDiv.appendChild(div);
            // append main-div on the body
            document.body.appendChild(centeredDiv);
            window.removeEventListener("scroll", _threeViveObject.scrollTrigger);
            // }


        }

        _threeViveObject.scrollUntilPopup = function () {
            window.addEventListener('scroll', _threeViveObject.scrollTrigger)
        }


        _threeViveObject.loadAllAdRevenue = function () {

        };
        _threeViveObject.load3ViveModule = function () {

        };
        _threeViveObject.hideArticleContent = function () {

        };


        //http://18.219.104.16:8081/article-reg
        //Make fetch requests for all users

        _threeViveObject.getUsers = function () {
            fetch(hostUrl + '/api/v1/users').then(function (response) {
                return response.json();
            }).then(function (users) {
                console.log(users);
                _threeViveObject.users = users;
            })
        }

        //Check Partners
        _threeViveObject.createNewUser = function (userName, password, email) {
            //debugger;
            alert("createNewUser user")
            var payload = {};
            payload.username = document.getElementById("adPassUserNameReg").value;
            payload.password = document.getElementById("adPassRegPassword").value;
            payload.email = document.getElementById("adPassEmailName").value;

            //JSON.stringify(payload);
            console.log(payload);
            //  var data = new FormData();
            //data.append("json",JSON.stringify(payload); )

            console.log(payload);
            fetch(hostUrl + '/api/v1/users/register', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

                },
                method: 'POST',
                body: JSON.stringify(payload)
            }).then(function (response) {
                return response.json();
            }).then(function (newUser) {
                console.log(newUser);
                debugger;
                _threeViveObject.newUser = newUser;
            })
        }
        //create a new user
        var thisPartnerName = "NYDN";
        _threeViveObject.getPartnerNames = function (thisPartnerName) {
            fetch(hostUrl + '/api/v1/users/register?partnerName=' + thisPartnerName).then(function (response) {
                return response.json();
            }).then(function (partners) {
                console.log(partners);
                _threeViveObject.partners = partners;
            })
        }

        //Find a user passing username in as the argument
        //  var userName = "al";


        _threeViveObject.loginUser = function () {


            var payload = {};
            payload.username = document.getElementById("adPassUserNameLog").value;
            payload.password = document.getElementById("adPassUsernamePassword").value;

            alert("Logging user")

            if ((payload.username != null || payload.username != "") && (payload.password != null || payload.password != "")) {
                var api = hostUrl + '/api/v1/users/user/' + payload.username;

                fetch(api, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(payload.username + ":" + payload.password),

                    },
                    credentials: "include",
                    method: 'GET'
                }).then(function (response) {
                    alert(response);
                    return response.json();
                }).then(
                    function (data) {
                        console.log(data);
                    }
                )
            }


        }

        _threeViveObject.getUserInfo = function (username, password) {
            alert("getUserInfo");
            var myheaders = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            var url = hostUrl + '/api/v1/users/user/' + username;
            alert(url);
            fetch(url, myheaders).then(function (thisUser) {
                alert(thisUser.json())
                console.log("Logging the user" + thisUser);
            });


        }

        // Just create a property to our library object.
        _threeViveObject.Log = function (thingToLog) {
            console.log("Log > Type of variable : " + typeof(thingToLog));
            console.log("Log > Is number : " + !isNaN(thingToLog));
            console.log("Log > Length : " + (thingToLog).length);

            return console.log(thingToLog.toJSON());
        };

        return _threeViveObject;
    }

    // We need that our library is globally accesible, then we save in the window
    if (typeof(window.threeVive) === 'undefined') {
        window.threeVive = threeVive();
    }


})(window); // We send the window variable withing our function
//threeVive.checkCookieState();
document.addEventListener("DOMContentLoaded", function (event) {
    threeVive.generateButtons();
});

// Then we can call our custom function using
//threeVive.log(["test1","test2"]);