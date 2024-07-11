
'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../actions/Login';
import Signup from '../actions/Signup';
import Link from 'next/link';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #fda085;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background: #fda085;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background: #f6d365;
  }
`;
const SignupForm = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('')
    const [error, setError] = useState({ account_error: '', password_error: '', confirm_password_error: '' })
    const validateForm = () => {
        setError(error => { return { account_error: '', password_error: '', confirm_password_error: '' } })
        if (account.length < 8) {
            setError(error => { return { ...error, account_error: 'Account length must longer than 8 charater !' } })

        }
        if (password != confirm_password) {
            setError(error => { return { ...error, confirm_password_error: 'Passwords are not similar !' } })

        }
        if (password.length < 8) {
            setError(error => { return { ...error, password_error: 'Password length must longer than 8 charater !' } })

        }

    }
    return (
        <Container>
            <Form action={Signup}>
                <Title>Sign up</Title>
                <Input
                    type="text"
                    placeholder="Account"
                    name='account'
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                />
                {error.account_error}<br />
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error.password_error}<br />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error.confirm_password_error}<br />
                <Input
                    type="text"
                    placeholder="Name"
                    name='name'
                    required
                />
              
                <Button type="submit" onClick={() => { validateForm() }}>Sign up</Button>
                <Link href={"/login"} style={{'textDecoration':'underline','margin-top':'8px'}} >Login</Link>
            </Form>
           
        </Container>
    );
};
export default SignupForm;