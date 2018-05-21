<?php
/** @noinspection PhpUndefinedVariableInspection */
$content=<<<CODE
<p>Xin chào <b>$name</b>,</p>
<p>Bạn hoặc ai đó đã đăng ký tài khoản tại site {$_SERVER['SERVER_NAME']} với
tài khoản tên là <b>$username</b>. Nếu điều này không đúng thì xin lỗi
bạn vì đã làm phiền và bạn có thể bỏ qua email này.</p> 
<p>Nếu đúng là bạn đã đăng ký tài khoản trên. Vui lòng click vào link
sau đây để kích hoạt tài khoản trước khi tài khoản có thể sử dụng
được.</p>
<p><a target="_blank" href="$link">$link</a></p>

<p>Chúc bạn một ngày vui vẻ!</p>
<p>{$_SERVER['SERVER_NAME']} webmaster</p>
CODE;
