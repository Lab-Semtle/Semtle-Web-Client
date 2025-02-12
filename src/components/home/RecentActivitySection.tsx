// 'use client';

// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { Label } from '@/components/ui/label';
// import NewsDirector from '@/components/NewsDirector';
// // import ButtonLink from '@/components/ButtonLink';
// import { fetchLatestNews } from '@/app/api/activity/latest/utils';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';

// type NewsData = {
//   id?: number;
//   imageSrc: string;
//   newsTitle: string;
//   newsContent: string;
//   created_at?: string;
//   link_url?: string;
//   index: number;
// };

// const RecentActivitySection = () => {
//   const [news, setNews] = useState<NewsData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // const sortedNews = [...news].sort(
//   //   (a, b) =>
//   //     new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime(),
//   // );

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const data = await fetchLatestNews();
//         setNews(data);
//       } catch {
//         setError('Failed to load news');
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   //   const sortedNews = [...news].sort(
//   //     (a, b) =>
//   //       new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime(),
//   //   );

//   return (
//     <section className="mx-auto mt-16 max-w-[1200px] px-4">
//       <Label className="text-2xl font-bold">학회 소식 바로보기</Label>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="mt-8 space-y-6">
//           {news.map((item, index) => (
//             <NewsDirector key={index} {...item} />
//           ))}
//         </div>
//       )}
//       {/* {sortedNews.map((news, index) => (
//         <NewsDirector
//           key={news.id}
//           id={news.id}
//           {...news}
//           imageSrc={news.imageSrc}
//           newsTitle={news.newsTitle}
//           newsContent={news.newsContent}
//           index={index}
//         />
//       ))} */}
//       {/* <div className="mt-6 text-center">
//         <ButtonLink link="/activity" buttonName="더보기" />
//       </div> */}
//       <div className="mt-6 text-center">
//         <Button variant="ghost" className="w-full sm:w-auto" asChild>
//           <Link href="/activity">
//             학회 소식 더보기
//             <ArrowRight className="ml-2 size-4" />
//           </Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default RecentActivitySection;

// 'use client';

// import Image from 'next/image';
// import { ArrowRight } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '@/components/ui/card';

// interface NewsData {
//   id: string;
//   imageSrc: string;
//   newsTitle: string;
//   newsContent: string;
//   link_url: string;
// }

// interface ActivityPostsProps {
//   posts: NewsData[];
// }

// const RecentActivitySection = ({
//   posts = [
//     {
//       id: 'post-1',
//       imageSrc: '/1.jpg',
//       newsTitle: '첫 번째 뉴스 제목',
//       newsContent: '첫 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news1',
//     },
//     {
//       id: 'post-2',
//       imageSrc: '/2.jpg',
//       newsTitle: '두 번째 뉴스 제목',
//       newsContent: '두 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news2',
//     },
//     {
//       id: 'post-3',
//       imageSrc: '/3.jpg',
//       newsTitle: '세 번째 뉴스 제목',
//       newsContent: '세 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news3',
//     },
//   ],
// }: ActivityPostsProps) => {
//   return (
//     <section className="py-12">
//       <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
//         {/* 섹션 타이틀 */}
//         <h2 className="mb-0.5 text-pretty text-2xl font-semibold md:mb-1 md:text-3xl lg:mb-2 lg:max-w-3xl lg:text-4xl">
//           학회 소식 바로보기
//         </h2>

//         {/* 뉴스 카드 리스트 */}
//         <div className="flex w-full flex-col gap-6 md:gap-7">
//           {posts.map((post, index) => (
//             <Card
//               key={post.id}
//               className={`relative w-full max-w-[1000px] overflow-hidden border-none bg-transparent shadow-none md:flex ${
//                 index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
//               }`}
//             >
//               <div className="aspect-[16/9] h-full w-full flex-shrink-0 md:w-1/3">
//                 <a
//                   href={post.link_url}
//                   target="_blank"
//                   className="block transition-opacity duration-200 hover:opacity-70"
//                 >
//                   <Image
//                     src={post.imageSrc}
//                     alt={post.newsTitle}
//                     width={500}
//                     height={300}
//                     className="block h-full w-full rounded-lg object-cover md:rounded-xl"
//                   />
//                 </a>
//               </div>

