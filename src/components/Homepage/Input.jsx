import "./Input.scss";

function Input({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Enter URL here..."
      type="url"
      className="input"
    />
  );
}

export default Input;
