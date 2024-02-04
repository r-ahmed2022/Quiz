/* eslint-disable react/prop-types */
import { useEffect } from "react"
export default function QuizTimer({dispatch, secondsRemaining}) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(()=> {
        const id = setInterval(() => {
         dispatch({type: "ticker"})
        }, 1000)
        return ()=> clearInterval(id)
      }, [dispatch]);
  return (
    <div className="timer">
       {mins < 10 && "0"}
       {mins}: {seconds < 10 && "0"}
       {seconds}
    
     </div>
  )
}
