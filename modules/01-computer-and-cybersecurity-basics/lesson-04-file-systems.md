# Ders 04 — Dosya Sistemleri: Veriler Nasıl Düzenlenir?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01, Ders 02 ve Ders 03

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Dosya sisteminin ne olduğunu açıklayabileceksin.
- Dosya ve dizin (klasör) kavramlarını anlayabileceksin.
- Dosya adı ile dosyanın gerçek içeriğinin aynı şey olmadığını anlayabileceksin.
- Windows ve Linux dosya yollarını okuyabileceksin.
- Mutlak ve göreli yol arasındaki farkı açıklayabileceksin.
- `.`, `..` ve `~` gibi temel yol ifadelerini tanıyabileceksin.
- NTFS, FAT32, exFAT, ext4 ve APFS gibi dosya sistemlerini temel seviyede tanıyabileceksin.
- Metadata ve timestamp kavramlarını açıklayabileceksin.
- Dosya izinlerinin neden önemli olduğunu anlayabileceksin.
- Bir dosya silindiğinde temel olarak neler olabileceğini anlayabileceksin.
- Hash kavramının ne olduğunu ve ne amaçla kullanıldığını açıklayabileceksin.
- Dosya sistemi artefaktlarının DFIR açısından neden değerli olduğunu anlayabileceksin.
- Şüpheli bir dosyaya güvenlik analisti yaklaşımıyla bakabileceksin.

> Bu derste dosya sistemlerinin bütün iç yapılarını öğrenmeyeceğiz. NTFS'in MFT yapısı veya ext4 inode'ları gibi kavramlara kısa girişler yapacağız ancak ayrıntılı dosya sistemi adli bilişimini ilerleyen DFIR modüllerinde ele alacağız.

---

# 1. Önceki Dersten Hatırlayalım

Ders 03'te bir uygulamanın dosya açmak istediğinde fiziksel SSD veya HDD'yi doğrudan yönetmediğini gördük.

Basitleştirilmiş olarak:

```text
Uygulama
   │
   ▼
İşletim Sistemi API
   │
   ▼
System Call
   │
   ▼
Kernel
   │
   ▼
Dosya Sistemi
   │
   ▼
Depolama
```

Şimdi bu zincirin:

```text
Dosya Sistemi
```

bölümüne odaklanacağız.

Öncelikle basit bir soru soralım:

> Bilgisayarında yüz binlerce dosya bulunabiliyorken işletim sistemi bunların nerede olduğunu nasıl biliyor?

Bu sorunun cevabının önemli bir bölümü dosya sistemlerinde saklıdır.

---

# 2. Dosya Sistemi Nedir?

**Dosya sistemi (file system)**, verilerin bir depolama ortamında nasıl organize edildiğini, adlandırıldığını, saklandığını ve yönetildiğini belirleyen veri yapıları ve kurallar bütünüdür.

Dosya sistemi sayesinde işletim sistemi:

- Dosya oluşturabilir.
- Dosyaları bulabilir.
- Dosya içeriğini okuyabilir.
- Dosyalara veri yazabilir.
- Dizinler oluşturabilir.
- Dosyaları organize edebilir.
- Metadata tutabilir.
- Desteklediği ölçüde erişim izinleri uygulayabilir.
- Boş ve kullanılan alanı takip edebilir.

Başlangıç seviyesinde:

```text
DEPOLAMA
    │
    ▼
DOSYA SİSTEMİ
    │
    ▼
DİZİNLER
    │
    ▼
DOSYALAR
```

şeklinde düşünebiliriz.

Ancak dosya sistemi yalnızca:

> "Klasörlerin içerisinde dosya tutan yapı"

değildir.

Arka planda dosyaların nerede bulunduğunu ve bunlarla ilgili çeşitli metadata bilgilerini yöneten veri yapıları vardır.

---

# 3. Her Depolama Aygıtında Aynı Dosya Sistemi Mi Kullanılır?

Hayır.

Farklı işletim sistemleri ve kullanım senaryoları farklı dosya sistemleri kullanabilir.

Örneğin:

```text
Windows
└── NTFS yaygın olarak kullanılır

Linux
└── ext4, XFS, Btrfs vb. kullanılabilir

macOS
└── APFS yaygın olarak kullanılır

USB / Harici Depolama
└── FAT32, exFAT, NTFS vb. kullanılabilir
```

Bir fiziksel depolama aygıtı ayrıca bölümlere ayrılabilir ve bu bölümlerde farklı dosya sistemleri bulunabilir.

Dolayısıyla:

```text
SSD = NTFS
```

veya:

```text
HDD = ext4
```

gibi bir eşitlik yoktur.

> **SSD/HDD depolama teknolojisidir; NTFS/ext4/APFS ise dosya sistemidir.**

Bu ayrımı mutlaka aklında tut.

---

# 4. Dosya Nedir?

Dosya, bir dosya sistemi içerisinde adı ve metadata'sı ile yönetilen veri nesnesidir.

Dosyanın içeriği farklı şeyler olabilir:

- Metin
- Görsel
- Ses
- Video
- Program kodu
- Çalıştırılabilir makine kodu
- Yapılandırma verisi
- Log
- Veritabanı verisi
- Sıkıştırılmış veri

Örneğin:

```text
rapor.pdf
notlar.txt
fotoğraf.jpg
video.mp4
program.exe
script.py
config.json
security.log
```

birer dosya olabilir.

Dosyanın kullanıcıya görünen adı, o dosyanın kimliğinin yalnızca bir bölümüdür.

Dosya sistemi dosyayla ilgili başka bilgiler de tutabilir.

Bunları metadata bölümünde inceleyeceğiz.

---

# 5. Dosya, Program ve Process Aynı Şey Mi?

Hayır.

Ders 01'de bunun temelini görmüştük.

Örneğin:

```text
chrome.exe
```

depolamada bulunan bir program dosyası olabilir.

Bu dosyanın varlığı:

> Chrome şu anda çalışıyor.

anlamına gelmez.

Program çalıştırıldığında işletim sistemi bir veya daha fazla process oluşturabilir.

Basitleştirilmiş model:

```text
DEPOLAMADAKİ DOSYA
     chrome.exe
          │
          │ çalıştırılır
          ▼
       PROGRAM
          │
          ▼
       PROCESS
```

Dolayısıyla:

```text
Dosya var
```

ile:

```text
Dosya çalıştırıldı
```

aynı iddia değildir.

Bu ayrım DFIR açısından çok önemlidir.

Ders 05'te process kavramını ayrıntılı inceleyeceğiz.

---

# 6. Dosya Adı ve Uzantısı

Bir dosyanın adı şu şekilde olabilir:

```text
rapor.pdf
```

Burada:

```text
rapor  → Ad
.pdf   → Uzantı
```

olarak düşünürüz.

Yaygın dosya uzantılarından bazıları:

| Uzantı | Genellikle İlişkili Olduğu İçerik |
|---|---|
| `.txt` | Düz metin |
| `.pdf` | PDF belgesi |
| `.jpg` | JPEG görsel |
| `.png` | PNG görsel |
| `.mp4` | Multimedya kapsayıcısı |
| `.mp3` | Ses |
| `.zip` | ZIP arşivi |
| `.exe` | Windows PE çalıştırılabilir dosyası |
| `.dll` | Windows dinamik kütüphanesi |
| `.py` | Python kaynak kodu |
| `.js` | JavaScript |
| `.json` | JSON verisi |
| `.log` | Genellikle log verisi |
| `.conf` | Genellikle yapılandırma |

