export const handleWholeNumberInput = (event, setValue) => {
  const inputValue = event.target.value;
  console.log(inputValue);
  if (/^[0-9]*$/.test(inputValue) || inputValue === "") {
    setValue(inputValue);
    console.log(inputValue);
  }
};
