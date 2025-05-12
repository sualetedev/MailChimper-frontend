import { useState } from 'react';

const useFormArray = (initial) => {
  const [form, setForm] = useState(initial);

  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const reset = () => {
    setForm(initial);
}

  return [form, changed, reset];
};

export default useFormArray;
