export const defaultEditorContent = {
  type: 'doc',
  content: [
    // 제목 (Heading)
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: '게시글 제목' }],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: '소제목 예시' }],
    },

    // 문단 (Paragraph)
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '이것은 일반 문단입니다.' }],
    },

    // 글자 스타일 (굵게, 기울임, 밑줄)
    {
      type: 'paragraph',
      content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '굵은 글씨 ' },
        { type: 'text', marks: [{ type: 'italic' }], text: '기울임 ' },
        { type: 'text', marks: [{ type: 'underline' }], text: '밑줄' },
      ],
    },

    // 리스트 (번호 목록, 불릿 목록)
    {
      type: 'orderedList',
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '첫 번째 항목' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '두 번째 항목' }],
            },
          ],
        },
      ],
    },
    {
      type: 'bulletList',
      attrs: { tight: true },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '불릿 리스트 항목 1' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '불릿 리스트 항목 2' }],
            },
          ],
        },
      ],
    },

    // 링크
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: '링크 예시: ' },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: { href: 'https://example.com', target: '_blank' },
            },
          ],
          text: '여기를 클릭',
        },
      ],
    },

    // 이미지
    {
      type: 'image',
      attrs: {
        src: 'https://example.com/image.png',
        alt: '이미지 설명',
        title: '이미지 제목',
        width: null,
        height: null,
      },
    },

    // 코드 블록
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: "console.log('Hello, World!');" }],
    },

    // 수식 (KaTeX)
    {
      type: 'math',
      attrs: { latex: 'E = mc^2' },
    },

    // 할 일 목록 (To-Do List)
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '해야 할 일 1' }],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: true },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '완료된 일' }],
            },
          ],
        },
      ],
    },

    // 수평선
    { type: 'horizontalRule' },

    // 트위터, 유튜브 삽입
    {
      type: 'twitter',
      attrs: { src: 'https://twitter.com/example/status/123456789' },
    },
    {
      type: 'youtube',
      attrs: { src: 'https://www.youtube.com/watch?v=example' },
    },
  ],
};