//               <div className="relative flex w-full flex-col md:w-2/3">
//                 <CardHeader className="pb-2 md:pb-3">
//                   <h3 className="text-[1.35rem] font-semibold text-foreground md:text-[1.5rem]">
//                     <a
//                       href={post.link_url}
//                       target="_blank"
//                       className="hover:underline"
//                     >
//                       {post.newsTitle}
//                     </a>
//                   </h3>
//                 </CardHeader>

//                 <CardContent className="py-2 md:py-3">
//                   <p className="text-black dark:text-gray-200">
//                     {post.newsContent}
//                   </p>
//                 </CardContent>

//                 <CardFooter
//                   className={`absolute bottom-0 ${
//                     index % 2 !== 0 ? 'left-4' : 'right-4'
//                   }`}
//                 >
//                   <a
//                     href={post.link_url}
//                     target="_blank"
//                     className="flex items-center text-primary hover:underline"
//                   >
//                     더보기
//                     <ArrowRight className="ml-2 size-4" />
//                   </a>
//                 </CardFooter>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentActivitySection;

// 'use client';

// import Image from 'next/image';
// import { ArrowRight } from 'lucide-react';
// import { FadeUp } from '@/components/animation/FadeUp';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '@/components/ui/card';

// interface NewsData {
//   id: string;
//   imageSrc: string;
//   newsTitle: string;
//   newsContent: string;
//   link_url: string;
// }

// interface ActivityPostsProps {
//   posts: NewsData[];
// }

// const RecentActivitySection = ({
//   posts = [
//     {
//       id: 'post-1',
//       imageSrc: '/1.jpg',
//       newsTitle: '첫 번째 뉴스 제목',
//       newsContent: '첫 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news1',
//     },
//     {
//       id: 'post-2',
//       imageSrc: '/2.jpg',
//       newsTitle: '두 번째 뉴스 제목',
//       newsContent: '두 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news2',
//     },
//     {
//       id: 'post-3',
//       imageSrc: '/3.jpg',
//       newsTitle: '세 번째 뉴스 제목',
//       newsContent: '세 번째 뉴스의 간단한 내용 요약입니다.',
//       link_url: 'https://example.com/news3',
//     },
//   ],
// }: ActivityPostsProps) => {
//   return (
//     <section className="py-12">
//       <div className="container mx-auto flex flex-col items-center gap-12 lg:px-16">
//         {/* 섹션 타이틀 */}
//         <h2 className="mb-2 text-pretty text-2xl font-semibold md:mb-3 md:text-3xl lg:mb-4 lg:max-w-3xl lg:text-4xl">
//           학회 소식 바로보기
//         </h2>

//         {/* 뉴스 카드 리스트 */}
//         <div className="flex w-full flex-col gap-8 md:gap-10">
//           {posts.map((post) => (
//             <Card
//               key={post.id}
//               className="relative w-full max-w-[1000px] overflow-hidden border-none bg-transparent shadow-none md:flex md:flex-row"
//             >
//               <div className="aspect-[16/9] h-full w-full flex-shrink-0 md:w-1/3">
//                 <a
//                   href={post.link_url}
//                   target="_blank"
//                   className="block transition-opacity duration-200 hover:opacity-70"
//                 >
//                   <Image
//                     src={post.imageSrc}
//                     alt={post.newsTitle}
//                     width={500}
//                     height={300}
//                     className="block h-full w-full rounded-lg object-cover md:rounded-xl"
//                   />
//                 </a>
//               </div>

