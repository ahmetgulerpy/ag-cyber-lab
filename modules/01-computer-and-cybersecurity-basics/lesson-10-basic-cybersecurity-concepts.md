# Ders 10 — Temel Siber Güvenlik Kavramları: Neyi, Neden Koruyoruz?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–09

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Bilgi güvenliği ile siber güvenlik arasındaki ilişkiyi açıklayabileceksin.
- Asset (varlık) kavramını anlayabileceksin.
- CIA Triad modelini açıklayabileceksin.
- Confidentiality, Integrity ve Availability kavramlarını gerçek senaryolara uygulayabileceksin.
- Threat, Threat Actor ve Threat Event kavramlarını ayırt edebileceksin.
- Vulnerability ile security weakness/misconfiguration kavramlarını temel seviyede anlayabileceksin.
- Exploit kavramını açıklayabileceksin.
- Exposure ile vulnerability'nin aynı şey olmadığını anlayabileceksin.
- Risk kavramını likelihood ve impact açısından değerlendirebileceksin.
- Inherent Risk ve Residual Risk kavramlarını temel seviyede tanıyabileceksin.
- Security Control kavramını açıklayabileceksin.
- Administrative, Technical ve Physical kontrol sınıflarını tanıyabileceksin.
- Preventive, Detective ve Corrective kontrol amaçlarını ayırt edebileceksin.
- Authentication ve Authorization arasındaki farkı güvenlik perspektifinden açıklayabileceksin.
- Attack Surface kavramını anlayabileceksin.
- Defense in Depth yaklaşımını açıklayabileceksin.
- Zero Trust'ın temel fikrini doğru şekilde anlayabileceksin.
- Riski accept, mitigate, transfer veya avoid gibi yaklaşımlarla ele alabileceğimizi anlayabileceksin.
- Bir güvenlik olayına yalnızca "hangi açık var?" diye değil, varlık → tehdit → zayıflık → etki → kontrol ilişkisi içerisinde bakabileceksin.

> Bu derste yeni bir güvenlik aracı öğrenmeyeceğiz. Asıl hedefimiz siber güvenlikte nasıl düşünüldüğünü öğrenmek.

---

# 1. Buraya Nasıl Geldik?

İlk dokuz derste bir bilgisayar sisteminin teknik temellerini oluşturduk.

```text
Bilgisayar
    │
    ▼
CPU / RAM / Depolama
    │
    ▼
İşletim Sistemi
    │
    ▼
Dosya Sistemi
    │
    ▼
Process / Thread
    │
    ▼
Network
    │
    ▼
Protocol
    │
    ▼
Port / Service
    │
    ▼
Command Line
```

Artık:

> "Bilgisayar nasıl çalışıyor?"

sorusuna temel seviyede cevap verebiliyoruz.

Şimdi başka bir soru sormamız gerekiyor:

> **Bu sistemde neyi korumaya çalışıyoruz ve neden?**

Siber güvenliğin başlangıç noktası aslında:

```text
Hangi aracı kullanmalıyım?
```

değil:

```text
Neyi koruyorum?
Neden koruyorum?
Kimden veya neden koruyorum?
Ne kadar risk var?
```

sorularıdır.

---

# 2. Bilgi Güvenliği Nedir?

**Information Security — Bilgi Güvenliği**, bilginin gizliliğini, bütünlüğünü ve kullanılabilirliğini korumaya yönelik politika, süreç ve kontroller bütünüdür.

Koruduğumuz bilgi yalnızca bilgisayar dosyalarından ibaret değildir.

Örneğin:

- Dijital dosyalar
- Veritabanları
- E-postalar
- Kağıt belgeler
- Parolalar
- Ticari sırlar
- Finansal kayıtlar
- Kişisel veriler
- Sağlık kayıtları
- Sistem logları
- Fiziksel belgeler
- İnsanların bildiği gizli bilgiler

bilgi güvenliğinin kapsamına girebilir.

Bu nedenle bilgi güvenliği:

> **yalnızca bilgisayar güvenliği değildir.**

---

# 3. Siber Güvenlik Nedir?

**Cybersecurity — Siber Güvenlik**, dijital sistemleri, networkleri, uygulamaları, cihazları, hizmetleri ve dijital bilgileri siber tehditlerden korumaya odaklanan geniş bir alandır.

Siber güvenlik içerisinde örneğin:

```text
Network Security

Application Security

Cloud Security

Endpoint Security

Identity & Access Management

Security Operations

Incident Response

Digital Forensics

Malware Analysis

Threat Intelligence

Security Engineering

Penetration Testing
```

gibi çok sayıda uzmanlık bulunur.

Başlangıç seviyesinde:

> **Siber güvenlik, dijital sistemlerin ve bunlarla ilişkili bilgilerin risklerini yönetmeye yönelik teknik ve organizasyonel çalışmalar bütünüdür.**

şeklinde düşünebiliriz.

---

# 4. Bilgi Güvenliği ve Siber Güvenlik Aynı Şey Mi?

Tam olarak değil.

Bilgi güvenliği daha geniş bir bilgi koruma perspektifine sahiptir.

Örneğin masanın üzerinde bırakılan gizli bir basılı belge:

```text
Dijital değildir.
```

Ama yine de bilgi güvenliği problemidir.

Siber güvenlik ise özellikle dijital ortam ve teknolojilerle ilişkili risklere odaklanır.

Basitleştirilmiş olarak:

```text
BİLGİ GÜVENLİĞİ
│
├── Dijital bilgi
├── Fiziksel belge
├── İnsan ve süreçler
└── Bilginin tüm yaşam döngüsü


SİBER GÜVENLİK
│
├── Dijital sistemler
├── Networkler
├── Uygulamalar
├── Cihazlar
└── Dijital veriler
```

İki alan büyük ölçüde birbiriyle kesişir.

---

# 5. Önce Neyi Koruduğumuzu Bilmeliyiz: Asset

Güvenlikte temel kavramlardan biri:

**Asset — Varlık**

tır.

Asset, kurum veya kişi için değer taşıyan ve korunması gereken herhangi bir şey olabilir.

Örneğin:

```text
Veri
Sunucu
Laptop
Kullanıcı hesabı
Cloud hesabı
Web uygulaması
Domain
API
Network cihazı
Kriptografik anahtar
Yedek
İş süreci
Kurum itibarı
```

birer asset olabilir.

Ders 08'de:

**Asset Inventory**

kavramını görmüştük.

Şimdi bunun neden önemli olduğunu daha iyi anlayabiliriz.

> **Varlığını bilmediğin bir sistemi doğru şekilde korumak çok zordur.**

---

# 6. Her Asset Aynı Değerde Mi?

Hayır.

Bir kurum için:

```text
Yemekhane menüsü
```

ile:

```text
Müşteri ödeme veritabanı
```

aynı kritik seviyeye sahip olmayabilir.

Asset değerlendirmesinde:

- İş değeri
- Veri hassasiyeti
- Yasal yükümlülükler
- İş süreçlerine etkisi
- Finansal etkisi
- İtibar etkisi

gibi faktörler dikkate alınabilir.

Bu nedenle güvenlikte:

> Her şeyi aynı ölçüde korumaya çalışmak

yerine:

> **En kritik varlıkların hangileri olduğunu bilmek**

önemlidir.

---

# 7. CIA Triad Nedir?

Bilgi güvenliğinin en temel modellerinden biri:

**CIA Triad**

modelidir.

CIA:

```text
C → Confidentiality

I → Integrity

A → Availability
```

anlamına gelir.

Türkçesi:

```text
Confidentiality → Gizlilik

Integrity       → Bütünlük

Availability    → Kullanılabilirlik
```

Basitleştirilmiş olarak:

```text
              INFORMATION
             /     |      \
            /      |       \
           ▼       ▼        ▼
     CONFIDENTIALITY  INTEGRITY  AVAILABILITY
          │              │             │
          ▼              ▼             ▼
     Kim görebilir?   Doğru mu?   Erişilebilir mi?
```

---

# 8. Confidentiality — Gizlilik

**Confidentiality**, bilginin yalnızca yetkili kişi, process veya sistemler tarafından erişilebilir olmasını hedefler.

Temel soru:

> **Bu bilgiyi kim görebilir?**

Örneğin:

```text
Çalışan maaş bilgileri
```

her çalışanın erişebileceği şekilde paylaşılmamalıdır.

Gizliliği korumaya yardımcı olabilecek kontroller:

- Access Control
- Encryption
- MFA
- Authentication
- Data Classification
- Least Privilege

