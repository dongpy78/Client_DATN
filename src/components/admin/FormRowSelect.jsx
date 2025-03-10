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
        value={value} // Sử dụng value thay vì defaultValue để đồng bộ với state
        onChange={onChange}
      >
        {list.map((item) => {
          const value = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;
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
