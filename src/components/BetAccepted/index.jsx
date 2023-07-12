import { Button, NavBar, Result } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import successAnimation from './succesAnimation.json';
import { useLottie } from 'lottie-react';
import { TbHome } from 'react-icons/tb';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../clientFirebase';
export default function BetAccepted() {
    const navigate=useNavigate();

    
const style = {
    height: "60vh",
    width:'100vw',
    background:'transparent'
  };
  const options = {
    animationData: successAnimation,
    loop: false,
    autoplay: true,
  };


  
  const { View } = useLottie(options, style);

  
  return (
    <div className='text-center'>
    <NavBar back={false} backArrow={<TbHome/>} onBack={()=>{navigate('/',{replace:true})}} style={{color:'cornflowerblue'}}/>
    <Result
    status='success'
    title='Your bet is accepted'
    description='check your bet results in mybets section'
  />  
  <Button color='primary'  onClick={()=>{
        navigate('/mybets')
  }}>
    Go To Mybets
  </Button>
  {View}
  </div>  
  )
}
