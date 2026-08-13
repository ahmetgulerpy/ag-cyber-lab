# Ders 02 — CPU, RAM ve Depolama: Bilgisayar Veriyi Nasıl İşler?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01 — Bilgisayar Nedir?

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- CPU'nun temel görevini açıklayabileceksin.
- CPU'nun komutları temel olarak nasıl yürüttüğünü anlayabileceksin.
- Çekirdek (core), thread, register ve cache kavramlarını temel seviyede tanıyabileceksin.
- GHz değerinin neden tek başına CPU performansını göstermediğini anlayabileceksin.
- RAM'in bilgisayardaki görevini açıklayabileceksin.
- RAM kapasitesinin neden önemli olduğunu anlayabileceksin.
- RAM yetersiz kaldığında sistemde temel olarak neler olabileceğini öğreneceksin.
- SSD ve HDD arasındaki temel farkları açıklayabileceksin.
- SATA ve NVMe kavramlarını temel seviyede tanıyacaksın.
- CPU, RAM ve depolamanın birlikte nasıl çalıştığını açıklayabileceksin.
- Bu bileşenlerin siber güvenlik ve dijital adli bilişim açısından neden önemli olduğunu anlayabileceksin.

> Bu derste birçok yeni terim göreceksin. Register, cache, virtual memory veya NVMe gibi terimleri şu anda ayrıntılarıyla ezberlemen gerekmiyor. Öncelikli amacımız bileşenlerin birbirleriyle olan ilişkisini anlamak.

---

# 1. Önceki Dersten Hatırlayalım

Ders 01'de bilgisayarın temel çalışma modelini gördük.

Bir program çalıştırıldığında:

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

arasındaki temel ilişkiyi öğrendik.

Şimdi bu sistemin üç önemli donanım bileşenine daha yakından bakacağız:

```text
                  BİLGİSAYAR
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
          CPU         RAM       DEPOLAMA
           │           │           │
       Komutları     Çalışma     Verileri
       yürütür       belleği     uzun süre
                                 saklar
```

Bu üç bileşenin aynı işi yapmadığını anlamak önemlidir.

> **CPU komutları yürütür, RAM aktif çalışma için bellek sağlar, depolama ise verilerin uzun süre saklanmasını sağlar.**

Bu model başlangıç için yeterlidir.

Şimdi biraz daha derine inelim.

---

# 2. CPU Nedir?

CPU'nun açılımı:

**Central Processing Unit**

Türkçesi:

**Merkezi İşlem Birimi**

CPU, programların makine komutlarını yürüten bilgisayar bileşenidir.

Programlar çalışırken CPU çok sayıda farklı işlem gerçekleştirir.

Örneğin:

- Aritmetik işlemler
- Mantıksal karşılaştırmalar
- Bellekteki verilerle ilgili işlemler
- Program akışını değiştiren kararlar
- İşletim sisteminin ve uygulamaların komutlarının yürütülmesi

CPU'yu yalnızca:

> "Hesaplama yapan parça"

olarak düşünmek eksik olur.

Daha doğru temel model:

> **CPU = Programların makine komutlarını yürüten temel işlem birimi**

---

# 3. Programlar CPU Tarafından Nasıl Anlaşılır?

Burada önemli bir soruyla karşılaşıyoruz.

Python, C, JavaScript veya başka bir programlama diliyle yazılmış kodları insanlar okuyabilir.

Örneğin:

```python
x = 5
y = 3
print(x + y)
```

Ancak CPU doğrudan bu Python satırlarını okuyup:

> "5 ile 3'ü toplamam gerekiyor."

şeklinde düşünmez.

CPU kendi işlemci mimarisinin desteklediği **makine komutlarını** yürütür.

Basitleştirilmiş olarak:

```text
İnsan tarafından yazılan program
             │
             ▼
   Yazılım çalışma/çeviri katmanları
             │
             ▼
       Makine komutları
             │
             ▼
            CPU
```

Programlama diline göre bu süreç farklı şekillerde gerçekleşebilir.

Derleyiciler, yorumlayıcılar, sanal makineler ve çalışma zamanları gibi kavramlar burada devreye girebilir.

Bunları ilerleyen programlama derslerinde inceleyeceğiz.

Şimdilik bilmen gereken:

> **CPU, programın sonunda işlemci tarafından yürütülebilir hâle gelen makine komutlarını yürütür.**

---

# 4. CPU Bir Komutu Nasıl Yürütür?

CPU'nun çalışma mantığını anlamak için oldukça basitleştirilmiş bir model kullanabiliriz.

Bu model genellikle:

```text
Fetch → Decode → Execute
```

olarak ifade edilir.

Türkçesi:

```text
Getir → Çözümle → Yürüt
```

---

## 4.1 Fetch — Komutu Getir

CPU yürütülecek komutu bellek sisteminden alır.

```text
Bellek
   │
   ▼
Komut
   │
   ▼
 CPU
```

---

## 4.2 Decode — Komutu Çözümle

CPU komutun hangi işlemi ifade ettiğini belirler.

Örneğin komut:

- Bir değeri taşımayı,
- İki değeri toplamayı,
- Bir karşılaştırma yapmayı,
- Program akışını değiştirmeyi

ifade ediyor olabilir.

---

## 4.3 Execute — Komutu Yürüt

CPU gerekli işlemi gerçekleştirir.

Basitleştirilmiş döngü:

