# Ders 01 — Bilgisayar Nedir?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Yok

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Bilgisayarın temel olarak nasıl çalıştığını açıklayabileceksin.
- Girdi (input), işlem (processing), çıktı (output) ve depolama (storage) kavramlarını anlayabileceksin.
- Donanım ve yazılım arasındaki farkı açıklayabileceksin.
- CPU, RAM ve depolama arasındaki temel farkları anlayabileceksin.
- İşletim sisteminin bilgisayardaki rolünü açıklayabileceksin.
- Program ile çalışan işlem (process) arasındaki temel farkı fark edebileceksin.
- Bir programı çalıştırdığında bilgisayarda temel olarak neler gerçekleştiğini açıklayabileceksin.
- Bu bilgilerin siber güvenlik açısından neden önemli olduğunu anlayabileceksin.

> Bu derste bazı kavramlarla ilk kez karşılaşacaksın. Hepsini ezberlemen beklenmiyor. Amacımız bilgisayarın nasıl çalıştığına ilişkin temel bir zihinsel model oluşturmak.

---

# 1. Bilgisayar Nedir?

Bilgisayar;

**kendisine verilen komutları çalıştırarak veriler üzerinde işlem yapabilen, verileri saklayabilen ve sonuç üretebilen programlanabilir bir sistemdir.**

Bilgisayarları yalnızca masaüstü veya dizüstü cihazlardan ibaret düşünmemeliyiz.

Örneğin:

- Masaüstü bilgisayarlar
- Dizüstü bilgisayarlar
- Sunucular
- Akıllı telefonlar
- Raspberry Pi gibi tek kart bilgisayarlar
- Ağ cihazları
- Gömülü sistemler

farklı amaçlarla kullanılan bilgisayar sistemlerine örnek olabilir.

Siber güvenlik dünyasında ilerledikçe yalnızca kişisel bilgisayarlarla değil; sunucular, ağ cihazları, mobil cihazlar, bulut sistemleri ve farklı gömülü sistemlerle de karşılaşacağız.

---

# 2. Bir Bilgisayar Temel Olarak Ne Yapar?

Bilgisayarların çalışma mantığını başlangıç seviyesinde dört temel kavramla düşünebiliriz:

```text
          INPUT
            │
            ▼
       PROCESSING
            │
            ▼
          OUTPUT
            │
            │
            ▼
         Kullanıcı

       PROCESSING
            │
            ↕
         STORAGE
```

Bunların Türkçeleri:

```text
Input       → Girdi
Processing  → İşleme
Output      → Çıktı
Storage     → Depolama
```

Bir hesap makinesi uygulamasında `5 + 3` işlemi yaptığını düşün.

### Girdi — Input

Klavyeden veya ekrandaki düğmelerden:

```text
5 + 3
```

bilgisini girersin.

### İşleme — Processing

Programın komutları çalıştırılır ve gerekli hesaplama gerçekleştirilir.

### Çıktı — Output

Sonuç:

```text
8
```

olarak ekranda gösterilir.

### Depolama — Storage

Eğer sonuç bir dosyaya kaydedilirse bu bilgi depolama biriminde saklanabilir.

Gerçek bilgisayar sistemleri bundan çok daha karmaşıktır ancak bu model temel çalışma mantığını anlamamıza yardımcı olur.

---

# 3. Donanım Nedir?

Donanım (**hardware**), bilgisayar sisteminin fiziksel bileşenlerini ifade eder.

Örneğin:

- CPU
- RAM
- SSD
- HDD
- Anakart
- Ekran kartı
- Ağ kartı
- Klavye
- Mouse
- Monitör

birer donanım bileşenidir.

Kısaca:

> **Donanım = Bilgisayar sisteminin fiziksel bileşenleri**

Her donanım aynı görevi gerçekleştirmez.

Örneğin CPU komutların işlenmesinde görev alırken RAM çalışan programların ihtiyaç duyduğu veriler için hızlı ve geçici bir çalışma alanı sağlar.

