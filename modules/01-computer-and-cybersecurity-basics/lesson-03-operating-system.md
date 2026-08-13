# Ders 03 — İşletim Sistemi: Bilgisayarı Kim Yönetiyor?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01 ve Ders 02

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- İşletim sisteminin ne olduğunu açıklayabileceksin.
- İşletim sisteminin neden gerekli olduğunu anlayabileceksin.
- İşletim sisteminin CPU, RAM, depolama ve diğer kaynakları nasıl yönettiğini temel seviyede anlayabileceksin.
- Kernel kavramını açıklayabileceksin.
- User mode ve kernel mode ayrımının neden gerekli olduğunu anlayabileceksin.
- User space ve kernel space kavramlarını temel seviyede tanıyabileceksin.
- System call kavramının ne işe yaradığını anlayabileceksin.
- Driver'ların işletim sistemindeki rolünü açıklayabileceksin.
- Kullanıcı, yetki ve Least Privilege kavramlarını anlayabileceksin.
- Windows, Linux, macOS, Android ve iOS ekosistemlerini temel seviyede tanıyabileceksin.
- İşletim sistemi bilgisinin siber güvenlik açısından neden kritik olduğunu açıklayabileceksin.

> Bu derste kernel, system call ve privilege gibi bazı önemli kavramlarla ilk kez karşılaşacağız. Bunların bütün teknik ayrıntılarını şu anda ezberlemen gerekmiyor. Amacımız işletim sisteminin bilgisayardaki rolünü doğru bir zihinsel modelle anlamaktır.

---

# 1. Önceki Derslerden Hatırlayalım

Ders 01'de bir programın çalıştırıldığında process hâline geldiğini gördük.

Ders 02'de ise:

```text
CPU
RAM
Depolama
Cache
Register
```

gibi temel donanım ve bellek bileşenlerini inceledik.

Şimdi önemli bir soru ortaya çıkıyor:

> Bilgisayarda onlarca program aynı anda çalışırken bütün bu kaynakları kim yönetiyor?

Örneğin aynı anda:

```text
Chrome
VS Code
Discord
Spotify
Antivirüs
Terminal
```

çalışabilir.

Hepsi:

- CPU zamanı,
- RAM,
- dosyalar,
- ağ bağlantıları,
- giriş/çıkış aygıtları

gibi kaynaklardan yararlanmak ister.

İşte burada işletim sistemi devreye girer.

---

# 2. İşletim Sistemi Nedir?

İşletim sistemi (**Operating System — OS**), bilgisayarın donanım kaynaklarını yöneten ve uygulamalara sistem hizmetleri sağlayan temel yazılım sistemidir.

Başlangıç seviyesinde:

```text
              KULLANICI
                  │
                  ▼
             UYGULAMALAR
                  │
                  ▼
          İŞLETİM SİSTEMİ
                  │
                  ▼
               DONANIM
       ┌──────────┼──────────┐
       ▼          ▼          ▼
      CPU        RAM      DEPOLAMA
```

şeklinde düşünebiliriz.

Ancak bu oldukça basitleştirilmiş bir modeldir.

İşletim sistemi yalnızca:

> "Uygulama ile donanım arasındaki köprü"

değildir.

Aynı zamanda:

- Kaynakları yönetir.
- Process'leri yönetir.
- Belleği yönetir.
- Dosya sistemlerini yönetir.
- Kullanıcı ve yetkileri yönetir.
- Donanım erişimini kontrol eder.
- Ağ işlevlerini sağlar.
- Güvenlik mekanizmaları uygular.

Bu nedenle daha doğru bir tanım:

> **İşletim sistemi, bilgisayarın kaynaklarını yöneten ve programların kontrollü bir ortamda çalışmasını sağlayan yazılım sistemidir.**

---

# 3. İşletim Sistemi Neden Gereklidir?

İşletim sistemi olmayan basitleştirilmiş bir bilgisayar düşün.

Her uygulamanın:

- CPU'yu,
- belleği,
- diski,
- ekran kartını,
- klavyeyi,
- ağ kartını,
- USB cihazlarını

kendi başına yönetmesi gerekirdi.

Daha da önemlisi, uygulamalar aynı kaynakları kullanmak istediğinde ciddi sorunlar ortaya çıkabilirdi.

Örneğin:

```text
Chrome ─────┐
            │
VS Code ────┼────► CPU
            │
Spotify ────┘
```

CPU'yu hangisi kullanacak?

Ya da:

```text
Program A ──┐
            ├────► RAM
Program B ──┘
```

bir program diğerinin belleğine istediği gibi erişebilecek mi?

İşletim sistemi bu tür kaynakları yönetir ve erişimi kontrol eder.

Bu nedenle işletim sistemlerinin iki önemli görevi olduğunu düşünebiliriz:

```text
İŞLETİM SİSTEMİ
│
├── Kaynak Yönetimi
│
│   ├── CPU
│   ├── RAM
│   ├── Depolama
│   └── Donanımlar
│
└── Kontrollü Erişim
    ├── Kullanıcılar
    ├── Process'ler
    ├── Dosyalar
    └── Sistem Kaynakları
```

İkinci bölüm siber güvenlik açısından özellikle önemlidir.

---

# 4. İşletim Sistemi Tek Bir Program Mıdır?

İşletim sistemini tek bir programdan ibaret düşünmek doğru değildir.

Modern bir işletim sistemi birçok bileşenden oluşur.

Örneğin:

```text
İŞLETİM SİSTEMİ
│
├── Kernel
├── Sistem servisleri
├── Driver'lar
├── Sistem kütüphaneleri
├── Yönetim araçları
├── Kullanıcı ve güvenlik bileşenleri
└── Diğer sistem bileşenleri
```

Bu yapı işletim sistemine göre değişebilir.

Dersin ilerleyen kısmında bunlardan en önemlisi olan kernel'i inceleyeceğiz.