olabilir.

---

# 9. Confidentiality İhlali

Örneğin:

```text
Müşteri veritabanı
      │
      ▼
Yetkisiz kullanıcı erişimi
      │
      ▼
Veriler görüntülendi / dışarı çıkarıldı
```

Bu durumda:

**Confidentiality**

etkilenmiştir.

Başka örnekler:

- Parolanın çalınması
- Hassas e-postanın yanlış kişiye gönderilmesi
- Cloud storage'ın herkese açık bırakılması
- Kullanıcı token'ının sızması

olabilir.

Dikkat et:

> Güvenlik ihlalinin saldırgan tarafından yapılması zorunlu değildir.

Yanlış kişiye gönderilen e-posta da confidentiality ihlaline neden olabilir.

---

# 10. Integrity — Bütünlük

**Integrity**, bilgi ve sistemlerin yetkisiz veya istenmeyen biçimde değiştirilmesine karşı korunmasını ve doğruluk/güvenilirlik özelliklerinin sürdürülmesini hedefler.

Temel soru:

> **Bu veri doğru mu ve güvenilir biçimde korunmuş mu?**

Örneğin bir banka kaydı:

```text
1000 TL
```

iken yetkisiz biçimde:

```text
100000 TL
```

olarak değiştirilirse integrity ihlali oluşabilir.

---

# 11. Integrity Yalnızca "Dosya Değişmedi" Demek Mi?

Hayır.

Integrity:

- Veri bütünlüğü,
- Sistem yapılandırması,
- Yazılım bütünlüğü,
- Log güvenilirliği,
- Transaction doğruluğu

gibi birçok alanla ilgilidir.

Örneğin:

```text
Antivirüs configuration'ının
yetkisiz şekilde kapatılması
```

da sistem bütünlüğünü etkileyebilir.

Integrity'yi korumaya yardımcı olabilecek mekanizmalar:

- Cryptographic hashes
- Digital signatures
- Access controls
- Audit logging
- Change management
- File integrity monitoring

olabilir.

---

# 12. Hash Tek Başına Integrity Sağlar Mı?

Ders 04'te hash kavramını öğrendik.

Bir dosyanın hash'ini hesaplamak:

```text
Dosya değişmiş olabilir mi?
```

sorusuna yardımcı olabilir.

Ancak sadece dosyanın yanında:

```text
SHA-256: abc...
```

yazması tek başına güvenilir integrity doğrulaması sağlamaz.

Saldırgan hem dosyayı hem yanında duran hash değerini değiştirebiliyorsa kontrol zayıf kalabilir.

Bu nedenle:

- Trusted hash source
- Digital signature
- HMAC

gibi başka mekanizmalar bağlama göre önem kazanabilir.

Kriptografi modülünde bunları ayrıntılı inceleyeceğiz.

---

# 13. Availability — Kullanılabilirlik

**Availability**, bilgi, hizmet ve sistemlerin ihtiyaç duyulduğunda yetkili kullanıcılar tarafından erişilebilir olmasını hedefler.

Temel soru:

> **İhtiyacım olduğunda bu sisteme ulaşabiliyor muyum?**

Availability yalnızca saldırılar nedeniyle bozulmaz.

Örneğin:

```text
Hardware failure

Power outage

Network outage

Software bug

Capacity problem

Human error

Natural disaster

DDoS
```

kullanılabilirliği etkileyebilir.

---

# 14. Availability İçin Kontroller

Availability'yi artırmak için örneğin:

- Redundancy
- Backup
- Disaster Recovery
- Load Balancing
- Monitoring
- DDoS protection
- Failover
- UPS
- Capacity planning

gibi kontroller kullanılabilir.

Burada önemli bir ayrım vardır:

> **Backup ile High Availability aynı şey değildir.**

Yedek veri kurtarmaya yardımcı olabilir.

Ancak sistem çöktüğünde anında hizmet vermeye devam edeceğini garanti etmez.

---

# 15. CIA Birbirinden Bağımsız Mı?

Tam olarak değil.

Aynı güvenlik olayı birden fazla CIA özelliğini etkileyebilir.

Örneğin ransomware:

```text
Dosyaları şifreledi
      │
      ├── Availability etkilendi
      │
      └── Integrity etkilenebilir
```

Eğer saldırgan saldırı öncesinde verileri dışarı da çıkardıysa:

```text
Confidentiality
```

de etkilenebilir.

Dolayısıyla:

> Bir olay yalnızca tek CIA kategorisine ait olmak zorunda değildir.

---

# 16. CIA Senaryosu

Bir hastanenin hasta kayıt sistemini düşün.

## Confidentiality

Hasta bilgilerini yalnızca yetkili kişiler görebilmeli.

## Integrity

Hasta kayıtları izinsiz veya hatalı şekilde değişmemeli.

## Availability

Doktorlar ihtiyaç duyduklarında sisteme erişebilmeli.

Şimdi sistem 4 saat çökerse:

```text
Availability
```

etkilenir.

Hasta kayıtları saldırgana sızarsa:

```text
Confidentiality
```

etkilenir.

Bir hastanın ilaç kaydı değiştirilirse:

```text
Integrity
```

etkilenir.

Aynı sistemin farklı güvenlik hedefleri vardır.

---

# 17. Threat — Tehdit Nedir?

**Threat**, bir asset'e zarar verebilecek durum veya olay potansiyelidir.

Tehdit yalnızca:

```text
Hacker
```

demek değildir.

Örneğin:

- Malware
- Phishing
- Insider misuse
- Hardware failure
- Human error
- Fire
- Flood
- Power outage
- Supply chain compromise

farklı tehdit kaynakları veya tehdit senaryolarıyla ilişkili olabilir.

Başlangıç seviyesinde:

> **Threat = Bir varlığa zarar verme potansiyeline sahip durum veya olay**

şeklinde düşünebiliriz.

---

# 18. Threat Source ve Threat Actor

Bir tehdidin kaynağı her zaman insan değildir.

Örneğin:

```text
Yangın
Deprem
Elektrik kesintisi
Donanım arızası
```

insan threat actor değildir.

İnsan veya organizasyon kaynaklı kasıtlı tehditlerde ise:

**Threat Actor**

kavramını kullanabiliriz.

Örneğin:

- Cybercriminal
- Malicious insider
- State-sponsored actor
- Hacktivist
- Fraudster

gibi kategoriler kullanılabilir.

Ancak gerçek dünyada threat actor sınıflandırmaları her zaman kesin olmayabilir.

---

# 19. Threat Actor'ların Amaçları Aynı Mı?

Hayır.

Bir threat actor'ın motivasyonu:

```text
Para

Casusluk

Sabotaj

İdeoloji

İntikam

Rekabet avantajı

Erişim satışı
```

gibi farklı olabilir.

Ayrıca yetenek ve kaynakları da farklı olabilir.

Bu nedenle threat modeling sırasında:

> "Kim saldırabilir?"

kadar:

> "Neden saldırabilir ve hangi yeteneklere sahip olabilir?"

soruları da önemlidir.

---

# 20. Vulnerability — Zafiyet Nedir?

**Vulnerability**, bir threat tarafından istismar edilmesi durumunda güvenliği olumsuz etkileyebilecek bir sistem, yazılım, yapılandırma, süreç veya kontrol zayıflığıdır.

Örneğin:

```text
Güvenlik açığı bulunan yazılım

Yanlış erişim izinleri

Güvensiz configuration

Zayıf authentication tasarımı

Hatalı input validation
```

vulnerability olabilir.

Ancak terminoloji kullanılan standart veya bağlama göre değişebilir.

---

# 21. Her Zayıflık CVE midir?

Hayır.

Bu çok önemli.

**CVE — Common Vulnerabilities and Exposures**

kamuya açıklanmış belirli vulnerability'ler için kullanılan standart kimliklendirme sistemlerinden biridir.

Örneğin:

```text
CVE-YYYY-NNNN...
```

biçiminde kimlikler görebilirsin.

Ancak:

```text
Zayıf parola politikası

Yanlış firewall kuralı

Gereksiz admin yetkisi
```

gibi güvenlik zayıflıklarının mutlaka bir CVE numarası olması gerekmez.

Dolayısıyla:

```text
Vulnerability
   ≠
Mutlaka CVE
```

---

# 22. Misconfiguration Nedir?

**Security Misconfiguration**, bir sistemin güvenli olmayan şekilde yapılandırılmasıdır.

Örneğin:

