function save(){
    var str="";
    var firstName=$("#firstName").val();
    var familyName=$("#familyName").val();
    var birth=$("#birth").val();

    if(!firstName){
        str+=`
            <li>First Name required</li>
        `;
    } 
    if(!familyName){
        str+=`
            <li>Family Name required</li>
        `;
    } 
    if(!birth){
        str+=`
            <li>Date of Birth required</li>
        `;
    } 

    $("#error").html(str);

    if(birth && familyName && firstName){
         $.ajax({
            url:`${c_url}/author`,
            method:"POST",
            data:{"firstName":firstName,"familyName":familyName,"birth":birth},
            success:function(res){
                alert(res.message);
                $("#error").html('');
                $("#firstName").val('');
                $("#familyName").val('');
                $("#birth").val('');
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }
}