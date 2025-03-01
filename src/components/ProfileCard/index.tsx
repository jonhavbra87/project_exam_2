import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  icon: JSX.Element;
  title: string;
  description: ReactNode;
  link?: string;
  onClick?: () => void; // 🔹 Optional onClick for actions like logout
}
/**
 * ProfileCard component for displaying interactive profile action cards
 *
 * @component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.icon - Icon element to display in the card
 * @param {string} props.title - Title text for the card
 * @param {ReactNode} props.description - Description content for the card
 * @param {string} [props.link] - Optional URL to navigate to when card is clicked
 * @param {Function} [props.onClick] - Optional click handler function
 * @returns {JSX.Element} - Rendered ProfileCard component
 *
 * @description
 * A versatile card component for profile-related actions that can function as either:
 * - A navigation link (when `link` prop is provided)
 * - An action button (when `onClick` prop is provided)
 *
 * The component dynamically renders as either a Link or button based on the provided props.
 * Each card displays an icon, title, and description with consistent styling.
 *
 * @example
 * // As a navigation link
 * <ProfileCard
 *   icon={<FaUser />}
 *   title="Personal Information"
 *   description="View and edit your profile details"
 *   link="/profile/edit"
 * />
 *
 * @example
 * // As an action button
 * <ProfileCard
 *   icon={<FaSignOutAlt />}
 *   title="Logout"
 *   description="Sign out of your account"
 *   onClick={handleLogout}
 * />
 */

const ProfileCard = ({
  icon,
  title,
  description,
  link,
  onClick,
}: ProfileCardProps) => {
  const Component = link ? Link : 'button'; // Use `<Link>` if `link` exists, otherwise `<button>`

  return (
    <Component
      to={link || ''}
      onClick={onClick}
      className="flex flex-col items-start gap-4 p-6 bg-white shadow-md rounded-lg hover:bg-gray-100 "
    >
      <div>
        <div className="text-text-secondary text-xl">{icon}</div>
        <h4 className="text-text-primary font-semibold">{title}</h4>
        <p className="text-text-muted text-sm">{description}</p>
      </div>
    </Component>
  );
};

export default ProfileCard;
