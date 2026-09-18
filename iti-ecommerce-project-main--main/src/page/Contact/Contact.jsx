import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! Your message has been sent ✅");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </section>

      <div className="contact-container">
        {/* معلومات التواصل */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>Cairo, Egypt</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h4>Phone</h4>
              <p>+20 100 000 0000</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h4>Email</h4>
              <p>info@redastore.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">🕐</span>
            <div>
              <h4>Working Hours</h4>
              <p>Sat - Thu: 9AM - 10PM</p>
            </div>
          </div>
        </div>

        {/* الفورم */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send A Message</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}