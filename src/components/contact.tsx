import React from "react";
import { COMPANY_INFO } from "../data/constans";
import { sendContactToWhatsApp } from "../utils/whatsApp_utils";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.elements.namedItem("contact-name") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("contact-email") as HTMLInputElement)
      .value;
    const message = (
      form.elements.namedItem("contact-message") as HTMLTextAreaElement
    ).value;

    sendContactToWhatsApp(name, email, message);
    form.reset();
    alert(
      "Terima kasih! Kami akan membuka WhatsApp untuk melanjutkan percakapan.",
    );
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <h2 className="section-title">Hubungi Kami</h2>
        <div className="contact-grid">
          <div>
            <h3 className="section-title-left">Ada Pertanyaan?</h3>
            <p className="contact-description">
              Jangan ragu untuk menghubungi kami. Tim Mansookie siap membantu
              kamu dengan respons cepat dan ramah.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>WhatsApp</h4>
                  <p>{COMPANY_INFO.phone}</p>
                </div>
              </div>

              {/* <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>{COMPANY_INFO.email}</p>
                </div>
              </div> */}

              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Lokasi</h4>
                  <p>{COMPANY_INFO.location}</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <h4>Jam Operasional</h4>
                  <p>Sesuai Mood</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Ikuti Kami</h4>
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/sweetmansookie?igsh=MWtib3lzN3EydXBibw=="
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📸 Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Kirim Pesan</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Nama</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="Nama kamu"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  placeholder="Email kamu"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Pesan</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Tuliskan pesan kamu di sini..."
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
