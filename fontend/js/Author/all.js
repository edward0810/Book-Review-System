$(function(){
    onload();
})

function onload(){
    $.ajax({
        url:`${c_url}/author/all`,
        method:"GET",
        success:function(res){
           console.log(res);
           var str="";
           res.author_list.forEach(element => {
            str+=`
                <li>
                    <a href="author.html?aid=${element.aid}">${element.firstName},${element.familyName}</a>
                    (${element.birth})
                </li>
            `;
           });
           if(res.author_list.length>0){
            $("#author_list").html(str);
           }
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}