---

# 4. Yazılım Nedir?

Yazılım (**software**), bilgisayarın belirli görevleri gerçekleştirmesini sağlayan programlar, ilgili veriler ve talimatlar bütünüdür.

Örneğin:

- Windows
- Ubuntu
- macOS
- Google Chrome
- Visual Studio Code
- VLC Media Player
- Oyunlar
- Antivirüs yazılımları

birer yazılım örneğidir.

Yazılımları ilerleyen derslerde daha ayrıntılı sınıflandıracağız.

Şimdilik iki büyük grubu bilmek yeterlidir:

```text
YAZILIM
│
├── Sistem Yazılımları
│   └── İşletim sistemleri gibi
│
└── Uygulama Yazılımları
    └── Tarayıcılar, editörler, oyunlar gibi
```

Örneğin:

```text
Windows       → İşletim sistemi
Ubuntu        → İşletim sistemi
Google Chrome → Uygulama
VS Code       → Uygulama
```

Kısaca:

> **Donanım fiziksel bileşenleri, yazılım ise bu sistem üzerinde çalışan programları ve ilgili bileşenleri ifade eder.**

---

# 5. Donanım ve Yazılım Birlikte Çalışır

Bir uygulama tek başına çalışmaz.

Google Chrome'u açtığını düşün.

Chrome bir yazılımdır fakat çalışabilmesi için bilgisayarın sahip olduğu kaynaklardan yararlanır.

Örneğin:

- CPU
- RAM
- Depolama
- Ağ donanımı
- İşletim sistemi

bu süreçte farklı görevler üstlenebilir.

Başlangıç seviyesinde sistemi şöyle düşünebiliriz:

```text
               KULLANICI
                   │
                   ▼
             UYGULAMALAR
             Google Chrome
                   │
                   ▼
           İŞLETİM SİSTEMİ
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
       CPU        RAM      DEPOLAMA
                              │
                         ┌────┴────┐
                         ▼         ▼
                        SSD       HDD
```

Bu model oldukça basitleştirilmiştir.

Gerçek sistemlerde sürücüler, firmware, CPU cache'leri, sanal bellek ve birçok başka katman bulunur.

Bunları ilerleyen derslerde gerektiği zaman inceleyeceğiz.

---

# 6. CPU Nedir?

CPU'nun açılımı:

**Central Processing Unit**

Türkçesi:

**Merkezi İşlem Birimi**

CPU, bilgisayarın programlardaki makine komutlarını yürüten temel bileşenlerinden biridir.

Başlangıç seviyesinde:

> **CPU = Komutları yürüten ve hesaplama işlemlerini gerçekleştiren temel işlem birimi**

olarak düşünebilirsin.

Örneğin bir program çalışırken CPU:

- Aritmetik işlemler gerçekleştirebilir.
- Mantıksal karşılaştırmalar yapabilir.
- Bellekteki veriler üzerinde işlem yapılmasını sağlayabilir.
- Programın komutlarını sırayla veya işlemcinin mimarisine uygun şekilde yürütebilir.

Ancak CPU bilgisayarı tek başına çalıştırmaz.

CPU;

```text
CPU
 │
 ├── RAM
 ├── Depolama
 ├── İşletim sistemi
 └── Diğer donanımlar
```

ile birlikte çalışan daha büyük bir sistemin parçasıdır.

CPU'nun nasıl çalıştığını Ders 02'de daha ayrıntılı inceleyeceğiz.

---

# 7. RAM Nedir?

RAM'in açılımı:

**Random Access Memory**

RAM, bilgisayarın ana çalışma belleğidir.

Programlar çalışırken ihtiyaç duyulan kod ve verilerin önemli bir bölümü bellekte bulunur.

Örneğin aynı anda:

- Google Chrome
- Visual Studio Code
- Discord
- Spotify

çalıştırıyorsan bu uygulamalar ve işletim sistemi RAM kaynaklarını kullanır.

