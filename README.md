# **Archi Semtle Web Dev** (FE)

## 📝 **프로젝트 소개**

...

## 🚀 **주요 기능**

...

## 📂 **프로젝트 구조**

```plaintext
/
├── public/                 # 정적 파일 (이미지, 폰트 등)
├── src/                    # 소스 코드 모음
│   ├── app/                    # 페이지 UI 코드
│   │   ├── (with-navi-footer)/ # 네비게이션바, 푸터 레이아웃 필요한 페이지 모음
│   │   ├── admin/              # 관리자 페이지 모음
│   │   ├── api/                # Next Auth 설정, Next Routes 활용 API 로직
│   │   ├── font/               # 폰트 파일
│   │
│   ├── components/         # 재사용 가능한 UI 컴포넌트 모음
│   │   ├── animation/          # 애니메이션 관련 컴포넌트 모음
│   │   ├── forms/              # 입력 폼 컴포넌트 모음
│   │   ├── layouts/            # 레이아웃 컴포넌트 모음
│   │   ├── test/               # msw 목업 용
│   │
│   ├── constants/          # 정적 페이지 데이터, 컴포넌트에 사용되는 정적 데이터 모음
│   ├── hooks/              # 상태 관리, 비즈니스 로직 모음
│   ├── lib/                # 상태 관리, 비즈니스 로직 모음
│   │   ├── api/                    # fetch API Client 관련 설정
│   │   ├── auth/                   # Next Auth 관련 로직 및 미들웨어
│   │   ├── auth/                   # 기타 유틸리티 함수
│   │   ├── validation/             # 유효성 검증 관련 스키마
│   │
│   ├── mocks/              # 목업 API 관련 파일
│   │   ├── config/             # MSW 설정 파일
│   │   ├── test/               # 목업 API 모음
│   │
│   ├── types/              # TypeScript 타입 정의
|
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

...

## 배포 전 확인 필요

- src/lib/auth/middleware.ts
