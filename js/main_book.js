//DataTable FOR BOOKS INDEX
$(document).ready(function () { 
    $('#table').DataTable({
        responsive: true,
        serverSide:true,
        processing: true,
        paging:true,
        searching:true,
        order:[],
        ajax:{
           url: '/soso',
           type:"GET"
        },
        'aaSorting' : [],
        'columns' : [
            { data : 'id_book' },
            { data : 'book_name' },
            { data : 'description' },
            { data : 'cat' },
            { data : 'auth_name' },
            { data : 'book_img' },
            { data : 'action' }
        ],
        columnDefs:[{
            //  targets: [0, 1], visible: false,//hide column 0 & 1 in table
            orderable:false,//To control the ordering
            orderable: false, targets: [0,2] 
            // searchable: false
            // width    : "400px", targets: [1, 2],
        }],
        
        // dom:"lBfrtip",//l=>for page length //B=>for buttons (Excel)
        // buttons:
        // [{
        //     extend       : "excelHtml5",
        //     text         : "Export Excel",
        //     className    : "btn btn-success",
        //     exportOptions:{//select column
        //     columns      : [ 0, 1, 2, 3, 4]
        //     },
        // }],
    });
    //   $('.buttons-excel').detach().prependTo('.operations')//append excel button in operations(div)  

});


//ADD BOOK
$(document).ready(function (){
    $("#add_book").on('click',function(){
        $("#message").empty();
        $("#Modal_cati").modal("toggle");

        
        


        //hide img on popup 
        $("#the_img_to_update").hide();
        

        //empty felids
        $("#book_name").val('');
        $("#select_auth").val('');
        $("#description").val('');

        // $("#add_book_model").on('click' , function(){
        //     var book_name = $("#book_name").val();
        //     var auther_name = $("#select_auth").val();
        //     var description = $("#description").val();
        //     var categores = $("#select_cati").val();
        //     var img = $("#img").val();
        //     console.log(book_name);
        //     console.log(auther_name);
        //     console.log(description);
        //     console.log(categores);
        //     console.log(img);


            

        // });


        $("#myForm").validate({
            rules : {
                "select_cati" :{
                    required :true,
                    minlength: 2
                }, 
            },
            messages: {
                "select_cati[]" : {
                    minlength : "Please select at least 2 catigory"
                },
            },
    
            submitHandler :function(form){
                form = $("#myForm");
                var option = 
                {
                    target : "#message",
                    success: function(data) 
                    {
                        $("#Modal_cati").modal("toggle");
                        $("#table").DataTable().ajax.reload();//refresh data in dataTable
                        $('#myForm')[0].reset();
                    }
                };
                form.ajaxSubmit(option);
                // console.log(option);
            },
    
        });
    });
});






$(document).ready(function (){
    $(document).on('click' ,'a[data-role=update_book]',function(){
        $("#message").empty();
        $("#update_model").modal("toggle");
       

        var id = $(this).data('id');//id Book
        console.log(id);

        //To Get Data in box model
        $.ajax({
            url:'/get_bookData_for_update',
            method:'GET',
            data:{
                
                book_id:id
            },
            success : function(data){
                console.log(data[0]);
                $("#book_name_update").val(data[0].book_name);
                $("#select_auth_update").val(data[0].auther_id);
                $("#description_update").val(data[0].description);
                $("#book_Id_update").val(data[0].id_book);
                $("#old_img").val(data[0].book_img);


                //put the img [name] in input hidden to send it to controller
                // $("#old_img").attr("value",data[0].book_img);
                // $("#old_img").val(data[0].book_img);//put the current file in text input 
                //get the curent updated img
                // $("#img-sec").append(`<img class ='image' id='the_img_to_update' style="width: 50px; height:50px" src=../../img/${info[0].book_img}>`);
                // $("#img").attr("value",data[0].book_img);
                $("#update_model").modal("toggle");
            }
        });






        //hide img on popup 
        $("#the_img_to_update").hide();
        

        //empty felids
        // $("#book_name").val('');
        // $("#select_auth").val('');
        // $("#description").val('');

        // $("#add_book_model").on('click' , function(){
        //     var book_name = $("#book_name").val();
        //     var auther_name = $("#select_auth").val();
        //     var description = $("#description").val();
        //     var categores = $("#select_cati").val();
        //     var img = $("#img").val();
        //     console.log(book_name);
        //     console.log(auther_name);
        //     console.log(description);
        //     console.log(categores);
        //     console.log(img);
        // });


        $("#update_form").validate({
            rules : {
                "select_cati" :{
                    required :true,
                    minlength: 2
                }, 
            },
            messages: {
                "select_cati[]" : {
                    minlength : "Please select at least 2 catigory"
                },
            },
    
            submitHandler :function(form){
                form = $("#update_form");
                var option = 
                {
                    target : "#message",
                    success: function(data) 
                    {
                        $("#update_model").modal("toggle");
                        $("#table").DataTable().ajax.reload();//refresh data in dataTable
                        $('#update_model')[0].reset();
                    }
                };
                form.ajaxSubmit(option);
            },
    
        });
    });
});



$(document).ready(function (){
    $(document).on('click' ,'a[data-role=delete_book]',function(){
        $("#message").empty();
        $("#delete_model").modal("toggle");
       

        var id = $(this).data('id');//id Book
        console.log(id);
        $("#book_Id_Delete").val(id);


        $("#delete_form").validate({
            submitHandler :function(form){
                form = $("#delete_form");
                var option = 
                {
                    target : "#message",
                    success: function(data) 
                    {
                        $("#delete_model").modal("toggle");
                        $("#table").DataTable().ajax.reload();//refresh data in dataTable
                    }
                };
                form.ajaxSubmit(option);
            },
    
        });

    });
});


// function export_to_excel(type){
//     var data_table = document.getElementById('table');
//     var file = XLSX.utils.table_to_book(data_table,{sheet:'sheet1'});
//     XLSX.write(file,{bookType:type,bookSST:true,type:'base64'});
//     XLSX.writeFile(file,'file.'+type);
// }
// export_to_excel();

// const export_button = document.getElementById('export_excel_btn');

// export_button.addEventListener('click', () =>{
//     html_table_to_excel('xlsx');
// });