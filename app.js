getAlldata = function () {

    $.ajax({
        type: 'GET',
        url: 'get_all.php',
        success: function (data) {
            var cars = JSON.parse(data);
            if ($.isEmptyObject(cars)) {
                $('#all-data').html(
                    '<p class="text-info">No data to display. Please add using the form.</p>'
                );
                return;
            }
            html = '<ul class="list-group">';
            for (var i = 0; i < cars.length; i++) {
                html += '<li class="list-group-item">' + cars[i].cars +
                    ' <a href="javascript:void(0)" class="btn btn-danger btn-sm float-right ml-1 btnDelete" data-id="' + cars[i].id + '">Delete</a><a href="javascript:void(0)" class="btn btn-dark btn-sm float-right btnEdit" data-id="' + cars[i].id + '" data-name="' + cars[i].cars + '">Edit</a></li>';
            }
            html += '</ul>';
            $('#all-data').html(html);
            $('#all-data').hide().fadeIn(400);
        }
    });

};

$(document).ready(function () {


    // Get all record on page load
    getAlldata();


    // Search the DB data
    $('#search').keyup(function () {
        $('#result').html('');
        var search = $('#search').val();

        if (search == '' || search == ' ') {
            $('#result').html('').fadeIn(300).html('<p class="text-info">No record found.</p>');
            return;
        }

        $.ajax({
            url: 'search.php',
            data: {
                searchTerm: search
            },
            type: 'POST',
            success: function (data) {
                if (!data.error) {
                    var cars = JSON.parse(data);

                    if ($.isEmptyObject(cars)) {
                        $('#result').html('').fadeIn(300).html(
                            '<p class="text-info">No record found</p>');
                        return;
                    }

                    var html = '<ul class="list-group">';
                    for (var i = 0; i < cars.length; i++) {
                        html += '<li class="list-group-item">' + cars[i] + '</li>';
                    }
                    html += '</ul>';
                    $('#result').fadeIn(300).html(html);
                }
            }
        });
    }); // keyup




    // Add new data to DB
    $("#add-car-form").submit(function (e) {
        e.preventDefault();
        var carInput = $('#car_name');
        if (carInput.val().trim() === '') {
            carInput.removeClass('is-valid');
            carInput.next().remove();
            carInput.addClass('is-invalid');
            carInput.after(
                '<div class="invalid-feedback">Please enter a car name to add ...</div>');
            return;
        }
        var formData = $(this).serialize();
        var url = $(this).attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            success: function (data) {
                carInput.removeClass('is-invalid');
                carInput.next().remove();
                carInput.addClass('is-valid');
                carInput.after('<div class="valid-feedback">' + data + '</div>');
                carInput.val('');
                getAlldata();
                return;
            }
        });
    }); // submit




    // Edit data handling
    $("#all-data").on("click", 'a.btnEdit', function(e){
        var id = ($(this).data('id'));
        var name = ($(this).data('name'));
        $('#updateId').val(id);
        $('#carUpdateValue').val(name);
        $('#updateModel').modal('show');
    });




    // Update processing
    $('#updateSave').click(function(){
        var id = $('#updateId').val();
        var input = $('#carUpdateValue').val();
        if(input.trim() == '') {
            $('.updateMsg').html('<span class="text-danger">Field cannot be empty.</span>');
            return;
        }
        $.ajax({
            type: 'POST',
            data: { id: id, car: input },
            url: 'update-data.php',
            success: function(data) {
                $('.updateMsg').html('<span class="text-success">' + data + '</span>');
                setTimeout(function() { $('#updateModel').modal('hide'); }, 1500);
                setTimeout(function(){ getAlldata(); }, 1500);
            }
        });
    });



    // Delete process
    $("#all-data").on("click", 'a.btnDelete', function(e){
        var id = ($(this).data('id'));
        var sure = confirm("Are you sure you want to delete this?");
        if(sure) {
            $.ajax({
                type: 'POST',
                data: { id: id },
                url: 'delete-data.php',
                success: function() {
                    setTimeout(function(){ getAlldata(); }, 500);
                }
            });
        }
    });



}); // document ready