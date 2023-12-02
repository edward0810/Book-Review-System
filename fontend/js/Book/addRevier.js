function save(){
    var str="";
    var text=$("#comment").val();
    var user=JSON.parse(window.localStorage.getItem("user"));
    var bid=window.location.search.split("=");
    
    if(!text){
        str+=`
            <li>Comments cannot be empty.</li>
        `;
    } 

    $("#error").html(str);

    if(text){
         $.ajax({
            url:`${c_url}/review`,
            method:"POST",
            data:{"text":text,"uid":user.uid,"bid":bid[1]},
            success:function(res){
                alert(res.message);
                $("#comment").val('');
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}