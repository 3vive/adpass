/*****
Copyright 3Vive Company
*****/
var hostUrl; // = 'http://app.3vive.com:8080' ;
if (location.hostname === "localhost") {
  hostUrl = "http://localhost:8080"
} else {
  hostUrl = "http://app.3vive.com:8080";
}

(function(window) {
  // You can enable the strict mode commenting the following line
  'use strict';

  // This function will contain all our code
  function threeVive() {
    var _threeViveObject = {};

    var cssId = 'myCss';
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://raw.githack.com/3vive/adpass/master/src/main/resources/static/css/threevive.css';
        link.media = 'all';
        head.appendChild(link);
    }


    var currentACBal;
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


    _threeViveObject.checkCookieState = function() {
      //Check if cookie has value if it does pass it to the registerServiceWorker

      //read that cookie and pass it back
      var threeViveCookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)threeViveCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  _threeViveObject.generateButtons();
      if (threeViveCookieValue == 'true') {

        //_threeViveObject.loadAllAdRevenue();
        _threeViveObject.load3ViveModule();
        _threeViveObject.hideArticleContent();

        return true;


      } else if (threeViveCookieValue == 'false') {
        //generate cookie info from parent
        //contentDocument.cookie = "threeViveCookie=Test_CookieRandomStringOfChars";  //this one once it's in the iframe
        document.cookie = "3ViveCookie=true"; // this is we push it from the parent to the iframe

        return false;
      }



    }


    _threeViveObject.generateButtons = function() {
      var inputStyles = "background:none;border-color:#888;border-width:0 0 1px 0;width:100%;color:#fff;padding:5px;margin:5px;",
        btnStyles = "background:#129979;border:none;width:60%;color:#fff;padding:5px;margin:5px;border-radius: 15px;",
        btnStylesInverse = "background:white;border:2px solid #129979;width:60%;color:#129979;padding:5px;margin:5px;border-radius: 15px",
        forgetStyles = "color:#fff;",
        startYears = 10,
        endYears = 70,
        i;
      var buttonDiv = document.createElement('div');
      buttonDiv.id="ViveButtons";
      buttonDiv.style.textAlign = "center";
      buttonDiv.innerHTML = 
        "<div style='border-top:1px solid #129979;border-right: 1px solid #129979;border-left: 1px solid #129979;margin:auto;width:90%;height:23px'><div style='color:#129979;background-color:#fff;width:100px;margin: -14px auto'>ADPASS</div></div>" +
        "<input type='button' onclick='threeVive.scrollTrigger();' value='Login' style='" + btnStyles + "' />" +
        "<input type='button' onclick='threeVive.registerButton();' value='Registration' style='" + btnStyles + "' />" +
        "<input type='button' onclick='threeVive.loadAllAdRevenue();' value='Free with ADs' style='" + btnStylesInverse + "' />" +
        "<div style='border-bottom:1px solid #129979;border-right: 1px solid #129979;border-left: 1px solid #129979;margin:auto;width:90%;height:23px;clear:both;margin-bottom:30px'></div>";
//debugger;
      var whereToAppendButtons = document.getElementsByClassName("paywallButtons")[0];
      whereToAppendButtons.appendChild(buttonDiv);
    }
    _threeViveObject.registerButton = function() {

      // create the elements
      var div = document.createElement('div'),
        centeredDiv = document.createElement('div'),
        registrationForm = document.createElement('form');

      //  registerForm
      // set body styles
    //  document.body.style.color = '#fff';
    //  document.body.style.textTransform = 'capitalize';
      //document.body.style.background = "url('https://cdn.lennar.net/images/com/images/new-homes/3/63/mhi/El%20Dorado%20Hills%20Sunset-1200x540.jpg?w=1200&h=540&as=1 no-repeat";
      //document.body.style.backgroundSize = "cover";





      centeredDiv.style.padding = '10px';
      centeredDiv.style.position = 'fixed';
      centeredDiv.style.zIndex = 999;
      centeredDiv.style.left = 0;
      centeredDiv.style.top = 0;
      centeredDiv.style.width = '100%';
      centeredDiv.style.height = '100%';
      centeredDiv.style.overflow = 'auto';


      div.id = "popUpAdPassDiv";
      // set main-div styles
      div.style.background = "#129979";
      div.style.width = '300px';
      div.style.margin = '30px auto';
      div.style.padding = '10px';
      div.style.borderRadius = '10px';
      div.style.borderTop = "0px #129979 solid";
      div.style.borderBottom = "0px #129979 solid";
      div.style.paddingTop = '20px';
      div.style.textAlign = 'center';
      //  div.style.position = 'fixed';
      div.style.left = 0;
      div.style.top = 0;
      div.style.width = '40%';
      div.style.overflow = 'auto';
      div.style.paddingBottom = '20px';

      div.innerHTML = '<button type="button" id="closeButton" onclick="threeVive.closePopup()" style="background-color:#129979; margin-left:80%;width:8%;"> X</button> <h1 style="text-align: center;color:white;font-family: Helvetica Neue, sans-serif;font-weight: bold;letter-spacing: -1px;font-style: italic; font-size: 28px; padding-bottom:0;margin-top:-32px"><img src="https://image.flaticon.com/icons/svg/74/74474.svg" width="30px" height="30px"> Ad Pass</h1>';

      // hide login form and show register form


      // create some variables for styling
      var inputStyles = "background:#fff;border: 1px solid white;width:90%;color:#fff;padding:5px;margin:5px;",
        btnStyles = "background:#fff;border:none;width:80%;color:#129979;padding:5px;margin:15px 5px 5px 5px;border-radius: 15px",
        forgetStyles = "color:#fff;",
        labelStyles = "color: white; width: 100%;text-align: left;",
        startYears = 10,
        endYears = 70,
        i;



      registrationForm.innerHTML = " <label style='" + labelStyles + "' >username</label><br/>" +
        "<input id='adPassUserNameReg' type='text' required placeholder='type username' style='" + inputStyles + "' /><br/>" + "<label style='" + labelStyles + "'>e-mail</label><br/>" +
        "<input id='adPassEmailName' type='email'required placeholder='your email' style='" + inputStyles + "' /><br/>" +
        "<label style='" + labelStyles + "'>password</label><br/>" +
        "<input id='adPassRegPassword' type='password' required placeholder='*************' style='" + inputStyles + "' /><br/>" +
        "<label style='" + labelStyles + "'>confirm password</label><br/>" +
        "<input id='adPassRegPassword2' type='password'required placeholder='*************' style='" + inputStyles + "' /><br/>" +
        "<input type='button' onclick='threeVive.validateForm();' value='Register' style='" + btnStyles + "' /> </div>";




      //    leftLoginDiv.style.borderRight = "2px #129979 solid";





      div.appendChild(registrationForm);


      centeredDiv.appendChild(div);
      // append main-div on the body
      document.body.appendChild(centeredDiv);
      //  window.removeEventListener("scroll", _threeViveObject.scrollTrigger);



    }

    _threeViveObject.scrollTrigger = function() {


      if (window.scrollY > 200) {


        // create the elements
        var div = document.createElement('div'),
          centeredDiv = document.createElement('div'),
          leftLoginDiv = document.createElement('div'),
          rightLoginDiv = document.createElement('div'),
          loginForm = document.createElement('form'),
          registrationForm = document.createElement('form');

        //  registerForm
        // set body styles
      //  document.body.style.color = '#fff';
        //document.body.style.textTransform = 'capitalize';
        //document.body.style.background = "url('https://cdn.lennar.net/images/com/images/new-homes/3/63/mhi/El%20Dorado%20Hills%20Sunset-1200x540.jpg?w=1200&h=540&as=1 no-repeat";
        //document.body.style.backgroundSize = "cover";





        centeredDiv.style.padding = '10px';
        centeredDiv.style.position = 'fixed';
        centeredDiv.style.zIndex = 999;
        centeredDiv.style.left = 0;
        centeredDiv.style.top = 0;
        centeredDiv.style.width = '100%';
        centeredDiv.style.height = '100%';
        centeredDiv.style.overflow = 'auto';


        div.id = "popUpAdPassDiv";
        // set main-div styles
        div.style.background = "#129979";
        div.style.width = '300px';
        div.style.margin = '30px auto';
        div.style.padding = '10px';
        div.style.borderRadius = '10px';
        div.style.borderTop = "0px #129979 solid";
        div.style.borderBottom = "0px #129979 solid";
        div.style.paddingTop = '20px';
        div.style.textAlign = 'center';
        //  div.style.position = 'fixed';
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = '40%';
        div.style.overflow = 'auto';

        div.innerHTML = '<button type="button" id="closeButton" onclick="threeVive.closePopup()" style="background-color:#129979; margin-left:80%;width:8%;"> X</button> <h1 style="text-align: center;color:white;font-family: Helvetica Neue, sans-serif;font-weight: bold;letter-spacing: -1px;font-style: italic; font-size: 28px; padding-bottom:0;margin-top:-32px"><img src="https://image.flaticon.com/icons/svg/74/74474.svg" width="30px" height="30px"> Ad Pass</h1>';




        // hide login form and show register form


        // create some variables for styling
        var inputStyles = "background:#fff;border: 1px solid white;width:90%;color:#fff;padding:5px;margin:5px;",
        btnStyles = "background:#fff;border:none;width:80%;color:#129979;padding:5px;margin:15px 5px 5px 5px;border-radius: 15px",
        forgetStyles = "color:#fff;",
        labelStyles = "color: white; width: 100%;text-align: left;",
        startYears = 10,
        endYears = 70,
        i;

        // set loginForm styles
        loginForm.style.margin = '0px';
        loginForm.id = 'loginForm';
        //  loginForm.action = "http://app.3vive.com:8080/api/v1/partners";
        // set the elements and styles on the form
        loginForm.innerHTML = "<label style='" + labelStyles + "'>username</label><br/>" +
          "<input id='adPassUserNameLog' type='text' placeholder='type username' style='" + inputStyles + "' /><br/>" +
          "<label style='" + labelStyles + "'>password</label><br/>" +
          "<input id='adPassUsernamePassword' type='password' placeholder='*************' style='" + inputStyles + "' /><br/>" +
          "<input type='button' value='Login'onclick='threeVive.loginUser()'   style='" + btnStyles + "' />" +
          "<p><a style='" + forgetStyles + "' href='#'>forget password ?</a></p><br/>";




        registrationForm.innerHTML = " <label style='" + labelStyles + "' >username</label><br/>" +
          "<input id='adPassUserNameReg' type='text' required placeholder='type username' style='" + inputStyles + "' /><br/>" + "<label style='" + labelStyles + "'>e-mail</label><br/>" +
          "<input id='adPassEmailName' type='email'required placeholder='your email' style='" + inputStyles + "' /><br/>" +
          "<label style='" + labelStyles + "'>password</label><br/>" +
          "<input id='adPassRegPassword' type='password' required placeholder='*************' style='" + inputStyles + "' /><br/>" +
          "<label style='" + labelStyles + "'>confirm password</label><br/>" +
          "<input id='adPassRegPassword2' type='password'required placeholder='*************' style='" + inputStyles + "' /><br/>" +
          "<input type='button' onclick='threeVive.validateForm();' value='Register' style='" + btnStyles + "' /> </div>";



        rightLoginDiv.innerHTML = '<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>';
        // set registerForm styles
        // registerForm.style.margin = '50px 20px 20px 20px';
        // registerForm.style.display = 'none';
        // registerForm.id = 'registerForm';

        // set the elements and styles on the form
        //  registerForm.innerHTML =

        // append the bottons and form on main-div

        leftLoginDiv.style.borderRight = "2px #129979 solid";




        //put real values from the cookie here
        if (true) {
          leftLoginDiv.appendChild(loginForm);
          div.appendChild(leftLoginDiv);
          div.appendChild(rightLoginDiv);
        } else {
          div.appendChild(registrationForm);

        }

        centeredDiv.appendChild(div);
        // append main-div on the body
        document.body.appendChild(centeredDiv);
        window.removeEventListener("scroll", _threeViveObject.scrollTrigger);
      }






    }

    _threeViveObject.scrollUntilPopup = function() {
      window.addEventListener('scroll', _threeViveObject.scrollTrigger)
    }


    _threeViveObject.loadAllAdRevenue = function() {


            var myEleToUnBlur = document.getElementsByClassName('paywallTrunk');
            myEleToUnBlur[0].style.color = null;
            var value = null;
            myEleToUnBlur[0].style.textShadow = value;
            document.getElementById('ViveButtons').style.display = "none";



    };
    _threeViveObject.load3ViveModule = function() {

    };
    _threeViveObject.hideArticleContent = function() {

    };

    _threeViveObject.showReg = function() {

      document.getElementById('hiddenRegTab').style.display = "";
    }

    _threeViveObject.closePopup = function() {
      var element = document.getElementById('popUpAdPassDiv');

      element.parentNode.removeChild(element);
    }
    _threeViveObject.validateForm = function() {

      var usr = document.getElementById('adPassUserNameReg');
      var pwd1 = document.getElementById('adPassRegPassword');
      var pwd2 = document.getElementById('adPassRegPassword2');

      if (usr.value == "") {
        alert("Error: Username cannot be blank!");
        usr.focus();
        return false;
      }
      var re = /^\w+$/;
      if (!re.test(usr.value)) {
        alert("Error: Username must contain only letters, numbers and underscores!");
        usr.focus();
        return false;
      }

      if (pwd1.value != "" && pwd1.value == pwd2.value) {
        if (pwd1.value.length < 6) {
          alert("Error: Password must contain at least six characters!");
          pwd1.focus();
          return false;
        }
        if (pwd1.value == usr.value) {
          alert("Error: Password must be different from Username!");
          pwd1.focus();
          return false;
        }
        re = /[0-9]/;
        if (!re.test(pwd1.value)) {
          alert("Error: password must contain at least one number (0-9)!");
          pwd1.focus();
          return false;
        }
        re = /[a-z]/;
        if (!re.test(pwd1.value)) {
          alert("Error: password must contain at least one lowercase letter (a-z)!");
          pwd1.focus();
          return false;
        }
        re = /[A-Z]/;
        if (!re.test(pwd1.value)) {
          alert("Error: password must contain at least one uppercase letter (A-Z)!");
          pwd1.focus();
          return false;
        }
      }


      _threeViveObject.createNewUser();

      //  alert("You entered a valid password: " + pwd1.value);
      return true;



    }
    //http://18.219.104.16:8081/article-reg
    //Make fetch requests for all users

    _threeViveObject.getUsers = function() {
      fetch(hostUrl + '/api/v1/users').then(function(response) {
        return response.json();
      }).then(function(users) {
        console.log(users);
        _threeViveObject.users = users;
      })
    }

    //Check Partners
    _threeViveObject.createNewUser = function(userName, password, email) {
      //debugger;

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
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          "Access-Control-Allow-Credentials": "true"
        },
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(function(response) {
        return response.json();
      }).then(function(newUser) {
        console.log(newUser);
        debugger;

        if (newUser.enabled = true) {  //account creation is true then send over the account

        alert("Placeholder: Thank you for registering, We've added a complimentary $"  + newUser.userAccount.accountBalance +"to you wallet. Use ADpass dollars on any sites where we are partnered with and enjoy an ad free experience")
        currentACBal = newUser.userAccount.accountBalance;



        var thishtml = '<div id="snackbar">'+ currentACBal + '</div>'
        document.body.appendChild(thishtml);
        var x = document.getElementById("snackbar");

   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);


        }
        else {
          alert("This account name has already been taken, please try again");
        }


        _threeViveObject.newUser = newUser;
      })
    }
    //create a new user
    var thisPartnerName = "NYDN";
    _threeViveObject.getPartnerNames = function(thisPartnerName) {
      fetch(hostUrl + '/api/v1/users/register?partnerName=' + thisPartnerName).then(function(response) {
        return response.json();
      }).then(function(partners) {
        console.log(partners);
        _threeViveObject.partners = partners;
      })
    }

    //Find a user passing username in as the argument
    //  var userName = "al";



    _threeViveObject.loginUser = function() {



      var payload = {};
      payload.username = document.getElementById("adPassUserNameLog").value;
      payload.password = document.getElementById("adPassUsernamePassword").value;



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
        }).then(function(response) {
          alert(response);
          return response.json();
        }).then(
          function(data) {
            console.log(data);
          }
        )
      }




    }

    _threeViveObject.getUserInfo = function(username, password) {
      fetch(hostUrl + '/api/v1/users/' + username).then(function(thisUser) {
        console.log(thisUser);
      })
    }

    _threeViveObject.blurContent = function() {

      var myEleToBlur = document.getElementsByClassName('paywallTrunk');
      myEleToBlur[0].style.color = "transparent";
      var value = '0 0 5px rgba(0,0,0,0.5)';
      myEleToBlur[0].style.textShadow = value;

    }





    // Just create a property to our library object.
    _threeViveObject.Log = function(thingToLog) {
      console.log("Log > Type of variable : " + typeof(thingToLog));
      console.log("Log > Is number : " + !isNaN(thingToLog));
      console.log("Log > Length : " + (thingToLog).length);

      return console.log(thingToLog);
    };

    return _threeViveObject;
  }

  // We need that our library is globally accesible, then we save in the window
  if (typeof(window.threeVive) === 'undefined') {
    window.threeVive = threeVive();
  }


})(window); // We send the window variable withing our function
//threeVive.checkCookieState();

document.addEventListener("load", function(event) {
  console.log("DOM fully loaded and parsed");
});


window.onload = function(){
  threeVive.checkCookieState();
  //threeVive.generateButtons();
  threeVive.blurContent();
}


// Then we can call our custom function using
//threeVive.log(["test1","test2"]);
