import { Label } from '@/components/ui/label';
import ProfileCardList from '@/components/ProfileCardList';

export default function TeamPage() {
  const boardMembers = [
    {
      id: 1,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 2,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 3,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 4,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 5,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },

    {
      id: 6,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 7,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 8,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
  ];
  const boardDevelopers = [
    {
      id: 1,
      role: '개발팀 팀장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 2,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 3,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 4,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 5,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },

    {
      id: 6,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 7,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 8,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
    {
      id: 9,
      role: '회장',
      name: '이름 홍길동',
      student_id: '00000000',
      profile_image: '',
    },
  ];

  return (
    <>
      {/* 본문 콘텐츠 */}
      <main>
        <section className="mt-[150px] flex flex-col items-center">
          <Label className="text-[30px] font-bold">조직도</Label>
          <div className="mb-[40px] mt-[40px] w-[85vh] text-center">
            우리 학회의 집행부 조직원들은 학회의 운영과 발전을 위해 각자의
            역할을 수행하며 협력하고 있습니다. 회장단을 비롯해 기획, 홍보, 교육,
            대외협력 등의 다양한 부서가 있으며, 모든 구성원이 학회원들의 원활한
            활동을 지원하고 학회의 성장을 위해 노력하고 있습니다.
          </div>
          <ProfileCardList profiles={boardMembers} />
        </section>
        <section className="mb-[50px] mt-[150px] flex flex-col items-center">
          <Label className="text-[30px] font-bold">개발팀</Label>
          <div className="mb-[40px] mt-[40px] w-[85vh] text-center">
            홈페이지 개발팀은 우리 학회의 온라인 플랫폼을 구축하고 관리하는
            역할을 맡고 있습니다. Next.js와 TypeScript를 기반으로 개발을
            진행하며, 학회원들이 쉽고 편리하게 정보를 접할 수 있도록 최적화된
            UI/UX를 제공합니다. 또한, 지속적인 유지보수와 새로운 기능 개발을
            통해 학회의 디지털 환경을 더욱 발전시키고 있습니다.
          </div>
          <ProfileCardList profiles={boardDevelopers} />
        </section>
      </main>
    </>
  );
}
