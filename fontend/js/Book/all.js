$(function(){
    onload();
})

function onload(){
    $.ajax({
        url:`${c_url}/book/all`,
        method:"GET",
        success:function(res){
           console.log(res);
           var str="";
           res.book_list.forEach(element => {
            str+=`
            <li>
                <a href="./book.html?bid=${element.bid}">${element.title}</a>
                (${element.author.firstName},${element.author.familyName})
            </li>
            `;
           });
           if(res.book_list.length>0){
            $("#book_list").html(str);
           }
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}