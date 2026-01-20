import React from "react";

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="section-title">Kenapa Pilih Mansookie?</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🥇</div>
            <h3>Bahan Pilihan</h3>
            <p>Perpaduan bahan ekonomis dan kualitas terbaik di kelasnya.</p>
          </div>
          <div className="about-card">
            <div className="about-icon">👨‍🍳</div>
            <h3>Resep Terbaik</h3>
            <p>Resep pilihan yang membuat cookies selalu renyah & lembut</p>
          </div>
          <div className="about-card">
            <div className="about-icon">📦</div>
            <h3>Kemasan yang unik</h3>
            <p>Packaging menarik, cocok untuk hadiah atau moment spesial</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;