```text
        ┌───────────────────┐
        │                   │
        ▼                   │
      FETCH                 │
        │                   │
        ▼                   │
      DECODE                │
        │                   │
        ▼                   │
      EXECUTE ──────────────┘
```

CPU bu tür işlemleri son derece hızlı gerçekleştirir.

> Gerçek modern işlemciler bu basit şemadan çok daha karmaşıktır. Pipelining, out-of-order execution, branch prediction ve speculative execution gibi teknikler kullanabilirler.

Bunları şu anda öğrenmen gerekmiyor.

Önemli olan temel mantığı görmek:

> **CPU komutları alır, anlamlandırır ve yürütür.**

---

# 5. Register Nedir?

CPU işlem yaparken çok hızlı erişmesi gereken küçük miktardaki verileri kendi içerisindeki özel saklama alanlarında tutabilir.

Bunlara:

**Register (Yazmaç)**

denir.

Basitleştirilmiş olarak:

```text
CPU
│
├── Register'lar
│
├── Kontrol birimleri
└── İşlem birimleri
```

Register'lar:

- CPU'nun içinde bulunur.
- Çok hızlıdır.
- Çok küçük kapasitelidir.
- CPU'nun o anda yürüttüğü işlemlerde kullanılır.

Örneğin bir hesaplama sırasında kullanılan değerler veya CPU'nun hangi komutu yürüteceğine ilişkin bilgiler register'larda bulunabilir.

Şimdilik:

> **Register = CPU'nun çok hızlı eriştiği küçük çalışma alanları**

olarak düşünebilirsin.

Register kavramı ileride özellikle:

- Assembly
- Reverse Engineering
- Exploit Development
- Malware Analysis

konularında tekrar karşımıza çıkacak.

---

# 6. CPU Cache Nedir?

CPU çok hızlı çalışır.

RAM ise CPU'ya kıyasla daha yavaş bir bellek katmanıdır.

Eğer CPU ihtiyaç duyduğu her veri için sürekli daha yavaş bellek katmanlarını beklemek zorunda kalsaydı işlemci performansının önemli bir bölümü boşa gidebilirdi.

Bu nedenle işlemciler **cache (önbellek)** adı verilen çok hızlı bellek katmanlarından yararlanır.

Basitleştirilmiş bir bellek hiyerarşisi:

```text
             DAHA HIZLI
                 ▲
                 │
            Registers
                 │
              L1 Cache
                 │
              L2 Cache
                 │
              L3 Cache
                 │
                RAM
                 │
          SSD / HDD
                 │
                 ▼
      DAHA YÜKSEK KAPASİTE
```

Genel olarak yukarı çıktıkça:

- Erişim daha hızlıdır.
- Kapasite daha küçüktür.
- CPU'ya daha yakındır.

Aşağı indikçe:

- Kapasite büyür.
- Erişim genellikle daha yavaş olur.

Bu bize önemli bir bilgisayar bilimi prensibini gösterir:

> **En hızlı bellek aynı zamanda en büyük bellek değildir.**

---

# 7. CPU Çekirdeği — Core Nedir?

Modern işlemciler genellikle birden fazla işlem çekirdeğine sahiptir.

Örneğin bir CPU:

```text
CPU
│
├── Core 1
├── Core 2
├── Core 3
├── Core 4
├── Core 5
└── Core 6
```

şeklinde birden fazla çekirdeğe sahip olabilir.

Bir çekirdeği, komut akışlarını yürütebilen işlem birimlerinden biri olarak düşünebilirsin.

Birden fazla çekirdek, uygun iş yüklerinde birden fazla işin paralel biçimde ilerlemesine yardımcı olabilir.

Ancak:

> **İki kat çekirdek = her programda iki kat performans**

anlamına gelmez.

Programın yapısı, işletim sisteminin zamanlaması ve yapılan işin türü performansı etkiler.

---

# 8. Thread Nedir?

Burada sık karıştırılan başka bir kavram vardır:

**Thread — İş Parçacığı**

Thread, bir process içerisindeki yürütme akışıdır.

Başlangıç seviyesinde:

```text
PROCESS
│
├── Thread 1
├── Thread 2
└── Thread 3
```

şeklinde düşünebilirsin.

Bir process en az bir thread üzerinden yürütülür ve bazı programlar birden fazla thread kullanabilir.

Ancak CPU özelliklerinde gördüğün:

```text
6 Cores
12 Threads
```

ifadesindeki "thread" ile yazılım tarafındaki thread kavramı birebir aynı şey değildir.

Buradaki 12 thread genellikle CPU'nun desteklediği **logical processor / hardware thread** sayısını ifade eder.

Örneğin:

```text
CPU
│
├── 6 fiziksel çekirdek
└── 12 mantıksal işlemci
```

olabilir.

> **Core ve thread aynı şey değildir.**

Process ve thread kavramlarını Ders 05'te çok daha ayrıntılı inceleyeceğiz.

---

# 9. GHz Nedir?

CPU özelliklerine baktığında genellikle:

```text
3.2 GHz
4.0 GHz
5.1 GHz
```

gibi değerlerle karşılaşırsın.

GHz:

**Gigahertz**

anlamına gelir ve işlemcinin saat frekansını ifade eder.

Ancak burada çok önemli bir nokta vardır:

> **Daha yüksek GHz değeri her zaman daha hızlı CPU anlamına gelmez.**

CPU performansını etkileyen birçok faktör vardır:

