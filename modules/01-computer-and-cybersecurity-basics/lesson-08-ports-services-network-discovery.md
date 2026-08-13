# Ders 08 — Ports, Services & Network Discovery

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–07

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- TCP ve UDP portlarının ne işe yaradığını açıklayabileceksin.
- Port ile servis arasındaki farkı anlayabileceksin.
- Well-Known, Registered ve Dynamic/Private port aralıklarını tanıyabileceksin.
- Listening socket kavramını açıklayabileceksin.
- `127.0.0.1`, `0.0.0.0`, belirli bir interface IP'si ve `::` üzerinde dinleme arasındaki temel farkı anlayabileceksin.
- TCP'de open, closed ve filtered kavramlarını temel seviyede açıklayabileceksin.
- `LISTENING` ile uzaktan gözlemlenen `open` durumunun aynı kavram olmadığını anlayabileceksin.
- UDP servis keşfinin neden TCP'den farklı olduğunu anlayabileceksin.
- Port numarasının servis kimliğini neden kesin olarak belirlemediğini açıklayabileceksin.
- Banner ve service detection kavramlarını tanıyabileceksin.
- Process → socket → port → service ilişkisini kurabileceksin.
- Network discovery, port discovery ve enumeration arasındaki temel farkları anlayabileceksin.
- Asset inventory ve attack surface kavramlarını açıklayabileceksin.
- Kendi sistemindeki listening endpoint'leri `netstat`, PowerShell veya `ss` ile inceleyebileceksin.
- Yetkili bir lab sisteminde temel Nmap keşfinin ne anlama geldiğini anlayabileceksin.
- Bir servisi yalnızca “açık mı?” diye değil, güvenlik bağlamıyla değerlendirmeye başlayabileceksin.

---

# ⚠️ Laboratuvar Kuralı

Bu dersteki network discovery uygulamaları yalnızca:

- Kendi bilgisayarında,
- Kendi sanal makinelerinde,
- Kendi laboratuvar ağında,
- Eğitim için açıkça izin verilmiş hedeflerde,
- Yazılı veya açık yetki verilen sistemlerde

gerçekleştirilmelidir.

Bir sistemi teknik olarak tarayabiliyor olman:

> O sistemi taramak için yetkin olduğu

anlamına gelmez.

Bu eğitimde kullanacağımız temel prensip:

```text
YETKİ
  +
KAPSAM
  +
KONTROLLÜ TEST
  =
DOĞRU LAB YAKLAŞIMI
```

---

# 1. Önceki Dersten Hatırlayalım

Ders 07'de şu yapıya ulaştık:

```text
PROCESS
   │
   ▼
SOCKET
   │
   ▼
LOCAL IP : LOCAL PORT
   │
   ▼
TCP / UDP
   │
   ▼
REMOTE IP : REMOTE PORT
```

Örneğin:

```text
Chrome
  │
  ▼
192.168.1.25:53142
  │
  │ TCP
  ▼
203.0.113.10:443
```

Burada:

```text
192.168.1.25 → Client IP

53142         → Client tarafındaki geçici port

203.0.113.10  → Server IP

443           → Server tarafındaki port
```

olabilir.

Şimdi şu soruya odaklanacağız:

> Bir sistem hangi network hizmetlerini dışarıya sunuyor ve bunu nasıl anlayabiliriz?

---

# 2. Port Nedir?

TCP ve UDP, aynı host üzerindeki farklı iletişim endpoint'lerini ayırt etmek için:

**port number**

kullanır.

Port numarası:

```text
16 bit
```

uzunluğundadır.

Bu nedenle değer aralığı:

```text
0 - 65535
```

şeklindedir.

Örneğin:

```text
192.168.1.10:443
```

ifadesinde:

```text
192.168.1.10 → IP adresi

443          → Port numarası
```

bulunur.

Başlangıç seviyesinde:

> **IP bizi host/interface seviyesinde doğru sisteme yönlendirirken transport portu o sistemdeki TCP/UDP iletişim endpoint'lerinin ayırt edilmesine yardımcı olur.**

---

# 3. Port Fiziksel Bir Giriş Değildir

Buradaki:

```text
port
```

kelimesi:

- USB portu,
- HDMI portu,
- Switch'in fiziksel Ethernet portu

anlamında kullanılmıyor.

Network bağlamında:

```text
TCP Port
UDP Port
```

işletim sistemi network stack'i tarafından kullanılan mantıksal numaralardır.

Örneğin:

```text
TCP 443
```

ile:

```text
Switch Port 24
```

tamamen farklı kavramlardır.

---

# 4. TCP Port ile UDP Port Aynı Şey Mi?

Hayır.

Port numarası transport protokolüyle birlikte anlam kazanır.

Örneğin:

```text
TCP 53
```

ve:

```text
UDP 53
```

farklı transport endpoint'leridir.

Aynı sistem teorik olarak:

```text
TCP 5000 → Uygulama A

UDP 5000 → Uygulama B
```

kullanabilir.

Bu nedenle bir portu ifade ederken gerektiğinde:

```text
TCP/443
UDP/53
```

şeklinde transport protokolünü de belirtmek önemlidir.

---

# 5. Service — Servis Nedir?

**Network service**, ağ üzerinden başka client'lara belirli bir işlev sunan yazılım hizmetidir.

Örneğin:

```text
Web Server
SSH Server
DNS Server
Database Server
Mail Server
File Server
```

network hizmetleri sunabilir.

Bir servis çoğu zaman bir process veya process grubu tarafından sağlanır.

Kavramsal model:

```text
SOFTWARE / PROCESS
        │
        ▼
     SERVICE
        │
        ▼
      SOCKET
        │
        ▼
        IP
        :
       PORT
```

Örneğin:

```text
sshd process
     │
     ▼
SSH Service
     │
     ▼
TCP Socket
     │
     ▼
0.0.0.0:22
```

gibi bir yapı olabilir.

---

# 6. Port ile Servis Aynı Şey Değildir

Şu ilişkiyi düşün:

```text
TCP 443
   │
   ▼
HTTPS olabilir
```

Ancak:

```text
TCP 443
   │
   ≠
   │
Kesin HTTPS
```

Bir uygulama teknik olarak istediği uygun portta farklı bir protokol çalıştırabilir.

Örneğin bir web uygulaması:

```text
TCP 8080
```

üzerinde çalışabilir.

SSH server:

```text
TCP 2222
```

üzerinde yapılandırılabilir.

Dolayısıyla port numarası bize:

> **Beklenti veya ipucu**

sağlayabilir.

Ama servisin kimliğini her zaman kanıtlamaz.

---

# 7. Yaygın Portlar

Bazı portların belirli servislerle yaygın ilişkileri vardır.

| Port | Transport | Yaygın Servis / Kullanım |
|---:|---|---|
| 20 | TCP | Klasik FTP data ile ilişkili kullanım |
| 21 | TCP | FTP control |
| 22 | TCP | SSH / SFTP |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | UDP/TCP | DNS |
| 67 | UDP | DHCP Server |
| 68 | UDP | DHCP Client |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 123 | UDP | NTP |
| 143 | TCP | IMAP |
| 443 | TCP | HTTPS / HTTP/1.1–HTTP/2 |
| 443 | UDP | QUIC / HTTP/3 kullanımında yaygın |
| 445 | TCP | SMB |
| 993 | TCP | IMAPS |
| 995 | TCP | POP3S |
| 3389 | TCP/UDP | RDP ile ilişkili kullanım |

Bu tablo:

> **Port 22 gördüm = Kesin SSH**

demek için değil, yaygın servis ilişkilerini tanımak içindir.

Portları körü körüne ezberlemek yerine servisleri ve kullanım amaçlarını anlamak daha değerlidir.

---

# 8. Port Aralıkları

IANA port numarası aralığını üç temel gruba ayırır.

```text
0 - 1023
Well-Known / System Ports


1024 - 49151
Registered / User Ports


49152 - 65535
Dynamic / Private Ports
```

---

## Well-Known Ports

```text
0 - 1023
```

aralığıdır.

Örneğin:

```text
22  → SSH

53  → DNS

80  → HTTP

443 → HTTPS
```

gibi birçok yaygın servis bu aralıkla ilişkilidir.

---

## Registered Ports

```text
1024 - 49151
```

aralığıdır.

Çeşitli uygulama ve servislerle ilişkilendirilen kayıtlı portlar bulunur.