Başlangıç seviyesinde:

> **RAM = Çalışan sistem ve programlar için hızlı, geçici çalışma alanı**

olarak düşünebilirsin.

RAM, **uçucu (volatile)** bir bellek türüdür.

Normal çalışma koşullarında güç kesildiğinde RAM'deki veriler kalıcı depolamadaki dosyalar gibi korunmaz.

Bu nedenle RAM ile depolamayı birbirinden ayırmak önemlidir.

```text
RAM
│
├── Geçici çalışma alanıdır
├── Çalışan programlar tarafından kullanılır
└── Güç kesildiğinde içeriği kalıcı depolama gibi korunmaz
```

> İleride dijital adli bilişim (DFIR) ve malware analysis konularında RAM'in neden çok değerli bir kanıt kaynağı olabileceğini göreceğiz.

---

# 8. Depolama Nedir?

Bilgisayardaki verilerin uzun süreli olarak saklanması için depolama birimleri kullanılır.

Yaygın örnekler:

- SSD — Solid State Drive
- HDD — Hard Disk Drive

Bilgisayarındaki:

- Belgeler
- Fotoğraflar
- Videolar
- Program dosyaları
- Oyunlar
- İşletim sistemi dosyaları
- Log dosyaları

depolama üzerinde bulunabilir.

RAM ve depolama aynı şey değildir.

```text
RAM
│
├── Ana çalışma belleğidir
├── Geçicidir
└── Çalışan sistem/programlar tarafından aktif olarak kullanılır


DEPOLAMA
│
├── SSD / HDD gibi aygıtları kapsar
├── Verileri uzun süre saklayabilir
└── Programlar ve dosyalar burada bulunabilir
```

Örneğin Chrome bilgisayarda kurulu fakat kapalıysa programın dosyaları depolama üzerinde bulunmaya devam eder.

Chrome'u çalıştırdığında ise programın çalışması için gereken kod ve verilerin ilgili bölümleri belleğe yüklenebilir veya eşlenebilir.

Bu ayrım ileride çok önemli olacak:

> **Bir programın dosyasının bilgisayarda bulunması ile programın o anda çalışıyor olması aynı şey değildir.**

---

# 9. İşletim Sistemi Nedir?

İşletim sistemi (**Operating System — OS**), bilgisayarın donanım kaynaklarını yöneten ve uygulamalara sistem hizmetleri sağlayan temel yazılımdır.

Yaygın işletim sistemi örnekleri:

- Windows
- Linux tabanlı işletim sistemleri
- macOS

İşletim sistemi birçok önemli görev üstlenir.

Örneğin:

```text
İŞLETİM SİSTEMİ
│
├── Process yönetimi
├── Bellek yönetimi
├── Dosya sistemi yönetimi
├── Kullanıcı ve yetki yönetimi
├── Donanım erişimi
├── Giriş / çıkış işlemleri
└── Ağ işlevleri
```

Bu kavramların tamamını şu anda öğrenmen gerekmiyor.

İlerleyen derslerde her birini ayrı ayrı inceleyeceğiz.

Şimdilik şunu bilmek yeterli:

> **İşletim sistemi, uygulamalar ile bilgisayarın kaynakları arasında kritik bir yönetim katmanı oluşturur.**

---

# 10. Bir Programı Açtığımızda Ne Olur?

Şimdi öğrendiğimiz kavramları tek bir örnekte birleştirelim.

Google Chrome simgesine tıkladığını düşün.

Senin gördüğün:

```text
Chrome açıldı.
```

olabilir.

Fakat bilgisayarın arka planında çok sayıda işlem gerçekleşir.

Modern bir işletim sistemindeki süreci oldukça basitleştirerek inceleyelim.

---

## 10.1 Program Dosyaları Depolamada Bulunur

Chrome'un çalışması için gerekli program dosyaları bilgisayarın depolama alanında bulunur.

