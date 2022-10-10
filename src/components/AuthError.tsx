interface AuthErrorProps {
  message: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ message }) => {
  return (
    <div
      className={`bg-red-200 text-red-500 font-bold text-sm rounded p-4 my-6`}
    >
      {message}
    </div>
  );
};

export default AuthError;
