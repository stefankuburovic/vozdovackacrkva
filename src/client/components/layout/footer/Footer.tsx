// import { Loader } from "@googlemaps/js-api-loader"

import "./Footer.scss";
export default function Footer() {

    // const loader = new Loader({
    //     apiKey: "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8",
    //     version: "weekly",
    // });
    // loader.importLibrary("maps").then(async () => {
    //     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    //     new Map(document.getElementById("google-maps-canvas") as HTMLElement, {
    //         center: {lat: -34.397, lng: 150.644},
    //         zoom: 8,
    //     });
    // });

    return (
        <footer id="footer">
            <div className="boxes">
                <div style={{width: "100%", height: "500px"}}>
                    <div id="google-maps-canvas" style={{width: "100%", height: "100%", maxWidth: "100%"}}>
                        <iframe title="Храм светог цара Константина и царице Јелене" style={{width: "100%", height: "100%"}}
                                src="https://www.google.com/maps/embed/v1/place?q=hram+svetog+cara+konstantina+i+carice+jelene+beograd&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    </div>
                </div>
            </div>
            <div className="boxes lokacija">
                <h2>Локација</h2>
                <hr/>
                <div className="lokacija-wrapper">
                    <div className="boxes-inner">
                        <div className="footer-info">
                            <div className="lokacija-inline">
                                <h3>Донирајте ваш храм</h3>
                                <ul>
                                    <li>
                                        <p><b>КОМЕРЦИЈАЛНА БАНКА АД БЕОГРАД</b></p>
                                    </li>
                                    <li>
                                        <p>Текући динарски рачун: <b>205-58219-31</b></p>
                                    </li>
                                    <li>
                                        <p>позив на број (шифра цркве): <b>230012</b></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="lokacija-inline">
                                <h3>Контакт</h3>
                                <ul>
                                    <li><a href="tel:+381112472295">+(381)(011)247-2295</a></li>
                                    <li><a href="mailto:vozdovackihram@gmail.com">vozdovackihram@gmail.com</a></li>
                                </ul>
                            </div>
                            <div className="lokacija-inline">
                                <h3>Адреса</h3>
                                <ul>
                                    <li>
                                        <a href="https://www.google.com/maps/place/The+Church+of+Holy+Constantine+and+Helen/@44.7773645,20.4739508,20.5z/data=!4m6!3m5!1s0x475a705b8ddbdf4b:0x18500dcc168630ef!8m2!3d44.7772938!4d20.4737809!16s%2Fg%2F1tftpwnz?entry=ttu">Јове Илића 123</a>
                                    </li>
                                    <li>
                                        <a href="https://www.google.com/maps/place/The+Church+of+Holy+Constantine+and+Helen/@44.7773645,20.4739508,20.5z/data=!4m6!3m5!1s0x475a705b8ddbdf4b:0x18500dcc168630ef!8m2!3d44.7772938!4d20.4737809!16s%2Fg%2F1tftpwnz?entry=ttu">11010 Вождовац, Србија</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="boxes-inner">
                        <div className="drustvene-mreze">
                            <div>
                                <h3>Друштвене мреже</h3>
                                <ul>
                                    <li>
                                        <a href="https://www.instagram.com/vozdovacka_crkva" rel="noreferrer"
                                           target="_blank">
                                            <img src="/assets/images/instagram-icon.webp" alt="Instagram"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/profile.php?id=100089120393706"
                                           rel="noreferrer" target="_blank">
                                            <img src="/assets/images/facebook-icon.webp" alt="Facebook"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://invite.viber.com/?g2=AQB8CsQuus0jbFMoM045RUGpzeYHc7XB5NrBo%2F6eKHT%2FdHJ0dKu2IzYVydrB4RTx"
                                           rel="noreferrer" target="_blank">
                                            <img src="/assets/images/viber-icon.webp" alt="Viber"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}