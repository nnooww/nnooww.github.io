<?php
session_start();
include 'db.php';

if (!isset($_SESSION['username'])) {
    echo "로그인이 필요합니다. <a href='login.php'>로그인</a>";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $author = $_SESSION['username'];

    $stmt = $conn->prepare("INSERT INTO posts (title, content, author) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $author);

    if ($stmt->execute()) {
        echo "글 작성 완료! <a href='board.php'>게시판으로 이동</a>";
    }

    $stmt->close();
    $conn->close();
    exit;
}
?>

<h2>글쓰기</h2>
<form method="POST" action="write.php">
    제목: <input type="text" name="title" required><br><br>
    내용: <br>
    <textarea name="content" rows="10" cols="50" required></textarea><br><br>
    <button type="submit">작성</button>
</form>