---

# 5. İşletim Sisteminin Temel Görevleri

Modern işletim sistemlerinin çok sayıda görevi vardır.

Bu eğitim için özellikle şunları bilmemiz gerekiyor:

```text
İŞLETİM SİSTEMİ
│
├── Process ve CPU Yönetimi
├── Bellek Yönetimi
├── Dosya Sistemi Yönetimi
├── Kullanıcı ve Yetki Yönetimi
├── Donanım ve Driver Yönetimi
├── Giriş / Çıkış Yönetimi
├── Ağ İşlevleri
└── Güvenlik ve Erişim Kontrolü
```

Şimdi bunları tek tek inceleyelim.

---

# 6. Process ve CPU Yönetimi

Ders 01'de:

> Bir program çalıştırıldığında işletim sistemi tarafından bir process olarak yönetilebilir.

demiştik.

Bilgisayarda aynı anda çok sayıda process bulunabilir.

Örneğin:

```text
Chrome
VS Code
Antivirüs
Sistem servisleri
Terminal
```

CPU ise sınırlı sayıda çekirdeğe sahiptir.

İşletim sistemi hangi yürütme akışlarının CPU üzerinde ne zaman çalışacağını planlamak için **scheduler (zamanlayıcı)** mekanizmalarından yararlanır.

Basitleştirilmiş model:

```text
Process / Thread'ler
        │
        ▼
     Scheduler
        │
        ▼
       CPU
```

Bu işlemler çok hızlı gerçekleştiği için kullanıcı birçok programın aynı anda çalıştığını görür.

Çok çekirdekli sistemlerde bazı işler gerçekten paralel olarak da yürütülebilir.

> **İşletim sistemi CPU zamanının çalışan işler arasında yönetilmesinde kritik rol oynar.**

Process ve thread kavramlarını Ders 05'te ayrıntılı inceleyeceğiz.

---

# 7. Bellek Yönetimi

Bilgisayarda çalışan process'ler belleğe ihtiyaç duyar.

Örneğin:

```text
Chrome ───────────► RAM

VS Code ──────────► RAM

Sistem Servisleri ─► RAM
```

Ancak işletim sisteminin görevi yalnızca:

> "Programlara RAM vermek"

değildir.

Modern işletim sistemleri:

- Bellek tahsis eder.
- Bellek kullanımını takip eder.
- Process'lerin adres alanlarını yönetir.
- Sanal bellek mekanizmalarını yönetir.
- Process'ler arasında bellek izolasyonu sağlamaya yardımcı olur.
- Gerektiğinde bellek sayfalarını yönetir.

Ders 02'de gördüğümüz:

```text
Virtual Memory
Paging
Pagefile
Swap
```

kavramları burada devreye girer.

---

## Neden Bellek İzolasyonu Önemlidir?

Şu senaryoyu düşün:

```text
Program A
   │
   └──► Program B'nin belleğine istediği gibi erişiyor
```

Eğer her program diğer programların belleğine sınırsız biçimde erişebilseydi güvenlik ve kararlılık ciddi şekilde zarar görürdü.

Modern işletim sistemleri process'ler arasında belirli izolasyon mekanizmaları sağlar.

Basitleştirilmiş olarak:

```text
Process A
└── Kendi sanal adres alanı

Process B
└── Kendi sanal adres alanı
```

Bu izolasyon mutlak değildir; işletim sisteminin izin verdiği mekanizmalar, paylaşımlı bellek ve gerekli yetkilere sahip işlemler gibi istisnalar vardır.

Ancak temel güvenlik fikri şudur:

> **Bir process'in başka bir process'in kaynaklarına erişimi kontrol altında tutulmalıdır.**

---

# 8. Dosya Sistemi Yönetimi

İşletim sistemi dosyalar üzerinde işlem yapmamızı sağlar.

Örneğin:

- Dosya oluşturmak
- Dosya açmak
- Dosya okumak
- Dosyaya yazmak
- Dosyayı taşımak
- Dosyayı silmek
- Klasör oluşturmak
- Dosya izinlerini kontrol etmek

gibi işlemler işletim sistemi mekanizmaları üzerinden gerçekleştirilir.

Basitleştirilmiş model:

```text
Uygulama
   │
   ▼
İşletim Sistemi
   │
   ▼
Dosya Sistemi
   │
   ▼
Depolama
```

Örneğin bir metin editöründe:

```text
notlar.txt
```

dosyasını açtığında uygulama fiziksel SSD üzerindeki NAND hücrelerini doğrudan yönetmez.

İşletim sistemi ve dosya sistemi gerekli soyutlamayı sağlar.

Dosya sistemlerini Ders 04'te ayrıntılı inceleyeceğiz.

---

# 9. Kullanıcı Yönetimi

İşletim sistemleri kullanıcı hesaplarını yönetebilir.

Örneğin bir sistemde:

```text
Ahmet
Administrator
Guest
Service Account
```

gibi farklı hesap türleri bulunabilir.

Ancak tüm kullanıcıların aynı yetkilere sahip olması gerekmez.

Bir kullanıcı:

```text
Belge okuyabilir
Belge oluşturabilir
Uygulama çalıştırabilir
```

iken başka bir hesap daha yüksek ayrıcalıklara sahip olabilir.

Örneğin:

```text
Sistem yapılandırmasını değiştirmek
Bazı yazılımları yüklemek
Belirli sistem kaynaklarını yönetmek
```

gibi işlemleri gerçekleştirebilir.

Bu bizi siber güvenliğin temel kavramlarından birine getirir.

---

# 10. Least Privilege — En Az Yetki İlkesi

**Principle of Least Privilege**

veya:

**En Az Yetki İlkesi**

bir kullanıcıya, programa veya sisteme görevini gerçekleştirmek için ihtiyaç duyduğu minimum yetkinin verilmesini savunan güvenlik prensibidir.

