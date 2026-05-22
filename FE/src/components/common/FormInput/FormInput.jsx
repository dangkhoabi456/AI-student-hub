import "./FormInput.css";

function FormInput({
  type = "text",
  label,
  className = "",
  name,
  value,
  onChange,
  placeholder = "",
  required = true,
}) {
  return (
    <label className="form_input_group">
      <input
        className={`form_input ${className}`}
        type={type}
        name={name}
        placeholder={placeholder || " "}
        value={value}
        onChange={onChange}
        required={required}
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export default FormInput;