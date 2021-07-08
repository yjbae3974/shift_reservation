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
var cnt = 0;
function sendMsg(){
  time=document.getElementById('timeLimit');
  if(cnt === 1){
    return;
  }
  time.style.color = '#bd464b';
  time.style.fontSize = '14px';
  time.style.paddingLeft = '10px';
  time.style.marginBottom = '-16px';
  timer(time);
  cnt++;
}
function timer(getid){
  var time = 300;
  var min = "";
  var sec = "";
  var x = setInterval(function(){
    min = parseInt(time/60);
    sec = time%60;
    if(sec.toString().length == 2){
      getid.innerHTML=min+':'+sec;
    }
    else{
      getid.innerHTML=min+':0'+sec;
    }
    time--;
    if(time<0){
      clearInterval(x);
      getid.innerHTML="다시 Send 버튼을 눌러 인증을 완료해주세요."
    }
  },1000);
}