import "./FormInput.css";

function FormInput({ type = "text", label, className = "", value = "", onChange, placeholder = "" }) {
  return (
    <label className="form_input_group">
      <input
        className={`form_input ${className}`}
        type={type}
        placeholder={placeholder || " "}
        value={value}
        onChange={onChange}
        required
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export default FormInput;