Ancak önemli kelime:

> **Genellikle**

Dosya uzantısı dosyanın gerçek içeriğini matematiksel olarak belirleyen bir özellik değildir.

---

# 7. Dosya Uzantısı Gerçek Dosya Türünü Garanti Eder Mi?

Hayır.

Bu siber güvenlik açısından son derece önemli bir noktadır.

Bir dosyanın adını değiştirebilirsin.

Örneğin:

```text
program.exe
```

dosyasını:

```text
tatil-fotografi.jpg
```

olarak yeniden adlandırmak dosyanın içeriğini otomatik olarak JPEG görseline dönüştürmez.

Yani:

```text
DOSYA ADI / UZANTISI
        ≠
GERÇEK DOSYA İÇERİĞİ
```

Bir güvenlik analisti yalnızca uzantıya güvenmez.

Dosyanın:

- İçeriğini,
- Başlık bilgilerini,
- Magic bytes / file signature değerlerini,
- Metadata'sını,
- Hash'ini

inceleyebilir.

---

# 8. File Signature — Magic Bytes Nedir?

Birçok dosya formatının başlangıcında veya belirli bölümlerinde formatı tanımaya yardımcı olan karakteristik byte dizileri bulunabilir.

Bunlara yaygın olarak:

**File Signature**

veya:

**Magic Bytes**

denir.

Örneğin bazı formatlarda karakteristik başlangıç değerleri görülebilir.

Kavramsal olarak:

```text
Dosya adı:
fotoğraf.jpg

Dosyanın içeriği:
MZ ...
```

gibi bir durumla karşılaşırsak bu dosyanın adına rağmen bir Windows PE dosyası olabileceğini araştırmak isteriz.

Windows PE dosyaları geleneksel olarak:

```text
4D 5A
```

hex değerleriyle başlayan `MZ` imzasına sahiptir.

PNG dosyaları ise karakteristik bir dosya imzasına sahiptir.

> Dosya imzası tek başına kusursuz bir zararlı/zararsızlık testi değildir. Ancak dosyanın gerçek formatını anlamada önemli ipuçlarından biridir.

Bu konu ileride malware analysis sırasında tekrar karşımıza çıkacak.

---

# 9. Çift Uzantı Neden Önemlidir?

Şu dosyayı düşün:

```text
fatura.pdf.exe
```

Gerçek son uzantı:

```text
.exe
```

olabilir.

Bazı sistem yapılandırmalarında bilinen dosya uzantıları kullanıcıdan gizlenebilir.

Bu durumda kullanıcı dosyayı yanıltıcı şekilde görebilir.

Saldırganlar sosyal mühendislik sırasında buna benzer adlandırma tekniklerinden yararlanabilir.

Ancak:

> Bir dosyanın `.exe` olması onun zararlı olduğu anlamına gelmez.

Windows'taki çok sayıda meşru program da `.exe` biçimindedir.

Analistin görevi:

```text
.exe gördüm → malware
```

demek değil;

> Dosyanın gerçekten ne olduğunu ve sistemde ne yaptığını kanıtlarla değerlendirmektir.

---

# 10. Dizin ve Klasör Nedir?

Dosyaları organize etmek için **directory (dizin)** yapıları kullanılır.

Grafik arayüzlerde bunlar genellikle:

**folder (klasör)**

olarak gösterilir.

Örneğin:

```text
Belgeler
│
├── rapor.pdf
├── notlar.txt
│
└── Siber Güvenlik
    │
    ├── DFIR
    └── Network
```

Bir dizin başka dizinler ve dosyalar içerebilir.

Bu sayede dosya sistemi hiyerarşik biçimde düzenlenebilir.

---

# 11. Root — Kök Nedir?

Hiyerarşik dosya sisteminin en üst noktasına genel olarak:

**root — kök**

denir.

Linux/Unix tarzı sistemlerde kök:

```text
/
```

ile gösterilir.

Örneğin:

```text
/
├── home
├── etc
├── var
├── usr
└── tmp
```

Windows'ta yapı farklıdır.

Örneğin:

```text
C:\
```

bir volume'ün kök dizinini ifade edebilir.

Windows ayrıca birden fazla volume veya sürücüyü:

```text
C:\
D:\
E:\
```

gibi sürücü harfleriyle gösterebilir.

Bu yüzden Windows ile Linux yol yapısını birebir aynı düşünmemeliyiz.

---

# 12. Dosya Yolu — Path Nedir?

Bir dosya veya dizinin dosya sistemi içerisindeki konumunu ifade eden gösterime:

**path — yol**

denir.

Windows örneği:

```text
C:\Users\Ahmet\Documents\rapor.pdf
```

Linux örneği:

```text
/home/ahmet/Documents/rapor.pdf
```

Bu yolları parçalara ayıralım.

Windows:

```text
C:\
└── Users
    └── Ahmet
        └── Documents
            └── rapor.pdf
```

Linux:

```text
/
└── home
    └── ahmet
        └── Documents
            └── rapor.pdf
```

---

# 13. Windows ve Linux Yol Ayırıcıları

Dikkat ettiysen Windows örneklerinde:

```text
\
```

Linux örneklerinde:

```text
/
```

kullandık.

Genel kullanımda:

```text
Windows → \

Linux   → /
```

şeklinde görürsün.

Örneğin:

```text
C:\Users\Ahmet\Desktop
```

ve:

```text
/home/ahmet/Desktop
```

Bu ayrım özellikle terminal ve programlama öğrenirken önem kazanacaktır.

---

# 14. Mutlak Yol — Absolute Path

**Absolute path**, bir nesnenin konumunu dosya sistemi bağlamında kökten veya tam başlangıç noktasından belirten yoldur.

Windows örneği:

```text
C:\Users\Ahmet\Documents\rapor.pdf
```

Linux örneği:

```text
/home/ahmet/Documents/rapor.pdf
```

Bu yollar dosyanın konumunu açık şekilde belirtir.

Başlangıç seviyesinde:

> **Absolute path = Dosyanın tam yolu**

olarak düşünebilirsin.

---

# 15. Göreli Yol — Relative Path

**Relative path**, mevcut çalışma dizinine göre değerlendirilen yoldur.

Örneğin şu dizinde bulunduğunu düşün:

```text
/home/ahmet
```

Buradan:

```text
Documents/rapor.pdf
```

yazarsan ortaya çıkan yol:

```text
/home/ahmet/Documents/rapor.pdf
```

olur.

Windows'ta benzer şekilde bulunduğun dizine göre:

```text
Documents\rapor.pdf
```

kullanılabilir.

Başlangıç seviyesinde:

> **Relative path = Bulunduğun konuma göre tarif edilen yol**

---

# 16. `.` ve `..` Ne Anlama Gelir?

Terminal kullanmaya başladığında sıkça şu ifadeleri göreceksin:

```text
.
..
```

Genel olarak:

```text
.  → Mevcut dizin

.. → Üst/parent dizin
```

Örneğin Linux üzerinde:

```text
./script.sh
```

mevcut dizindeki `script.sh` dosyasını ifade edebilir.

Şu yol:

```text
../dosya.txt
```

ise bir üst dizindeki `dosya.txt` dosyasını ifade eder.

Örnek:

```text
/home/ahmet/Documents/Project
                    │
                    └── Şu anda buradayız

../
 │
 ▼
/home/ahmet/Documents
```

Bu kavram ileride command line kullanımında çok önemli olacak.

---

# 17. `~` Ne Anlama Gelir?

Linux ve birçok Unix shell ortamında:

```text
~
```

