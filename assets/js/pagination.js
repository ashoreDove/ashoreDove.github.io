/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
// 当前选中的页数
let current = 0;
let page=[];
$(function () {
    //初始化
    //console.log(sort);
    $.getJSON("../page.json", function (data) {
        page=data[sort];
        console.log(page);
        for(var i=0;i<page.length;i++){
            if(page[i]==fileName){
                current=i+1;
            }
        }
        
        dealPagination(current,true,);
        
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
            $(this).children("a")[0].className += " active";
            //不改变ul格式的情况
            dealPagination(to_cur,false,this);
            current = to_cur;
            
        } else {
            if(text=="Prev"){
                if(current==1){
                    return;
                }
                to_cur=current-1;
            }else if(text == "Next"){
                if(current==page.length){
                    return;
                }
                //这里传递的不是this
                to_cur=current+1;
            }
            //这里传递的不是this
            //page==5跑不了orz
            //先这样吧
            if(page.length<=4||to_cur<4){
                active_li = $(this).parent().children()[to_cur];
            }else{
                active_li = $(this).parent().children()[6-(page.length-to_cur)];
            }
            // console.log(active_li.firstChild);
            active_li.firstChild.className += " active";
            dealPagination(to_cur,false,active_li);
            current=to_cur;
        }
    });
})

//page==5跑不了orz
//先这样吧
function dealPagination(to_cur,is_first,dom_obj){
    console.log(current+" "+to_cur);
    if(current==to_cur&&!is_first){
        return;
    }
    last_num=page.length;
    if(!is_first&&(last_num<=4||(current<4&&to_cur<4)||(last_num-current<=2&&last_num-to_cur<=2))){
        //只改变page active
        //active_li已经激活的li，需要取消掉
        if(last_num<=4||to_cur<4){
            active_li = $(dom_obj).parent().children()[current];
        }else{
             active_li = $(dom_obj).parent().children()[6-(last_num-current)];
        }
        console.log(active_li.firstChild);
        active_li.firstChild.className = "page";
        if(to_cur!=1){
            $(dom_obj).parent().children()[0].firstChild.className="button";
        }else{
            $(dom_obj).parent().children()[0].firstChild.className+=" disabled";
        }
        var end=last_num>=5?7:last_num+1;
        if(to_cur==last_num){
            $(dom_obj).parent().children()[end].firstChild.className+=" disabled";
        }else{
            $(dom_obj).parent().children()[end].firstChild.className="button";
        }
    }else{
        //重新绘制ul了
        str="";
        if (to_cur == 1) {
            str += "<li><a href='#' class='button disabled'>Prev</a></li>";
        }else{
            str += "<li><a href='"+page[to_cur-2]+"' class='button'>Prev</a></li>";
        }
        if(to_cur<4){
            var max=page.length>4?4:page.length;
            for(var i=1;i<=max;i++){
                if(i==to_cur){
                    str += "<li><a href='"+page[i-1]+"' class='page active'>" + i + "</a></li>";
                }else{
                    str += "<li><a href='"+page[i-1]+"' class='page'>" + i + "</a></li>";
                }
            }
            if(page.length>4){
                str += "<li><span>&hellip;</span></li>";
                str += "<li><a href='"+page[page.length-1]+"' class='page'>" + last_num + "</a></li>";
            }
        }else{
            str+="<li><a href='#' class='page'>1</a></li>";
            str += "<li><span>&hellip;</span></li>";
            if(last_num-to_cur<=2){
                for(var i=last_num-3;i<=last_num;i++){
                    if(i==to_cur){
                        str += "<li><a href='"+page[i-1]+"' class='page active'>" + i + "</a></li>";
                    }else{
                        str += "<li><a href='"+page[i-1]+"' class='page'>" + i + "</a></li>";
                    }
                }
            }else{
                //中间
                str += "<li><a href='"+page[to_cur-2]+"' class='page'>" + (to_cur-1) + "</a></li>";
                str += "<li><a href='"+page[to_cur-1]+"' class='page active'>" + to_cur + "</a></li>";
                str += "<li><a href='"+page[to_cur]+"' class='page'>" + (to_cur+1) + "</a></li>";
                str += "<li><span>&hellip;</span></li>";
                str += "<li><a href='"+page[page.length-1]+"' class='page'>" + last_num + "</a></li>";
            }
        }
        if(to_cur==last_num){
            str += "<li><a href='#' class='button disabled'>Next</a></li>";
        }else{
            str += "<li><a href='"+page[to_cur]+"' class='button'>Next</a></li>";
        }
        console.log(str);
        document.getElementById("pagination").innerHTML = str;
    }
}

