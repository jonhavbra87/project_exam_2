export interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  Icon?: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}