kullanıcının home dizinini ifade etmek için genişletilebilir.

Örneğin kullanıcı:

```text
ahmet
```

ise:

```text
~/Documents
```

çoğu tipik sistemde:

```text
/home/ahmet/Documents
```

konumuna karşılık gelebilir.

Bu:

```text
/
```

ile aynı şey değildir.

```text
/  → Dosya sistemi kökü

~  → Kullanıcının home dizinine shell tarafından genişletilen ifade
```

Bu fark sık karıştırılır.

---

# 18. Windows Dosya Sistemi Yapısı

Modern Windows istemci sistemlerinde sistem volume'ü yaygın olarak NTFS kullanır.

Tipik bir Windows kurulumunda:

```text
C:\
│
├── Windows
├── Users
├── Program Files
├── Program Files (x86)
└── ProgramData
```

gibi dizinlerle karşılaşabilirsin.

---

## `C:\Windows`

İşletim sistemiyle ilişkili birçok kritik dosya ve bileşen burada bulunur.

Örneğin:

```text
C:\Windows\System32
```

önemli Windows sistem bileşenlerini içerir.

> Adında `32` bulunmasına rağmen 64-bit Windows sistemlerinde de System32 kritik 64-bit sistem bileşenlerini içerir. Windows'un tarihsel uyumluluk adlandırmalarından biridir.

---

## `C:\Users`

Kullanıcı profilleri genellikle burada bulunur.

Örneğin:

```text
C:\Users\Ahmet
│
├── Desktop
├── Documents
├── Downloads
└── AppData
```

Özellikle:

```text
AppData
```

DFIR açısından önemli olabilecek çok sayıda uygulama ve kullanıcı artefaktı barındırabilir.

---

## `C:\Program Files`

Birçok 64-bit uygulamanın program dosyaları burada bulunabilir.

64-bit Windows üzerinde:

```text
C:\Program Files (x86)
```

çoğunlukla 32-bit uygulamalar için kullanılır.

---

## `C:\ProgramData`

Birden fazla kullanıcı tarafından kullanılabilecek uygulama verileri ve yapılandırmalar burada bulunabilir.

---

# 19. NTFS Nedir?

**NTFS — New Technology File System**, modern Windows sistemlerinde yaygın kullanılan dosya sistemidir.

NTFS birçok özelliğe sahiptir.

Örneğin:

- Büyük dosya ve volume desteği
- Access Control List'ler
- Journaling
- Metadata
- Compression desteği
- Encryption ile ilişkili özellikler
- Alternate Data Streams
- Hard link gibi dosya sistemi özellikleri

Bu özelliklerin tamamını şu anda öğrenmemiz gerekmiyor.

Ancak DFIR açısından çok önemli bir yapıyı tanıyalım:

**MFT — Master File Table**

NTFS, dosya ve dizinlerle ilgili kayıtları MFT içerisinde yönetir.

Basitleştirilmiş olarak:

```text
NTFS
 │
 └── MFT
      │
      ├── Dosya kayıtları
      ├── Metadata
      ├── Zaman bilgileri
      └── Dosya sistemi özellikleri
```

> MFT'nin teknik yapısını ilerleyen DFIR modülünde ayrıntılı inceleyeceğiz.

Şimdilik bilmen gereken:

> **Dosya silinse bile dosya sistemi seviyesindeki farklı artefaktlar olay hakkında bilgi sağlayabilir.**

---

# 20. FAT32 ve exFAT

Windows dünyasında ve taşınabilir depolama ortamlarında başka dosya sistemleriyle de karşılaşabilirsin.

## FAT32

FAT32 oldukça eski ancak geniş cihaz uyumluluğuna sahip bir dosya sistemidir.

Örneğin:

- USB bellekler
- Eski cihazlar
- Bazı firmware ortamları

ile karşılaşabiliriz.

Önemli sınırlamalarından biri tek dosya boyutu için yaklaşık:

```text
4 GB
```

sınırıdır.

---

## exFAT

exFAT özellikle flash tabanlı ve taşınabilir depolama aygıtlarında kullanılabilen bir dosya sistemidir.

FAT32'nin bazı sınırlamalarını aşmak üzere tasarlanmıştır ve büyük dosyaları destekleyebilir.

Ancak:

```text
NTFS
FAT32
exFAT
```

aynı güvenlik ve metadata özelliklerine sahip değildir.

Bu nedenle adli bilişim sırasında:

> "Hangi dosya sistemi kullanılıyor?"

sorusu önemlidir.

---

# 21. Linux Dosya Sistemi Hiyerarşisi

Linux sistemlerde:

```text
/
```

tek bir kök hiyerarşinin başlangıcıdır.

Altında farklı amaçlara sahip dizinler bulunur.

Tipik örnekler:

| Dizin | Genel Amaç |
|---|---|
| `/` | Kök dizin |
| `/home` | Normal kullanıcıların home dizinleri |
| `/root` | Root kullanıcısının home dizini |
| `/etc` | Sistem ve uygulama yapılandırmaları |
| `/var` | Değişken/veri dosyaları; log, spool, cache vb. |
| `/tmp` | Geçici dosyalar |
| `/usr` | Programlar, kütüphaneler ve paylaşılan veriler |
| `/dev` | Aygıtları temsil eden özel dosyalar |
| `/proc` | Process ve kernel bilgilerini sunan sanal dosya sistemi |
| `/sys` | Kernel ve aygıtlarla ilgili bilgileri sunan sanal dosya sistemi |
| `/boot` | Önyüklemeyle ilişkili dosyalar |

Bu dizinlerin tam kullanımı dağıtıma göre değişebilir.

Ayrıca modern Linux dağıtımlarında:

```text
/bin
/sbin
/lib
```

gibi yollar bazı sistemlerde `/usr` altındaki karşılıklarına symbolic link olabilir.

Bu yüzden dizin yapısını katı biçimde ezberlemek yerine mantığını anlamak daha önemlidir.

---

# 22. `/proc` Gerçekten Diskteki Normal Bir Klasör Mü?

Hayır.

Bu önemli bir ayrımdır.

Linux üzerinde:

```text
/proc
```

bir **pseudo-filesystem / sanal dosya sistemi** olarak çalışır.

İçerisinde process ve kernel ile ilgili bilgiler dosya benzeri bir arayüz üzerinden sunulur.

Örneğin:

```text
/proc/1234/
```

PID'si `1234` olan bir process ile ilişkili bilgiler içerebilir.

Bu bize Unix/Linux dünyasının önemli bir fikrini gösterir:

> Bazı sistem kaynakları dosya benzeri arayüzlerle temsil edilebilir.

Ders 05'te `/proc` dizinine tekrar döneceğiz.

---

# 23. ext4 Nedir?

Linux sistemlerde farklı dosya sistemleri kullanılabilir.

Bunlardan yaygın olanlardan biri:

**ext4 — Fourth Extended File System**

ext4:

- Journaling
- Büyük dosya ve volume desteği
- Unix izin modeliyle çalışma
- Extended attributes

gibi özelliklere sahiptir.

Linux sistemlerde ayrıca:

```text
XFS
Btrfs
ZFS
```

gibi farklı dosya sistemleriyle de karşılaşabilirsin.

Dolayısıyla:

> **Linux = ext4**

şeklinde bir eşitlik kurmamalıyız.

Linux farklı dosya sistemlerini destekler.

---

# 24. inode Nedir?

Unix/Linux dosya sistemlerini incelerken:

**inode**

kavramıyla karşılaşabilirsin.

