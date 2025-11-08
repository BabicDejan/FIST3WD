type userSession = {name:string, loggedIn:boolean};

function ConditionalRender({user}:{user: userSession}){
    const {name, loggedIn} = user; 
    return(

        loggedIn ? <h2>Dobrodosao, {name}</h2> : <h2> Dobro dosao anonymous</h2>
    )

}export default ConditionalRender;