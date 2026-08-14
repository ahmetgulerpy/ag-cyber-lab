# AG Cyber Lab — Community Edition

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/status-active_development-b7ff3c)

**AG Cyber Lab**, siber güvenliği yalnızca araç ve komut ezberiyle değil; sistemlerin nasıl çalıştığını anlayarak öğretmeyi hedefleyen açık kaynak bir siber güvenlik eğitim platformudur.

Proje; modüler dersler, uygulamalı lab görevleri, ilerleme takibi ve doğrulama mekanizmalarıyla başlangıç seviyesinden itibaren sağlam bir teknik temel oluşturmayı amaçlar.

> **Not:** AG Cyber Lab bir saldırı aracı koleksiyonu değildir. Eğitim, temel sistem bilgisi, analist düşünme biçimi ve kontrollü lab çalışmaları üzerine odaklanır.

---

## Amaç

Siber güvenliğe yeni başlayan birçok kişi doğrudan araçlara, komutlara veya hazır saldırı senaryolarına yöneliyor. AG Cyber Lab’in amacı önce şu sorulara sağlam cevaplar vermek:

- Bilgisayar nasıl çalışır?
- CPU, RAM, depolama ve işletim sistemi ne yapar?
- Process, dosya sistemi, ağ, port ve servis gibi kavramlar neden önemlidir?
- Bir güvenlik analisti gözlem yaparken nasıl düşünmelidir?
- Teknik bilgi pratik lab görevlerine nasıl dönüştürülür?

Bu proje, öğrenciyi yalnızca “hangi komutu çalıştırmalıyım?” noktasına değil, “sistemde ne oluyor ve bunu nasıl doğrularım?” noktasına taşımayı hedefler.

---

## Mevcut Durum

Proje aktif geliştirme aşamasındadır.

Şu anda çalışan temel özellikler:

### Learning System

- Markdown tabanlı ders sistemi
- Server-side lesson loader
- 12 derslik Module 01 içeriği
- Markdown / GFM renderer
- Kod blokları, tablolar, checklist ve blockquote desteği
- Previous / Next lesson navigation
- Ders tamamlama sistemi
- localStorage ile ders progress kaydetme ve geri yükleme
- `/lessons` katalog ekranı

### Lab System

- JSON tabanlı LabDefinition yapısı
- Server-side Lab Loader
- Validator Engine
- Hint Engine
- Progress Engine
- LabRunner
- Task renderer
- Result Screen
- Retry / reset
- localStorage ile lab progress kaydetme ve geri yükleme
- Lab 01 uçtan uca çalışan örnek lab

---

## Mevcut İçerik

### Module 01 — Bilgisayar ve Siber Güvenlik Temelleri

Module 01 şu anda 12 dersten oluşur:

1. Ders 01 — Bilgisayar Nedir?
2. Ders 02 — CPU, RAM ve Depolama: Bilgisayar Veriyi Nasıl İşler?
3. Ders 03 — İşletim Sistemi: Bilgisayarı Kim Yönetiyor?
4. Ders 04 — Dosya Sistemleri: Veriler Diskte Nasıl Düzenlenir?
5. Ders 05 — Process ve Thread: Çalışan Programları Anlamak
6. Ders 06 — Network Fundamentals: Bilgisayarlar Birbirleriyle Nasıl İletişim Kurar?
7. Ders 07 — Network Protocols: Ağdaki İletişimin Kuralları
8. Ders 08 — Ports, Services & Network Discovery
9. Ders 09 — Command Line Basics: Sistemi Terminalden Anlamak
10. Ders 10 — Temel Siber Güvenlik Kavramları: Neyi, Neden Koruyoruz?
11. Ders 11 — Module Review & Mini Case: Kanıttan Sonuca
12. Ders 12 — Final Assessment: Modül 01

### Mevcut Lab

- **Lab 01 — Know Your Machine**

Bu lab, öğrencinin kendi sistemindeki CPU, RAM, depolama, işletim sistemi ve temel gözlem bilgilerini anlamasını hedefler.

---

## Uygulama Ekranları

Projede şu ana rotalar bulunur:

```text
/lessons
/lessons/lesson-03-operating-system
/labs
/labs/01
```

Öne çıkan ekranlar:

- Lesson catalog
- Markdown lesson reader
- Lesson completion progress
- Labs catalog
- Active LabRunner
- Hint panel
- Verification result
- Final result screen

---

## Teknolojiler

Proje şu teknolojilerle geliştirilmektedir:

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS v4**
- **React Markdown**
- **remark-gfm**
- **localStorage persistence**
- **JSON-based lab definitions**
- **Markdown-based lesson content**

---

## Proje Yapısı

```text
AG-Cyber-Lab/
├── labs/
│   └── module-01/
│       └── lab-01-know-your-machine.json
│
├── modules/
│   └── 01-computer-and-cybersecurity-basics/
│       ├── lesson-01-what-is-a-computer.md
│       ├── lesson-02-cpu-ram-disk.md
│       ├── lesson-03-operating-system.md
│       └── ...
│
└── app/
    ├── app/
    │   ├── labs/
    │   ├── lessons/
    │   └── components/
    │
    ├── lib/
    │   ├── labs/
    │   └── lessons/
    │
    ├── types/
    └── package.json
```

---

## Kurulum

Projeyi yerelde çalıştırmak için:

```bash
git clone https://github.com/ahmetgulerpy/ag-cyber-lab.git
cd ag-cyber-lab/app
npm install
npm run dev
```

Ardından tarayıcıda:

```text
http://localhost:3000/lessons
```

veya:

```text
http://localhost:3000/labs
```

adresleri açılabilir.

Production build için:

```bash
npm run build
npm start
```

---

## Geliştirme Notları

- `npm` komutları `app/` klasörü içinde çalıştırılır.
- Git komutları repo kökünde çalıştırılır.
- Ders içerikleri `modules/` altında Markdown olarak tutulur.
- Lab içerikleri `labs/` altında JSON olarak tutulur.
- Ders ve lab içerikleri source of truth olarak ele alınır.
- UI tarafı içerik semantiğini değiştirmeden render eder.

---

## Roadmap

Kısa ve orta vadeli hedefler:

- Interactive lesson checklist sistemi
- Ders içi response / worksheet alanları
- Quiz blokları
- Module 01 için ek lablar
- Daha gelişmiş lesson progress görünümü
- Public demo deployment
- Module 02 içerikleri
- Katkı rehberi
- Test altyapısı
- Daha kapsamlı accessibility ve responsive polish

Uzun vadede hedeflenen alanlar:

- Network fundamentals labları
- Linux basics labları
- Blue Team temel senaryoları
- DFIR başlangıç senaryoları
- Log analizi görevleri
- Mini case çalışmaları
- Değerlendirme ve final assessment sistemleri

---

## Etik Kullanım

AG Cyber Lab eğitim amaçlıdır.

Bu projedeki içerikler ve lab yapısı:

- Kendi sistemini tanıma,
- kontrollü öğrenme,
- temel kavramları anlama,
- analist bakış açısı geliştirme

amaçlarıyla hazırlanır.

İzinsiz sistemlerde test, tarama, saldırı veya kötüye kullanım amaçlı kullanılmamalıdır.

---

## Katkı

Proje aktif geliştirme aşamasındadır. Geri bildirimler, öneriler ve katkılar değerlidir.

Katkı fikirleri:

- Ders içeriği önerileri
- Lab fikri önerileri
- UI/UX iyileştirmeleri
- Hata bildirimleri
- Dokümantasyon geliştirmeleri
- Eğitim akışı önerileri

Issue veya pull request açabilirsiniz.

---

## Lisans

AG Cyber Lab çift lisans modeli kullanır.

- `app/` altındaki yazılım kaynak kodu [MIT License](LICENSES/MIT.txt) altında lisanslanmıştır.
- `modules/` ve `labs/` altındaki eğitim içerikleri [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](LICENSES/CC-BY-NC-4.0.txt) altında lisanslanmıştır.

Ayrıntılı lisans kapsamı için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

AG Cyber Lab adı, logosu ve proje kimliği bu lisanslar kapsamında bir onay, bağlantı veya resmi proje izni vermez.