---

## Dynamic / Private Ports

```text
49152 - 65535
```

IANA'nın Dynamic/Private port aralığıdır.

Client bağlantılarında geçici portlar bu tip yüksek port aralıklarında görülebilir.

Ancak önemli bir ayrım:

> **İşletim sisteminin gerçek ephemeral port aralığının mutlaka tam olarak 49152–65535 olması gerekmez.**

İşletim sistemi ve yapılandırmaya göre kullanılan ephemeral aralık değişebilir.

---

# 9. Ephemeral Port'u Hatırlayalım

Browser'ın bir HTTPS bağlantısı oluşturduğunu düşün:

```text
CLIENT
192.168.1.25:53142
       │
       │ TCP
       ▼
SERVER
203.0.113.10:443
```

Burada:

```text
53142
```

client tarafından geçici olarak kullanılan ephemeral port olabilir.

```text
443
```

ise server'ın hizmet sunduğu port olabilir.

Bağlantı sona erdikten sonra client portu ileride başka bağlantılar için yeniden kullanılabilir.

---

# 10. Server Bir Portta Nasıl Hizmet Verir?

Bir network server uygulamasının gelen bağlantıları kabul edebilmesi için işletim sistemi üzerinden bir socket oluşturması ve uygun adrese/porta bağlaması gerekir.

TCP için basitleştirilmiş model:

```text
SERVER PROCESS
       │
       ▼
SOCKET
       │
       ▼
BIND
       │
       ▼
IP : PORT
       │
       ▼
LISTEN
       │
       ▼
GELEN CONNECTION'LARI BEKLE
```

Programlama tarafında:

```text
socket
bind
listen
accept
```

gibi kavramlarla ileride karşılaşabilirsin.

Şu anda fonksiyonların ayrıntısını bilmen gerekmiyor.

---

# 11. LISTENING Ne Demektir?

Bir TCP socket:

```text
LISTENING
```

durumundaysa process gelen bağlantı isteklerini kabul etmeye hazır bir listening socket oluşturmuş olabilir.

Örneğin:

```text
TCP
0.0.0.0:8080
LISTENING
```

gibi bir çıktı görebilirsin.

Ancak burada çok önemli bir ayrım var:

> **Bir servisin local sistemde LISTENING olması, Internet'teki herkesin o porta ulaşabildiği anlamına gelmez.**

Arada:

- Host firewall
- Network firewall
- NAT
- Router
- Security group
- ACL
- Routing

gibi kontroller bulunabilir.

---

# 12. LISTENING ile OPEN Aynı Şey Mi?

Tam olarak değil.

**LISTENING**, çoğunlukla hedef sistemin kendi işletim sistemi üzerinde gözlemlediğimiz socket durumudur.

**OPEN** ise network keşif aracının belirli bir hedefe yaptığı probe sonucunda:

> O port üzerinde erişilebilir bir servis olduğuna dair yanıt aldığını

ifade eden bir sınıflandırma olabilir.

Örneğin:

```text
HEDEFİN KENDİSİ:

TCP 22
LISTENING
```

ama uzaktaki bir sistem:

```text
Firewall
   │
   X
TCP 22
```

nedeniyle porta ulaşamayabilir.

Dolayısıyla:

```text
Local LISTENING
       ≠
Her yerden OPEN
```

Bu ayrım güvenlik analizinde çok önemlidir.

---

# 13. Bind Address Neden Önemlidir?

Bir servis yalnızca port seçmez.

Hangi local network adreslerinde dinleyeceği de önemlidir.

Örneğin şu üç durum aynı değildir:

```text
127.0.0.1:8080

192.168.1.25:8080

0.0.0.0:8080
```

Şimdi farklarını inceleyelim.

---

# 14. `127.0.0.1:8080`

Örneğin:

```text
127.0.0.1:8080
```

üzerinde listening bir servis yalnızca IPv4 loopback üzerinden erişilebilir olacak şekilde bağlanmış olabilir.

Kavramsal olarak:

```text
AYNI BİLGİSAYAR
     │
     ▼
127.0.0.1:8080
     │
     ▼
LOCAL SERVICE
```

Başka bilgisayarlar normal şartlarda bu loopback adresine network üzerinden ulaşamaz.

Bu yüzden local-only servisler için loopback binding güvenlik açısından önemli olabilir.

---

# 15. Belirli Bir Interface IP'sinde Dinleme

Örneğin:

```text
192.168.1.25:8080
```

servisin yalnızca bu local IP/interface ile ilişkili adreste dinlediğini gösterebilir.

Bilgisayarda birden fazla interface varsa:

```text
Ethernet
Wi-Fi
VPN
Loopback
```

servisin yalnızca belirli interface üzerinden erişilebilir olması istenebilir.

---

# 16. `0.0.0.0:8080` Ne Demektir?

Listening çıktısında:

```text
0.0.0.0:8080
```

görmek genellikle servisin IPv4 için tüm uygun local interface adreslerinde dinlemek üzere wildcard adrese bind edildiğini ifade eder.

Kavramsal olarak:

```text
              SERVICE
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
   Ethernet    Wi-Fi    Diğer IPv4
```

Ancak:

> `0.0.0.0` servisin Internet'ten kesinlikle erişilebilir olduğu anlamına gelmez.

Firewall, NAT ve routing hâlâ erişimi sınırlayabilir.

---

# 17. IPv6'da `::` Ne Anlama Gelebilir?

IPv6 tarafında:

```text
[::]:8080
```

benzeri bir listening adresi görebilirsin.

`::` unspecified/wildcard IPv6 address olarak, bind bağlamında servisin IPv6 local adreslerinde dinlemesiyle ilişkilendirilebilir.

Ancak IPv4-mapped davranışlar ve dual-stack socket davranışı işletim sistemi ve socket ayarlarına göre değişebilir.

Başlangıç seviyesinde:

```text
127.0.0.1 → IPv4 loopback

0.0.0.0   → IPv4 wildcard bind

::1       → IPv6 loopback

::        → IPv6 wildcard bind
```

şeklinde hatırlayabilirsin.

---

# 18. `LISTENING` Gördüm, Güvenlik Açığı mı?

Hayır.

Listening bir socket:

> Bir hizmetin bağlantı kabul etmek için hazır olduğunu

gösterir.

Bu normal olabilir.

Örneğin:

```text
Web Server
SSH Server
Database
Development Server
```

gibi servisler amaçları gereği bağlantı bekleyebilir.

Güvenlik açısından sonraki sorular önemlidir:

```text
Bu servis gerekli mi?

Hangi interface'lerde dinliyor?

Kimler erişebiliyor?

Firewall ne diyor?

Hangi software çalışıyor?

Hangi version?

Authentication var mı?

Güncel mi?

Güvenli yapılandırılmış mı?
```

---

# 19. TCP OPEN Nedir?

Bir network keşif aracı hedef TCP portunu test ettiğinde:

```text
OPEN
```

sonucu, o portta bağlantı kabul eden erişilebilir bir TCP servisi bulunduğuna dair yanıt alınmasıyla ilişkilidir.

Örneğin TCP connect davranışını kavramsal olarak düşünürsek:

```text
SCANNER                       TARGET
   │                            │
   │ -------- SYN ----------->  │
   │                            │
   │ <----- SYN/ACK ---------   │
   │                            │
```

Bu, portun open olduğuna dair güçlü bir işarettir.

Ders 07'de Three-Way Handshake'i öğrendiğimiz için artık bunun mantığını anlayabiliyoruz.

---

# 20. TCP CLOSED Nedir?

Hedef sistem erişilebilir ancak belirtilen TCP port üzerinde listening servis yoksa hedef:

```text
RST
```

gibi bir cevap döndürebilir.

Kavramsal olarak:

```text
SCANNER                       TARGET
   │                            │
   │ -------- SYN ----------->  │
   │                            │
   │ <--------- RST ---------   │
```

Bu durumda araç portu:

```text
CLOSED
```

olarak sınıflandırabilir.

Önemli nokta:

> Closed port, hedef sistemin varlığı hakkında yine bilgi sağlayabilir.

Çünkü hedefin kendisinden cevap alınmış olabilir.

---

# 21. FILTERED Nedir?

Bir network güvenlik kontrolü probe trafiğini engelliyor veya cevapları filtreliyorsa tarama aracı portun gerçek durumunu belirleyemeyebilir.

