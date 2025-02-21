import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PostCarouselProps {
  imageUrls: string[]; // 이미지 URL 배열을 받아올 프로퍼티
}

function PostCarousel({ imageUrls }: PostCarouselProps) {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <Image
            src={imageUrls[i]} // 올바른 이미지 경로를 확인해주세요.
            alt={`Thumbnail ${i + 1}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Slider {...settings} className="h-[500px] w-[500px]">
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <div className="relative h-[500px] w-full">
              <Image
                src={imageUrl}
                alt={`Post Image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PostCarousel;
