import React, { useState } from 'react';

export default function CloseAll({ onReopen }) {
  const [answerStatus, setAnswerStatus] = useState('idle'); // 'idle', 'wrong', 'correct'
  const [shake, setShake] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === 'Keyboard') {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('wrong');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setAnswerStatus('idle');
      }, 600); // Reset warna dan animasi setelah 0.6 detik
    }
  };

  return (
    <>
      {/* Background Blobs tetap dirender dari App.jsx, kita cuma ambil layarnya aja */}
      <div className="surprise-screen">
        <div className={`surprise-card ${shake ? 'shake-animation' : ''}`} style={{ maxWidth: '600px' }}>
          <h1>Oops! Safari Closed 🛑</h1>
          <p>Tapi sebelum bisa balik ke portofolio, jawab teka-teki ini dulu:</p>
          
          <div className="joke-box">
            <p>Punya banyak "kunci" tapi nggak bisa buka pintu.</p>
            <p>Punya "spasi" tapi nggak ada ruangannya.</p>
            <p>Bisa "enter" tapi nggak bisa masuk.</p>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Apakah aku?</p>
          </div>

          {answerStatus === 'correct' ? (
            <div className="success-state" style={{ animation: 'popIn 0.4s ease' }}>
              <h2 style={{ color: '#27C93F', marginBottom: '20px' }}>Tepat Sekali! 💻✨</h2>
              <button onClick={onReopen} className="reopen-btn">
                Reopen Safari 🧭
              </button>
            </div>
          ) : (
            <>
              <div className="options-grid">
                {['Piano', 'Keyboard', 'Gembok', 'Brankas'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="option-btn"
                    style={{
                       background: answerStatus === 'wrong' ? 'rgba(255, 95, 86, 0.2)' : 'var(--card-bg)',
                       color: answerStatus === 'wrong' ? '#FF5F56' : 'var(--text-primary)',
                       borderColor: answerStatus === 'wrong' ? '#FF5F56' : 'rgba(150, 150, 150, 0.2)'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {/* Tombol rahasia kalau user nyerah */}
              <button 
                onClick={onReopen} 
                className="give-up-btn"
              >
                Nyerah deh, balikin browsernya 🏳️
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}