```text
Cloud storage herkese açık

Database Internet'e gereksiz açık

Default credentials değiştirilmemiş

Gereksiz admin yetkisi verilmiş

Debug mode production'da açık
```

gibi durumlar olabilir.

Misconfiguration modern sistemlerde en önemli risk kaynaklarından biridir.

> Güvenli yazılım, yanlış yapılandırmayla güvensiz hâle gelebilir.

---

# 23. Exposure Nedir?

**Exposure**, bir sistem veya kaynağın belirli taraflar tarafından ulaşılabilir veya gözlemlenebilir olmasıyla ilişkilidir.

Ders 08'de örneğin:

```text
TCP 443 Internet'e açık
```

bir exposure olabilir.

Ancak:

```text
Exposure
    ≠
Vulnerability
```

Internet'e açık bir HTTPS servisi tamamen gerekli ve güvenli şekilde yönetiliyor olabilir.

Exposure risk değerlendirmesinin bir parçasıdır ama tek başına vulnerability anlamına gelmez.

---

# 24. Exploit Nedir?

**Exploit**, bir vulnerability'den yararlanmak üzere kullanılan kod, teknik veya yöntemdir.

Basitleştirilmiş:

```text
VULNERABILITY
      │
      ▼
   EXPLOIT
      │
      ▼
VULNERABILITY'DEN
YARARLANMA GİRİŞİMİ
```

Ancak önemli bir ayrım:

```text
Vulnerability var
      │
      ≠
      │
Her koşulda exploit edilebilir
```

Bir vulnerability'nin gerçek ortamda istismar edilebilirliği:

- Configuration
- Version
- Mitigations
- Authentication
- Network exposure
- Required privileges

gibi faktörlere bağlı olabilir.

---

# 25. Threat, Vulnerability ve Exploit Farkı

Kavramsal bir örnek:

```text
Asset:
Web Server

Threat Actor:
Saldırgan

Vulnerability:
Web server software'ındaki güvenlik açığı

Exploit:
Açıktan yararlanmak için kullanılan teknik/kod

Impact:
Yetkisiz erişim veya başka zararlar
```

Bunları birbirine karıştırmamak önemlidir.

---

# 26. Risk Nedir?

**Risk**, belirsizlik altında bir threat scenario'nun asset üzerinde olumsuz sonuç oluşturma olasılığı ve etkisiyle ilişkili değerlendirmedir.

Başlangıç seviyesinde risk için sıklıkla:

```text
RISK ≈ LIKELIHOOD × IMPACT
```

gibi basit bir model kullanılır.

Burada:

**Likelihood**

olayın gerçekleşme ihtimali/olasılığıyla ilişkilidir.

**Impact**

gerçekleşirse oluşturacağı sonuçların büyüklüğüyle ilişkilidir.

Ancak:

> Gerçek kurumsal risk modelleri yalnızca basit matematiksel çarpımdan oluşmak zorunda değildir.

---

# 27. Risk Sadece Vulnerability Severity Değildir

Bir vulnerability:

```text
Critical
```

olarak sınıflandırılmış olabilir.

Ancak kurum açısından gerçek risk:

- Sistem nerede?
- Internet'e açık mı?
- Asset ne kadar kritik?
- Exploitability nasıl?
- Mevcut kontroller neler?
- Etkilenen veri ne kadar hassas?

gibi faktörlere bağlıdır.

Örneğin:

```text
Critical vulnerability
+
İzole test sistemi
+
Hassas veri yok
+
Güçlü network kontrolü
```

ile:

```text
Critical vulnerability
+
Internet-facing payment system
+
Müşteri verileri
```

aynı iş riskine sahip olmayabilir.

> **Vulnerability severity ile business risk aynı şey değildir.**

---

# 28. Likelihood Neyi Etkileyebilir?

Likelihood değerlendirilirken:

```text
Exposure

Exploit availability

Threat activity

Attack complexity

Required privileges

Existing controls

System configuration
```

gibi faktörler dikkate alınabilir.

Örneğin yalnızca localhost üzerinde çalışan bir servis ile Internet'e açık servis aynı saldırı olasılığına sahip olmayabilir.

Ders 08'de öğrendiğimiz exposure kavramı burada doğrudan risk değerlendirmesine bağlanır.

---

# 29. Impact Neyi İçerebilir?

Bir olayın etkisi yalnızca:

```text
Bilgisayar bozuldu.
```

değildir.

Impact örnekleri:

- Veri sızıntısı
- Finansal kayıp
- Operasyon kesintisi
- Yasal yaptırım
- Müşteri güveni kaybı
- İtibar kaybı
- Fiziksel güvenlik etkisi
- İş sürekliliği problemi

olabilir.

Bu nedenle teknik severity ile organizasyonel impact farklı perspektiflerdir.

---

# 30. Basit Risk Senaryosu

Bir şirketin payment API'sini düşün.

```text
Asset:
Payment API

Exposure:
Internet-facing

Vulnerability:
Bilinen authentication bypass açığı

Threat:
Bu açığı hedefleyen saldırganlar

Likelihood:
Yüksek olabilir

Impact:
Yetkisiz işlemler / veri kaybı

Risk:
Yüksek olabilir
```

Şimdi şirket güvenlik güncellemesini uygularsa vulnerability giderilebilir.

Risk önemli ölçüde azalabilir.

Bu bize güvenlik kontrollerinin amacını gösterir:

> **Riski kabul edilebilir seviyeye indirmek.**

---

# 31. Inherent Risk Nedir?

**Inherent Risk**, güvenlik kontrollerinin etkisini hesaba katmadan önce var olan risk düzeyi olarak düşünülebilir.

Örneğin:

```text
Internet-facing application

Sensitive data

Active threat

Known vulnerability
```

başlangıçta yüksek risk oluşturabilir.

---

# 32. Residual Risk Nedir?

Kontroller uygulandıktan sonra geriye kalan risk:

**Residual Risk — Artık Risk**

olarak adlandırılır.

Kavramsal olarak:

```text
INHERENT RISK
      │
      ▼
SECURITY CONTROLS
      │
      ▼
RESIDUAL RISK
```

Önemli bir güvenlik gerçeği:

> **Riski her zaman sıfıra indiremezsin.**

Ama amaç riskin kabul edilebilir seviyeye yönetilmesidir.

---

# 33. Security Control Nedir?

**Security Control**, riski değiştirmek veya güvenlik hedeflerini desteklemek için kullanılan önlem, mekanizma, politika veya süreçtir.

Örneğin:

```text
Firewall

MFA

Encryption

Backup

EDR

Logging

Security Training

Access Review

Physical Locks
```

birer güvenlik kontrolü olabilir.

Ancak bütün kontroller aynı amaçla kullanılmaz.

Kontrolleri farklı boyutlarda sınıflandırabiliriz.

---

# 34. Kontrolleri İki Farklı Şekilde Sınıflandırabiliriz

Bu noktada sık yapılan bir hata vardır.

Şunlar:

```text
Technical
Administrative
Physical
```

ile:

```text
Preventive
Detective
Corrective
```

aynı sınıflandırma değildir.

İlk grup:

> Kontrolün nasıl/nerede uygulandığı

ile ilgilidir.

İkinci grup:

> Kontrolün hangi güvenlik işlevini yerine getirdiği

ile ilgilidir.

Dolayısıyla bir kontrol aynı anda:

```text
Technical + Preventive
```

veya:

```text
Technical + Detective
```

olabilir.

---

# 35. Technical Controls

**Technical Controls**, teknoloji üzerinden uygulanan güvenlik kontrolleridir.

Örneğin:

```text
Firewall
EDR
MFA sistemi
Encryption
Access Control
IDS / IPS
Endpoint Protection
```

teknik kontroller olabilir.

---

# 36. Administrative Controls

**Administrative / Managerial Controls**, politika, süreç, organizasyon ve yönetim mekanizmalarıyla uygulanır.

Örneğin:

```text
Security Policy

Risk Assessment

Security Awareness Training

Incident Response Plan

Access Review Process

Vendor Management
```

Bu bize önemli bir şey gösterir:

> **Siber güvenlik yalnızca teknik araçlardan oluşmaz.**

---

# 37. Physical Controls

**Physical Controls**, fiziksel erişim ve çevresel risklerle ilgilenir.

Örneğin:

```text
Door Locks

Badge Access

Security Guards

CCTV

Server Room Controls

Fire Suppression
```

Bir saldırgan server'a fiziksel olarak ulaşabiliyorsa güçlü network güvenliği tek başına yeterli olmayabilir.

---

