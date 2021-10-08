<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    header("Access-Control-Allow-Headers: X-Requested-With");

    if (isset($_GET["url"])) {
        $url = $_GET["url"];
        if (filter_var($url, FILTER_VALIDATE_URL)) {
            echo file_get_contents($url);
        } else {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            $error = array(
                "error" => "invalid url"
            );
            die (json_encode($error));    
        }
    } else {
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        $error = array(
            "error" => "please specify an url"
        );
        die (json_encode($error));
    }