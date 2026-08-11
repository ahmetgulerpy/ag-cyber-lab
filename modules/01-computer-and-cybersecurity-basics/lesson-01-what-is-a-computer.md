# Ders 01 — Bilgisayar Nedir?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Bilgisayarın ne olduğunu açıklayabileceksin.
- Donanım ve yazılım arasındaki farkı anlayabileceksin.
- CPU, RAM ve disk arasındaki temel farkları açıklayabileceksin.
- İşletim sisteminin temel görevlerini anlayabileceksin.
- Bir programı çalıştırdığında bilgisayarında temel olarak neler olduğunu anlayabileceksin.
- Bu bilgilerin siber güvenlikle neden ilişkili olduğunu kavrayabileceksin.

---

# 1. Bilgisayar Nedir?

En basit haliyle bilgisayar;

**verileri alan, işleyen, saklayan ve gerektiğinde sonuç üreten elektronik bir sistemdir.**

Örneğin bilgisayarında bir hesap makinesi uygulamasını açtığında:

1. Sen bir işlem girersin.
2. Bilgisayar bu veriyi alır.
3. İşlemci gerekli işlemleri gerçekleştirir.
4. Gerekli veriler bellekte işlenir.
5. Sonuç ekranda gösterilir.

Aslında bilgisayar üzerinde yaptığımız işlemlerin büyük bölümü bu temel mantığın çok daha gelişmiş hâlidir.

---

# 2. Donanım Nedir?

Donanım, bilgisayarın **fiziksel olarak dokunabildiğimiz parçalarıdır.**

Örneğin:

- CPU
- RAM
- SSD
- HDD
- Anakart
- Ekran kartı
- Klavye
- Mouse
- Monitör

bunların tamamı donanımdır.

Kısaca:

> **Donanım = Bilgisayarın fiziksel parçaları**

---

# 3. Yazılım Nedir?

Yazılım, bilgisayara belirli işlemleri yaptıran program ve kodlardan oluşur.

Örneğin:

- Windows
- Linux
- Google Chrome
- Visual Studio Code
- Python
- Oyunlar
- Antivirüs yazılımları

birer yazılım örneğidir.

Kısaca:

> **Yazılım = Bilgisayara ne yapacağını söyleyen programlar**

---

# 4. Donanım ve Yazılım Birlikte Çalışır

Donanım ve yazılım birbirinden bağımsız düşünülemez.

Örneğin Google Chrome'u açtığını düşün.

Chrome bir yazılımdır.

Fakat Chrome'un çalışabilmesi için:

- CPU'ya,
- RAM'e,
- depolama alanına,
- işletim sistemine

ihtiyacı vardır.

Basitleştirirsek:

```text
          YAZILIM
             │
             ▼
      İŞLETİM SİSTEMİ
             │
             ▼
          DONANIM
       ┌─────┼─────┐
       ▼     ▼     ▼
      CPU   RAM   DİSK
```

Burada her parçanın farklı bir görevi vardır.

---

# 5. Bir Programı Açtığımızda Ne Olur?

Şimdi biraz daha önemli bir noktaya gelelim.

Bilgisayarında Google Chrome'u açtığını düşün.

Sen sadece Chrome simgesine tıklıyorsun.

Fakat bilgisayarın arka planında birçok işlem gerçekleşiyor.

Bunu adım adım inceleyelim.

---

## 5.1 Program Diskte Bulunur

Chrome'un çalışması için gerekli dosyalar bilgisayarındaki depolama biriminde bulunur.

Örneğin:

```text
SSD / HDD
    │
    └── Chrome dosyaları
```

Bu dosyalar bilgisayar kapatılsa bile depolama biriminde kalır.

Burada önemli nokta şudur:

> **Programın dosyaları depolama biriminde saklanabilir.**

---

## 5.2 İşletim Sistemi Programı Çalıştırır

Chrome'a tıkladığında işletim sistemi bunun bir program olduğunu anlar ve çalıştırılması için gerekli işlemleri başlatır.

Windows gibi işletim sistemleri burada önemli bir görev üstlenir.

İşletim sistemi;

- Programların çalışmasını sağlar.
- Sistem kaynaklarının yönetilmesine yardımcı olur.
- Bellek kullanımını yönetir.
- Donanım ve yazılım arasındaki iletişimi sağlar.