- İşlemci mimarisi
- Çekirdek sayısı
- Cache yapısı
- Komut başına yapılan iş
- Bellek performansı
- Güç ve sıcaklık sınırları
- Yazılımın nasıl tasarlandığı
- İş yükünün türü

Bu nedenle:

```text
CPU A → 4.0 GHz
CPU B → 3.5 GHz
```

bilgisine bakarak:

> "CPU A kesinlikle daha hızlıdır."

diyemeyiz.

Saat frekansı önemli bir özelliktir fakat tek performans ölçütü değildir.

---

# 10. RAM Nedir?

RAM'in açılımı:

**Random Access Memory**

RAM, bilgisayarın ana çalışma belleğidir.

İşletim sistemi ve çalışan programlar ihtiyaç duydukları kod ve verilerin önemli bir bölümünü çalışma sırasında bellekte tutar.

Örneğin:

```text
İşletim Sistemi
Google Chrome
Visual Studio Code
Discord
Oyun
```

aynı anda çalışıyorsa hepsi sistem belleğinin belirli bölümlerini kullanabilir.

Başlangıç seviyesinde:

> **RAM = Çalışan sistem ve programlar için hızlı, geçici ana bellek**

olarak düşünebilirsin.

---

# 11. RAM Neden Gereklidir?

Depolama aygıtları büyük miktarda veri saklayabilir.

Ancak CPU'nun aktif çalışma sırasında ihtiyaç duyduğu kod ve verilere hızlı biçimde erişmesi gerekir.

Bu nedenle bilgisayar farklı hız ve kapasitelere sahip bellek katmanları kullanır.

Basitleştirilmiş model:

```text
DEPOLAMA
    │
    │ Program ve dosyalar
    ▼
   RAM
    │
    │ Aktif kod/veri
    ▼
 CACHE
    │
    ▼
REGISTER
    │
    ▼
   CPU
```

Bu çizim verinin her zaman tam olarak bu sırayla taşındığı anlamına gelmez.

Gerçek bellek sistemi daha karmaşıktır.

Ama temel fikir şudur:

> **CPU'nun aktif olarak kullandığı verilere hızlı erişebilmesi gerekir.**

---

# 12. RAM Neden Geçicidir?

RAM, uçucu (**volatile**) bir bellek türüdür.

Normal çalışma koşullarında elektrik kesildiğinde RAM'deki içerik kalıcı depolamadaki veriler gibi korunmaz.

Bu nedenle:

```text
RAM
│
├── Aktif çalışma için kullanılır
├── Uçucudur
└── Kalıcı dosya depolama amacı taşımaz
```

Örneğin bir metin belgesi üzerinde çalıştığını ve değişikliklerini henüz kaydetmediğini düşün.

Bilgisayar aniden güç kaybederse kaydedilmemiş değişikliklerin bir kısmı kaybolabilir.

Ancak dosyayı SSD veya HDD'ye kaydettiğinde veri kalıcı depolamada tutulabilir.

Bu ayrım siber güvenlik açısından da önemlidir.

Çünkü bazı kanıtlar:

```text
Sistem açıkken → RAM'de bulunabilir

Sistem kapandığında → Kaybolabilir
```

---

# 13. RAM Kapasitesi Neden Önemlidir?

RAM kapasitesi genellikle:

```text
4 GB
8 GB
16 GB
32 GB
64 GB
```

gibi değerlerle ifade edilir.

Aynı anda çok sayıda uygulama çalıştırıldığında bellek kullanımı artabilir.

Örneğin:

```text
Windows
   +
Chrome
   +
VS Code
   +
Discord
   +
Virtual Machine
```

aynı anda RAM kullanabilir.

Özellikle siber güvenlik çalışmalarında sanal makineler önemli miktarda RAM tüketebilir.

Örneğin:

```text
Ana İşletim Sistemi
        │
        ├── Kali Linux VM
        ├── Windows VM
        └── Lab Sunucusu VM
```

çalıştırmak istediğinde RAM kapasitesi önemli hâle gelir.

Ancak:

> **Daha fazla RAM, ihtiyaç yoksa CPU'yu otomatik olarak daha hızlı hâle getirmez.**

---

# 14. RAM Dolarsa Ne Olur?

Modern işletim sistemleri yalnızca fiziksel RAM'e dayanmak zorunda değildir.

RAM üzerindeki baskı arttığında işletim sistemi bazı bellek yönetimi mekanizmalarından yararlanabilir.

Bunlardan biri **virtual memory (sanal bellek)** kavramıdır.

İşletim sistemi gerektiğinde depolama alanının belirli bölümlerini bellek yönetiminin bir parçası olarak kullanabilir.

Windows'ta bununla ilişkili yapılardan biri:

```text
pagefile.sys
```

Linux sistemlerde ise:

```text
swap
```

kavramıyla karşılaşabilirsin.

Çok basitleştirilmiş olarak:

```text
Fiziksel RAM
     │
     │ Bellek baskısı
     ▼
İşletim Sistemi
     │
     ▼
Depolamadaki yardımcı alan
(pagefile / swap gibi)
```

Depolama RAM'den genellikle çok daha yavaş olduğu için yoğun bellek baskısı sistem performansını ciddi şekilde etkileyebilir.

Ancak önemli bir düzeltme:

> **Sanal bellek yalnızca "RAM dolduğunda kullanılan disk" değildir.**

Modern işletim sistemlerinin bellek yönetimi bundan çok daha kapsamlıdır.

Sanal adres alanı, bellek sayfaları ve paging kavramlarını ileride işletim sistemi derslerinde daha ayrıntılı göreceğiz.