# 38. Preventive Controls

**Preventive Controls**, olayın gerçekleşmesini önlemeye veya olasılığını azaltmaya çalışır.

Örnekler:

```text
MFA

Access Control

Firewall Policy

Secure Configuration

Patching

Network Segmentation
```

Ancak bir kontrolün preventive etkisinin ne kadar güçlü olduğu kullanım şekline bağlıdır.

---

# 39. Detective Controls

**Detective Controls**, gerçekleşmiş veya devam eden şüpheli aktivitelerin fark edilmesine yardımcı olur.

Örneğin:

```text
SIEM Alert

IDS

EDR Detection

Audit Logs

File Integrity Monitoring

Security Monitoring
```

Ama:

> Logging var = Saldırı kesin tespit edilir

demek değildir.

Logların:

- Doğru üretilmesi,
- Toplanması,
- Korunması,
- Analiz edilmesi

gerekir.

---

# 40. Corrective / Recovery Controls

**Corrective Controls**, tespit edilen sorunun düzeltilmesine yardımcı olur.

**Recovery Controls** ise operasyonların ve sistemlerin olay sonrası geri kazanılmasına odaklanabilir.

Örneğin:

```text
Malware remediation

Configuration fix

Credential reset

Patch application

Backup restore

Disaster recovery
```

bağlama göre corrective veya recovery amaçları taşıyabilir.

Standartlara göre kontrol kategorilerinin isimleri değişebilir.

Buradaki amacımız temel mantığı öğrenmek.

---

# 41. Bir Kontrol Birden Fazla İşlev Görebilir Mi?

Evet.

Örneğin EDR:

```text
Detective
```

özellikler sağlayabilir.

Aynı zamanda belirli davranışları:

```text
Prevent / Block
```

edebilir.

Benzer şekilde firewall:

```text
Preventive
```

olabilir ama log üretmesi:

```text
Detective
```

işlevine de yardımcı olabilir.

Bu nedenle:

> Güvenlik kontrollerini tek bir kutuya zorla yerleştirmek her zaman doğru değildir.

---

# 42. Authentication Nedir?

Ders 03'te görmüştük.

**Authentication**:

> **Sen kimsin?**

sorusunun doğrulanmasıyla ilgilidir.

Örneğin:

```text
Password

Security Key

Certificate

Biometric

One-Time Code
```

authentication sürecinde kullanılabilecek faktörler olabilir.

Authentication:

> Kullanıcının her şeye erişebileceği

anlamına gelmez.

---

# 43. Authorization Nedir?

**Authorization**:

> **Neyi yapmaya yetkilisin?**

sorusuyla ilgilidir.

Örneğin:

```text
Ahmet
│
├── report.pdf → Read
└── payroll.xlsx → No Access
```

gibi.

İlişki:

```text
Kullanıcı
    │
    ▼
Authentication
"Kimliğin doğrulandı mı?"
    │
    ▼
Authorization
"Neye izin var?"
```

Bu ayrım:

- Web security
- Active Directory
- Cloud IAM
- API security

konularında çok önemli olacaktır.

---

# 44. Accounting / Auditing

Kimlik ve erişim sistemlerinde üçüncü önemli soru:

> **Ne yaptın?**

olabilir.

Bu:

- Logging
- Auditing
- Accounting

kavramlarıyla ilişkilendirilebilir.

Kavramsal olarak:

```text
Authentication
"Sen kimsin?"

Authorization
"Neye izinlisin?"

Auditing / Accounting
"Ne yaptın?"
```

Bu yaklaşım olay incelemelerinde çok değerlidir.

---

# 45. Least Privilege

Ders 03'te öğrendiğimiz:

**Principle of Least Privilege**

güvenlikte tekrar karşımıza çıkar.

Temel fikir:

> Bir kullanıcıya, process'e veya sisteme görevini yapmak için gereken minimum yetkiyi ver.

Örneğin:

```text
Normal kullanıcı
      │
      ▼
Administrator gerektirmeyen iş
      │
      ▼
Normal yetkiyle çalış
```

Bu sayede hesap ele geçirilirse saldırganın elde edeceği yetkinin kapsamı azaltılabilir.

---

# 46. Attack Surface Nedir?

Ders 08'de network açısından incelemiştik.

**Attack Surface**, saldırganın sistemle etkileşime girebileceği potansiyel giriş noktalarının bütünüdür.

Örneğin:

```text
Network Services

Web Applications

APIs

User Accounts

Email

Cloud Resources

Remote Access Services

Endpoints

Third-Party Integrations

Physical Access
```

attack surface'in parçaları olabilir.

Bu yüzden:

```text
Attack Surface
     ≠
Yalnızca açık portlar
```

---

# 47. Attack Surface Reduction

Gereksiz saldırı yüzeyini azaltmak önemli güvenlik yaklaşımlarından biridir.

Örneğin:

```text
Kullanılmayan servisleri kapat

Gereksiz kullanıcıları kaldır

Internet exposure'ı azalt

Gereksiz yetkileri kaldır

Kullanılmayan API endpoint'lerini kapat

Güvenli default configuration kullan
```

gibi yöntemlerle yapılabilir.

Ancak amaç:

> Her şeyi kapatmak

değildir.

Amaç:

> **İş ihtiyacını karşılayacak minimum gerekli exposure ve yetkiyi sağlamak.**

---

# 48. Defense in Depth

**Defense in Depth — Derinlemesine Savunma**, tek bir güvenlik kontrolünün başarısına bağımlı kalmak yerine farklı katmanlarda birbirini tamamlayan kontroller kullanma yaklaşımıdır.

Örneğin:

```text
                  INTERNET
                     │
                     ▼
                  FIREWALL
                     │
                     ▼
              WEB APPLICATION
                     │
                 MFA / IAM
                     │
                     ▼
                  SERVER
                     │
                    EDR
                     │
                     ▼
                   LOGS
                     │
                    SIEM
                     │
                     ▼
                  BACKUP
```

Her kontrol farklı bir görevi yerine getirir.

Bir kontrol başarısız olduğunda başka bir kontrol:

- Önleyebilir,
- Tespit edebilir,
- Etkiyi sınırlayabilir,
- Kurtarmaya yardımcı olabilir.

---

# 49. Defense in Depth "Daha Fazla Ürün" Demek Mi?

Hayır.

Bu önemli.

```text
10 güvenlik ürünü satın almak
```

otomatik olarak Defense in Depth değildir.

Kontroller:

- Birbirini tamamlamalı,
- Gerçek riske karşı tasarlanmalı,
- Doğru yapılandırılmalı,
- İzlenmeli,
- Test edilmeli

dir.

Aksi hâlde:

```text
Çok fazla araç
+
Kötü süreç
=
Güçlü güvenlik
```

sonucu çıkmaz.

---

# 50. Zero Trust Nedir?

**Zero Trust**, modern güvenlik mimarisinde sık kullanılan bir yaklaşımdır.

Ancak Zero Trust'ı:

> "Hiç kimseye güvenme."

şeklinde tek cümleyle açıklamak eksik kalır.

Temel fikirlerden bazıları:

- Network konumuna dayanarak otomatik güven verme.
- Kimliği ve erişim bağlamını doğrula.
- Least Privilege uygula.
- Erişimi sürekli değerlendirebil.
- Sistemi ihlal gerçekleşebileceğini varsayarak tasarla.

Basitleştirilmiş olarak:

```text
Kullanıcı geldi
      │
      ▼
"İç networkte, o hâlde güvenilir."
      │
      X
```

yerine:

```text
Kim?

Hangi cihaz?

Hangi kaynak?

Hangi yetki?

Hangi bağlam?

Risk seviyesi ne?
```

sorularını değerlendir.

---

# 51. Zero Trust = Her Şeyi Engellemek Mi?

Hayır.

Zero Trust'ın amacı:

> Kullanıcıların iş yapmasını engellemek

değildir.

Amaç:

> **Erişimi açık ve doğrulanabilir güvenlik politikalarına göre vermek.**

Örneğin:

```text
Kimlik doğrulandı

Cihaz uygun durumda

Kullanıcının bu kaynağa ihtiyacı var

Risk kabul edilebilir

→ Erişim verilebilir
```

gibi bir model kullanılabilir.

Zero Trust büyük bir mimari yaklaşım olduğundan ayrıntılarını ileri modüllere bırakacağız.

---

# 52. Security Event ile Incident Aynı Şey Mi?

Hayır.

**Security Event**, güvenlikle ilişkili gözlemlenebilir bir olay olabilir.

