import './Features.css'

export default function Features() {
  return (
    <section className="features-name">
      <h2>Featured</h2>
      <div className="feature-grid">
        <div className="feature">
          <img src="/feature1.png" alt="Feature 1" />
          <h3>MVP1</h3>
          <p>Pending...</p>
        </div>
        <div className="feature">
          <img src="/feature2.png" alt="Feature 2" />
          <h3>MVP2</h3>
          <p>Pending...</p>
        </div>
        <div className="feature">
          <img src="/feature3.png" alt="Feature 3" />
          <h3>MVP3</h3>
          <p>Pending...</p>
        </div>
        <div className="feature">
          <img src="/feature3.png" alt="Feature 3" />
          <h3>MVP4</h3>
          <p>Pending...</p>
        </div>
      </div>
    </section>
  )
}