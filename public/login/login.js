function changePage(pageName){
    window.location.href = pageName+'.html';
}

function pwLogin(){
    var email = document.getElementById('userEmail').value;
    var password = document.getElementById('userPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      alert("로그인 성공");
      // Signed in
      // ...
    })
    .catch((error) => {
      alert("아이디와 비밀번호를 확인해 주세요.");
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  function googleLogin(){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      alert("로그인 완료");
      //console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.  
      window.location.href = "register_complete.html";
    } 
    else {
      // No user is signed in.
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }

  firebase.auth().getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    var db = firebase.firestore();
    db.collection("user").doc(user.uid).set({
        email: user.email,
        signupMethod: "google",
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert(error.code+" / "+error.message);
    });
    alert("google 로그인 완료"+user.email);
    
  }).catch((error) => {
    // Handle Errors here.
  });

  function logout() {
    firebase.auth().signOut().then(function() {
      console.log("logout success");
      window.location.href = "../login/login.html";
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error.code, error.message);
    });
  }


  Kakao.init('8fa8eca2742004d4fa3b93aaf4b736e3'); //발급받은 키 중 javascript키를 사용해준다.
  console.log(Kakao.isInitialized()); // sdk초기화여부판단
  //카카오로그인
  function kakaoLogin() {
    if(!Kakao.isInitialized()){
      Kakao.init('8fa8eca2742004d4fa3b93aaf4b736e3'); //발급받은 키 중 javascript키를 사용해준다.
      console.log(Kakao.isInitialized()); // sdk초기화여부판단
    }
    Kakao.Auth.login({
      scope: "account_email",
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            console.log(response)
            alert(response.id+", "+response.kakao_account.email);
            if(response.kakao_account.email != undefined){
              firebase.auth().signInWithEmailAndPassword(response.kakao_account.email, String(response.id))
              .then((userCredential) => {
                  window.location.href = "../";
              })
              .catch((error) => {
                if(error.code == "auth/user-not-found"){
                  newUser(response.kakao_account.email, String(response.id));
                }
                else{
                  console.log(error.code+"\n"+error.message);
                  alert("로그인 에러 "+error.code+"\n"+error.message);
                }
              });
            }
          },
          fail: function (error) {
            alert("이메일 제공에 동의해주세요:)");
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }
  
  //카카오로그아웃  
  function kakaoLogout() {
    if(!Kakao.isInitialized()){
      Kakao.init('8fa8eca2742004d4fa3b93aaf4b736e3'); //발급받은 키 중 javascript키를 사용해준다.
      console.log(Kakao.isInitialized()); // sdk초기화여부판단
    }
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response)
        },
        fail: function (error) {
          console.log(error)
        },
      })
      Kakao.Auth.setAccessToken(undefined)
    }
  }