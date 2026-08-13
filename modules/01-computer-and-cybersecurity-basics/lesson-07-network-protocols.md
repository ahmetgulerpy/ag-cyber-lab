# Ders 07 — Network Protocols: Ağdaki İletişimin Kuralları

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–06

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Ağ protokolünün ne olduğunu açıklayabileceksin.
- OSI ve TCP/IP modellerinin neden kullanıldığını temel seviyede anlayabileceksin.
- TCP ve UDP arasındaki temel farkları açıklayabileceksin.
- TCP Three-Way Handshake sürecini anlayabileceksin.
- TCP sequence number ve acknowledgment mantığını temel seviyede tanıyabileceksin.
- Port kavramının temel amacını anlayabileceksin.
- Socket kavramını network bağlamında açıklayabileceksin.
- DNS'in temel çalışma mantığını anlayabileceksin.
- DHCP'nin cihazlara nasıl ağ yapılandırması sağladığını açıklayabileceksin.
- HTTP request/response yapısını temel seviyede anlayabileceksin.
- HTTPS ile TLS arasındaki ilişkiyi açıklayabileceksin.
- TLS'in yalnızca şifreleme olmadığını anlayabileceksin.
- SSH, FTP, SFTP, SMTP, IMAP ve POP3 gibi yaygın protokolleri tanıyabileceksin.
- ICMP'nin network iletişimindeki rolünü anlayabileceksin.
- Yaygın port numaralarını tanıyabilecek ancak port numarasının servis kimliğini kesin olarak belirlemediğini anlayabileceksin.
- Bir network bağlantısını process → socket → protocol → IP → port ilişkisi içerisinde değerlendirebileceksin.

> Bu derste protokollerin bütün paket alanlarını ezberlemeyeceğiz. Amacımız ağ trafiğine baktığında "Bu veri neden burada, hangi katmanda ve hangi amaçla bulunuyor?" sorusunu sorabilecek bir temel oluşturmaktır.

---

# 1. Önceki Dersten Hatırlayalım

Ders 06'da bir uygulamanın uzak bir sisteme ulaşmasını şu modelle açıklamıştık:

```text
PROCESS
   │
   ▼
SOCKET
   │
   ▼
TCP / UDP
   │
   ▼
IP
   │
   ▼
NETWORK INTERFACE
   │
   ▼
SWITCH / ROUTER
   │
   ▼
REMOTE SYSTEM
```

Ancak önemli bir soru hâlâ cevapsız:

> Bu sistemler birbirlerine gönderdikleri verinin ne anlama geldiğini nasıl biliyor?

Örneğin bir bilgisayar:

```text
"Bir web sayfası istiyorum."
```

demek istediğinde karşıdaki sunucu bunu nasıl anlıyor?

Ya da:

```text
"Bu domain'in IP adresi nedir?"
```

sorusunu hangi formatta soruyor?

Burada:

**Network Protocols — Ağ Protokolleri**

devreye girer.

---

# 2. Ağ Protokolü Nedir?

**Protocol (protokol)**, sistemlerin iletişim sırasında takip ettiği kuralları, mesaj biçimlerini ve davranışları tanımlar.

Bir protokol örneğin:

- Mesajların biçimini,
- Mesajların hangi sırayla gönderileceğini,
- Alanların ne anlama geldiğini,
- Hataların nasıl bildirileceğini,
- Tarafların nasıl davranacağını

tanımlayabilir.

Basitleştirilmiş model:

```text
SİSTEM A
   │
   │ Protokole uygun mesaj
   ▼
NETWORK
   │
   ▼
SİSTEM B
   │
   │ Aynı protokol kurallarına göre yorumlar
   ▼
İŞLEM
```

Başlangıç seviyesinde:

> **Protokol = İletişim sırasında tarafların kullandığı ortak kurallar ve mesaj yapıları**

olarak düşünebilirsin.

---

# 3. Tek Bir Protokol Yeterli Mi?

Genellikle hayır.

Bir web sitesine erişirken bile birden fazla protokol birlikte çalışabilir.

Örneğin klasik bir HTTPS bağlantısında:

```text
HTTP
 │
 ▼
TLS
 │
 ▼
TCP
 │
 ▼
IP
 │
 ▼
Ethernet / Wi-Fi
```

gibi bir yapı görülebilir.

Başka bir işlemde:

```text
DNS
 │
 ▼
UDP
 │
 ▼
IP
```

kullanılabilir.

Bu bize önemli bir network prensibini gösterir:

> **Ağ iletişimi katmanlardan oluşur ve farklı protokoller farklı görevler üstlenir.**

---

# 4. Network Katmanları Neden Var?

Bir uygulamanın geliştiricisinin:

- Ethernet frame'ini,
- Router davranışını,
- IP routing'i,
- TCP retransmission'ı,
- Fiziksel sinyal iletimini

her seferinde kendisinin yönetmesi pratik olmazdı.

Katmanlı yapı sayesinde her bölüm belirli görevlerle ilgilenebilir.

Basitleştirilmiş:

```text
UYGULAMA
   │
   ▼
TAŞIMA
   │
   ▼
NETWORK
   │
   ▼
DATA LINK
   │
   ▼
FİZİKSEL İLETİM
```

Bu bir zihinsel modeldir.

Gerçek protokol implementasyonlarında sınırlar her zaman kusursuz biçimde ayrılmış olmak zorunda değildir.

---

# 5. OSI Modeli Nedir?

Network eğitimlerinde sık karşılaşacağın modellerden biri:

**OSI — Open Systems Interconnection**

modelidir.

OSI modeli yedi katmandan oluşur:

```text
7 ─ Application
6 ─ Presentation
5 ─ Session
4 ─ Transport
3 ─ Network
2 ─ Data Link
1 ─ Physical
```

Türkçe düşünürsek:

```text
7 ─ Uygulama
6 ─ Sunum
5 ─ Oturum
4 ─ Taşıma
3 ─ Ağ
2 ─ Veri Bağı
1 ─ Fiziksel
```

Bu model network iletişimini kavramsal olarak bölümlere ayırmamıza yardımcı olur.

> OSI modelini gerçek Internet'in birebir implementasyon şeması olarak düşünmemelisin. Özellikle eğitim, tasarım ve troubleshooting için kullanılan güçlü bir referans modelidir.

---

# 6. TCP/IP Modeli

Internet iletişimini açıklarken:

**TCP/IP model ailesi**

daha doğrudan kullanılabilir.

Basitleştirilmiş bir gösterim:

```text
APPLICATION
    │
    │ HTTP / DNS / SSH ...
    ▼
TRANSPORT
    │
    │ TCP / UDP
    ▼
INTERNET
    │
    │ IP / ICMP
    ▼
LINK
    │
    │ Ethernet / Wi-Fi
    ▼
NETWORK
```

OSI ile TCP/IP modeli birebir aynı katmanlara sahip değildir.

Ancak iki model de network davranışını anlamamıza yardımcı olur.

---

# 7. Encapsulation'ı Hatırlayalım

Ders 06'da encapsulation kavramını görmüştük.

Bir uygulama veri oluşturduğunda:

```text
APPLICATION DATA
       │
       ▼
TCP SEGMENT
       │
       ▼
IP PACKET
       │
       ▼
ETHERNET FRAME
       │
       ▼
BITS
```

gibi katmanlardan geçebilir.

Örneğin:

```text
[ HTTP ]

     ↓

[ TCP | HTTP ]

     ↓

[ IP | TCP | HTTP ]

     ↓

[ ETHERNET | IP | TCP | HTTP ]
```

Karşı tarafta ilgili protokol katmanları veriyi işler.

---

# 8. TCP Nedir?

**TCP — Transmission Control Protocol**

bağlantı yönelimli ve güvenilir byte-stream hizmeti sağlayan bir transport layer protokolüdür.

TCP'nin temel özellikleri:

- Bağlantı durumu oluşturur.
- Verinin sıralı teslimini sağlar.
- Kayıpları tespit edip yeniden iletim yapabilir.
- Duplicate verileri yönetebilir.
- Flow control uygular.
- Congestion control mekanizmaları kullanır.
- Port numaralarını kullanır.

Başlangıç seviyesinde:

> **TCP, iki endpoint arasında güvenilir ve sıralı bir byte akışı sağlamayı amaçlar.**

---

# 9. TCP "Güvenli" Bir Protokol Mü?

Buradaki:

**reliable — güvenilir**

kelimesi:

> "Kriptografik olarak güvenli"

anlamına gelmez.

TCP:

- Veriyi otomatik olarak şifrelemez.
- Sunucunun kimliğini doğrulamaz.
- Veriyi saldırganların okuyamayacağını garanti etmez.

TCP'nin güvenilirliği:

