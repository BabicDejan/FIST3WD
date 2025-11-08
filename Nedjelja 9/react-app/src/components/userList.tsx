const users = [{id:1,ime:"Marko"},{id:2, ime:"Nikola"}, 
    {id:3, ime:"Niko"}]

function UserList() {
  return (
    <ul>
      {users.map((u)=>(
        <li key={u.id}>{u.ime}</li>
      )
      )}
    </ul>
  );
}export default UserList