Örneğin yalnızca belge görüntülemesi gereken bir kullanıcıya:

```text
Administrator
```

yetkisi vermek gereksiz risk oluşturabilir.

Basit model:

```text
GEREKEN YETKİ
      │
      ▼
    VERİLİR

GEREKMEYEN YETKİ
      │
      ▼
   VERİLMEZ
```

Neden?

Çünkü bir hesap ele geçirilirse saldırgan genellikle o hesabın sahip olduğu yetkilerden yararlanmaya çalışabilir.

Hesabın gereksiz yüksek yetkilere sahip olması olayın etkisini artırabilir.

> **Bir hesabın yapabileceği şeyler, hesabı ele geçiren bir saldırganın da potansiyel olarak yapabileceği şeyleri etkiler.**

---

# 11. Authentication ve Authorization Aynı Şey Mi?

Hayır.

Siber güvenlikte sık karşılaşacağımız iki kavram vardır:

**Authentication — Kimlik Doğrulama**

> "Sen kimsin?"

sorusuyla ilgilidir.

**Authorization — Yetkilendirme**

> "Neyi yapmaya iznin var?"

sorusuyla ilgilidir.

Örneğin:

```text
Kullanıcı giriş yaptı
        │
        ▼
Authentication
        │
        ▼
Kimliği doğrulandı
        │
        ▼
Authorization
        │
        ▼
Hangi kaynaklara erişebilir?
```

Bir sisteme giriş yapabilmek, sistemde her işlemi yapmaya yetkili olmak anlamına gelmez.

Bu ayrım ileride:

- Active Directory
- Web Security
- IAM
- Cloud Security
- Privilege Escalation

konularında sürekli karşımıza çıkacaktır.

---

# 12. Donanım Yönetimi

İşletim sisteminin önemli görevlerinden biri donanım aygıtlarıyla kontrollü iletişim sağlamaktır.

Örneğin:

- Ekran kartı
- Ağ kartı
- Depolama aygıtı
- USB aygıtları
- Ses kartı
- Klavye
- Mouse

farklı donanım özelliklerine sahiptir.

Uygulamaların bütün donanım ayrıntılarını kendilerinin bilmesi pratik değildir.

Burada işletim sistemi ve **device driver**'lar önemli rol oynar.

---

# 13. Driver Nedir?

**Driver (aygıt sürücüsü)**, işletim sisteminin belirli donanım veya aygıt sınıflarıyla çalışabilmesini sağlayan yazılım bileşenidir.

Basitleştirilmiş model:

```text
Uygulama
   │
   ▼
İşletim Sistemi / API
   │
   ▼
Kernel
   │
   ▼
Device Driver
   │
   ▼
Donanım
```

Gerçek yapı işletim sistemine ve sürücü modeline göre farklı olabilir.

Örneğin bir uygulama ekrana grafik çizmek istediğinde fiziksel ekran kartının bütün düşük seviyeli ayrıntılarını kendisi yönetmez.

İşletim sistemi, grafik altyapısı ve sürücüler bu süreçte görev alabilir.

---

## Driver'lar Neden Güvenlik Açısından Önemlidir?

Bazı driver'lar yüksek ayrıcalıklı kernel bağlamında çalışabilir.

Bu nedenle bir driver'daki güvenlik açığı ciddi sonuçlara yol açabilir.

Örneğin saldırgan bazı durumlarda:

```text
Driver açığı
      │
      ▼
Yetkisiz düşük seviyeli erişim
      │
      ▼
Privilege Escalation
```

gibi bir saldırı zinciri oluşturmaya çalışabilir.

Bu nedenle işletim sistemi ve sürücü güncellemeleri yalnızca:

> "Yeni özellik"

için değil, güvenlik açıklarını gidermek için de önemlidir.

---

# 14. Kernel Nedir?

Şimdi işletim sisteminin en önemli bileşenlerinden birine geldik:

**Kernel — Çekirdek**

Kernel, işletim sisteminin ayrıcalıklı temel bileşenidir ve sistem kaynaklarının yönetiminde kritik rol oynar.

Örneğin:

- CPU zamanlaması
- Bellek yönetimi
- Process/thread yönetimi
- Donanım ve aygıt erişimi
- Sistem çağrılarının işlenmesi
- Ağ altyapısının önemli bölümleri

kernel ile ilişkilidir.

Basitleştirilmiş model:

```text
            UYGULAMALAR
                 │
                 ▼
        SİSTEM KÜTÜPHANELERİ
                 │
                 ▼
           SYSTEM CALL
                 │
                 ▼
              KERNEL
           ┌─────┼─────┐
           ▼     ▼     ▼
          CPU   RAM  DONANIM
```

Kernel ile işletim sistemi aynı şey değildir.

```text
İŞLETİM SİSTEMİ
│
├── Kernel
├── Sistem servisleri
├── Kütüphaneler
├── Yönetim araçları
├── Driver'lar
└── Diğer bileşenler
```

> **Kernel işletim sisteminin merkezindeki kritik bileşendir; işletim sistemi ise daha geniş bir yazılım sistemidir.**

---

# 15. Uygulamalar Her Şeyi Yapabilir Mi?

Hayır.

Bir web tarayıcısının:

> "Ben artık bütün fiziksel belleği okuyacağım."

veya:

> "CPU'nun bütün kontrolünü alacağım."

diyebilmesi güvenli olmazdı.

Modern işlemciler ve işletim sistemleri farklı ayrıcalık seviyelerinden yararlanır.

Başlangıç seviyesinde iki temel çalışma modu bilmemiz yeterlidir:

```text
USER MODE
    │
    │ Sınırlı ayrıcalık
    ▼
Uygulamalar

-----------------------

KERNEL MODE
    │
    │ Yüksek ayrıcalık
    ▼
Kernel / uygun sistem bileşenleri
```

---

# 16. User Mode ve Kernel Mode