Yani işletim sistemi, kullanıcı ile donanım arasında önemli bir katman görevi görür.

---

## 5.3 Program RAM'e Yüklenir

Programın çalışabilmesi için ihtiyaç duyduğu bazı veriler RAM'e yüklenir.

Basitleştirirsek:

```text
SSD / HDD
    │
    │ Program dosyaları
    ▼
   RAM
    │
    │ Çalışan program
    ▼
   CPU
```

Burada çok önemli bir ayrım vardır:

> **Disk programları ve verileri kalıcı olarak saklamak için kullanılır.**

> **RAM ise programlar çalışırken ihtiyaç duyulan verilerin geçici olarak tutulduğu çalışma alanıdır.**

---

## 5.4 CPU Komutları İşler

Program çalışırken bilgisayarın işlemcisi yani **CPU**, çeşitli komutları işler.

Örneğin Chrome;

- Kullanıcı işlemlerini,
- Hesaplamaları,
- Sayfa verilerini,
- Programın kendi işlemlerini

yürütmek için CPU kaynaklarını kullanabilir.

CPU'nun temel görevini şimdilik şöyle düşünebilirsin:

> **CPU = Komutları işleyen temel işlem birimi**

CPU'yu daha ayrıntılı olarak ilerleyen dersimizde inceleyeceğiz.

---

## 5.5 Program Çalışır

Tüm bu işlemlerin sonucunda Chrome çalışır ve biz internet sitelerini kullanmaya başlayabiliriz.

Senin gördüğün şey:

> "Chrome açıldı."

olabilir.

Fakat arka planda kabaca şu süreç gerçekleşir:

```text
Chrome'a tıkladın
       ↓
İşletim sistemi programı tanıdı
       ↓
Programın dosyaları bulundu
       ↓
Gerekli veriler RAM'e yüklendi
       ↓
CPU komutları işlemeye başladı
       ↓
Program çalıştı
```

Bu sürecin çok daha karmaşık olduğunu unutma.

Burada amacımız teknik ayrıntılara boğulmadan temel mantığı anlamaktır.

---

# 6. CPU Nedir?

CPU'nun açılımı:

**Central Processing Unit**

Türkçesi:

**Merkezi İşlem Birimi**

olarak ifade edilir.

CPU, bilgisayarın komutları işleyen temel bileşenlerinden biridir.

Basitçe:

> **CPU, bilgisayarın kendisine verilen komutları işleyen temel bileşenidir.**

Örneğin bir program çalışırken CPU çeşitli işlemleri gerçekleştirir.

Ancak CPU tek başına çalışmaz.

CPU;

- RAM,
- Disk,
- İşletim sistemi,
- Diğer donanımlar

ile birlikte çalışır.

Bu nedenle bilgisayarın çalışmasını yalnızca CPU'ya bağlamak doğru değildir.

---

# 7. RAM Nedir?

RAM'in açılımı:

**Random Access Memory**

olarak ifade edilir.

RAM, bilgisayarın **geçici çalışma belleğidir.**

Bilgisayarında bir program çalıştırdığında programın ihtiyaç duyduğu verilerin bir bölümü RAM üzerinde tutulabilir.

Örneğin aynı anda:

- Google Chrome
- Visual Studio Code
- Discord
- Spotify

kullanıyorsan bu programların çalışması için RAM kaynakları kullanılacaktır.

Basitleştirirsek:

```text
Programlar
    │
    ▼
   RAM
    │
    ▼
Çalışan uygulamalar
```

RAM'in önemli özelliklerinden biri geçici olmasıdır.

Bilgisayar kapatıldığında RAM üzerindeki veriler kalıcı olarak saklanmaz.

Bu nedenle:

> **RAM = Geçici çalışma alanı**

olarak düşünebilirsin.

---

# 8. Disk Nedir?

Bilgisayarlarda verilerin uzun süreli olarak saklanması için depolama birimleri kullanılır.

Bunların en yaygın örnekleri:

- SSD
- HDD

olarak karşımıza çıkar.

Örneğin bilgisayarındaki:

- Fotoğraflar
- Videolar
- Belgeler
- Oyunlar
- Programlar
- İşletim sistemi

