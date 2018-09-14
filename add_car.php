<?php

require_once 'db.php';
if(isset($_POST)) {
    $car = $_POST['car_name'];
    
    if(empty($car)) return;
    
    $car = mysqli_real_escape_string($connection, strip_tags($car));
    $query = "INSERT INTO cars (cars) VALUES ('$car')";

    $result = mysqli_query($connection, $query);

    if($result) {
        echo 'New record inserted';
    } else {
        echo 'There was a problem inserting data.';
    }
}