Örneğin:

```text
SCANNER
   │
   │ SYN
   ▼
FIREWALL
   │
   X
TARGET
```

Bu durumda:

```text
FILTERED
```

gibi bir sınıflandırma görülebilir.

Ancak filtered durumunun kesin nedeni yalnızca çıktıdan her zaman belirlenemez.

Olası nedenler:

- Firewall
- ACL
- Packet filtering
- Routing problemi
- Network cihazı davranışı

olabilir.

---

# 22. Open, Closed ve Filtered Özet

TCP için basitleştirilmiş olarak:

```text
OPEN
│
└── Erişilebilir listening servis olduğuna
    dair cevap alınmış olabilir.


CLOSED
│
└── Host erişilebilir ancak bu portta
    listening servis olmadığına dair
    cevap alınmış olabilir.


FILTERED
│
└── Filtreleme/erişim koşulları nedeniyle
    gerçek durum belirlenememiş olabilir.
```

Bunlar özellikle Nmap gibi araçların yaptığı:

**scan result classification**

bağlamında düşünülmelidir.

---

# 23. UDP'de Neden İşler Daha Zor?

TCP'de:

```text
SYN
SYN/ACK
RST
```

gibi bağlantı davranışları bize güçlü sinyaller verir.

UDP ise connectionless'dır.

Bir UDP portuna veri gönderdiğinde servis:

- Cevap verebilir.
- Cevap vermeyebilir.
- Paket filtrelenebilir.
- ICMP hata mesajı dönebilir.

Bu yüzden:

```text
Cevap yok
```

durumu:

> "Port kesin open."

veya:

> "Port kesin filtered."

demek için her zaman yeterli değildir.

Bu nedenle araçlarda:

```text
open|filtered
```

gibi sonuçlar görülebilir.

> **UDP service discovery genellikle TCP'den daha belirsiz ve yavaş olabilir.**

---

# 24. Port State Evrensel Bir Gerçek Mi?

Port durumu gözlem noktasına göre değişebilir.

Örneğin server'ın kendisinde:

```text
TCP 443 LISTENING
```

görülebilir.

Aynı LAN'daki sistem:

```text
443 OPEN
```

görebilir.

Internet'teki başka sistem ise:

```text
443 FILTERED
```

görebilir.

Çünkü arada farklı güvenlik politikaları vardır.

```text
             SERVER
         TCP 443 LISTENING
           /           \
          /             \
         ▼               ▼
      LAN PC          INTERNET
    443 OPEN        443 FILTERED
```

Bu önemli bir güvenlik prensibidir:

> **Erişilebilirlik bakış noktasına bağlıdır.**

---

# 25. Service Detection Nedir?

Bir portun open olduğunu bulduktan sonra sonraki soru:

> Burada gerçekte hangi servis çalışıyor?

olur.

Port numarasına bakmak ilk ipucunu verir:

```text
22 → SSH olabilir

80 → HTTP olabilir

443 → HTTPS olabilir
```

Ancak kesinlik sağlamaz.

Bu nedenle service detection teknikleri:

- Protokol davranışı
- Banner
- Response formatı
- Handshake davranışı
- TLS bilgileri
- Uygulamaya özgü cevaplar

gibi özellikleri inceleyebilir.

---

# 26. Banner Nedir?

Bazı servisler bağlantı kurulduğunda kendileri hakkında bilgi gönderebilir.

Bu bilgiye genel olarak:

**banner**

denebilir.

Örneğin kavramsal olarak bir SSH servisi:

```text
SSH-2.0-OpenSSH_...
```

benzeri bir protocol identification string gönderebilir.

Bir HTTP response içerisinde:

```text
Server: ...
```

gibi bir header bulunabilir.

Ancak:

> Banner her zaman doğru veya eksiksiz olmak zorunda değildir.

Administrator banner'ı değiştirebilir.

Reverse proxy gerçek backend'i gizleyebilir.

Servis hiç version bilgisi vermeyebilir.

Bu nedenle:

```text
Banner = Kesin kimlik
```

değildir.

---

# 27. Version Detection Neden Önemlidir?

Bir servisin yalnızca:

```text
SSH
```

olduğunu bilmek yerine:

```text
Hangi implementation?

Hangi version?

Hangi configuration?
```

sorularını sormak güvenlik değerlendirmesinde önemlidir.

Çünkü güvenlik açıkları belirli:

- Yazılımları,
- Versiyonları,
- Konfigürasyonları,
- Özellikleri

etkileyebilir.

Ancak:

> Version eski görünüyor = Kesin vulnerable

demek de doğru değildir.

Bazı işletim sistemi üreticileri eski görünen version string'lerine güvenlik yamalarını backport edebilir.

Dolayısıyla zafiyet değerlendirmesinde yalnızca banner'a güvenilmemelidir.

---

# 28. Network Discovery Nedir?

**Network Discovery**, yetkili bir ağ içerisindeki:

- Hostları,
- IP adreslerini,
- Ağ bileşenlerini,
- Erişilebilir sistemleri

tanımaya yönelik süreçtir.

Örneğin:

```text
NETWORK
   │
   ├── Host A
   ├── Host B
   ├── Host C
   └── Router
```

sorusunun cevabını bulmaya çalışabiliriz.

Network discovery'nin ilk sorusu:

> **Ağda neler var?**

---

# 29. Port Discovery Nedir?

Bir host keşfedildikten sonra:

> Bu host hangi network servislerini sunuyor?

sorusu gelir.

Burada port discovery devreye girer.

```text
HOST
 │
 ├── TCP 22
 ├── TCP 80
 └── TCP 443
```

gibi erişilebilir endpoint'ler araştırılabilir.

Network discovery ve port discovery aynı şey değildir.

```text
Network Discovery
→ Hangi hostlar var?


Port Discovery
→ Bu hostlarda hangi portlar erişilebilir?
```

---

# 30. Enumeration Nedir?

**Enumeration**, keşfedilen hedef veya servis hakkında daha ayrıntılı bilgi toplama sürecidir.

Kavramsal akış:

```text
DISCOVERY
"Host var."
    │
    ▼
PORT DISCOVERY
"TCP 22 open."
    │
    ▼
SERVICE DETECTION
"SSH olabilir / SSH doğrulandı."
    │
    ▼
ENUMERATION
"Hangi implementation?
Hangi özellikler?
Nasıl yapılandırılmış?"
```

Enumeration servise göre değişir.

Örneğin:

```text
HTTP Enumeration

SMB Enumeration

DNS Enumeration

SSH Enumeration
```

aynı tekniklerden oluşmaz.

---

# 31. Discovery ile Vulnerability Assessment Aynı Şey Mi?

Hayır.

Şunları birbirinden ayırmak gerekir:

```text
DISCOVERY
    │
    ▼
Ne var?


ENUMERATION
    │
    ▼
Ayrıntısı ne?


VULNERABILITY ASSESSMENT
    │
    ▼
Bilinen veya olası zayıflık var mı?


EXPLOITATION
    │
    ▼
Zayıflığın kontrollü biçimde
kullanılabilirliği test ediliyor mu?
```

Bunlar farklı aşamalardır.

Bu derste:

```text
Discovery + temel service identification
```

seviyesinde kalıyoruz.

---

# 32. Asset Inventory Nedir?

**Asset Inventory — Varlık Envanteri**, kurumun sahip olduğu veya yönettiği sistemlerin kayıt altına alınmasıdır.

Örneğin:

| Asset | IP | Role | OS | Owner |
|---|---|---|---|---|
| WEB-01 | 10.0.10.20 | Web Server | Linux | Web Team |
| FILE-01 | 10.0.20.10 | File Server | Windows | IT |
| DB-01 | 10.0.30.10 | Database | Linux | DBA |

Gerçek bir asset inventory ayrıca:

- Seri numarası
- Cloud resource ID
- Kritik düzey
- İş sahibi
- Environment
- Patch durumu

gibi birçok başka bilgi içerebilir.

> **Koruyamadığın şeyi önce bilmen gerekir.**

Asset management bu nedenle güvenliğin temel bileşenlerinden biridir.

---

# 33. Attack Surface Nedir?

**Attack Surface — Saldırı Yüzeyi**, bir sistem veya ortamın saldırgan tarafından etkileşime girilebilecek potansiyel giriş noktalarının bütününü ifade eder.

Network tarafında:

