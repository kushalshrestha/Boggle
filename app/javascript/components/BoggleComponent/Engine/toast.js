
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export function notify(word, scenario) {

    const position = toast.POSITION.BOTTOM_RIGHT;
    let message = "";
    
    if (scenario === 0) {
        
        message += " -  is a valid word.";
    } else if (scenario === 1) {
       
        message += " -  is not a valid word";
    } else {
        
        message += " -  cannot be created from the board";
    }

    return toast.info(word + message, { position });
}

