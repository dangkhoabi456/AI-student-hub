import React from 'react';

function FormInput({ label, type, name, value, onChange, className }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
      <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        {label}
      </label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        className={className} 
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        required
      />
    </div>
  );
}

export default FormInput;