```text
SERVER
│
├── SSH
├── HTTPS
├── SMB
└── Database
```

gibi erişilebilir servisler saldırı yüzeyinin parçaları olabilir.

Ancak attack surface yalnızca portlardan oluşmaz.

Ayrıca:

- Web application endpoint'leri
- Kullanıcı hesapları
- API'ler
- Cloud services
- Physical interfaces
- Email
- Supply chain
- Client applications

gibi birçok alan da saldırı yüzeyinin parçası olabilir.

---

# 34. Daha Fazla Açık Port = Kesin Daha Güvensiz Mi?

Hayır.

Daha fazla erişilebilir servis:

- Daha fazla yazılım,
- Daha fazla yapılandırma,
- Daha fazla patch ihtiyacı,
- Daha fazla potansiyel saldırı yüzeyi

anlamına gelebilir.

Ancak güvenliği yalnızca port sayısıyla ölçemeyiz.

Örneğin:

```text
Server A:
1 açık servis
ama ciddi vulnerability var


Server B:
5 açık servis
ama güçlü şekilde yönetiliyor
```

olabilir.

Asıl soru:

> **Hangi servisler gerekli ve ne kadar güvenli yönetiliyor?**

---

# 35. Açık Port ile Vulnerability Aynı Şey Mi?

Hayır.

Bu ayrımı özellikle aklında tut.

```text
OPEN PORT
   │
   ▼
ERİŞİLEBİLİR SERVICE
```

bir güvenlik açığı olmak zorunda değildir.

Vulnerability ise sistemde güvenliği etkileyen bir zayıflıktır.

Örneğin:

```text
TCP 443 OPEN
```

normal bir web server için beklenen davranış olabilir.

Ancak bu server:

- Güncel değilse,
- Yanlış yapılandırılmışsa,
- Uygulama zafiyeti içeriyorsa

risk oluşabilir.

Dolayısıyla:

```text
OPEN
  ≠
VULNERABLE
```

---

# 36. Gereksiz Servisler Neden Kapatılır?

Bir sistem işlevini yerine getirmek için belirli servislere ihtiyaç duyabilir.

Gereksiz servislerin çalışması ise:

- Gereksiz attack surface,
- Ek patch ihtiyacı,
- Ek configuration,
- Ek monitoring ihtiyacı

oluşturabilir.

Bu, güvenlikte:

**Attack Surface Reduction**

yaklaşımıyla ilişkilidir.

Temel prensip:

> **İhtiyaç duyulmayan network hizmetlerini gereksiz yere erişilebilir bırakmamak.**

Ancak bir servisi kapatmadan önce işlevi ve bağımlılıkları anlaşılmalıdır.

---

# 37. Firewall Bu Resmin Neresinde?

Firewall network trafiğini belirli kurallara göre:

- İzin verebilir,
- Engelleyebilir,
- Loglayabilir

veya daha gelişmiş işlemler gerçekleştirebilir.

Örneğin:

```text
INTERNET
   │
   ▼
FIREWALL
   │
   ├── TCP 443 → Allow
   │
   ├── TCP 22  → Deny
   │
   └── TCP 3389 → Deny
   │
   ▼
SERVER
```

Server üzerinde üç servis listening olsa bile Internet'ten yalnızca 443 erişilebilir olabilir.

Bu yüzden:

```text
Listening Ports
```

ile:

```text
Externally Reachable Ports
```

aynı liste olmak zorunda değildir.

---

# 38. Host Firewall ve Network Firewall

Firewall yalnızca ayrı bir ağ cihazı olmak zorunda değildir.

Örneğin:

```text
Windows Defender Firewall

Linux nftables / iptables tabanlı politikalar

Cloud firewall / security group

Network firewall appliance
```

farklı katmanlarda trafik kontrolü sağlayabilir.

Kavramsal olarak:

```text
REMOTE CLIENT
      │
      ▼
NETWORK FIREWALL
      │
      ▼
SERVER
      │
      ▼
HOST FIREWALL
      │
      ▼
SERVICE
```

gibi birden fazla güvenlik kontrolü bulunabilir.

---

# 39. Windows'ta Listening Portları Görmek

Windows üzerinde temel araçlardan biri:

```cmd
netstat -ano
```

komutudur.

Örneğin:

```text
Proto  Local Address     Foreign Address   State       PID
TCP    0.0.0.0:135       0.0.0.0:0         LISTENING   1200
TCP    127.0.0.1:5000    0.0.0.0:0         LISTENING   4216
```

gibi satırlar görebilirsin.

Bu alanları tek tek inceleyelim.

---

# 40. `netstat -ano` Alanları

## Proto

```text
TCP
UDP
```

gibi transport bilgisidir.

---

## Local Address

Local IP ve port bilgisidir.

Örneğin:

```text
127.0.0.1:5000
```

---

## Foreign Address

Bağlantının diğer endpoint'iyle ilgili bilgidir.

Listening socket'lerde:

```text
0.0.0.0:0
```

veya farklı temsil biçimleri görülebilir.

Bu, aktif bir remote connection olduğu anlamına gelmez.

---

## State

TCP state bilgisidir.

Örneğin:

```text
LISTENING
ESTABLISHED
TIME_WAIT
CLOSE_WAIT
```

---

## PID

Socket/connection ile ilişkili process'in kimliğidir.

---

# 41. Windows PowerShell ile Listening Portlar

PowerShell içerisinde:

```powershell
Get-NetTCPConnection -State Listen
```

kullanılabilir.

Örneğin daha okunabilir bir çıktı için:

```powershell
Get-NetTCPConnection -State Listen |
Select-Object LocalAddress, LocalPort, OwningProcess
```

Sonra PID'yi process'e bağlayabiliriz:

```powershell
Get-Process -Id <PID>
```

Bu bize:

```text
PORT
  │
  ▼
PID
  │
  ▼
PROCESS
```

ilişkisini gösterir.

---

# 42. Windows'ta Process + Port İlişkisi

Örneğin:

```text
LocalAddress : 127.0.0.1
LocalPort    : 5000
OwningProcess: 4216
```

gördüğünü düşün.

PID'yi sorgula:

```powershell
Get-Process -Id 4216
```

Sonuç:

```text
ExampleApp
```

olsun.

Artık:

```text
ExampleApp
    │
    ▼
PID 4216
    │
    ▼
127.0.0.1:5000
    │
    ▼
LISTENING
```

ilişkisini kurabiliriz.

---

# 43. Linux'ta Listening Portları Görmek

Linux üzerinde modern araçlardan biri:

```bash
ss
```

komutudur.

Listening TCP ve UDP socket'leri görmek için:

```bash
ss -tuln
```

kullanılabilir.

Burada:

```text
-t → TCP

-u → UDP

-l → Listening

-n → Numeric
```

anlamına gelir.

Process bilgilerini de görmek için uygun yetkilerle:

```bash
ss -tulnp
```

kullanılabilir.

---

# 44. `ss` Çıktısı

Örnek:

```text
Netid State   Local Address:Port
tcp   LISTEN  0.0.0.0:22
tcp   LISTEN  127.0.0.1:631
```

Burada:

```text
0.0.0.0:22
```

SSH benzeri bir servisin tüm uygun IPv4 local interface'lerde dinlediğini düşündürebilir.

```text
127.0.0.1:631
```

ise servisin yalnızca loopback üzerinde dinlediğini gösterir.

Ama gerçek servisi yalnızca port numarasından kesinleştirmeyiz.

---

# 45. macOS'ta Listening Socket'ler

macOS üzerinde:

```bash
lsof -nP -iTCP -sTCP:LISTEN
```

gibi komutlar kullanılabilir.

Bu komut:

- Process
- PID
- User
- Local endpoint

gibi bilgiler sağlayabilir.

Örneğin:

```text
PROCESS → PID → PORT
```

ilişkisini doğrudan gözlemleyebilirsin.

---

# 46. Local Observation ile Remote Discovery Farkı

Kendi bilgisayarında:

```text
netstat
ss
Get-NetTCPConnection
lsof
```

gibi araçlar işletim sisteminin bildiği local socket durumlarını gösterir.

Remote discovery ise network üzerinden hedefe probe göndererek erişilebilirliği anlamaya çalışır.

```text
LOCAL OBSERVATION

Operating System
      │
      ▼
Listening Socket
```

ile:

