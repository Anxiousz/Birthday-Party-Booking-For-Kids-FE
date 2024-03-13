import { useState } from 'react';

const usePackagesForm = () => {
  const [packages, setPackages] = useState({
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
    tempErrors.fullname = !packages.fullname;
    tempErrors.imageurl = !/^(http|https):\/\/[^ "]+$/.test(packages.imageurl);
    tempErrors.phone = !/^0\d{9}$/.test(packages.phone);
    tempErrors.degreeid = !/^\d+$/.test(packages.degreeid);
    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every((x) => !x);
  };

  const handleChange = (prop) => (event) => {
    setPackages({ ...room, [prop]: event.target.value });
  };

  return { packages, errors, handleChange, validate };
};

export default usePackagesForm;