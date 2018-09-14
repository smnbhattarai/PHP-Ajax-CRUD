<?php

require_once 'db.php';

if(isset($_POST['id'])) {
    $id = preg_replace('/\D/', '', $_POST['id']);
    $query = "DELETE FROM cars WHERE id = $id";
    $result = mysqli_query($connection, $query);
    if($result) {
        echo "Deleted successcully.";
    } else {
        echo "Delete failed.";
    }
}