```text
REMOTE DISCOVERY

Scanner
  │
  ▼
Network
  │
  ▼
Firewall
  │
  ▼
Target
```

aynı bakış açısı değildir.

Bu farkı anlamak network security için çok önemlidir.

---

# 47. Nmap Nedir?

**Nmap — Network Mapper**

network discovery, port discovery ve service identification gibi amaçlarla kullanılan yaygın bir network aracıdır.

Nmap:

- Sistem yöneticileri,
- Blue Team çalışanları,
- Penetration tester'lar,
- Güvenlik araştırmacıları

tarafından kullanılabilir.

Araç tek başına:

> "Saldırı aracı"

veya:

> "Savunma aracı"

değildir.

Nasıl ve hangi yetkiyle kullanıldığı önemlidir.

---

# 48. İlk Güvenli Nmap Hedefimiz: Kendi Bilgisayarımız

Nmap kuruluysa ilk hedef olarak:

```text
127.0.0.1
```

kullanabiliriz.

Bu:

**loopback**

adresidir ve kendi bilgisayarını temsil eder.

Basit bir tarama:

```bash
nmap 127.0.0.1
```

Nmap'in varsayılan taraması belirli yaygın TCP portlarını kontrol eder.

Bu:

> Bütün 65.535 TCP portu tarandı.

anlamına gelmez.

Çıktıda örneğin:

```text
PORT     STATE   SERVICE

135/tcp  open    msrpc

445/tcp  open    microsoft-ds
```

gibi sonuçlarla karşılaşabilirsin.

Sistemine göre sonuçlar tamamen farklı olabilir.

---

# 49. Belirli Bir Lab Portunu Kontrol Etmek

Kendi bilgisayarındaki veya açıkça yetkili lab VM'indeki belirli portları kontrol etmek için:

```bash
nmap -p 22,80,443 127.0.0.1
```

kullanılabilir.

Burada:

```text
-p
```

kontrol edilecek portları belirtir.

Bu örnek yalnızca:

```text
22
80
443
```

TCP portlarını kontrol eder.

---

# 50. Service Detection

Yetkili kendi lab sisteminde service detection için Nmap'in:

```bash
nmap -sV -p 22,80,443 127.0.0.1
```

gibi bir kullanımıyla karşılaşabilirsin.

Buradaki:

```text
-sV
```

Nmap'in açık portlarda servis/version hakkında daha fazla bilgi toplamaya çalışmasını sağlar.

Ama sonucu:

> Kesin ve tartışmasız gerçek

olarak kabul etme.

Service detection:

- Banner,
- Protokol cevabı,
- Fingerprint,
- Probe davranışı

gibi bilgilerden çıkarım yapabilir.

---

# 51. Nmap `SERVICE` Sütunu Her Zaman Kesin Servis Mi?

Hayır.

Bu çok önemli.

Basit port scan sırasında Nmap:

```text
443/tcp open https
```

gibi bir çıktı verebilir.

Buradaki:

```text
https
```

bazı durumlarda port numarasının yaygın servis eşleşmesine dayanabilir.

Bu:

> Nmap kesinlikle HTTPS protocol doğruladı.

anlamına gelmeyebilir.

Daha güçlü service detection için:

```text
-sV
```

gibi yöntemlerle protokol davranışı incelenebilir.

Yine de analistin sonucu doğrulaması gerekir.

---

# 52. Host Discovery Nedir?

Bir networkte hangi sistemlerin erişilebilir olabileceğini anlamaya yönelik yöntemler:

**Host Discovery**

ile ilişkilidir.

Ancak:

> Ping cevap vermiyor = Host yok

sonucu doğru değildir.

Bir sistem:

- ICMP'yi engelleyebilir.
- Firewall arkasında olabilir.
- Belirli probe türlerine cevap vermeyebilir.

Bu nedenle host discovery farklı yöntemler kullanabilir.

Bu derste geniş network taraması yapmayacağız.

Kendi lab ağımızı kurduğumuzda kontrollü şekilde inceleyeceğiz.

---

# 53. Nmap Sonuçları Neden Farklı Olabilir?

Aynı hedef farklı noktalardan tarandığında farklı sonuçlar verebilir.

Örneğin:

```text
TARGET SERVER
TCP 443 LISTENING
     │
     ├── Internal Scanner → OPEN
     │
     └── Internet Scanner → FILTERED
```

Bunun nedeni:

- Firewall
- Routing
- ACL
- NAT
- VPN
- Segmentation

gibi mekanizmalar olabilir.

Dolayısıyla scan sonucu:

> **Scanner'ın bulunduğu noktadan hedefin nasıl göründüğünü**

anlatır.

Bu, çok önemli bir analist prensibidir.

---

# 54. Tarama Sonuçları Zamanla Değişebilir Mi?

Evet.

Örneğin:

```text
10:00
TCP 8080 OPEN

11:00
TCP 8080 CLOSED
```

olabilir.

Çünkü:

- Servis kapatılmış olabilir.
- Firewall kuralı değişmiş olabilir.
- Uygulama çökmüş olabilir.
- Container kapanmış olabilir.
- IP başka sisteme atanmış olabilir.

Bu nedenle scan sonuçlarında:

**timestamp**

önemlidir.

---

# 55. Tarama Sonuçlarını Nasıl Kaydetmeliyiz?

Basit bir lab çalışmasında bile şu bilgileri kaydetmek faydalıdır:

```text
Tarih / Saat

Scanner IP

Target IP

Port

Transport

State

Observed Service

Version / Banner

Notlar
```

Örneğin:

| Target | Port | Transport | State | Service | Not |
|---|---:|---|---|---|---|
| 127.0.0.1 | 8080 | TCP | open | HTTP? | Lab server |
| 127.0.0.1 | 22 | TCP | closed | — | Service yok |

Bu alışkanlık ileride profesyonel raporlamada çok değerlidir.

---

# 56. False Positive ve False Negative

Güvenlik araçlarının sonuçları her zaman kusursuz değildir.

**False Positive**

Araç problem olduğunu söyler ancak gerçekte problem yoktur.

**False Negative**

Araç problem olmadığını veya bir şeyi görmediğini düşündürür ancak gerçekte problem vardır.

Service discovery için de benzer şekilde yanlış sınıflandırmalar olabilir.

Bu nedenle:

> **Araç çıktısı analiz için girdidir; analistin yerini tutmaz.**

---

# 57. Service Version Bulduk, Şimdi Ne?

Bir servis için şu bilgi bulunduğunu düşün:

```text
Service:
ExampleServer

Version:
1.2.3
```

Analist şunları araştırabilir:

```text
Bu version destekleniyor mu?

Security update var mı?

Bilinen vulnerability var mı?

Vendor advisory var mı?

Gerçekten bu version mı?

Distribution patch/backport uygulamış mı?

Configuration güvenli mi?
```

Yalnızca:

```text
Version eski
```

görünümünden otomatik exploitation sonucuna geçilmez.

---

# 58. Exposure — Erişilebilirlik Neden Önemlidir?

Bir servis güvenlik değerlendirmesinde yalnızca varlığıyla değil:

> **Kim tarafından erişilebildiğiyle**

de önemlidir.

Örneğin database:

```text
127.0.0.1:5432
```

üzerinde yalnızca local erişilebilir olabilir.

Başka bir database:

```text
0.0.0.0:5432
```

üzerinde listening olabilir.

Ancak host firewall yalnızca application server'a izin veriyor olabilir.

Başka bir durumda port Internet'e tamamen açık olabilir.

Bu üç senaryo aynı risk profiline sahip değildir.

---

# 59. Exposure Analizi

Bir servisi değerlendirirken:

```text
SERVICE
   │
   ▼
HANGİ ADDRESS'TE LISTENING?
   │
   ▼
HOST FIREWALL?
   │
   ▼
NETWORK FIREWALL?
   │
   ▼
ROUTING?
   │
   ▼
NAT?
   │
   ▼
KİM ERİŞEBİLİYOR?
```

sorularını düşünmeliyiz.

Bir servisin:

```text
"çalışıyor"
```

olması ile:

```text
"Internet'e açık"
```

olması aynı şey değildir.

---

# 60. Blue Team Açısından Port ve Servisler

Blue Team çalışanı kendi sistemlerinde:

- Beklenmeyen listening portları,
- Yetkisiz servisleri,
- Yeni açılan network endpoint'lerini,
- Riskli bind address'leri,
- Internet'e gereksiz açık servisleri

