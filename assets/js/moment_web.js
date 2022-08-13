(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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
        var str="";
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
        //tnnd为什么不写
        // fs.writeFile('../msg.json',JSON.stringify(msg_box),function(err) {
        //     console.log(err);
        //     if (!err) {
        //         console.log("写入成功");
        //     }
        // });
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
        
        fs.writeFile('../msg.json',JSON.stringify(msg_box),function(err) {
            console.log(err);
            if (!err) {
                console.log("写入成功");
            }
        });
        $("#demo-message").val("");
    }
    document.getElementById("reset").onclick = function () {
        $("#demo-message").val("");;
    }
})
},{"fs":1}]},{},[2]);
