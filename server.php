<?php
$_POST = json_decode(file_get_contents('php://input'), true); /* Для json бека */

echo var_dump($_POST);
?>