---

# 15. Depolama Nedir?

Ders 01'de "disk" yerine daha genel olan **depolama (storage)** kavramını kullanmaya başlamıştık.

Bunun nedeni:

- HDD bir disktir.
- SSD ise mekanik disk kullanmaz.

Dolayısıyla:

> **Depolama**

her ikisini kapsayan daha doğru bir terimdir.

Yaygın depolama aygıtları:

```text
DEPOLAMA
│
├── HDD
└── SSD
```

Depolama üzerinde:

- İşletim sistemi
- Programlar
- Belgeler
- Fotoğraflar
- Videolar
- Loglar
- Veritabanları
- Kullanıcı dosyaları

gibi çok farklı veriler bulunabilir.

---

# 16. HDD Nasıl Çalışır?

HDD:

**Hard Disk Drive**

anlamına gelir.

HDD'ler verileri manyetik yüzeylere kaydeden mekanik depolama aygıtlarıdır.

Basitleştirilmiş yapı:

```text
HDD
│
├── Manyetik plakalar
├── Okuma / yazma kafası
├── Motor
└── Elektronik kontrol bileşenleri
```

Plakalar döner ve okuma/yazma mekanizması gerekli verilere erişir.

HDD'lerin genel özellikleri:

- Yüksek kapasite sunabilir.
- Kapasite başına maliyeti genellikle düşüktür.
- Mekanik parçalar içerir.
- Rastgele erişimde SSD'lere göre genellikle daha yavaştır.
- Fiziksel darbelerden daha fazla etkilenebilir.

---

# 17. SSD Nasıl Çalışır?

SSD:

**Solid State Drive**

anlamına gelir.

SSD'ler verileri genellikle NAND flash bellek hücrelerinde saklar.

Basitleştirilmiş yapı:

```text
SSD
│
├── NAND Flash Bellek
├── Controller
└── Firmware
```

SSD içerisinde HDD'deki gibi dönen plakalar ve hareket eden okuma/yazma kafası bulunmaz.

Bu nedenle SSD'ler genellikle:

- Daha düşük erişim gecikmesine sahiptir.
- HDD'lerden daha hızlı olabilir.
- Sessizdir.
- Mekanik hareketli parça içermez.
- Fiziksel hareket kaynaklı mekanik arızalara daha az açıktır.

Ancak SSD de sonsuz ömürlü değildir.

Flash bellek hücrelerinin sınırlı yazma ömrü vardır ve SSD controller'ı verilerin nasıl yönetileceğinde önemli rol oynar.

---

# 18. SATA ve NVMe Nedir?

Burada öğrencilerin sık karıştırdığı iki kavramla tanışalım:

**SATA** ve **NVMe**

Bunlar doğrudan:

> "SSD türü"

demek değildir.

Farklı iletişim arabirimleri/protokolleri ve bağlantı teknolojileriyle ilişkilidirler.

Başlangıç için şöyle düşünebiliriz:

```text
SSD
│
├── SATA tabanlı çözümler
│
└── PCIe / NVMe tabanlı çözümler
```

NVMe SSD'ler PCI Express üzerinden çalışabilir ve genellikle SATA SSD'lerden daha yüksek performans sağlayabilir.

Ancak:

```text
SSD = Her zaman NVMe
```

değildir.

SATA kullanan SSD'ler de vardır.

Benzer şekilde:

```text
M.2 = NVMe
```

demek de her zaman doğru değildir.

M.2 fiziksel bir form faktörüdür ve M.2 biçimindeki bir cihaz farklı arayüz/protokoller kullanabilir.

Şimdilik bunları ezberlemen gerekmiyor.

Bilmen gereken temel nokta:

> **SSD teknolojisi ile cihazın bağlantı/protokol özellikleri aynı kavram değildir.**

---

# 19. HDD ve SSD Karşılaştırması

Genel bir karşılaştırma yapalım:

| Özellik | HDD | SSD |
|---|---|---|
| Temel teknoloji | Manyetik / mekanik | Flash bellek tabanlı |
| Hareketli mekanik parça | Var | Yok |
| Erişim gecikmesi | Genellikle daha yüksek | Genellikle daha düşük |
| Rastgele erişim performansı | Daha düşük | Daha yüksek |
| Ses | Duyulabilir olabilir | Sessiz |
| Fiziksel darbe dayanımı | Genellikle daha düşük | Genellikle daha yüksek |
| Kapasite başına maliyet | Genellikle daha düşük | Genellikle daha yüksek |

Bu değerler genel eğilimlerdir.

Belirli cihazlara göre sonuçlar değişebilir.

Her iki teknoloji için de temel amaç:

> **Verileri güç kesildikten sonra da saklayabilen kalıcı depolama sağlamaktır.**

---

# 20. CPU, RAM ve Depolama Nasıl Birlikte Çalışır?

Şimdi tüm parçaları bir araya getirelim.

Bilgisayarında Chrome'un kurulu olduğunu düşün.

Chrome çalışmıyorken program dosyaları depolamada bulunabilir.

```text
DEPOLAMA
│
└── Chrome program dosyaları
```

Chrome'u başlattığında işletim sistemi program için gerekli yapıları oluşturur.

Programın ilgili kod ve verileri sanal bellek mekanizmaları aracılığıyla belleğe eşlenebilir veya ihtiyaç oldukça belleğe getirilebilir.

CPU ise programın yürütülebilir makine komutlarını çalıştırır.

