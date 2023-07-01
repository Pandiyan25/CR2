

import instagram from "../assets/images/instagram.png"

import ld from "../assets/images/ld.png"

import discord from "../assets/images/discord.png"

import facebook from "../assets/images/facebook.png"

import medium from "../assets/images/medium.png"
import telegram from "../assets/images/telegram.png"
import twitter from "../assets/images/twitter.png"
import youtube from "../assets/images/youtube.png"

function Footer() {


    return (
<footer>

<div className="footer-bottom">
<div className="footer-menu">
              <ul className="f-menu">
                <li><a href="">Disclaimer</a></li>
                <li><a href="">Terms & Conditions</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Website</a></li>
              </ul>
            </div>
    <div className="logobar">
      <img className="scimg" src={instagram}></img>    
      <img className="scimg" src={ld}></img>    
      <img className="scimg" src={facebook}></img>

      <img className="scimg" src={medium}></img>

      <img className="scimg" src={telegram}></img>

      <img className="scimg" src={twitter}></img>

      <img className="scimg" src={youtube}></img>

      <img className="scimg" src={discord}></img>

    </div>
    <p>copyright  @ <a href="#">crsquare.finance</a>  </p>
</div>
</footer>

    );
  }
  
  export default Footer;
  