**User mode**, normal uygulamaların sınırlı ayrıcalıklarla çalıştığı işlemci çalışma bağlamıdır.

Örneğin çoğu:

- Web tarayıcısı
- Metin editörü
- Medya oynatıcısı
- Kullanıcı uygulaması

kodunun büyük bölümü user mode'da çalışır.

**Kernel mode** ise kernel'in ve ilgili ayrıcalıklı kodların çok daha geniş sistem erişimine sahip olduğu çalışma modudur.

Bu ayrım hem güvenlik hem kararlılık açısından önemlidir.

Örneğin bir kullanıcı uygulaması çökerse genellikle:

```text
Uygulama çöktü
      │
      ▼
Uygulama kapanabilir
```

Kernel seviyesindeki ciddi bir hata ise bütün sistemi etkileyebilir.

---

# 17. User Space ve Kernel Space

Burada birbirine benzeyen fakat birebir aynı olmayan kavramlarla karşılaşıyoruz:

```text
User Mode
Kernel Mode

User Space
Kernel Space
```

Bunları aynı şeymiş gibi kullanmamak önemlidir.

**Mode** kavramı CPU'nun ayrıcalık seviyeleriyle ilgilidir.

**Space** kavramı ise genellikle sanal adres alanının kullanıcı ve kernel bölgeleri gibi bellek bağlamlarıyla ilişkilidir.

Başlangıç seviyesinde:

```text
USER SPACE
│
└── Kullanıcı programlarının bellek alanları

KERNEL SPACE
│
└── Kernel'in ayrıcalıklı adres alanı
```

şeklinde düşünebilirsin.

> Şimdilik user mode/user space ve kernel mode/kernel space arasındaki ayrıntılı mimari farkları ezberlemen gerekmiyor. Önemli olan uygulamalar ile kernel arasında güvenlik ve ayrıcalık sınırı bulunduğunu anlamaktır.

---

# 18. System Call Nedir?

Şimdi önemli bir soru ortaya çıkıyor.

Normal bir uygulama user mode'da çalışıyorsa ve doğrudan her sistem kaynağına erişemiyorsa:

> Bir dosyayı nasıl açıyor?

> Ağ üzerinden nasıl veri gönderiyor?

> Yeni bir process nasıl oluşturuyor?

Burada **system call (sistem çağrısı)** mekanizması devreye girer.

System call, bir programın kernel tarafından sağlanan hizmetleri kontrollü şekilde istemesine olanak veren arayüz/mekanizmadır.

Basitleştirilmiş örnek:

```text
Uygulama
   │
   │ "Bu dosyayı açmak istiyorum."
   ▼
System Call
   │
   ▼
Kernel
   │
   ▼
Dosya Sistemi / Driver / Depolama
```

Başka bir örnek:

```text
Chrome
   │
   │ Ağ iletişimi istiyor
   ▼
İşletim Sistemi API'leri
   │
   ▼
System Call Mekanizması
   │
   ▼
Kernel Network Stack
   │
   ▼
Network Driver
   │
   ▼
Ağ Kartı
```

Gerçek uygulamalar genellikle doğrudan ham system call kullanmak yerine işletim sistemi API'leri ve kütüphaneler üzerinden çalışır.

Önemli olan temel fikir:

> **User mode uygulamaları ayrıcalıklı işletim sistemi hizmetlerini kontrollü arayüzler üzerinden talep eder.**

---

# 19. Neden Bu Ayrıcalık Sınırı Var?

User mode ile kernel mode arasındaki ayrım olmasaydı kötü veya hatalı bir uygulama:

- Başka process'lerin belleğini değiştirebilir,
- Kernel belleğine erişebilir,
- Donanımı doğrudan kontrol edebilir,
- İşletim sisteminin kritik yapılarını değiştirebilir

ve sistemi kolayca bozabilirdi.

Bu nedenle:

```text
Uygulama
   │
   ▼
Kontrollü Arayüz
   │
   ▼
Kernel
   │
   ▼
Kaynak
```

modeli güvenliğin temel yapı taşlarından biridir.

Ancak hiçbir sistem kusursuz değildir.

Bir güvenlik açığı bu sınırların aşılmasına neden olabiliyorsa ciddi güvenlik sorunları ortaya çıkabilir.

---

# 20. Privilege Escalation Nedir?

**Privilege Escalation — Yetki Yükseltme**

bir kullanıcının veya process'in sahip olduğundan daha yüksek ayrıcalıklar elde etmesi durumunu ifade eder.

Örneğin:

```text
Standart Kullanıcı
       │
       │ Güvenlik açığı / yanlış yapılandırma
       ▼
Yüksek Yetkili Kullanıcı
```

veya belirli saldırı senaryolarında:

```text
User Mode
   │
   │ Kernel açığı
   ▼
Kernel düzeyinde yetkisiz yetenekler
```

gibi sonuçlar hedeflenebilir.

Privilege escalation her zaman kernel açığı anlamına gelmez.

Şunlardan da kaynaklanabilir:

- Yanlış dosya izinleri
- Hatalı servis yapılandırmaları
- Zayıf kullanıcı yetkileri
- Credential sorunları
- Güvenlik açıkları

Bu konuyu ileride ayrı bir güvenlik konusu olarak inceleyeceğiz.

---

# 21. Ağ Yönetimi

İşletim sistemi ağ iletişiminde de kritik rol oynar.

Bir uygulama internete bağlanmak istediğinde pek çok katman devreye girer.

Basitleştirilmiş olarak:

```text
Uygulama
   │
   ▼
Socket / Ağ API'leri
   │
   ▼
İşletim Sistemi
   │
   ▼
TCP/IP Network Stack
   │
   ▼
Network Driver
   │
   ▼
Ağ Kartı
   │
   ▼
Ağ
```

Örneğin Chrome:

```text
https://example.com
```

adresine bağlanmak istediğinde ağ kartını doğrudan yönetmez.

