import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* الهيدر */}
      <section className="about-hero">
        <h1>About Reda Store</h1>
        <p>Your trusted destination for the latest smartphones and accessories</p>
      </section>

      {/* قصتنا */}
      <section className="about-story">
        <div className="story-text">
          <h2>Who We Are</h2>
          <p>
            Reda Store is an online shop specialized in smartphones and
            accessories. We started with one simple goal: to bring you the
            best devices at the best prices, with fast delivery and reliable
            support.
          </p>
          <p>
            Every product in our store is carefully selected to guarantee
            quality and originality.
          </p>
        </div>
       
      </section>

      {/* مميزاتنا */}
      <section className="about-features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">🚚</span>
            <h3>Fast Delivery</h3>
            <p>We deliver your order anywhere as fast as possible.</p>
          </div>
          <div className="feature-card">
            <span className="icon">✅</span>
            <h3>Original Products</h3>
            <p>All our products are 100% original with warranty.</p>
          </div>
          <div className="feature-card">
            <span className="icon">💳</span>
            <h3>Secure Payment</h3>
            <p>Multiple safe payment methods to choose from.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🎧</span>
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you anytime.</p>
          </div>
        </div>
      </section>

      {/* أرقام */}
      <section className="about-stats">
        <div className="stat">
          <h3>+5000</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat">
          <h3>+300</h3>
          <p>Products</p>
        </div>
        <div className="stat">
          <h3>+50</h3>
          <p>Brands</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>
    </div>
  );
}