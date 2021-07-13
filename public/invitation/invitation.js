$(document).ready(function(){
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyA0E-3mY4_qBgV7RfxEdzcU4B7xjJ74e-c",
      authDomain: "enter-ef3a8.firebaseapp.com",
      databaseURL: "https://enter-ef3a8-default-rtdb.firebaseio.com",
      projectId: "enter-ef3a8",
      storageBucket: "enter-ef3a8.appspot.com",
      messagingSenderId: "505540008688",
      appId: "1:505540008688:web:d3d89e4a7ac7ba57178035",
      measurementId: "G-88XNV769FN"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $("#navbar").load('../navbar/afterlogin.html');
        console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.
        document.getElementById("userEmail").innerHTML = user.email;
        var emailSplit = user.email.split('@');
        document.getElementById("userId").innerHTML = emailSplit[0];
        document.getElementById("userId2").innerHTML = emailSplit[0];
        getUserData(getUserSnapshot());

        document.getElementById("invitationLink").value = "https://enter-ef3a8.web.app/register/register.html?uid="+user.uid;
        document.getElementById("invitationLink").disabled = true;
      } else {
        $("#navbar").load('../navbar/beforelogin.html');
        window.location.href='../login/login.htnl';
        // No user is signed in.
      }
    });
  });
  $(window).load(function(){
    $('#친구초대').addClass('active');
  });
  /*
  sdfd
  sdfd
  sdf
  */