import { SiInstagram, SiFacebook, SiGithub, SiThreads } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { boardMembers } from '@/constants/TeamData';
import PageHeading from '@/components/common/PageHeading';

export default function TeamPage() {
  return (
    <main className="flex flex-col items-center px-6 pb-32 pt-24">
      <PageHeading
        title="조직도"
        description="아치셈틀 집행부 대해 소개합니다. 😸"
      />

      {/* 조직도 섹션 */}
      <section className="text-center">
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boardMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <Image
                className="aspect-[4/3] rounded-xl object-cover"
                src={member.profile_image || '/images/default-profile.jpg'}
                alt={member.name}
                width={320}
                height={320}
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.bio || ''}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="icon" variant="ghost">
                  <SiInstagram className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <SiFacebook className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <SiThreads className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
