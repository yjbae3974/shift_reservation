let change = document.getElementById('whereContentChanges');
let mobile = document.getElementById('mobileChanges');
function changeContent(content){
    if(content === 'main'){
        change.innerHTML=`
        <div class="sign-up text-center">
                    <div class="sign-up-title">
                      Sign in
                    </div>
                    <input type="email" class="form-control form-rounded mct-5" placeholder="Your email" style="padding: 10px 20px;">
                    <input type="password" class="form-control form-rounded mct-2" placeholder="Your Password" style="padding: 10px 20px;">
                    <div class="d-flex mct-3" style="margin-bottom: 17.6px;">
                        <label class="checkbox-container mx-3 text-start">아이디 저장
                            <input type="checkbox" checked="checked">
                            <span class="checkmark"></span>
                          </label>
                          <label class="checkbox-container text-start">자동로그인
                            <input type="checkbox" checked="checked">
                            <span class="checkmark"></span>
                          </label>
                    </div>
                   
                    <button type="submit" class="btn-rounded text-white text-center" style="
                    font-size: 18px;width: 100%;background-color: #17375E;padding: 12px;">Sign in</button>
                    <div class="separator mt-3">or</div>
                    <button type="submit" class="btn-rounded text-white text-center mt-3" style="
                    font-size: 18px;width: 100%;background-color: #1da1f2;padding: 12px;">Login via Google</button>
                    <button id="register" type="submit" class="btn-rounded text-white text-center mct-1" style="
                    font-size: 18px;width: 100%;background-color: #fae100;padding: 12px;">Login via Kakao</button>
                    <div class="d-flex mt-3 justify-content-center" style="font-size: 18px;">
                      <div style="color: #bfbfbf;">Don't have an Account?</div>
                      <a class="ms-2" style="color: #59dbe0;" href="../register/register.html">Sign up</a>
                    </div>
                    <div class="text-center mt-1" style="font-size: 14px;color: #bd064b;font-weight: 700;">
                      
                      <div class="pointer" onclick="changeContent('password')">Forgot Password?</div>
                    </div>
                  </div>
        `;
        mobile.innerHTML=`
        <div class="sign-up-title text-center" style="color: #fff;padding-top: 50px;">Sign in</div>
      <div>
        <input type="email" class="form-control form-rounded mct-5 form-mobile" placeholder="Your email" style="padding: 10px 20px;">
        <input type="password" class="form-control form-rounded mct-2 form-mobile" placeholder="Your Password" style="padding: 10px 20px;">
        <div class="d-flex mct-3" style="margin-bottom: 17.6px;">
            <label class="checkbox-container mx-3 text-start">아이디 저장
                <input type="checkbox" checked="checked">
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container text-start">자동로그인
                <input type="checkbox" checked="checked">
                <span class="checkmark"></span>
              </label>
        </div>
       
        <button type="submit" class="btn-rounded text-white text-center" style="
        font-size: 18px;width: 100%;background-color: #17375E;padding: 12px;">Sign in</button>
        <div class="separator mt-3" style="color: #fff;">or</div>
        <button type="submit" class="btn-rounded text-white text-center mt-3" style="
        font-size: 18px;width: 100%;background-color: #1da1f2;padding: 12px;">Login via <span style="font-weight: 700;">Google</span></button>
        <button id="register" type="submit" class="btn-rounded text-white text-center mct-1" style="
        font-size: 18px;width: 100%;background-color: #fae100;padding: 12px;">Login via <span style="font-weight: 700;">Kakao</span></button>
        <div class="d-flex mt-3 justify-content-center" style="font-size: 18px;">
          <div style="color: #bfbfbf;">Don't have an Account?</div>
          <a class="ms-2" style="color: #59dbe0;" href="../register/register.html">Sign up</a>
        </div>
        <div class="text-center mt-1" style="font-size: 14px;color: #bd064b;font-weight: 700;">
          
          <div class="pointer pb-5" onclick="changeContent('password')">Forgot Password?</div>
        </div>
      </div>
        `
    }
    else if(content === 'password'){
        change.innerHTML=`
        <div class="sign-up text-center">
                    <div class="sign-up-title">
                      Search PW
                    </div>
                    <div style="position: relative;">
                      <input type="email" class="form-control form-rounded mct-5" placeholder="Your email" style="padding: 10px 20px;">
                      <div class="btn btn-form" onclick="sendMsg()">Send</div><!--여기서 인증 이메일 보냄-->
                    </div>
                    <div id="timeLimit"class="text-start mt-1"></div>
                    <input type="" class="form-control form-rounded mct-2" placeholder="Certification Number" style="padding: 10px 20px;">
                    
                   
                    <button type="submit" class="btn-rounded text-white text-center mt-3" style="
                    font-size: 18px;width: 100%;background-color: #17375E;padding: 12px;">Find your PW</button>
                    <div class="separator mt-3">&</div>
                    <p class="text-start" style="font-size: 18px;color: #000">Your PW is...</p>
                    <div class="pwbox">dfd</div><!--위에 버튼 누르면 여기서 비밀번호 생성-->
                    <div class="text-center" style="font-size:24px;color: #17375e;">Enjoy Your Service!</div>
                    <div class="d-flex mt-3 justify-content-center" style="font-size: 18px;">
                      <div style="color: #bfbfbf;">Do you have an Account?</div>
                      <div class="ms-2" style="color: #59dbe0;cursor: pointer;" onclick="changeContent('main')">Sign in</div>
                    </div>
                    <div class="text-center mt-1" style="font-size: 14px;color: #bd064b;font-weight: 700;">
                      
                    </div>
                  </div>
        `;
        mobile.innerHTML=`
        <div class="sign-up-title text-center" style="color: #fff;padding-top: 50px;">Search PW</div>
      <div>
        <div style="position: relative;">
          <input type="email" class="form-control form-rounded mct-5 form-mobile" placeholder="Your email" style="padding: 10px 20px;">
          <div class="btn btn-form" onclick="sendMsg()">Send</div><!--여기서 인증 이메일 보냄-->
        </div>
        <div id="timeLimit"class="text-start mt-1"></div>
        <input type="password" class="form-control form-rounded mct-2 form-mobile" placeholder="Your Password" style="padding: 10px 20px;">
        <button type="submit" class="btn-rounded text-white text-center mct-1" style="
        font-size: 18px;width: 100%;background-color: #17375E;padding: 12px;">Find your PW</button>
        <div class="separator mt-3" style="color: #fff;">&</div>
        <p class="text-start" style="font-size: 18px;color: #fff">Your PW is...</p>
        <div class="pwbox" style="color: #fff;">dfd</div><!--위에 버튼 누르면 여기서 비밀번호 생성-->
        <div class="text-center" style="font-size:24px;color: #71a3ce;">Enjoy Your Service!</div>
        <div class="d-flex mt-3 justify-content-center" style="font-size: 18px;">
          <div style="color: #bfbfbf;">Do you have an Account?</div>
          <div class="ms-2" style="color: #59dbe0;cursor: pointer;" onclick="changeContent('main')">Sign in</div>
        </div>
        
      </div>
        `
    }
  }
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

function updateInvitation(){
  let params = (new URL(document.location)).searchParams;
  var method = params.get("method");
  var value = params.get("uid");
  updateMethod(method);
  if(value != null && value != ""){
    value = window.localStorage.getItem('invitationId');
  }
  console.log("초대시작: "+value);
  if(value != null && value != ""){
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
              window.localStorage.removeItem('invitationId');
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
