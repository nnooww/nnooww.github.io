<?php
session_start();
include 'db.php';

if (!isset($_SESSION['username'])) {
    echo "로그인이 필요합니다. <a href='login.php'>로그인</a>";
    exit;
}
?>

<h2>게시판</h2>
<a href="write.php">글쓰기</a>

<table border="1" cellpadding="10">
    <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>관리</th>
    </tr>

    <?php
    $sql = "SELECT id, title, author FROM posts ORDER BY id DESC";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>{$row['id']}</td>";
        echo "<td><a href='view.php?id={$row['id']}'>{$row['title']}</a></td>";
        echo "<td>{$row['author']}</td>";

        echo "<td>";
        if ($_SESSION['username'] === $row['author']) {
            echo "<a href='edit.php?id={$row["id"]}'>수정</a> | ";
            echo "<a href='delete.php?id={$row["id"]}' onclick=\"return confirm('삭제할까요?');\">삭제</a>";
        } else {
            echo "-";
        }
        echo "</td>";

        echo "</tr>";
    }
    ?>
</table>
