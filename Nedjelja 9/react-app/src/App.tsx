import './App.css'
import TitleCounter from './components/titleCounter';
import Multiplier from './components/multiplier';
import Button from './components/handleButton';
import ConditionalRender from './components/conditionalRendering';
import AdminPanel from './components/isAdmin';
import FetchUsers from './components/fetchUsers';
function App() {

  const user = {name:"Dejan", loggedIn:true};
  const admin = true;

  return (
    <>
      <h1>Vite + React + TS</h1>
      <div className="card">
        <TitleCounter/>
        <Multiplier/>
        <Button/>
        <ConditionalRender user={user}/>
        <AdminPanel isAdmin={admin}/>
        <FetchUsers/>
      </div>
    </>
  )
}

export default App
