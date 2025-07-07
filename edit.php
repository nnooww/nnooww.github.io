<?php
include 'db.php';
$id = $_GET['id'];

$result = $conn->query("SELECT * FROM posts WHERE id = $id");
$row = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $conn->query("UPDATE posts SET title='$title', content='$content' WHERE id = $id");
    header("Location: board.php");
    exit;
}
?>

<h2>글 수정</h2>
<form method="POST">
    제목: <input type="text" name="title" value="<?= $row['title'] ?>"><br><br>
    내용:<br>
    <textarea name="content" rows="10" cols="50"><?= $row['content'] ?></textarea><br><br>
    <button type="submit">수정 완료</button>
</form>
