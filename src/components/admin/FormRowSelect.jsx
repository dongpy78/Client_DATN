const FormRowSelect = ({ name, labelText, list, value, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {list.map((item) => {
          const value = typeof item === "string" ? item : item.value;
          const label =
            typeof item === "string"
              ? item
              : item.label.length > 30
              ? `${item.label.substring(0, 27)}...` // Cắt ngắn label nếu quá dài
              : item.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
