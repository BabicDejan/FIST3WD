import {useState} from "react";

function Counter(){
    const [count, setCount] = useState<number>(0);

    return(
        <div>
            <p>Brojac: {count}</p>
            <button onClick={()=> setCount(count+1)}>Povecaj</button>
        </div>
    )


}

export default Counter