İşletim sisteminin ağ mekanizmalarından yararlanır.

İlerleyen derslerde:

- IP
- TCP
- UDP
- DNS
- Port
- Socket

gibi kavramları ayrıntılı inceleyeceğiz.

---

# 22. İşletim Sistemi Güvenlik Mekanizmaları

Modern işletim sistemleri birçok güvenlik mekanizması içerir.

Örneğin işletim sistemine göre:

```text
Kullanıcı hesapları
Yetkilendirme
Dosya izinleri
Process izolasyonu
Bellek korumaları
Firewall
Kod imzalama
Güvenlik logları
Disk şifreleme
Antimalware entegrasyonu
Sandbox mekanizmaları
```

gibi özelliklerle karşılaşabiliriz.

Bunların hiçbiri tek başına:

> "Sistem artık tamamen güvenlidir."

anlamına gelmez.

Güvenlik genellikle birden fazla katmanın birlikte çalışmasıyla sağlanır.

Bu yaklaşıma ileride:

**Defense in Depth — Derinlemesine Savunma**

bağlamında tekrar döneceğiz.

---

# 23. Windows Nedir?

Windows, Microsoft tarafından geliştirilen bir işletim sistemi ailesidir.

Windows sistemleri:

- Kişisel bilgisayarlarda,
- Kurumsal istemcilerde,
- Sunucularda,
- Active Directory ortamlarında

yaygın olarak kullanılabilir.

Siber güvenlik açısından Windows önemlidir çünkü ilerleyen derslerde şu yapılarla karşılaşacağız:

```text
Windows
│
├── NTFS
├── Registry
├── Event Logs
├── Services
├── PowerShell
├── Windows Defender
├── Active Directory
└── Windows Security Model
```

Özellikle Blue Team ve DFIR çalışmalarında Windows artefaktları büyük önem taşır.

---

# 24. Linux Nedir?

Burada önemli bir terminoloji ayrımı yapalım.

**Linux**, teknik olarak bir **kernel**'dır.

Günlük kullanımda ise Ubuntu, Debian veya Kali gibi Linux kernelini kullanan işletim sistemleri için:

> "Linux sistemi"

ifadesi yaygın biçimde kullanılır.

Daha doğru model:

```text
Linux Kernel
     │
     ▼
GNU / Sistem Araçları + Kütüphaneler
     │
     ▼
Paketler / Masaüstü / Servisler
     │
     ▼
Linux Dağıtımı
```

Örneğin:

- Ubuntu
- Debian
- Fedora
- Arch Linux
- Kali Linux

birer Linux dağıtımıdır.

> Bütün dağıtımlar birebir aynı bileşenleri kullanmak zorunda değildir; yukarıdaki şema kavramsal bir örnektir.

Linux tabanlı sistemler:

- Sunucularda
- Cloud altyapılarında
- Container ortamlarında
- Network sistemlerinde
- Gömülü sistemlerde
- Siber güvenlik laboratuvarlarında

yaygın biçimde karşımıza çıkar.

---

# 25. Kali Linux Neden Ayrı Bir İşletim Sistemi Gibi Görünüyor?

Kali Linux bir Linux dağıtımıdır.

Özellikle:

- Penetration testing
- Security assessment
- Digital forensics ile ilişkili bazı çalışmalar
- Güvenlik araştırmaları

için çok sayıda araçla birlikte gelir.

Ancak önemli bir nokta:

> **Kali Linux öğrenmek ile Linux öğrenmek aynı şey değildir.**

Siber güvenlik öğrencisinin yalnızca:

```bash
nmap
sqlmap
metasploit
```

gibi araçları çalıştırmayı öğrenmesi yeterli değildir.

Önce:

- Dosya sistemi
- Kullanıcılar
- Yetkiler
- Process'ler
- Servisler
- Paket yönetimi
- Ağ yapılandırması
- Shell

gibi Linux temellerini anlaması gerekir.

Bu platformda yaklaşımımız da bu olacak.

---

# 26. macOS

macOS, Apple tarafından Mac bilgisayarları için geliştirilen Unix tabanlı bir işletim sistemidir.

Linux ile bazı ortak Unix kavramlarını paylaşabilir.

Örneğin:

- Shell kullanımı
- Dosya izinleri
- Process kavramları
- Unix tarzı sistem araçları

gibi alanlarda benzerlikler görülebilir.

Ancak:

```text
macOS ≠ Linux
```

İki sistemin:

- Kernel'ları
- Güvenlik modelleri
- Sistem bileşenleri
- Yönetim araçları

önemli ölçüde farklıdır.

---

# 27. Android ve iOS

İşletim sistemleri yalnızca masaüstü ve sunucularda bulunmaz.

Mobil cihazlarda da karmaşık işletim sistemleri kullanılır.

## Android

Android, Linux kernelini temel alan bir mobil işletim sistemi platformudur.

Üzerinde:

- Android framework
- Uygulama çalışma ortamları
- Güvenlik mekanizmaları
- Uygulama sandbox'ları

gibi ek katmanlar bulunur.

## iOS

iOS, Apple tarafından iPhone cihazları için geliştirilen mobil işletim sistemidir.

Mobil sistemler:

- Application sandboxing
- Permission modelleri
- Secure boot
- Code signing
- Mobile forensics

gibi birçok ayrı güvenlik konusuna sahiptir.

Bunları ilerleyen uzmanlık modüllerinde inceleyebiliriz.

---

# 28. İşletim Sistemi ve Güncellemeler

İşletim sistemi güncellemeleri yalnızca yeni özellikler eklemek için yayımlanmaz.

Güncellemeler:

- Güvenlik açıklarını kapatabilir.
- Hataları düzeltebilir.
- Sistem kararlılığını geliştirebilir.
- Driver veya bileşen güncellemeleri sağlayabilir.