araştırabilir.

Örneğin:

```text
Dün:
TCP 8443 yok

Bugün:
TCP 8443 LISTENING
```

gibi bir değişiklik araştırılabilir.

Bu davranış:

- Yeni uygulama kurulumu,
- Güncelleme,
- Developer servisi,
- Yanlış yapılandırma,
- Kötü amaçlı process

gibi farklı nedenlerden kaynaklanabilir.

Tek başına saldırı kanıtı değildir.

---

# 61. Baseline Nedir?

Bir sistemin normalde hangi servisleri çalıştırdığını bilirsek beklenmeyen değişiklikleri daha kolay fark edebiliriz.

Bu normal davranış profiline:

**baseline**

denebilir.

Örneğin:

```text
WEB-01 Normal Baseline

TCP 22   → SSH
TCP 80   → HTTP
TCP 443  → HTTPS
```

Bir gün:

```text
TCP 4444 → Unknown
```

ortaya çıkarsa araştırılabilir.

Ama:

> Port 4444 = Malware

diyemeyiz.

Önemli olan baseline'dan sapma olmasıdır.

---

# 62. Shadow IT ve Rogue Services

Kurumda onaylanmadan kurulan uygulama veya servisler güvenlik görünürlüğünü azaltabilir.

Örneğin çalışan:

```text
Geçici dosya paylaşım server'ı
Development web server
Remote administration tool
```

çalıştırmış olabilir.

Bunlar:

- Patch yönetimi dışında kalabilir.
- Yanlış interface'e bind olabilir.
- Zayıf authentication kullanabilir.
- Hassas veri açığa çıkarabilir.

Bu yüzden asset ve service inventory önemlidir.

---

# 63. Network Discovery Savunmada Neden Kullanılır?

Discovery yalnızca saldırı öncesi reconnaissance değildir.

Savunma ekipleri de kendi ortamlarını keşfeder.

Amaç:

```text
Hangi asset'ler var?

Hangi IP'leri kullanıyorlar?

Hangi servisler açık?

Beklenmeyen servis var mı?

Envanter ile gerçek ortam eşleşiyor mu?

Gereksiz exposure var mı?
```

sorularını cevaplamak olabilir.

Bu süreç:

**Attack Surface Management**

ve:

**Asset Management**

çalışmalarıyla yakından ilişkilidir.

---

# 64. Discovery ve DFIR

Incident Response sırasında analist:

> Compromised host hangi network servislerini sunuyordu?

sorusunu sorabilir.

Örneğin:

```text
Host
 │
 ├── TCP 22
 ├── TCP 443
 └── TCP 8080
```

ardından:

```text
8080 ne zaman açıldı?

Hangi process açtı?

Process hangi kullanıcıya ait?

Executable nerede?

Bu servis olaydan önce var mıydı?

Firewall'dan erişilebilir miydi?
```

gibi sorular sorabilir.

Bu noktada önceki dersler birleşmeye başlar:

```text
PORT
  │
  ▼
PID
  │
  ▼
PROCESS
  │
  ▼
EXECUTABLE
  │
  ▼
FILE
  │
  ▼
HASH
```

---

# 65. Güvenli Discovery Planı

Profesyonel bir testte tarama başlatmadan önce:

```text
1. Yetki

2. Scope

3. Kaynak IP'ler

4. Hedef IP'ler

5. İzin verilen teknikler

6. Zaman aralığı

7. Trafik sınırları

8. Hassas sistemler

9. Acil durdurma prosedürü

10. Loglama ve raporlama
```

gibi noktalar belirlenebilir.

Çünkü bazı sistemler:

- Eski,
- Hassas,
- Endüstriyel,
- Kritik üretim sistemi

olabilir ve agresif taramalardan olumsuz etkilenebilir.

---

# 66. Kendi Lab Ortamımız

İleride şu tarz bir laboratuvar oluşturabiliriz:

```text
                 LAB NETWORK
                 10.10.10.0/24

              ┌────────┼────────┐
              │        │        │
              ▼        ▼        ▼
         Analyst     Linux    Windows
        10.10.10.10   Server    Server
                    .20       .30
                         │
                         ▼
                       Web
                      Server
                       .40
```

Bu ağdaki sistemler bize ait olduğunda veya açıkça eğitim için sağlandığında:

```text
Host Discovery
Port Discovery
Service Detection
Enumeration
Traffic Analysis
```

gibi işlemleri güvenli biçimde uygulayabiliriz.

Bu ders ise bu ileri lab'ların temelini oluşturuyor.

---

# 🧪 Uygulama 08 — Kendi Sistemindeki Port ve Servisleri İncele

Bu uygulamada öncelikle yalnızca kendi bilgisayarının local socket'lerini inceleyeceksin.

Sistem servislerini durdurma veya firewall ayarlarını değiştirme.

---

## Görev 1 — Listening TCP Portlarını Bul

### Windows

PowerShell:

```powershell
Get-NetTCPConnection -State Listen |
Sort-Object LocalPort |
Select-Object LocalAddress, LocalPort, OwningProcess
```

Alternatif olarak:

```cmd
netstat -ano
```

kullanabilirsin.

### Linux

```bash
ss -tln
```

### macOS

```bash
lsof -nP -iTCP -sTCP:LISTEN
```

En az üç listening endpoint bulabilirsen tabloyu doldur:

| Local Address | Port | PID | Process |
|---|---:|---:|---|
| | | | |
| | | | |
| | | | |

Sisteminde üç listening socket bulunmuyorsa mevcut olanları incelemen yeterlidir.

---

# 🧪 Görev 2 — Bind Address'i Yorumla

Bulduğun listening satırlarda şu adreslerden biri var mı?

```text
127.0.0.1

0.0.0.0

::1

::
```

Bir tanesini seç:

```text
Address:

____________________________________

Port:

____________________________________
```

Sonra yorumla:

```text
Bu servis yalnızca loopback'te mi?

____________________________________


Birden fazla local interface'te dinliyor olabilir mi?

____________________________________
```

---

# 🧪 Görev 3 — PID'yi Process'e Bağla

Windows:

```powershell
Get-Process -Id <PID>
```

Linux:

```bash
ps -p <PID> -o pid,user,comm,args
```

macOS:

```bash
ps -p <PID> -o pid,user,comm
```

Bir socket seç:

```text
Port:

____________________________________

PID:

____________________________________

Process:

____________________________________

Kullanıcı:

____________________________________
```

---

# 🧪 Görev 4 — Executable Path'i Bul

Windows PowerShell:

```powershell
Get-Process -Id <PID> |
Select-Object Id, ProcessName, Path
```

Linux:

```bash
readlink -f /proc/<PID>/exe
```

macOS'ta process bilgilerini Activity Monitor veya uygun sistem araçlarından inceleyebilirsin.

Sonuç:

```text
Process:

____________________________________

Executable Path:

____________________________________
```

Bazı process bilgilerine erişmek için ek yetki gerekebilir.

---

# 🧪 Görev 5 — TCP ve UDP'yi Ayır

Windows:

```cmd
netstat -ano
```

Linux:

```bash
ss -tuln
```

çıktısından hem TCP hem UDP satırlarını incele.

Şu soruya cevap ver:

> UDP satırlarında neden TCP'deki gibi `LISTENING` veya `ESTABLISHED` durumlarını aynı biçimde görmeyebilirim?

```text
____________________________________________________

____________________________________________________
```

İpucu:

> Ders 07'de UDP'nin connectionless olduğunu hatırla.

---

# 🧪 Görev 6 — Localhost Üzerinde Güvenli Nmap

Bu görev yalnızca Nmap kuruluysa yapılmalıdır.

Kendi bilgisayarını tara:

```bash
nmap 127.0.0.1
```

Çıktıyı kaydet:

```text
Bulunan portlar:

____________________________________

____________________________________
```

Şimdi aynı sonucu local işletim sistemi görünürlüğüyle karşılaştır:

```text
netstat / ss / Get-NetTCPConnection
```

Şu soruyu cevapla:

> Nmap çıktısı ile işletim sisteminin local socket listesi tamamen aynı mı?

```text
____________________________________________________
```

Farklıysa bunun nedenlerini düşün.

---

# 🧪 Görev 7 — Belirli Portları Kontrol Et

Yalnızca kendi bilgisayarın üzerinde:

```bash
nmap -p 22,80,443 127.0.0.1
```

