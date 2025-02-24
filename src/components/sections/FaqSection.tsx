/** 메인 페이지 FAQ 섹션 */

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/constants/faq-items';

const FaqSection = () => (
  <section className="mx-auto mt-28 max-w-[800px] px-4">
    {/* 헤더 */}
    <h2 className="mb-4 text-pretty text-center text-3xl font-extrabold md:mb-5 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
      FAQ
    </h2>

    {/* Accordion */}
    <Accordion type="single" collapsible className="mt-12">
      {faqData.map(({ id, faqQuestion, faqAnswer }) => (
        <AccordionItem key={id} value={`item-${id}`}>
          <AccordionTrigger className="text-lg font-medium hover:no-underline">
            {faqQuestion}
          </AccordionTrigger>
          <AccordionContent className="mt-2 text-base">
            {faqAnswer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FaqSection;
