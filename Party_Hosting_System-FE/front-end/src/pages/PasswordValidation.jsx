/* eslint-disable no-useless-escape */
import {useState, useEffect} from 'react';
import Icon from 'react-icons-kit';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check'

function Password_Vali(props) {
  const [password, setPassword] = useState({
    password: undefined,
  });
  const [type, setType] = useState('password');

  // validated states
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);

  const handleChange=(value)=>{
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    if(lower.test(value)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(value)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(value)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(value)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(value)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }
  useEffect(() => {
    props.onPasswordChange(password);
  }, [password]);
  const handleInputChange = (event) => {
    setPassword(event.target.value);
    handleChange(event.target.value); // Pass the value directly
  };

  return (
    <div className="form">

      {/* box containing input field and validation tracker  */}
      

        {/* input */}
        <div className='input-with-icon-div '>
          <input className='custom-input' placeholder='Password' type={type}
          onChange={(e) => {
            if (e.target) {
              handleInputChange(e.target.value);
              handleChange(e.target.value);
            }
          }}/>
          {type==="password"?(
            <span className='icon-span' onClick={()=>setType("text")}>
              <Icon icon={basic_eye_closed} size={18}/>
            </span>
          ):(
            <span className='icon-span' onClick={()=>setType("password")}>
              <Icon icon={basic_eye} size={18}/>
            </span>
          )}
        </div>

        {/* validation tracker */}
        <main className='tracker-box'>
          <div className={lowerValidated?'validated':'not-validated'}>
            {lowerValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one lowercase letter
          </div>
          <div className={upperValidated?'validated':'not-validated'}>
            {upperValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one uppercase letter
          </div>
          <div className={numberValidated?'validated':'not-validated'}>
            {numberValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one number
          </div>
          <div className={specialValidated?'validated':'not-validated'}>
            {specialValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least one special character
          </div>
          <div className={lengthValidated?'validated':'not-validated'}>
            {lengthValidated?(
              <span className='list-icon green'>
                <Icon icon={arrows_circle_check}/>  
              </span>
            ):(
              <span className='list-icon'>
                <Icon icon={arrows_exclamation}/>  
              </span>
            )}
            At least 8 characters
          </div>
        </main>
      

    </div>
  );
}

export default Password_Vali;