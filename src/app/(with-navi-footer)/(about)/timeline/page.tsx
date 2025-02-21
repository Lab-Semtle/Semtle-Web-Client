import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TimelineData } from '@/constants/TimelineData';
import type { TimelineElement } from '@/types/timeline';

// 연도별 그룹화 유틸함수
function groupByYear(
  timelineData: TimelineElement[],
): Record<number, TimelineElement[]> {
  return timelineData.reduce<Record<number, TimelineElement[]>>((acc, item) => {
    const year = new Date(item.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
}

export default function HistoryPage() {
  const groupedData = groupByYear(TimelineData); // 연도별 그룹화

  return (
    <main className="flex flex-col items-center px-6 pt-32">
      {Object.keys(groupedData)
        .map(Number)
        .sort((a, b) => b - a)
        .map((year) => (
          <section key={year} className="mb-16 w-full max-w-5xl">
            <h2 className="relative mb-6 flex items-center justify-center text-4xl font-extrabold">
              <span className="mr-2 h-5 w-5 rounded-full bg-blue-500"></span>
              {year}
            </h2>

            <Carousel>
              <CarouselContent className="-ml-2 max-w-4xl md:-ml-4">
                {groupedData[year].map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <div className="flex aspect-square flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-md">
                      <span className="text-center text-lg font-semibold text-black">
                        {item.title}
                      </span>
                      <p className="mt-2 text-center text-gray-900">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-3rem] top-1/2 -translate-y-1/2 transform bg-blue-300 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-400" />
              <CarouselNext className="absolute right-[-3rem] top-1/2 -translate-y-1/2 transform bg-blue-300 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-400" />
            </Carousel>
          </section>
        ))}
    </main>
  );
}
