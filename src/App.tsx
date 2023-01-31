import reactLogo from './assets/react.svg'
import './App.css'
// import { StyledTreeExample } from './components/graph'
import { Graph } from './components/newComponent'

function App() {

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Graph />
    </div>
  )
}

export default App
