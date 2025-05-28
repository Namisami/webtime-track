import { useState } from "react";
import Box from "@/ui/components/common/Box/Box";
import Input from "@/ui/components/common/Input/Input";
import Button from "@/ui/components/common/Button/Button";
import { login } from "@/api/auth";
import { setLocalStorageByParam } from "@/core/storage/helper";
import './LoginPage.css';

export default function LoginPage() {
  const [state, setState] = useState<{
    email: string,
    password: string,
  }>({
    email: '',
    password: '',
  });

  const handleInputChange = (name: string, value?: string) => {
    setState({...state, [name]: value});
  };

  const handleLogin = async () => {
    const { token } = await login({
      username: state.email,
      password: state.password,
    });
    await setLocalStorageByParam("token", token);
  }
  
  return (
    <Box className="login">
      <h2 className="login__title">Логин</h2>
      <div className="login__content">
        <Input 
          label='Email'
          name='email'
          value={state?.email}
          onChange={handleInputChange}
          className='login__field'
        />
        <Input 
          label='Пароль'
          name='password'
          value={state?.password}
          onChange={handleInputChange}
          className='login__field'
          type="password"
        />
      </div>
      <div className="login__actions">
        <Button
          onClick={handleLogin}
        >
          Войти
        </Button>
      </div>
    </Box>
  )
}