çalıştır.

Sonuç:

| Port | State | Nmap Service |
|---:|---|---|
| 22 | | |
| 80 | | |
| 443 | | |

Şimdi önemli soruyu cevapla:

> `SERVICE` sütunundaki isim her zaman gerçek çalışan servisin kesin olarak doğrulandığı anlamına gelir mi?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 8 — Service Detection

Yalnızca kendi bilgisayarında veya açıkça yetkili lab VM'inde:

```bash
nmap -sV -p 22,80,443 127.0.0.1
```

kullanabilirsin.

Açık port yoksa sonuç çıkmaması normaldir.

Bir sonuç varsa:

```text
Port:

____________________________________

Service:

____________________________________

Version:

____________________________________
```

Şimdi şunu cevapla:

> Version bilgisini neden başka kaynaklarla doğrulamak gerekebilir?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 9 — Listening ≠ Internet'e Açık

Kendi sisteminden bir listening servis seç.

```text
Port:

____________________________________

Bind Address:

____________________________________
```

Sonra şu soruları cevapla:

```text
1. Local olarak LISTENING mi?

____________________________________


2. Loopback'e mi bind edilmiş?

____________________________________


3. Host firewall bu porta izin veriyor mu?

Bilmiyorsam: "Bilmiyorum"

____________________________________


4. Router/NAT üzerinden Internet'e yönlendirilmiş mi?

Bilmiyorsam: "Bilmiyorum"

____________________________________
```

Burada:

> "Bilmiyorum."

geçerli bir cevaptır.

Analistin önemli becerilerinden biri kanıtı olmayan şeyi biliyormuş gibi varsaymamaktır.

---

# 🔐 Siber Güvenlik Görevi — Bir Servis Profili Oluştur

Kendi sistemindeki normal bir listening servis seç.

Şu profili oluştur:

```text
Local Address:

____________________________________

Port:

____________________________________

Transport:

____________________________________

State:

____________________________________

PID:

____________________________________

Process:

____________________________________

Executable Path:

____________________________________

User:

____________________________________

Beklenen Service:

____________________________________

Bu servis neden çalışıyor?

____________________________________

Loopback mi / tüm interface'ler mi?

____________________________________

Local firewall durumu:

____________________________________

Network dışından erişilebilir mi?

____________________________________

Bunu hangi kanıtla biliyorum?

____________________________________
```

Son soru özellikle önemli:

> **Bunu hangi kanıtla biliyorum?**

---

# 🧠 Kendini Test Et

## Soru 1

TCP/UDP port nedir?

**A)** Fiziksel Ethernet soketi  
**B)** Transport katmanında network endpoint'lerini ayırt etmeye yardımcı olan 16-bit numara  
**C)** MAC adresi  
**D)** Dosya yolu

---

## Soru 2

Hangisi doğrudur?

**A)** TCP 53 ile UDP 53 tamamen aynı endpoint'tir.  
**B)** TCP ve UDP kendi port namespace'lerine sahiptir.  
**C)** UDP port kullanmaz.  
**D)** Port numarası yalnızca web server'larda kullanılır.

---

## Soru 3

`127.0.0.1:8080` üzerinde listening servis için hangisi en doğru yorumdur?

**A)** Internet'teki herkes kesin erişebilir.  
**B)** Servis IPv4 loopback üzerinde dinliyor olabilir.  
**C)** Port kesin closed'dur.  
**D)** Servis kesin malware'dir.

---

## Soru 4

`0.0.0.0:8080 LISTENING` ne anlama gelebilir?

**A)** Servis tüm uygun local IPv4 interface adreslerinde dinlemek üzere bind edilmiş olabilir.  
**B)** Servisin Internet'te kesin erişilebilir olduğunu kanıtlar.  
**C)** Port kapalıdır.  
**D)** IP adresi yoktur.

---

## Soru 5

Local sistemde `LISTENING` ile remote scan'deki `OPEN` neden aynı şey değildir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 6

TCP port taramasında SYN gönderildikten sonra SYN/ACK alınması genellikle neyi düşündürür?

**A)** Port open olabilir.  
**B)** Port kesin filtered'dır.  
**C)** Disk doludur.  
**D)** DNS bozulmuştur.

---

## Soru 7

Hedef TCP portundan RST cevabı alınması genellikle hangi durumla ilişkilendirilebilir?

**A)** Open  
**B)** Closed  
**C)** HTTPS  
**D)** DNS

---

## Soru 8

Filtered durumu neyi ifade edebilir?

**A)** Filtreleme/erişim koşulları nedeniyle port durumunun kesin belirlenemediğini  
**B)** Portun kesin open olduğunu  
**C)** Sistemin kesin kapalı olduğunu  
**D)** Process'in malware olduğunu

---

## Soru 9

UDP port discovery neden TCP'den daha belirsiz olabilir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 10

`443/tcp open` sonucu hangi iddiayı tek başına kanıtlamaz?

**A)** TCP portuna erişilebilir bir servis cevap veriyor olabilir.  
**B)** Port kesin olarak HTTPS çalıştırıyor.  
**C)** Hedef network üzerinden erişilebilir.  
**D)** Bir servis bağlantı kabul ediyor olabilir.

---

## Soru 11

Port numarası neden gerçek servisin kesin kimliği değildir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 12

Bir servis local olarak `0.0.0.0:22` üzerinde LISTENING.

Buradan:

> "SSH Internet'e açık."

sonucuna varabilir miyiz?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 13

Açık port güvenlik açığı mıdır?

**A)** Her zaman  
**B)** Hayır

Açıkla:

```text
____________________________________________________
```

---

## Soru 14

Aşağıdaki sıra hangi analitik süreci daha iyi ifade eder?

**A)** Exploit → Port → IP → Host  
**B)** Host → Port → Service → Version/Configuration → Risk  
**C)** RAM → DNS → Password → CPU  
**D)** MAC → File → HTTPS → Registry

---

## Soru 15 — Analist Sorusu

Dün bir server'ın baseline'ında:

```text
22/tcp
80/tcp
443/tcp
```

servisleri vardı.

Bugün:

```text
22/tcp
80/tcp
443/tcp
8443/tcp
```

görülüyor.

Bundan:

> "Server ele geçirilmiş."

sonucuna hemen varabilir miyiz?

Hayır.

Araştırmak isteyeceğin en az beş bilgiyi yaz:

```text
1.

2.

3.

4.

5.
```

---

# 🎯 Ana Görev — Listening Porttan Risk Değerlendirmesine

Kendi bilgisayarındaki veya lab VM'indeki bir normal service'i seç.

Şu analiz zincirini tamamla:

```text
PORT
  │
  ▼
TRANSPORT
  │
  ▼
BIND ADDRESS
  │
  ▼
PID
  │
  ▼
PROCESS
  │
  ▼
EXECUTABLE PATH
  │
  ▼
SERVICE
  │
  ▼
VERSION
  │
  ▼
EXPOSURE
  │
  ▼
SECURITY CONTEXT
```

Raporun:

```text
1. Port:

2. TCP / UDP:

3. Bind Address:

4. PID:

5. Process:

6. Executable Path:

7. Olası / doğrulanan Service:

8. Version:

9. Kimlerin erişebilmesi bekleniyor?

10. Gerçekte kimlerin erişebildiğine dair hangi kanıtım var?

11. Bu service gerekli mi?

12. Beklenen baseline'ın parçası mı?

13. Güncelleme durumu nedir?

14. Şu anda gördüğüm gerçek bir vulnerability var mı,
    yoksa yalnızca attack surface mi gözlemliyorum?
```

Son soruya özellikle dikkat et.

Bir portun açık olması:

```text
Attack Surface
```

hakkında bilgi sağlayabilir.

Ancak:

```text
Vulnerability
```

olduğunu tek başına kanıtlamaz.

---

# 🔍 Bonus Senaryo — Üç Farklı Bakış Noktası

Bir web server üzerinde:

```text
TCP 443 LISTENING
```

bulunuyor.

Üç farklı yerden yapılan gözlem:

```text
SERVER'IN KENDİSİ
443 → LISTENING


AYNI INTERNAL NETWORK
443 → OPEN


INTERNET
443 → FILTERED
```

Şu soruları cevapla:

```text
1. Bu sonuçlar birbirleriyle çelişiyor mu?

____________________________________________________


2. Firewall bu farkı oluşturabilir mi?

____________________________________________________


3. "Portun durumu" neden gözlem noktasına bağlıdır?

____________________________________________________


4. Bir pentest raporunda scanner'ın konumunu neden
   belirtmek önemlidir?

____________________________________________________
```

---

# 🔐 Siber Güvenlik Bağlantısı

Bu ders farklı uzmanlık alanlarını birbirine bağlar:

```text
PORTS & SERVICES
│
├── BLUE TEAM
│   ├── Service Baseline
│   ├── Unexpected Listeners
│   ├── Asset Inventory
│   ├── Exposure Analysis
│   └── Attack Surface Management
│
├── PENETRATION TESTING
│   ├── Host Discovery
│   ├── Port Discovery
│   ├── Service Detection
│   └── Enumeration
│
├── DFIR
│   ├── Listening Ports
│   ├── Process Mapping
│   ├── Network Timeline
│   └── Unexpected Services
│
├── MALWARE ANALYSIS
│   ├── Listening Sockets
│   ├── Remote Connections
│   └── Process / Port Mapping
│
└── SYSTEM HARDENING
    ├── Disable Unnecessary Services
    ├── Firewall Rules
    ├── Bind Address
    ├── Patch Management
    └── Least Exposure
```

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Bir port gördüğünde artık yalnızca:

```text
443 = HTTPS
```

diye düşünmemelisin.

Daha doğru analitik model:

```text
                      HOST
                        │
                        ▼
                     SOCKET
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        BIND ADDRESS             PORT
             │                     │
             └──────────┬──────────┘
                        ▼
                      PROCESS
                        │
                        ▼
                      SERVICE
                        │
                        ▼
                 PROTOCOL BEHAVIOR
                        │
                        ▼
                VERSION / CONFIG
                        │
                        ▼
                    EXPOSURE
                        │
                        ▼
                      RISK
```

Ve üç ayrımı özellikle hatırla:

```text
LISTENING
    ≠
HER YERDEN ERİŞİLEBİLİR
```

```text
PORT NUMARASI
    ≠
SERVİSİN KESİN KİMLİĞİ
```

```text
OPEN PORT
    ≠
VULNERABILITY
```

Bunları anladıysan port scanning'i bir:

> "Açık port bulma"

işleminden ziyade:

> **Sistemin network attack surface'ini anlamaya yarayan ölçüm yöntemlerinden biri**

olarak görmeye başlamışsın demektir.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] TCP/UDP port kavramını açıklayabiliyorum.
- [ ] Portların 16-bit olduğunu ve 0–65535 aralığında bulunduğunu biliyorum.
- [ ] TCP port ile UDP portun aynı endpoint olmadığını biliyorum.
- [ ] Port ile service arasındaki farkı açıklayabiliyorum.
- [ ] Yaygın portları temel seviyede tanıyorum.
- [ ] Well-Known, Registered ve Dynamic/Private port aralıklarını biliyorum.
- [ ] OS ephemeral port aralığının değişebileceğini biliyorum.
- [ ] Listening socket kavramını açıklayabiliyorum.
- [ ] Bind kavramını temel seviyede tanıyorum.
- [ ] `127.0.0.1` üzerinde listening ile `0.0.0.0` üzerinde listening arasındaki farkı biliyorum.
- [ ] `::1` ve `::` gösterimlerini temel seviyede tanıyorum.
- [ ] LISTENING ile remote OPEN durumunun aynı şey olmadığını biliyorum.
- [ ] TCP open durumunun ne anlama geldiğini biliyorum.
- [ ] TCP closed durumunun ne anlama geldiğini biliyorum.
- [ ] Filtered kavramını açıklayabiliyorum.
- [ ] UDP service discovery'nin neden daha belirsiz olabileceğini biliyorum.
- [ ] Port state'in gözlem noktasına bağlı olabileceğini biliyorum.
- [ ] Service detection kavramını açıklayabiliyorum.
- [ ] Banner kavramını tanıyorum.
- [ ] Banner/version bilgisinin kesin gerçek olmayabileceğini biliyorum.
- [ ] Network discovery ile port discovery arasındaki farkı biliyorum.
- [ ] Enumeration kavramını açıklayabiliyorum.
- [ ] Discovery, enumeration ve vulnerability assessment'ın aynı şey olmadığını biliyorum.
- [ ] Asset inventory kavramını biliyorum.
- [ ] Attack surface kavramını açıklayabiliyorum.
- [ ] Open port ile vulnerability'nin aynı şey olmadığını biliyorum.
- [ ] Firewall'ın local listening ile remote exposure arasındaki ilişkiyi değiştirebileceğini biliyorum.
- [ ] Baseline kavramını tanıyorum.
- [ ] Windows/Linux/macOS üzerinde listening portları nasıl görebileceğimi biliyorum.
- [ ] Bir portu PID üzerinden process'e bağladım.
- [ ] Executable path'i inceledim.
- [ ] Kendi loopback adresimde güvenli Nmap gözlemi yaptım veya mantığını anladım.
- [ ] Nmap `SERVICE` alanının her zaman doğrulanmış servis anlamına gelmediğini biliyorum.
- [ ] Service detection sonucunun doğrulanması gerektiğini biliyorum.
- [ ] Discovery işlemlerinin yalnızca izinli kapsamda yapılması gerektiğini biliyorum.
- [ ] Quiz sorularını tamamladım.
- [ ] Servis profili görevini tamamladım.

---

# 🧩 Dersin Özeti

Artık önceki derslerde öğrendiğimiz bütün ilişkileri tek zincirde birleştirebiliriz:

```text
                         USER
                           │
                           ▼
                        PROCESS
                           │
                           ▼
                         SOCKET
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                 ADDRESS         PORT
                    │             │
                    └──────┬──────┘
                           ▼
                        SERVICE
                           │
                           ▼
                       PROTOCOL
                           │
                           ▼
                         NETWORK
                           │
                           ▼
                    REMOTE CLIENT
```

Savunma tarafından:

```text
ASSET
  │
  ▼
LISTENING SERVICES
  │
  ▼
EXPOSURE
  │
  ▼
NECESSITY
  │
  ▼
CONFIGURATION
  │
  ▼
PATCH STATUS
  │
  ▼
RISK
```

Keşif tarafından:

```text
AUTHORIZED SCOPE
       │
       ▼
HOST DISCOVERY
       │
       ▼
PORT DISCOVERY
       │
       ▼
SERVICE DETECTION
       │
       ▼
ENUMERATION
       │
       ▼
SECURITY ASSESSMENT
```

şeklinde düşünmeye başlayabiliriz.

Bu noktaya kadar:

```text
Bilgisayar
→ CPU / RAM
→ İşletim Sistemi
→ Dosya Sistemi
→ Process
→ Network
→ Protocol
→ Port
→ Service
```

zincirini kurduk.

Artık bu sistemlerle terminal üzerinden daha sistematik biçimde etkileşim kurmaya hazırız.

---

# 🚀 Sonraki Ders

## Ders 09 — Command Line Basics: Sistemi Terminalden Anlamak

Bir sonraki derste GUI'den uzaklaşıp doğrudan işletim sistemiyle terminal üzerinden çalışmaya başlayacağız.

Şu soruların cevaplarını arayacağız:

- Shell nedir?
- Terminal nedir?
- CMD, PowerShell ve Bash arasındaki fark nedir?
- Current working directory nedir?
- `cd`, `pwd`, `dir`, `ls` ne yapar?
- Absolute ve relative path terminalde nasıl kullanılır?
- Dosya ve klasörleri terminalden nasıl inceleriz?
- `cat`, `type`, `Get-Content` ne işe yarar?
- Process'leri terminalden nasıl görüntüleriz?
- Network yapılandırmasını nasıl inceleriz?
- Listening portları terminalden nasıl buluruz?
- Command history nedir?
- Environment variable'ları nasıl inceleriz?
- `help`, `man`, `Get-Help` nasıl kullanılır?
- Pipe ve redirection nedir?
- Exit code neden önemlidir?
- Yönetici/root yetkisi neden dikkatli kullanılmalıdır?

Ve ilk kez öğrendiğimiz bütün temel kavramları tek bir terminal oturumunda birleştireceğiz:

```text
FILES
  +
PROCESSES
  +
USERS
  +
NETWORK
  +
PORTS
  +
SYSTEM INFO
       │
       ▼
  COMMAND LINE
```