Başlangıç seviyesinde:

```text
         DEPOLAMA
             │
             │ Program / dosyalar
             ▼
            RAM
             │
             │ Aktif kod ve veriler
             ▼
          CPU CACHE
             │
             ▼
          REGISTERS
             │
             ▼
            CPU
             │
             ▼
      Komutların yürütülmesi
```

Fakat şunu unutma:

> Bu şema kavramsal bir modeldir. Veriler gerçek bir bilgisayarda her zaman tek yönlü ve sırayla bu kutulardan geçmez.

CPU, RAM ve depolama sürekli farklı işlemler için birlikte çalışır.

---

# 21. Çalışma Masası Benzetmesini Geliştirelim

Bu kavramlar genellikle çalışma masası örneğiyle anlatılır.

Bir araştırmacı olduğumuzu düşünelim.

```text
Arşiv Dolabı       Çalışma Masası       Çalışan Kişi
     │                    │                    │
     ▼                    ▼                    ▼
 Depolama                RAM                  CPU
```

Arşiv dolabında çok sayıda belge saklanabilir.

Çalışmak istediğin belgeleri masaya getirirsin.

Sen de masadaki belgeler üzerinde çalışırsın.

Bu benzetme temel farkları anlamamıza yardımcı olur.

Ancak benzetmenin sınırları vardır.

Gerçek bilgisayarlarda:

- Cache bulunur.
- Register bulunur.
- Virtual memory vardır.
- İşletim sistemi kaynakları yönetir.
- Veriler çok daha karmaşık yollarla hareket eder.

Bu nedenle:

> **Benzetmeler öğrenmeyi kolaylaştırır ancak gerçek sistemin kendisi değildir.**

Bu ayrımı eğitim boyunca aklımızda tutacağız.

---

# 22. Hız ve Kapasite Arasındaki İlişki

Bilgisayarın bellek ve depolama sisteminde ilginç bir hiyerarşi vardır.

Basitleştirilmiş olarak:

```text
                    HIZ
                     ▲
                     │
               Registers
                     │
                 L1 Cache
                     │
                 L2 Cache
                     │
                 L3 Cache
                     │
                    RAM
                     │
                    SSD
                     │
                    HDD
                     │
                     ▼
                  KAPASİTE
```

Bu şekil genel bir zihinsel modeldir; belirli donanımlarda ayrıntılar değişebilir.

Genellikle:

- CPU'ya yakın bellek daha hızlı ve daha küçük,
- Uzak katmanlar ise daha büyük fakat daha yavaştır.

Bu tasarımın amacı performans, kapasite ve maliyet arasında denge kurmaktır.

---

# 23. Siber Güvenlikle Bunun Ne İlgisi Var?

Bir güvenlik olayını araştırırken sistemin farklı katmanlarında farklı türde kanıtlarla karşılaşabiliriz.

Örneğin:

```text
               OLAY
                 │
       ┌─────────┴─────────┐
       │                   │
       ▼                   ▼
     BELLEK            DEPOLAMA
       │                   │
       ├─ Process          ├─ Dosyalar
       ├─ Thread           ├─ Loglar
       ├─ Bellek içeriği   ├─ Artefaktlar
       └─ Çalışma durumu   └─ Dosya metadata'sı
```

CPU tarafındaki çalışma mantığını anlamak ise özellikle:

- Reverse Engineering
- Malware Analysis
- Exploit Development
- Vulnerability Research

gibi daha ileri alanlarda önem kazanır.

---

# 24. RAM ve Memory Forensics

Bir sistem çalışırken RAM içerisinde olay araştırması açısından değerli bilgiler bulunabilir.

Örneğin:

- Çalışan process'lere ait bilgiler
- Process bellek bölgeleri
- Yüklenmiş modüller
- Bazı ağ bağlantılarıyla ilişkili sistem yapıları
- Komut veya uygulama verilerinin kalıntıları
- Zararlı kod parçaları
- Bazı kimlik doğrulama materyalleri

bellek analizi sırasında araştırılabilir.

Bu alan:

**Memory Forensics**

olarak adlandırılır.

Önemli nokta:

> RAM oldukça dinamik bir kanıt kaynağıdır.

Sistem çalışmaya devam ettikçe içeriği sürekli değişebilir.

Sistemi kapatmak da uçucu bellekte bulunan önemli verilerin kaybedilmesine neden olabilir.

Bu nedenle gerçek bir olay müdahalesinde:

> "Şüpheli bilgisayarı hemen kapatalım."

kararı her zaman otomatik olarak doğru değildir.

Kanıt toplama yöntemi olayın koşullarına, kurum prosedürlerine ve adli bilişim hedeflerine göre belirlenir.

---

# 25. Depolama ve Digital Forensics

Kalıcı depolama üzerinde çok farklı adli artefaktlar bulunabilir.

Örneğin:

- Dosyalar
- Dosya sistemi metadata'sı
- Log kayıtları
- Tarayıcı geçmişi
- İndirilen dosyalar
- Kullanıcı profilleri
- İşletim sistemi artefaktları
- Uygulama verileri
- Zaman bilgileri

Bir araştırmacı bunları kullanarak:

```text
Ne oldu?
   │
Ne zaman oldu?
   │
Hangi kullanıcıyla ilişkili?
   │
Hangi dosyalar etkilendi?
   │
Olaylar hangi sırayla gerçekleşti?
```

gibi sorulara cevap arayabilir.

