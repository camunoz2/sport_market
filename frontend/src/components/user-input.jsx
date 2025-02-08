import PropTypes from "prop-types";

const UserInput = ({ placeholder, value, onChange, type }) => {
  return (
    <input
      className="bg-gray-300 border border-black rounded-sm px-2 py-2 text-xl text-black w-full"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
    />
  );
};

export default UserInput;

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