Basitleştirilmiş olarak inode, bazı Unix tarzı dosya sistemlerinde dosyayla ilgili metadata ve veri bloklarına ilişkin referansları tutan veri yapısıdır.

Kavramsal model:

```text
Dosya adı
   │
   ▼
Dizin kaydı
   │
   ▼
 inode
   │
   ├── İzinler
   ├── Sahiplik
   ├── Zaman bilgileri
   ├── Boyut
   └── Veri bloklarına referanslar
```

Önemli nokta:

> Dosya adı inode'un kendisinin temel metadata alanlarından biri değildir; dizin yapısı isim ile inode arasında ilişki kurar.

Bu ayrım şu anda ileri seviye gelebilir.

Ezberlemek zorunda değilsin.

İleride Linux forensics sırasında tekrar göreceğiz.

---

# 25. macOS ve APFS

Modern macOS sistemlerinde yaygın olarak:

**APFS — Apple File System**

kullanılır.

APFS:

- Flash/SSD odaklı tasarım,
- Snapshots,
- Clones,
- Encryption desteği,
- Modern metadata yapıları

gibi özelliklere sahiptir.

Şimdilik amacımız dosya sistemlerinin işletim sistemine göre değişebildiğini görmek:

```text
Windows → NTFS yaygın

Linux   → ext4 / XFS / Btrfs vb.

macOS   → APFS yaygın
```

---

# 26. Metadata Nedir?

Bir dosya yalnızca içerisindeki veriden oluşmaz.

Dosyayla ilişkili başka bilgiler de vardır.

Bunlara genel olarak:

**metadata**

denir.

Dosya sistemine bağlı olarak metadata içerisinde:

- Dosya boyutu
- Dosya sahibi
- Grup bilgisi
- İzinler
- Zaman bilgileri
- Dosya sistemi özellikleri
- Veri konumuna ilişkin referanslar

gibi bilgiler bulunabilir.

Basitleştirilmiş model:

```text
DOSYA
│
├── İçerik
│
└── Metadata
    ├── Boyut
    ├── Sahip
    ├── İzinler
    └── Zaman bilgileri
```

Hangi metadata alanlarının bulunduğu ve nasıl tutulduğu dosya sistemine göre değişebilir.

---

# 27. Timestamp — Zaman Damgası Nedir?

Dosya sistemleri dosyalarla ilgili farklı zaman bilgileri tutabilir.

Örneğin:

- Creation / Birth time
- Modification time
- Access time
- Metadata change time

gibi kavramlarla karşılaşabiliriz.

Ancak bütün dosya sistemleri bunları aynı şekilde tutmaz.

Bu nedenle:

```text
NTFS timestamp'leri
```

ile:

```text
ext4 timestamp'leri
```

birebir aynı şekilde yorumlanmamalıdır.

---

# 28. Timestamp'ler Neden DFIR İçin Önemlidir?

Bir olay sırasında şu dosyayı bulduğunu düşün:

```text
C:\Users\Ahmet\AppData\Local\Temp\suspicious.exe
```

Metadata içerisinde:

```text
Creation Time     → 02:15

Modification Time → 02:16
```

gibi bilgiler bulunabilir.

Bu değerler:

> Dosyanın sistemde ne zaman ortaya çıkmış olabileceği

konusunda analiste ipucu verebilir.

Ardından analist bunu:

```text
02:14 → Kullanıcı giriş yaptı
02:15 → Şüpheli dosya ortaya çıktı
02:16 → Dosya değişti
02:17 → Şüpheli process gözlemlendi
02:18 → Ağ bağlantısı görüldü
```

gibi başka artefaktlarla birleştirebilir.

Böyle bir çalışma:

**Timeline Analysis**

olarak adlandırılır.

---

# 29. Timestamp = Kesin Gerçek Mi?

Hayır.

Bu DFIR açısından kritik bir prensiptir.

Timestamp'ler:

- Sistem davranışından,
- Dosya sistemi davranışından,
- Dosya kopyalama işlemlerinden,
- Arşiv çıkarma işlemlerinden,
- Saat yapılandırmasından,
- Uygulama davranışlarından,
- Manipülasyondan

etkilenebilir.

Örneğin saldırgan bazı durumlarda timestamp değerlerini değiştirmeye çalışabilir.

Bu davranış genel olarak:

**Timestomping**

kavramıyla ilişkilendirilebilir.

Dolayısıyla:

> **Bir timestamp tek başına olayın kesin kanıtı değildir.**

Analist mümkün olduğunca birden fazla bağımsız veri kaynağını karşılaştırır.

---

# 30. Access Time Konusunda Dikkat

Şu çıkarımı yapmak tehlikelidir:

```text
Access Time = 14:00

O hâlde kullanıcı dosyayı tam olarak 14:00'te açtı.
```

Her zaman doğru değildir.

Dosya sistemi, işletim sistemi yapılandırması ve optimizasyon mekanizmaları access time'ın ne zaman ve nasıl güncellendiğini etkileyebilir.

Bu nedenle iyi bir DFIR analisti:

> "Timestamp ne gösteriyor?"

sorusunun yanında:

> "Bu dosya sisteminde bu timestamp hangi koşullarda güncelleniyor?"

sorusunu da sorar.

Bu düşünme alışkanlığını ilerleyen derslerde sürekli kullanacağız.

---

# 31. Dosya İzinleri

Dosyaların sistemde bulunması herkesin bu dosyalara istediği gibi erişebileceği anlamına gelmez.

Dosya sistemleri farklı erişim kontrol mekanizmaları sağlayabilir.

Örneğin:

```text
Kullanıcı A
   │
   ├── Okuyabilir
   └── Yazamaz

Kullanıcı B
   │
   ├── Okuyabilir
   └── Yazabilir
```

Bu, Ders 03'te gördüğümüz:

**Least Privilege**

prensibiyle doğrudan ilişkilidir.

---

# 32. Linux Dosya İzinlerine İlk Bakış

Linux sistemlerde klasik izin modelinde üç temel izin görürüz:

```text
r → read
w → write
x → execute
```

Bunlar:

```text
user
group
others
```

için ayrı ayrı belirtilebilir.

Örneğin:

```text
-rwxr-xr--
```

gibi bir gösterim görebilirsin.

Bunu bölümlere ayıralım:

```text
- | rwx | r-x | r--
    │     │     │
    │     │     └── Others
    │     └──────── Group
    └────────────── User/Owner
```

Şimdilik bütün kombinasyonları ezberlemen gerekmiyor.

Temel fikir:

> **Kimin okuyabileceği, yazabileceği veya çalıştırabileceği kontrol edilebilir.**

---

# 33. Windows Dosya İzinlerine İlk Bakış

NTFS, ACL tabanlı ayrıntılı erişim kontrol mekanizmalarını destekler.

**ACL — Access Control List**

bir dosya veya dizine:

```text
Kim erişebilir?

Ne yapabilir?
```

sorularının cevaplarını tanımlayan erişim kontrol kayıtları içerebilir.

Örneğin:

```text
Ahmet
└── Read

Administrators
├── Read
├── Write
└── Modify
```

Gerçek Windows izin modeli bundan daha kapsamlıdır.

Örneğin:

- Inheritance
- Explicit permissions
- Allow / Deny
- Ownership

gibi kavramlar vardır.

İlerleyen Windows güvenliği derslerinde bunları ayrıntılı inceleyeceğiz.

---

# 34. Execute İzni Her Sistemde Aynı Şekilde Mi Çalışır?

Hayır.

Örneğin Linux/Unix sistemlerde bir dosyanın:

