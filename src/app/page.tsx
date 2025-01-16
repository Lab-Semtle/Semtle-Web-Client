'use client';
import Image from 'next/image';
import Link from 'next/link';
// pages/index.tsx
//import Navigation from '@/components/Navigation';
//import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
// import {
//   IoIosArrowForward,
//   IoIosArrowBack,
//   IoIosArrowUp,
//   IoIosArrowDown,
// } from 'react-icons/io';


const FAQSection = () => {
  const faqs = [
    {
      question: '대회 수상 소식은 어디에서 확인할 수 있나요?',
      answer:
        '대회 수상 소식은 학회의 공식 웹사이트와 소셜 미디어 채널에서 확인 가능합니다.',
    },
    {
      question: '학회 세미나는 언제 시작되나요?',
      answer:
        '학회 세미나는 매 학기 초에 시작되며, 세미나 일정은 학회 웹사이트에서 확인할 수 있습니다.',
    },
    {
      question: '신입 학회원 모집은 어떻게 진행되나요?',
      answer:
        '신입 학회원 모집은 매년 초에 진행되며, 자세한 정보는 학회 공지를 통해 안내됩니다.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <div
              className="relative cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className="text-lg font-semibold">{faq.question}</p>
              {/* {openIndex === index ? (
                <IoIosArrowUp
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 transform"
                />
              ) : (
                <IoIosArrowDown
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 transform"
                />
              )} */}
            </div>
            {openIndex === index && (
              <div className="mt-1 text-gray-600" style={{ fontSize: '12px' }}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const midImageStyle = {
    width: '100%' as const,
    height: '200px' as const,
    objectFit: 'cover' as const,
  };
  const slides = [
    { image: '/1.jpg' },
    { image: '/2.jpg' },
    { image: '/3.jpg' },
    { image: '/4.jpg' },
  ];
  const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }, [current, length]);

    if (!Array.isArray(slides) || slides.length <= 0) {
      return null;
    }

    return (
      <div className="imageSlider">
        {/* <IoIosArrowBack
          className="imageSlider-arrow left"
          size="30"
          onClick={prevSlide}
        />
        <IoIosArrowForward
          className="imageSlider-arrow right"
          size="30"
          onClick={nextSlide}
        /> */}
        {slides.map((slide, index) => (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <Image
                src={slide.image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        ))}
      </div>
    );
  };
  const topPosts = [
    {
      id: 1,
      title: '학회 세미나 시작 안내',
      content:
        '2025년 첫 학기, 아치 셈틀에서는 다양한 기술 세미나를 시작합니다. 이번 세미나에서는 최신 기술 트렌드와 함께, 참가자들이 실질적으로 적용할 수 있는 주제들을 다룰 예정입니다. 참여를 원하는 분들은 선착순으로 신청 가능하며, 많은 관심 부탁드립니다.',
      image: '/1.jpg',
      views: 120,
    },
    {
      id: 2,
      title: '대회 수상 소식',
      content:
        '우리 학회는 최근 진행된 전국 대학생 프로그래밍 대회에서 우수한 성과를 거두었습니다. 참가자들은 치열한 경쟁 속에서 창의적인 해결책을 제시하며, 우리 학회의 기술적 역량을 다시 한번 입증했습니다. 앞으로도 다양한 대회에 참여하여 더 많은 성과를 이루어 나갈 예정입니다.',
      image: '/2.jpg',
      views: 250,
    },
    {
      id: 3,
      title: '신입 학회원 모집',
      content:
        '2025년도 아치 셈틀 신입 학회원 모집이 시작되었습니다! 기술을 사랑하고, 다양한 사람들과 협력하며 성장하고 싶은 분들을 기다립니다. 회원으로서 참여할 수 있는 다양한 세미나, 프로젝트, 대회 활동들이 준비되어 있습니다. 새로운 도전과 기회를 함께 만들어갈 여러분을 초대합니다.',
      image: '/3.jpg',
      views: 180,
    },
  ];

  // 조회수 상위 3개의 게시글 추출
  const sortedPosts = topPosts.sort((a, b) => b.views - a.views).slice(0, 3);
  return (
    <div>
      {/* 내비게이션 */}
      {/* <Navigation /> */}
      {/* 본문 */}
      <ImageSlider slides={slides} />
      <div className="aboutSemtle">
        <p className="aboutSemtleWord">Arch Semtle</p>
        <div className="aboutSemtleIntro">
          <p>
            아치 셈틀은 다양한 기술과 아이디어를 탐구하며, 함께 성장하는 것을
            목표로 하는 학회입니다.
          </p>
          <p>
            팀 프로젝트와 세미나를 통해 지식을 나누고, 새로운 가능성을 발견하는
            기회를 제공합니다.
          </p>
        </div>
      </div>

      <div className="rectangle-container">
        <div className="rectangle-item">
          <div className="rectangle-image">
            <img src="/example1.jpg" alt="Example Image 1" />
          </div>
          <div className="rectangle-text">
            <p>
              매 학기 20여개에 이르는 다양한 분야의 세션과 스터디를 통해 서로
              가르치고 배우며 여러 컴퓨터 분야에 대한 지식을 넓힐 수 있습니다.
            </p>
          </div>
          <div className="rectangle-caption">
            <p>세미나 & 스터디</p>
          </div>
        </div>

        <div className="rectangle-item">
          <div className="rectangle-image">
            <img src="/example2.jpg" alt="Example Image 2" />
          </div>
          <div className="rectangle-text">
            <p>
              우리는 다양한 대회와 프로젝트에 참여하여 기술적 역량을 키우고,
              실제 문제를 해결하는 경험을 쌓고 있습니다.
            </p>
          </div>
          <div className="rectangle-caption">
            <p>대회 & 프로젝트</p>
          </div>
        </div>

        <div className="rectangle-item">
          <div className="rectangle-image">
            <img src="/example3.jpg" alt="Example Image 3" />
          </div>
          <div className="rectangle-text">
            <p>
              컴퓨터라는 같은 관심사를 가진 사람들끼리 모여 소통하고, 친목조나
              뒷풀이 등의 다양한 친목활동을 통해 화목한 동아리생활을 즐길 수
              있습니다.
            </p>
          </div>
          <div className="rectangle-caption">
            <p>커뮤니케이션</p>
          </div>
        </div>

        <div className="rectangle-item">
          <div className="rectangle-image">
            <img src="/example4.jpg" alt="Example Image 4" />
          </div>
          <div className="rectangle-text">
            <p>
              해커톤, 게임잼 등의 다양한 행사가 열리고 있으며, 팀을 꾸려 대회에
              나가거나 프로젝트를 통해 결과물을 만들어내는 활동 또한 활발하게
              이어지고 있습니다.
            </p>
          </div>
          <div className="rectangle-caption">
            <p>기타 활동</p>
          </div>
        </div>
      </div>
      <div className="ArchSemtleNewsDirect">
        <p>학회 소식 바로보기</p>
        <div className="Post">
          {sortedPosts.map((post) => (
            <div key={post.id} className="postItem">
              <div className="postImage">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="postContent">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Link
              href="/activities"
              className="inline-block rounded-full bg-gray-400 px-6 py-2 font-semibold text-black transition-all hover:bg-gray-500"
            >
              소식 더보기 {'->'}
            </Link>
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/midImage.jpeg"
          alt="Web middle Image"
          width={500}
          height={500}
          style={midImageStyle}
        />
      </div>
      <div className="ArchSemtleFAQ">
        <p>FAQ</p>
        <FAQSection />
      </div>

      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <p className="text-xl font-semibold">학회 가입 및 문의</p>
        <Image
          src="/test1.jpg"
          alt="Join Image"
          width={1000}
          height={150}
          style={{ width: '1000px', height: '150px' }}
        />
        <div className="flex w-full justify-center">
          {' '}
          {/* 이 부분에서 가운데 정렬 */}
          <button
            className="rounded-full bg-gray-400 px-6 py-2 font-semibold text-black transition-all hover:bg-gray-500"
            // ml-12를 사용해서 오른쪽으로 약간 밀기
          >
            Join {'->'}
          </button>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
