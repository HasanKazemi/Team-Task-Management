import React from 'react';

interface CustomSelectProps {
  name?: string;
  value?: string | number;
  options?: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  options = [],
  onChange,
  required,
  defaultValue,
  disabled,
  style,
}) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-label={name}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #c8e6c9',
          borderRadius: '5px',
          fontSize: '14px',
          ...style,
        }}
      >
        {options.length === 0 ? (
          <option disabled>بدون گزینه</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default CustomSelect;