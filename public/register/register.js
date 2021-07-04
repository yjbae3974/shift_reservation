function checkPassword(){
    if(document.getElementById('password').value.length > 0 && document.getElementById('password').value.length < 6){
      pwVerified = false;
    }
    else{  
      if(document.getElementById('password').value == document.getElementById('password').value){
        document.getElementById("check").textContent = "비밀번호가 일치합니다"
        document.getElementById('check').style.color='blue';
        pwVerified = true;
      }
      else{
        document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다'
        document.getElementById('check').style.color='red';
        pwVerified = false;
      }
    }
    return pwVerified;
  }

  function signUp(){
    if(checkPassword()){
      var email = document.getElementById('userEmail').value;
      var password = document.getElementById('password').value;
      if(!email || !password){
        alert("회원가입 정보를 적어주세요");
      }
      else{
        signUpEmail();
      }
    }
  }

  function signUpEmail(){
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://enter-ef3a8.web.app/register/email_verify.html',
      // This must be true.
      handleCodeInApp: true
    };

    var email = document.getElementById('userEmail').value;
    var password = document.getElementById('password').value;
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('setPassword', password);
      alert("이메일 전송 성공! 이메일을 확인해주세요");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);
      // ...
    });
  }

  function googleLogin(){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      alert("로그인 완료");
      //console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.  
      window.location.href = "../";
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
            //alert(response.id+", "+response.kakao_account.email);
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

  function newUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        var db = firebase.firestore();
        var user1 = firebase.auth().currentUser;
        db.collection("user").doc(user1.uid).set({
            email: email,
            signupMethod: "kakao",
        })
        .then(function(docRef) {
            alert("저장되었습니다");
            sendTo();
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });       
    })
    .catch((error) => {
      alert("회원가입 에러 "+error.code+"\n"+error.message);
    });
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

  function sendTo() {
    //kakaoLogin();
    Kakao.Auth.login({
      scope: 'TALK_MESSAGE',
      success: function() {
        Kakao.API.request({
          url: '/v2/api/talk/memo/default/send',
          data: {
            template_object: {
              object_type: 'feed',
              content: {
                title: '회원가입이 완료되었습니다',
                description: '',
                image_url:
                  'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                  mobile_web_url: 'https://enter-ef3a8.web.app/',
                  web_url: 'https://enter-ef3a8.web.app/',
                },
              },
              social: {
                like_count: 286,
                comment_count: 45,
                shared_count: 845,
              },
              buttons: [
                {
                  title: '웹으로 보기',
                  link: {
                    mobile_web_url: 'https://enter-ef3a8.web.app/',
                    web_url: 'https://enter-ef3a8.web.app/',
                  },
                },
              ],
            },
          },
          success: function(res) {
            //alert('success: ' + JSON.stringify(res))
            window.location.href = "../";
          },
          fail: function(err) {
            alert('error: ' + JSON.stringify(err))
          },
        })
      },
      fail: function(err) {
        alert('failed to login: ' + JSON.stringify(err))
      },
    })
  }