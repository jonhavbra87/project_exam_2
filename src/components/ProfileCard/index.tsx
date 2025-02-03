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
  const Component = link ? Link : "button"; // 🔹 Use `<Link>` if `link` exists, otherwise `<button>`

  return (
    <Component
      to={link || ""}
      onClick={onClick}
      className="flex flex-grow-start md:max-w-[276] items-center gap-4 p-8 bg-white shadow-md rounded-lg hover:bg-gray-100 cursor-pointer w-full"
    >
      <div className="text-text-secondary text-xl">{icon}</div>
      <div className="flex-grow">
        <h4 className="text-text-primary font-semibold truncate">{title}</h4>
        <p className="text-text-muted text-sm truncate">{description}</p>
      </div>
    </Component>
  );
};

export default ProfileCard;