```text
Veri ulaştı mı?
Sırası doğru mu?
Kayıp oldu mu?
Tekrar gönderilmeli mi?
```

gibi transport sorunlarıyla ilgilidir.

Dolayısıyla:

```text
TCP reliability
       ≠
Cryptographic security
```

Bu ayrım çok önemlidir.

---

# 10. TCP Connection Nedir?

TCP iletişiminde iki endpoint arasında bağlantı durumu tutulur.

Bir TCP bağlantısını kabaca şu bilgilerle ilişkilendirebiliriz:

```text
Source IP
Source Port
Destination IP
Destination Port
Protocol = TCP
```

Örneğin:

```text
192.168.1.25:51542
        │
        │ TCP
        ▼
203.0.113.10:443
```

Burada:

```text
192.168.1.25 → Client IP

51542         → Client tarafındaki port

203.0.113.10  → Server IP

443           → Server tarafındaki port
```

olabilir.

Port kavramını birazdan ayrıntılı inceleyeceğiz.

---

# 11. TCP Three-Way Handshake

TCP bağlantısının başlangıcında taraflar bağlantı durumu oluşturmak ve başlangıç sequence bilgilerini senkronize etmek için:

**Three-Way Handshake**

kullanır.

Temel akış:

```text
CLIENT                             SERVER
   │                                  │
   │ ----------- SYN ---------------> │
   │                                  │
   │ <-------- SYN + ACK ------------ │
   │                                  │
   │ ----------- ACK ---------------> │
   │                                  │
   │      CONNECTION ESTABLISHED      │
```

---

# 12. SYN Nedir?

Client bağlantı başlatmak istediğinde:

```text
SYN
```

bayrağı bulunan TCP segmenti gönderir.

Kavramsal olarak:

```text
Client:

"TCP bağlantısı başlatmak istiyorum.
Başlangıç sequence bilgilerim bunlar."
```

---

# 13. SYN/ACK Nedir?

Server bağlantıyı kabul edebilecek durumdaysa:

```text
SYN + ACK
```

ile cevap verebilir.

Kavramsal olarak:

```text
Server:

"İsteğini aldım.
Benim başlangıç sequence bilgilerim de bunlar."
```

---

# 14. ACK Nedir?

Client, server'ın SYN mesajını onaylar:

```text
ACK
```

Sonrasında bağlantı established duruma geçebilir ve uygulama verileri taşınabilir.

Ancak:

> Three-Way Handshake sırasında uygulama seviyesindeki kimlik doğrulamanın tamamlandığı anlamına gelmez.

Örneğin HTTPS için bundan sonra TLS handshake gerçekleşebilir.

---

# 15. Sequence Number Nedir?

TCP'nin veriyi sıralı biçimde yönetebilmesi için:

**sequence number**

mekanizması kullanılır.

TCP bir:

**byte stream**

protokolüdür.

Bu nedenle sequence number'lar:

> "Bu kaçıncı paket?"

sorusundan ziyade byte akışındaki konumlarla ilişkilidir.

Basitleştirilmiş olarak:

```text
Gönderilen veri:

ABCDEFGH

Byte konumları takip edilir
        │
        ▼
Alıcı hangi byte'ları aldığını bilir
```

Bu mekanizma:

- Sıralama
- Kayıp tespiti
- Yeniden iletim

işlemlerine yardımcı olur.

---

# 16. ACK — Acknowledgment

TCP alıcısı aldığı verileri:

**ACK**

mekanizmasıyla onaylayabilir.

Basitleştirilmiş olarak:

```text
SENDER
   │
   │ Veri
   ▼
RECEIVER
   │
   │ ACK
   ▼
SENDER
```

ACK değeri genel olarak alıcının sırada beklediği bir sonraki byte'la ilişkilidir.

Gerçek TCP davranışı:

- Cumulative ACK
- Delayed ACK
- Selective Acknowledgment
- Retransmission

gibi daha gelişmiş mekanizmalar içerebilir.

Bunları ileri network derslerine bırakacağız.

---

# 17. TCP'de Veri Kaybolursa Ne Olur?

Network üzerinde paket kaybı olabilir.

TCP kayıp olduğunu çeşitli mekanizmalarla algılayabilir ve eksik veriyi yeniden gönderebilir.

Kavramsal olarak:

```text
Segment A ───────────────► Alındı

Segment B ───── X         Kayboldu

Segment C ───────────────► Alındı

          ↓

Kayıp tespit edildi

          ↓

Segment B yeniden iletilebilir
```

Buna:

**Retransmission**

denir.

Bu, TCP'nin güvenilirlik mekanizmalarından biridir.

---

# 18. Flow Control Nedir?

Alıcı tarafın işleyebileceğinden daha hızlı veri gönderilmesini sınırlamak için TCP:

**flow control**

mekanizmalarından yararlanır.

Alıcı, ne kadar veri kabul edebileceğiyle ilişkili:

**receive window**

bilgisi sağlayabilir.

Basitleştirilmiş olarak:

```text
SENDER
   │
   │ "Ne kadar gönderebilirim?"
   ▼
RECEIVER
   │
   │ Receive Window
   ▼
SENDER
```

Amaç alıcının buffer kapasitesini aşmamaktır.

---

# 19. Congestion Control Nedir?

Flow control alıcının kapasitesiyle ilgilenirken:

**Congestion Control**

network'ün taşıma koşullarıyla ilgilidir.

Network yoğun olduğunda aşırı veri göndermek:

- Packet loss
- Queueing
- Gecikme

gibi sorunları artırabilir.

TCP farklı congestion control algoritmaları kullanarak gönderim hızını ağ koşullarına göre ayarlamaya çalışabilir.

Bu nedenle:

```text
Flow Control       → Receiver ile ilişkili

Congestion Control → Network koşullarıyla ilişkili
```

şeklinde temel bir ayrım yapabiliriz.

---

# 20. TCP Bağlantısı Nasıl Kapanır?

TCP bağlantısının kurulması gibi kontrollü kapatılması da mümkündür.

Burada:

```text
FIN
ACK
```

bayrakları kullanılabilir.

Basitleştirilmiş bir kapanış:

```text
A                B
│                │
│ ---- FIN ----> │
│ <--- ACK ----- │
│ <--- FIN ----- │
│ ---- ACK ----> │
```

Her kapanış tam olarak bu basit sırada görünmek zorunda değildir.

Ayrıca:

```text
RST
```

ile bağlantının resetlenmesi gibi durumlar olabilir.

Ders 08'de port durumları incelerken SYN, ACK ve RST tekrar karşımıza çıkacak.

---

# 21. UDP Nedir?

**UDP — User Datagram Protocol**

connectionless bir transport layer protokolüdür.

UDP:

- TCP gibi connection state oluşturmaz.
- Three-Way Handshake kullanmaz.
- Teslimatı garanti etmez.
- Sıralı teslimatı garanti etmez.
- TCP benzeri yerleşik retransmission sağlamaz.
- Daha küçük ve basit bir protocol header'a sahiptir.
- Port numaralarını kullanır.

Başlangıç seviyesinde:

> **UDP, datagram tabanlı, daha basit ve bağlantısız bir transport protokolüdür.**

---

# 22. UDP Güvenilmez Olduğu İçin Kötü Müdür?

Hayır.

UDP'nin daha az garanti sağlaması onu:

> "Kötü protokol"

yapmaz.

Bazı uygulamalar güvenilirlik mekanizmalarını kendileri uygulayabilir veya düşük gecikmeyi tercih edebilir.

UDP:

- DNS
- DHCP
- Bazı realtime uygulamalar
- Bazı oyun protokolleri
- QUIC

gibi alanlarda kullanılabilir.

Özellikle:

**QUIC**

UDP üzerinde güvenilirlik, bağlantı yönetimi ve güvenlik gibi gelişmiş özellikler sağlayabilir.

Dolayısıyla:

```text
UDP = Güvenilmez ve kötü

TCP = Güvenli ve iyi
```

şeklinde düşünmek yanlıştır.

---

# 23. TCP ve UDP Karşılaştırması

| Özellik | TCP | UDP |
|---|---|---|
| Model | Connection-oriented | Connectionless |
| Veri yaklaşımı | Byte stream | Datagram |
| Three-Way Handshake | Var | Yok |
| Sıralı teslim | Sağlar | Garanti etmez |
| Retransmission | Yerleşik | TCP benzeri yerleşik mekanizma yok |
| Flow Control | Var | Yok |
| Congestion Control | Var | Protokolün kendisinde TCP benzeri yok |
| Header yapısı | Daha kapsamlı | Daha basit |
| Port kullanımı | Var | Var |

> Bir uygulamanın performansı yalnızca TCP veya UDP seçimine bağlı değildir.

