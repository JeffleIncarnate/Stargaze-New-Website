import "./footer.scss";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__Img">
        <img src="/icons/white.svg" alt="" />
      </div>
      <div className="Footer__Links">
        <p>PRIVACY POLICY</p>
        <p>TERMS & CONDITIONS</p>
        <p>RETURN POLICY</p>
      </div>
      <div className="Footer__Email">
        <a href="mailto:support@stargaze.com">SUPPORT@STARGAZE</a>
      </div>
    </footer>
  );
};

export default Footer;
