<?php
header('Content-type: text/html;charset=utf-8');

$name = $_REQUEST['name'];
$pass = $_REQUEST['password'];
/*$ack = $_REQUEST['ack'];*/

$pass = md5($pass);

// 创建连接
$conn = new mysqli('localhost', 'root', '', 'rambolei');

$conn->query('set names utf8');

$sql = "insert into admin (name, password) values('$name', '$pass')";     // sql语句

if ($conn->query($sql) === true) {
    $data = array(
        'code' => 0,
        'msg'  => '注册成功'
    );
} else {
    $data = array(
        'code' => 1,
        'msg'  => '注册失败'
    );
}

echo json_encode($data);

$conn->close();