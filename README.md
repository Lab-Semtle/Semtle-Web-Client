# **Archi Semtle Web Dev** (FE)

## 📝 **프로젝트 소개**

...

## 🚀 **주요 기능**

...

## 📂 **프로젝트 구조**

```plaintext
/
├── .vscode/           # VSCode 환경 설정
│   ├── settings.json  # VSCode 특정 프로젝트 설정 (예: 포맷터, 들여쓰기 등)
|
├── documents/         # README 모음
├── public/            # 정적 파일 (이미지, 폰트 등)
├── src/               # 소스 코드
│   ├── app/           # Next.js App Router 관련 파일
│   │   ├── about/                  # [About] "소개" 페이지
│   │   │   ├── page.tsx                # /about 경로의 컴포넌트
│   │   ├── activities/             # [Activity] "활동" 페이지
│   │   ├── executive/              # [Profile] "관리자" 페이지
│   │   ├── history/                # [About] "History" 페이지
│   │   ├── login/                  # [로그인] 페이지
│   │   ├── mypage/                 # [Profile] "마이페이지" 디렉토리
│   │   ├── organization/           # [About] "조직도" 페이지
│   │   ├── projects/               # [Activity] 프로젝트 페이지 관련 디렉토리
│   │   │   ├── page.tsx            # /projects 경로의 메인 페이지
│   │   │   ├── completed/              # 완료된 프로젝트 관련 디렉토리
│   │   │   │   ├── [projectID]/            # 동적 경로: 특정 완료된 프로젝트 상세 페이지
│   │   │   │       ├── page.tsx            # /projects/completed/:projectID
│   │   │   ├── recruit/                # 프로젝트 모집 관련 디렉토리
│   │   │       ├── [projectID]/            # 동적 경로: 특정 모집 프로젝트 상세 페이지
│   │   │           ├── page.tsx            # /projects/recruit/:projectID
│   │   ├── recruiting/             # [가입안내] 페이지
│   │   ├── regulations/            # [자료실] "학회회칙" 페이지
│   │   ├── schedule/               # [Activity] "학회일정" 페이지
│   │   ├── secret/                 # [자료실] "Secret 노트" 페이지
│   │   ├── fonts/                  # 웹폰트 관련 파일
│   │   ├── favicon.ico             # 웹사이트의 파비콘 설정 파일
│   │   ├── global-error.tsx        # 전역 에러 페이지 (에러 발생 시 보여질 컴포넌트)
│   │   ├── layout.tsx              # 공통 레이아웃 (Header, Footer 포함)
│   │   ├── not-found.tsx           # 404 Not Found 페이지
│   │   ├── page.tsx                # 메인 홈 페이지 ("/" 경로)
│   ├── components/                 # 재사용 가능한 UI 컴포넌트 디렉토리
│   │   ├── Button.tsx                  # 재사용 가능한 버튼 컴포넌트
│   │   ├── Footer.tsx                  # 하단 공통 Footer 컴포넌트
│   │   ├── Header.tsx                  # 상단 공통 Header 컴포넌트
│   │   ├── Loader.tsx                  # 로딩 애니메이션 컴포넌트
│   │   ├── Navigation.tsx              # 네비게이션 바 컴포넌트
│   ├── styles/                     # 전역 스타일 관리
│   │   ├── global.css                  # 프로젝트 전역 스타일 파일
│   ├── types/                      # TypeScript 타입 정의 디렉토리
│   │   ├── api.ts                      # API 요청/응답에 사용되는 타입 정의
│   │   ├── props.ts                    # 컴포넌트 Props에 사용되는 타입 정의
│   ├── utils/                      # 유틸리티 함수 디렉토리
│       ├── api.ts                      # API 호출 관련 함수
|
├── .gitattributes     # Git 속성 관리 (예: 줄바꿈 설정, 파일 속성 제어)
├── .gitignore         # Git에 포함하지 않을 파일 설정
├── .prettierrc        # Prettier 코드 포맷터 설정 파일
├── eslintrc.json      # ESLint 설정 파일
├── next-env.d.ts      # TypeScript Next.js 환경 정의
├── next.config.ts     # Next.js 설정 파일
├── package-lock.json  # 패키지 잠금 파일
├── package.json       # 프로젝트 정보 및 의존성 관리
├── postcss.config.mjs # PostCSS 설정 파일
├── README.md          # 프로젝트 소개 문서
├── tailwind.config.ts # TailwindCSS 설정 파일
├── tsconfig.json      # TypeScript 설정 파일
```

## 🔧 **설치 및 실행**

### 1. **프로젝트 가져오기**

```bash
git clone https://github.com/Lab-Semtle/semtle-web-client-0.2.git
```

### 2. **브랜치 분기**

```bash
git checkout -b feature/#[이슈번호]
git push origin feature/#[이슈번호]
```

### 3. **패키지 설치**

```bash
npm install
```

### 4. **개발 서버 실행**

```bash
npm run dev
```

- 실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🌟 **기술 스택**

...

## 📜 **스크립트**

...

## 🛠️ **환경 변수 설정**

프로젝트의 민감한 정보를 관리하기 위해 `.env` 파일을 사용합니다.

### `.env.example`

```plaintext
API_URL=
DATABASE_URL=
NEXT_PUBLIC_API_KEY=
```

- `.env` 파일을 작성한 후, 위의 형식에 맞게 정보를 추가하세요.
- `.env` 파일은 `.gitignore`에 포함되어야 합니다.

## 🧑 **TEAM**

...

## 🔗 **참고 자료**

...

## 🐞 **문제 및 개선 사항**

- 배포 후 네이버지도 api 도메인주소 변경해야함.
  ...
