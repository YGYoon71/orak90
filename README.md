# Pixel Arcade

브라우저에서 개인 보유 아케이드 게임 파일을 실행하는 정적 웹사이트입니다.

## 실행

GitHub Pages 또는 로컬 웹 서버로 `index.html`을 제공하세요. `file://`로 직접 여는 대신 HTTP(S)로 접속해야 브라우저와 에뮬레이터 리소스가 안정적으로 동작합니다.

`index.html`, `styles.css`, `app.js`를 같은 경로에 배치하면 됩니다. EmulatorJS의 안정 버전 CDN과 Google Fonts를 사용하므로 실행 시 인터넷 연결이 필요합니다.

## 게임 실행

플레이어의 **게임 파일 선택** 버튼에서 MAME 호환 ROM 파일을 선택하세요. 파일은 브라우저에서 임시로 읽으며 사이트 서버로 업로드하지 않습니다. ROM 세트와 MAME 코어의 버전이 맞아야 합니다. EmulatorJS의 MAME 코어는 모든 세대의 MAME ROM을 지원하지 않을 수 있습니다.

이 프로젝트는 게임 ROM, BIOS 또는 기타 저작권 파일을 제공하지 않습니다. 보유 및 사용 권한이 있는 게임 파일만 사용하세요.

## GitHub Pages 배포

저장소의 `main` 또는 `master` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 사이트를 자동 배포합니다.

1. 이 파일들을 GitHub 저장소에 푸시하세요.
2. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택하세요.
3. **Actions** 탭에서 `Deploy site to GitHub Pages` 실행이 완료되면 공개된 Pages 주소를 확인하세요.

이 저장소는 현재 GitHub 원격 저장소와 연결되어 있지 않습니다. 공개 저장소에 게임 파일은 올리지 마세요.
