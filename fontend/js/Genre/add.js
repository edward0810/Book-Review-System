function save(){
    var str="";
    var genre=$("#genre").val();

    if(!genre){
        str+=`
            <li>Genre Name required</li>
        `;
    } 

    $("#error").html(str);

    if(genre){
         $.ajax({
            url:`${c_url}/genre`,
            method:"POST",
            data:{"name":genre},
            success:function(res){
                alert(res.message);
                $("#error").html('');
                $("#genre").val('');
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}