import React from "react";

const Dictionary = () => {
  // Forum jargonunu saklamak için bir dizi kullanalım
  const forumJargon = [
    { terim: "OP", aciklama: "Original Poster (Konuyu Başlatan Kişi)" },
    { terim: "TL;DR", aciklama: "Too Long; Didn't Read (Çok Uzun; Okunmadı)" },
    { terim: "IIRC", aciklama: "If I Recall Correctly (Doğru Hatırlıyorsam)" },
    { terim: "IMO", aciklama: "In My Opinion (Benim Görüşüme Göre)" },
    { terim: "AMA", aciklama: "Ask Me Anything (Her Şeyi Bana Sorun)" },
    { terim: "FYI", aciklama: "For Your Information (Bilginize)" },
    { terim: "PM", aciklama: "Private Message (Özel Mesaj)" },
    { terim: "TIL", aciklama: "Today I Learned (Bugün Öğrendim)" },
    { terim: "YSK", aciklama: "You Should Know (Bilmen Gereken)" },
    // Yeni jargon terimlerini buraya ekleyebilirsiniz
  ];

  return (
    <div>
      <h2>Forum Jargonu</h2>
      <ul>
        {/* Forum jargonunu listeleyin */}
        {forumJargon.map((jargon, index) => (
          <li key={index}>
            <strong>{jargon.terim}</strong>: {jargon.aciklama}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dictionary;
