<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT password FROM user WHERE username = ?");
    if (!$stmt) {
        die("쿼리 준비 실패: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($db_password);
    $stmt->fetch();

    if ($password === $db_password) {
        $_SESSION['username'] = $username;
        echo "로그인 완료!<br>";
        echo "<a href='board.php'>게시판으로 이동</a>";
    } else {
        echo "아이디 또는 비밀번호가 올바르지 않습니다.";
    }

    $stmt->close();
    $conn->close();
}
?>

<form method="POST" action="login.php">
    아이디: <input type="text" name="username" required><br>
    비밀번호: <input type="password" name="password" required><br>
    <button type="submit">로그인</button>
</form>
<br>
<form action="register.php" method="GET">
    <p>아직 회원이 아니신가요?</p>
    <button type="submit">회원가입 하기</button>
</form>
