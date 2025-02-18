import { ChevronDown } from 'lucide-react';

const BouncingArrow = () => {
  return (
    <div className="w-full flex justify-center animate-bounce">
      <ChevronDown
        size={48}
        className="text-primary cursor-pointer hover:opacity-60 transition-colors"
      />
    </div>
  );
};

export default BouncingArrow;
