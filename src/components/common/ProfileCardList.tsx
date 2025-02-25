import React from 'react';
import ProfileCard from './ProfileCard';

const DEFAULT_PROFILE_IMAGE = '/images/default-profile.jpg';

type ProfileCardListProps = {
  profiles: {
    id: number;
    role: string;
    name: string;
    student_id: string;
    profile_image?: string;
    bio?: '';
  }[];
};

const ProfileCardList: React.FC<ProfileCardListProps> = ({ profiles = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index}
          id={profile.id}
          role={profile.role}
          name={profile.name}
          student_id={profile.student_id}
          profile_image={profile.profile_image || DEFAULT_PROFILE_IMAGE}
        />
      ))}
    </div>
  );
};
export default ProfileCardList;
