//filters
$(document).ready(function (){
    $("#cati_filter,#auth_filter,#res_search").on('change , keyup', function(){
        $("#crud").empty();
        $("#load_more").hide();
        var Auth_id = $("#auth_filter").val();
        var cati_id = $("#cati_filter").val();
        var searchKey = $('#res_search').val();
        $.ajax({
            url:"/filters",
            type: 'GET',
            data:{
                search:searchKey,
                id_auther:Auth_id,
                id_cati:cati_id,
            },
            success : function(data){
                if(data == "<div class='alert alert-danger' role='alert'>Data Not Found</div>"){
                    $("#message").empty();
                    $("#message").append(`<div class='alert alert-danger' role='alert'>Data Not Found</div>`);
                }
                else{
                    $("#message").empty();
                    // let info = JSON.parse(data);
                    for(let i = 0 ; i < data.length ; i++){
                        $("#crud").append(`
                        <div class="col-lg-4 col-md-6 shadow-lg p-3 mb-5 bg-white rounded parent">
                            <div class="card" data-role="product" data-id="${data[i].id_book}">
                            
                                <img src="../img/${data[i].book_img}" class="img-fluid" style="height:200px; width:300px; margin:auto">
                            
                                <label>Book name</label>
                                <h6 class="card-text" >${data[i].book_name}</h6>
                                <label>Book Description</label>
                                <h6 class="card-text">${data[i].description}</h6>
                                <label>Aurher Name</label>
                                <h6 class="card-text">${data[i].auth_name}</h6>
                                <label>catigoey</label>
                                <h6 class="card-text">${data[i].cat}</h6>
                                <div class="button text-end">
                                    <button class="btn btn-success">Add to cart</button>
                                </div>
                            </div>
                        </div> 
                        `);
                    }
                }
            }
        });
    });
});


$(document).ready(function(){
    //for load more
    $("#load_more").on("click",function(){
        var row = Number($("#row").val());
        row = row +3;
        console.log(row);
    
        var all_row = Number($("#all_row").val());
        console.log(all_row);
        
        $("#row").val(row);//for counter

        
        $.ajax({
                url:"/load_more",
                type: 'GET',
                data:{
                    number_limit:row
                },
                success : function(data){
                    console.log(data);
                    for(let i = 0 ;i < data.length;i++){
                        $("#crud").append(`
                        <div class="col-lg-4 col-md-6 shadow-lg p-3 mb-5 bg-white rounded parent">
                            <div class="card" data-role="product" data-id="${data[i].id_book}">
                                    <img src="../img/${data[i].book_img}" class="img-fluid" style="height:200px; width:300px; margin:auto">
                                <label>Book name</label>
                                <h6 class="card-text" >${data[i].book_name}</h6>
                                <label>Book Description</label>
                                <h6 class="card-text">${data[i].description}</h6>
                                <label>Aurher Name</label>
                                <h6 class="card-text">${data[i].auth_name}</h6>
                                <label>catigoey</label>
                                <h6 class="card-text">${data[i].cat}</h6>
                                <div class="button text-end">
                                    <button class="btn btn-success">Add to cart</button>
                                </div>
                            </div>
                        </div> 
                        `);
                    }
                    if(row >= all_row){//if loaded all record then hide button
                        $("#load_more").hide();
                    }
                }
            });
    });
});