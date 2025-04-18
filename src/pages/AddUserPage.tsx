import React from 'react';

interface CustomSelectProps {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, value, options, onChange, required }) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #c8e6c9',
          borderRadius: '5px',
          fontSize: '14px',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;