Örneğin:

```text
DEPOLAMA
│
└── Chrome Program Dosyaları
```

Bilgisayarı kapatsan bile bu dosyalar depolama üzerinde kalabilir.

---

## 10.2 Kullanıcı Programı Başlatır

Chrome simgesine tıkladığında işletim sistemi programın başlatılması için gerekli işlemleri gerçekleştirir.

```text
Kullanıcı
    │
    ▼
Chrome simgesine tıklar
    │
    ▼
İşletim sistemi
```

---

## 10.3 Bir Process Oluşturulur

Burada ilk kez önemli bir kavramla karşılaşıyoruz:

**Process (İşlem)**

Bir program çalıştırıldığında işletim sistemi tarafından çalışan bir işlem olarak yönetilir.

Başlangıç seviyesinde şu ayrımı yapabiliriz:

```text
PROGRAM
│
└── Depolamada bulunan çalıştırılabilir yazılım


PROCESS
│
└── Çalışmakta olan bir program örneği
```

Bu tanım şimdilik yeterlidir.

Process kavramını ilerleyen derslerde çok daha ayrıntılı inceleyeceğiz.

> Siber güvenlikte process'ler son derece önemlidir. Zararlı yazılımları araştırırken çalışan process'ler sıkça incelenir.

---

## 10.4 Gerekli Kod ve Veriler Belleğe Alınır

Programın çalışması için gereken kod ve verilerin ilgili bölümleri işletim sistemi tarafından belleğe yüklenebilir veya eşlenebilir.

Basitleştirilmiş model:

```text
DEPOLAMA
    │
    │ Program dosyaları
    ▼
   RAM
    │
    │ Çalışma sırasında kullanılan
    │ kod ve veriler
    ▼
   CPU
```

Bu şema gerçek sistemi tamamen temsil etmez.

Modern işletim sistemlerinde sanal bellek, sayfalama, cache mekanizmaları ve başka birçok yapı bulunur.

Şimdilik temel ilişkiyi anlamamız yeterlidir.

---

## 10.5 CPU Komutları Yürütür

Programın makine komutları CPU tarafından yürütülür.

Chrome çalışırken CPU;

- Kullanıcı işlemlerini,
- Program mantığını,
- Hesaplamaları,
- Veriler üzerinde gerçekleştirilen işlemleri

yürütmek için kullanılabilir.

Program ayrıca dosya açmak veya ağ üzerinden veri göndermek gibi işlemler için işletim sisteminin sunduğu hizmetlerden yararlanabilir.

---

## 10.6 Program Çalışmaya Devam Eder

Sonuç olarak Chrome'un penceresi açılır ve program kullanıcıyla etkileşime girmeye başlar.

Tüm süreci başlangıç seviyesinde şöyle özetleyebiliriz:

```text
Kullanıcı Chrome'u başlatır
          │
          ▼
İşletim sistemi isteği işler
          │
          ▼
Program dosyaları bulunur
          │
          ▼
Bir process oluşturulur
          │
          ▼
Gerekli kod/veriler belleğe alınır
          │
          ▼
CPU programın komutlarını yürütür
          │
          ▼
Program işletim sistemi hizmetlerini kullanır
          │
          ▼
Chrome çalışır
```

Gerçekte bu sürecin çok daha fazla teknik ayrıntısı vardır.

İlerleyen derslerde bu şemaya yeni katmanlar ekleyeceğiz.

---

# 11. Program ile Process Aynı Şey Mi?

Hayır.

Bu ayrım özellikle siber güvenlik açısından önemlidir.

Bir örnek düşün.

Bilgisayarında şu dosya bulunuyor:

```text
example.exe
```

Dosyanın depolama üzerinde bulunması:

> Program bilgisayarda mevcut.

anlamına gelebilir.

Ancak bu:

> Program şu anda çalışıyor.

anlamına gelmez.

Program çalıştırıldığında işletim sistemi tarafından bir process oluşturulabilir.

