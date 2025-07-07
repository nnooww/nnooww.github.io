<?php
include 'db.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    die("글 번호가 없습니다.");
}

$stmt = $conn->prepare("SELECT title, content, author, created_at FROM posts WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($title, $content, $author, $created_at);

if ($stmt->fetch()) {
    echo "<h2>{$title}</h2>";
    echo "<p>작성자: {$author} | 작성일: {$created_at}</p>";
    echo "<hr>";
    echo nl2br(htmlspecialchars($content));
} else {
    echo "글을 찾을 수 없습니다.";
}

$stmt->close();
$conn->close();
?>
