import {
  CharacterCount, // 글자 수 카운트 확장
  CodeBlockLowlight, // 코드 블록 문법 강조 (lowlight 사용)
  Color, // 텍스트 색상 지정 확장
  CustomKeymap, // 사용자 정의 키보드 단축키 설정
  GlobalDragHandle, // 드래그 핸들 (블록 요소를 드래그하여 이동 가능)
  HighlightExtension, // 텍스트 하이라이트 기능
  HorizontalRule, // 수평선 삽입 기능
  Mathematics, // 수식 입력 기능 (KaTeX 사용)
  Placeholder, // 빈 텍스트일 때 플레이스홀더 텍스트 표시
  StarterKit, // 기본적인 텍스트 편집 기능 (Bold, Italic, List 등 포함)
  TaskItem, // 체크박스 목록 (To-do List)
  TaskList, // 체크박스를 포함한 목록
  TextStyle, // 텍스트 스타일 지정 (폰트 크기, 굵기 등)
  TiptapImage, // 이미지 삽입 확장
  TiptapLink, // 링크 추가 확장
  TiptapUnderline, // 밑줄 기능 추가
  UpdatedImage, // 향상된 이미지 삽입 기능
  UploadImagesPlugin, // 이미지 업로드 핸들러
  Youtube, // 유튜브 영상 삽입 기능
} from 'novel'; // Novel에서 제공하는 확장 기능들 가져오기

import { cx } from 'class-variance-authority'; // Tailwind CSS 클래스 자동 완성을 위한 라이브러리
import { common, createLowlight } from 'lowlight'; // 코드 블록 문법 강조를 위한 lowlight 라이브러리

// 플레이스홀더 (빈 텍스트 필드에 가이드 텍스트 표시)
const placeholder = Placeholder;

// 링크 설정 (텍스트에 링크 추가)
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
    ), // Tailwind 클래스로 스타일 지정
  },
});

// 이미지 업로드 설정 (기본적인 이미지 삽입 기능)
const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg border border-stone-200'), // 업로드된 이미지 스타일 지정
      }),
    ];
  },
}).configure({
  allowBase64: true, // Base64 방식 허용 여부
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

// 개선된 이미지 확장 (일반 이미지보다 더 많은 기능 제공 가능)
const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

// 체크박스 목록 (To-do List)
const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2 '),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx('flex gap-2 items-start my-4'), // 체크박스 스타일 설정
  },
  nested: true, // 중첩된 체크리스트 허용
});

// 수평선(Horizontal Rule) 설정 (--- 입력 시 줄 추가됨)
const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground'),
  },
});

// 기본적인 텍스트 편집 기능 제공 (Bold, Italic, List 등)
const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2'), // 일반 목록 스타일
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2'), // 숫자 목록 스타일
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2'), // 목록 아이템 스타일
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-primary'), // 인용구 스타일
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium',
      ),
    }, // 코드 블록 스타일
  },
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    }, // 인라인 코드 스타일
  },
  horizontalRule: false, // 기본 수평선 기능 비활성화 (커스텀 설정 사용)
  dropcursor: {
    color: '#DBEAFE', // 드래그 커서 색상
    width: 4,
  },
  gapcursor: false, // 빈 공간에서 커서 이동 가능 여부
});

// 코드 블록 문법 강조 (lowlight 라이브러리 사용)
const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: createLowlight(common), // 기본적인 37개 언어 지원
});

// 유튜브 동영상 삽입 기능
const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
  inline: false, // 인라인 삽입 여부 (false면 블록 요소로 삽입됨)
});

// 수식 입력 기능 (KaTeX 지원)
const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cx('text-foreground rounded p-1 hover:bg-accent cursor-pointer'),
  },
  katexOptions: {
    throwOnError: false, // 수식 오류 발생 시 예외 처리 안 함
  },
});

// 글자 수 카운트 기능 (Character Count)
const characterCount = CharacterCount.configure();

// 확장 기능 목록 (Editor에서 사용할 확장 기능들 등록)
export const defaultExtensions = [
  starterKit, // 기본 텍스트 편집 기능
  placeholder, // 플레이스홀더
  tiptapLink, // 링크
  tiptapImage, // 기본 이미지 삽입
  updatedImage, // 개선된 이미지 삽입
  taskList, // 체크박스 리스트
  taskItem, // 체크박스 항목
  horizontalRule, // 수평선
  codeBlockLowlight, // 코드 블록 하이라이트
  youtube, // 유튜브 삽입
  mathematics, // 수식 삽입
  characterCount, // 글자 수 카운트
  TiptapUnderline, // 밑줄 기능
  HighlightExtension, // 텍스트 하이라이트
  TextStyle, // 텍스트 스타일 변경
  Color, // 텍스트 색상 지정
  CustomKeymap, // 키보드 단축키 설정
  GlobalDragHandle, // 블록 드래그 핸들
];
