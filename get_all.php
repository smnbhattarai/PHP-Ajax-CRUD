<?php

require_once 'db.php';

$query = "SELECT * FROM cars";
$result = mysqli_query($connection, $query);

$brands = array();
while($row = mysqli_fetch_array($result)) {
    $brands[] = array('id' => $row['id'], 'cars' => $row['cars']);
}

if(count($brands) > 0) {
    echo json_encode($brands);
} else {
    echo '{}';
}