---

# 24. Port Nedir?

Bir bilgisayarda aynı anda birçok network uygulaması çalışabilir.

IP adresi bize:

> Hangi host/interface?

sorusunda yardımcı olur.

Ancak aynı host üzerindeki hangi transport endpoint'ine ulaşacağımızı da ayırt etmemiz gerekir.

TCP ve UDP burada:

**port number**

kullanır.

Port numarası:

```text
0 - 65535
```

aralığında 16-bit bir değerdir.

Örneğin:

```text
192.168.1.50:443
```

gösteriminde:

```text
192.168.1.50 → IP

443          → Port
```

---

# 25. Port Fiziksel Bir Giriş Mi?

Hayır.

Buradaki port:

```text
TCP / UDP port
```

kavramıdır.

Bu:

- USB portu,
- Ethernet fiziksel portu,
- HDMI portu

ile aynı şey değildir.

Network portu işletim sisteminin transport layer endpoint'lerini ayırt etmesine yardımcı olan mantıksal numaradır.

---

# 26. TCP 53 ile UDP 53 Aynı Port Mu?

Port numarası namespace'i transport protokolüne bağlıdır.

Dolayısıyla:

```text
TCP 53
```

ve:

```text
UDP 53
```

aynı transport endpoint'i değildir.

Benzer şekilde:

```text
TCP 443
```

ile:

```text
UDP 443
```

farklı transport protokollerine aittir.

Bu ayrım özellikle servis ve firewall analizinde önemlidir.

---

# 27. Client Portu Nereden Gelir?

Bir web sitesine bağlandığında client genellikle kendi tarafında geçici bir:

**ephemeral port**

kullanır.

Örneğin:

```text
CLIENT
192.168.1.25:53142
        │
        │ TCP
        ▼
SERVER
203.0.113.10:443
```

Server yaygın olarak bilinen servis portunda dinleyebilir.

Client ise işletim sistemi tarafından seçilen geçici bir port kullanabilir.

Ephemeral port aralıkları işletim sistemine göre değişebilir.

Bu nedenle:

> Client her zaman 443 portunu kendi tarafında kullanır.

demek yanlış olur.

---

# 28. Socket Nedir?

Ders 05 ve 06'da socket kavramına giriş yapmıştık.

Bir network socket'ini başlangıç seviyesinde:

> Process'in işletim sisteminin network stack'i üzerinden iletişim kurduğu endpoint

olarak düşünebiliriz.

Bir TCP bağlantısı iki endpoint'in bilgileriyle tanımlanabilir:

```text
Local IP
Local Port

Remote IP
Remote Port

Protocol
```

Örneğin:

```text
TCP
192.168.1.25:53142
        ↕
203.0.113.10:443
```

Bu ilişki güvenlik analizinde çok önemlidir.

---

# 29. HTTP Nedir?

**HTTP — Hypertext Transfer Protocol**

web üzerinde istemci ve sunucu arasında kaynakların ve mesajların aktarımında kullanılan application layer protokolüdür.

Temel model:

```text
CLIENT
   │
   │ HTTP Request
   ▼
SERVER
   │
   │ HTTP Response
   ▼
CLIENT
```

Örneğin browser:

```text
GET /
```

isteği gönderebilir.

Sunucu:

```text
200 OK
```

ile cevap verebilir.

---

# 30. Basit Bir HTTP Request

Kavramsal bir HTTP/1.1 isteği:

```http
GET /index.html HTTP/1.1
Host: example.com
User-Agent: ExampleBrowser
Accept: text/html
```

Burada:

```text
GET
```

HTTP metodudur.

```text
/index.html
```

istenen kaynaktır.

```text
Host
User-Agent
Accept
```

gibi alanlar HTTP header'larıdır.

---

# 31. Basit Bir HTTP Response

Sunucu örneğin:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>
...
</html>
```

şeklinde cevap verebilir.

Response genel olarak:

- Status
- Headers
- Optional body

içerebilir.

Bu yapı web security öğrenirken çok önemli olacak.

---

# 32. HTTP Metotları

Yaygın HTTP metotlarından bazıları:

```text
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

Ancak önemli bir düzeltme:

> Bir HTTP metodunun gerçek davranışını uygulama belirler.

Örneğin:

```text
POST = Her zaman kullanıcı girişi
```

değildir.

POST genel amaçlı olarak sunucuya bir request body göndermek gibi işlemlerde kullanılabilir.

Benzer şekilde DELETE isteğinin sunucu tarafından gerçekten bir kaynağı silmesi uygulamanın implementasyonuna ve yetkilendirmesine bağlıdır.

---

# 33. HTTP Status Code'ları

HTTP response status code'ları beş temel sınıfa ayrılır:

```text
1xx → Informational

2xx → Successful

3xx → Redirection

4xx → Client Error

5xx → Server Error
```

Yaygın örnekler:

```text
200 OK

201 Created

301 Moved Permanently

302 Found

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

502 Bad Gateway

503 Service Unavailable
```

Burada ilginç bir terminoloji noktası vardır:

```text
401 Unauthorized
```

adı tarihsel olarak böyle olsa da genellikle authentication ile ilişkili durumlarda görülür.

```text
403 Forbidden
```

ise server isteği anladığı hâlde erişime izin vermediği durumlarla ilişkilidir.

Gerçek uygulama davranışları değişebilir.

---

# 34. HTTP Şifreli Midir?

Klasik plain HTTP kendi başına transport üzerindeki içeriği şifrelemez.

Bir ağ gözlem noktası uygun koşullarda:

```text
GET /...
Host: ...
Cookie: ...
Response Body
```

gibi HTTP içeriğini görebilir.

Bu nedenle hassas web iletişiminde:

**HTTPS**

kullanılır.

---

# 35. HTTPS Nedir?

HTTPS ayrı bir web uygulama protokolü gibi düşünülse de temel olarak:

> **HTTP'nin TLS ile korunan iletişim üzerinden kullanılmasıdır.**

Klasik HTTP/1.1 veya HTTP/2 senaryosunda:

```text
HTTP
 │
 ▼
TLS
 │
 ▼
TCP
 │
 ▼
IP
```

gibi bir yapı görülebilir.

Ancak modern web için önemli bir istisna vardır:

**HTTP/3**

---

# 36. HTTP/3 Neden Önemli?

HTTP/3:

**QUIC**

üzerinden çalışır.

QUIC ise:

```text
UDP
```

üzerinde çalışır ve TLS 1.3 güvenliğini protokol tasarımına entegre eder.

Kavramsal olarak:

```text
HTTP/1.1 / HTTP/2
        │
        ▼
       TLS
        │
        ▼
       TCP
        │
        ▼
        IP
```

ancak:

```text
HTTP/3
   │
   ▼
 QUIC + TLS
   │
   ▼
   UDP
   │
   ▼
   IP
```

Dolayısıyla:

> **HTTPS her zaman TCP kullanır.**

demek artık doğru değildir.

Modern HTTPS trafiği:

```text
TCP 443
```

veya HTTP/3 kullanıldığında yaygın olarak:

```text
UDP 443
```

üzerinden görülebilir.

---

# 37. TLS Nedir?

**TLS — Transport Layer Security**

network uygulamalarına kriptografik güvenlik sağlayan protokoldür.

TLS temel olarak:

- Confidentiality — Gizlilik
- Integrity — Bütünlük
- Authentication — Kimlik doğrulama

özellikleri sağlamaya yardımcı olur.

Basitleştirilmiş olarak:

```text
CLIENT
   │
   │ TLS
   ▼
ŞİFRELİ / KORUNAN KANAL
   │
   ▼
SERVER
```

---

# 38. TLS Yalnızca Şifreleme Mıdır?

Hayır.

TLS'in önemli amaçları arasında:

### Gizlilik

Ağ üzerindeki başka tarafların uygulama verisini doğrudan okuyamamasını sağlamaya yardımcı olur.

### Bütünlük

Verinin iletişim sırasında fark edilmeden değiştirilmesini engellemeye/detect etmeye yardımcı olur.

### Kimlik Doğrulama

Özellikle HTTPS kullanımında server kimliğinin sertifikalar aracılığıyla doğrulanmasına yardımcı olur.

Bu nedenle:

```text
TLS = Sadece encryption
```

eksik bir tanımdır.

---

# 39. TLS Certificate Nedir?

HTTPS bağlantılarında server genellikle:

**Digital Certificate — Dijital Sertifika**

sunar.

Sertifika:

- Domain/identity bilgileri,
- Public key,
- Geçerlilik bilgileri,
- Issuer bilgisi,
- Dijital imza

gibi alanlar içerebilir.

Client sertifikanın güvenilirliğini değerlendirirken:

- İsim/domain eşleşmesini,
- Geçerlilik süresini,
- Sertifika zincirini,
- Güvenilen CA'ları,
- İmzaları

kontrol edebilir.

Basitleştirilmiş olarak:

```text
SERVER
   │
   ▼
CERTIFICATE
   │
   ▼
CLIENT
   │
   ├── Domain doğru mu?
   ├── Süre geçerli mi?
   ├── Chain güvenilir mi?
   └── Signature geçerli mi?
```

Gerçek TLS doğrulaması bundan daha ayrıntılıdır.

---

# 40. HTTPS Site Güvenlidir Demek Mi?

Hayır.

HTTPS:

> Client ile server arasındaki iletişimin korunmasına

yardımcı olur.

Ancak HTTPS kullanan bir site:

- Phishing sitesi olabilir.
- Malware dağıtabilir.
- SQL injection açığı içerebilir.
- XSS açığı içerebilir.
- Yetkilendirme hataları içerebilir.
- Kullanıcıyı dolandırabilir.

Yani:

```text
HTTPS
  ≠
Site güvenilirdir
```

HTTPS bize esas olarak bağlantı güvenliği ve doğrulanan domain endpoint'i hakkında güvence sağlamaya çalışır; sitenin niyetini garanti etmez.

---

# 41. DNS Nedir?

**DNS — Domain Name System**

Internet üzerinde isimlerin çeşitli DNS kayıtlarıyla eşleştirilmesini sağlayan dağıtık ve hiyerarşik bir sistemdir.

DNS'i yalnızca:

```text
Domain → IP
```

olarak tanımlamak eksiktir.

DNS farklı kayıt türleri tutabilir.

Örneğin:

```text
A       → IPv4 adresi

AAAA    → IPv6 adresi

CNAME   → Alias / canonical name ilişkisi

MX      → Mail server bilgisi

NS      → Authoritative name server

TXT     → Metinsel veri

PTR     → Reverse DNS ile ilişkili kayıt
```

---

# 42. DNS Sorgusu Nasıl Çalışır?

Bilgisayarın:

```text
www.example.com
```

adresine ulaşmak istiyor.

Basitleştirilmiş olarak:

```text
APPLICATION
    │
    ▼
OS / DNS RESOLVER
    │
    ▼
RECURSIVE DNS RESOLVER
    │
    ▼
DNS CEVABI
    │
    ▼
IP ADDRESS
```

Ancak recursive resolver cevabı önbelleğinde bilmiyorsa DNS hiyerarşisinde farklı server'larla iletişim kurabilir.

---

# 43. DNS Hiyerarşisi

Basitleştirilmiş olarak:

```text
             ROOT DNS
                │
                ▼
          TLD NAME SERVER
            (.com gibi)
                │
                ▼
       AUTHORITATIVE SERVER
                │
                ▼
          DNS RECORD
```

Örneğin resolver:

```text
www.example.com
```

için gerekli authoritative kaynağa ulaşmaya çalışabilir.

Ancak caching nedeniyle her sorguda bütün bu adımların gerçekleşmesi gerekmez.

---

# 44. DNS Cache Nedir?

DNS cevapları belirli bir süre:

**cache**

içerisinde tutulabilir.

Her DNS kaydıyla ilişkili:

**TTL — Time To Live**

değeri bulunabilir.

Bu TTL, Ders 06'daki IP packet TTL alanıyla aynı kavram değildir.

Burada:

```text
DNS TTL
```

bir DNS kaydının ne kadar süre cache'lenebileceğiyle ilişkilidir.

Dolayısıyla:

```text
IP TTL  ≠ DNS TTL
```

İsimleri aynı olsa da görevleri farklıdır.

---

# 45. DNS Her Zaman UDP 53 Mü Kullanır?

Hayır.

Klasik DNS:

```text
UDP 53
```

ve:

```text
TCP 53
```

kullanabilir.

Modern şifreli DNS yöntemleri de vardır.

Örneğin:

**DNS over HTTPS — DoH**

DNS mesajlarını HTTPS üzerinden taşıyabilir.

**DNS over TLS — DoT**

genellikle:

```text
TCP 853
```

üzerinden TLS ile DNS taşıyabilir.

Dolayısıyla:

> "DNS trafiği görmüyorsam cihaz DNS kullanmıyor."

sonucuna yalnızca UDP 53'e bakarak varamayız.

---

# 46. DNS Neden Siber Güvenlik İçin Önemlidir?

Birçok network iletişiminden önce domain çözümlemesi gerçekleşebilir.

Bu nedenle DNS logları bize:

```text
Hangi cihaz?

Hangi domain'i?

Ne zaman sorguladı?

Hangi cevap döndü?
```

gibi önemli bilgiler sağlayabilir.

Malware de DNS kullanabilir.

Ancak:

```text
Şüpheli domain sorgusu
        ≠
Kesin compromise
```

Tekrar bağlam gerekir.

---

# 47. DHCP Nedir?

**DHCP — Dynamic Host Configuration Protocol**

cihazlara otomatik network yapılandırması sağlayan protokoldür.

DHCP ile client örneğin:

- IPv4 adresi
- Subnet mask
- Default gateway
- DNS server
- Lease bilgileri

alabilir.

Her cihazın IP ayarlarını manuel yapmak yerine DHCP büyük kolaylık sağlar.

---

# 48. DHCP DORA Süreci

IPv4 DHCP için başlangıç seviyesinde önemli bir süreç:

**DORA**

şeklinde hatırlanır.

```text
D → Discover

O → Offer

R → Request

A → Acknowledgment
```

Akış:

```text
CLIENT                           DHCP SERVER
   │                                  │
   │ ------ DHCP DISCOVER ----------> │
   │                                  │
   │ <------- DHCP OFFER ------------ │
   │                                  │
   │ ------ DHCP REQUEST -----------> │
   │                                  │
   │ <------- DHCP ACK -------------- │
```

---

# 49. DHCP Discover Nasıl Server'ı Buluyor?

Yeni bağlanan bir client henüz geçerli IPv4 yapılandırmasına sahip olmayabilir.

Bu nedenle DHCP başlangıç mesajlarında broadcast mekanizmalarından yararlanabilir.

Klasik DHCPv4 için:

```text
UDP 68 → Client

UDP 67 → Server
```

portları kullanılır.

Ancak DHCP relay gibi mekanizmalar sayesinde DHCP server aynı broadcast domain içerisinde olmak zorunda değildir.

Bu, kurumsal networklerde oldukça yaygındır.

---

# 50. ICMP Nedir?

**ICMP — Internet Control Message Protocol**

IP ağlarında kontrol ve hata bildirimi için kullanılan protokoldür.

ICMP:

```text
TCP değil

UDP değil
```

IP ile doğrudan ilişkilidir.

En bilinen kullanım örneklerinden biri:

**ping**

komutudur.

---

# 51. Ping Nasıl Çalışır?

Bir IPv4 hedefe:

```bash
ping 8.8.8.8
```

gönderdiğinde yaygın olarak:

```text
ICMP Echo Request
```

gönderilir.

Hedef cevap verirse:

```text
ICMP Echo Reply
```

alınabilir.

```text
HOST A
   │
   │ Echo Request
   ▼
HOST B
   │
   │ Echo Reply
   ▼
HOST A
```

Ancak:

> Ping cevap vermedi = Sistem kesinlikle kapalı

diyemeyiz.

Firewall veya sistem politikası ICMP Echo'yu engelliyor olabilir.

---

# 52. ICMP ve Traceroute

Ders 06'da IP TTL kavramını görmüştük.

Traceroute/tracert araçları TTL/Hop Limit davranışından yararlanarak yol üzerindeki router'lar hakkında bilgi toplamaya çalışabilir.

Kavramsal olarak:

```text
TTL 1 → Router 1

TTL 2 → Router 2

TTL 3 → Router 3
```

TTL sona erdiğinde router:

```text
ICMP Time Exceeded
```

mesajı gönderebilir.

Farklı işletim sistemlerinde traceroute uygulaması farklı probe türleri kullanabilir.

Bu nedenle:

> traceroute yalnızca ICMP Echo kullanır

şeklinde genelleme yapmamalıyız.

---

# 53. SSH Nedir?

**SSH — Secure Shell**

uzak sistemlerde güvenli terminal erişimi ve başka güvenli servisler sağlayan application layer protokolüdür.

Yaygın olarak:

```text
TCP 22
```

portuyla ilişkilidir.

Örneğin:

```text
CLIENT
   │
   │ SSH
   ▼
SERVER
   │
   ▼
REMOTE SHELL
```

SSH:

- Şifreli iletişim,
- Server authentication,
- Kullanıcı authentication,
- Integrity

gibi güvenlik özellikleri sağlar.

