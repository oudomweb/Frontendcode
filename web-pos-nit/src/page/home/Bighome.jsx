import React from "react";
import { Link } from "react-router-dom";
const Bighome = () => {
  return (
 <div className="topnav">
     <nav className="navbar">
        <h1 className="logo">PETRONAS</h1>
        <div className="nav-links">
          <a href="#">Business</a>
          <a href="#">Products and Services</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact Us</a>
         <Link to="/login">
         <button className="sign-in">Login</button>
         </Link>
        </div>
      </nav>
    <div className="container">
      <div className="hero">
        <img
          src="https://cdn.pli-petronas.com/styles/image_1440x714/s3/2024-10/PE-3287_Planejamento_-_Campanha_Digital_Syntium_Banner_Site_1920x713_V1.jpg?VersionId=3hfFCTaVqTUHd3720jM6neGTlYBUBd75&itok=mndNjw0r"
          alt="Petronas Plant"
          className="hero-image"
        />
      </div>
      <div className="initiatives">
        <div className="initiative">
        <img src="https://i.pinimg.com/736x/80/a6/33/80a6333b37ea09a69da6fe3b63ad25a0.jpg" alt="News 2" />
        <h3 className="title">BATTAMBONG</h3>
          <p className="text">
            We are committed to improving lives and uplifting communities through
            our sustainable development initiatives.
          </p>
        </div>
        <div className="initiative">
        <img src="https://i.pinimg.com/736x/63/7c/0f/637c0f2aa4e135a16d281e87c1d5b80e.jpg" alt="News 2" />
        <h3 className="title">SIEM REAP</h3>
          <p className="text">
            We are committed to improving lives and uplifting communities through
            our sustainable development initiatives.
          </p>
        </div>
        <div className="initiative">
        <img src="https://i.pinimg.com/736x/80/a6/33/80a6333b37ea09a69da6fe3b63ad25a0.jpg" alt="News 2" />
        <h3 className="title">BATTAMBONG</h3>
          <p className="text">
            We strive to build meaningful relationships with local communities
            and empower them to thrive.
          </p>
        </div>
        <div className="initiative">
        <img src="https://i.pinimg.com/736x/ae/c3/80/aec380d1f7d1885a190c5b56fdb4280f.jpg" alt="News 3" />
        <h3 className="title">PREY VENG</h3>
          <p className="text">
            We believe in the potential of local talent and are dedicated to
            nurturing their capabilities.
          </p>
        </div>
      </div>
      <div className="products-services">
        <h2 className="title_intitative">Our Products and Services</h2>
        <div className="products-list">
          <div className="product">
            <img src="https://www.oil-store.co.uk/wp-content/uploads/2022/02/71501-URANIA-5000-F-5W30-5L-1600X800.jpg" alt="Retail Business" />
            <h4 className="title">Retail Business</h4>
            <p className="text">
              From fuels to convenience shopping, we offer a variety of products
              and services at our retail outlets.
            </p>
          </div>
          <div className="product">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFEXGwebF6u7SLviHR9FmBSe4tT71CRrrLw&s" alt="Commercial Business" />
            <h4 className="title">Commercial Business</h4>
            <p className="text">
              We provide a range of fuel and lubricant solutions to help
              businesses operate more efficiently.
            </p>
          </div>
          <div className="product">
            <img src="https://eshop-best-chemical.com/cdn/shop/products/Syntium800-5W-30.png?v=1642577279&width=1920" alt="Lubricants" />
            <h4 className="title" >Lubricants</h4>
            <p className="text">
              Our range of lubricants is designed to protect engines and
              machinery, improve performance and reduce downtime.
            </p>
          </div>
          <div className="product">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxc_oKdLkfU_mHo3M8FPgL7PS0tRAC7acvDA&s" alt="LPG" />
            <h4 className="title">LPG</h4>
            <p className="text">
              We supply liquefied petroleum gas (LPG) for residential,
              commercial, and industrial applications.
            </p>
          </div>
        </div>
      </div>
      <div className="latest-news">
        <h2 className="title_intitative">Latest Companies of Petronas</h2>
        <div className="news-list">
          <div className="news-item">
            <img src="https://image.freshnewsasia.com/2020/id-067/fn-2020-12-30-16-32-23-0.jpg" alt="News 1" />
            <h4 className="title">TOTAL CAMBODIA</h4>
            <p className="text">
              PETRONAS has signed a long-term sales and purchase agreement to
              supply LNG to China National Offshore Oil Corporation (CNOOC).
            </p>
          </div>
          <div className="news-item">
            <img src="https://files.oaiusercontent.com/file-CJ2Jhs62DJF6wt6japhXrf?se=2025-03-01T04%3A52%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D07d17fdf-95a6-47ab-83c7-6ed50f0c11ec.webp&sig=wqlUwRoQcH8miZ%2BRSPER2d4iXBUAsfoCO1e41wO0jxc%3D" alt="News 2" />
            <h4 className="title">AMERICAN LUBES</h4>
            <p className="text">
              PETRONAS has been named the Best International Oil & Gas Company
              at the Energy Voice Gold Awards 2022.
            </p>
          </div>
          <div className="news-item">
            <img src="https://fifthperson.com/wp-content/uploads/2017/07/Petronas-Dagangan.png" alt="News 2" />
            <h4 className="title">PETRONAS</h4>
            <p className="text">
              PETRONAS has been named the Best International Oil & Gas Company
              at the Energy Voice Gold Awards 2022.
            </p>
          </div>
          <div className="news-item">
            <img src="https://tela2022.telapetroleum.com/wp-content/uploads/2022/07/Tela-Service-Station-05.jpg" alt="News 3" />
            <h4 className="title">PREY VENG</h4>
            <p className="text">
              PETRONAS has acquired a 49% equity stake in the Yuedong LNG
              terminal in China.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2023 PETRONAS</p>
        <div className="footer-links">
          <a href="#">Privacy Notice</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
    </div>
  );
};
export default Bighome;