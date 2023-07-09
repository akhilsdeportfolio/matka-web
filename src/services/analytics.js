import { logEvent, setUserProperties} from "firebase/analytics";
import { analytics } from "../clientFirebase";

export function trackEvent(event)
{
    logEvent(analytics,event);
    
}


export function setUser(userData)
{
    setUserProperties(analytics,{...userData})
}