---

# 54. SSH Authentication

SSH farklı authentication mekanizmalarını destekleyebilir.

Örneğin:

```text
Password

Public Key Authentication

Diğer yapılandırılmış yöntemler
```

Public key authentication kullanımında:

```text
PRIVATE KEY
```

client tarafında dikkatle korunmalıdır.

Server tarafında ise ilgili public key yetkilendirilmiş olabilir.

> Public key'in bilinmesi private key'in paylaşılması anlamına gelmez.

Kriptografiyi ilerleyen derslerde ayrıntılı inceleyeceğiz.

---

# 55. FTP Nedir?

**FTP — File Transfer Protocol**

dosya transferi için tasarlanmış eski uygulama katmanı protokollerinden biridir.

FTP kontrol bağlantısıyla yaygın olarak:

```text
TCP 21
```

portu ilişkilidir.

FTP'nin veri aktarımı ayrıca ayrı bağlantılar kullanabilir.

Bu nedenle:

> "FTP yalnızca port 21'den ibarettir."

demek eksiktir.

Classic FTP ayrıca varsayılan olarak:

- Credential'ları,
- Veriyi

kriptografik olarak korumaz.

Bu nedenle güvenilmeyen ağlarda plain FTP güvenli değildir.

---

# 56. FTPS ve SFTP Aynı Şey Mi?

Hayır.

Bu çok sık karıştırılır.

```text
FTP
└── File Transfer Protocol

FTPS
└── FTP + TLS

SFTP
└── SSH File Transfer Protocol
```

SFTP, FTP'nin TLS eklenmiş hâli değildir.

SFTP:

**SSH**

üzerinden çalışan ayrı bir dosya transfer protokolüdür.

Yaygın olarak:

```text
TCP 22
```

ile ilişkilidir.

---

# 57. SMTP Nedir?

**SMTP — Simple Mail Transfer Protocol**

e-posta gönderimi ve mail server'lar arasında mesaj aktarımı için kullanılan protokoldür.

Yaygın portlar:

```text
TCP 25  → Server-to-server SMTP için yaygın

TCP 587 → Message submission için yaygın

TCP 465 → Implicit TLS submission ile yaygın
```

Ancak port kullanımı servis yapılandırmasına göre değişebilir.

SMTP:

> Kullanıcının gelen kutusunu senkronize etmek

için tasarlanmış temel protokol değildir.

Bu görevlerde IMAP veya POP3 kullanılabilir.

---

# 58. IMAP Nedir?

**IMAP — Internet Message Access Protocol**

e-postaların server üzerinde tutulduğu ve client'ların mailbox ile senkronize çalışabildiği bir protokoldür.

Yaygın portlar:

```text
TCP 143 → IMAP / STARTTLS kullanılabilir

TCP 993 → Implicit TLS ile IMAP
```

Modern kullanıcılar birden fazla cihazdan aynı mailbox'a eriştiğinde IMAP tarzı senkronizasyon avantaj sağlar.

---

# 59. POP3 Nedir?

**POP3 — Post Office Protocol Version 3**

mail mesajlarını client'a almak için kullanılan protokollerden biridir.

Yaygın portlar:

```text
TCP 110 → POP3 / STARTTLS kullanılabilir

TCP 995 → Implicit TLS ile POP3
```

POP3 klasik kullanım modelinde mesajların client'a indirilmesine daha fazla odaklanır.

Ancak gerçek davranış client ve server yapılandırmasına bağlıdır.

Örneğin mesajlar server üzerinde bırakılabilir.

Bu nedenle:

```text
POP3 = Mail mutlaka server'dan silinir
```

demek doğru değildir.

---

# 60. IMAP ve POP3 Arasındaki Temel Fark

Basitleştirilmiş olarak:

```text
IMAP
│
└── Server üzerindeki mailbox ile
    senkronize çalışma odaklı


POP3
│
└── Mesajları client'a alma
    odaklı
```

Modern e-posta altyapılarında ayrıca:

- Web API'leri,
- Vendor-specific protokoller,
- Cloud mail hizmetleri

kullanılabilir.

Yani modern e-posta:

```text
SMTP + IMAP
```

ile sınırlı değildir.

---

# 61. Yaygın Protokoller ve Portlar

Aşağıdaki tablo ezber listesi değil, referans olarak kullanılmalıdır.

| Servis / Protokol | Yaygın Port | Transport |
|---|---:|---|
| FTP Control | 21 | TCP |
| SSH / SFTP | 22 | TCP |
| SMTP | 25 | TCP |
| DNS | 53 | UDP / TCP |
| DHCP Server | 67 | UDP |
| DHCP Client | 68 | UDP |
| HTTP | 80 | TCP |
| POP3 | 110 | TCP |
| IMAP | 143 | TCP |
| HTTPS (HTTP/1.1, HTTP/2) | 443 | TCP |
| HTTPS / HTTP/3 | 443 | UDP |
| POP3S | 995 | TCP |
| IMAPS | 993 | TCP |
| DNS over TLS | 853 | TCP |

Bu değerler:

**default / conventional ports**

olarak düşünülmelidir.

---

# 62. Port Numarası Servisi Kesin Olarak Gösterir Mi?

Hayır.

Bu siber güvenlik açısından kritik bir noktadır.

Bir program isterse:

```text
SSH → TCP 2222
```

üzerinde dinleyebilir.

Bir web server:

```text
TCP 8080
```

üzerinde çalışabilir.

Hatta kötü amaçlı bir program:

```text
TCP 443
```

kullanabilir ama HTTPS konuşmayabilir.

Dolayısıyla:

```text
Port 443 açık
      │
      ≠
Kesin HTTPS
```

Ders 08'de bu yüzden:

**Service Detection**

kavramını öğreneceğiz.

---

# 63. Bir Web Sitesine Bağlandığında Gerçekte Ne Olur?

Tarayıcıya:

```text
https://example.com
```

yazdığını düşün.

Klasik HTTP/2 üzerinden HTTPS senaryosunu basitleştirelim:

```text
1. Browser URL'yi işler.

2. DNS çözümleme gerekir.

3. example.com için IP bulunur.

4. İşletim sistemi routing yapar.

5. Gerekirse ARP / NDP kullanılır.

6. Server IP'sine TCP connection başlatılır.

7. TCP Three-Way Handshake yapılır.

8. TLS handshake gerçekleştirilir.

9. Server certificate doğrulanır.

10. Şifreli kanal oluşturulur.

11. HTTP request gönderilir.

12. HTTP response alınır.

13. Browser içeriği işler.
```

Şema:

```text
DOMAIN
  │
  ▼
DNS
  │
  ▼
IP
  │
  ▼
ROUTING
  │
  ▼
TCP HANDSHAKE
  │
  ▼
TLS HANDSHAKE
  │
  ▼
HTTP REQUEST
  │
  ▼
HTTP RESPONSE
```

---

# 64. HTTP/3 Kullanılırsa Ne Değişir?

HTTP/3 durumunda TCP kullanılmaz.

Basitleştirilmiş olarak:

```text
DOMAIN
  │
  ▼
DNS
  │
  ▼
IP
  │
  ▼
UDP
  │
  ▼
QUIC + TLS 1.3
  │
  ▼
HTTP/3
```

Bu nedenle network analizi yaparken modern protokol gelişmelerini göz önünde bulundurmak gerekir.

---

# 65. Protokol ile Servis Aynı Şey Mi?

Tam olarak değil.

**Protocol** iletişim kurallarını tanımlar.

**Service** ise bir sistemin network üzerinden sunduğu işlevdir.

Örneğin:

```text
Web Service
    │
    └── HTTP kullanabilir

Remote Administration Service
    │
    └── SSH kullanabilir
```

Ancak servis implementasyonu:

```text
Apache
Nginx
OpenSSH
IIS
```

gibi belirli yazılımlar olabilir.

Bu ayrım Ders 08'de çok önemli olacak:

```text
PORT
  │
  ▼
PROTOCOL
  │
  ▼
SERVICE
  │
  ▼
SOFTWARE / VERSION
```

---

# 66. Şifreli Trafikte Analist Ne Görebilir?

HTTPS/TLS kullanıldığında uygulama verisinin önemli bölümü şifrelenir.

Ancak bu:

> "Analist hiçbir şey göremez."

anlamına gelmez.

Gözlem noktasına ve kullanılan protokole bağlı olarak şu metadata'ların bazıları görülebilir:

```text
Source IP

Destination IP

Source Port

Destination Port

Transport Protocol

Connection Timing

Packet Sizes

Data Volume
```

Bazı TLS/DNS senaryolarında domain ile ilişkili ek metadata da görülebilir; ancak modern gizlilik teknolojileri görünürlüğü değiştirebilir.

