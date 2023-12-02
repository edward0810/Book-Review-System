$(function(){
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
            console.log(res);
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
});

function save(){
    var str="";
    var title=$("#title").val();
    var author=$("#author").val();
    var summary=$("#summary").val();
    var genre=$("#genre").val();
    
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
            method:"POST",
            data:{"title":title,"aid":author,"summary":summary,"gid":genre},
            success:function(res){
                alert(res.message);
                $("#error").html('');
                $("#title").val('');
                $("#summary").val('');
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}