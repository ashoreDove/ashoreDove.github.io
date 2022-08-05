/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
// 当前选中的页数
let current = 1;
$(function () {
    //初始化
    $.getJSON("../page.json", function (data) {
        // info=JSON.stringify(data);
        // console.log(info);
        /*这边先默认采用recipe的东西 */
        sum = data.Recipe.length;
        // console.log(sum);
        var str = "";
        if (current == 1) {
            str += "<li><a href='#' class='button disabled'>Prev</a></li>";
        }
        // }else{
        //     str+="<li><a href='"+data.Recipe[current]+"' class='button'>Prev</a></li>";
        // }
        for (var i = 1; i <= sum; i++) {
            if (sum <= 4 || current < 4) {
                if (i == current) {
                    // str+="<li><a href='"+data.Recipe[i-1]+"' class='page active'>"+i+"</a></li>";
                    str += "<li><a href='#' class='page active'>" + i + "</a></li>";
                } else {
                    // str+="<li><a href='"+data.Recipe[i-1]+"' class='page'>"+i+"</a></li>";
                    str += "<li><a href='#' class='page'>" + i + "</a></li>";
                }
                if (i >= 4) {
                    break;
                }
            }
        }
        if (sum > 4) {
            str += "<li><span>&hellip;</span></li>";
            // str+="<li><a href='"+data.Recipe[sum-1]+"' class='page'>"+sum+"</a></li>";
            str += "<li><a href='#' class='page'>" + sum + "</a></li>";
        }
        if (current == sum) {
            str += "<li><a href='#' class='button  disabledm '>Next</a></li>";
        } else {
            str += "<li><a href='" + data.Recipe[current] + "' class='button'>Next</a></li>";
        }
        document.getElementById("pagination").innerHTML = str;
        console.log(str);
    })


})

//page按钮点击事件
$(function () {
    $("ul#pagination").on("click", "li", function () {
        text = $(this).text();
        if (text == "…") {
            return;
        }
        if (text != "Prev" && text != "Next") {
            to_cur = parseInt(text);
            if (to_cur < 4) {
                //只改变page active
                $(this).children("a")[0].className += " active";
                active_li = $(this).parent().children()[current];
                active_li.firstChild.className = "page";
                current = to_cur;
            }
            //各种情况
        } else {

        }
    });
})
