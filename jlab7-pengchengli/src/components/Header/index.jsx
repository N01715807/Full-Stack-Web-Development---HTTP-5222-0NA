import './Header.css'

export default function Header(){
    return(
        <header className="site-header">
            <div className="site-name">Lipengcheng Web</div>
            <nav className="site-nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    )
}