Örneğin bir işletim sistemi bileşeninde güvenlik açığı bulunduğunu düşün:

```text
Güvenlik Açığı
      │
      ▼
Vendor düzeltme geliştirir
      │
      ▼
Security Update / Patch
      │
      ▼
Sistem güncellenir
```

Bir güvenlik yaması yayımlandığı hâlde uygulanmazsa sistem bilinen bir güvenlik açığına karşı savunmasız kalabilir.

Bu nedenle:

**Patch Management**

kurumsal güvenliğin önemli parçalarından biridir.

---

# 29. İşletim Sistemi ve Loglar

İşletim sistemleri gerçekleşen birçok olaya ilişkin kayıt oluşturabilir.

Bunlara genel olarak:

**Log**

denir.

Örneğin sistem yapılandırmasına göre:

```text
Kullanıcı oturum açtı
Process başladı
Servis başlatıldı
Güvenlik olayı gerçekleşti
Sistem hatası oluştu
```

gibi olaylarla ilgili kayıtlar bulunabilir.

Windows'ta ileride:

```text
Windows Event Logs
```

Linux sistemlerde ise örneğin:

```text
systemd journal
/var/log/
```

gibi kaynaklarla karşılaşacağız.

> Her olayın mutlaka loglandığını veya logların her zaman eksiksiz olduğunu varsaymamalıyız.

Bu, DFIR açısından çok önemli bir ilkedir.

---

# 30. İşletim Sistemi Neden Siber Güvenliğin Merkezindedir?

Bir endpoint üzerindeki birçok güvenlik olayı işletim sistemiyle doğrudan ilişkilidir.

Bir analist şunları araştırabilir:

```text
Hangi kullanıcı giriş yaptı?

Hangi process çalıştı?

Process'i kim başlattı?

Hangi dosya oluşturuldu?

Hangi servis çalışıyor?

Hangi ağ bağlantısı açıldı?

Hangi hesap hangi yetkilere sahip?

Hangi log kayıtları oluştu?
```

Bu soruların büyük bölümü işletim sistemi seviyesinde kanıtlarla ilişkilidir.

---

# 31. Farklı Siber Güvenlik Rollerinde İşletim Sistemi

İşletim sistemi bilgisi birçok güvenlik alanının temelidir.

```text
                    İŞLETİM SİSTEMİ
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    BLUE TEAM            DFIR          MALWARE ANALYSIS
        │                 │                 │
   Process'ler        Artefaktlar        Process
   Loglar             File System        Memory
   Kullanıcılar       Memory             API
   Servisler          Timeline           System Calls

                          │
                          ▼
                       RED TEAM
                          │
                     Yetkiler
                     Servisler
                     Misconfiguration
                     Privilege Escalation
```

Aynı temel bilgiler farklı uzmanlıklarda farklı amaçlarla kullanılır.

---

# 32. Bir Güvenlik Analisti Gibi Düşün

Bir çalışan:

> "Bilgisayarımda kısa süreliğine siyah bir pencere açılıp kapandı."

diyerek güvenlik ekibine bildirim yaptı.

Bu tek başına kötü amaçlı aktivite kanıtı değildir.

Bir analist aşağıdaki soruları sorabilir:

```text
Hangi kullanıcı oturumdaydı?
        │
        ▼
Hangi process başlatıldı?
        │
        ▼
Parent process neydi?
        │
        ▼
Hangi dosya çalıştırıldı?
        │
        ▼
Hangi yetkilerle çalıştı?
        │
        ▼
Dosya veya Registry değişikliği yaptı mı?
        │
        ▼
Ağ bağlantısı oluşturdu mu?
        │
        ▼
İlgili loglar var mı?
```

Bu soruları sorabilmek için işletim sisteminin:

- Process
- Kullanıcı
- Dosya
- Yetki
- Ağ
- Log

kavramlarını anlamamız gerekir.

> **İyi analiz, gözlemi doğrudan sonuca dönüştürmek yerine kanıt toplamaya dayanır.**

---

# 🧪 Uygulama 03 — Kendi İşletim Sistemini Tanı

Bu uygulamada yalnızca kendi sistemimiz hakkında bilgi toplayacağız.

Herhangi bir sistem dosyasını değiştirme veya silme.

---

## Görev 1 — İşletim Sistemini Bul

### Windows

`WIN + R` tuşlarına bas.

Şunu yaz:

```text
winver
```

Enter'a bas.

İşletim sistemi sürümünü incele.

Alternatif olarak:

```text
Ayarlar → Sistem → Hakkında
```

bölümünü kullanabilirsin.

### Linux

Terminalde:

```bash
cat /etc/os-release
```

komutunu kullanabilirsin.

Kernel bilgisini görmek için:

```bash
uname -r
```

kullanabilirsin.

### macOS

Terminalde:

```bash
sw_vers
```

komutunu kullanabilirsin.

Bilgilerini yaz:

| Bilgi | Değer |
|---|---|
| İşletim sistemi | |
| Sürüm | |
| Kernel / Build bilgisi | |

---

## Görev 2 — Kullanıcı Kimliğini Bul

### Windows

PowerShell veya Command Prompt:

```powershell
whoami
```

### Linux / macOS

```bash
whoami
```

Çıktıyı not et:

```text
Kullanıcım:

____________________________________
```

---

## Görev 3 — Process'leri İncele

### Windows

Görev Yöneticisi'ni aç:

```text
CTRL + SHIFT + ESC
```

`Ayrıntılar` veya `İşlemler` bölümünü incele.

### Linux

```bash
ps aux
```

kullanabilirsin.

### macOS

Activity Monitor kullanabilir veya:

```bash
ps aux
```

komutunu inceleyebilirsin.

En az üç process seç:

| Process | Kullanıcı | Gözlemin |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Görev 4 — Bir Process'in Kimliğini İncele

Her process'in işletim sistemi tarafından tanımlanabilmesi gerekir.