Örneğin:

```text
Başarısız login

Process creation

Firewall deny

Antivirus alert
```

bir event olabilir.

**Security Incident** ise organizasyonun güvenlik politikalarını, varlıklarını veya operasyonlarını etkileyen ve müdahale gerektiren doğrulanmış/önemli güvenlik olayı bağlamında kullanılabilir.

Her event:

```text
Incident
```

değildir.

Örneğin:

```text
Bir başarısız parola girişimi
```

tamamen normal kullanıcı hatası olabilir.

---

# 53. Alert ile Incident Aynı Şey Mi?

Hayır.

Bir güvenlik ürünü:

```text
ALERT
```

üretebilir.

Alert:

> Araştırmaya değer olabilecek bir sinyal

dir.

Analist araştırır:

```text
ALERT
   │
   ▼
TRIAGE
   │
   ├── False Positive / Benign
   │
   └── Suspicious / Malicious
               │
               ▼
            INCIDENT
```

Bu her organizasyonda birebir aynı süreç olmak zorunda değildir.

Ancak temel prensip:

> **Alarm = Saldırı kesin gerçekleşti**

değildir.

---

# 54. Risk Nasıl Ele Alınır?

Bir risk tespit edildiğinde dört temel risk treatment yaklaşımıyla karşılaşabilirsin:

```text
MITIGATE

ACCEPT

TRANSFER

AVOID
```

Şimdi bunları inceleyelim.

---

# 55. Mitigate — Azalt

Riskin likelihood veya impact'ini kontrollerle azalt.

Örneğin:

```text
Vulnerability
    │
    ▼
Patch uygula
    │
    ▼
Risk azalır
```

veya:

```text
Internet Exposure
    │
    ▼
Firewall / Access Restriction
    │
    ▼
Likelihood azalabilir
```

---

# 56. Accept — Kabul Et

Bazı risklerin ortadan kaldırılması:

- Çok pahalı,
- Teknik olarak mümkün değil,
- İş ihtiyacı nedeniyle gerekli

olabilir.

Kurum riskin seviyesini değerlendirip yetkili süreç içerisinde:

**Accept**

edebilir.

Bu:

> "Riski görmezden gel."

anlamına gelmez.

Risk bilinçli biçimde anlaşılır ve kabul edilir.

---

# 57. Transfer — Devret / Paylaştır

Riskin finansal veya operasyonel etkisinin bir bölümünü başka tarafla paylaşmak/devretmek mümkün olabilir.

Örneğin:

```text
Cyber Insurance
```

belirli finansal risklerin transferinde rol oynayabilir.

Ancak:

> Risk transfer edildi = Güvenlik sorumluluğu tamamen ortadan kalktı

demek değildir.

Özellikle yasal ve itibari etkiler tamamen devredilemeyebilir.

---

# 58. Avoid — Kaçın

Risk oluşturan faaliyeti tamamen yapmamayı seçebilirsin.

Örneğin:

```text
Çok riskli eski servis
      │
      ▼
İş için artık gerekli değil
      │
      ▼
Servisi tamamen kaldır
```

Böylece ilgili risk kaynağından kaçınılabilir.

---

# 59. Risk Treatment Sonrası Ne Olur?

Bir kontrol uygulandıktan sonra:

> "Sorun tamamen bitti."

dememeliyiz.

Kontrollerin etkinliği doğrulanmalıdır.

Örneğin:

```text
Risk tespit edildi
      │
      ▼
Control seçildi
      │
      ▼
Control uygulandı
      │
      ▼
Control test edildi
      │
      ▼
Residual Risk değerlendirildi
      │
      ▼
Monitoring
```

Güvenlik:

> Bir kere yapılan işlem

değil:

> **Sürekli yönetilen süreçtir.**

---

# 60. Basit Phishing Senaryosu

Bir çalışan şu e-postayı alıyor:

```text
"Hesabınız kapanacaktır.
Hemen giriş yapmak için buraya tıklayın."
```

Kullanıcı sahte siteye gidip parolasını giriyor.

Şimdi analiz edelim.

## Asset

```text
Kullanıcı hesabı
Kimlik bilgileri
Kurumsal veriler
```

## Threat Actor

Kimlik bilgilerini elde etmeye çalışan saldırgan.

## Attack Technique

Phishing / Social Engineering.

## Weaknesses

Örneğin:

- Kullanıcı kandırılabilir.
- MFA bulunmayabilir.
- Email filtering yetersiz olabilir.
- Domain korumaları veya süreçler yetersiz olabilir.

Ancak:

> Kullanıcının kandırılması otomatik olarak "kullanıcı zafiyettir"

şeklinde etiketlenmemelidir.

Güvenlik sistemi insan, süreç ve teknoloji birlikte düşünülerek tasarlanmalıdır.

---

# 61. Phishing Senaryosunda Kontroller

Preventive:

```text
MFA

Email Filtering

Security Awareness

Web Filtering

Strong Authentication
```

Detective:

```text
Suspicious Login Alerts

EDR

SIEM

Identity Monitoring
```

Corrective:

```text
Credential Reset

Session Revocation

Malicious Email Removal

Affected Endpoint Remediation
```

Recovery:

```text
Gerekliyse veri/sistem kurtarma süreçleri
```

Bu bize Defense in Depth yaklaşımını gösterir.

---

# 62. Bir Teknik Kontrol Her Şeyi Çözer Mi?

Hayır.

Örneğin MFA çok güçlü bir kontrol olabilir ama:

- Session token theft,
- MFA fatigue,
- Social engineering,
- Yanlış recovery süreçleri

gibi başka riskler bulunabilir.

Benzer şekilde:

```text
Firewall var
```

demek:

> Sistem artık güvenli.

anlamına gelmez.

Güvenlikte mutlak ifadelerden kaçınmak önemlidir.

---

# 63. Bir Web Server Risk Senaryosu

Şimdi önceki derslerde öğrendiğimiz teknik bilgileri güvenlikle birleştirelim.

Sistem:

```text
WEB-01
```

Özellikler:

```text
Internet-facing

TCP 443 open

Web application çalışıyor

Software güncel değil

Known vulnerability bulunuyor

Sensitive customer data işliyor
```

Şimdi adım adım düşünelim.

---

# 64. Asset

Asset'ler:

```text
WEB-01 server

Web application

Customer data

User accounts

Business service
```

olabilir.

Her biri farklı değere sahiptir.

---

# 65. Threat

Internet üzerindeki saldırganlar known vulnerability'yi hedefleyebilir.

Buradaki threat scenario:

```text
Threat Actor
     │
     ▼
Internet-facing Service
     │
     ▼
Known Vulnerability
     │
     ▼
Potential Exploitation
```

---

# 66. Vulnerability

Web uygulaması veya server yazılımında bilinen güvenlik açığı vardır.

Ama analist şunları doğrulamalıdır:

```text
Gerçek version ne?

Patch uygulanmış mı?

Açık gerçekten bu configuration'ı etkiliyor mu?

Vendor advisory ne diyor?

Mitigation mevcut mu?
```

Ders 08'de öğrendiğimiz gibi:

```text
Version gördüm
     │
     ≠
     │
Kesin vulnerable
```

---

# 67. Exposure

Service:

```text
Internet-facing
```

olduğu için saldırganların erişim olasılığı local-only bir servise göre daha yüksek olabilir.

Ama:

```text
Internet-facing
      │
      ≠
      │
Vulnerable
```

Exposure ile vulnerability ayrı kavramlardır.

---

# 68. Impact

Saldırı başarılı olursa:

```text
Customer data exposure

Data modification

Service interruption

Account compromise

Financial loss
```

gibi etkiler olabilir.

Yani:

```text
Confidentiality

Integrity

Availability
```

üçü de etkilenebilir.

---

# 69. Controls

Mevcut kontroller:

```text
Firewall

EDR

WAF

Logging

MFA for admin access

Backups
```

olabilir.

Ancak önemli soru:

> **Bu kontroller gerçekten ilgili threat scenario'yu azaltıyor mu?**

Örneğin firewall TCP 443'e izin vermek zorunda olabilir çünkü web server'ın görevi budur.

Bu durumda:

```text
Firewall var
```

tek başına web uygulaması vulnerability'sini ortadan kaldırmaz.

---

# 70. En Etkili Kontrol Hangisi?

Eğer vulnerability için güvenlik patch'i mevcutsa:

```text
Patch / Upgrade
```

çoğu durumda doğrudan zafiyeti gidermeye yardımcı olabilir.

