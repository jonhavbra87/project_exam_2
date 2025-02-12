import ProfileCard from '../ProfileCard';

interface ProfileSectionProps {
  title: string;
  items: {
    icon: JSX.Element;
    title: string;
    description: string;
    link: string;
  }[];
}

const ProfileSection = ({ title, items }: ProfileSectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-text-primary mb-3">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <ProfileCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
