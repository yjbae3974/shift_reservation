function edit(num){
    if(document.getElementById("visible"+num).innerHTML == "edit"){
      $('#title'+num).summernote({focus: true, toolbar: false});
      $('#content'+num).summernote({focus: true, toolbar: false});
      $('.article2edit'+num).css('min-height : 100px');
      document.getElementById("visible"+num).innerHTML = "view"
    }
    else{
      $('#title'+num).summernote('destroy');
      $('#content'+num).summernote('destroy');
      document.getElementById("visible"+num).innerHTML = "edit"
    }
  };
  
  function myTitle(num){
    return $('#title'+num).summernote('code');
  }
  
  function myContent(num){
    return $('#content'+num).summernote('code');
  }
  
  function submitQuestion(title, num, content){
    $('#title'+num).summernote('destroy');
    $('#content'+num).summernote('destroy');
    if(confirm(title+" 을 저장하시겠습니까?")){
      var db = firebase.firestore()
      var docRef = db.collection("question").doc(num);
      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("exist");
              updateQuestion(title, num, content);
          } 
          else {
              console.log("don't exist");
              saveQuestion(title, num, content);
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
  }
  
  function deleteQuestion(title, num){
      $('#title'+num).summernote('destroy');
      $('#content'+num).summernote('destroy');
      if(confirm(title+" 을 삭제하시겠습니까?")){
          var db = firebase.firestore();
          var docRef = db.collection("question").doc(num);
        
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
  
  function saveQuestion(title, num, content){
      
      var db = firebase.firestore();
      db.collection("question").doc(num).set({
        num : num,
        title : title,
        content : content,
      })
      .then(function(docRef) {
      alert("저장되었습니다");
      window.location.href = pageName;
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      }); 
  }
  
  function updateQuestion(title, num, content){
      var db = firebase.firestore();
      var docRef = db.collection("question").doc(num);
      return db.runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(docRef).then((doc) => {
              if (!doc.exists) {
                  throw "Document does not exist!";
              }
              transaction.update(docRef, 
              { title : title,
              content : content,});
          });
      }).then(() => {
          alert("저장되었습니다");
          window.location.href = pageName;
      }).catch((error) => {
          console.log("Transaction failed: ", error);
      });
  }
  
  
  function getQuestionSnapshot(){
    let ref, snapshot; 
      // 데이터 불러오기
      var db = firebase.firestore();
      
      ref = db.collection('question'); 
      snapshot = ref.get();
  
      if (snapshot.empty) { // 검색된 데이터가 없는 경우
          console.log(`Fail to load question data.`);
          return;
      }
      console.log(`Success to load question data.`);
      return snapshot;
  }
  
  
  const dataArray = new Array();
  let questionNum = 0;
  
  function getQuestionData(Snapshots){
    Snapshots.then((snapshot) => {
      snapshot.forEach((doc) => {
  
        var temp = new Object();
        temp.title = doc.get("title");
        temp.content = doc.get("content");
        temp.num = doc.get("num");
        //console.log(temp);
        dataArray.push(temp);
  
        makeQuestionTable(dataArray);   
        setContent(dataArray);   
      });
    });
  }
  
  function addQuestion(){
    var temp = new Object();
    var num = questionNum;
    temp.title = "자주하는 질문 "+(num+1);
    temp.content = "";
    temp.num = num+1;
    console.log(temp);
    dataArray.push(temp);
    makeQuestionTable(dataArray);  
    setContent(dataArray, num+1);
  }
  
  function setContent(dataArray, addNum){
    //console.log(dataArray);
    for(k in dataArray){
      data = dataArray[k]
      console.log(data);

      if(data.num == addNum){
        $("#title"+data.num).summernote({focus: true, toolbar: false});
        $("#title"+data.num).summernote("code", data.title);
        $("#content"+data.num).summernote({focus: true, toolbar: false});
        document.getElementById("visible"+data.num).innerHTML = "view";
      }
      else{
        $("#title"+data.num).summernote("code", data.title);
        $("#title"+data.num).summernote('destroy');
        $("#content"+data.num).summernote("code", data.content);
        $("#content"+data.num).summernote('destroy');
        document.getElementById("visible"+data.num).innerHTML = "edit";
      }
    }
  }
  
  function makeQuestionTable(dataArray){
    //console.log("questiontable",dataArray);
    dataArray.sort(compNum);
  
    var l = dataArray[dataArray.length - 1];
    questionNum = l.num*1;
  
    const data = new Object();
    data.contents = dataArray;
    //$("#question-placeholder").html(questionTemplate(data));
    $(function() {
      var accordion = {
        init: function() {
          this.appendContent('#question-template', data,'#question-placeholder');
          this.cacheOnLoad();
          this.bindEvents();
        },
        cacheOnLoad: function(){
          this.$title = $('.accordion-title', '#question-placeholder');
        },
        appendContent: function(source, context, target) {
          var source   = $(source).html();
          var template = Handlebars.compile(source);
          var context = context;
          $(target).html(template(context));
        },
        bindEvents: function() {
          this.$title.on('click', this.toggleAccordion);
        },
        toggleAccordion: function(){
            $(this).next().slideToggle();
            $(this).toggleClass('active');
        }
  
      }
      accordion.init();
    });
  }
  
  function compNum(a,b){
    return a.num - b.num;
  }
