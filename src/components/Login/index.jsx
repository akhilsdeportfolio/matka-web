import { useState } from 'react'
import './index.css';
import { Button, Card, Input } from 'antd-mobile';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../clientFirebase';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [,setError]=useState({});
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    async function handleLogin()
    {        
        setLoading(true)
        try{
        await signInWithEmailAndPassword(auth,email,password);
        setLoading(false);
        navigate('/');
        }
        catch(e)
        {
            setLoading(false);
            console.log('Something went wrong',e)
            setError({error:e});
        }
    }



  return (
    <Card style={{padding:20}}>
    <div className='loginContainer'>
        
        <p className='text-lg mb-2'>Welcome to Rich Matka</p>
        <p className='text-default mb-2'>Please Login to continue</p>
        <Input className='mb-4'  style={{border:'1px solid black',padding:10,borderRadius:5}} placeholder='Enter Email Address' value={email} onChange={(e)=>setEmail(e)}/>
        <Input className='mb-4'  style={{border:'1px solid black',padding:10,borderRadius:5}} placeholder='Enter Password' type='password' value={password} onChange={(e)=>setPassword(e)}/>
        <Button loading={loading} loadingText='Finding User' block color='primary' size='large'  onClick={handleLogin} >Login</Button>        
    </div>
    </Card>
  )
}