Diğer kontroller:

```text
WAF
Network Restriction
Monitoring
EDR
```

riski azaltabilir.

Ancak mümkünse root cause olan vulnerability'nin giderilmesi önemlidir.

Bu bize şu prensibi gösterir:

> **Her control aynı risk üzerinde aynı etkiye sahip değildir.**

---

# 71. Güvenlik Analisti Nasıl Düşünür?

Bir analist:

```text
"Port açık!"
```

diyerek durmaz.

Şunu sorar:

```text
Hangi asset?

Bu servis neden açık?

Kim erişebiliyor?

Hangi software/version?

Vulnerability gerçekten var mı?

Threat actor için erişilebilir mi?

Exploitability nasıl?

Impact ne?

Mevcut controls neler?

Control'ler çalışıyor mu?

Residual risk kabul edilebilir mi?
```

Bu düşünme biçimi:

**risk-based security**

yaklaşımının temelidir.

---

# 72. Araç Odaklı Düşünmek ile Problem Odaklı Düşünmek

Araç odaklı yaklaşım:

```text
Nmap öğrendim.

Metasploit öğrendim.

EDR öğrendim.
```

Problem odaklı yaklaşım:

```text
Neyi koruyorum?

Hangi tehdide karşı?

Hangi kanıt elimde?

Hangi risk var?

Hangi control bunu azaltır?

Control gerçekten çalışıyor mu?
```

Araçlar önemlidir.

Ancak araç:

> **Amaç değil, probleme cevap vermek için kullanılan araçtır.**

---

# 73. Blue Team

Blue Team savunma faaliyetleriyle ilişkilidir.

Örneğin:

```text
Security Monitoring

Detection Engineering

Threat Hunting

Incident Response

Hardening

Vulnerability Management

Endpoint Security
```

gibi çalışmalar yapabilir.

Blue Team'in amacı yalnızca:

> Alarm beklemek

değildir.

Aynı zamanda:

- Saldırı yüzeyini azaltmak,
- Detection geliştirmek,
- Kontrolleri doğrulamak,
- Olaylara müdahale etmek

gibi faaliyetleri içerebilir.

---

# 74. Red Team

Red Team, açıkça yetkilendirilmiş ortamlarda saldırgan davranışlarını taklit ederek savunma kontrollerinin ve organizasyonun dayanıklılığını test etmeye odaklanır.

Örneğin:

```text
Belirli attack paths

Detection capability

Identity controls

Network segmentation

Response capability
```

test edilebilir.

Önemli:

> Red Team = Her penetration test

demek değildir.

Red Team operasyonları genellikle belirli hedefleri olan daha geniş adversary simulation çalışmalarını ifade eder.

---

# 75. Penetration Testing ile Red Team Aynı Şey Mi?

Tam olarak değil.

**Penetration Testing**, tanımlı kapsam içerisindeki güvenlik zayıflıklarını bulmaya ve doğrulamaya odaklanabilir.

**Red Teaming**, organizasyonun belirli tehdit aktörü davranışlarına karşı:

- Prevention,
- Detection,
- Response

yeteneklerini daha geniş kapsamda değerlendirebilir.

Her ikisi de:

> **Açık yetki ve kapsam**

gerektirir.

---

# 76. DFIR

**DFIR — Digital Forensics and Incident Response**

güvenlik olaylarının:

- Tespit edilmesi,
- Kapsamının anlaşılması,
- Kanıtların incelenmesi,
- Müdahale edilmesi,
- Sistemlerin toparlanması

ile ilişkilidir.

Bir DFIR analisti şunları sorabilir:

```text
Ne oldu?

Ne zaman oldu?

İlk erişim nasıl gerçekleşti?

Hangi kullanıcı etkilendi?

Hangi process çalıştı?

Hangi dosyalar oluşturuldu?

Hangi network bağlantıları kuruldu?

Hangi asset'ler etkilendi?

Veri sızdı mı?

Saldırgan hâlâ erişime sahip mi?
```

İlk dokuz derste öğrendiğin teknik bilgiler bu soruların temelini oluşturur.

---

# 77. Security Operations Center — SOC

**SOC — Security Operations Center**

güvenlik olaylarının izlenmesi, tespit edilmesi ve ele alınmasıyla ilgili operasyonların yürütüldüğü ekip/organizasyon yapısıdır.

SOC çalışanları:

```text
SIEM Alerts

EDR Alerts

Identity Events

Network Logs

Cloud Logs

Threat Intelligence
```

gibi farklı veri kaynaklarıyla çalışabilir.

Ancak SOC'un amacı:

> Alarm kapatmak

değil:

> **Gerçek riski ve olayları doğru biçimde değerlendirmek**

olmalıdır.

---

# 78. Security Mindset

Siber güvenliği öğrenirken şu düşünme modelini kullan:

```text
1. Ne gözlemledim?

2. Bunu hangi kanıt destekliyor?

3. Bunun normal açıklaması olabilir mi?

4. Hangi asset etkileniyor?

5. Hangi threat scenario mümkün?

6. Hangi weakness/vulnerability var?

7. Likelihood nedir?

8. Impact nedir?

9. Hangi controls mevcut?

10. Başka hangi veriyi toplamam gerekir?
```

Bu model seni:

```text
Bir alert gördüm → Saldırı var
```

yaklaşımından çıkarır.

---

# 79. Güvenlikte Kesinlik Seviyesi

Bir analist her zaman:

```text
Kesinlikle saldırı.
```

diyemeyebilir.

Bunun yerine:

```text
Confirmed

High Confidence

Likely

Possible

Unknown
```

gibi farklı güven seviyeleri kullanılabilir.

Bu düşünme biçimi özellikle Threat Intelligence ve DFIR alanlarında önemlidir.

> **Bilmediğin şeyi "bilmiyorum" olarak işaretlemek, yanlış kesinlik üretmekten daha değerlidir.**

---

# 80. Modülün Büyük Resmi

İlk derste:

```text
Bilgisayar nedir?
```

diye başladık.

Şimdi bu bilgisayarı güvenlik perspektifinden görebiliyoruz.

```text
                          ASSET
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
           DATA           SYSTEM         SERVICE
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                       THREAT SCENARIO
                            │
                            ▼
                  WEAKNESS / VULNERABILITY
                            │
                            ▼
                         EXPOSURE
                            │
                            ▼
                     LIKELIHOOD
                            │
                            ▼
                          IMPACT
                            │
                            ▼
                           RISK
                            │
                            ▼
                   SECURITY CONTROLS
                            │
                            ▼
                     RESIDUAL RISK
```

Bu şema gerçek risk analizinin tüm karmaşıklığını göstermez.

Ancak artık güvenliği doğru sorularla düşünmeye başlayabiliriz.

---

# 🧠 Kendini Test Et

## Soru 1

Bilgi güvenliği ile siber güvenlik arasındaki ilişki için hangisi daha doğrudur?

**A)** Tamamen aynı kavramdır.  
**B)** Bilgi güvenliği bilginin daha geniş kapsamda korunmasıyla, siber güvenlik özellikle dijital sistem ve tehditlerle ilişkilidir.  
**C)** Bilgi güvenliği yalnızca kağıt belgelerle ilgilidir.  
**D)** Siber güvenlik yalnızca antivirüs kullanmaktır.

---

## Soru 2

Asset nedir?

**A)** Yalnızca bilgisayar donanımı  
**B)** Korunması gereken değerli varlık  
**C)** Yalnızca IP adresi  
**D)** Malware türü

---

## Soru 3

CIA Triad'ın bileşenleri hangileridir?

**A)** Confidentiality, Integrity, Availability  
**B)** Control, Identity, Access  
**C)** Cyber, Internet, Application  
**D)** Confidentiality, Internet, Authentication

---

## Soru 4

Bir müşteri veritabanının yetkisiz kişiye sızması öncelikle hangi güvenlik hedefini etkiler?

**A)** Confidentiality  
**B)** Availability  
**C)** CPU performance  
**D)** Routing

---

## Soru 5

Bir saldırgan log kayıtlarını yetkisiz biçimde değiştirirse hangi özellik etkilenmiştir?

**A)** Integrity  
**B)** Availability  
**C)** Bandwidth  
**D)** Latency

---

## Soru 6

Bir hastane sistemi arıza nedeniyle doktorlar tarafından kullanılamıyorsa hangi CIA bileşeni öncelikle etkilenmiştir?

**A)** Availability  
**B)** Confidentiality  
**C)** Hashing  
**D)** Authentication

