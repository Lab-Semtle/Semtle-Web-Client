import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { faqData } from '@/constants/faq';

const FAQ = () => (
  <section className="mx-auto mt-16 max-w-[800px] px-4">
    {/* 섹션 헤더 */}
    <div>
      <Label className="text-center text-2xl font-bold">FAQ</Label>
    </div>

    {/* Accordion */}
    <Accordion type="single" collapsible className="mt-6">
      {faqData.map((faq) => (
        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
          <AccordionTrigger className="text-lg font-medium hover:no-underline">
            {faq.faqQuestion}
          </AccordionTrigger>
          <AccordionContent className="mt-2 text-base">
            {faq.faqAnswer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQ;
