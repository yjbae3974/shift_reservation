let change = document.getElementById('whereContentChanges');

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
                      <div class="pointer" onclick="">Forgot ID</div>
                      <div class="pointer" onclick="">Forgot Password?</div>
                    </div>
                  </div>
        `
    }
    else if(contenr === 'id'){
        
    }
}