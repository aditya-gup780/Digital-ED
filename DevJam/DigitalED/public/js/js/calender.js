

doc1 = document.getElementById("form1").addEventListener("submit", submitFun1);
doc2 = document.getElementById("game");
var studentDataArr =JSON.parse(localStorage.getItem("studentData"))|| [];
studentDataArr.map(function(item){
    var g = document.createElement("li");
    if (item.stat='present'){
        g.innerHTML = "<li><button type='button' id='1' color='green'>1</button></li>"
    }
    else g.innerHTML = "<li><button type='button' id='1' color='red'>1</button></li>"
}) 