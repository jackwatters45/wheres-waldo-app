import { useState } from 'react';

const useFormInput = () => {
  const [value, setValue] = useState({value: ''});
  const handleChange = (e) =>
    setValue({ value: e.target.value, validity: e.target.validity.valid });

  return [value, handleChange];
};

export default useFormInput;
