'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function TermsPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/docs/terms.md')
      .then((res) => res.text())
      .then((data) => setContent(data));
  }, []);

  return (
    <div className="relative flex justify-center">
      {/* 이용약관 본문 */}
      <main className="prose max-w-4xl flex-1 px-6 pb-28 pt-24 dark:prose-invert">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="mb-4 mt-16 text-center text-3xl font-bold">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h3 className="mb-2 mt-8 text-xl font-semibold">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-800 dark:text-gray-300">
                {children}
              </p>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-outside list-decimal pl-5 text-gray-800 dark:text-gray-300">
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-outside list-disc pl-5 text-gray-800 dark:text-gray-300">
                {children}
              </ul>
            ),
            li: ({ children }) => <li className="ml-4">{children}</li>,
            hr: () => (
              <hr className="my-8 border-gray-300 dark:border-gray-700" />
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
      </main>
    </div>
  );
}
