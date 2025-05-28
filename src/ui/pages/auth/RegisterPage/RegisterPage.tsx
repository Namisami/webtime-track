import { useState } from "react";
import Box from "@/ui/components/common/Box/Box";
import Input from "@/ui/components/common/Input/Input";
import Button from "@/ui/components/common/Button/Button";
import { register } from "@/api/auth";
import './RegisterPage.css';

export default function RegisterPage() {
  const [state, setState] = useState<{
    email: string,
    password: string,
    password2: string,
  }>({
    email: '',
    password: '',
    password2: '',
  });

  const handleInputChange = (name: string, value?: string) => {
    setState({...state, [name]: value});
  };

  const handleRegister = async () => {
    if (state.password !== state.password2) {
      return;
    }
    await register({
      email: state.email,
      password: state.password,
    });
  }
  
  return (
    <Box className="register">
      <h2 className="register__title">Регистрация</h2>
      <div className="register__content">
        <Input 
          label='Email'
          name='email'
          value={state?.email}
          onChange={handleInputChange}
          className='register__field'
        />
        <Input 
          label='Пароль'
          name='password'
          value={state?.password}
          onChange={handleInputChange}
          className='register__field'
          type="password"
        />
        <Input 
          label='Повторите пароль'
          name='password2'
          value={state?.password2}
          onChange={handleInputChange}
          className='register__field'
          type="password"
        />
      </div>
      <div className="register__actions">
        <Button
          onClick={handleRegister}
        >
          Войти
        </Button>
      </div>
    </Box>
  )
}
