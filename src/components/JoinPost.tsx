import Image from 'next/image';
import { Label } from '@/components/ui/label';
import ButtonLink from '@/components/ButtonLink';

const JoinPost = () => (
  <section className="mx-auto mt-16 max-w-[800px] px-4 text-center">
    <Label className="mb-4 text-2xl font-bold">학회 가입 및 문의</Label>
    <div className="relative">
      <Image
        src="/test1.jpg"
        alt="Join Image"
        width={1000}
        height={150}
        className="rounded-lg"
      />
      <div className="mt-6">
        <ButtonLink link="/recruit" buttonName="가입하기" />
      </div>
    </div>
  </section>
);

export default JoinPost;
