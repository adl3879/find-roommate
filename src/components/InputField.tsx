import * as React from "react";

interface InputFieldProps {
  leftIcon: JSX.Element;
  placeholder: string;
  type: string;
  options?: string[];
  id: string;
  invalid?: boolean;
  className?: string;
  flip?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  leftIcon,
  placeholder,
  type,
  options,
  id,
  className,
  flip,
}) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div
      className={`flex w-full my-6 ${flip && "flex-row-reverse"} ${className}`}
    >
      <div
        className={`bg-blue-700 flex items-center justify-center px-4 ${
          flip ? "rounded-r" : "rounded-l"
        }`}
      >
        {leftIcon}
      </div>
      {type === "select" ? (
        <select
          className={`px-4 py-3 border-2 border-gray-200 outline-blue-700 ${
            flip ? "rounded-l" : "rounded-r"
          } w-full text-sm`}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id={id}
        >
          {options?.map((op) => (
            <option key={Math.random()}>{op}</option>
          ))}
        </select>
      ) : (
        <input
          className={`px-4 py-3 border-2 border-gray-200 outline-blue-700 ${
            flip ? "rounded-l" : "rounded-r"
          } w-full text-s`}
          type={type}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id={id}
        />
      )}
    </div>
  );
};

export default InputField;
