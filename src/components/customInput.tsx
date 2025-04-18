import React from 'react';

interface CustomInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, value, placeholder, onChange, required }) => {
  return (
    <div>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
export default CustomInput;