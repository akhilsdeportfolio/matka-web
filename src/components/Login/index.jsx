import { useState } from 'react'
import './index.css';
import { Button, Card, Form, Input, NoticeBar } from 'antd-mobile';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../clientFirebase';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../Label';
import { TbLockAccess } from 'react-icons/tb';


export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [form]=Form.useForm();

    async function handleLogin()
    {        
        setLoading(true)
        try{
        await signInWithEmailAndPassword(auth,email,password);
        setLoading(false);
        navigate('/',{replace:true});
        }
        catch(e)
        {
            setLoading(false);
            
            console.log(e)
            setError({error:e});
        }
    }



  return (
    <div className='loginContainer' >
      <Card style={{padding:20}} className='drop-shadow-xl border-2 border-blue-300'>    
        <img src='logo.png' width="160" height="100" style={{margin:'auto'}} />
        <p className='text-xl mb-2 mt-4'>Authorization Required</p>
        <p className='text-default mb-2'>Please Login to continue</p>
        <Form form={form} onFinish={handleLogin}>
        <Form.Item label="Email Address" name="email" rules={[{required:true,message:"enter email address"},{type:'email',message:"Pleas enter a valid email address"}]}>
        <Input className="bg-slate-100  p-2 border border-blue-200 rounded-md"   placeholder='Enter Email Address' value={email} onChange={(e)=>setEmail(e)}/>
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{required:true,message:"enter password"}]}>
        <Input className="bg-slate-100 p-2 border border-blue-200 rounded-md"   placeholder='Enter Password' type='password' value={password} onChange={(e)=>setPassword(e)}/>
        </Form.Item>
        {error &&   <NoticeBar    
        style={{"--background-color":'transparant',"--border-color":"transparant","--text-color":"red",paddingLeft:'20%'}}        
            icon={<TbLockAccess />}
            content={error.error.code}
            color='error'
          />}
        <Button className='font-bold mt-2'   loading={loading} loadingText='Finding User' color='primary' fill='outline' size='default' type='ghost'>Proceed to Login</Button>  
        </Form>
        <div className='p-2'>
        <Link to={"/signup"} className='text-slate-600 font-bold'>Dont have account yet ?<span className='text-blue-400'> signup here</span>  </Link>
        <div className='mt-2'/>
        <Link to={"/forgot"} className='text-slate-600 font-bold'>Forgot Password ?</Link>
        </div>      
        </Card>
    </div>
    
  )
}
