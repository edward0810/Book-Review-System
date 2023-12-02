$(function(){
    onload();
})

function onload(){
    $.ajax({
        url:`${c_url}/`,
        method:"GET",
        success:function(res){
            $("#sum").html(`
                <li><span class="storng">Books:</span>${res.book_number}</li>
                <li><span class="storng">Authors:</span>${res.author_number}</li>
                <li><span class="storng">Genres:</span>${res.genre_number}</li>
            `);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function create(time){
    var date=new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function remove(cid,pid){
    $.ajax({
        url:"http://localhost:3001/managestudies",
        method:"DELETE",
        data:{"cid":cid,"pid":pid},
        success:function(res){
            alert(res.message);
            onload();
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function mangeSubmit(){
    var cid=$("#studiesname").val();
    var pid=$("#patient").val();
    var date=$("#date").val();
    if(cid && pid && date){
        $.ajax({
            url:"http://localhost:3001/managestudies",
            method:"POST",
            data:{"cid":cid,"pid":pid,"date":date},
            success:function(res){
                alert(res.message);
                $("#patient").val("");
                $("#studiesname").val("");
                $("#date").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The studiesname and patient and date cannot be empty!");
    }
}

function createPatient(){
    var patientname1=$("#patientname1").val();
    var gender=$("#gender").val();
    var age=$("#age").val();
    if(gender&&patientname1&&age){ 
        $.ajax({
            url:"http://localhost:3001/patient",
            method:"POST",
            data:{"gender":gender,"patientname":patientname1,"age":age},
            success:function(res){
                alert(res.message);
                $("#patientname1").val("");
                $("#gender").val("");
                $("#age").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The age and gender and patient name cannot be empty!");
    }
}

function createClinical(){
    var studiesname1=$("#studiesname1").val();
    var description1=$("#description1").val();
    if(studiesname1&&description1){ 
        $.ajax({
            url:"http://localhost:3001/clinicalstudies",
            method:"POST",
            data:{"studiesname":studiesname1,"description":description1},
            success:function(res){
                alert(res.message);
                $("#studiesname1").val("");
                $("#description1").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The studiesname and description cannot be empty!");
    }
}

function createTrialorganization(){
    var organizationname=$("#organizationname").val();
    var description2=$("#description2").val();
    if(description2&&organizationname){ 
        $.ajax({
            url:"http://localhost:3001/trialorganization",
            method:"POST",
            data:{"organizationname":organizationname,"description":description2},
            success:function(res){
                alert(res.message);
                $("#organizationname").val("");
                $("#description2").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The organization name and description cannot be empty!");
    }
}