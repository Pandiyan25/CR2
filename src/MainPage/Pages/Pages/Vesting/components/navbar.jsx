import cr from "../assets/images/cr.png"


function Navbar() {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbg">
        <img class ="logoimg" src={cr}></img>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse navsub"  id="navbarSupportedContent">
  
      <ul className="navbar-nav ">
        <li className="nav-item ml-1">
          <a className="nav-link cs" href=".html">Claim Tokens<span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item ml-1">
          <a className="nav-link cs" href=".html">Lock Tokens</a>
        </li>
  
        <li className="nav-item ml-1">
          <a className="nav-link cs" href=".html">Read</a>
        </li>
        <li className="nav-item ml-1">
          <a className="nav-link cs" href=".html">Support</a>
        </li>
        <li className="nav-item ml-1">
        <button type="button" className="btn btn-success cs">Connect Wallet</button>
        </li>
      </ul>
  <div className="dropdowndiv">
    <img className="profile"></img>
  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
  </div>
    </div>
  </nav>
    );
  }
  
  export default Navbar;
  