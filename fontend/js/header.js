$(function(){
    var user=window.localStorage.getItem("user");
    if(user){
        user=JSON.parse(user);
        var str=`
            <div class="coulmn_one">
                <p>
                    <a href="./">Home</a>
                </p>
                <p>
                    <a href="./books.html">All Book</a>
                </p>
                <p>
                    <a href="./authors.html">All Authors</a>
                </p>
                <p>
                    <a href="./genres.html">All Genres</a>
                </p>
            </div>
        `;
        if(user.role==1){
            str+=`
                <div class="coulmn_two">
                    <p>
                        <a href="./addAuthor.html">Create New Author</a>
                    </p>
                    <p>
                        <a href="./addGenre.html">Create New Genre</a>
                    </p>
                    <p>
                        <a href="./addBook.html">Create New Book</a>
                    </p>
                </div>
            `;
        }
        str+=`
            <div style="text-align:left;margin-top:1vw;">
                <p>
                    <a href="#" onclick="loginOut()">Log Out</a>
                </p>
            </div>
        `;
        $("#navber").html(str);
    }else{
        alert("Please log in first!");
        window.location.href="./login.html";
    }
});

function loginOut(){
    window.localStorage.removeItem("user");
    alert("Log Out successfully!");
    window.location.href="./login.html";
}