```text
.exe
```

uzantısına sahip olması çalıştırılabilir olduğu anlamına gelmez.

Çalıştırma izni ve dosyanın biçimi önemlidir.

Hatta Linux'ta bir programın uzantısı olmak zorunda değildir.

Örneğin:

```text
/usr/bin/ls
```

dosyasının `.exe` uzantısı yoktur.

Windows ise dosya türleri ve PE çalıştırılabilir formatları konusunda farklı mekanizmalar kullanır.

Bu bize tekrar aynı prensibi gösterir:

> **Dosya uzantısı, dosyanın bütün teknik özelliklerini belirlemez.**

---

# 35. Hidden — Gizli Dosya Nedir?

Bazı dosya ve dizinler kullanıcı arayüzünde varsayılan olarak gösterilmeyebilir.

Linux/Unix ortamlarında adı:

```text
.
```

ile başlayan dosyalar genellikle gizli kabul edilir.

Örneğin:

```text
.bashrc
.ssh
.config
```

Windows'ta ise dosya sistemi özellikleri/attribute'ları kullanılarak dosyalar:

```text
Hidden
```

olarak işaretlenebilir.

Ancak:

```text
Gizli = Güvenli
```

değildir.

Aynı şekilde:

```text
Gizli = Zararlı
```

da değildir.

Gizlilik burada çoğunlukla görüntüleme davranışıyla ilgilidir.

---

# 36. Arşiv ve Sıkıştırma Aynı Şey Mi?

Tam olarak değil.

Örneğin:

```text
.tar
```

temel olarak birden fazla dosyayı tek bir arşivde toplamak için kullanılan bir format olabilir.

Sıkıştırma ayrıca uygulanabilir:

```text
.tar.gz
```

Burada:

```text
tar → arşivleme

gzip → sıkıştırma
```

işlevi görebilir.

Yaygın formatlar:

```text
.zip
.7z
.rar
.tar
.gz
```

farklı özelliklere sahiptir.

Siber güvenlik açısından arşivlerin içinde:

- Script'ler,
- Executable dosyalar,
- Belgeler,
- Başka arşivler

bulunabilir.

Bu nedenle:

> "ZIP dosyası güvenlidir."

şeklinde bir varsayım yapılmamalıdır.

---

# 37. Log Dosyaları

Loglar sistem ve uygulamalarda gerçekleşen olaylara ilişkin kayıtlar içerebilir.

Örneğin bir uygulama kendi:

```text
application.log
```

dosyasını oluşturabilir.

Linux sistemlerde:

```text
/var/log/
```

altında birçok log kaynağıyla karşılaşabiliriz.

Ancak Ders 03'te gördüğümüz gibi:

> Her log mutlaka klasik `.log` dosyası şeklinde bulunmaz.

Örneğin Windows Event Logs özel log formatlarında tutulur.

`systemd-journald` da binary journal formatı kullanabilir.

Bu nedenle:

```text
Log = .log uzantılı metin dosyası
```

demek doğru değildir.

---

# 38. Hash Nedir?

Bir **cryptographic hash function**, değişken uzunluktaki bir girdiyi sabit uzunlukta bir çıktı değerine dönüştürür.

Örneğin:

```text
DOSYA
  │
  ▼
SHA-256
  │
  ▼
64 hexadecimal karakterlik hash değeri
```

SHA-256, 256-bit çıktı üretir.

Bu çıktı genellikle hexadecimal olarak:

```text
64 karakter
```

şeklinde gösterilir.

Örneğin kavramsal olarak:

```text
rapor.pdf
    │
    ▼
SHA-256
    │
    ▼
a1b2c3d4...
```

---

# 39. Hash'in Önemli Özellikleri

Kriptografik hash fonksiyonlarının önemli özelliklerinden bazıları:

- Aynı girdi aynı hash değerini üretir.
- Küçük bir içerik değişikliği genellikle tamamen farklı bir hash üretir.
- Hash değerinden orijinal girdiyi elde etmek pratikte zor olacak şekilde tasarlanır.
- Farklı girdilerin aynı hash'i üretmesini bulmak zor olacak şekilde tasarlanır.

Ancak matematiksel olarak:

> Farklı iki girdinin hiçbir zaman aynı hash'i üretemeyeceğini

söyleyemeyiz.

Çünkü sabit uzunlukta çıktı üreten bir fonksiyonda teorik olarak **collision (çakışma)** mümkündür.

Güvenli kriptografik hash fonksiyonlarında amaç bu çakışmaları pratikte bulmayı son derece zor hâle getirmektir.

---

# 40. MD5 ve SHA-1 Neden Artık Güvenli Kabul Edilmiyor?

Eski sistemlerde sıkça:

```text
MD5
SHA-1
```

hash algoritmalarıyla karşılaşabilirsin.

Bunlar tarihsel olarak dosya bütünlüğü ve kimliklendirme işlemlerinde yaygın kullanılmıştır.

Ancak her ikisinde de ciddi collision zayıflıkları bilinmektedir.

Bu nedenle güvenlik açısından yeni bütünlük uygulamalarında genellikle:

```text
SHA-256
SHA-512
```

gibi modern algoritmalar tercih edilir.

DFIR dünyasında ise MD5 veya SHA-1 ile hâlâ karşılaşabilirsin çünkü eski veri kümeleri ve sistemler bu değerleri kullanabilir.

Önemli olan:

> **Hash algoritmalarının güvenlik özellikleri aynı değildir.**

---

# 41. Hash Ne İçin Kullanılır?

Dosya analizi ve DFIR içerisinde hash değerleri çeşitli amaçlarla kullanılabilir.

Örneğin:

### Bütünlük Kontrolü

```text
Dosyanın ilk hash'i
        │
        ▼
Dosya transfer edildi
        │
        ▼
Yeni hash hesaplandı
        │
        ▼
Karşılaştır
```

### Dosya Karşılaştırma

İki dosyanın SHA-256 değerleri karşılaştırılabilir.

### Bilinen Dosya Tanımlama

Hash, bilinen dosya veri tabanlarıyla karşılaştırılabilir.

### Malware Araştırması

Şüpheli bir dosyanın hash değeri güvenlik sistemlerinde veya tehdit istihbaratı kaynaklarında aranabilir.

Ancak önemli bir nokta:

> **Bir dosyanın hash'inin bir veritabanında bulunmaması dosyanın güvenli olduğunu kanıtlamaz.**

Dosyanın tek bir byte'ının değiştirilmesi bile farklı hash üretebilir.

---

# 42. Hash ile Şifreleme Aynı Şey Mi?

Hayır.

Bu iki kavram sık karıştırılır.

Basitleştirilmiş olarak:

```text
HASH
Girdi → Hash Fonksiyonu → Sabit uzunlukta özet
```

Hash fonksiyonları normal kullanımda geri çevrilebilir bir şifreleme mekanizması olarak tasarlanmaz.

Şifrelemede ise:

```text
Veri
 │
 ▼
Şifreleme + Anahtar
 │
 ▼
Şifreli Veri
 │
 ▼
Doğru Anahtar
 │
 ▼
Orijinal Veri
```

amaç yetkili tarafın veriyi tekrar çözebilmesidir.

Dolayısıyla:

```text
Hashing ≠ Encryption
```

Bu ayrımı ilerleyen kriptografi derslerinde ayrıntılı inceleyeceğiz.

---

# 43. Bir Dosya Silindiğinde Ne Olur?

Bu, DFIR açısından en ilginç sorulardan biridir.

Kullanıcı:

```text
DELETE
```

