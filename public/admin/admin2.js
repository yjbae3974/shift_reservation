function getAnnounceSnapshot(){
    let ref, snapshot; 
    // 데이터 불러오기
    var db = firebase.firestore();
    
    ref = db.collection("announce"); 
    snapshot = ref.get();

    if (snapshot.empty) { // 검색된 데이터가 없는 경우
        console.log(`Fail to load announce data.`);
        return;
    }
    console.log(`Success to load announce data.`);
    return snapshot;
}

function getCheckData(){
    let check ={ "공지": false, "업데이트": false, "이벤트": false, "개발현황": false, "버그수정": false };

    if(document.getElementById('announce').checked){
      check["공지"] = true;
    }
    if(document.getElementById('update').checked){
      check["업데이트"] = true;
    }
    if(document.getElementById('event').checked){
      check["이벤트"] = true;
    }
    if(document.getElementById('develop').checked){
      check["개발현황"] = true;
    }
    if(document.getElementById('debug').checked){
      check["버그수정"] = true;
    }
    return check;
}

function getAdminData(Snapshots, check, num){

  const dataArray = new Array();

  Snapshots.then((snapshot) => {
    snapshot.forEach((doc) => {
        var type = doc.get("type");
        
        if(check[type]){
            var temp = new Object();
            temp.type = type;
            temp.title = doc.get("title");
            temp.created = getFormattedDate(doc.get("created").toDate());
            temp.createdComp = doc.get("created")
            temp.content = doc.get("content");
            console.log(temp);
            dataArray.push(temp);

            makeAdminTable(dataArray, num);
        }
      });
      console.log(dataArray);
    });
}

function makeAdminTable(dataArray, num){
    console.log("admintable",dataArray);

    var adminArray = dataArray;
    adminArray.sort(compTime);
    console.log("sort",adminArray);

    if(dataArray.length > contentNum){
      adminArray = dataArray.slice((num-1)*contentNum, num*contentNum);
    }

    const data = new Object();
    data.contents = adminArray;
    $("#content-placeholder").html(adminTemplate(data));

    const data2 = new Object();
    data2.contents = numberArray(dataArray.length, num);
    $("#number-placeholder").html(numberTemplate(data2));
}


function numberArray(num, curr){
  var n = num/contentNum;
  if(num%contentNum != 0) n = n + 1;
  
  const numberArray = new Array();
  for(i=1; i<=n; i++){
    var temp = new Object();
    temp.num = i;
    if(i==curr) temp.active = true;
    numberArray.push(temp);
  }
  return numberArray;
}

function compTime(a,b){
  return b.createdComp - a.createdComp;
}

function getFormattedDate(d){
  var days = ['일','월','화','수','목','금','토'];

  var date = new Date(d)
  var yyyy = date.getFullYear()
  var mm = String(date.getMonth() + 1).padStart(2, '0')
  var dd = String(date.getDate()).padStart(2, '0')
  var day = "("+ days[date.getDay()] +")"
  var hh = String(date.getHours()).padStart(2, '0')
  var MM = String(date.getMinutes()).padStart(2, '0')
  
  var formatted_date = yyyy + "-" + mm + "-" + dd + day + " " + hh + ":" + MM;
  return formatted_date;
}

function deleteDoc(title){
  var db = firebase.firestore();
  var docRef = db.collection("announce").doc(title);

  return db.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(docRef).then((doc) => {
          if (!doc.exists) {
              throw "Document does not exist!";
          }
          transaction.delete(doc.ref);
      });
  }).then(() => {
      alert("삭제되었습니다");
      window.location.href = "admin.html";
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });
}

function back(){
  window.history.back();
}