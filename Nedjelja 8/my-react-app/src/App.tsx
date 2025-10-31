import './App.css'
import Welcome from './components/welcome'
import Counter from './components/counter'
import Welcome_ts from './components/welcome_type'
import WelcomeInput from './components/welcome_ts_use_state'

function App() {

  return (
    <>
      <div>
        <Welcome/>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter/>  
      </div>
      <Welcome_ts name= 'ana'/>
      <WelcomeInput name= ""/>
    </>
  )
}

export default App
