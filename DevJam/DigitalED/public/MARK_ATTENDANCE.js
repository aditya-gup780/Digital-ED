document = document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr =JSON.parse(localStorage.getItem("studentData"))|| [];
function submitFun1(e) {
    document.querySelector("#tbody").innerHTML = "";
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;
    // var city = document.querySelector("#city").value;
    // var rollNo = document.querySelector("#rollNo").value;

    var studentObj = {
        name: name,
        number: number,
        stat: stat
        // city: city,
        // rollNo: rollNo
    }

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr)
}

function displayFun(studentDataArr) {

    var count = 1;
    studentDataArr.map(function (item) {
    
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td3 = document.createElement("td");
        td3.innerHTML = item.number;
        var td4 = document.createElement("td");
        var btn1 = document.createElement("button");
        btn1.innerHTML = item.stat;
        btn1.innerHTML = "P";
        btn1.addEventListener("click", function () {
            td4.innerHTML = "<button id='present' name='stat' value='present'>Present</button>";
        });
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";
        btn2.addEventListener("click", function () {
            td4.innerHTML = "<button id='absent' name='stat' value='absent'>Absent</button>";
        
        });
        td4.classList.add("td6");
        td4.append(btn1, btn2);

        tr.append(td1, td2, td3, td4);

        document.querySelector("#tbody").append(tr);

    });


}
displayFun(studentDataArr);