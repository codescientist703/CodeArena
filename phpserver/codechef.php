<?php
//session_start();

function take_user_to_codechef_permissions_page($config){

    $params = array('response_type'=>'code', 'client_id'=> $config['client_id'], 'redirect_uri'=> $config['redirect_uri'], 'state'=> 'xyz');
    header('Location: ' . $config['authorization_code_endpoint'] . '?' . http_build_query($params));
    die();
}

function generate_access_token_first_time($config, $oauth_details){

    $oauth_config = array('grant_type' => 'authorization_code', 'code'=> $oauth_details['authorization_code'], 'client_id' => $config['client_id'],
                          'client_secret' => $config['client_secret'], 'redirect_uri'=> $config['redirect_uri']);
    $response = json_decode(make_curl_request($config['access_token_endpoint'], $oauth_config), true);
    $result = $response['result']['data'];

    $oauth_details['access_token'] = $result['access_token'];
    $oauth_details['refresh_token'] = $result['refresh_token'];
    $oauth_details['scope'] = $result['scope'];
    $_SESSION["refresh_token"] = $result['refresh_token'];

    return $oauth_details;
}

function generate_access_token_from_refresh_token($config, $oauth_details){
    $oauth_config = array('grant_type' => 'refresh_token', 'refresh_token'=> $oauth_details['refresh_token'], 'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret']);
    $response = json_decode(make_curl_request($config['access_token_endpoint'], $oauth_config), true);
    $result = $response['result']['data'];

    $oauth_details['access_token'] = $result['access_token'];
    $oauth_details['refresh_token'] = $result['refresh_token'];
    $oauth_details['scope'] = $result['scope'];

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
    return $response;
}


function make_contest_problem_api_request($config,$oauth_details){
    $problem_code = "SALARY";
    $contest_code = "JAN18";
    $path = $config['api_endpoint']."contests/".$contest_code;
   // ."/problems/".$problem_code;
    $response = make_api_request($oauth_details, $path);
    return $response;
}

function main(){

    $config = array('client_id'=> '2bf409b35422db2f01e09777d08c2727',
        'client_secret' => '58ed44263a1b531c3a818d0f8ac1570c',
        'api_endpoint'=> 'https://api.codechef.com/',
        'authorization_code_endpoint'=> 'https://api.codechef.com/oauth/authorize',
        'access_token_endpoint'=> 'https://api.codechef.com/oauth/token',
        'redirect_uri'=> 'http://localhost:8000/codechef.php',
        'website_base_url' => 'http://localhost:8000/codechef.php');

    $oauth_details = array('authorization_code' => '',
        'access_token' => '',
        'refresh_token' => '');

    if(isset($_GET['code'])){
        $oauth_details['authorization_code'] = $_GET['code'];
        //$_SESSION['code'] = $_GET['code'];
        $oauth_details = generate_access_token_first_time($config, $oauth_details);

         //die();
        //$response = make_contest_problem_api_request($config, $oauth_details);
        //$_SESSION["daata"] = $response;
        //file_put_contents('contest-details.json', $response;);
        //$oauth_details = generate_access_token_from_refresh_token($config, $oauth_details);         //use this if you want to generate access_token from refresh_token
       header('Location: ' . 'http://localhost:3000/dashboard?' . $oauth_details['refresh_token']);
        //die();
        echo $oauth_details['refresh_token'];
    } else{
        take_user_to_codechef_permissions_page($config);
    }
}

main();