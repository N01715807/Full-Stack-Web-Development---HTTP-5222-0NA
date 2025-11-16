import Header from "./Header";
import Question from "./Question";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Question />
    </div>
  )
}

export default App
