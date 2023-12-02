$(function(){
    onload();
})

function onload(){
    var gid=window.location.search.split("=");
    if(gid.length!=2){
        alert("Search parameters are not correct!");
        window.history.go("-1");
        return;
    }
    $.ajax({
        url:`${c_url}/genre/findGid/${gid[1]}`,
        method:"GET",
        success:function(res){
            console.log(res);
            var str="";
            $("#name").html(res.now_genre.name);
            if(res.now_genre.book_list.length==0){
                str=`
                    <p>This Genre has no books.</p>
                `;
            }
            res.now_genre.book_list.forEach(element => {
                str+=`
                    <div class="item">
                        <div>
                            <a href="./book.html?bid=${element.bid}">
                                <strong>${element.title}(${element.author.firstName},${element.author.familyName})</strong>
                            </a>
                        </div>
                        <p>
                            ${element.summary}
                        </p>
                    </div>
                `;
            });
            $("#book_list").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
           window.history.go("-1");
        }
    });
}