---

## Soru 7

Hangisi threat actor olmak zorunda değildir?

**A)** Cybercriminal  
**B)** Malicious insider  
**C)** Elektrik kesintisi  
**D)** Fraudster

---

## Soru 8

Her vulnerability'nin CVE numarası olmak zorunda mıdır?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 9

Internet'e açık bir TCP 443 servisi tek başına vulnerability midir?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 10

Exploit nedir?

**A)** Vulnerability'den yararlanmak için kullanılan kod/teknik/yöntem  
**B)** Güvenlik politikası  
**C)** Backup türü  
**D)** Network interface

---

## Soru 11

Risk değerlendirmesindeki iki temel kavram hangileridir?

**A)** Likelihood ve Impact  
**B)** IP ve MAC  
**C)** CPU ve RAM  
**D)** Username ve Password

---

## Soru 12

Critical severity bir vulnerability her kurumda aynı business risk'e sahip midir?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 13

Residual Risk nedir?

**A)** Kontroller uygulandıktan sonra kalan risk  
**B)** Hiçbir riskin bulunmaması  
**C)** Yalnızca network riski  
**D)** Firewall log'u

---

## Soru 14

Technical/Administrative/Physical ile Preventive/Detective/Corrective neden farklı sınıflandırmalardır?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 15

Authentication ve Authorization farkı nedir?

```text
Authentication:

____________________________________________________

Authorization:

____________________________________________________
```

---

## Soru 16

Defense in Depth neyi ifade eder?

**A)** Birden fazla tamamlayıcı güvenlik katmanı kullanmayı  
**B)** En pahalı tek güvenlik ürününü almayı  
**C)** Tüm sistemleri Internet'ten kapatmayı  
**D)** Herkese administrator yetkisi vermeyi

---

## Soru 17

Zero Trust'ın temel fikrine en yakın ifade hangisidir?

**A)** Internal network'teki her şeye otomatik güven  
**B)** Erişimi kimlik, cihaz, kaynak ve bağlam gibi faktörlere göre doğrulamak ve minimum gerekli yetkiyi vermek  
**C)** Hiç kimsenin sisteme erişmesine izin vermemek  
**D)** Firewall kullanmamak

---

## Soru 18

Security alert gördüğümüzde bundan:

> "Kesin incident."

sonucuna varabilir miyiz?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 19

Aşağıdakilerden hangisi risk treatment yöntemi değildir?

**A)** Mitigate  
**B)** Accept  
**C)** Transfer  
**D)** Avoid  
**E)** Ignore Everything

---

## Soru 20 — Analist Sorusu

Bir server üzerinde yeni:

```text
TCP 8443
```

listening portu bulundu.

Bunun bir güvenlik olayı olduğunu hemen söyleyebilir miyiz?

En az beş araştırma sorusu yaz:

```text
1.

2.

3.

4.

5.
```

---

# 🧪 Uygulama 10 — Risk Analizi

Bu uygulamada saldırı gerçekleştirmeyeceğiz.

Amacımız öğrendiğimiz kavramları bir güvenlik senaryosu üzerinde uygulamak.

---

## Senaryo

Bir şirketin:

```text
WEB-01
```

isimli sunucusu var.

Özellikleri:

```text
Internet-facing

TCP 443 açık

Müşteri portalı çalışıyor

Müşteri kişisel verileri işleniyor

Web framework uzun süredir güncellenmemiş

Kullanılan version için güvenlik advisory'si yayımlanmış

Firewall mevcut

EDR mevcut

Merkezi loglama mevcut

Günlük backup alınıyor
```

Güvenlik ekibi bu sistemi değerlendirmek istiyor.

---

## Görev 1 — Asset'leri Belirle

En az dört asset yaz:

```text
1.

2.

3.

4.
```

İpucu:

> Yalnızca fiziksel server'ı düşünme.

Veri, kullanıcı hesapları ve sunulan hizmet de asset olabilir.

---

## Görev 2 — CIA Triad

Olası bir compromise durumunda:

### Confidentiality

Ne etkilenebilir?

```text
____________________________________________________
```

### Integrity

Ne etkilenebilir?

```text
____________________________________________________
```

### Availability

Ne etkilenebilir?

```text
____________________________________________________
```

---

## Görev 3 — Threat Scenario

Basit bir threat scenario oluştur:

```text
Threat Actor:

____________________________________

Hedef Asset:

____________________________________

Attack Vector:

____________________________________

Olası Hedef:

____________________________________
```

---

## Görev 4 — Vulnerability'yi Doğrula

Yalnızca:

```text
Framework eski.
```

bilgisinden:

> "Kesin vulnerable."

sonucuna varma.

Hangi bilgileri doğrulamak isterdin?

```text
1.

2.

3.

4.
```

İpucu:

```text
Version

Patch status

Vendor advisory

Affected configuration
```

gibi bilgileri düşün.

---

## Görev 5 — Exposure

Şunu biliyoruz:

```text
TCP 443 Internet-facing
```

Ancak hangi ek soruları sorardın?

```text
1.

2.

3.
```

Örneğin:

```text
WAF var mı?

Kaynak IP kısıtlaması var mı?

Reverse proxy var mı?
```

gibi.

---

## Görev 6 — Likelihood

Likelihood değerlendirmesini:

```text
Low
Medium
High
```

olarak yap.

Cevabın:

```text
____________________________________
```

Neden?

```text
____________________________________________________

____________________________________________________
```

Burada tek bir doğru cevap olmayabilir.

Önemli olan gerekçelendirmendir.

---

## Görev 7 — Impact

Aşağıdaki etkileri değerlendir:

```text
Data Exposure:

____________________________________

Data Modification:

____________________________________

Service Downtime:

____________________________________

Financial Impact:

____________________________________

Reputational Impact:

____________________________________
```

---

## Görev 8 — Existing Controls

Senaryodaki mevcut kontrolleri sınıflandır:

| Control | Technical/Admin/Physical | Preventive/Detective/Corrective/Recovery |
|---|---|---|
| Firewall | | |
| EDR | | |
| Central Logging | | |
| Backup | | |

Bir kontrol için birden fazla fonksiyon yazabilirsin.

---

## Görev 9 — Eksik veya İyileştirilebilecek Kontroller

En az dört öneri yaz:

```text
1.

2.

3.

4.
```

Yalnızca ürün önermek zorunda değilsin.

Örneğin:

```text
Patch Management

Access Review

WAF

Monitoring

Secure Configuration

Incident Response Plan
```

gibi süreç veya kontroller düşünülebilir.

---

## Görev 10 — Risk Treatment

Bu risk için hangi yaklaşımı önerirdin?

```text
[ ] Mitigate

[ ] Accept

[ ] Transfer

[ ] Avoid
```

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Görev 11 — Residual Risk

Kontroller uygulandıktan sonra şu soruya cevap ver:

> Risk tamamen sıfıra iner mi?

```text
____________________________________________________
```

Neden?

```text
____________________________________________________

____________________________________________________
```

---

# 🔐 Siber Güvenlik Görevi — İkinci Senaryo

Bu kez teknik vulnerability olmayan bir senaryo düşün.

Bir şirketin çalışanı:

```text
payroll.xlsx
```

dosyasını yanlışlıkla herkese açık bir cloud storage alanına yükledi.

Dosyada çalışanların:

- Adları
- Maaşları
- Banka bilgileri

bulunuyor.

Analiz et:

```text
Asset:

____________________________________

Threat / Threat Scenario:

____________________________________

Vulnerability / Weakness / Misconfiguration:

____________________________________

CIA Etkisi:

____________________________________

Likelihood:

____________________________________

Impact:

____________________________________

Preventive Control:

____________________________________

Detective Control:

____________________________________

Corrective Control:

____________________________________
```

Şimdi şu soruyu cevapla:

> Bu olayda yazılım exploit edilmeden ciddi bir güvenlik ihlali gerçekleşebilir mi?

```text
____________________________________________________
```

Bu sorunun cevabı siber güvenliğin neden yalnızca:

```text
Exploit bulmak
```

olmadığını gösterir.

---

# 🎯 Mini Case — Bir Alarmı Analiz Et

SOC ekranında şu alert oluşuyor:

```text
Host:
WS-042

User:
ahmet

Process:
powershell.exe

Parent:
WINWORD.EXE

Remote Connection:
203.0.113.50:443

Alert:
Suspicious PowerShell Activity
```

Hemen:

> "Sistem ele geçirildi."

deme.

Önce araştırma soruları oluştur.

