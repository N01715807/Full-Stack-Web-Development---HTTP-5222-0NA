import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Features from './components/Features'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </>
  )
}

export default App
