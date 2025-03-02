'use client';
import { defaultEditorContent } from '@/constants/DefaultEditorContent'; // 기본 에디터 초기값 (저장된 내용이 없을 때 사용)
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  EditorBubble,
  ImageResizer,
  type JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from 'novel'; // Novel 에디터 관련 기본 컴포넌트 및 기능
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'; // 입력값이 변경될 때마다 업데이트를 지연시키는 기능 (최적화 목적)
import { defaultExtensions } from '@/components/editor/NovelExtensions';
import { ColorSelector } from '@/components/editor/ColorSelector';
import { LinkSelector } from '@/components/editor/LinkSelector';
import { MathSelector } from '@/components/editor/MathSelector';
import { NodeSelector } from '@/components/editor/NodeSelector';
import { uploadFn } from '@/components/editor/ImageUpload'; // 이미지 업로드 핸들러
import { TextButtons } from '@/components/editor/TextButtons';
import {
  slashCommand,
  suggestionItems,
} from '@/components/editor/SlashCommand'; // 슬래시 명령어 확장

const hljs = require('highlight.js'); // 코드 블록 하이라이트 라이브러리

// 에디터 확장 기능을 포함한 배열
const extensions = [...defaultExtensions, slashCommand];

const NovelEditor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );
  const [saveStatus, setSaveStatus] = useState('Saved'); // 저장 상태 표시
  const [charsCount, setCharsCount] = useState(); // 단어 개수 카운트

  // UI 상태값 관리
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  // 코드 블록 하이라이팅 적용 (Tiptap 에디터 HTML을 변환)
  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    doc.querySelectorAll('pre code').forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el); // 코드 블록 하이라이트 적용
    });
    return new XMLSerializer().serializeToString(doc);
  };

  // 입력이 멈춘 후 일정 시간 후 업데이트 (디바운스)
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON(); // 에디터 내용을 JSON 형태로 저장
      setCharsCount(editor.storage.characterCount.words()); // 단어 개수 업데이트

      // HTML 내용 저장
      window.localStorage.setItem(
        'html-content',
        highlightCodeblocks(editor.getHTML()),
      );

      // JSON 저장
      window.localStorage.setItem('novel-content', JSON.stringify(json));

      setSaveStatus('Saved'); // 저장 상태 업데이트
    },
    500,
  );

  // 로컬 저장소에서 기존 에디터 내용을 불러오기
  useEffect(() => {
    const content = window.localStorage.getItem('novel-content');
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      {/* 저장 상태 및 단어 개수 표시 */}
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'
              : 'hidden'
          }
        >
          {charsCount} Words
        </div>
      </div>

      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-0 sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus('Unsaved');
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl">
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <TextButtons />
            <MathSelector />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>

          {/* 슬래시 명령어 UI */}
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default NovelEditor;
