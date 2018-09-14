<?php

require_once 'db.php';

if(isset($_POST['searchTerm'])) {
    $search = trim($_POST['searchTerm']);
    if(!empty($search)) {
        $search = mysqli_real_escape_string($connection, (strip_tags($search)));

        $query = "SELECT * FROM cars WHERE cars LIKE '%$search%'";
        $result = mysqli_query($connection, $query);

        $brand = array();

        while($row = mysqli_fetch_array($result)) {
            $brand[] = $row['cars'];
        }

        if(count($brand) > 0) {
            echo json_encode($brand);
        } else {
            echo '{}';
        }

    }
}