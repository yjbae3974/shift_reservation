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