tuşuna bastığında her zaman aynı şey gerçekleşmez.

Örneğin dosya ilk olarak:

```text
Recycle Bin
```

veya:

```text
Trash
```

gibi bir alana taşınabilir.

Bu durumda dosya aslında hâlâ dosya sistemi içerisinde erişilebilir durumdadır.

Kullanıcı dosyayı kalıcı olarak sildiğinde ise dosya sisteminin davranışı kullanılan:

- Dosya sistemine,
- Depolama teknolojisine,
- İşletim sistemine,
- Silme yöntemine

bağlıdır.

---

# 44. Silinen Dosya Hemen Yok Olur Mu?

Her zaman değil.

Basitleştirilmiş geleneksel bir dosya sistemi senaryosunda:

```text
Dosya mevcut
      │
      ▼
Dosya silindi
      │
      ▼
Dosya sistemi ilgili alanı
boş/kullanılabilir olarak işaretleyebilir
      │
      ▼
Verinin bazı bölümleri fiziksel ortamda
bir süre kalabilir
      │
      ▼
Üzerine yeni veri yazılırsa
kurtarma zorlaşabilir / imkânsızlaşabilir
```

Ancak bu model özellikle SSD'lerde daha karmaşıktır.

---

# 45. SSD ve TRIM

Ders 02'de SSD'lerde:

**TRIM**

kavramından kısaca bahsetmiştik.

İşletim sistemi bir SSD'ye belirli blokların artık kullanılmadığını bildirebilir.

SSD controller'ı daha sonra bu blokların yönetimiyle ilgili işlemler gerçekleştirebilir.

Bu durum silinmiş verilerin kurtarılabilirliğini etkileyebilir.

Bu nedenle:

```text
HDD'den silinen dosya
```

ile:

```text
SSD'den silinen dosya
```

adli bilişim açısından her zaman aynı şekilde değerlendirilmez.

> "Silinen her dosya kesinlikle kurtarılabilir."

ifadesi yanlıştır.

Aynı şekilde:

> "Silinen dosya anında tamamen yok olur."

ifadesi de her koşul için doğru değildir.

DFIR'da bağlam önemlidir.

---

# 46. Symbolic Link Nedir?

Dosya sistemlerinde başka bir konuma referans veren özel yapılar bulunabilir.

Bunlardan biri:

**Symbolic Link — Sembolik Bağlantı**

Örneğin kavramsal olarak:

```text
shortcut-like-name
       │
       ▼
/gercek/konum/dosya.txt
```

Unix/Linux sistemlerde symbolic link'lerle sık karşılaşabilirsin.

Windows'ta da symbolic link ve başka link/reparse mekanizmaları bulunur.

Bunlar normal dosya kopyası olmak zorunda değildir.

Bu ayrım ileride:

- File system analysis
- Privilege escalation
- Path manipulation

gibi konularda önemli olabilir.

---

# 47. Dosya Yolları Neden Güvenlik İçin Önemlidir?

Bir dosyanın yalnızca adı değil bulunduğu yer de bize bağlam sağlar.

Örneğin:

```text
C:\Windows\System32\example.exe
```

ile:

```text
C:\Users\Ahmet\AppData\Local\Temp\example.exe
```

aynı dosya adına sahip olsa bile farklı bağlamlara sahiptir.

Ancak:

> "Temp klasöründeki her `.exe` zararlıdır."

demek de doğru değildir.

Güvenlik analisti:

```text
Dosya adı
+
Tam yol
+
Hash
+
Metadata
+
İmza bilgisi
+
Process davranışı
+
Ağ davranışı
+
Diğer artefaktlar
```

gibi birden fazla veriyi birlikte değerlendirir.

---

# 48. Basit Bir Olay Senaryosu

Bir çalışanın bilgisayarında şu dosyayı bulduğunu düşün:

```text
C:\Users\Ahmet\Downloads\invoice.pdf.exe
```

Hemen:

> "Bu malware."

demek yerine kanıt toplamaya başlayalım.

Sorabileceğimiz sorular:

```text
1. Dosyanın tam yolu nedir?

2. Gerçek uzantısı nedir?

3. File signature ne gösteriyor?

4. Dosyanın boyutu nedir?

5. Dosya ne zaman ortaya çıktı?

6. Modification zamanı nedir?

7. Dosyanın sahibi kim?

8. İzinleri nasıl?

9. SHA-256 değeri nedir?

10. Dijital imzası var mı?

11. Dosyanın kaynağına ilişkin artefakt var mı?

12. Dosyanın çalıştırıldığına dair kanıt var mı?

13. İlişkili bir process var mı?

14. Ağ bağlantısı oluşturmuş mu?

15. Başka dosyalar oluşturmuş mu?
```

Bu aşamada çok önemli bir ayrım vardır:

```text
Şüpheli dosyanın varlığı
            ≠
Dosyanın çalıştırılmış olması
            ≠
Dosyanın zararlı olduğunun kanıtlanması
```

Bunlar üç farklı iddiadır ve farklı kanıtlar gerektirebilir.

---

# 49. Bir Güvenlik Analisti Gibi Düşün

DFIR'da temel sorulardan biri:

> "Bunu nereden biliyoruz?"

Örneğin:

```text
Dosya 14:32'de çalıştırıldı.
```

dediğimizi düşün.

Analist şunu sormalı:

> "Hangi artefakt bunu gösteriyor?"

Belki:

- Process creation log'u,
- Prefetch benzeri execution artefaktı,
- EDR telemetry,
- Bellek verisi,
- Uygulama kaydı

gibi bir kanıt vardır.

Tek bir dosya timestamp'ine bakıp doğrudan:

> "Dosya tam bu saatte çalıştırılmış."

demek doğru olmayabilir.

Bu yüzden eğitim boyunca şu yaklaşımı kullanacağız:

```text
GÖZLEM
   │
   ▼
KANIT
   │
   ▼
YORUM
   │
   ▼
HİPOTEZ
   │
   ▼
DOĞRULAMA
```

---

# 🧪 Uygulama 04 — Kendi Dosya Sistemini Tanı

Bu uygulamada yalnızca kendi oluşturduğun zararsız dosyalar ve normal sistem arayüzleri üzerinde çalış.

Kritik sistem dosyalarını değiştirme veya silme.

---

## Görev 1 — Kullanılan Dosya Sistemini Bul

### Windows

PowerShell'de:

```powershell
Get-Volume
```

komutunu çalıştırabilirsin.

`FileSystem` sütununu incele.

Alternatif olarak:

```text
Bu Bilgisayar
→ Sürücüye Sağ Tık
→ Özellikler
```

bölümünden dosya sistemini görebilirsin.

### Linux

Terminalde:

```bash
df -T
```

kullanabilirsin.

### macOS

Disk Utility üzerinden dosya sistemi bilgilerini inceleyebilirsin.

Sonucu yaz:

```text
Kullandığım dosya sistemi:

____________________________________
```

---

## Görev 2 — Bir Test Dizini Oluştur

Kendi Documents/Belgeler dizinin içerisinde:

```text
ag-cyber-lab
```

isimli bir dizin oluştur.

İçerisine:

```text
lesson-04
```

isimli başka bir dizin oluştur.

Sonuç:

```text
ag-cyber-lab
└── lesson-04
```

---

## Görev 3 — Test Dosyası Oluştur

`lesson-04` dizininin içerisinde:

```text
test.txt
```

isimli bir dosya oluştur.

İçerisine:

```text
AG Cyber Lab
Dosya Sistemleri
```

yaz ve kaydet.

