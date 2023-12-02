$(function(){
    onload();
})

function onload(){
    var bid=window.location.search.split("=");
    if(bid.length!=2){
        alert("Search parameters are not correct!");
        window.history.go("-1");
        return;
    }
    $.ajax({
        url:`${c_url}/book/findBid/${bid[1]}`,
        method:"GET",
        success:function(res){
            console.log(res);
            var str="";
            $("#name").html(res.now_book.title);
            str+=`
                <div class="book_item">
                    <strong>Author:</strong>
                    <a href="./author.html?aid=${res.now_book.author.aid}">${res.now_book.author.firstName},${res.now_book.author.familyName}</a>
                </div>
                <div class="book_item">
                    <p>
                        <strong>Summary:</strong>
                        ${res.now_book.summary}
                    </p>
                </div>
                <div class="book_item">
                    <strong>Genre:</strong>
                    <a href="./genre.html?gid=${res.now_book.genre.gid}">${res.now_book.genre.name}</a>
                </div>
            `;
            $("#now_book").html(str);
            var review_str=``;
            if(res.now_book.review.length==0){
                review_str=`
                    <p>The book has not yet been reviewed.</p>
                `;
            }
            res.now_book.review.forEach(element => {
                review_str+=`
                    <div class="revier_item">
                        <div class="revier_header">
                            <p><strong>${element.user.userName}</strong></p>
                            <p>${element.date}</p>
                        </div>
                        <div class="revier_content">
                            ${element.text}
                        </div>
                    </div>
                `;
            });
            $("#revier_list").html(review_str);

            var user=window.localStorage.getItem("user");
            if(user){
                user=JSON.parse(user);
                if(user.role==1){
                    $("#option_box").html(`
                        <p>
                            <a href="./updateBook.html?bid=${bid[1]}">Update Book</a>
                        </p>
                        <p>
                            <a href="#" onclick="Delete('${bid[1]}')">Delete Book</a>
                        </p>
                    `);
                }
            }
        },
        error:function(err){
           alert(err.responseJSON.message);
           window.history.go("-1");
        }
    });
}