//               <div className="relative flex w-full flex-col md:w-2/3">
//                 <CardHeader className="pb-3 md:pb-4">
//                   <h3 className="text-[1.45rem] font-semibold text-foreground md:text-[1.6rem]">
//                     <a
//                       href={post.link_url}
//                       target="_blank"
//                       className="hover:underline"
//                     >
//                       {post.newsTitle}
//                     </a>
//                   </h3>
//                 </CardHeader>

//                 <CardContent className="pb-4 md:pb-5">
//                   <p className="text-black dark:text-gray-200">
//                     {post.newsContent}
//                   </p>
//                 </CardContent>

//                 <CardFooter className="flex justify-end pb-2 md:pb-4">
//                   <a
//                     href={post.link_url}
//                     target="_blank"
//                     className="flex items-center text-primary hover:underline"
//                   >
//                     더보기
//                     <ArrowRight className="ml-2 size-4" />
//                   </a>
//                 </CardFooter>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentActivitySection;

'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FadeUp } from '@/components/animation/FadeUp'; // ✅ FadeUp 애니메이션 추가
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface NewsData {
  id: string;
  imageSrc: string;
  newsTitle: string;
  newsContent: string;
  link_url: string;
}

interface ActivityPostsProps {
  posts: NewsData[];
}

const RecentActivitySection = ({
  posts = [
    {
      id: 'post-1',
      imageSrc: '/1.jpg',
      newsTitle: '첫 번째 뉴스 제목',
      newsContent: '첫 번째 뉴스의 간단한 내용 요약입니다.',
      link_url: 'https://example.com/news1',
    },
    {
      id: 'post-2',
      imageSrc: '/2.jpg',
      newsTitle: '두 번째 뉴스 제목',
      newsContent: '두 번째 뉴스의 간단한 내용 요약입니다.',
      link_url: 'https://example.com/news2',
    },
    {
      id: 'post-3',
      imageSrc: '/3.jpg',
      newsTitle: '세 번째 뉴스 제목',
      newsContent: '세 번째 뉴스의 간단한 내용 요약입니다.',
      link_url: 'https://example.com/news3',
    },
  ],
}: ActivityPostsProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col items-center gap-12 lg:px-16">
        <h2 className="mb-2 text-pretty text-2xl font-semibold md:mb-3 md:text-3xl lg:mb-4 lg:max-w-3xl lg:text-4xl">
          Recent News
        </h2>

        {/* 뉴스 카드 리스트 */}
        <div className="flex w-full flex-col gap-8 md:gap-10">
          {posts.map((post, index) => (
            <FadeUp key={post.id} delay={index * 0.2}>
              <Card className="relative w-full max-w-[1000px] overflow-hidden border-none bg-transparent shadow-none md:flex md:flex-row">
                <div className="aspect-[16/9] h-full w-full flex-shrink-0 md:w-1/3">
                  <a
                    href={post.link_url}
                    target="_blank"
                    className="block transition-opacity duration-200 hover:opacity-70"
                  >
                    <Image
                      src={post.imageSrc}
                      alt={post.newsTitle}
                      width={500}
                      height={300}
                      className="block h-full w-full rounded-lg object-cover md:rounded-xl"
                    />
                  </a>
                </div>

                <div className="relative flex w-full flex-col md:w-2/3">
                  <CardHeader className="pb-3 md:pb-4">
                    <h3 className="text-[1.45rem] font-semibold text-foreground md:text-[1.6rem]">
                      <a
                        href={post.link_url}
                        target="_blank"
                        className="hover:underline"
                      >
                        {post.newsTitle}
                      </a>
                    </h3>
                  </CardHeader>

                  <CardContent className="pb-4 md:pb-5">
                    <p className="text-black dark:text-gray-200">
                      {post.newsContent}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-end pb-2 md:pb-4">
                    <a
                      href={post.link_url}
                      target="_blank"
                      className="flex items-center text-primary hover:underline"
                    >
                      더보기
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </CardFooter>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivitySection;
