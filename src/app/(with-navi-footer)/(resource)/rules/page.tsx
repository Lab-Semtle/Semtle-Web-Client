'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/tailwind-cn';
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function RulesPage() {
  const [content, setContent] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const sectionsRef = useRef<Record<string, HTMLHeadingElement | null>>({});

  // Markdown 파일 불러오기
  useEffect(() => {
    fetch('/rules.md')
      .then((res) => res.text())
      .then((data) => setContent(data));
  }, []);

  // 현재 보고 있는 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentSection = '';

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (element) {
          const offsetTop = element.offsetTop - 120;
          if (scrollPosition >= offsetTop) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    '제 1장 총칙',
    '제 2장 회원',
    '제 3장 구성기구',
    '제 4장 운영',
    '제 5장 재정',
    '제 6장 회칙 개정',
    '부칙',
  ];

  return (
    <div className="relative flex justify-center">
      {/* 회칙 본문 */}
      <main className="prose dark:prose-invert max-w-4xl flex-1 px-6 pt-24">
        <h1 className="mb-6 text-center text-4xl font-bold">📖 학회 회칙</h1>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2
                className="mb-4 mt-12 text-3xl font-bold"
                id={children?.toString()}
                ref={(el) => {
                  if (el) sectionsRef.current[children?.toString() || ''] = el;
                }}
              >
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h3 className="mb-2 mt-8 text-xl font-semibold">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-black dark:text-white">{children}</p>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-outside list-decimal text-black dark:text-white">
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc">{children}</ul>
            ),
            li: ({ children }) => <li className="ml-4">{children}</li>,
            hr: () => (
              <hr className="my-8 border-gray-300 dark:border-gray-700" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </main>

      {/* 우측 고정 메뉴 (ShadCN Card 컴포넌트) */}
      <div className="hidden lg:block">
        <Card className="sticky top-24 ml-8 w-64 rounded-xl bg-white shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-lg font-semibold">📜 목차</h2>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              {sections.map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className={cn(
                    'block rounded-md px-3 py-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800',
                    activeSection === section &&
                      'bg-gray-300 font-semibold dark:bg-gray-700',
                  )}
                >
                  {section}
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
