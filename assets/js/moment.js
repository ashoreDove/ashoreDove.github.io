/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
let fs = require('fs');
let msg_box = [];
$(function () {
    //config.log(AV);
    //读取
    msg_box = JSON.parse(localStorage.getItem("msg_box"));
    // const query = new AV.Query('message_box');

    console.log(msg_box);
    if (msg_box != null) {
        str="";
        for (var i = 0; i < msg_box.length; i++) {
            str += "<div class='msg'><h4>";
            str += msg_box[i]['time'] + "</h4><div class='box'>" + msg_box[i]['msg'] + "</div></div>";
        }
        console.log(str);
        document.getElementById("msg_wall").innerHTML = str;
    }
    //保存
    window.addEventListener("beforeunload",function(){
        if(msg_box==null){
            return;
        }
        localStorage.setItem("msg_box", JSON.stringify(msg_box));
        fs.writeFileSync('msg.json',JSON.stringify(msg_box));
    })

    document.getElementById("send").onclick = function () {
        if ($("#demo-message").val() == "") {
            return;
        }
        str = "<div class='msg'><h4>";
        var d = new Date();
        var hour= (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours());
        var minute = (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes());
        var time = hour + ":" + minute + " " + d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        str += time + "</h4><div class='box'>" + $("#demo-message").val() + "</div></div>";
        document.getElementById("msg_wall").innerHTML += str;
        // console.log(str);
        if(msg_box==null){
            msg_box=[{ "time": time, "msg": $("#demo-message").val() }];
        }else{
            msg_box.push({ "time": time, "msg": $("#demo-message").val() });
        }
        $("#demo-message").val("");
    }
    document.getElementById("reset").onclick = function () {
        $("#demo-message").val("");;
    }
})