Bunun için kullanılan temel kavramlardan biri:

**PID — Process Identifier**

Görev Yöneticisi'nin:

```text
Ayrıntılar
```

sekmesinden PID sütununu bul.

Linux/macOS üzerinde:

```bash
ps aux
```

çıktısında PID bilgisini görebilirsin.

Bir process seç:

```text
Process:

____________________________________

PID:

____________________________________
```

> PID kavramını Ders 05'te ayrıntılı inceleyeceğiz.

---

## Görev 5 — Driver'ları Gözlemle

Windows kullanıyorsan:

```text
Aygıt Yöneticisi
```

uygulamasını aç.

Şunlardan birini seç:

- Ekran bağdaştırıcısı
- Ağ bağdaştırıcısı
- Ses aygıtı
- Depolama aygıtı

Sağ tık:

```text
Özellikler → Sürücü
```

bölümünü incele.

```text
Donanım:

____________________________________

Driver sağlayıcısı:

____________________________________

Driver sürümü:

____________________________________

Driver tarihi:

____________________________________
```

Herhangi bir driver'ı kaldırma veya güncelleme işlemi yapma.

Amacımız yalnızca gözlem yapmak.

---

## Görev 6 — İşletim Sistemi Güncellemelerini Kontrol Et

Kullandığın işletim sisteminin güncelleme ekranını aç.

Şunlara bak:

```text
Son güncelleme ne zaman yapılmış?

Bekleyen güncelleme var mı?

Güvenlik güncellemesi görünüyor mu?
```

Herhangi bir güncellemeyi zorunlu olarak yüklemen gerekmiyor.

Amaç patch management kavramını gerçek sistem üzerinde görmek.

---

## Görev 7 — Kullanıcı ve Yetki

Kendi kullanıcı hesabının:

```text
Standart kullanıcı mı?

Yönetici / Administrator yetkisine sahip mi?
```

olduğunu araştır.

Sonra şu soruya cevap ver:

> Günlük kullanım için her hesabın sürekli yönetici yetkisine sahip olması neden güvenlik açısından risk oluşturabilir?

```text
Cevabım:

____________________________________________________

____________________________________________________
```

---

# 🧠 Kendini Test Et

## Soru 1

İşletim sisteminin en doğru temel tanımı hangisidir?

**A)** Yalnızca internete bağlanmayı sağlayan programdır.  
**B)** Bilgisayar kaynaklarını yöneten ve uygulamalara sistem hizmetleri sağlayan yazılım sistemidir.  
**C)** CPU'nun başka adıdır.  
**D)** Yalnızca dosya saklama sistemidir.

---

## Soru 2

Kernel nedir?

**A)** Bir kullanıcı hesabı  
**B)** İşletim sisteminin kaynak yönetiminde kritik rol oynayan ayrıcalıklı çekirdek bileşeni  
**C)** Bir web tarayıcısı  
**D)** Bir dosya uzantısı

---

## Soru 3

Bir user mode uygulamasının işletim sistemi tarafından sağlanan ayrıcalıklı hizmetleri talep etmesine olanak veren temel mekanizma hangisidir?

**A)** System call  
**B)** SSD  
**C)** BIOS şifresi  
**D)** Monitör sürücüsü

---

## Soru 4

Least Privilege ilkesi hangisini savunur?

**A)** Her kullanıcıya Administrator yetkisi verilmesini  
**B)** Güvenlik amacıyla bütün hesapların silinmesini  
**C)** Yalnızca gerekli minimum yetkilerin verilmesini  
**D)** Bütün dosyaların herkese açık olmasını

---

## Soru 5

Authentication ile Authorization arasındaki fark hangisidir?

**A)** İkisi tamamen aynı kavramdır.  
**B)** Authentication kimliği doğrular, Authorization hangi işlemlere izin verildiğini belirler.  
**C)** Authentication yalnızca dosyalarla ilgilidir.  
**D)** Authorization yalnızca CPU performansıyla ilgilidir.

---

## Soru 6

Aşağıdakilerden hangisi Linux hakkında teknik olarak daha doğrudur?

**A)** Linux yalnızca Kali Linux'un diğer adıdır.  
**B)** Linux bir web tarayıcısıdır.  
**C)** Linux teknik olarak kernel'dır; Ubuntu ve Debian gibi sistemler Linux dağıtımlarıdır.  
**D)** Linux bir CPU mimarisidir.

---

## Soru 7

Driver'ın temel görevi hangisidir?

**A)** Dosyaları şifrelemek  
**B)** İşletim sisteminin donanımla çalışmasına yardımcı olmak  
**C)** RAM kapasitesini fiziksel olarak artırmak  
**D)** İnternet sitesini HTML'e çevirmek

---

## Soru 8

User mode ve kernel mode ayrımı neden güvenlik açısından önemlidir?

**A)** Her uygulamanın tüm sisteme sınırsız erişmesini engellemeye yardımcı olur.  
**B)** SSD'nin hızını artırır.  
**C)** Monitör çözünürlüğünü yükseltir.  
**D)** Klavyenin daha hızlı çalışmasını sağlar.

---

## Soru 9

Bir kullanıcı sisteme başarıyla giriş yaptı.

Bu durum kullanıcının sistemdeki bütün dosyalara erişebileceğini kanıtlar mı?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 10 — Analist Sorusu

Bir güvenlik analisti şüpheli bir process'in varlığını tespit etti.

Sadece process adına bakarak bunun zararlı olduğunu kesin olarak söyleyebilir mi?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

# 🎯 Ana Görev — Bir Dosya Açıldığında Ne Olur?

Ders 01'de:

> Chrome'u açınca ne olur?

sorusunu cevapladık.

Şimdi işletim sistemi bilgimizi kullanarak başka bir olayı açıklayalım.

Bir metin editörü içerisinden:

```text
notlar.txt
```

dosyasını açtığını düşün.