Basitleştirirsek:

```text
Depolamadaki program
        │
        │ çalıştırılır
        ▼
     Process
        │
        ▼
Çalışan program örneği
```

Hatta aynı programın birden fazla process oluşturması veya bir uygulamanın birden fazla process kullanması mümkündür.

Google Chrome bunun iyi örneklerinden biridir.

Görev Yöneticisi'ni açtığında Chrome için birden fazla process görebilirsin.

Bunun nedenini ilerleyen derslerde inceleyeceğiz.

---

# 12. Bunun Siber Güvenlikle Ne İlgisi Var?

Siber güvenlikte korumaya veya incelemeye çalıştığımız şeylerin büyük bölümü bilgisayar sistemlerinin farklı katmanlarında bulunur.

Bir güvenlik analisti yalnızca:

> "Virüs var mı?"

sorusunu sormaz.

Bunun yerine sistemde ne gerçekleştiğini anlamaya çalışır.

Örneğin şüpheli bir dosyanın çalıştırıldığını düşün.

Olası bir senaryo şöyle olabilir:

```text
Şüpheli dosya
      │
      ▼
Dosya çalıştırıldı
      │
      ▼
Bir process oluşabilir
      │
      ▼
Kod CPU tarafından yürütülür
      │
      ▼
Bellek kullanılır
      │
      ▼
Program davranışına bağlı olarak
      │
      ├──► Dosyalara erişebilir
      │
      ├──► Yeni dosyalar oluşturabilir
      │
      ├──► Başka process'ler başlatabilir
      │
      ├──► Sistem ayarlarını değiştirebilir
      │
      └──► Ağ bağlantıları kurabilir
```

Bunların tamamının gerçekleşmesi gerekmez.

Bir güvenlik analistinin görevi hangi aktivitelerin gerçekten gerçekleştiğini eldeki kanıtlardan anlamaya çalışmaktır.

Örneğin şu sorular sorulabilir:

- Hangi dosya çalıştırıldı?
- Dosyayı hangi kullanıcı çalıştırdı?
- Hangi process oluştu?
- Başka process'ler başlatıldı mı?
- Hangi dosyalara erişildi?
- Yeni dosyalar oluşturuldu mu?
- Sistem üzerinde değişiklik yapıldı mı?
- Hangi ağ bağlantıları kuruldu?
- Bellekte şüpheli bir içerik bulunuyor mu?
- Sistem loglarında hangi olaylar kayıtlı?

Bu soruları anlayabilmek için önce bilgisayarın nasıl çalıştığını anlamamız gerekir.

---

# 13. Bir Güvenlik Analisti Gibi Düşün

Siber güvenlik yalnızca araç veya komut kullanmayı öğrenmek değildir.

Önemli becerilerden biri, gözlemlediğimiz verilerden doğru sonuç çıkarabilmektir.

Örneğin bilgisayarda:

```text
suspicious.exe
```

isimli bir dosya bulduğunu düşün.

Şunu söyleyebilir misin?

> "Bu program kesinlikle çalıştırılmış."

Hayır.

Dosyanın depolamada bulunması tek başına çalıştırıldığını kanıtlamaz.

Bunun için başka kanıtları araştırmamız gerekebilir.

Örneğin ilerleyen derslerde:

- Process bilgileri
- Log kayıtları
- Dosya sistemi izleri
- Bellek verileri
- Ağ kayıtları

gibi farklı veri kaynaklarının olayları anlamamıza nasıl yardımcı olduğunu göreceğiz.

> **Siber güvenlikte bir bulgu ile o bulgudan çıkardığımız sonuç aynı şey değildir.**

Bu düşünme biçimini eğitim boyunca kullanacağız.

---

# 🧪 Uygulama — Kendi Bilgisayarını Tanı

Şimdi öğrendiğimiz kavramları kendi bilgisayarımız üzerinde gözlemleyeceğiz.

