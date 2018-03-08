function confirm() {
  //alert("enteer confirm");
  document.getElementById("regerror").style.display = 'none';
  document.getElementById("logerror").style.display = 'none';
  var check = true;
    var pass1 = document.getElementById("rpass1").value;
    var pass2 = document.getElementById("rpass2").value;
    if (pass1 !== pass2 || (pass1 == pass2 && pass1.length < 5)) {
      check = false;
       alert("Passwords Do not match _ password is at least 5 characters");
        document.getElementById("rpass1").style.borderColor = "#E34234";
        document.getElementById("rpass2").style.borderColor = "#E34234";
    }
    else {
        //alert("Passwords Match!!!");
    }
    var str=document.getElementById("email").value;
    var firstname = document.getElementById("firstname").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ree = /^[a-zA-Z]+$/;
    if(!re.test(str) || !ree.test(firstname)) {
      check = false;
        //document.getElementById("email").style.borderColor = "#E34234";
        alert("Invalid Email or username");
    }
    else{
              //  alert("valid Email");
    }
    if (check == true) {
      //alert("check==true");
        $.ajax({
            //alert("innnnn");
            url: "http://localhost:8888/add_user",
            type: "GET",
            data: {
              mail1: str,
              name1: firstname,
              password1:pass1
            },
            success: function(res) {
              //alert("try"+res);
              if(res=="true") {
              // alert("try");
                  //alert("Email registered before");
                  document.getElementById("regerror").style.display = 'block';
                  location.href = "http://localhost:8888/#register";
                  //////////////////emptythe fields
              }
              else {
                alert("you have registered");
            location.href = "http://localhost:8888/#login";
              }
            }
        });
    }

}
function log_in() {
  var username1 = document.getElementById("usernamelog").value;
  var password1 = document.getElementById("passwordlog").value;
  //alert("login");
  //alert(username1+password1);

  $.ajax({
        url: "http://localhost:8888/log_in",
        type: "GET",
        data: {
          name: username1,
          password:password1
        },
        success: function(res) {
          //alert("try"+res);
          if(res=="true") {
          //  alert("try");
            location.href = "http://localhost:8888/tasks_page";
          //  alert("yeeeeeeeeeees");
          }
          else {
            document.getElementById("logerror").style.display = 'block';
            location.href = "http://localhost:8888/#login";

            //alert("user not found");
          }
        }
    });

}
