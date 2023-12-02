function Delete(id){
    var bl=confirm('Do you really want to delete this Author?');
    if(bl){
        $.ajax({
            url:`${c_url}/author`,
            method:"DELETE",
            data:{"aid":id},
            success:function(res){
                alert(res.message);
                window.location.href="./authors.html";
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}