Bu uygulamanın amacı komut ezberlemek değil, bilgisayarında gerçekten neler olduğunu gözlemlemektir.

---

## Görev 1 — Görev Yöneticisini Aç

Windows kullanıyorsan:

```text
CTRL + SHIFT + ESC
```

tuşlarına bas.

Görev Yöneticisi açılacaktır.

Gerekirse:

**Daha fazla ayrıntı**

seçeneğine tıkla.

---

## Görev 2 — Donanım Bilgilerini Bul

Görev Yöneticisi içerisinde:

```text
Performans
```

sekmesine gir.

Aşağıdaki bilgileri bulmaya çalış:

| Bileşen | Bilgin |
|---|---|
| CPU modeli | |
| CPU çekirdek sayısı | |
| RAM kapasitesi | |
| Depolama türü | SSD / HDD / Diğer |
| Depolama kapasitesi | |

Bu değerlerin ne anlama geldiğini henüz tamamen bilmiyorsan sorun değil.

İlerleyen derslerde bunları tek tek öğreneceğiz.

---

## Görev 3 — RAM Kullanımını Gözlemle

Görev Yöneticisi açıkken mevcut RAM kullanımını gözlemle.

Yaklaşık değeri not et:

```text
Chrome açılmadan önce RAM kullanımı:

____________________________
```

Şimdi Google Chrome'u aç.

Birkaç internet sitesi veya sekme aç.

RAM kullanımını tekrar gözlemle.

```text
Chrome açıldıktan sonra RAM kullanımı:

____________________________
```

Şimdi Chrome'u kapat ve bir süre bekle.

RAM kullanımını yeniden gözlemle.

```text
Chrome kapatıldıktan sonra RAM kullanımı:

____________________________
```

> Değerlerin tam olarak eski seviyesine dönmesi gerekmez. İşletim sistemi bellek yönetimini dinamik olarak gerçekleştirir.

### Düşün

Şu soruyu kendi cümlelerinle cevapla:

> Chrome'u açtığında RAM kullanımında neden değişiklik gözlemledin?

```text
Cevabım:

____________________________________________________

____________________________________________________
```

---

## Görev 4 — Process'leri Gözlemle

Görev Yöneticisi içerisinde:

```text
İşlemler
```

sekmesine geç.

Chrome çalışıyorsa Chrome ile ilişkili işlemleri bulmaya çalış.

Şunları gözlemle:

- Kaç Chrome process'i görüyorsun?
- Ne kadar RAM kullanıyorlar?
- CPU kullanımları değişiyor mu?

Sonuçlarını yaz:

```text
Gördüğüm Chrome process sayısı:

____________________________


Gözlemim:

____________________________________________________

____________________________________________________
```

> Bir uygulamanın neden birden fazla process kullanabildiğini şu anda bilmen gerekmiyor. Önemli olan bunu kendi sisteminde gözlemlemiş olman.

---

# 🧪 Mini Deney — RAM ve Depolama Arasındaki Fark

Bir metin editörü aç.

Örneğin Windows'ta Not Defteri'ni kullanabilirsin.

Şunu yaz:

```text
AG Cyber Lab - İlk Deney
```

Dosyayı:

```text
ilk-deney.txt
```

adıyla kaydet.

Programı kapat.

Dosyanın hâlâ bilgisayarında bulunduğunu doğrula.

Şimdi düşün:

> Programı kapattığımız halde dosya neden kaybolmadı?

Çünkü dosyayı kalıcı depolamaya kaydettik.

Bu deney bize RAM ile depolama arasındaki temel farklardan birini gösterir.

---

# 🧠 Kendini Test Et

Soruları yalnızca ezberlediğin tanımlara göre değil, öğrendiğin çalışma mantığına göre cevaplamaya çalış.

---

## Soru 1

Aşağıdakilerden hangisi donanımdır?

**A)** Windows  
**B)** Google Chrome  
**C)** RAM  
**D)** Ubuntu

