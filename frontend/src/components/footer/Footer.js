import React from "react";
import "./footer.css";
import { FaFacebook, CgInstagram, CgTwitter } from "react-icons/all";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div class="row primary">
          <div class="column about">
            <h3>Mithai Mitra</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              voluptatem corporis error non,
            </p>

            <div class="social">
              <a href="https://www.facebook.com/Mithai-Mitra-123763523556890" target="_blank">

              <FaFacebook />
              </a>
              <a href="https://instagram.com/mithaimitra?utm_medium=copy_link" target="_blank">
              <CgInstagram />
              </a>
              <a href="https://twitter.com/MithaiMitra?t=tpITdL7IjLVTJxcHXqSRkw&s=09" target="_blank">

              <CgTwitter />
              </a>
            </div>
          </div>

          <div class="column links hidden">
            <h3> Links</h3>

            <ul>
              <li>
                <a href="#faq">F.A.Q</a>
              </li>
              <li>
                <a href="https://www.termsfeed.com/live/494133cd-bd49-4343-a14e-2f37ea1d356c">Cookies Policy</a>
              </li>
              <li>
                <a href="#terms-of-services">Terms Of Service</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>

          <div class="column links">
            <h3>Some Links</h3>
            <ul>
              <li>
                <a href="/#faq">F.A.Q</a>
              </li>
              <li>
                <a href="https://www.termsfeed.com/live/494133cd-bd49-4343-a14e-2f37ea1d356c">Cookies Policy</a>
              </li>
              <li>
                <a href="/#terms-of-services">Terms Of Service</a>
              </li>
              <li>
                <a href="/products">Explore</a>
              </li>
            </ul>
          </div>

          {/* for Contact */}

          <div class="column subscribe">
            <h3>Contact Us</h3>
            <div>
              <h5>Address</h5>
              Bajrang Chauraha , Yashoda Nagar , Kanpur. PIN - 208001
              <h5>Email</h5>
              <a
                href="mailto:info@fastes.in"
                className="ti-contact-link"
                Style={"user-select: auto;"}
              >
                info@fastes.in
              </a>
              <h5>Phone</h5>
              <a
                href="tel:88878 41538"
                className="ti-contact-link"
                Style={"user-select: auto;"}
              >
                {" "}
                8858948976{" "}
              </a>
            </div>
          </div>
        </div>

        <div class="row copyright">
          <div class="footer-menu">
            <a href="/#">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </div>
          <p>Copyright &copy; MithaiMitra</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
