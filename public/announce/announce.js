// Initialize and add the map
function initMap() {
    // The location of your company 37.580569, 127.028574
    const location = { lat: 37.580569, lng: 127.028574 };
    // The map, centered at selected location
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: location,
    });
    // The marker, positioned at location
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
 function changeLocation(text){
  location.href = text;
 }
const mobileWidth = '(max-width: 768px)';
const mediaQuery = window.matchMedia(mobileWidth);
const divtable = document.getElementById('tablediv');
  if(mediaQuery.matches){
    console.log('now the width is smaller than 768');
    document.getElementById('pagination').style.padding = '0px 24px';
    document.getElementById('mainContainer').style.marginTop = '28px';
    divtable.innerHTML = `
    <div style="padding: 0px 24px;">
                <div class="list-title">
                  [업데이트]
                </div>
                <div class="list-content hr-link">
                  7.21업데이트 현황, 새로운 캐릭터 추가, 각종 가챠아이템 구비 완료 들어와라 소비자들아
                </div>
                <hr>
              </div>
              <div style="padding: 0px 24px;">
                <div class="list-title">
                  [업데이트]
                </div>
                <div class="list-content hr-link">
                  7.21업데이트 현황, 새로운 캐릭터 추가, 각종 가챠아이템 구비 완료 들어와라 소비자들아
                </div>
                <hr>
              </div>
              <div style="padding: 0px 24px;">
                <div class="list-title">
                  [업데이트]
                </div>
                <div class="list-content hr-link">
                  7.21업데이트 현황, 새로운 캐릭터 추가, 각종 가챠아이템 구비 완료 들어와라 소비자들아
                </div>
                <hr>
              </div>
              <div style="padding: 0px 24px;">
                <div class="list-title">
                  [업데이트]
                </div>
                <div class="list-content hr-link">
                  7.21업데이트 현황, 새로운 캐릭터 추가, 각종 가챠아이템 구비 완료 들어와라 소비자들아
                </div>
                <hr>
              </div>
    `
  }
  else{
    console.log('now the width is larger than 768');
    document.getElementById('mainContainer').style.marginTop = '100px';
    divtable.innerHTML=`
    <div class="table-responsive">
                <!--Table-->
                <table class="table table-hover">
        
                  <!--Table head-->
                  <thead class="bg-gray">
                    <tr>
                      <th>분류</th>
                      <th>제목</th>
                      <th>날짜</th>
                      
                    </tr>
                  </thead>
                  <!--Table head-->
        
                  <!--Table body-->
                  <tbody>
                    <tr>
                      <th scope="row">[업데이트]</th>
                      <td class="hr-link">7.21 업데이트 현황. 새로운 캐릭터 추가. 각종 수정 및 버그 개선</td>
                      <td>2021.05.19 </td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[업데이트]</th>
                      <td>휴대폰 알뜰폰결제 SK7mobile(SK텔링크) 결제 서비스 추가 안내</td>
                      <td>2021.03.16</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[공지]</th>
                      <td>고객 간담회를 준비하고 있습니다. </td>
                      <td>2021.03.11</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[공지]</th>
                      <td>적절하지 못한 용어 사용으로 불쾌감을 드려 죄송합니다.</td>
                      <td>2021.03.09</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[공지]</th>
                      <td>환골탈태의 각오로 고객님들의 신뢰회복에 전심전력을 다하겠습니다.</td>
                      <td>2021.03.05</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[개발현황]</th>
                      <td>큐브의 잠재능력 재설정 로직과 세부 확률 공개</td>
                      <td>2021.03.05</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[버그수정]</th>
                      <td>아이템에 부여될 수 있는 모든 종류의 추가옵션이 동일한 확률로 부여되도록 수정됩니다. </td>
                      <td>2021.02.18</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[업데이트]</th>
                      <td>ver 1.3.344 클라이언트 패치(3:00 ~ 10:00)</td>
                      <td>2021.02.13</td>
                      
                    </tr>
                    
                    
                    <tr>
                      <th scope="row">[이벤트]</th>
                      <td>헤파이스토스에 도전하라!</td>
                      <td>2021.01.01</td>
                      
                    </tr>
                    <tr>
                      <th scope="row">[업데이트]</th>
                      <td>패스파인더의 최종데미지 증가 버프 삭제</td>
                      <td>2020.12.01</td>
                      
                    </tr>
                  </tbody>
                  <!--Table body-->
        
        
                </table>
                <!--Table-->
              </div>
    `
  }
