import React from 'react';

interface CustomInputProps {
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  id?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, value, placeholder, onChange, required, type,id }) => {
  return (
    <div>
      <input
        type={type || 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        id={id}
      />
    </div>
  );
};
export default CustomInput;