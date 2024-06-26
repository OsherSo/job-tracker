const FormRowCheckbox = ({ name, labelText, checked, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type="checkbox"
        name={name}
        id={name}
        defaultChecked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRowCheckbox;