---

## Soru 2

Çalışan programların ihtiyaç duyduğu kod ve veriler için kullanılan ana çalışma belleği hangisidir?

**A)** RAM  
**B)** SSD  
**C)** HDD  
**D)** USB bellek

---

## Soru 3

CPU'nun temel görevini en iyi açıklayan seçenek hangisidir?

**A)** Dosyaları uzun süre saklamak  
**B)** Programların makine komutlarını yürütmek  
**C)** Yalnızca internete bağlanmak  
**D)** Dosyaları klasörlere ayırmak

---

## Soru 4

Aşağıdakilerden hangisi işletim sistemine örnektir?

**A)** RAM  
**B)** SSD  
**C)** Ubuntu  
**D)** CPU

---

## Soru 5

Bilgisayarında `example.exe` isimli bir program dosyası buldun.

Bundan hangisini kesin olarak söyleyebilirsin?

**A)** Program kesinlikle çalıştırılmıştır.  
**B)** Program kesinlikle zararlıdır.  
**C)** Dosyanın sistemde bulunması tek başına çalıştırıldığını kanıtlamaz.  
**D)** Program RAM'de kesinlikle bulunmaktadır.

---

## Soru 6

Bir kullanıcı belge üzerinde çalışmaktadır ancak değişikliklerini henüz dosyaya kaydetmemiştir.

Bilgisayar aniden güç kaybederse kaydedilmemiş değişikliklerin kaybolabilmesinin temel nedeni aşağıdakilerden hangisidir?

**A)** RAM'in geçici çalışma belleği olması  
**B)** CPU'nun depolama yapamaması  
**C)** SSD'nin hiçbir veri saklayamaması  
**D)** Monitörün kapanması

---

## Soru 7

Bilgisayarında 16 GB RAM ve 1 TB SSD bulunmaktadır.

Çok sayıda uygulamayı aynı anda açtığında hangi kaynağın kullanımının belirgin şekilde artmasını beklersin?

**A)** RAM  
**B)** Monitör çözünürlüğü  
**C)** Klavye kapasitesi  
**D)** BIOS boyutu

---

## Soru 8 — Analist Sorusu

Bir güvenlik analisti şüpheli bir program dosyasını bilgisayarın depolama alanında buldu.

Analist:

> "Bu dosya kesinlikle çalıştırılmış."

sonucuna vardı.

Bu sonuç neden hatalı olabilir?

Cevabını kendi cümlelerinle yaz:

```text
____________________________________________________

____________________________________________________
```

---

# 🎯 Ana Görev

Şimdi dersin başındaki temel soruya geri dön.

> **Google Chrome'u açtığımda bilgisayarımda temel olarak neler gerçekleşir?**

En az 5 aşama kullanarak kendi cümlelerinle açıkla.

```text
1.

2.

3.

4.

5.
```

Cevabı internetten kopyalamak yerine kendi anlayışınla yaz.

Şu kavramlardan yararlanabilirsin:

```text
Depolama
İşletim sistemi
Process
RAM
CPU
```

---

# 💡 Hint System

Görevi yapmakta zorlanırsan aşağıdaki ipuçlarını sırayla kullan.

### İpucu 1

Chrome çalışmıyorken program dosyalarının nerede bulunduğunu düşün.

### İpucu 2

Programı başlatma isteğini hangi temel sistem yazılımının yönettiğini düşün.

### İpucu 3

Çalışan program için hangi kavramı öğrendiğimizi hatırla:

```text
P _ O _ E _ S
```

### İpucu 4

Program çalışırken ihtiyaç duyulan kod ve verilerin hangi çalışma belleğinde bulunabileceğini düşün.

### İpucu 5

Programın makine komutlarını hangi donanım bileşeninin yürüttüğünü düşün.

---

# 🔐 Siber Güvenlik Bağlantısı

Bu derste öğrendiğimiz kavramlar yalnızca bilgisayar bilgisi değildir.