---

## Görev 4 — Absolute Path'i Bul

Oluşturduğun `test.txt` dosyasının tam yolunu bul.

Örneğin:

```text
C:\Users\Ahmet\Documents\ag-cyber-lab\lesson-04\test.txt
```

veya:

```text
/home/ahmet/Documents/ag-cyber-lab/lesson-04/test.txt
```

Kendi sonucunu yaz:

```text
Absolute Path:

____________________________________________________
```

---

## Görev 5 — Metadata'yı İncele

`test.txt` dosyasının:

```text
Adı:
Boyutu:
Oluşturulma zamanı:
Değiştirilme zamanı:
Sahibi:
İzinleri:
```

gibi ulaşabildiğin bilgilerini incele.

> İşletim sistemine ve dosya sistemine bağlı olarak bütün alanları aynı şekilde göremeyebilirsin.

---

# 🧪 Mini Deney — Hash Gerçekten Değişiyor Mu?

Bu deneyde kendi oluşturduğumuz `test.txt` dosyasını kullanacağız.

## Windows

PowerShell:

```powershell
Get-FileHash .\test.txt -Algorithm SHA256
```

## Linux

```bash
sha256sum test.txt
```

## macOS

```bash
shasum -a 256 test.txt
```

İlk hash'i kaydet:

```text
Hash 1:

____________________________________________________
```

Şimdi dosyanın sonuna yalnızca:

```text
!
```

karakterini ekle ve kaydet.

SHA-256 değerini tekrar hesapla:

```text
Hash 2:

____________________________________________________
```

### Gözlem

İki hash aynı mı?

```text
[ ] Evet
[ ] Hayır
```

Dosyada yalnızca tek karakter değiştirmemize rağmen hash'in nasıl değiştiğini gözlemle.

Bu etki kriptografik hash fonksiyonlarının önemli özelliklerinden biri olan:

**avalanche effect**

ile ilişkilidir.

---

# 🧪 Mini Deney — Uzantı İçeriği Değiştirir Mi?

Kendi oluşturduğun:

```text
test.txt
```

dosyasının bir kopyasını oluştur.

Kopyanın adını:

```text
test.jpg
```

yap.

Şimdi düşün:

> Dosya gerçekten JPEG görsele dönüştü mü?

Hayır.

Yalnızca dosyanın adını değiştirdik.

Bu deney bize:

```text
DOSYA UZANTISI
      ≠
DOSYANIN GERÇEK İÇERİĞİ
```

prensibini gösterir.

Dosyayı deney sonunda silebilir veya tekrar `.txt` olarak adlandırabilirsin.

---

# 🧪 Mini Deney — Relative Path

Terminal veya PowerShell kullanıyorsan oluşturduğun:

```text
lesson-04
```

dizinine geç.

Mevcut dizini görüntüle.

Windows PowerShell:

```powershell
Get-Location
```

Linux/macOS:

```bash
pwd
```

Şimdi bulunduğun konumdan `test.txt` dosyasını düşün.

Absolute path uzun olabilir:

```text
C:\Users\Ahmet\Documents\ag-cyber-lab\lesson-04\test.txt
```

ancak mevcut klasörün içindeyken relative path:

```text
.\test.txt
```

veya Unix tarzı ortamlarda:

```text
./test.txt
```

şeklinde ifade edilebilir.

---

# 🧠 Kendini Test Et

## Soru 1

Aşağıdakilerden hangisi depolama teknolojisi ile dosya sistemi arasındaki farkı doğru açıklar?

**A)** SSD ve NTFS aynı kavramdır.  
**B)** SSD/HDD depolama teknolojileridir; NTFS/ext4 gibi yapılar dosya sistemidir.  
**C)** NTFS bir SSD türüdür.  
**D)** ext4 bir RAM türüdür.

---

## Soru 2

`C:\Users\Ahmet\Documents\rapor.pdf` nedir?

**A)** IP adresi  
**B)** Process ID  
**C)** Dosya yolu  
**D)** Hash değeri

---

## Soru 3

Linux/Unix tarzı yollarda:

```text
..
```

genellikle neyi ifade eder?

**A)** Kök dizini  
**B)** Bir üst dizini  
**C)** Home dizinini  
**D)** Silinmiş dosyayı

---

## Soru 4

Hangisi doğrudur?

**A)** `.jpg` uzantılı her dosya kesinlikle JPEG'dir.  
**B)** Dosya uzantısı değiştirildiğinde içeriği otomatik olarak dönüştürülür.  
**C)** Dosya adı ve uzantısı gerçek dosya türünü tek başına garanti etmez.  
**D)** `.exe` uzantılı bütün dosyalar malware'dir.

---

## Soru 5

NTFS ile en yakından ilişkili yapı hangisidir?

**A)** MFT  
**B)** DNS  
**C)** TCP  
**D)** CPU Cache

---

## Soru 6

Linux'taki `/proc` için hangisi daha doğrudur?

**A)** Normal bir fotoğraf klasörüdür.  
**B)** Process ve kernel bilgilerini sunabilen sanal dosya sistemidir.  
**C)** Windows Registry'nin aynısıdır.  
**D)** Yalnızca kullanıcı belgelerini tutar.

---

## Soru 7

Aşağıdakilerden hangisi metadata örneğidir?

**A)** Dosyanın boyutu  
**B)** Monitör çözünürlüğü  
**C)** Wi-Fi sinyal gücü  
**D)** CPU çekirdek sayısı

---

## Soru 8

Bir dosyanın Access Time değeri `14:32` ise hangisini kesin olarak söyleyebiliriz?

**A)** Kullanıcı dosyayı tam 14:32'de manuel olarak açmıştır.  
**B)** Dosya 14:32'de malware olmuştur.  
**C)** Access Time'ın anlamını dosya sistemi ve sistem davranışı bağlamında değerlendirmeliyiz.  
**D)** Dosya 14:32'de indirilmiştir.

---

## Soru 9

Hash ile encryption arasındaki ilişki için hangisi doğrudur?

**A)** Tamamen aynı şeydir.  
**B)** Hashing normal kullanımda tek yönlü özetleme amacı taşırken encryption doğru anahtarla geri çözülebilir olacak şekilde tasarlanır.  
**C)** Hash yalnızca dosya sıkıştırır.  
**D)** Encryption sadece dosya adını değiştirir.

---

## Soru 10

Bir güvenlik analisti:

```text
invoice.pdf.exe
```

dosyasını buldu.

Dosya `.exe` olduğu için analist:

> "Bu kesin malware."

dedi.

Bu çıkarım neden hatalıdır?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 11

Bir dosyanın SHA-256 değeri bilinen malware veritabanında bulunmadı.

Bu durum dosyanın güvenli olduğunu kanıtlar mı?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 12 — DFIR Sorusu

Bir dosyanın creation timestamp'i:

```text
02:15
```

olarak görünüyor.

Bundan:

> "Dosya kesin olarak saldırgan tarafından 02:15'te çalıştırıldı."

sonucuna varabilir miyiz?

Neden?

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

# 🎯 Ana Görev — Şüpheli Dosya Analizi

Bir olay müdahale analisti olduğunu düşün.

Sistemde şu dosyayı buldun:

```text
C:\Users\Ahmet\AppData\Local\Temp\invoice.pdf.exe
```

Dosyayı çalıştırmadan önce araştırma planı oluştur.

Aşağıdaki başlıkları kullan:

