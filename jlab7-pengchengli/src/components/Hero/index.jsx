import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <img
        src="/hero-image.png"
        alt="Hero banner"
        className="hero-image"
      />
      <div className="hero-text">
        <h1>Welcome to Lipengcheng Web</h1>
      </div>
    </section>
  )
}