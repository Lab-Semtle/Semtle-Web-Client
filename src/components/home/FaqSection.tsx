// /** 메인 페이지 FAQ 섹션 */

// import {
//   Accordion,
//   AccordionItem,
//   AccordionContent,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import { faqData } from '@/constants/faq';

// const FaqSection = () => (
//   <section className="mx-auto mt-16 max-w-[800px] px-4">
//     {/* 섹션 헤더 */}
//     <h2 className="mx-auto text-center text-2xl font-bold">FAQ</h2>

//     {/* Accordion */}
//     <Accordion type="single" collapsible className="mt-6">
//       {faqData.map(({ id, faqQuestion, faqAnswer }) => (
//         <AccordionItem key={id} value={`item-${id}`}>
//           <AccordionTrigger className="text-lg font-medium hover:no-underline">
//             {faqQuestion}
//           </AccordionTrigger>
//           <AccordionContent className="mt-2 text-base">
//             {faqAnswer}
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   </section>
// );

// export default FaqSection;

/** 메인 페이지 FAQ 섹션 */

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/constants/faq';

const FaqSection = () => (
  <section className="mx-auto mt-24 max-w-[800px] px-4 py-12">
    {/* 섹션 헤더 */}
    <h2 className="mb-3 text-pretty text-center text-2xl font-semibold md:mb-4 md:text-3xl lg:mb-5 lg:text-4xl">
      FAQ
    </h2>

    {/* Accordion */}
    <Accordion type="single" collapsible className="mt-6">
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
