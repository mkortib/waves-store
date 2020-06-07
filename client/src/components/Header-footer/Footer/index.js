import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

import './footer.scss';

const Footer = ({ data }) => {
    const img = '/images/featured/bg-footer.jpg';

    return data.siteData ? (
        <footer className="footer" style={{ backgroundImage: `url(${img})` }}>
            <div className="cm-container">
                <div className="footer-top">
                    <a href="/" className="logo logo--footer">
                        <svg
                            width="57"
                            height="61"
                            viewBox="0 0 57 61"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M48.5712 24.4064C48.5712 29.2192 47.5301 34.544 45.448 40.3808C46.3355 42.2923 47.4789 43.248 48.8784 43.248C48.7077 43.9307 48.1445 44.272 47.1888 44.272C46.2331 44.272 45.3285 43.8112 44.4752 42.8896C43.0757 46.2688 41.4544 48.9995 39.6112 51.0816C37.8021 53.1296 35.8907 54.1536 33.8768 54.1536C31.2485 54.1536 29.3883 52.5152 28.296 49.2384C25.2923 53.1637 22.3739 55.1264 19.5408 55.1264C15.2059 55.1264 13.0384 52.8395 13.0384 48.2656C13.0384 44.8864 14.1819 40.3808 16.4688 34.7488C17.288 32.7008 18.056 30.3968 18.7728 27.8368C19.4896 25.2427 19.848 22.8533 19.848 20.6688C19.848 18.4843 19.2165 16.7264 17.9536 15.3952C16.6907 14.064 14.9499 13.3984 12.7312 13.3984C9.31787 13.3984 6.536 15.1392 4.3856 18.6208C2.71307 21.3856 1.8768 24.304 1.8768 27.376C1.8768 31.2672 3.02027 33.7419 5.3072 34.8C5.98987 35.1072 6.72373 35.2608 7.5088 35.2608C10.1371 35.2608 12.1339 33.7931 13.4992 30.8576C13.5675 30.7211 13.6699 30.6528 13.8064 30.6528C13.9771 30.6187 14.1136 30.6528 14.216 30.7552C14.3525 30.8576 14.3867 30.9771 14.3184 31.1136C13.6699 32.7179 12.7653 34.0149 11.6048 35.0048C10.4443 35.9605 9.07893 36.4384 7.5088 36.4384C4.4368 36.4384 2.35467 34.8853 1.2624 31.7792C0.818667 30.448 0.5968 28.9461 0.5968 27.2736C0.5968 25.6011 0.9552 23.7237 1.672 21.6416C3.0032 17.7163 5.13653 14.9515 8.072 13.3472C9.53973 12.5621 11.0928 12.1696 12.7312 12.1696C15.8715 12.1696 18.2779 13.2448 19.9504 15.3952C21.6229 17.5115 22.4592 20.3275 22.4592 23.8432C22.4592 26.4032 21.9472 29.3728 20.9232 32.752C19.8992 36.1312 18.8752 39.3739 17.8512 42.48C16.8272 45.5861 16.3152 47.9243 16.3152 49.4944C16.3152 51.0645 16.5371 52.1909 16.9808 52.8736C17.4587 53.5221 18.2949 53.8464 19.4896 53.8464C22.1861 53.8464 24.968 51.7643 27.8352 47.6C27.5621 45.7909 27.4256 44.0501 27.4256 42.3776C27.4256 36.9163 28.3472 32.24 30.1904 28.3488C31.5216 25.6181 32.9381 24.2528 34.44 24.2528C35.7712 24.2528 36.4368 25.4304 36.4368 27.7856C36.4368 30.1408 35.8907 32.9739 34.7984 36.2848C33.7061 39.5957 32.2896 42.7531 30.5488 45.7568C30.9584 50.4331 32.2555 52.7712 34.44 52.7712C37.7168 52.7712 40.7547 49.0848 43.5536 41.712C41.9835 39.0837 41.1984 35.3632 41.1984 30.5504C41.1984 27.7173 41.5568 25.1232 42.2736 22.768C43.1611 19.7984 44.424 18.3136 46.0624 18.3136C47.7349 18.3136 48.5712 20.3445 48.5712 24.4064ZM47.24 24.048C47.24 21.3173 46.7792 19.952 45.8576 19.952C45.1749 19.952 44.6288 20.9419 44.2192 22.9216C43.8437 24.8672 43.656 26.5397 43.656 27.9392C43.656 32.4448 43.9973 35.9264 44.68 38.384C46.3867 32.8203 47.24 28.0416 47.24 24.048ZM30.3952 42.736C30.3952 42.9067 30.3952 43.0603 30.3952 43.1968C31.7264 40.6368 32.8357 37.9744 33.7232 35.2096C34.6789 32.2059 35.1568 29.9531 35.1568 28.4512C35.1568 26.9152 34.8325 26.0619 34.184 25.8912C33.2965 25.8912 32.4432 27.7856 31.624 31.5744C30.8048 35.3291 30.3952 39.0496 30.3952 42.736Z"
                                fill="#FFD32C"
                            />
                            <circle cx="30" cy="34" r="26.5" stroke="#FFD32C" />
                        </svg>
                        Waves
                    </a>
                    <div className="payment-methods">
                        <a
                            target="_blank"
                            href="https://www.paypal.com/webapps/mpp/home"
                        >
                            <img src="/images/payments/pay-pal.svg" alt="" />
                        </a>
                    </div>
                </div>
                {/*  */}
                <div className="footer-middle">
                    <div className="footer-middle__left">
                        <h2 className="contact-info-label">
                            Contact information
                        </h2>

                        <div className="business-info">
                            <div className="business-info__item">
                                <div className="icon-wrap">
                                    <FontAwesomeIcon
                                        icon={faCompass}
                                        className="icon"
                                    />
                                </div>
                                <div className="nfo-block">
                                    <div className="">Address:</div>
                                    <div className="">
                                        {data.siteData[0].address}
                                    </div>
                                </div>
                            </div>

                            <div className="business-info__item">
                                <div className="icon-wrap">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="icon"
                                    />
                                </div>
                                <div className="nfo-block">
                                    <div className="">Phone:</div>
                                    <div className="">
                                        {data.siteData[0].phone}
                                    </div>
                                </div>
                            </div>

                            <div className="business-info__item">
                                <div className="icon-wrap">
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        className="icon"
                                    />
                                </div>
                                <div className="nfo-block">
                                    <div className="">Working hours:</div>
                                    <div className="">
                                        {data.siteData[0].hours}
                                    </div>
                                </div>
                            </div>

                            <div className="business-info__item">
                                <div className="icon-wrap">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="icon"
                                    />
                                </div>
                                <div className="nfo-block">
                                    <div className="">Email:</div>
                                    <div className="">
                                        {data.siteData[0].email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-middle__right">
                        <h2 className="site-info-label">
                            Be the first to know
                        </h2>

                        <div className="site-info-descr">
                            <p>
                                The Waves Warranty covers your guitar against
                                defects in material and workmanship for as long
                                as you own the guitar, subject to the
                                limitations set forth in the documentation that
                                accompanies your product(s).
                            </p>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="footer-bottom">
                    <div className="copyright">
                        © Copyright {new Date().getFullYear()}
                        <br />
                        <span className="powered-by">
                            Powered by <i>Max</i>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    ) : null;
};

export default Footer;
