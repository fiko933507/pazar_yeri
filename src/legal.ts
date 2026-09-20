export type LegalDocument = { id: string; title: string; summary: string; body: string[] };

export const legalDocuments: LegalDocument[] = [
  {
    id: 'privacy', title: 'Gizlilik Politikası', summary: 'Toplanan veriler, kullanım amaçları ve güvenlik yaklaşımı.',
    body: [
      'PAZAR; hesap, iletişim, teslimat, sipariş, ödeme işlem referansı, cihaz ve kullanım verilerini yalnızca hizmeti sunmak, güvenliği sağlamak ve yasal yükümlülüklerini yerine getirmek amacıyla işler.',
      'Ödeme kartı bilgileri PAZAR tarafından saklanmaz; yetkili ödeme kuruluşu tarafından işlenir. Kargo için gerekli ad, telefon ve adres bilgileri ilgili kargo sağlayıcısıyla paylaşılabilir.',
      'Veriler aktarım sırasında güvenli bağlantılarla korunur. Saklama süreleri işlem türüne ve yasal zorunluluklara göre belirlenir; süre sonunda veriler silinir, yok edilir veya anonimleştirilir.',
      'Kullanıcı; verilerine erişme, düzeltme, silme ve işlemeye itiraz etme taleplerini uygulamadaki Destek alanından iletebilir.',
      'Bu metin taslaktır. Yayından önce işletme unvanı, adres, iletişim kanalı, altyapı ve hizmet sağlayıcıları eklenmelidir.',
    ],
  },
  {
    id: 'kvkk', title: 'KVKK Aydınlatma Metni', summary: '6698 sayılı Kanun kapsamındaki bilgilendirme.',
    body: [
      'Veri sorumlusu: [İşletme unvanı ve adresi]. Kişisel verileriniz üyelik, pazaryeri hizmetleri, sipariş yönetimi, dolandırıcılığın önlenmesi, destek ve mevzuata uyum amaçlarıyla işlenebilir.',
      'Veriler; sözleşmenin kurulması veya ifası, hukuki yükümlülük, bir hakkın tesisi ve meşru menfaat hukuki sebeplerine; gerekli durumlarda açık rızanıza dayanılarak işlenir.',
      'Gerekli veriler ödeme, kargo, barındırma, bildirim ve yetkili kamu kurumlarıyla amaçla sınırlı olarak paylaşılabilir.',
      'KVKK madde 11 kapsamındaki haklarınıza ilişkin başvurularınızı [başvuru e-postası/adresi] üzerinden iletebilirsiniz.',
    ],
  },
  {
    id: 'membership', title: 'Kullanıcı Sözleşmesi', summary: 'Üyelik, kullanım koşulları ve platform sorumlulukları.',
    body: [
      'Kullanıcı doğru ve güncel bilgi vermeyi, hesabının güvenliğini korumayı ve platformu hukuka uygun kullanmayı kabul eder.',
      'PAZAR alıcı ile bağımsız ev üreticisini buluşturan aracı hizmet sağlayıcıdır. Ürünün üretimi, niteliği ve mevzuata uygunluğundan satıcı sorumludur; platform doğrulama ve uyuşmazlık desteği sunar.',
      'Dolandırıcılık, taciz, sahte ürün, manipülatif yorum ve platform dışı ödeme yönlendirmeleri yasaktır.',
      'İhlal halinde içerik kaldırılabilir, işlem askıya alınabilir veya hesap kapatılabilir.',
    ],
  },
  {
    id: 'seller', title: 'Üretici/Satıcı Sözleşmesi', summary: 'Ev üreticilerinin yükümlülükleri ve platform standartları.',
    body: [
      'Satıcı yalnızca kendisinin veya doğrulanmış küçük ekibinin ürettiği ürünleri listeleyebilir. Toptan alınmış, seri üretim veya yanıltıcı biçimde el yapımı gösterilen ürünler yasaktır.',
      'Satıcı ürün içeriği, ölçü, malzeme, üretim süresi, stok, fiyat, vergi ve teslimat bilgilerini eksiksiz sunar.',
      'Gıda, kozmetik, çocuk ürünü ve benzeri düzenlemeye tabi kategorilerde gerekli izin, kayıt ve güvenlik belgelerinin sağlanması satıcının sorumluluğundadır.',
      'Komisyon, ödeme aktarım süresi, iade kesintileri ve uyuşmazlık prosedürü nihai ticari model belirlendiğinde sözleşmeye işlenecektir.',
    ],
  },
  {
    id: 'distance', title: 'Mesafeli Satış ve Ön Bilgilendirme', summary: 'Sipariş öncesi zorunlu satış ve cayma bilgileri.',
    body: [
      'Her siparişte satıcının kimliği, ürünün temel nitelikleri, toplam bedel, ek masraflar, teslimat süresi, cayma ve iade şartları ödeme öncesinde ayrıca gösterilir.',
      'Siparişe özel kişiselleştirilen veya mevzuatta istisna sayılan ürünlerde cayma hakkı bulunmayabilir; bu durum ödeme öncesinde açıkça belirtilir.',
      'Genel metin tek başına sipariş sözleşmesi değildir. Siparişe özgü ön bilgilendirme formu ve mesafeli satış sözleşmesi kullanıcıya kalıcı veri saklayıcısıyla iletilir.',
    ],
  },
  {
    id: 'returns', title: 'İptal, İade ve Cayma Politikası', summary: 'Teslimat öncesi ve sonrası başvuru süreçleri.',
    body: [
      'Standart ürünlerde kullanıcı, yürürlükteki mevzuattaki süre ve şartlar içinde cayma talebi oluşturabilir.',
      'Kişiye özel üretilen ürünler, çabuk bozulabilen ürünler ve hijyen koruması açılmış uygun ürünler yasal istisnalara tabi olabilir.',
      'Hasarlı veya yanlış ürünlerde kullanıcı teslimat fotoğraflarıyla destek kaydı açabilir. İnceleme sonunda iade, yeniden üretim veya bedel iadesi seçenekleri uygulanır.',
    ],
  },
  {
    id: 'community', title: 'Topluluk ve Yasaklı Ürün Kuralları', summary: 'Güvenli topluluk, içerik ve ürün standartları.',
    body: [
      'Silah, uyuşturucu, sahte ürün, izinsiz sağlık iddiası içeren ürün, nefret içeriği, telif veya marka hakkını ihlal eden ürünler yasaktır.',
      'Üreticiye veya alıcıya yönelik taciz, ayrımcılık, kişisel verilerin izinsiz paylaşılması ve sahte değerlendirme yasaktır.',
      'Şüpheli listelemeler kullanıcılar tarafından bildirilebilir; inceleme sırasında ürün görünürlüğü geçici olarak durdurulabilir.',
    ],
  },
  {
    id: 'cookies', title: 'Çerez ve Benzer Teknolojiler', summary: 'Web sitesi ve ölçüm teknolojileri hakkında bilgi.',
    body: [
      'Zorunlu teknolojiler oturum, güvenlik ve sepet işlevleri için kullanılır. Analitik veya pazarlama teknolojileri kullanılacaksa kullanıcıya tercih ekranı sunulur.',
      'Mobil uygulamadaki SDK ve cihaz verisi kullanımları Gizlilik Politikası ve Google Play Veri Güvenliği beyanıyla tutarlı şekilde açıklanır.',
    ],
  },
];