Bu süreç ileride:

**Timeline Analysis**

konusunda karşımıza çıkacaktır.

---

# 26. SSD'lerde Silinen Dosyalar Neden İlginçtir?

Burada ileri dersler için küçük ama önemli bir bilgi bırakalım.

Bir kullanıcı:

```text
Dosyayı sildi
```

dediğinde verinin fiziksel olarak depolamadan anında ve tamamen yok olduğu sonucuna her zaman varamayız.

Dosya sisteminin ve depolama teknolojisinin davranışı önemlidir.

HDD'lerde üzerine yeni veri yazılmamış bazı silinmiş verilerin kurtarılması mümkün olabilir.

SSD'lerde ise:

**TRIM**

ve cihazın kendi veri yönetim mekanizmaları silinen verilerin kurtarılmasını etkileyebilir.

Dolayısıyla:

```text
DELETE
```

işleminin adli bilişim açısından anlamı kullanılan sisteme göre değişebilir.

Bu konuyu şu anda ayrıntılı öğrenmen gerekmiyor.

Dosya sistemleri dersinde bu konuya yeniden döneceğiz.

---

# 27. CPU Neden Siber Güvenlik İçin Önemlidir?

Bir programın davranışının en temel seviyesine indiğimizde CPU tarafından yürütülen makine komutlarıyla karşılaşırız.

Örneğin bir zararlı yazılım çalıştırıldığında:

```text
Zararlı Program
      │
      ▼
    Process
      │
      ▼
   Thread'ler
      │
      ▼
Makine Komutları
      │
      ▼
     CPU
```

CPU:

> "Bu komut güvenli mi, zararlı mı?"

şeklinde insan gibi karar vermez.

İşlemci kendisine sunulan geçerli komutları sistemin izin verdiği koşullar kapsamında yürütür.

Bir komutun kötü niyetli olup olmadığını belirleyen şey yalnızca CPU değildir; programın davranışı, işletim sistemi güvenlik mekanizmaları, yetkiler ve bağlam gibi birçok unsur önemlidir.

CPU'nun çalışma mantığını anlamak ileride:

```text
Assembly
   │
   ├── Reverse Engineering
   ├── Malware Analysis
   ├── Exploit Development
   └── Vulnerability Research
```

alanlarına geçerken çok işimize yarayacak.

---

# 28. Bir Güvenlik Analisti Gibi Düşün

Bir bilgisayarda şüpheli bir programın çalıştırıldığından şüpheleniyorsun.

Elinde iki farklı veri kaynağı olduğunu düşün:

```text
A) Depolama imajı

B) Bellek (RAM) imajı
```

İkisi sana tamamen aynı bilgileri verir mi?

Hayır.

Depolama sana:

- Dosyalar
- Dosya sistemi bilgileri
- Kalıcı loglar
- Uygulama verileri

gibi birçok kalıcı artefakt sağlayabilir.

Bellek ise sistemin yakalandığı andaki çalışma durumuna ilişkin bilgiler sağlayabilir.

Bu nedenle dijital adli bilişimde:

> **Her veri kaynağı farklı soruların cevaplanmasına yardımcı olabilir.**

İyi bir analist:

> "Hangi aracı kullanmalıyım?"

sorusundan önce:

> "Hangi soruya cevap arıyorum ve bunun kanıtı nerede bulunabilir?"

sorusunu düşünür.

---

# 🧪 Uygulama — Kendi Sistemini İncele

Şimdi öğrendiğimiz kavramları gerçek sistemimiz üzerinde gözlemleyelim.

Windows kullanıyorsan:

```text
CTRL + SHIFT + ESC
```

ile Görev Yöneticisi'ni aç.

Ardından:

```text
Performans
```

sekmesine gir.

---

## Görev 1 — CPU'nu İncele

CPU bölümünde aşağıdaki bilgileri bulmaya çalış:

| Özellik | Bilgin |
|---|---|
| CPU modeli | |
| Temel hız | |
| Çekirdek sayısı | |
| Mantıksal işlemci sayısı | |
| L1 Cache | |
| L2 Cache | |
| L3 Cache | |

### Düşün

Şu soruyu cevapla:

> Çekirdek sayın ile mantıksal işlemci sayın aynı mı?

```text
Cevabım:

____________________________________________________
```

Eğer farklıysa bunun nedenini şu anda tamamen anlaman gerekmiyor.

İlerleyen derslerde tekrar inceleyeceğiz.

---

## Görev 2 — RAM'ini İncele

Bellek bölümüne gir.

Aşağıdaki bilgileri bul:

| Özellik | Bilgin |
|---|---|
| Toplam RAM | |
| Kullanılan RAM | |
| Kullanılabilir RAM | |
| RAM hızı | |

Şimdi birkaç uygulama aç ve değerlerin nasıl değiştiğini gözlemle.

Örneğin:

```text
Chrome
VS Code
Discord
```

### Düşün

> Uygulamaları açtığında kullanılan RAM neden arttı?

```text
Cevabım:

____________________________________________________

____________________________________________________
```

---

## Görev 3 — Depolamanı İncele

Görev Yöneticisi içerisinde Disk bölümünü bul.

Şunları not et:

| Özellik | Bilgin |
|---|---|
| Depolama modeli | |
| SSD / HDD | |
| Kapasite | |
| Sistem diski mi? | |

Bilgisayarında birden fazla depolama aygıtı varsa hepsini incele.

---

# 🧪 Mini Deney — CPU Kullanımını Gözlemle

