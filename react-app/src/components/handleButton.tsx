function Button(){
    const handleClick = () => alert("Dugme je kliknuto!");
    return (
        <button style={{marginTop:"10px", backgroundColor:"red"}} 
        onClick={handleClick}>Klikni me</button>
    )
}
export default Button