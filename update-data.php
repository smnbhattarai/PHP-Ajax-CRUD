<?php

require_once 'db.php';

if(isset($_POST)) {
    $id = preg_replace('/\D/', '', $_POST['id']);
    $car_name = mysqli_real_escape_string($connection, strip_tags($_POST['car']));

    $query = "UPDATE cars SET cars = '$car_name' WHERE id = $id";
    $result = mysqli_query($connection, $query);

    if($result) {
        echo 'Updated successfully.';
    } else {
        echo 'Update fail. Please try again.';
    }
}