Örneğin:

- DoH
- Encrypted Client Hello
- VPN
- QUIC

gibi teknolojiler ağ görünürlüğünü etkileyebilir.

---

# 67. Encryption Network Analizini Bitirir Mi?

Hayır.

Şifreleme payload görünürlüğünü azaltabilir fakat:

```text
Kim konuşuyor?

Ne zaman konuşuyor?

Ne kadar konuşuyor?

Hangi process bağlantıyı açtı?

Hangi IP'ye gidiyor?

Bağlantı ne sıklıkta tekrarlanıyor?
```

gibi sorular hâlâ anlamlı olabilir.

Endpoint telemetry ile network telemetry birlikte kullanıldığında daha güçlü analiz yapılabilir.

Örneğin:

```text
EDR
 │
 └── Process → Connection

Firewall
 │
 └── Source → Destination

DNS
 │
 └── Host → Domain
```

verileri korele edilebilir.

---

# 68. Network Protokolleri Neden Güvenlik İçin Önemlidir?

Bir güvenlik analisti şu trafiği gördüğünü düşün:

```text
192.168.1.25:53142
        │
        │ TCP
        ▼
203.0.113.50:443
```

İlk bakışta şunları biliyoruz:

```text
Source IP

Source Port

Destination IP

Destination Port

Transport Protocol
```

Ancak henüz şunları kesin bilmiyoruz:

```text
Gerçek uygulama protokolü HTTPS mi?

Hangi process bağlantıyı açtı?

Hangi domain ile ilişkili?

Ne kadar veri aktarıldı?

Bağlantının amacı neydi?

Server kim?

TLS sertifikası ne gösteriyor?
```

İşte network analizi bu ek bağlamı toplamaya çalışır.

---

# 69. Malware ve Protokoller

Malware normal network protokollerini kullanabilir.

Örneğin:

```text
MALICIOUS PROCESS
       │
       ▼
      DNS
       │
       ▼
   DOMAIN NAME
       │
       ▼
      HTTPS
       │
       ▼
REMOTE INFRASTRUCTURE
```

Bu trafik dışarıdan bakıldığında normal web trafiğine benzeyebilir.

Saldırganların meşru protokolleri kullanması:

> Protokolün kendisinin kötü amaçlı olduğu

anlamına gelmez.

Analistin değerlendirdiği şey:

**bağlam ve davranıştır.**

---

# 70. DNS Tunneling Kavramına İlk Bakış

DNS normalde isim çözümleme amacıyla kullanılır.

Ancak bazı saldırı teknikleri DNS mesajlarının alanlarını farklı veri iletişimi amaçlarıyla kötüye kullanabilir.

Bu tür teknikler genel olarak:

**DNS Tunneling**

ile ilişkilendirilebilir.

Bu derste tekniğin uygulanmasına girmiyoruz.

Şimdilik önemli olan:

> **Meşru bir protokol, tasarım amacı dışında kötüye kullanılabilir.**

Bu prensibi ilerleyen güvenlik derslerinde tekrar göreceğiz.

---

# 71. Bir Güvenlik Analisti Gibi Düşün

Aşağıdaki network olayını gördüğünü düşün:

```text
Process:
unknown.exe

Local:
192.168.1.25:51844

Remote:
203.0.113.50:443

Transport:
TCP

Duration:
2 hours

Connections:
Every 60 seconds
```

Port 443 gördüğümüz için:

> "Normal HTTPS trafiği."

diyemeyiz.

Analist şunları sorabilir:

```text
TLS handshake var mı?

Certificate bilgisi nedir?

SNI/domain bilgisi mevcut mu?

DNS sorgusu neydi?

Process nereden çalışıyor?

Parent process ne?

Dosya hash'i ne?

Bağlantı neden tam 60 saniyede bir tekrarlanıyor?

Ne kadar veri aktarılıyor?

Diğer endpoint'lerde aynı davranış var mı?
```

Düzenli aralıklarla tekrar eden bağlantılar bazı durumlarda:

**beaconing**

araştırmalarında ilginç olabilir.

Ancak periyodik bağlantı tek başına malware kanıtı değildir; meşru update ve monitoring sistemleri de benzer davranabilir.

---

# 🧪 Uygulama 07 — Network Protokollerini Gözlemle

Bu uygulamada yalnızca kendi bilgisayarını ve kullanma yetkin bulunan sistemleri incele.

Amacımız trafik saldırısı veya tarama yapmak değil, normal network iletişimini gözlemlemektir.

---

## Görev 1 — DNS Sorgusu Yap

### Windows / Linux / macOS

Sisteminde `nslookup` varsa:

```bash
nslookup example.com
```

çalıştır.

Şunları bulmaya çalış:

```text
Kullanılan DNS Server:

____________________________________

Sorgulanan Domain:

____________________________________

Dönen IPv4 / IPv6 Adresleri:

____________________________________
```

Bir domain'in birden fazla IP adresi döndürebileceğini gözlemleyebilirsin.

---

# 🧪 Görev 2 — DNS Record Türlerini İncele

Windows PowerShell:

```powershell
Resolve-DnsName example.com
```

Linux/macOS üzerinde `dig` kuruluysa:

```bash
dig example.com
```

kullanabilirsin.

Şu record türlerini araştır:

```text
A

AAAA

MX

NS
```

Her domain'in bütün record türlerine sahip olması gerekmez.

---

# 🧪 Görev 3 — Ping ile ICMP'yi Gözlemle

Kendi loopback adresini:

```bash
ping 127.0.0.1
```

ile test edebilirsin.

Daha sonra Internet erişimin varsa örnek olarak:

```bash
ping 1.1.1.1
```

deneyebilirsin.

Bazı ağlar ICMP Echo'yu engelleyebilir.

Şunları gözlemle:

```text
Gönderilen:

____________________________________

Alınan:

____________________________________

Packet Loss:

____________________________________

Latency:

____________________________________
```

Ping başarısızsa:

> "Hedef kapalı."

sonucuna hemen varma.

---

# 🧪 Görev 4 — Bir HTTPS Bağlantısını İncele

Tarayıcıda:

```text
https://example.com
```

adresini aç.

Tarayıcının adres çubuğundaki site/connection bilgilerini kullanarak sertifika bilgilerine ulaşmaya çalış.

Şunları gözlemle:

```text
Domain:

____________________________________

Certificate Subject / Domain:

____________________________________

Issuer:

____________________________________

Valid From:

____________________________________

Valid To:

____________________________________
```

Tarayıcı arayüzü ve gösterilen alanlar sürüme göre değişebilir.

---

# 🧪 Görev 5 — HTTP Response Header'larını Gör

Sisteminde `curl` varsa:

```bash
curl -I https://example.com
```

çalıştır.

Şuna benzer alanlar görebilirsin:

```text
HTTP status

Content-Type

Content-Length

Cache-Control

Server
```

Her server aynı header'ları göndermek zorunda değildir.

```text
HTTP Status:

____________________________________

İlginç bulduğum Header:

____________________________________
```

---

# 🧪 Görev 6 — TCP Bağlantılarını Görüntüle

### Windows

```cmd
netstat -ano
```

veya PowerShell:

```powershell
Get-NetTCPConnection
```

### Linux

```bash
ss -tunap
```

Bazı process bilgileri için ek yetki gerekebilir.

### macOS

```bash
netstat -an
```

kullanabilirsin.

Bir bağlantı seç:

```text
Protocol:

____________________________________

Local IP:

____________________________________

Local Port:

____________________________________

Remote IP:

____________________________________

Remote Port:

____________________________________

State:

____________________________________

PID:

____________________________________
```

---

# 🧪 Görev 7 — PID ile Process'i Eşleştir

Windows'ta `netstat -ano` çıktısından bir PID seç.

Sonra:

```powershell
Get-Process -Id <PID>
```

ile process'i bul.

Örneğin:

```powershell
Get-Process -Id 4216
```

Linux'ta `ss` uygun yetkiyle process bilgilerini gösterebilir.

Şimdi ilişkiyi tamamla:

```text
PROCESS:

____________________________________
      │
      ▼
PID:

____________________________________
      │
      ▼
LOCAL PORT:

____________________________________
      │
      ▼
REMOTE IP:

____________________________________
      │
      ▼
REMOTE PORT:

____________________________________
```

Bu, Ders 05 ile Ders 07 arasındaki en önemli bağlantılardan biridir.

---

# 🧪 Görev 8 — Listening ile Established Farkını Gözlemle

TCP bağlantı listesinde:

```text
LISTENING

ESTABLISHED
```

durumlarıyla karşılaşabilirsin.

Şimdilik temel olarak:

```text
LISTENING
→ Bir local endpoint gelen connection
  isteklerini bekliyor olabilir.

ESTABLISHED
→ TCP connection kurulmuş durumda.
```

