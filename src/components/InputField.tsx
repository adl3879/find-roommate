import * as React from "react";

interface InputFieldProps {
  leftIcon: JSX.Element;
  placeholder: string;
  type: string;
  options?: string[];
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  leftIcon,
  placeholder,
  type,
  options,
  onChange,
}) => {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    onChange(value);
  });

  return (
    <div className="flex w-full my-4">
      <div className="bg-blue-700 flex items-center justify-center px-4 rounded-l">
        {leftIcon}
      </div>
      {type === "select" ? (
        <select
          className="px-4 py-3 border border-gray-300 outline-blue-700 rounded-r w-full text-sm"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        >
          {options?.map((op) => (
            <option>{op}</option>
          ))}
        </select>
      ) : (
        <input
          className="px-4 py-3 border border-gray-300 outline-blue-700 rounded-r w-full text-sm"
          type={type}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      )}
    </div>
  );
};

export default InputField;
