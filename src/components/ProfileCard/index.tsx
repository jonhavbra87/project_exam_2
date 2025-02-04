import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  icon: JSX.Element;
  title: string;
  description: ReactNode; 
  link?: string;
  onClick?: () => void; // 🔹 Optional onClick for actions like logout
}

const ProfileCard = ({ icon, title, description, link, onClick }: ProfileCardProps) => {
  const Component = link ? Link : "button"; // Use `<Link>` if `link` exists, otherwise `<button>`

  return (
    <Component
      to={link || ""}
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