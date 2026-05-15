# SecdeLock 🤲🔒

SecdeLock (eski adıyla DuaLock), Müslümanların namaz ve dualarını takip etmelerini, odaklanmalarını ve manevi gelişimlerini eğlenceli bir şekilde (XP ve Streak sistemiyle) sürdürmelerini sağlayan **mobil-öncelikli bir PWA (Progressive Web App)** uygulamasıdır.

## 🌟 Özellikler

*   **Odak Modları (Focus Modes):**
    *   🕌 **Namaz Modu:** Tam ekran kilit ve kronometre ile namaz esnasında telefonun dikkat dağıtmasını engeller.
    *   🤲 **Dua Modu:** İçerisinde Arapça, okunuş ve Türkçe anlamlarıyla birlikte dualar, ayetler ve tesbihatlar bulunur.
*   **Gerçek Zamanlı Namaz Vakitleri:** Aladhan API kullanılarak bulunduğunuz şehre göre güncel namaz vakitleri otomatik olarak hesaplanır.
*   **Günlük Görevler (Missions):** Kur'an okuma, sabah/akşam zikri, kuşluk namazı gibi ek görevleri tamamlayarak XP kazanabilirsiniz.
*   **İstatistikler & Seri (Streak):** Günlük namaz serinizi takip edebilir, haftalık grafikler üzerinden ne kadar disiplinli olduğunuzu görebilirsiniz.
*   **Titreşim (Haptics) ve Glow Tasarım:** Premium bir his vermek için "emerald" yeşili parlamalar (glow effects), cam tasarımı (glassmorphism) ve haptic feedback (titreşim) kullanılmıştır.
*   **PWA Desteği:** Manifest ve Service Worker ayarları hazırdır. Safari veya Chrome üzerinden "Ana Ekrana Ekle" (Add to Home Screen) diyerek yerel bir uygulama gibi kullanabilirsiniz.

## 🛠 Kullanılan Teknolojiler

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animasyonlar:** [Framer Motion](https://www.framer.com/motion/)
*   **State Management:** LocalStorage (Persist Custom Hooks)
*   **API:** [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)

## 🚀 Kurulum & Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz. En iyi deneyim için tarayıcı geliştirici araçlarından (DevTools) **mobil görünümü** açmanız tavsiye edilir.

## 📱 Vercel'de Yayınlama

Bu projeyi Vercel üzerinden ücretsiz bir şekilde yayınlayıp telefonunuzdan gerçek bir uygulama gibi test edebilirsiniz:

1. [Vercel](https://vercel.com/)'e giriş yapın.
2. "Add New Project" seçeneğine tıklayın.
3. Bu GitHub reposunu bağlayın.
4. "Deploy" butonuna basın. Herhangi bir ekstra ayar yapmanıza gerek yoktur.
