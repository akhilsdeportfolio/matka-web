import  { useEffect, useRef } from 'react'

export default function AudioController() {
  const ref=useRef();

useEffect(()=>{    
    ref.current.play();
},[])

  return (
    <audio controls ref={ref} autoPlay>
    <source src="/dist/sounds/sound.mp3" type="audio/mpeg" />
    Your browser does not support the audio tag.
    </audio>
  )
}