gibi veriler depolama birimlerinde tutulabilir.

RAM ile disk arasındaki temel farkı şöyle düşünebilirsin:

```text
RAM
│
├── Geçici çalışma alanı
└── Çalışan programların ihtiyaç duyduğu veriler


SSD / HDD
│
├── Kalıcı depolama alanı
└── Dosyalar ve programlar burada saklanabilir
```

---

# 9. İşletim Sistemi Nedir?

Şimdi bilgisayarın en önemli yazılım katmanlarından birine gelelim:

**İşletim sistemi.**

İşletim sistemi, bilgisayarın donanım ve yazılım kaynaklarını yönetmeye yardımcı olan temel yazılımdır.

Örneğin:

- Windows
- Linux
- macOS

birer işletim sistemidir.

Sen bir program açtığında program doğrudan bütün donanımı kendi başına yönetmez.

İşletim sistemi burada önemli görevler üstlenir.

Basitleştirirsek:

```text
          UYGULAMALAR
               │
               ▼
       İŞLETİM SİSTEMİ
               │
               ▼
            DONANIM
        ┌──────┼──────┐
        ▼      ▼      ▼
       CPU    RAM    DİSK
```

Bu yapı siber güvenlik açısından oldukça önemlidir.

Çünkü ileride;

- Process
- Service
- Kullanıcı
- Yetki
- Log
- Malware
- DFIR

gibi konuları incelerken işletim sistemi sürekli karşımıza çıkacak.

---

# 10. Donanım ve Yazılım Nasıl Birlikte Çalışır?

Artık parçaları ayrı ayrı gördük.

Şimdi hepsini bir araya getirelim.

Örneğin Google Chrome'u açtığımızda:

```text
           KULLANICI
                │
                ▼
        Google Chrome
                │
                ▼
       İşletim Sistemi
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
       CPU     RAM     Disk
```

Her parçanın farklı bir görevi vardır.

### CPU

Komutları işler.

### RAM

Çalışan programların ihtiyaç duyduğu verileri geçici olarak tutar.

### Disk

Dosyaları ve programları kalıcı olarak saklar.

### İşletim Sistemi

Donanım ve yazılım kaynaklarının yönetilmesini sağlar.

---

# 11. Peki Bunun Siber Güvenlikle Ne İlgisi Var?

Şimdi bu dersin en önemli kısmına geldik.

Bir siber güvenlik uzmanı neden bilgisayarın nasıl çalıştığını bilmek zorunda?

Çünkü güvenlik olayları bilgisayar sistemlerinin üzerinde gerçekleşir.

Örneğin bir saldırgan sisteme zararlı bir dosya gönderdi.

Dosya çalıştırıldığında sistem üzerinde çeşitli aktiviteler meydana gelebilir.

Basitleştirilmiş olarak:

```text
Şüpheli dosya
      ↓
Dosya çalıştırıldı
      ↓
Process oluştu
      ↓
RAM kullanıldı
      ↓
CPU komutları işledi
      ↓
Dosya / sistem değişiklikleri
      ↓
Network bağlantısı
```

Bir güvenlik analisti bu olayları incelerken;

- Hangi dosya çalıştı?
- Hangi process oluştu?
- Hangi kullanıcı çalıştırdı?
- Hangi dosyalara erişildi?
- Hangi network bağlantıları kuruldu?
- Sistem üzerinde ne değişti?

gibi sorular sorabilir.

İşte bu nedenle siber güvenlik öğrenirken bilgisayarın temel çalışma mantığını bilmek çok önemlidir.

---

# 🧠 Kendini Test Et

Aşağıdaki soruları cevaplamaya çalış.

## Soru 1

Aşağıdakilerden hangisi donanımdır?

**A)** Windows  
**B)** Google Chrome  
**C)** RAM  
**D)** Python

---

## Soru 2

Çalışan programların ihtiyaç duyduğu verilerin geçici olarak tutulduğu bellek hangisidir?

**A)** RAM  
**B)** SSD  
**C)** HDD  
**D)** USB

---

## Soru 3

CPU'nun temel görevini en iyi açıklayan seçenek hangisidir?

**A)** Dosyaları uzun süre saklamak  
**B)** Komutları işlemek  
**C)** İnternete bağlanmak  
**D)** Dosyaları klasörlere ayırmak