```text
1. Dosyanın tam yolu:

2. Dosya adı ve gerçek uzantısı:

3. File signature:

4. Dosya boyutu:

5. Metadata:

6. Timestamp'ler:

7. Dosya sahibi / izinler:

8. SHA-256:

9. Dijital imza:

10. Çalıştırılma kanıtı:

11. İlişkili process'ler:

12. İlişkili ağ aktivitesi:
```

Son olarak şu soruyu cevapla:

> Bu bilgilerden hangileri dosyanın yalnızca sistemde bulunduğunu, hangileri gerçekten çalıştırıldığını anlamamıza yardımcı olabilir?

---

# ⚠️ Güvenli Analiz Notu

Bilinmeyen veya şüpheli dosyaları:

```text
"Ne olduğunu görmek için açayım."
```

yaklaşımıyla çalıştırma.

Gerçek zararlı yazılım analizi:

- İzole sanal makineler,
- Sandbox ortamları,
- Network izolasyonu,
- Snapshot'lar,
- Uygun analiz araçları

gibi kontrollü mekanizmalar gerektirebilir.

Bu laboratuvarda şimdilik yalnızca kendi oluşturduğumuz zararsız dosyalar üzerinde çalışıyoruz.

---

# 🔐 Siber Güvenlik Bağlantısı

Bu derste öğrendiğin kavramlar ileride birçok uzmanlık alanında tekrar karşına çıkacak.

```text
DOSYA SİSTEMİ
│
├── DFIR
│   ├── Timeline Analysis
│   ├── Deleted File Analysis
│   ├── Metadata
│   └── File System Artifacts
│
├── MALWARE ANALYSIS
│   ├── File Signature
│   ├── Hash
│   ├── PE Files
│   └── Dropped Files
│
├── BLUE TEAM
│   ├── Suspicious Files
│   ├── File Integrity
│   └── IOC Analysis
│
└── SYSTEM SECURITY
    ├── Permissions
    ├── Ownership
    ├── ACL
    └── Path Security
```

Dosya sistemi yalnızca verileri saklayan bir yapı değildir.

Aynı zamanda bir sistemde geçmişte gerçekleşen olaylara ilişkin çok değerli izler bırakabilir.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Bir dosyaya artık yalnızca:

```text
rapor.pdf
```

olarak bakmamalısın.

Bir analist için dosya:

```text
                         DOSYA
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
        İÇERİK            YOL            METADATA
          │                │                │
          │                │         ┌──────┼──────┐
          │                │         ▼      ▼      ▼
          │                │       Sahip  İzin   Zaman
          │                │
          ▼                ▼
     FILE SIGNATURE      BAĞLAM
          │
          ▼
         HASH
```

gibi birçok farklı özelliği olan bir artefakttır.

Ve en önemli analist prensibi:

```text
DOSYANIN VARLIĞI
       │
       ≠
       │
DOSYANIN ÇALIŞTIRILMASI
       │
       ≠
       │
DOSYANIN ZARARLI OLMASI
```

Her iddia için uygun kanıt gerekir.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Dosya sisteminin ne olduğunu açıklayabiliyorum.
- [ ] Depolama teknolojisi ile dosya sistemi arasındaki farkı biliyorum.
- [ ] Dosya ve dizin kavramlarını biliyorum.
- [ ] Dosya uzantısının gerçek içeriği garanti etmediğini biliyorum.
- [ ] File signature / magic bytes kavramını temel seviyede biliyorum.
- [ ] Windows dosya yollarını okuyabiliyorum.
- [ ] Linux dosya yollarını okuyabiliyorum.
- [ ] Absolute ve relative path arasındaki farkı biliyorum.
- [ ] `.`, `..` ve `~` kavramlarını tanıyorum.
- [ ] NTFS'in ne olduğunu biliyorum.
- [ ] MFT kavramını temel seviyede tanıyorum.
- [ ] FAT32 ve exFAT'i temel seviyede tanıyorum.
- [ ] Linux dosya sistemi hiyerarşisini temel seviyede biliyorum.
- [ ] `/proc` dizininin normal bir disk dizini olmadığını biliyorum.
- [ ] ext4 ve inode kavramlarını temel seviyede tanıyorum.
- [ ] APFS'in ne olduğunu biliyorum.
- [ ] Metadata kavramını açıklayabiliyorum.
- [ ] Timestamp'lerin neden dikkatli yorumlanması gerektiğini biliyorum.
- [ ] Windows ve Linux izin modellerinin temel farklarını biliyorum.
- [ ] Hash kavramını açıklayabiliyorum.
- [ ] Hash ile encryption'ın aynı şey olmadığını biliyorum.
- [ ] MD5/SHA-1'in modern güvenlik amaçlarında neden tercih edilmediğini temel seviyede biliyorum.
- [ ] Bir dosya silindiğinde verinin her zaman anında yok olmayabileceğini biliyorum.
- [ ] SSD ve TRIM'in silinen veri kurtarmayı etkileyebileceğini biliyorum.
- [ ] Kendi dosya sistemimi inceledim.
- [ ] Bir dosyanın SHA-256 hash değerini hesapladım.
- [ ] Uzantı değiştirme deneyini gerçekleştirdim.
- [ ] Quiz sorularını cevapladım.
- [ ] Şüpheli dosya senaryosunu tamamladım.

---

# 🧩 Dersin Özeti

Bu derste bilgisayar modelimize dosya sistemi katmanını ekledik:

```text
                     UYGULAMA
                         │
                         ▼
                 İŞLETİM SİSTEMİ
                         │
                         ▼
                      KERNEL
                         │
                         ▼
                   DOSYA SİSTEMİ
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       DOSYALAR       DİZİNLER       METADATA
          │                              │
          ▼                       ┌──────┼──────┐
       İÇERİK                     ▼      ▼      ▼
                              Zaman    İzin   Sahip
          │
          ▼
       DEPOLAMA
```

Windows tarafında:

```text
NTFS → MFT → Dosya / Metadata / İzinler
```

Linux tarafında ise örneğin:

```text
ext4 → inode / dizin kayıtları → Dosya / Metadata / İzinler
```

gibi farklı yapılarla karşılaşabiliriz.

Bunların üzerine ileride DFIR tekniklerini inşa edeceğiz.

---

# 🚀 Sonraki Ders

## Ders 05 — Process ve Thread: Çalışan Programları Anlamak

Şimdi depolamadaki dosyalardan tekrar çalışan sisteme geçiyoruz.

Bir sonraki derste:

- Program ile process arasındaki fark nedir?
- PID nedir?
- Parent Process ve Child Process nedir?
- Process Tree nedir?
- Thread nedir?
- Bir process bellekte nasıl temsil edilir?
- Process durumları nelerdir?
- İşletim sistemi process'leri nasıl yönetir?
- Bir process neden sona erer?
- Windows ve Linux üzerinde process'leri nasıl gözlemleriz?
- Zararlı yazılımlar neden process'lerle yakından ilişkilidir?
- Bir analist şüpheli process'i nasıl değerlendirir?

sorularının cevaplarını arayacağız.

Ve şu temel ilişkiyi büyüteceğiz:

```text
Dosya
  │
  │ çalıştırılır
  ▼
Process
  │
  ├── PID
  ├── Parent
  ├── Thread'ler
  ├── Bellek
  ├── Açık Dosyalar
  └── Ağ Bağlantıları
```

Ders 05'ten itibaren sistemde yalnızca:

> "Hangi programlar var?"

diye değil,

> "Şu anda hangi kod, hangi kullanıcı bağlamında, hangi process içerisinde ve hangi kaynaklarla çalışıyor?"

diye düşünmeye başlayacağız.