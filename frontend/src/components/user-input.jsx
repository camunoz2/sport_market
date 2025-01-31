import PropTypes from "prop-types";

const UserInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="bg-gray-300 border border-black rounded-sm px-2 py-2 text-xl text-black w-full"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default UserInput;

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
