# Proxymoxy
A dead simple CORS unblock proxy made with PHP.

## In a nutshell

This program takes url and makes a request to the url. It send the URL response back with `Access-Control-Allow-Origin: *` header.

## Installation

Just copy index.php to your webserver root folder. Keep it simple.

## Usage

`http://<proxy_domain>?url=<site_that_has_cors_problem>`