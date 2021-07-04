  
  const dataArray = new Array();
  let questionNum = 0;
  
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
  
  
  function setContent(dataArray, addNum){
    //console.log(dataArray);
    for(k in dataArray){
      data = dataArray[k]
      //console.log(data);

      if(data.num == addNum){
        $("#title"+data.num).summernote({focus: true, toolbar: false});
        $("#title"+data.num).summernote("code", data.title);
        $("#content"+data.num).summernote({focus: true, toolbar: false});
        //document.getElementById("visible"+data.num).innerHTML = "view";
      }
      else{
        $("#title"+data.num).summernote("code", data.title);
        $("#title"+data.num).summernote('destroy');
        $("#content"+data.num).summernote("code", data.content);
        $("#content"+data.num).summernote('destroy');
        //document.getElementById("visible"+data.num).innerHTML = "edit";
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
