import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type ProfileCardProps = {
  id: number;
  role: string;
  name: string;
  student_id: string;
  profile_image: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  role,
  name,
  student_id,
  profile_image,
}) => {
  return (
    <div>
      <Card className="flex h-[300px] w-[210px] flex-col rounded-lg bg-gray-100 dark:bg-[#18181A]">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="h-[170px] w-full">
            <Image
              src={profile_image ? profile_image : '/default_profile.png'}
              alt={'Profile' + id}
              width={700}
              height={400}
              className="h-[200px] w-[210px] rounded-t-lg object-cover"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-5 flex flex-1 flex-col items-center justify-center gap-2 p-2 text-center text-sm text-gray-800">
          <CardTitle className="text-lg font-semibold dark:text-white">
            {role}
          </CardTitle>
          <CardDescription>
            {name + ' | ' + '학번 ' + student_id}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