### Process

```text
PowerShell command line ne?

Executable path doğru mu?

Dosyanın hash/signature bilgisi ne?

Process ne zaman başladı?
```

### Parent

```text
WINWORD neden PowerShell başlattı?

Kullanıcı o anda bir belge açtı mı?
```

### Network

```text
Remote IP ne?

Hangi domain ile ilişkili?

TLS bilgisi var mı?

Ne kadar veri aktarıldı?
```

### User

```text
Kullanıcının normal davranışı mı?

Hesapta başka anormal aktiviteler var mı?
```

### Endpoint

```text
Yeni dosya oluşturuldu mu?

Registry değişikliği var mı?

Child process oluştu mu?
```

Son olarak:

```text
Bu bir Event mi?

Bir Alert mi?

Şüpheli aktivite mi?

Confirmed Incident mı?

Henüz Unknown mı?
```

değerlendirmesini kanıta göre yap.

> Bu mini case'in amacı saldırıyı çözmek değil, erken hüküm vermeden doğru soruları sormayı öğrenmektir.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Siber güvenlik:

```text
"Bir açık bul."
```

yaklaşımından çok daha geniştir.

Doğru zihinsel model:

```text
                         ASSET
                           │
                           ▼
                    THREAT SCENARIO
                           │
                           ▼
              VULNERABILITY / WEAKNESS
                           │
                           ▼
                       EXPOSURE
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
        LIKELIHOOD                     IMPACT
             │                           │
             └─────────────┬─────────────┘
                           ▼
                          RISK
                           │
                           ▼
                  SECURITY CONTROLS
                           │
                           ▼
                    RESIDUAL RISK
                           │
                           ▼
                       MONITORING
```

Bir güvenlik uzmanı şu soruları sorar:

```text
Neyi koruyorum?

Kimden / neden koruyorum?

Hangi zayıflık mevcut?

Sistem ne kadar exposed?

Olayın gerçekleşme ihtimali ne?

Gerçekleşirse etkisi ne?

Hangi controls mevcut?

Kontroller gerçekten çalışıyor mu?

Geriye ne kadar risk kalıyor?

Bu riski kabul ediyor muyuz?
```

Bu düşünme biçimi araçlardan daha uzun ömürlüdür.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Bilgi güvenliği kavramını açıklayabiliyorum.
- [ ] Siber güvenlik ile bilgi güvenliği arasındaki ilişkiyi biliyorum.
- [ ] Asset kavramını açıklayabiliyorum.
- [ ] Asset'lerin farklı kritik seviyelere sahip olabileceğini biliyorum.
- [ ] CIA Triad'ı açıklayabiliyorum.
- [ ] Confidentiality kavramını gerçek örneklerle açıklayabiliyorum.
- [ ] Integrity kavramını gerçek örneklerle açıklayabiliyorum.
- [ ] Availability kavramını gerçek örneklerle açıklayabiliyorum.
- [ ] Aynı olayın birden fazla CIA bileşenini etkileyebileceğini biliyorum.
- [ ] Threat kavramını biliyorum.
- [ ] Threat source ile threat actor arasındaki farkı biliyorum.
- [ ] Vulnerability kavramını açıklayabiliyorum.
- [ ] Her vulnerability'nin CVE olmadığını biliyorum.
- [ ] Misconfiguration kavramını biliyorum.
- [ ] Exposure ile vulnerability'nin aynı şey olmadığını biliyorum.
- [ ] Exploit kavramını açıklayabiliyorum.
- [ ] Vulnerability varlığının otomatik olarak exploitation anlamına gelmediğini biliyorum.
- [ ] Risk kavramını açıklayabiliyorum.
- [ ] Likelihood ve impact kavramlarını biliyorum.
- [ ] Vulnerability severity ile business risk'in aynı şey olmadığını biliyorum.
- [ ] Inherent Risk kavramını tanıyorum.
- [ ] Residual Risk kavramını tanıyorum.
- [ ] Security Control kavramını açıklayabiliyorum.
- [ ] Technical, Administrative ve Physical kontrol sınıflarını biliyorum.
- [ ] Preventive, Detective ve Corrective kontrol amaçlarını biliyorum.
- [ ] Bir kontrolün birden fazla işleve sahip olabileceğini biliyorum.
- [ ] Authentication ve Authorization farkını biliyorum.
- [ ] Auditing/Accounting kavramını temel seviyede biliyorum.
- [ ] Least Privilege prensibini açıklayabiliyorum.
- [ ] Attack Surface kavramını biliyorum.
- [ ] Attack Surface Reduction yaklaşımını biliyorum.
- [ ] Defense in Depth'i açıklayabiliyorum.
- [ ] Defense in Depth'in yalnızca daha fazla ürün almak olmadığını biliyorum.
- [ ] Zero Trust'ın temel fikrini biliyorum.
- [ ] Event, Alert ve Incident kavramlarının aynı olmadığını biliyorum.
- [ ] Mitigate, Accept, Transfer ve Avoid risk treatment yöntemlerini tanıyorum.
- [ ] Kontrol uygulandıktan sonra residual risk'in yeniden değerlendirilmesi gerektiğini biliyorum.
- [ ] Blue Team'in temel rolünü biliyorum.
- [ ] Red Team ile penetration testing'in birebir aynı olmadığını biliyorum.
- [ ] DFIR'ın temel rolünü biliyorum.
- [ ] SOC kavramını tanıyorum.
- [ ] Bir alert'ten doğrudan kesin sonuca atlamamam gerektiğini biliyorum.
- [ ] Quiz sorularını tamamladım.
- [ ] Risk analizi uygulamasını tamamladım.
- [ ] Mini case üzerinde araştırma soruları oluşturdum.

---

# 🧩 Dersin Özeti

İlk dokuz derste teknik sistemi öğrendik:

```text
CPU
RAM
Storage
OS
Files
Processes
Network
Protocols
Ports
Services
CLI
```

Ders 10 ile bunun üzerine güvenlik perspektifini ekledik:

```text
                         ASSET
                           │
                           ▼
                         VALUE
                           │
                           ▼
                    THREAT SCENARIO
                           │
                           ▼
                WEAKNESS / VULNERABILITY
                           │
                           ▼
                        EXPOSURE
                           │
                           ▼
                          RISK
                           │
                           ▼
                       CONTROLS
                           │
                           ▼
                    RESIDUAL RISK
```

Ve artık şu ayrımları biliyoruz:

```text
THREAT
   ≠
VULNERABILITY
```

```text
EXPOSURE
   ≠
VULNERABILITY
```

```text
VULNERABILITY
   ≠
EXPLOIT
```

```text
OPEN PORT
   ≠
VULNERABILITY
```

```text
ALERT
   ≠
INCIDENT
```

```text
SECURITY CONTROL
   ≠
ZERO RISK
```

Bunlar güvenlik analistinin en önemli düşünme temellerinden bazılarıdır.

---

# 🚀 Sonraki Ders

## Ders 11 — Modül Review & Mini Case: Kanıttan Sonuca

Bir sonraki derste yeni kavram öğrenmekten çok ilk 10 derste öğrendiğimiz her şeyi bir olay üzerinde birleştireceğiz.

Bir endpoint için:

```text
USER
  │
  ▼
FILE
  │
  ▼
PROCESS
  │
  ▼
CHILD PROCESS
  │
  ▼
NETWORK CONNECTION
  │
  ▼
REMOTE SYSTEM
```

zincirini inceleyeceğiz.

Şu soruların cevaplarını arayacağız:

- Sistem hakkında ne biliyoruz?
- Hangi bilgiler yalnızca gözlem?
- Hangi bilgiler kanıt?
- Hangi çıkarımları yapabiliriz?
- Hangi çıkarımları henüz yapamayız?
- Dosyanın hash'i bize ne söylüyor?
- Process tree bize ne söylüyor?
- Network bağlantısı bize ne söylüyor?
- CIA Triad'ın hangi alanları risk altında olabilir?
- Asset nedir?
- Threat scenario nedir?
- Hangi kontroller olayı önleyebilir veya tespit edebilirdi?
- Daha fazla hangi kanıtı toplamalıyız?

Ders 11'in temel prensibi şu olacak:

```text
GÖZLEM
   │
   ▼
KANIT
   │
   ▼
HİPOTEZ
   │
   ▼
DOĞRULAMA
   │
   ▼
SONUÇ
```

Böylece Modül 01 boyunca öğrendiğimiz kavramları ilk kez tek bir bütünsel vaka içerisinde kullanacağız.