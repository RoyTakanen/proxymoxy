<?php
    if (isset($_GET["url"])) {

    } else {
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        $error = array(
            "error" => "please specify an url"
        );
        die (json_encode($error));
    }