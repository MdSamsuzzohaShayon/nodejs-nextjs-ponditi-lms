/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from 'react-redux';

function Footer() {
  const socialItems = useSelector((state) => state.elements.socialItems);
  return (
    <footer className="Footer w-full text-white ">
      {/* <div className="footer-top bg-primary d-flex justify-content-center flex-column align-items-center">
        <div className="container d-flex justify-content-between align-items-center flex-column flex-md-row h-full">
          <div className="company">
            <h4 className="h4 text-uppercase">COMPANY</h4>
            <ul className="d-flex justify-content-start align-items-center align-items-md-start flex-column w-full px-0">
              <li className="list-unstyled ">About </li>
              <li className="list-unstyled ">Careers </li>
              <li className="list-unstyled ">Press </li>
              <li className="list-unstyled ">Contact </li>
              <li className="list-unstyled ">Compliance </li>
            </ul>
          </div>
          <div className="licence">
            <h4 className="h4 text-uppercase">Licence</h4>
            <ul className="d-flex justify-content-start align-items-center flex-column w-full px-0">
              <li className="list-unstyled ">About </li>
              <li className="list-unstyled ">Careers </li>
              <li className="list-unstyled ">Press </li>
              <li className="list-unstyled ">Contact </li>
              <li className="list-unstyled ">Compliance </li>
            </ul>
          </div>
          <div className="service">
            <h4 className="h4 text-uppercase">Service</h4>
            <ul className="d-flex justify-content-start align-items-center align-items-md-end flex-column w-full px-0">
              <li className="list-unstyled ">About </li>
              <li className="list-unstyled ">Careers </li>
              <li className="list-unstyled ">Press </li>
              <li className="list-unstyled ">Contact </li>
              <li className="list-unstyled ">Compliance </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="footer-bottom bg-primary d-flex justify-content-center flex-column align-items-center">
        <div className="container d-flex flex-column-reverse flex-md-row justify-content-between align-items-center">
          <div className="copyright">
            <span>Copyright © 2023 Ponditil All Rights Reserved</span>
          </div>
          <div className="mail">
            <p className="mb-0 mt-md-1">infor@ponditibd.com</p>
          </div>
          <div className="policies">
            <ul className="d-flex flex-column flex-md-row justify-content-end align-items-center w-full px-0 m-0 footer-bottom-policies">
              <li className="list-unstyled px-3  footer-bottom-list-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-unstyled px-3  footer-bottom-list-item">
                <a href="#">Contact</a>
              </li>
              <li className="list-unstyled px-3  footer-bottom-list-item">
                <a href="#">FAQs</a>
              </li>
              <li className="list-unstyled px-3  footer-bottom-list-item">
                <div className="social d-flex h-full py-md-0 py-2">
                  <ul className="d-flex justify-centent-start align-items-center m-0 px-1">
                    {socialItems.map((si) => (
                      <li className="nav-item list-unstyled" key={si.id}>
                        <a href="#" className="nav-link">
                          <img src={`/icons/${si.icon}`} alt={si.name} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
