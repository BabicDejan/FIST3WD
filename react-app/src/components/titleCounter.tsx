import { useState, useEffect } from "react";

function TitleCounter(){
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        document.title = `Kliknuto ${count} puta`;
    //niz zavisnosti [] - kontrolise ponasanje (pozivanje) useEffect hook-a
    }, [count]);

    return (
        <div>
            <h2> Kliknuto: </h2>
            <button onClick={() => setCount(count + 1)}>Klikni</button>
        </div>  
    )
}
export default TitleCounter