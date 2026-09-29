"use client";

import Link from "next/link";
import { I18nProvider } from "@/lib/i18n";

const H2 = "text-xl md:text-2xl font-semibold text-[#1A2834] mt-12 mb-4";
const H3 = "text-base font-semibold text-[#1A2834] mt-6 mb-2";
const P = "text-base text-[#4A5A68] leading-relaxed mb-4";
const UL = "list-disc pl-6 space-y-2 text-[#4A5A68] mb-4";
const A = "text-[#2B5372] underline underline-offset-4 hover:text-[#E07A5F] transition-colors";
const STRONG = "font-semibold text-[#1A2834]";
const DIV = "border-t border-black/[0.06] my-8";

function KvkkContent() {
  return (
    <main className="bg-[#F4F6F8] text-[#1A2834]">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-[#2B5372] transition-colors duration-150 hover:text-[#1E3F58]"
        >
          ← Ana sayfaya dön
        </Link>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
          Yasal
        </p>
        <h1 className="apple-headline text-balance text-3xl font-semibold tracking-tight text-[#1A2834] md:text-5xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-4 text-sm text-[#7A8A98]">Son güncelleme: Ocak 2026</p>
        <p className="mt-4 text-base leading-relaxed text-[#4A5A68]">
          İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (&quot;KVKK&quot;) Madde 10 uyarınca, veri sorumlusu sıfatıyla Mustafa Çapan
          (&quot;Kassandra Prophecy&quot;) tarafından kişisel verilerinizin işlenmesine
          ilişkin olarak sizleri bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <section>
          <h2 className={H2}>1. Veri Sorumlusu</h2>
          <p className={P}>KVKK kapsamında veri sorumlusu:</p>
          <ul className={UL}>
            <li><span className={STRONG}>Ad:</span> Mustafa Çapan (Kassandra Prophecy)</li>
            <li><span className={STRONG}>E-posta:</span> <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a></li>
            <li><span className={STRONG}>Konum:</span> Türkiye</li>
          </ul>
          <p className={P}>
            Kassandra Prophecy henüz şirketleşmemiş olup bireysel geliştirici olarak
            faaliyet göstermektedir. İşbu metin, faaliyetlerimiz kapsamında işlenen
            kişisel verileriniz hakkında sizleri bilgilendirmek amacıyla hazırlanmıştır.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>2. İşlenen Kişisel Veriler</h2>
          <p className={P}>Aşağıdaki kişisel verileriniz işlenmektedir:</p>
          <h3 className={H3}>2.1. Tarafınızca sağlanan veriler (iletişim formu aracılığıyla)</h3>
          <ul className={UL}>
            <li>Ad ve soyad</li>
            <li>İş e-posta adresi</li>
            <li>Şirket adı</li>
            <li>Pozisyon / unvan</li>
            <li>Şirket büyüklüğü</li>
            <li>Rol (CISO, CFO, vb.)</li>
            <li>İlgi alanları</li>
            <li>İsteğe bağlı notlar</li>
          </ul>
          <h3 className={H3}>2.2. Otomatik olarak toplanan veriler</h3>
          <ul className={UL}>
            <li>IP adresi (güvenlik ve kötüye kullanım önleme amacıyla)</li>
            <li>Sunucu erişim logları (tarayıcı bilgisi, işletim sistemi, zaman damgası)</li>
          </ul>
          <h3 className={H3}>2.3. İşlenmeyen veriler</h3>
          <ul className={UL}>
            <li>Özel nitelikli kişisel veriler (sağlık, biyometrik, din, ırk, siyasi görüş)</li>
            <li>Ödeme bilgileri</li>
            <li>Konum verisi (IP kaynaklı ülke dışında)</li>
          </ul>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p className={P}>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul className={UL}>
            <li>Demo ve bilgilendirme taleplerinize yanıt vermek</li>
            <li>Ürün ve hizmetlerimiz hakkında sizinle iletişim kurmak</li>
            <li>Güvenlik ve spam önleme (hız sınırlama, honeypot)</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi (vergi, muhasebe)</li>
          </ul>
          <p className={P}>Kişisel verileriniz:</p>
          <ul className={UL}>
            <li>Üçüncü taraflara satılmaz, kiralanmaz veya takas edilmez</li>
            <li>Otomatik karar verme süreçlerinde kullanılmaz</li>
            <li>Açık rızanız olmadan pazarlama amaçlı kullanılmaz</li>
          </ul>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>4. Kişisel Verilerin Aktarılması</h2>
          <h3 className={H3}>4.1. Yurt içi</h3>
          <p className={P}>
            Kişisel verileriniz, yasal yükümlülükler çerçevesinde yetkili kamu
            kurum ve kuruluşlarına (talep edilmesi halinde) aktarılabilir.
          </p>
          <h3 className={H3}>4.2. Yurt dışı</h3>
          <p className={P}>
            Aşağıdaki hizmet sağlayıcıları aracılığıyla kişisel verileriniz yurt
            dışına aktarılmaktadır:
          </p>
          <ul className={UL}>
            <li><span className={STRONG}>Vercel</span> (hosting, ABD)</li>
            <li><span className={STRONG}>Resend</span> (e-posta gönderimi, ABD)</li>
            <li><span className={STRONG}>Zoho Mail</span> (e-posta alımı, ABD/Hindistan)</li>
            <li><span className={STRONG}>Namecheap</span> (alan adı ve DNS, ABD)</li>
          </ul>
          <p className={P}>
            KVKK Madde 9 kapsamında, yurt dışına aktarım için form gönderiminiz
            sırasında verdiğiniz açık rıza dayanak alınmaktadır. Bu rızayı dilediğiniz
            zaman geri çekebilirsiniz; ancak bu durumda talebinize yanıt verme
            kabiliyetimiz sınırlanabilir.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>5. Toplama Yöntemi ve Hukuki Sebep</h2>
          <p className={P}>
            Kişisel verileriniz, aşağıdaki hukuki sebepler çerçevesinde toplanmaktadır.
            KVKK Madde 5/2 kapsamında:
          </p>
          <ul className={UL}>
            <li><span className={STRONG}>(a) Açık rızanız:</span> İletişim formu aracılığıyla veri gönderiminiz</li>
            <li><span className={STRONG}>(ç) Hukuki yükümlülük:</span> Vergi ve muhasebe kayıtları</li>
            <li><span className={STRONG}>(f) Meşru menfaat:</span> Güvenlik, spam önleme, hız sınırlama</li>
          </ul>
          <p className={P}>
            Veriler, elektronik ortamda (web sitesi formu, sunucu logları) otomatik
            veya yarı otomatik yöntemlerle toplanır.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>6. Saklama Süresi</h2>
          <ul className={UL}>
            <li>İletişim formu verileri: 24 ay (veya iş ilişkisi sonuna kadar)</li>
            <li>Sunucu erişim logları: 30 gün</li>
            <li>E-postalar: 24 ay</li>
          </ul>
          <p className={P}>Daha erken silme talebiniz için Bölüm 8&apos;e bakınız.</p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>7. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
          <p className={P}>KVKK Madde 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul className={UL}>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>KVKK Madde 7 çerçevesinde silinmesini veya yok edilmesini isteme</li>
            <li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
            <li>Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ul>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>8. Başvuru Yöntemi</h2>
          <p className={P}>Yukarıda belirtilen haklarınızı kullanmak için:</p>
          <ul className={UL}>
            <li>E-posta: <a href="mailto:mustafa@kassandraprophecy.com" className={A}>mustafa@kassandraprophecy.com</a></li>
            <li>Başvurunuzda kimliğinizi tespit edici bilgiler ile talep konusunu belirtiniz</li>
          </ul>
          <p className={P}>
            Talebiniz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. Ancak
            işlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma
            Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
          </p>
        </section>

        <div className={DIV} aria-hidden />

        <section>
          <h2 className={H2}>9. VERBİS Kaydı</h2>
          <p className={P}>
            Veri Sorumluları Sicili (VERBİS) yükümlülüğü, yıllık çalışan sayısı 10&apos;dan
            az ve yıllık mali bilanço toplamı 10 milyon TL&apos;den az olan veri
            sorumluları için uygulanmamaktadır. Bu kapsamda Kassandra Prophecy VERBİS
            kayıt yükümlülüğünden muaftır.
          </p>
          <p className={P}>
            Muafiyet koşullarının ortadan kalkması hâlinde, gerekli VERBİS kaydı
            yapılacak ve bu metin güncellenecektir.
          </p>
          <p className={P}>
            İlgili: <Link href="/terms" className={A}>Kullanım Koşulları</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function KvkkPage() {
  return (
    <I18nProvider>
      <KvkkContent />
    </I18nProvider>
  );
}
