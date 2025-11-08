import { useEffect, useState } from "react";

function Multiplier(){

    const [number1, setNumber1] = useState<number>(0);
    const [number2, setNumber2] = useState<number>(0);

    const [result, setResult] = useState<number>(0);

    useEffect(()=>{
        setResult(number1*number2);
    },[number1,number2])

    return(

        <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop:"10px"}}>
            <label>Vrijednost 1:</label>
            {/* Ovo je komentar */}
            {/* razmisliti zasto u metodi setNumber vrijednost iz input-a prebacamo u broj?*/}
            <input type="number" onChange={(e) => setNumber1(Number(e.target.value))}/>
            
            <label>Vrijednost 2:</label>
            <input type="number" onChange={(e) => setNumber2(Number(e.target.value))}/>

            <label>Rezultat: {result}</label>
        </div>

    )
}
export default Multiplier;