İleride birçok siber güvenlik alanının temelini oluşturacaklar.

```text
CPU
RAM
Depolama
Process
İşletim Sistemi
        │
        ├──► Malware Analysis
        ├──► Digital Forensics (DFIR)
        ├──► Incident Response
        ├──► Blue Team
        ├──► Endpoint Security
        └──► Reverse Engineering
```

Örneğin ileride:

- Bellekte çalışan zararlı kodları,
- Şüpheli process'leri,
- Disk üzerindeki dosya izlerini,
- İşletim sistemi loglarını,
- Programların oluşturduğu ağ bağlantılarını

inceleyebiliriz.

Ancak bunları anlayabilmek için önce sistemin normalde nasıl çalıştığını bilmemiz gerekir.

> **Bir sistemde neyin anormal olduğunu anlayabilmek için önce normal davranışın nasıl göründüğünü bilmeliyiz.**

Bu düşünce siber güvenlik eğitimin boyunca tekrar karşına çıkacak.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce aşağıdakileri kontrol et:

- [ ] Bilgisayarın temel olarak ne olduğunu açıklayabiliyorum.
- [ ] Input, processing, output ve storage kavramlarını biliyorum.
- [ ] Donanım ve yazılım arasındaki farkı açıklayabiliyorum.
- [ ] CPU'nun temel görevini biliyorum.
- [ ] RAM'in temel görevini biliyorum.
- [ ] RAM ile depolama arasındaki farkı açıklayabiliyorum.
- [ ] SSD ve HDD'nin depolama teknolojileri olduğunu biliyorum.
- [ ] İşletim sisteminin temel rolünü açıklayabiliyorum.
- [ ] Program ile process arasındaki temel farkı biliyorum.
- [ ] Kendi bilgisayarımın CPU bilgisini buldum.
- [ ] Kendi bilgisayarımın RAM bilgisini buldum.
- [ ] Depolama bilgilerimi kontrol ettim.
- [ ] Çalışan process'leri gözlemledim.
- [ ] Chrome açıldığında RAM kullanımındaki değişimi gözlemledim.
- [ ] Quiz sorularını cevapladım.
- [ ] Chrome'un açılma sürecini kendi cümlelerimle açıklayabiliyorum.

---

# 🧩 Dersin Özeti

Bu dersten aklında özellikle şu modelin kalması yeterlidir:

```text
                  BİLGİSAYAR
                      │
             ┌────────┴────────┐
             ▼                 ▼
          DONANIM            YAZILIM
             │                 │
       ┌─────┼─────┐           ▼
       ▼     ▼     ▼      İşletim Sistemi
      CPU   RAM  Depolama       │
                         ┌──────┴──────┐
                         ▼             ▼
                    Uygulamalar    Sistem
                                   Hizmetleri
```

Ve bir program çalıştırıldığında temel olarak:

```text
Program
   │
   ▼
İşletim Sistemi
   │
   ▼
Process
   │
   ├────► RAM
   │
   ├────► CPU
   │
   └────► İşletim Sistemi Hizmetleri
```

arasındaki ilişkiyi düşün.

Bu modeli ilerleyen her derste biraz daha geliştireceğiz.

---

# 🚀 Sonraki Ders

## Ders 02 — CPU, RAM ve Depolama: Bilgisayar Veriyi Nasıl İşler?

Bir sonraki derste bilgisayarın üç temel bileşenini daha yakından inceleyeceğiz:

- CPU nasıl komut yürütür?
- CPU çekirdeği nedir?
- Thread nedir?
- CPU cache neden vardır?
- RAM neden gereklidir?
- RAM dolarsa ne olur?
- SSD ile HDD arasındaki fark nedir?
- CPU, RAM ve depolama birbirleriyle nasıl iletişim kurar?

Ve en önemlisi:

> **Bu bileşenler siber güvenlik ve dijital adli bilişim sırasında bize hangi kanıtları sağlayabilir?**