şeklinde düşün.

Bunları Ders 08'de ayrıntılı inceleyeceğiz.

---

# 🧪 Görev 9 — Ephemeral Port'u Bul

Bir browser aç ve bir web sitesine bağlan.

Network connection listesinden browser'ın bağlantılarından birini bulabilirsen:

```text
Local Port:

____________________________________

Remote Port:

____________________________________
```

değerlerini karşılaştır.

Örneğin şöyle bir şey görebilirsin:

```text
192.168.1.25:53142
        →
203.0.113.10:443
```

Şimdi cevapla:

> Client neden kendi tarafında 443 kullanmak zorunda değil?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Bonus — Wireshark ile Kendi Trafiğini Gözlemle

Bilgisayarında Wireshark kuruluysa ve kendi trafiğini inceleme yetkin varsa bu isteğe bağlı görevi yapabilirsin.

Capture başlat.

Ardından kendi terminalinde:

```bash
ping 127.0.0.1
```

veya normal bir DNS sorgusu gerçekleştir.

Wireshark display filter olarak:

```text
icmp
```

veya:

```text
dns
```

kullanabilirsin.

Amaç paket içeriğini değiştirmek değil, normal trafiğin protokol katmanlarını görmek.

> Capturing yapılabilecek ağlar ve veriler kurum politikalarına veya yerel düzenlemelere tabi olabilir. Yalnızca izinli ortamlarda çalış.

---

# 🔐 Siber Güvenlik Görevi — Network Olayını Yorumla

Bir EDR kaydı şu bilgileri gösteriyor:

```text
Process:
unknown.exe

PID:
6420

Local:
192.168.1.25:51844

Remote:
203.0.113.50:443

Transport:
TCP

Connection:
ESTABLISHED
```

Aşağıdaki soruları cevapla:

```text
1. 51844 muhtemelen ne tür bir port olabilir?

____________________________________________________


2. 443 hangi servislerle yaygın olarak ilişkilidir?

____________________________________________________


3. TCP 443 görmek kesinlikle HTTPS kullanıldığını kanıtlar mı?

____________________________________________________


4. HTTPS kullanılıyor olsa bile process'in güvenilir olduğunu
   kanıtlar mı?

____________________________________________________


5. Hangi process bilgisini araştırmak isterdin?

____________________________________________________


6. Hangi DNS bilgisini araştırmak isterdin?

____________________________________________________


7. TLS hakkında hangi bilgileri toplamak yararlı olabilir?

____________________________________________________
```

---

# 🧠 Kendini Test Et

## Soru 1

Ağ protokolü nedir?

**A)** Fiziksel network kablosu  
**B)** Sistemlerin iletişim sırasında takip ettiği kurallar ve mesaj yapıları  
**C)** RAM türü  
**D)** IP adresi

---

## Soru 2

TCP'deki "reliable" ifadesi ne anlama gelir?

**A)** TCP bütün veriyi otomatik olarak şifreler.  
**B)** TCP server kimliğini sertifikayla doğrular.  
**C)** TCP sıralama, ACK ve retransmission gibi mekanizmalarla güvenilir aktarım sağlamaya çalışır.  
**D)** TCP'de saldırı gerçekleştirilemez.

---

## Soru 3

TCP Three-Way Handshake sırası hangisidir?

**A)** ACK → SYN → FIN  
**B)** SYN → SYN/ACK → ACK  
**C)** SYN → FIN → ACK  
**D)** UDP → SYN → ACK

---

## Soru 4

TCP sequence number temel olarak neyle ilişkilidir?

**A)** Byte akışındaki konumlarla  
**B)** MAC adresiyle  
**C)** DNS domain adıyla  
**D)** Kullanıcı adıyla

---

## Soru 5

Flow control ile congestion control arasındaki temel fark hangisidir?

**A)** Aynı şeydir.  
**B)** Flow control alıcı kapasitesiyle, congestion control network koşullarıyla ilişkilidir.  
**C)** Flow control yalnızca DNS'te bulunur.  
**D)** Congestion control dosya sistemini yönetir.

---

## Soru 6

UDP hakkında hangisi doğrudur?

**A)** TCP Three-Way Handshake kullanır.  
**B)** Teslimatı her zaman garanti eder.  
**C)** Connectionless datagram hizmeti sağlar.  
**D)** Port numarası kullanmaz.

---

## Soru 7

Aşağıdakilerden hangisi doğru olabilir?

**A)** TCP 53 ve UDP 53 farklı transport endpoint'leridir.  
**B)** TCP ve UDP portları tamamen aynı endpoint'tir.  
**C)** UDP port kullanmaz.  
**D)** TCP'de maksimum port 255'tir.

---

## Soru 8

Bir bağlantı:

```text
192.168.1.25:53142
→
203.0.113.10:443
```

şeklindeyse `53142` ne olabilir?

**A)** Client ephemeral portu  
**B)** MAC adresi  
**C)** DNS TTL  
**D)** HTTP status code

---

## Soru 9

HTTPS için hangisi doğrudur?

**A)** HTTPS kullanan her site güvenilirdir.  
**B)** HTTPS yalnızca HTTP'nin portunu değiştirmektir.  
**C)** HTTPS HTTP iletişimini TLS ile korur.  
**D)** HTTPS asla UDP kullanamaz.

---

## Soru 10

HTTP/3 hangi teknoloji üzerinde çalışır?

**A)** QUIC / UDP  
**B)** Yalnızca TCP  
**C)** ICMP  
**D)** ARP

---

## Soru 11

TLS'in temel amaçları arasında hangileri bulunur?

**A)** Gizlilik  
**B)** Bütünlük  
**C)** Kimlik doğrulama  
**D)** Hepsi

---

## Soru 12

DNS yalnızca domain adını IPv4'e dönüştürür mü?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 13

DNS hangi transport protokollerini kullanabilir?

**A)** Yalnızca UDP  
**B)** Yalnızca TCP  
**C)** UDP ve TCP; ayrıca DoH/DoT gibi farklı taşıma yöntemleri de vardır  
**D)** Yalnızca ICMP

---

## Soru 14

DHCP DORA sırası hangisidir?

**A)** Discover → Offer → Request → Acknowledgment  
**B)** DNS → Offer → Router → ARP  
**C)** Request → Discover → ACK → Offer  
**D)** Download → Open → Run → Accept

---

## Soru 15

Ping cevap vermiyorsa hedef sistem kesinlikle kapalı mıdır?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________
```

---

## Soru 16

FTP ve SFTP için hangisi doğrudur?

**A)** Aynı protokoldür.  
**B)** SFTP, FTP'nin diğer adıdır.  
**C)** SFTP SSH üzerinden çalışan ayrı bir protokoldür.  
**D)** FTP her zaman TLS kullanır.

---

## Soru 17

TCP 443 üzerinde çalışan bir servis kesinlikle HTTPS midir?

**A)** Evet  
**B)** Hayır

Açıkla:

```text
____________________________________________________

____________________________________________________
```

---

## Soru 18 — Analist Sorusu

Bir process her 60 saniyede bir aynı uzak IP'nin TCP 443 portuna bağlanıyor.

Bu davranış:

> "Kesin malware beaconing."

olarak değerlendirilebilir mi?

Neden?

Hangi üç ek veriyi toplardın?

```text
1.

2.

3.
```

---

# 🎯 Ana Görev — `https://example.com` Yolculuğunu Açıkla

Şimdi Modül 01'in başından beri geliştirdiğimiz modeli kullan.

Tarayıcıya:

```text
https://example.com
```

yazdığını düşün.

Klasik TCP tabanlı HTTPS senaryosunu aşağıdaki kavramları kullanarak en az 10 aşamada açıkla:

```text
Process
DNS
IP
Routing
ARP / NDP
TCP
Source Port
Destination Port
Three-Way Handshake
TLS
Certificate
HTTP Request
HTTP Response
```

Cevabın:

```text
1.

2.

3.

4.

5.

6.

7.

8.

9.

10.
```

Sonra şu soruya cevap ver:

> HTTP/3 kullanılıyorsa bu akışın hangi bölümü değişebilir?

```text
____________________________________________________

____________________________________________________
```

---

# 🔍 Bonus — Katmanları Ayır

Şu iletişimi düşün:

```text
Chrome
192.168.1.25:53142
        │
        │ HTTPS
        ▼
203.0.113.10:443
```

Aşağıdaki kavramları uygun yere yerleştir:

```text
Chrome
HTTP
TLS
TCP
IP
Ethernet
```

```text
Application / Process:
________________________

Application Protocol:
________________________

Security Protocol:
________________________

Transport:
________________________

Internet:
________________________

Link:
________________________
```