---

## Soru 4

Aşağıdakilerden hangisi bir işletim sistemidir?

**A)** RAM  
**B)** SSD  
**C)** Linux  
**D)** CPU

---

## Soru 5

Google Chrome çalıştırıldığında aşağıdakilerden hangisi gerçekleşebilir?

**A)** Gerekli veriler RAM'e yüklenebilir.  
**B)** CPU tamamen devre dışı kalır.  
**C)** RAM fiziksel olarak kapanır.  
**D)** SSD bilgisayardan çıkarılır.

---

# 🧪 Uygulama — Kendi Bilgisayarını Tanı

Şimdi teoriyi bırakıp kendi bilgisayarımızı inceleyeceğiz.

Bu, AG Cyber Lab içerisindeki ilk uygulamalarımızdan biri.

---

## Görev 1 — Görev Yöneticisini Aç

Windows kullanıyorsan:

```text
CTRL + SHIFT + ESC
```

tuşlarına bas.

**Görev Yöneticisi** açılacaktır.

---

## Görev 2 — CPU ve RAM Bilgilerini Bul

Görev Yöneticisi'nde:

**Performans**

sekmesine gir.

Burada:

- CPU
- Bellek
- Disk

bilgilerini incele.

---

## Görev 3 — Bilgilerini Not Et

Aşağıdaki tabloyu doldur:

| Bileşen | Bilgin |
|---|---|
| CPU | |
| CPU Çekirdekleri | |
| RAM | |
| Disk | |

---

## Görev 4 — Çalışan Programları İncele

Görev Yöneticisi'nde:

**İşlemler**

sekmesine geç.

Bilgisayarında çalışan programlara bak.

En fazla RAM kullanan 3 uygulamayı bul.

| Uygulama | RAM Kullanımı |
|---|---|
| 1. | |
| 2. | |
| 3. | |

---

# 🎯 Görev

Şimdi öğrendiklerini kendi cümlelerinle açıklamaya çalış.

Aşağıdaki soruya cevap ver:

> **Google Chrome'u açtığımda bilgisayarımda temel olarak neler gerçekleşiyor?**

En az 4 aşama yaz.

```text
1.
2.
3.
4.
```

Cevabı internetten kopyalamak yerine kendi anlayışınla yaz.

---

# 🔗 Siber Güvenlik Bağlantısı

Bu derste öğrendiğin:

- CPU
- RAM
- Disk
- İşletim sistemi
- Program
- Donanım
- Yazılım

kavramları ilerleyen derslerde tekrar karşına çıkacak.

Özellikle:

- Malware Analysis
- Blue Team
- Incident Response
- DFIR

alanlarında bu bilgileri kullanacağız.

---

# 💡 Hint System

Görevi yaparken zorlanırsan aşağıdaki ipucunu kullanabilirsin.

> **İpucu:** Chrome'u açtığında programın dosyalarının nerede saklandığını, çalışırken hangi belleği kullandığını ve komutların hangi donanım tarafından işlendiğini düşün.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce aşağıdakileri kontrol et:

- [ ] Bilgisayarın ne olduğunu öğrendim.
- [ ] Donanım ve yazılım arasındaki farkı öğrendim.
- [ ] CPU'nun temel görevini öğrendim.
- [ ] RAM'in ne olduğunu öğrendim.
- [ ] Diskin ne olduğunu öğrendim.
- [ ] İşletim sisteminin görevini öğrendim.
- [ ] Kendi bilgisayarımın CPU bilgisini buldum.
- [ ] Kendi RAM bilgilerimi buldum.
- [ ] Kendi disk bilgilerimi buldum.
- [ ] En fazla RAM kullanan 3 uygulamayı buldum.
- [ ] Chrome örneğini kendi cümlelerimle açıklayabildim.
- [ ] Quiz sorularını cevapladım.

---

# 🚀 Sonraki Ders

**Ders 02 — CPU: İşlemci Nasıl Çalışır?**

Bir sonraki derste CPU'nun bilgisayardaki görevini daha ayrıntılı şekilde inceleyeceğiz.

Komutların nasıl işlendiğini, çekirdek kavramını ve CPU'nun siber güvenlik açısından neden önemli olduğunu öğreneceğiz.