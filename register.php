<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
    if (!$stmt) {
        die("쿼리 준비 실패: " . $conn->error);
    }
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        header("Location: login.php");
        exit;
    } else {
        echo "회원가입 실패: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<form method="POST" action="register.php">
    아이디: <input type="text" name="username" required><br>
    비밀번호: <input type="password" name="password" required><br>
    <button type="submit">회원가입</button>
</form>
