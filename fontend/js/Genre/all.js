$(function(){
    onload();
})

function onload(){
    $.ajax({
        url:`${c_url}/genre/all`,
        method:"GET",
        success:function(res){
           console.log(res);
           var str="";
           res.genre_list.forEach(element => {
            str+=`
                <li>
                    <a href="./genre.html?gid=${element.gid}">${element.name}</a>
                </li>
            `;
           });
           if(res.genre_list.length>0){
            $("#genre_list").html(str);
           }
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}