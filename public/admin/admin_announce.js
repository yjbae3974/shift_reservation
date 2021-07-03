let collectionName = "announce";
let pageName = "admin.html";
const contentNum = 4;
let currentPage = 1;
let maxPage = 1;


function setViewOptions(admin, number, question, collection, page){
    adminTemplate = admin;
    numberTemplate = number;
    questionTemplate = question;
    collectionName = collection;
    pateName = page;
}

function autosave(){
    collectionName = "autosave";
    pageName = "autosave.html";
    submit(collectionName, pageName);
}

function prevPage(checkData){
    if(currentPage > 1 && currentPage <= maxPage+1){
        currentPage = currentPage-1;
        getAdminData(getAnnounceSnapshot(), checkData, currentPage);
    }
}

function nextPage(checkData){
    if(currentPage > 0 && currentPage <= maxPage){
        currentPage = currentPage+1;
        getAdminData(getAnnounceSnapshot(), checkData, currentPage);
    }
}


function firstPage(checkData){
    if(currentPage > 1 && currentPage <= maxPage+1){
        currentPage = 1;
        getAdminData(getAnnounceSnapshot(), checkData, currentPage);
    }
}

function lastPage(checkData){
    //console.log(maxPage);
    if(currentPage > 0 && currentPage <= maxPage){
        currentPage = maxPage;
        getAdminData(getAnnounceSnapshot(), checkData, currentPage);
    }
}


function getAnnounceSnapshot(){
    let ref, snapshot; 
    // 데이터 불러오기
    var db = firebase.firestore();
    
    ref = db.collection(collectionName); 
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
        //console.log(temp);
        dataArray.push(temp);
        makeAdminTable(dataArray, num);
    }
    });
});
}

function makeAdminTable(dataArray, num){
    //console.log("admintable",dataArray);

    var adminArray = dataArray;
    adminArray.sort(compTime);
    //console.log("sort",adminArray);

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
  maxPage = parseInt(n);

  const numberArray = new Array();
  for(i=1; i<=n; i++){
    var temp = new Object();
    temp.num = i;
    if(i==curr){
        temp.active = true;
        currentPage = i;
    } 
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
    if(confirm(title+" 을 삭제하시겠습니까?")){
        var db = firebase.firestore();
        var docRef = db.collection(collectionName).doc(title);
      
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
            window.location.href = pageName;
        }).catch((error) => {
            console.log("Transaction failed: ", error);
        });
    }
}

function changeTitle(title, type, content, value){
    saveContent(title, type, content);  

    var db = firebase.firestore();
    var docRef = db.collection(collectionName).doc(value);

    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then((doc) => {
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            transaction.delete(doc.ref);
        });
    }).then(() => {
        alert("저장되었습니다");
        window.location.href = pageName;
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });
}

function back(){
  window.history.back();
}

//const dict = {"공지":1, "업데이트":2, "이벤트":3, "개발현황":4, "버그수정":5};
function getSelection(type){
    var options= document.getElementById("post-type").options;
    var n= options.length;
    for (var i= 0; i<n; i++) {
        if (options[i].value===type) {
            return i;
        }
}
}

function getContent(title){
    var db = firebase.firestore();
    var docRef = db.collection(collectionName).doc(title);
    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            document.getElementById('title').value = doc.get("title");
            document.getElementById("post-type").selectedIndex = getSelection(doc.get("type"));
            var content = doc.get("content");
            $("#summernote").summernote("code", content);
        } else {
            alert("글이 존재하지 않습니다.");
            window.location.href = pageName;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function saveDoc(title, type, content){
    var db = firebase.firestore();
    const value = decodeURI(window.location.search).substr(1);  

    if(value == null || value == ""){
        var docRef = db.collection(collectionName).doc(title);
        docRef.get().then((doc) => {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                alert("같은 제목이 존재합니다");
            } 
            else {
                // doc.data() will be undefined in this case
                saveContent(title, type, content);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });        
    }
    else{
        var docRef = db.collection(collectionName).doc(value);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if(value == title){
                    updateContent(title, type, content);  
                }
                else{
                if(confirm("제목을 "+title+" 로 변경하시겠습니까?")){
                    changeTitle(title, type, content, value);  
                }
                }
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}


function submit(collection, page){
    if(collection!=null || collection!="") collectionName = collection;
    if(page!=null || page!="") pageName = page;
    var s = document.getElementById("post-type");
    var type = s.options[s.selectedIndex].value;
    
    var title = document.getElementById('title').value.trim();
    var content = $('#summernote').summernote('code');

    if(type=="" || type==null){
    alert("분류를 선택해주세요");
    }
    else if(title=="" || title==null){
    alert("제목을 입력해주세요");
    }
    else{
    saveDoc(title, type, content); //check title and save
    }
}

function saveContent(title, type, content){
    var db = firebase.firestore();
    db.collection(collectionName).doc(title).set({
    type : type,
    title : title,
    content : content,
    created : firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
    alert("저장되었습니다");
    window.location.href = pageName;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }); 
}

function updateContent(title, type, content){
    var db = firebase.firestore();
    var docRef = db.collection(collectionName).doc(title);
    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then((doc) => {
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            transaction.update(docRef, 
            { type : type,
            content : content,
            created : firebase.firestore.FieldValue.serverTimestamp() });
        });
    }).then(() => {
        alert("저장되었습니다");
        window.location.href = pageName;
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });
}

function getAllCheck(){
    let check ={ "공지": true, "업데이트": true, "이벤트": true, "개발현황": true, "버그수정": true };
    return check;
}

function getAutosaveData(Snapshots, num){
  getAdminData(getAnnounceSnapshot(), getAllCheck(), currentPage);
}