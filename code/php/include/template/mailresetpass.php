<?php
/** @noinspection PhpUndefinedVariableInspection */
$content=<<<CODE
<p>Xin chào <b>$name</b>,</p>
<p>Bạn có đăng ký tài khoản tại site {$_SERVER['SERVER_NAME']} với tên là
<b>$username</b>. Bạn đã yêu cầu lập mật khẩu mới và đây là mật
khẩu mới của bạn: <b>$newpass</b></p>
<p>Bạn nên thay đổi mật khẩu ngay sau khi đăng nhập!</p>

<p>Chúc bạn một ngày vui vẻ!</p>
<p>{$_SERVER['SERVER_NAME']} webmaster</p>
CODE;