Bu soruyu cevaplayabiliyorsan protokol katmanlarının temel mantığını anlamışsın demektir.

---

# 🔐 Siber Güvenlik Bağlantısı

Bu derste öğrendiğimiz protokoller birçok güvenlik alanının merkezindedir:

```text
NETWORK PROTOCOLS
│
├── BLUE TEAM
│   ├── DNS Analysis
│   ├── HTTP Analysis
│   ├── TLS Metadata
│   ├── Network Detection
│   └── Firewall / IDS Logs
│
├── DFIR
│   ├── Network Timeline
│   ├── DNS Evidence
│   ├── Connection Records
│   └── PCAP Analysis
│
├── MALWARE ANALYSIS
│   ├── C2 Communication
│   ├── DNS Behavior
│   ├── HTTP / HTTPS
│   └── Beaconing
│
├── WEB SECURITY
│   ├── HTTP Methods
│   ├── Headers
│   ├── Cookies
│   ├── Authentication
│   └── TLS
│
└── NETWORK SECURITY
    ├── TCP / UDP
    ├── Ports
    ├── Protocol Analysis
    └── Service Detection
```

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Network iletişimini artık:

```text
Bilgisayar
   │
   ▼
Internet
   │
   ▼
Server
```

şeklinde düşünmemelisin.

Daha doğru model:

```text
                    PROCESS
                       │
                       ▼
                 APPLICATION
                    PROTOCOL
                       │
                       ▼
                TCP / UDP / QUIC
                       │
                 PORT NUMBERS
                       │
                       ▼
                       IP
                       │
                       ▼
                    ROUTING
                       │
                       ▼
               ETHERNET / WI-FI
                       │
                       ▼
                    NETWORK
                       │
                       ▼
                REMOTE SYSTEM
```

Bir web bağlantısında örneğin:

```text
Browser
   │
   ▼
DNS Resolution
   │
   ▼
Remote IP
   │
   ▼
TCP veya QUIC
   │
   ▼
TLS
   │
   ▼
HTTP
```

gibi birçok farklı protokol birlikte çalışabilir.

Ve en önemli güvenlik prensibi:

```text
PORT NUMARASI
      │
      ≠
      │
SERVİSİN KESİN KİMLİĞİ
```

Aynı şekilde:

```text
HTTPS KULLANIMI
      │
      ≠
      │
UYGULAMANIN GÜVENİLİR OLMASI
```

Network analizinde tek bir değerden kesin sonuç çıkarmak yerine protokol, process, adres, port ve davranışı birlikte değerlendirmeliyiz.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Protokol kavramını açıklayabiliyorum.
- [ ] Katmanlı network modelinin neden kullanıldığını biliyorum.
- [ ] OSI modelinin 7 katmanını tanıyorum.
- [ ] TCP/IP modelinin temel katmanlarını biliyorum.
- [ ] Encapsulation kavramını açıklayabiliyorum.
- [ ] TCP'nin temel görevini biliyorum.
- [ ] TCP reliability ile cryptographic security'nin aynı şey olmadığını biliyorum.
- [ ] Three-Way Handshake'i açıklayabiliyorum.
- [ ] SYN, ACK, FIN ve RST kavramlarını temel seviyede tanıyorum.
- [ ] Sequence number'ın byte stream ile ilişkisini biliyorum.
- [ ] Retransmission kavramını biliyorum.
- [ ] Flow control ve congestion control arasındaki farkı biliyorum.
- [ ] UDP'nin temel görevini biliyorum.
- [ ] TCP ve UDP arasındaki farkı açıklayabiliyorum.
- [ ] Port kavramını açıklayabiliyorum.
- [ ] TCP 53 ile UDP 53'ün farklı endpoint'ler olduğunu biliyorum.
- [ ] Ephemeral port kavramını tanıyorum.
- [ ] Socket kavramını network bağlamında açıklayabiliyorum.
- [ ] HTTP request/response modelini biliyorum.
- [ ] Yaygın HTTP metotlarını tanıyorum.
- [ ] HTTP status code sınıflarını biliyorum.
- [ ] HTTPS ve TLS ilişkisini açıklayabiliyorum.
- [ ] TLS'in gizlilik, bütünlük ve kimlik doğrulamayla ilişkisini biliyorum.
- [ ] Certificate kavramını temel seviyede biliyorum.
- [ ] HTTPS'in sitenin güvenilir olduğunu garanti etmediğini biliyorum.
- [ ] HTTP/3'ün QUIC/UDP kullandığını biliyorum.
- [ ] DNS'in yalnızca domain → IPv4 olmadığını biliyorum.
- [ ] A, AAAA, MX, NS ve CNAME kayıtlarını tanıyorum.
- [ ] DNS cache ve DNS TTL kavramlarını biliyorum.
- [ ] DNS'in UDP ve TCP kullanabildiğini biliyorum.
- [ ] DoH ve DoT kavramlarını tanıyorum.
- [ ] DHCP'nin ne yaptığını biliyorum.
- [ ] DHCP DORA sürecini açıklayabiliyorum.
- [ ] ICMP'nin TCP veya UDP olmadığını biliyorum.
- [ ] Ping'in ICMP ile ilişkisini biliyorum.
- [ ] SSH'nin temel amacını biliyorum.
- [ ] FTP, FTPS ve SFTP arasındaki farkı biliyorum.
- [ ] SMTP, IMAP ve POP3'ün temel rollerini biliyorum.
- [ ] Port numarasının servisi kesin olarak kanıtlamadığını biliyorum.
- [ ] DNS sorgusu gerçekleştirdim.
- [ ] HTTPS sertifikasını inceledim.
- [ ] Network bağlantılarımı görüntüledim.
- [ ] Bir network bağlantısını PID ile process'e bağladım.
- [ ] Ephemeral port gözlemledim.
- [ ] Quiz sorularını tamamladım.
- [ ] HTTPS yolculuğu görevini tamamladım.

---

# 🧩 Dersin Özeti

Modül boyunca kurduğumuz model artık oldukça gelişti:

```text
                        USER
                          │
                          ▼
                       PROCESS
                          │
                          ▼
                        SOCKET
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
               TCP                 UDP
                │                   │
                │                   └── QUIC
                │
                ▼
             PORT NUMBER
                │
                ▼
                 IP
                │
                ▼
              ROUTING
                │
                ▼
         ETHERNET / WI-FI
                │
                ▼
             NETWORK
                │
                ▼
          REMOTE SYSTEM
```

Uygulama katmanında ise:

```text
HTTP
DNS
SSH
SMTP
IMAP
POP3
FTP
SFTP
```

gibi farklı protokoller farklı görevler yerine getirir.

Siber güvenlik analisti tüm bunları birleştirir:

```text
PROCESS
   │
   ▼
PROTOCOL
   │
   ▼
LOCAL IP : PORT
   │
   ▼
REMOTE IP : PORT
   │
   ▼
TIMESTAMP
   │
   ▼
BEHAVIOR
```

Artık network bağlantısına yalnızca:

> "Hangi IP'ye gidiyor?"

diye değil:

> "Hangi process, hangi protokolü kullanarak, hangi local endpoint'ten hangi remote endpoint'e, ne zaman ve hangi davranış modeliyle bağlanıyor?"

diye bakmaya başlayabiliriz.

---

# 🚀 Sonraki Ders

## Ders 08 — Ports, Services & Network Discovery

Bir sonraki derste network üzerindeki servisleri anlamaya başlayacağız.

Şu soruların cevaplarını arayacağız:

- Listening port nedir?
- Bir server neden bir port üzerinde listen eder?
- TCP port state nedir?
- Open, Closed ve Filtered ne anlama gelir?
- UDP servislerini tespit etmek neden daha zordur?
- Port numarası ile gerçek servis arasındaki fark nedir?
- Banner nedir?
- Service detection nasıl çalışır?
- `netstat`, `ss` ve `Get-NetTCPConnection` ne gösterir?
- Bir endpoint üzerinde hangi servislerin dinlediğini nasıl gözlemleriz?
- Network discovery ile port scanning arasındaki fark nedir?
- Nmap temel olarak ne yapar?
- Neden yalnızca yetkili sistemlerde tarama yapmalıyız?
- Bir Blue Team analisti port ve servis bilgisini nasıl yorumlar?

Ve şu ilişkiyi inceleyeceğiz:

```text
PROCESS
   │
   ▼
SOCKET
   │
   ▼
LISTENING PORT
   │
   ▼
NETWORK SERVICE
   │
   ▼
REMOTE CLIENT
```

Bundan sonra network'ü yalnızca kullanan kişi olmaktan çıkıp network üzerindeki servislerin nasıl göründüğünü analiz etmeye başlayacağız.