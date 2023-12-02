$(function(){
    onload();
})
var bid="";
function onload(){
    bid=window.location.search.split("=");
    if(bid.length!=2){
        alert("Search parameters are not correct!");
        window.history.go("-1");
        return;
    }
    $.ajax({
        url:`${c_url}/genre/all`,
        method:"GET",
        success:function(res){
            var genre_list=res.genre_list;
            var str=``;
            genre_list.forEach(element => {
                str+=`
                    <option value="${element.gid}">${element.name}</option>
                `;
            });
            $("#genre").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });

    $.ajax({
        url:`${c_url}/author/all`,
        method:"GET",
        success:function(res){
            var author_list=res.author_list;
            var str=``;
            author_list.forEach(element => {
                str+=`
                    <option value="${element.aid}">${element.firstName},${element.familyName}</option>
                `;
            });
            $("#author").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });

    setTimeout(function(){
        $.ajax({
            url:`${c_url}/book/findBid/${bid[1]}`,
            method:"GET",
            success:function(res){
                console.log(res);
                var str="";
                $("#title").val(res.now_book.title);
                $("#summary").val(res.now_book.summary);
                $("#author").val(res.now_book.aid);
                $("#genre").val(res.now_book.gid);
            },
            error:function(err){
               alert(err.responseJSON.message);
               window.history.go("-1");
            }
        });    
    },1000);
}

function save(){
    var title=$("#title").val();
    var author=$("#author").val();
    var summary=$("#summary").val();
    var genre=$("#genre").val();
    var str="";
    if(!title){
        str+=`
            <li>Title required</li>
        `;
    } 
    if(!author){
        str+=`
            <li>Author Name required</li>
        `;
    } 
    if(!summary){
        str+=`
            <li>Summary required</li>
        `;
    } 
    if(!genre){
        str+=`
            <li>Genre Name required</li>
        `;
    } 

    $("#error").html(str);

    if(title && author && summary && genre){
         $.ajax({
            url:`${c_url}/book`,
            method:"PUT",
            data:{"title":title,"aid":author,"summary":summary,"gid":genre,"bid":bid[1]},
            success:function(res){
                alert(res.message);
                window.history.go(-1);
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}