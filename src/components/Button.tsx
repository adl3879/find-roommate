interface ButtonProps {
  label: string;
  type: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, className }) => (
  <button
    className={`bg-blue-700 hover:bg-blue-600 w-full text-white rounded text-center py-3 
    font-semibold ${className}`}
  >
    {label}
  </button>
);

export default Button;