Görev Yöneticisi'nde CPU kullanım yüzdesini gözlemle.

Önce bilgisayar boştayken yaklaşık değeri not et:

```text
Boştaki CPU kullanımı:

____________________ %
```

Şimdi birkaç uygulama aç veya normal bir işlem gerçekleştir.

CPU kullanımını tekrar gözlemle:

```text
İşlem sırasında:

____________________ %
```

Değerin sürekli değiştiğini görebilirsin.

Bunun nedeni CPU üzerindeki iş yükünün zaman içerisinde değişmesidir.

> Bu deney bir performans testi değildir. Yalnızca CPU kullanımının dinamik olduğunu gözlemlemek içindir.

---

# 🧪 Mini Deney — RAM Kullanımını Gözlemle

Chrome kapalıyken kullanılan RAM miktarını not et.

```text
Chrome kapalı:

____________________ GB
```

Chrome'u aç ve birkaç sekme oluştur.

Tekrar kontrol et:

```text
Chrome açık:

____________________ GB
```

Chrome'u kapat ve biraz bekle:

```text
Chrome kapatıldıktan sonra:

____________________ GB
```

### Soru

RAM kullanımının neden birebir eski değerine dönmesi gerekmiyor?

Tahminini yaz:

```text
____________________________________________________

____________________________________________________
```

İpucu:

> İşletim sistemi belleği dinamik olarak yönetir ve kullanılabilir belleğin bir bölümünü cache gibi amaçlarla değerlendirebilir.

---

# 🧠 Kendini Test Et

## Soru 1

CPU'nun temel görevi hangisidir?

**A)** Dosyaları kalıcı olarak saklamak  
**B)** Programların makine komutlarını yürütmek  
**C)** Yalnızca internet bağlantısını sağlamak  
**D)** RAM'in yerine geçmek

---

## Soru 2

Aşağıdaki sıralamalardan hangisi genel olarak en hızlıdan daha yavaşa doğru doğrudur?

**A)** HDD → RAM → Cache → Register  
**B)** Register → Cache → RAM → SSD/HDD  
**C)** RAM → Register → HDD → Cache  
**D)** SSD → Register → RAM → Cache

---

## Soru 3

CPU'nun basitleştirilmiş komut yürütme döngüsü hangisidir?

**A)** Delete → Save → Run  
**B)** Fetch → Decode → Execute  
**C)** Input → Format → Delete  
**D)** Read → Shutdown → Write

---

## Soru 4

Register nedir?

**A)** Kalıcı dosya depolama aygıtı  
**B)** CPU içerisindeki çok hızlı ve küçük saklama alanlarından biri  
**C)** HDD'nin başka adı  
**D)** İşletim sistemi türü

---

## Soru 5

Bir CPU'nun saat frekansı başka bir CPU'dan yüksekse hangisini kesin olarak söyleyebiliriz?

**A)** Her durumda daha hızlıdır.  
**B)** Her programı iki kat hızlı çalıştırır.  
**C)** Yalnızca GHz değerinden genel performans hakkında kesin sonuç çıkaramayız.  
**D)** Daha fazla RAM'e sahiptir.

---

## Soru 6

RAM'in temel görevi hangisidir?

**A)** Dosyaları yıllarca saklamak  
**B)** Aktif sistem ve programlar için ana çalışma belleği sağlamak  
**C)** CPU komutlarını kendi başına yürütmek  
**D)** İnternet bağlantısını oluşturmak

---

## Soru 7

RAM üzerindeki baskı arttığında işletim sistemi hangi mekanizmalardan yararlanabilir?

**A)** Virtual memory / paging ile ilişkili mekanizmalardan  
**B)** Monitör çözünürlüğünü düşürmekten  
**C)** CPU'yu SSD'ye dönüştürmekten  
**D)** Klavyenin belleğini kullanmaktan

---

## Soru 8

Aşağıdakilerden hangisi doğrudur?

**A)** Her SSD NVMe'dir.  
**B)** Her M.2 cihaz mutlaka NVMe'dir.  
**C)** SATA SSD'ler de bulunabilir.  
**D)** SSD'lerde mutlaka dönen manyetik plakalar vardır.

---

## Soru 9

Bir sistemde çalışmakta olan şüpheli bir process hakkında o andaki bellek durumunu araştırmak istiyorsun.

Hangi veri kaynağı özellikle önemli olabilir?

**A)** Yalnızca monitör  
**B)** RAM imajı  
**C)** Klavye modeli  
**D)** Masaüstü duvar kâğıdı

---

## Soru 10 — Analist Sorusu

Bir olay müdahale çalışanı şöyle diyor:

> "Şüpheli bilgisayarı hemen kapatalım. Böylece bütün kanıtları daha iyi koruruz."

Bu yaklaşım neden her durumda doğru olmayabilir?

Kendi cümlelerinle açıkla:

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

# 🎯 Ana Görev — Sistemi Açıkla

Şimdi aşağıdaki senaryoyu kendi cümlelerinle açıkla.

Bilgisayarında Chrome kurulu ancak kapalı.

Chrome simgesine tıklıyorsun.

Açıklamanda şu kavramların tamamını kullanmaya çalış:

```text
Depolama
İşletim sistemi
Process
RAM
Cache
CPU
```

Cevabın:

```text
1.

2.

3.

4.

5.

6.
```

Burada önemli olan kelimeleri ezberlemek değil, bileşenlerin ilişkisini doğru açıklayabilmektir.

