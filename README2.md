# 천안시 청년정책 인터랙티브 웹 프레젠테이션

원본 PowerPoint **12장**의 디자인, 그림, 텍스트, 카드, 인포그래픽을 WebP 이미지로 충실하게 보존하고 HTML/CSS/JavaScript로 내비게이션을 더한 정적 웹사이트입니다.

## 배포 — GitHub Pages

1. ZIP 압축을 해제한 **cheonan-youth-web** 폴더의 모든 파일을 GitHub 저장소의 루트에 업로드합니다. (`index.html`이 루트에 있어야 합니다.)
2. GitHub 저장소 → **Settings → Pages → Build and deployment** 에서 **Deploy from a branch**를 선택합니다.
3. Branch를 `main`, 폴더를 `/(root)`로 설정하여 Save합니다.
4. `https://<username>.github.io/<repository>/`에서 접속합니다. (사용자 계정/저장소명에 맞게 수정)

## 기능

- 12개 슬라이드: PPT 화면의 디자인을 손실 없이 고해상도 WebP로 제공
- 전환 애니메이션, 우측/좌측 클릭 영역, 이전/다음 버튼, 목차 및 썸네일
- 키보드 `←`/`→`, `PageUp`/`PageDown`, `Home`/`End`, `Space`
- 터치 좌우 스와이프, 슬라이드 위 휠 이동, URL 앵커(`/#slide-5`)
- 전체화면 및 모바일 확대 보기, 반응형 레이아웃, 동작 감소 접근성 설정
- 천안시·충남청년포털 공식 링크

## 파일 구조

- `index.html` : 페이지 기본 구조
- `styles.css` : 반응형 디자인과 전환 애니메이션
- `app.js` : 내비게이션/터치/키보드 인터랙션
- `slides.json` : 12장 전체 제목·설명·텍스트 정보 (검색 및 접근성 대체 텍스트)
- `assets/slides/*.webp` : 원본 고해상도 슬라이드 이미지
- `assets/thumbs/*.webp` : 탐색용 썸네일

## 실행 주의

`slides.json`은 `fetch`로 로드되므로 일부 브라우저에서 로컬 `file://` 직접 열기는 보안 정책 때문에 차단될 수 있습니다. GitHub Pages에서는 정상 동작합니다. 로컬 확인 시 폴더에서 `python -m http.server 8000` 실행 후 `http://localhost:8000`으로 접속합니다.

## 원본 정보 및 한계

원본 이미지 속 텍스트, 그래픽과 카드 배치는 그대로 보존하되, 슬라이드 내부 각 텍스트와 그래픽을 개별 HTML 객체로 재구성하지는 않았습니다. 원본의 정책 안내 중 지원조건과 신청기간 등은 해당 사업의 최신 공식 공고에서 확인해야 합니다.
