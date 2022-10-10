interface ButtonProps {
  label: string;
  type: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, className, disabled }) => (
  <button
    disabled={disabled}
    className={`bg-blue-700 hover:bg-blue-600 w-full text-white rounded text-center py-3 
    font-semibold disabled:bg-slate-300 disabled:text-slate-700 ${className}`}
  >
    {label}
  </button>
);

export default Button;