---

# 🔍 Bonus — Kendi Donanımını Araştır

Görev Yöneticisi'nden CPU modelini bul.

Örneğin:

```text
Intel Core ...
AMD Ryzen ...
```

Arama motorunu kullanarak işlemcinin resmi üretici sayfasını bul.

Aşağıdaki bilgileri araştır:

```text
CPU Modeli:

____________________________________

Core Sayısı:

____________________________________

Thread / Logical Processor:

____________________________________

Maximum Frequency:

____________________________________

L3 Cache:

____________________________________
```

Son olarak şunu cevapla:

> İşlemcinin yalnızca GHz değerine bakmak performansını değerlendirmek için neden yeterli değildir?

```text
____________________________________________________

____________________________________________________
```

---

# 🔐 Siber Güvenlik Bağlantısı

Bu derste öğrendiğin üç alan ileride farklı güvenlik uzmanlıklarında tekrar karşına çıkacak.

```text
CPU
│
├── Assembly
├── Reverse Engineering
├── Malware Analysis
└── Exploit / Vulnerability Research


RAM
│
├── Memory Forensics
├── Incident Response
├── Malware Analysis
└── Live Response


DEPOLAMA
│
├── Disk Forensics
├── File System Analysis
├── Timeline Analysis
├── Incident Response
└── Digital Forensics
```

Şimdilik bu alanlarda uzman olman gerekmiyor.

Amacımız bunların üzerine kurulacağı temeli oluşturmak.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Ezberlemeni istediğimiz şey:

```text
CPU = İşlemci
RAM = Geçici
SSD = Hızlı
```

gibi yüzeysel eşleştirmeler değildir.

Asıl anlaman gereken ilişki:

```text
Program ve veriler
      │
      ▼
   Depolama
      │
      ▼
Bellek Yönetimi
      │
      ▼
      RAM
      │
      ▼
 Cache / Registers
      │
      ▼
      CPU
      │
      ▼
Komutların yürütülmesi
```

ve tüm bu kaynakların işletim sistemi tarafından yönetilen bir sistem içerisinde birlikte çalıştığıdır.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce aşağıdakileri kontrol et:

- [ ] CPU'nun temel görevini açıklayabiliyorum.
- [ ] Makine komutu kavramını temel seviyede biliyorum.
- [ ] Fetch, Decode, Execute modelini açıklayabiliyorum.
- [ ] Register'ın ne olduğunu temel seviyede biliyorum.
- [ ] CPU cache'in neden kullanıldığını anlayabiliyorum.
- [ ] Core ve thread kavramlarının aynı olmadığını biliyorum.
- [ ] GHz değerinin tek başına performansı göstermediğini biliyorum.
- [ ] RAM'in temel görevini açıklayabiliyorum.
- [ ] RAM'in neden uçucu bellek olarak adlandırıldığını biliyorum.
- [ ] RAM yetersizliğinde sanal bellek mekanizmalarının devreye girebileceğini biliyorum.
- [ ] HDD'nin temel çalışma mantığını biliyorum.
- [ ] SSD'nin temel çalışma mantığını biliyorum.
- [ ] SATA ve NVMe'nin aynı kavram olmadığını biliyorum.
- [ ] CPU, RAM ve depolama arasındaki ilişkiyi açıklayabiliyorum.
- [ ] Kendi CPU özelliklerimi inceledim.
- [ ] Kendi RAM kullanımımı gözlemledim.
- [ ] Kendi depolama aygıtımı inceledim.
- [ ] RAM'in memory forensics açısından neden önemli olduğunu açıklayabiliyorum.
- [ ] Depolamanın digital forensics açısından neden önemli olduğunu açıklayabiliyorum.
- [ ] Quiz sorularını tamamladım.

---

# 🧩 Dersin Özeti

Bu dersin sonunda bilgisayarı artık yalnızca:

```text
CPU + RAM + Disk
```

olarak görmemelisin.

Daha doğru zihinsel modelimiz:

```text
                       PROGRAM
                          │
                          ▼
                 İŞLETİM SİSTEMİ
                          │
                          ▼
                       PROCESS
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
            RAM                    DEPOLAMA
             │                         │
             ▼                         │
           CACHE                       │
             │                         │
             ▼                         │
         REGISTERS                     │
             │                         │
             ▼                         │
            CPU ◄──────────────────────┘
             │
             ▼
      KOMUTLARIN YÜRÜTÜLMESİ
```

Gerçek bilgisayar bundan çok daha karmaşıktır.

Ancak artık bu karmaşıklığı öğrenmeye başlayabileceğimiz sağlam bir temelimiz var.

---

# 🚀 Sonraki Ders

## Ders 03 — İşletim Sistemi: Bilgisayarı Kim Yönetiyor?

Bir sonraki derste CPU, RAM ve depolama gibi kaynakların nasıl yönetildiğini inceleyeceğiz.

Şu soruların cevaplarını arayacağız:

- İşletim sistemi tam olarak nedir?
- Kernel nedir?
- User Mode ve Kernel Mode nedir?
- Bir uygulama donanıma nasıl erişir?
- System call nedir?
- Driver nedir?
- İşletim sistemi process'leri nasıl yönetir?
- Kullanıcı ve yetki kavramları neden önemlidir?

Ve bunları şu soruyla siber güvenliğe bağlayacağız:

> **Bir saldırgan işletim sisteminin kontrol mekanizmalarını aşabilirse ne olur?**