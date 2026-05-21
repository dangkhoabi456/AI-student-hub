import "./FormInput.css";

function FormInput({ type = "text", label, className = "" }) {
  return (
    <label className="form_input_group">
      <input
        className={`form_input ${className}`}
        type={type}
        placeholder=" "
        required
      />
      <span>{label}</span>
    </label>
  );
}

export default FormInput;
