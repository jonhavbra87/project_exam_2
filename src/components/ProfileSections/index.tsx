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
/**
 * ProfileSection component for grouping related profile cards under a common heading
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Section heading text
 * @param {Array} props.items - Array of items to render as ProfileCards
 * @param {JSX.Element} props.items[].icon - Icon element for the card
 * @param {string} props.items[].title - Title text for the card
 * @param {string} props.items[].description - Description text for the card
 * @param {string} props.items[].link - URL to navigate to when card is clicked
 * @returns {JSX.Element} - Rendered ProfileSection component
 * 
 * @description
 * A container component that groups related ProfileCard components under a common section title.
 * Creates a responsive layout with cards that wrap based on available space.
 * Each section represents a category of profile actions or information.
 * 
 * @example
 * // Account settings section with multiple cards
 * <ProfileSection
 *   title="Account Settings"
 *   items={[
 *     {
 *       icon: <FaUser />,
 *       title: "Personal Info",
 *       description: "View and edit your details",
 *       link: "/profile/personal-info"
 *     },
 *     {
 *       icon: <FaLock />,
 *       title: "Security",
 *       description: "Update password and security settings",
 *       link: "/profile/security"
 *     }
 *   ]}
 * />
 */

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
