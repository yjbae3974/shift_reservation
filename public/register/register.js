function checkPassword(){
  var pw1 = document.getElementById('password').value;
  var pw2 = document.getElementById('password2').value;
  if(document.getElementById('password').value.length > 0 && document.getElementById('password').value.length < 6){
    document.getElementById("check").textContent = "비밀번호는 6자 이상으로 설정해주세요"   
    document.getElementById('check').style.color='green';
    pwVerified = false;
  }
  else{  
    if(pw1 == pw2){
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
    url: 'https://enter-ef3a8.web.app/register/email_verify.html',
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
    let params = (new URL(document.location)).searchParams;
    var value = params.get("uid");
    window.localStorage.setItem('invitationId', value);
    alert("이메일 전송 성공");
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
  console.log("google 로그인 클릭");
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    //console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.  
    window.location.href = "../";
  } 
  else {
    console.log("google 로그인 시작");
    // No user is signed in.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
}

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

function checkIdExist(collection, uid){
  var db = firebase.firestore();
  var docRef = db.collection(collection).doc(uid);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          return true;
      } else {
          return false;
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
      return false;
  });  
}

function updateInvitation(uid){
  let params = (new URL(document.location)).searchParams;
  var method = params.get("method");
  var value = params.get("uid");
  updateMethod(method);
  if((value != null && value != "") && !checkIdExist('user',uid)){
      var db = firebase.firestore();
      var docRef = db.collection('user').doc(value);
      return db.runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(docRef).then((doc) => {
              if (!doc.exists) {
                  throw "Document does not exist!";
              }
              var invited = doc.data().inviteNum + 1;
              transaction.update(docRef, 
              { inviteNum: invited });
          });
      }).then(() => {
          console.log("invitation success");
      }).catch((error) => {
          console.log("Transaction failed: ", error);
      });
  }
}

function updateMethod(method){
  if((method != null && method != "") && checkIdExist('inviteMethod',method)){
    var db = firebase.firestore();
    var docRef = db.collection('inviteMethod').doc(method);
    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then((doc) => {
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            var invited = doc.data().inviteNum + 1;
            transaction.update(docRef, 
            { inviteNum: invited });
        });
    }).then(() => {
        console.log("invitation method update");
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });
  } 
}