Aşağıdaki kavramları kullanarak süreci açıklamaya çalış:

```text
Uygulama
User Mode
İşletim Sistemi API
System Call
Kernel
Dosya Sistemi
Depolama
Yetki
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

İpucu:

> Uygulama fiziksel SSD'yi kendi başına doğrudan yönetmez.

---

# 🔐 Siber Güvenlik Görevi

Bir saldırganın standart kullanıcı hesabını ele geçirdiğini düşün.

Hesap:

```text
Administrator değil.
```

Şu sorular üzerinde düşün:

1. Saldırgan neden daha yüksek yetki elde etmek isteyebilir?
2. Least Privilege bu saldırının etkisini nasıl azaltabilir?
3. İşletim sistemi hangi kaynaklara erişilebileceğini nasıl sınırlandırabilir?
4. Bir privilege escalation açığı saldırgana ne sağlayabilir?

Cevaplarını kendi cümlelerinle yaz.

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

İşletim sistemini yalnızca:

```text
Windows / Linux / macOS
```

isimlerinden ibaret düşünme.

İşletim sistemi bilgisayarın kaynaklarını yöneten ve uygulamaların kontrollü şekilde çalışmasını sağlayan temel sistemdir.

Zihinsel modelimiz artık şu:

```text
                     KULLANICI
                         │
                         ▼
                    UYGULAMA
                         │
                         ▼
                    USER MODE
                         │
                  API / SYSTEM CALL
                         │
                         ▼
                  ──────────────
                  YETKİ SINIRI
                  ──────────────
                         │
                         ▼
                   KERNEL MODE
                         │
                         ▼
                       KERNEL
             ┌───────────┼───────────┐
             ▼           ▼           ▼
          PROCESS      BELLEK      DOSYALAR
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                    DRIVER'LAR
                         │
                         ▼
                      DONANIM
```

Gerçek sistemler bundan daha karmaşıktır.

Ancak bu model ileride öğreneceğimiz güvenlik mekanizmalarını anlamak için güçlü bir temel oluşturur.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] İşletim sisteminin ne olduğunu açıklayabiliyorum.
- [ ] İşletim sisteminin neden gerekli olduğunu anlayabiliyorum.
- [ ] Process ve CPU yönetiminin temel mantığını biliyorum.
- [ ] İşletim sisteminin belleği neden yönettiğini biliyorum.
- [ ] Bellek izolasyonunun neden önemli olduğunu anlayabiliyorum.
- [ ] Dosya sistemi yönetiminde işletim sisteminin rolünü biliyorum.
- [ ] Kullanıcı ve yetki kavramlarını açıklayabiliyorum.
- [ ] Authentication ve Authorization arasındaki farkı biliyorum.
- [ ] Least Privilege prensibini açıklayabiliyorum.
- [ ] Kernel'in ne olduğunu temel seviyede biliyorum.
- [ ] User mode ve kernel mode ayrımını anlayabiliyorum.
- [ ] User space ve kernel space kavramlarını tanıyorum.
- [ ] System call'ın temel görevini açıklayabiliyorum.
- [ ] Driver'ın ne işe yaradığını biliyorum.
- [ ] Windows ve Linux ekosistemlerinin temel farklarını biliyorum.
- [ ] Linux'un teknik olarak kernel olduğunu biliyorum.
- [ ] Güncellemelerin güvenlik açısından neden önemli olduğunu biliyorum.
- [ ] İşletim sistemi loglarının neden önemli olduğunu anlayabiliyorum.
- [ ] Uygulama görevlerini tamamladım.
- [ ] Quiz sorularını cevapladım.

---

# 🧩 Dersin Özeti

Bu derste bilgisayar modelimize yeni ve çok önemli bir katman ekledik.

Ders 01:

```text
Program → Process → RAM → CPU
```

Ders 02:

```text
Depolama → RAM → Cache → Register → CPU
```

Ders 03:

```text
               UYGULAMA
                   │
                   ▼
               USER MODE
                   │
                   ▼
            SYSTEM CALL / API
                   │
                   ▼
                KERNEL
          ┌────────┼────────┐
          ▼        ▼        ▼
       PROCESS   BELLEK   DOSYALAR
          │        │        │
          └────────┼────────┘
                   ▼
                DRIVER
                   │
                   ▼
                DONANIM
```

Artık bilgisayardaki programların donanımı ve sistem kaynaklarını kendi başlarına kontrol etmediğini; işletim sistemi tarafından oluşturulan kurallar, soyutlamalar ve güvenlik sınırları içerisinde çalıştığını biliyoruz.

Bu bilgi ileride:

- Blue Team
- DFIR
- Malware Analysis
- Reverse Engineering
- Privilege Escalation
- Endpoint Security
- Exploit Development

konularının temelini oluşturacak.

---

# 🚀 Sonraki Ders

## Ders 04 — Dosya Sistemleri: Veriler Diskte Nasıl Düzenlenir?

Bir sonraki derste işletim sisteminin yönettiği en önemli yapılardan birini inceleyeceğiz:

**Dosya sistemi.**

Şu soruların cevaplarını arayacağız:

- Dosya nedir?
- Klasör/dizin nedir?
- Dosya yolu nedir?
- Absolute ve relative path arasındaki fark nedir?
- Dosya uzantısı gerçekten dosyanın türünü belirler mi?
- Metadata nedir?
- NTFS, FAT32, exFAT, ext4 ve APFS nedir?
- Dosya izinleri nasıl çalışır?
- Bir dosya silindiğinde gerçekten ne olur?
- Timestamp'ler DFIR açısından neden önemlidir?
- Hash ile bir dosyanın bütünlüğünü nasıl kontrol edebiliriz?

Ve ilk kez bir dosyaya yalnızca:

> "İçinde veri bulunan şey"

olarak değil, bir adli bilişim artefaktı olarak bakmaya başlayacağız.