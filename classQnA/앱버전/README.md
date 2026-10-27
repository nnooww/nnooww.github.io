# 수업 질문 대기열 Windows 앱

[Windows 앱 ZIP 바로 다운로드](https://github.com/nnooww/nnooww.github.io/releases/download/classqna-app-v0.2.0/ClassQnA-Windows-x64-v0.2.0.zip). 압축을 풀고 `ClassQnA-win32-x64/ClassQnA.exe`를 실행하세요. 실행 파일만 따로 빼면 동작하지 않습니다.

앱은 기존 Railway 서버에 접속합니다. 학생과 선생님이 여러 PC에서 같은 질문·답변 DB를 사용하며, 화면은 3초마다 새 내용을 확인합니다. 인터넷과 Railway 서버가 켜져 있어야 합니다. 앱 자체 업데이트는 자동으로 되지 않으므로 새 버전은 새 ZIP을 받아야 합니다.

이 폴더는 Windows 앱 소스입니다. Node.js 22.12 이상에서 `npm ci` 후 `npm run package:win`으로 다시 만들 수 있습니다. GitHub Pages에서는 이 서버형 앱이 실행되지 않습니다.

현재 공개 서버에는 시연용 계정 설정이 남아 있습니다. 실제 학급 데이터를 쓰기 전 선생님 비밀번호와 학생 가입 정책을 서버에서 정비해야 합니다.

