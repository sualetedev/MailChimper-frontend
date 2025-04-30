import { useState } from 'react';

const useFormArray = (initialObj) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return [form, changed];
};

export default useFormArray;
