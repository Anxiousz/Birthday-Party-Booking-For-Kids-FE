import { useState } from 'react';

const useRoomForm = () => {
  const [room, setRoom] = useState({
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
    tempErrors.fullname = !room.fullname;
    tempErrors.imageurl = !/^(http|https):\/\/[^ "]+$/.test(room.imageurl);
    tempErrors.phone = !/^0\d{9}$/.test(room.phone);
    tempErrors.degreeid = !/^\d+$/.test(room.degreeid);
    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every((x) => !x);
  };

  const handleChange = (prop) => (event) => {
    setRoom({ ...room, [prop]: event.target.value });
  };

  return { room, errors, handleChange, validate };
};

export default useRoomForm;