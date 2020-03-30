<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function generate_access_token_from_refresh_token($config, $oauth_details){
    $oauth_config = array('grant_type' => 'refresh_token', 'refresh_token'=> $oauth_details['refresh_token'], 'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret']);
    $response = json_decode(make_curl_request($config['access_token_endpoint'], $oauth_config), true);
    $result = $response['result']['data'];
    $oauth_details['access_token'] = $result['access_token'];

    $oauth_details['refresh_token'] = $result['refresh_token'];
    $oauth_details['scope'] = $result['scope'];
    //$_SESSION["refresh_token"] = $result['refresh_token'];
    return $oauth_details;
}

function make_api_request($oauth_config, $path){
    $headers[] = 'Authorization: Bearer ' . $oauth_config['access_token'];
    return make_curl_request($path, false, $headers);
}


function make_curl_request($url, $post = FALSE, $headers = array())
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    if ($post) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
    }

    $headers[] = 'content-Type: application/json';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    curl_close($curl);

    return $response;
}


function make_contest_problem_api_request($config,$oauth_details,$contest_code){
    $problem_code = "SALARY";
    //$contest_code = "JAN18";
    $path = $config['api_endpoint']."contests/".$contest_code."?fields=problemsList";
   // ."/problems/".$problem_code;
    $response = make_api_request($oauth_details, $path);
    return $response;
}
function make_problem_page_api_request($config,$oauth_details,$contest_code,$problem_code){
    $path = $config['api_endpoint']."contests/".$contest_code."/problems/". $problem_code;
   // ."/problems/".$problem_code;
    $response = make_api_request($oauth_details, $path);
    return $response;
}
function make_rank_page_api_request($config,$oauth_details,$contest_code){
    $path = $config['api_endpoint']."rankings/".$contest_code . '?fields=rank%2Cusername%2Cpenalty%2CtotalScore%2CtotalTime';
   // ."/problems/".$problem_code;
    $response = make_api_request($oauth_details, $path);
    return $response;
}
function make_recent_details_api_request($config,$oauth_details,$contest_code){
    $path = $config['api_endpoint']."submissions/"."?" . "contestCode=".$contest_code ;
    $response = make_api_request($oauth_details, $path);
    return $response;
}



$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if (empty($_POST['id'])) die();

$config = array('client_id'=> '2bf409b35422db2f01e09777d08c2727',
    'client_secret' => '58ed44263a1b531c3a818d0f8ac1570c',
    'api_endpoint'=> 'https://api.codechef.com/',
    'authorization_code_endpoint'=> 'https://api.codechef.com/oauth/authorize',
    'access_token_endpoint'=> 'https://api.codechef.com/oauth/token',
    'redirect_uri'=> 'http://localhost:8000/codechef.php',
    'website_base_url' => 'http://127.0.0.1/codechef.php');

$oauth_details = array('authorization_code' => '',
    'access_token' => '',
    'refresh_token' => '');

//$oauth_details['authorization_code'] = '998c2c507108803cd7bcbb3bc74538d508e8bc6d';
$oauth_details['refresh_token'] = $_POST['id'];
$oauth_details = generate_access_token_from_refresh_token($config, $oauth_details); 


if($_POST['rsname']){
    $response = make_recent_details_api_request($config, $oauth_details, $_POST['rsname']); 
} 

elseif($_POST['cname'] && empty($_POST['pname'])) 
{
    $response = make_contest_problem_api_request($config, $oauth_details, $_POST['cname']); 
}

elseif($_POST['cname'] &&  $_POST['pname'])
{
$response = make_problem_page_api_request($config, $oauth_details, $_POST['cname'], $_POST['pname']);

}
elseif($_POST['rname'] )
{
$response = make_rank_page_api_request($config, $oauth_details, $_POST['rname']);

}


//$oauth_details['access_token'] = "123";
//$_SESSION["temp"] = $oauth_detail['access_token'];
//$_SESSION["temp"] = "a6b6eef8c04faffdcf81829f9a6d23b46bf1647c";
//$temp_details = array('authorization_code' => $oauth_details['access_token']);
//$rest_json = file_get_contents("php://input");
//$_POST = json_decode($rest_json, true);
//echo json_encode(["sent" => $_POST['datu']]);


$json_array = json_decode($response);
$json_array->refresh_token = $oauth_details['refresh_token'];
$response = json_encode($json_array);

echo $response;

