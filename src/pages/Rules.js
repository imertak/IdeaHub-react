// kurallar.js

import React from "react";

const Rules = () => {
  return (
    <div>
      <h1>Forum Kuralları</h1>

      <ol>
        <li>
          <strong>Hoşgeldiniz!</strong>
          <p>
            Forumumuza hoş geldiniz. Lütfen saygılı ve anlayışlı bir ortamda
            bulunmaya özen gösterin.
          </p>
        </li>

        <li>
          <strong>Tartışma Kuralları:</strong>
          <ul>
            <li>
              <p>
                Herkesin fikirlerine saygı gösterin. Tartışmalar yapıcı olmalı
                ve kişisel saldırı içermemelidir.
              </p>
            </li>
            <li>
              <p>
                Yanlış bilgi yaymak veya kasıtlı olarak yanıltıcı olmak
                yasaktır.
              </p>
            </li>
          </ul>
        </li>

        <li>
          <strong>İçerik Kuralları:</strong>
          <ul>
            <li>
              <p>
                Yasa dışı, saldırgan veya rahatsız edici içerikler paylaşmak
                yasaktır.
              </p>
            </li>
            <li>
              <p>
                Başkalarının gizliliğine saygı gösterin. Kişisel bilgileri
                paylaşmak veya başkalarının bilgilerini yayımlamak yasaktır.
              </p>
            </li>
          </ul>
        </li>

        <li>
          <strong>Spam ve Reklam:</strong>
          <p>Spam yapmak veya izinsiz reklam içeriği paylaşmak yasaktır.</p>
        </li>

        <li>
          <strong>Yönetim Kararları:</strong>
          <p>
            Yönetimin aldığı kararlara saygı gösterin. Kurallara uymayan
            içerikler silinebilir veya kullanıcının hesabı askıya alınabilir.
          </p>
        </li>
      </ol>

      <p>
        Bu kurallar, forumun düzenini sağlamak ve kullanıcıların olumlu bir
        deneyim yaşamasını sağlamak amacıyla oluşturulmuştur.
      </p>
    </div>
  );
};

export default Rules;
