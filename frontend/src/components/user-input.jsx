import PropTypes from "prop-types";

const UserInput = ({ placeholder }) => {
  return (
    <input
      className="bg-gray-300 border border-black rounded-sm px-2 py-2 text-xl text-black w-full"
      placeholder={placeholder}
    />
  );
};

export default UserInput;

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
