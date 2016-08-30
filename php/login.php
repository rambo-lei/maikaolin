<?php
header('Content-type: text/html;charset=utf-8');

$name = $_GET['log_username'];      // 通过get请求传递过来的name值
$pass  = $_GET['log_password'];  // 通过get请求传递过来的密码

$pass = md5($pass);


// 创建连接
$conn = new mysqli('localhost', 'root', '', 'rambolei');

$sql = "select name from admin where name='$name' and pwd='$password'";     // sql语句     查询l_admin表中的a_nickname字段

$conn->query('set names utf8');

$result = $conn->query($sql);


if ($result->num_rows > 0) {

    $name = $result->fetch_assoc();
    $name = $name['name'];

    $data = array(
        'code' => 0,
        'msg'  => '登录成功！',
        'data' => array(
            'name' => $name
        )
    );

    echo json_encode($data);
} else {

    $data = array(
        'code' => 1,
        'msg'  => '用户名或密码错误！'
    );

    echo json_encode($data);
}