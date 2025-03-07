'use client';

import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

// Modal을 서버에서 미리 렌더링하지 않도록 설정
const Modal = dynamic(() => import('@/components/common/Modal'), {
  ssr: false,
});

export default function TermsModal({ content }: { content: string }) {
  return (
    <Modal>
      <div className="mt-6 max-h-[70vh] overflow-y-auto px-4 text-gray-800 dark:text-gray-300">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="mb-4 mt-6 text-center text-2xl font-bold">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h3 className="mb-3 mt-5 text-lg font-semibold">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-800 dark:text-gray-300">
                {children}
              </p>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal pl-5 text-gray-800 dark:text-gray-300">
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc pl-5 text-gray-800 dark:text-gray-300">
                {children}
              </ul>
            ),
            li: ({ children }) => <li className="ml-4">{children}</li>,
            hr: () => (
              <hr className="my-6 border-gray-300 dark:border-gray-700" />
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-black dark:text-white">
                {children}
              </strong>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Modal>
  );
}
