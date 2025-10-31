import {useState} from 'react';

type WelcomeProps = {name:string};

function WelcomeInput({name}:WelcomeProps){
    const [current_name, setCurrentName] = useState<string>(name);

    return(
        <div>
            <h1>Pozdrav, {current_name}</h1>
            <input type='text' value={current_name} 
            onChange={(e) => setCurrentName(e.target.value)} 
            placeholder='unesi ime'></input>
        </div>
    )
}

export default WelcomeInput