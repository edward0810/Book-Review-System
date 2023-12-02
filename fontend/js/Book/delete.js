function Delete(id){
    var bl=confirm('Do you really want to delete this Book?');
    if(bl){
        $.ajax({
            url:`${c_url}/book`,
            method:"DELETE",
            data:{"bid":id},
            success:function(res){
                alert(res.message);
                window.history.go(-2);
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}