import { useState } from 'react';

const useAccountForm= () => {
  const [acccount, setAcccount] = useState({
    fullname: '',
    imageurl: '',
    phone: '',
    address: '',
    degreeid: '',
    walletid: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullname: false,
    imageurl: false,
    phone: false,
    degreeid: false
  });

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.fullname = !acccount.fullname;
    tempErrors.imageurl = !/^(http|https):\/\/[^ "]+$/.test(acccount.imageurl);
    tempErrors.phone = !/^0\d{9}$/.test(acccount.phone);
    tempErrors.degreeid = !/^\d+$/.test(acccount.degreeid);
    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every((x) => !x);
  };

  const handleChange = (prop) => (event) => {
    setAcccount({ ...acccount, [prop]: event.target.value });
  };

  return { acccount, errors, handleChange, validate };
};

export default useAccountForm;
