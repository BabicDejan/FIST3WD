import {useState, useEffect} from 'react';
function FetchUsers(){

    const [users, setUsers] = useState<string[]>([]);

    useEffect(()=> {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.map((u:any)=>u.name)))
    })

    return (
        <ul>{users.map((u)=> <li key={u}>{u}</li>)}</ul>
    )


}export default FetchUsers;