import Button from "./Components/Button"

function soma(numA, numB){
  alert(numA + numB)
}

function App() {

  return (
    <div>
      <h1>First ReactJS</h1>
      <Button onClick={() => soma(10, 12)} name="Bruno Carneiro"/>
    </div>
  )
}

export default App
