$(function(){
    onload();
})

function onload(){
    var aid=window.location.search.split("=");
    if(aid.length!=2){
        alert("Search parameters are not correct!");
        window.history.go(-1);
        return;
    }
    $.ajax({
        url:`${c_url}/author/findAid/${aid[1]}`,
        method:"GET",
        success:function(res){
            console.log(res);
            var str="";
            $("#name").html(`${res.now_author.firstName},${res.now_author.familyName}`);
            $("#date").html(`${res.now_author.birth}`);
            if(res.now_author.book_list.length==0){
                str=`
                    <p>This Author has no books.</p>
                `;
            }
            res.now_author.book_list.forEach(element => {
                str+=`
                    <div class="item">
                        <div>
                            <a href="./book.html?bid=${element.bid}">
                                <strong>${element.title}</strong>
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

    var user=window.localStorage.getItem("user");
    if(user){
        user=JSON.parse(user);
        if(user.role==1){
            $("#option_box").html(`
                <p>
                    <a href="#" onclick="Delete('${aid[1]}')">Delete Author</a>
                </p>
            `);
        }
    }
}