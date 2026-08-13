# Ders 06 — Network Fundamentals: Bilgisayarlar Birbirleriyle Nasıl İletişim Kurar?

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–05

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Network kavramını açıklayabileceksin.
- LAN ve WAN arasındaki temel farkı anlayabileceksin.
- Network interface kavramını açıklayabileceksin.
- IPv4 adresinin temel yapısını anlayabileceksin.
- Private ve public IPv4 adreslerini ayırt edebileceksin.
- IPv6'nın neden var olduğunu temel seviyede anlayabileceksin.
- Subnet ve CIDR kavramlarını temel seviyede okuyabileceksin.
- Default gateway'in görevini açıklayabileceksin.
- MAC adresinin ne olduğunu ve IP'den farkını anlayabileceksin.
- ARP'nin temel görevini açıklayabileceksin.
- Switch ve router arasındaki farkı anlayabileceksin.
- Access Point ve modem kavramlarını ayırt edebileceksin.
- NAT kavramının temel mantığını anlayabileceksin.
- Client ve server rollerini açıklayabileceksin.
- Packet, frame ve segment kavramlarını temel seviyede tanıyabileceksin.
- Bir bilgisayarın aynı yerel ağdaki ve başka bir ağdaki sisteme nasıl ulaştığını temel seviyede açıklayabileceksin.
- `127.0.0.1`, localhost ve loopback kavramlarını anlayabileceksin.
- Process, socket ve network bağlantısı arasındaki ilişkiyi kurabileceksin.
- Network bilgisinin Blue Team, DFIR ve diğer güvenlik alanlarında neden önemli olduğunu anlayabileceksin.

> Bu derste ağ teknolojilerinin bütün ayrıntılarını öğrenmeyeceğiz. Amacımız TCP, UDP, DNS, HTTP ve port gibi konulara geçmeden önce sağlam bir ağ zihinsel modeli oluşturmaktır.

---

# 1. Önceki Dersten Network'e Geçiş

Ders 05'in sonunda şu modele ulaşmıştık:

```text
Process
   │
   ▼
Socket
   │
   ▼
Network
```

Bir program yalnızca kendi bilgisayarındaki:

- CPU,
- RAM,
- dosyalar

ile çalışmak zorunda değildir.

Başka sistemlerle de iletişim kurabilir.

Örneğin web tarayıcısı:

```text
Chrome
   │
   ▼
İşletim Sistemi
   │
   ▼
Network
   │
   ▼
Uzak Web Sunucusu
```

ile iletişim kurabilir.

Şimdi şu sorunun cevabını arayacağız:

> Bilgisayarımızdaki bir process, dünyanın başka bir yerindeki bilgisayara nasıl veri gönderebiliyor?

---

# 2. Network Nedir?

**Network (ağ)**, cihazların belirli iletişim teknolojileri ve protokoller kullanarak birbirleriyle veri alışverişi yapabildiği yapıdır.

Bir ağda:

- Bilgisayarlar
- Telefonlar
- Sunucular
- Yazıcılar
- Switch'ler
- Router'lar
- Access Point'ler
- Güvenlik cihazları
- IoT cihazları

gibi birçok farklı sistem bulunabilir.

Basit bir örnek:

```text
              SWITCH
             /      \
            /        \
           ▼          ▼
         PC-1        PC-2
```

Kablosuz ağda:

```text
Laptop
   │
 Wi-Fi
   │
   ▼
Access Point
   │
   ▼
Yerel Ağ
```

Daha büyük ölçekte:

```text
Yerel Ağ
   │
   ▼
Router
   │
   ▼
Diğer Ağlar
   │
   ▼
Internet
```

---

# 3. Internet ile Network Aynı Şey Mi?

Hayır.

**Network**, birbirine bağlı sistemlerin oluşturduğu genel kavramdır.

**Internet** ise dünya çapında çok sayıda bağımsız ağın IP protokol ailesi üzerinden birbirine bağlandığı küresel ağlar ağıdır.

Yani:

```text
Network
```

genel kavramdır.

Internet ise:

```text
Network
   │
   ├── Network
   ├── Network
   ├── Network
   └── Network
```

şeklinde birbirine bağlı çok büyük bir ağ ekosistemidir.

> Her network Internet değildir.

Örneğin Internet bağlantısı olmayan izole bir laboratuvar ağı da network'tür.

---

# 4. Network Neden Gereklidir?

Günümüzde yaptığımız birçok işlem ağ iletişimine dayanır.

Örneğin:

```text
Web sitesine erişmek
E-posta göndermek
Dosya paylaşmak
Uzak sunucuya bağlanmak
Bulut hizmeti kullanmak
Online oyun oynamak
Video izlemek
Mesaj göndermek
```

ağ üzerinden iletişim gerektirebilir.

Siber güvenlik açısından da network kritik öneme sahiptir.

Bir olay sırasında şu soruları sorabiliriz:

```text
Hangi sistem iletişim kurdu?

Kiminle iletişim kurdu?

Ne zaman iletişim kurdu?

Hangi protokol kullanıldı?

Hangi port kullanıldı?

Ne kadar veri aktarıldı?

Bu iletişim beklenen bir davranış mıydı?
```

Bu soruları cevaplayabilmek için önce ağların normalde nasıl çalıştığını anlamamız gerekir.

---

# 5. LAN Nedir?

**LAN — Local Area Network**

Türkçesi:

**Yerel Alan Ağı**

LAN, genellikle ev, ofis veya kampüs gibi sınırlı bir ortamda birbirine bağlı cihazlardan oluşan ağdır.

Örneğin:

```text
             SWITCH
         ┌─────┼─────┐
         ▼     ▼     ▼
        PC   Yazıcı  Sunucu
```

bir LAN'ın parçası olabilir.

Kablosuz cihazlar da aynı LAN'ın parçası olabilir.

Örneğin:

```text
                LAN
                 │
        ┌────────┴────────┐
        │                 │
      Switch        Access Point
        │                 │
        ▼                 ▼
       PC              Laptop
```

LAN yalnızca kablolu Ethernet anlamına gelmez.

---

# 6. WAN Nedir?

**WAN — Wide Area Network**

Türkçesi:

**Geniş Alan Ağı**

WAN, geniş coğrafi alanlara yayılan ağları veya ağlar arası bağlantıları ifade eder.

Örneğin bir şirketin:

```text
İstanbul Ofisi
      │
      ▼
     WAN
      │
      ▼
Ankara Ofisi
```

şeklinde bağlantısı olabilir.

Internet WAN kavramının en büyük örneklerinden biri olarak düşünülebilir ancak:

```text
WAN = Internet
```

demek doğru değildir.

Özel WAN altyapıları da bulunabilir.

---

# 7. Network Interface Nedir?

Bir bilgisayarın ağa bağlanabilmesi için bir:

**Network Interface — Ağ Arayüzü**

kullanması gerekir.

Örneğin:

```text
Bilgisayar
│
├── Ethernet Interface
├── Wi-Fi Interface
├── VPN Interface
└── Loopback Interface
```

bulunabilir.

Bunların hepsi fiziksel olmak zorunda değildir.

Örneğin:

- Ethernet kartı fiziksel olabilir.
- Wi-Fi adaptörü fiziksel olabilir.
- VPN adaptörü sanal olabilir.
- Loopback mantıksal/sanal bir arayüzdür.

Her arayüzün kendi ağ yapılandırması bulunabilir.

---

# 8. IP Adresi Nedir?

**IP — Internet Protocol**

ağlar arasında adresleme ve paketlerin iletilmesi için kullanılan temel protokollerden biridir.

Bir network interface'e bir veya daha fazla IP adresi atanabilir.

Örneğin bir IPv4 adresi:

```text
192.168.1.25
```

şeklinde görünebilir.

IP adresini başlangıç seviyesinde:

> **Bir ağ arayüzünün IP ağı içerisindeki mantıksal adresi**

olarak düşünebilirsin.

Ancak önemli bir düzeltme:

> IP adresi her zaman fiziksel cihazın değişmez kimliği değildir.

Bir cihazın:

- Birden fazla IP adresi olabilir.
- IP adresi zaman içerisinde değişebilir.
- Birden fazla interface'i farklı IP'lere sahip olabilir.

---

# 9. IPv4 Adresinin Yapısı

IPv4 adresi:

**32 bit**

uzunluğundadır.

Genellikle dört decimal sayı ile gösterilir.

Örneğin:

```text
192.168.1.25
```

Her bölüm 8 bittir ve:

```text
0 - 255
```

arasında değer alabilir.

Yani:

```text
192      168       1        25
 │        │        │         │
8 bit    8 bit    8 bit     8 bit

8 + 8 + 8 + 8 = 32 bit
```

Bu bölümlere:

**octet**

denir.

---

# 10. Binary Olarak IPv4

Bilgisayar açısından IPv4 adresi decimal sayı dizisi değil, 32 bitlik bir değerdir.

Örneğin:

```text
192.168.1.10
```

binary olarak:

```text
11000000.10101000.00000001.00001010
```

şeklinde gösterilebilir.

Bu derste binary subnet hesabına derinlemesine girmeyeceğiz.

Ancak subnetting öğrenirken binary mantığı tekrar karşımıza çıkacaktır.

---

# 11. Private IPv4 Adresleri

IPv4 adres alanında private ağlar için ayrılmış üç temel blok vardır.

RFC 1918 tarafından tanımlanan aralıklar:

```text
10.0.0.0/8

172.16.0.0/12

192.168.0.0/16
```

Bunların adres aralıkları kabaca:

```text
10.0.0.0
-
10.255.255.255
```

```text
172.16.0.0
-
172.31.255.255
```

```text
192.168.0.0
-
192.168.255.255
```

şeklindedir.

Örneğin:

```text
10.10.10.5
172.20.5.10
192.168.1.25
```

private IPv4 adresleridir.

---

# 12. Çok Yapılan Bir Private IP Hatası

Şu adresi düşün:

```text
172.50.10.5
```

Bu:

```text
172.x.x.x
```

ile başladığı için private değildir.

Private olan blok:

```text
172.16.0.0/12
```

yani:

```text
172.16.x.x
-
172.31.x.x
```

aralığıdır.

Dolayısıyla:

```text
172.16.1.1  → Private

172.31.1.1  → Private

172.32.1.1  → RFC1918 Private değil

172.50.1.1  → RFC1918 Private değil
```

Bu ayrım network analizinde önemlidir.

---

# 13. Public IP Nedir?

Public IP adresleri genel Internet yönlendirmesinde kullanılabilen adreslerle ilişkilidir.

Ev ağını düşün:

```text
Laptop
192.168.1.10
       │
       ▼
     Router
       │
       ▼
ISP / Internet
```

Laptop'un private adresi:

```text
192.168.1.10
```

Internet üzerinde doğrudan global olarak yönlendirilmez.

Router ve servis sağlayıcı altyapısı üzerinden dış dünyaya çıkarken farklı adresleme mekanizmaları kullanılabilir.

Burada sıkça:

**NAT**

kavramıyla karşılaşırız.

---

# 14. NAT Nedir?

**NAT — Network Address Translation**

IP adres bilgilerinin ağ sınırında çevrilmesini sağlayan mekanizmalardır.

Ev ağlarında sık görülen senaryoda birden fazla private IPv4 cihazı dış networke çıkarken router üzerinde adres/port çevirisi kullanılabilir.

Basitleştirilmiş model:

```text
Laptop
192.168.1.10
       │
       │
Telefon│192.168.1.20
       │
       ▼
     ROUTER
  NAT / PAT işlemleri
       │
       ▼
    PUBLIC SIDE
       │
       ▼
    INTERNET
```

Ev router'larında yaygın olarak port bilgilerini de kullanan:

**PAT — Port Address Translation**

benzeri davranış görülür.

Bu sayede bir public IPv4 adresi üzerinden birden fazla iç cihazın bağlantısı takip edilebilir.

---

# 15. NAT Firewall Mıdır?

Hayır.

Bu çok önemli bir ayrımdır.

NAT:

> Adres çevirme mekanizmasıdır.

Firewall ise:

> Ağ trafiğine belirli kurallara göre izin verme veya engelleme mekanizmasıdır.

Bir cihaz her ikisini de aynı anda yapabilir.

Örneğin ev router'ı:

```text
Router
│
├── Routing
├── NAT
├── Firewall
├── DHCP
└── Wi-Fi Access Point
```

işlevlerini aynı fiziksel cihazda barındırabilir.

Ama kavramlar aynı değildir.

```text
NAT ≠ Firewall
```

---

# 16. IPv6 Neden Var?

IPv4 yaklaşık:

```text
2^32
```

adres içerir.

Bu yaklaşık 4.3 milyar adres anlamına gelir.

Internet'in büyümesiyle IPv4 adres alanı önemli bir kısıt hâline gelmiştir.

Bu nedenle:

**IPv6**

geliştirilmiştir.

IPv6 adresleri:

**128 bit**

uzunluğundadır.

Örneğin:

```text
2001:db8:1234:5678::10
```

gibi görünebilir.

IPv6 yalnızca:

> "Daha fazla IP adresi"

demek değildir; protokolün başka tasarım farkları da vardır.

Ancak başlangıç seviyesinde bilmen gereken temel nokta:

```text
IPv4 → 32 bit

IPv6 → 128 bit
```

---

# 17. IPv6'da Private IP Var Mı?

IPv6 adresleme modeli IPv4'ten farklıdır.

IPv4'teki RFC1918 private adreslerin birebir karşılığı şeklinde düşünmemeliyiz.

IPv6'da örneğin:

**Unique Local Address — ULA**

için:

```text
fc00::/7
```

alanı ayrılmıştır.

Pratikte yerel oluşturulan ULA adreslerinde genellikle:

```text
fd...
```

ile başlayan adreslerle karşılaşılır.

Ayrıca IPv6 interface'lerinde sıkça:

**Link-Local**

adresler görülür.

Bunlar:

```text
fe80::/10
```

aralığıyla ilişkilidir.

IPv6'yı ilerleyen network modüllerinde daha ayrıntılı inceleyebiliriz.

---

# 18. Subnet Nedir?

IP adresinin tek başına bilinmesi her zaman yeterli değildir.

Bir cihazın hangi IP adreslerini kendi yerel ağı içerisinde kabul edeceğini anlamak için:

**subnet — alt ağ**

bilgisi gerekir.

Örneğin:

```text
192.168.1.10/24
```

ifadesini görebilirsin.

Buradaki:

```text
/24
```

bir:

**CIDR prefix length**

değeridir.

Bu örnekte ilk 24 bit network prefix'i ifade eder.

Kavramsal olarak:

```text
192.168.1.10/24

NETWORK KISMI        HOST KISMI
192.168.1              10
```

Bu açıklama `/24` örneği için basitleştirilmiş bir gösterimdir.

---

# 19. `/24` Ne Anlama Gelir?

IPv4 adresi 32 bittir.

```text
/24
```

ilk 24 bitin network prefix'i olduğunu belirtir.

Subnet mask olarak:

```text
255.255.255.0
```

ile eşdeğerdir.

Örneğin:

```text
192.168.1.10/24
```

için network adresi:

```text
192.168.1.0
```

olur.

Geleneksel IPv4 subnetting açısından broadcast adresi:

```text
192.168.1.255
```

olur.

Tipik host adresleri:

```text
192.168.1.1
-
192.168.1.254
```

arasında olabilir.

Ancak özel subnet türleri ve kullanım senaryolarında farklı kurallar olabilir.

Şimdilik `/24` mantığını anlamamız yeterlidir.

---

# 20. Aynı Subnet'te Olup Olmadığımız Neden Önemli?

Bilgisayarımızın:

```text
192.168.1.10/24
```

adresine sahip olduğunu düşün.

Hedef:

```text
192.168.1.20
```

ise aynı `/24` subnet içerisindedir.

Basitleştirilmiş olarak cihaz hedefe yerel ağ üzerinden ulaşmaya çalışabilir.

Ancak hedef:

```text
8.8.8.8
```

ise aynı subnet içerisinde değildir.

Bu durumda paket genellikle:

**default gateway**

üzerinden başka ağa gönderilir.

---

# 21. Default Gateway Nedir?

Bir cihaz hedef IP'nin kendi bağlı olduğu ağda olmadığını belirlediğinde paketin nereye gönderileceğini routing tablosuna göre belirler.

Daha özel bir route yoksa:

**default route**

kullanılabilir.

Bu route'un next-hop'u çoğu ev ağında router'dır.

Örneğin:

```text
Bilgisayar
192.168.1.10/24
       │
       │ Hedef: 8.8.8.8
       ▼
Default Gateway
192.168.1.1
       │
       ▼
Diğer Ağlar
```

Başlangıç seviyesinde:

> **Default gateway, cihazın kendi yerel ağı dışındaki hedeflere giderken kullandığı varsayılan sonraki yönlendiriciyle ilişkilidir.**

Ancak teknik olarak işletim sistemi routing tablosunu kullanır; default gateway yalnızca olası route'lardan biridir.

---

# 22. Routing Table Nedir?

İşletim sistemi hangi hedefe hangi interface veya gateway üzerinden ulaşacağını belirlemek için:

**routing table — yönlendirme tablosu**

kullanır.

Kavramsal olarak:

```text
HEDEF                    YOL
-----------------------------------
192.168.1.0/24      → Yerel Interface

10.10.0.0/16        → VPN

0.0.0.0/0           → Default Gateway
```

Buradaki:

```text
0.0.0.0/0
```

IPv4 için default route'u temsil edebilir.

Yani:

> Daha özel bir route yoksa burayı kullan.

mantığı vardır.

---

# 23. MAC Adresi Nedir?

Ethernet ve Wi-Fi gibi IEEE 802 ağ teknolojilerinde ağ arayüzleri:

**MAC address — Media Access Control address**

kullanabilir.

Örneğin:

```text
00:1A:2B:3C:4D:5E
```

gibi gösterilebilir.

Geleneksel Ethernet MAC adresleri:

```text
48 bit
```

uzunluğundadır.

MAC adresi yerel Layer 2 iletişiminde önemlidir.

---

# 24. MAC Adresi Cihazın Değişmez Seri Numarası Mıdır?

Hayır.

Bu yaygın bir yanlış anlamadır.

Bir MAC adresi üretici tarafından interface'e atanmış olabilir ancak yazılım tarafından değiştirilebilir veya randomize edilebilir.

Özellikle modern mobil cihazlar ve işletim sistemleri gizlilik amacıyla Wi-Fi ağlarında:

**MAC randomization**

kullanabilir.

Bu nedenle:

> **MAC adresi cihazın değiştirilemez ve global kimliği değildir.**

Aynı cihazın birden fazla network interface'i varsa farklı MAC adresleri de bulunabilir.

---

# 25. IP ile MAC Arasındaki Fark

Başlangıç seviyesinde:

```text
IP
│
└── Layer 3 mantıksal adresleme / routing


MAC
│
└── Layer 2 yerel ağ iletişimi
```

şeklinde düşünebiliriz.

Örneğin:

```text
IP:
192.168.1.25

MAC:
00:1A:2B:3C:4D:5E
```

aynı interface ile ilişkili olabilir.

Ancak ikisinin görevi farklıdır.

IP farklı networkler arasında routing için kullanılırken MAC adresleri Ethernet gibi yerel Layer 2 segmentlerinde frame iletiminde kullanılır.

---

# 26. IP Adresini Biliyorum, MAC'i Nasıl Bulacağım?

IPv4 yerel ağlarında burada:

**ARP — Address Resolution Protocol**

devreye girer.

ARP'nin temel amacı:

> Yerel Layer 2 segmentinde belirli bir IPv4 adresiyle ilişkilendirilecek MAC adresini öğrenmeye yardımcı olmaktır.

Örneğin:

```text
Bilgisayar A
IP: 192.168.1.10
MAC: AA:AA:AA:AA:AA:AA

Bilgisayar B
IP: 192.168.1.20
MAC: BB:BB:BB:BB:BB:BB
```

A, B'ye yerel Ethernet üzerinden frame göndermek istediğinde:

```text
192.168.1.20 hangi MAC adresinde?
```

sorusunun cevabına ihtiyaç duyar.

ARP bu eşlemeyi öğrenmede kullanılır.

---

# 27. ARP Basitleştirilmiş Olarak Nasıl Çalışır?

Kavramsal akış:

```text
PC-A
192.168.1.10
     │
     │ "192.168.1.20 kimde?"
     ▼
Yerel Ağda ARP Request
     │
     ▼
PC-B
192.168.1.20
     │
     │ "Bu IP bende.
     │  MAC adresim BB:BB:..."
     ▼
ARP Reply
     │
     ▼
PC-A ARP bilgisini öğrenir
```

Bu eşlemeler bir süre:

**ARP cache**

içerisinde tutulabilir.

---

# 28. Uzak Hedefin MAC Adresini Öğrenir Miyiz?

Genellikle hayır.

Bu çok önemli bir noktadır.

Bilgisayar:

```text
192.168.1.10/24
```

adresinde olsun.

Hedef:

```text
8.8.8.8
```

olsun.

Hedef aynı yerel subnet'te değildir.

Bilgisayar Ethernet frame'ini doğrudan:

```text
8.8.8.8'in MAC adresine
```

göndermez.

Bunun yerine yerel next-hop olan router/default gateway'in MAC adresini kullanır.

Kavramsal olarak:

```text
IP Hedefi:
8.8.8.8

Ethernet Hedef MAC:
Yerel Router'ın MAC'i
```

Router paketi aldıktan sonra bir sonraki ağa yönlendirir.

Her Layer 2 segmentinde frame bilgileri değişebilirken IP paketindeki kaynak/hedef adresler routing boyunca genellikle uçları temsil etmeye devam eder; NAT gibi mekanizmalar bu adresleri değiştirebilir.

---

# 29. IPv6 ARP Kullanır Mı?

Hayır.

IPv6 klasik ARP kullanmaz.

Bunun yerine:

**Neighbor Discovery Protocol — NDP**

kullanılır.

NDP:

**ICMPv6**

üzerinden çalışır ve IPv6 ağlarında çeşitli komşu keşfi ve ağ yapılandırma işlevleri sağlar.

Şimdilik:

```text
IPv4 → ARP

IPv6 → Neighbor Discovery
```

şeklinde hatırlayabilirsin.

---

# 30. Switch Nedir?

**Switch**, Ethernet LAN'larında frame'leri uygun portlara ileten Layer 2 network cihazıdır.

Örneğin:

```text
                SWITCH
          ┌───────┼───────┐
          ▼       ▼       ▼
        PC-A    PC-B    SERVER
```

Switch gelen Ethernet frame'lerinin:

**source MAC address**

bilgilerini gözlemleyerek hangi MAC adresinin hangi portta bulunduğunu öğrenebilir.

Bunu bir:

**MAC address table**

içerisinde tutabilir.

---

# 31. Switch Frame'i Nasıl İletir?

Örneğin switch şunu biliyor olsun:

```text
MAC A → Port 1

MAC B → Port 2

MAC C → Port 3
```

PC-A, MAC B'ye frame gönderdiğinde switch:

```text
Destination MAC = MAC B
```

bilgisine bakıp frame'i ilgili porta yönlendirebilir.

Kavramsal olarak:

```text
PC-A
  │
  ▼
SWITCH
  │
  │ MAC Table'a bak
  ▼
Port 2
  │
  ▼
PC-B
```

Switch her frame'i otomatik olarak bütün portlara göndermek zorunda değildir.

Ancak broadcast veya unknown unicast gibi durumlarda flooding davranışları görülebilir.

---

# 32. Router Nedir?

**Router**, farklı IP networkleri arasında paket yönlendiren Layer 3 cihazıdır.

Örneğin:

```text
192.168.1.0/24
       │
       ▼
     ROUTER
       │
       ▼
10.0.0.0/24
```

Router gelen paketin:

```text
Destination IP
```

bilgisini ve kendi routing tablosunu kullanarak paketin hangi yöne gönderileceğine karar verir.

Basitleştirilmiş olarak:

```text
Paket geldi
    │
    ▼
Hedef IP nedir?
    │
    ▼
Routing Table
    │
    ▼
En uygun route
    │
    ▼
Next Hop / Interface
```

---

# 33. Switch ile Router Farkı

Başlangıç seviyesinde:

| Switch | Router |
|---|---|
| Yerel Ethernet segmentlerinde çalışır | IP networkleri arasında yönlendirme yapar |
| MAC adresleriyle ilgilenir | IP adresleriyle ilgilenir |
| Layer 2 ile ilişkilidir | Layer 3 ile ilişkilidir |
| Frame iletir | Packet yönlendirir |

Ancak modern network cihazları bu sınırları aşabilir.

Örneğin:

**Layer 3 Switch**

routing de yapabilir.

Dolayısıyla tablo temel kavramı anlamak içindir.

---

# 34. Access Point Nedir?

**Access Point — AP**, kablosuz istemcilerin bir ağa bağlanmasını sağlayan ağ cihazıdır.

Örneğin:

```text
Laptop
   │
 Wi-Fi
   │
   ▼
ACCESS POINT
   │
 Ethernet / LAN
   │
   ▼
SWITCH / NETWORK
```

Ev router'larında:

```text
Router
Switch
Access Point
Firewall
NAT
DHCP
```

işlevleri tek fiziksel cihaz içerisinde bulunabilir.

Bu yüzden evde:

> "Modem"

dediğimiz cihaz gerçekte birden fazla ağ işlevini yerine getiriyor olabilir.

---

# 35. Modem Nedir?

**Modem** kelimesi tarihsel olarak:

**Modulator / Demodulator**

kelimelerinden gelir.

Modem, servis sağlayıcının erişim teknolojisi ile müşteri tarafındaki network arasında bağlantı kurulmasına yardımcı olan cihazlardan biridir.

Ancak günümüzde kullanılan teknolojiye göre:

- DSL modem
- Cable modem
- Fiber ONT
- Cellular modem

gibi farklı cihazlarla karşılaşabiliriz.

Fiber bağlantılarda örneğin klasik anlamda modem yerine:

**ONT — Optical Network Terminal**

bulunabilir.

Bu nedenle:

```text
Internet → Modem → Router
```

şeması her ev ağı için birebir doğru olmak zorunda değildir.

---

# 36. Client Nedir?

**Client (istemci)**, bir network hizmetini talep eden veya kullanan taraftır.

Örneğin tarayıcın:

```text
Web Server
```

üzerindeki bir kaynağı istediğinde client rolündedir.

```text
CLIENT
   │
   │ Request
   ▼
SERVER
```

Client bir cihaz olmak zorunda değildir.

Daha doğru düşünürsek çoğu durumda:

> **Client bir yazılım rolüdür.**

Örneğin aynı bilgisayarda çalışan bir program client olabilir.

---

# 37. Server Nedir?

**Server**, diğer sistem veya uygulamalara bir network hizmeti sağlayan taraftır.

Örneğin:

```text
Web Server
DNS Server
Mail Server
File Server
Database Server
```

gibi sunucu rolleri vardır.

Client-server iletişimi:

```text
CLIENT
   │
   │ Request
   ▼
SERVER
   │
   │ Response
   ▼
CLIENT
```

şeklinde olabilir.

Ancak bütün network protokolleri basit request-response modeli kullanmak zorunda değildir.

---

# 38. Client ve Server İki Ayrı Bilgisayar Olmak Zorunda Mı?

Hayır.

Aynı bilgisayar üzerinde hem client hem server uygulamaları çalışabilir.

Örneğin bilgisayarında lokal bir web geliştirme sunucusu çalıştırdığını düşün:

```text
Tarayıcı
Client
   │
   ▼
127.0.0.1
   │
   ▼
Local Web Server
Server
```

İki program aynı fiziksel bilgisayar üzerindedir.

Biri client, diğeri server rolündedir.

Bu yüzden:

```text
Client = Laptop

Server = Büyük veri merkezi bilgisayarı
```

şeklinde düşünmemeliyiz.

Bunlar öncelikle iletişim rolleridir.

---

# 39. localhost Nedir?

`localhost`, genellikle bilgisayarın kendisini ifade etmek için kullanılan hostname'dir.

IPv4 loopback adreslerinin en bilinen örneği:

```text
127.0.0.1
```

adresidir.

IPv4 loopback için ayrılan blok:

```text
127.0.0.0/8
```

dir.

IPv6 loopback adresi ise:

```text
::1
```

şeklindedir.

---

# 40. Loopback Ne İşe Yarar?

Loopback, bilgisayarın kendi network stack'i üzerinden kendi sistemiyle iletişim kurmasına olanak sağlar.

Örneğin:

```text
Browser
   │
   ▼
127.0.0.1
   │
   ▼
Local Web Server
```

Bu trafik normalde fiziksel Ethernet veya Wi-Fi kartından dış ağa çıkmak zorunda değildir.

Loopback:

- Yazılım geliştirme
- Yerel servisler
- Test
- Sistem bileşenleri

için yaygın biçimde kullanılır.

---

# 41. Paket Nedir?

Network iletişiminde veri farklı katmanlarda farklı veri birimleri içerisinde taşınır.

Günlük konuşmada bunların tamamına bazen:

**packet**

denebilir.

Ancak teknik olarak katmana göre farklı isimlerle karşılaşırız.

Basitleştirilmiş olarak:

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
BITS / SIGNAL
```

UDP kullanıldığında:

```text
UDP DATAGRAM
```

ifadesiyle karşılaşabilirsin.

Bu yapıya:

**encapsulation — kapsülleme**

denir.

---

# 42. Encapsulation Nedir?

Bir uygulamanın veri gönderdiğini düşün.

Örneğin:

```text
"Merhaba"
```

Uygulama verisi network stack içerisinde aşağı doğru ilerlerken farklı protokol başlıkları eklenebilir.

Basitleştirilmiş olarak:

```text
[ UYGULAMA VERİSİ ]

        ↓

[ TCP HEADER | DATA ]

        ↓

[ IP HEADER | TCP | DATA ]

        ↓

[ ETHERNET HEADER | IP | TCP | DATA | FCS ]
```

Karşı tarafta ilgili katmanlar bu bilgileri işler.

Buna ters yönde:

**decapsulation**

denir.

Bu modeli Ders 07'de protokollerle büyüteceğiz.

---

# 43. Ethernet Frame Nedir?

Yerel Ethernet iletişiminde veri:

**frame**

olarak taşınır.

Basitleştirilmiş bir Ethernet frame:

```text
┌─────────────────┬────────────────┬─────────────┬────────┐
│ Destination MAC │ Source MAC     │ Payload     │  FCS   │
└─────────────────┴────────────────┴─────────────┴────────┘
```

Gerçek Ethernet frame yapısında başka alanlar da vardır.

Burada önemli olan:

> **MAC adresleri Ethernet frame seviyesinde kullanılır.**

---

# 44. IP Packet Nedir?

IP katmanında veri:

**packet**

olarak taşınır.

Basitleştirilmiş:

```text
┌────────────┬────────────────┬──────────────────┐
│ Source IP  │ Destination IP │ Payload          │
└────────────┴────────────────┴──────────────────┘
```

Örneğin:

```text
Source IP:
192.168.1.10

Destination IP:
8.8.8.8
```

olabilir.

Router'lar özellikle destination IP bilgisini kullanarak paketleri yönlendirir.

---

# 45. Aynı Subnet'teki İki Bilgisayar Nasıl Konuşur?

Örnek:

```text
PC-A
IP: 192.168.1.10/24

PC-B
IP: 192.168.1.20/24
```

PC-A hedefin aynı subnet'te olduğunu belirler.

Ardından IPv4 Ethernet ağı varsayımıyla:

```text
1. PC-A hedef IP'nin yerel olduğunu belirler.

2. PC-B'nin MAC adresini bilmiyorsa ARP kullanabilir.

3. PC-A Ethernet frame oluşturur.

4. Destination MAC = PC-B'nin MAC'i.

5. Switch frame'i uygun porta iletir.

6. PC-B frame'i alır ve üst katmanlarda işler.
```

Basitleştirilmiş:

```text
PC-A
 │
 │ ARP / Ethernet
 ▼
SWITCH
 │
 ▼
PC-B
```

Bu iletişim için router'a ihtiyaç olmayabilir.

---

# 46. Farklı Subnet'teki Bir Sisteme Nasıl Ulaşılır?

Şimdi:

```text
PC-A
192.168.1.10/24
```

şu hedefe ulaşmak istiyor:

```text
8.8.8.8
```

PC-A subnet hesabı sonucunda hedefin yerel olmadığını anlar.

Ardından routing tablosuna bakar.

Daha özel bir route yoksa default route kullanılabilir.

Kavramsal akış:

```text
PC-A
192.168.1.10
     │
     │ Hedef IP: 8.8.8.8
     ▼
Default Gateway
192.168.1.1
     │
     ▼
Router
     │
     ▼
Diğer Router'lar
     │
     ▼
8.8.8.8
```

PC-A'nın ilk Ethernet frame'inde:

```text
Destination MAC
```

yerel router'ın MAC adresidir.

Ancak IP packet içerisindeki:

```text
Destination IP
```

uzak hedef adresidir.

Bu ayrım network'ün temel mantıklarından biridir.

---

# 47. Bir Router'dan Geçerken Ne Değişir?

Basitleştirilmiş olarak düşünelim.

İlk link:

```text
PC → Router
```

Ethernet frame:

```text
Source MAC      = PC
Destination MAC = Router
```

IP packet:

```text
Source IP       = PC'nin IP'si
Destination IP  = Uzak hedef
```

Router frame'i işler ve paketi sonraki link için yeni bir Layer 2 frame içerisinde iletir.

Dolayısıyla:

> **MAC adresleri hop/link bazında değişebilir.**

IP adresleri ise normal routing sırasında uçtan uca adreslemeyi temsil eder.

Ancak:

**NAT**

gibi mekanizmalar IP ve port bilgilerini değiştirebilir.

---

# 48. TTL Nedir?

IPv4 paketlerinde:

**TTL — Time To Live**

alanı bulunur.

Adına rağmen modern IP routing bağlamında temel işlevi paketin geçebileceği router hop sayısını sınırlamaktır.

Her router paketi yönlendirdiğinde TTL değerini azaltır.

Örneğin:

```text
TTL = 64
   │
   ▼
Router 1
TTL = 63
   │
   ▼
Router 2
TTL = 62
```

TTL sıfıra ulaştığında paket normal olarak daha fazla yönlendirilmez ve router bir ICMP hata mesajı oluşturabilir.

Bu mekanizma routing loop'larında paketlerin sonsuza kadar dolaşmasını engellemeye yardımcı olur.

IPv6'da benzer alan:

**Hop Limit**

olarak adlandırılır.

---

# 49. Paketler Her Zaman Aynı Yoldan Mı Gider?

Hayır.

Internet büyük ve dinamik bir routing sistemidir.

Paketlerin izlediği yol:

- Routing politikalarına,
- Network durumuna,
- Arızalara,
- ISP yapılarına,
- Yük dengeleme mekanizmalarına

göre değişebilir.

Hatta gidiş ve dönüş trafiği farklı yollar izleyebilir.

Bu nedenle:

```text
Bilgisayar → Router → Internet → Server
```

şeması yalnızca kavramsal bir modeldir.

Gerçekte arada birçok router ve ağ bulunabilir.

---

# 50. Latency Nedir?

**Latency — gecikme**, verinin ağ üzerinde bir noktadan diğerine ulaşmasıyla ilişkili zaman gecikmesidir.

Örneğin:

```text
10 ms
30 ms
100 ms
```

gibi değerlerle karşılaşabilirsin.

Gecikmeyi etkileyebilecek faktörler arasında:

- Fiziksel mesafe
- İletim ortamı
- Routing yolu
- Queueing
- Ağ cihazlarının işlemesi
- Ağ yoğunluğu

bulunabilir.

---

# 51. Bandwidth ve Throughput Aynı Şey Mi?

Tam olarak değil.

**Bandwidth**, bir bağlantının teorik/nominal veri taşıma kapasitesiyle ilişkilidir.

**Throughput** ise pratikte belirli bir zaman aralığında elde edilen gerçek veri aktarım miktarıdır.

Örneğin:

```text
Bağlantı kapasitesi:
1 Gbps

Gerçekte ölçülen throughput:
650 Mbps
```

olabilir.

Ayrıca:

**latency**

bunlardan farklı bir kavramdır.

```text
Bandwidth ≠ Throughput ≠ Latency
```

---

# 52. Packet Loss Nedir?

Network üzerinden gönderilen bütün paketlerin hedefe ulaşması garanti değildir.

Bazı paketler:

- Ağ yoğunluğu,
- Hatalar,
- Kablosuz parazit,
- Buffer taşması,
- Güvenlik politikaları

gibi nedenlerle kaybolabilir.

Buna:

**Packet Loss**

denir.

TCP gibi bazı protokoller kayıp veriyi telafi etmek için yeniden iletim mekanizmaları kullanabilir.

UDP ise farklı davranır.

Bunu Ders 07'de inceleyeceğiz.

---

# 53. Process Network'e Nasıl Bağlanır?

Ders 05'te socket kavramına giriş yapmıştık.

Bir process doğrudan:

> "Ethernet kablosuna veri yazıyorum."

şeklinde çalışmaz.

Basitleştirilmiş olarak:

```text
PROCESS
   │
   ▼
SOCKET / NETWORK API
   │
   ▼
OPERATING SYSTEM
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
NETWORK
```

Bu ilişki güvenlik açısından çok önemlidir.

Çünkü bir analist:

```text
Hangi process
        │
        ▼
Hangi socket
        │
        ▼
Hangi IP
        │
        ▼
Hangi port
        │
        ▼
Hangi uzak sistem
```

ilişkisini araştırmak isteyebilir.

---

# 54. Network Segmentasyonu

Büyük bir kurumun bütün cihazlarını tek bir düz ağda tutmak yerine farklı network segmentleri oluşturulabilir.

Örneğin:

```text
                    FIREWALL / ROUTER
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
      USER VLAN       SERVER VLAN      GUEST VLAN
          │               │               │
       Laptoplar        Sunucular       Misafirler
```

Bu segmentlerin birbirleriyle olan iletişimi:

- Router
- Firewall
- ACL
- Güvenlik politikaları

ile kontrol edilebilir.

---

# 55. VLAN Nedir?

**VLAN — Virtual Local Area Network**

fiziksel switch altyapısı üzerinde mantıksal Layer 2 ağ segmentleri oluşturulmasına yardımcı olan teknolojidir.

Örneğin aynı fiziksel switch üzerinde:

```text
Switch
│
├── VLAN 10 → Kullanıcılar
├── VLAN 20 → Sunucular
└── VLAN 30 → Misafirler
```

oluşturulabilir.

VLAN:

> "Tek başına firewall"

değildir.

Farklı VLAN'lar arasındaki iletişim için routing gerekir ve güvenlik politikaları ayrıca uygulanabilir.

---

# 56. Segmentasyon Neden Güvenlik İçin Önemlidir?

Bir saldırgan bir kullanıcı bilgisayarını ele geçirdiğini düşün.

Eğer bütün sistemler sınırsız şekilde aynı ağ erişimine sahipse saldırganın diğer sistemlere ulaşması daha kolay olabilir.

Segmentasyon ile:

```text
Kullanıcı Ağı
      │
      ▼
Güvenlik Kontrolü
      │
      ▼
Sunucu Ağı
```

şeklinde sınırlar oluşturulabilir.

Ama segmentasyon tek başına güvenlik sağlamaz.

Yanlış firewall veya ACL kuralları varsa segmentler arasında gereğinden fazla erişim hâlâ mümkün olabilir.

Bu nedenle:

> **Segmentasyon güvenlik mimarisinin bir parçasıdır, tek başına çözüm değildir.**

---

# 57. Network Discovery Nedir?

Bir ağın yapısını anlamak amacıyla:

- Hangi IP aralıklarının bulunduğunu,
- Hangi sistemlerin erişilebilir olduğunu,
- Hangi cihazların hangi adresleri kullandığını

belirleme süreçleri genel olarak network discovery ile ilişkilendirilebilir.

Daha sonra:

- Port discovery
- Service enumeration
- Network mapping

gibi daha ayrıntılı çalışmalar yapılabilir.

Bu işlemler sistem yöneticileri, güvenlik ekipleri ve yetkili pentest çalışanları tarafından meşru amaçlarla kullanılabilir.

> Başkasına ait ağlarda izinsiz tarama veya test gerçekleştirilmemelidir.

Port ve servis keşfini Ders 08'de kontrollü laboratuvar ortamında inceleyeceğiz.

---

# 58. Network ve Malware

Zararlı yazılımlar ağ iletişimini birçok farklı amaçla kullanabilir.

Örneğin bazı malware örnekleri:

```text
Dosya indirebilir

Komut alabilir

Veri gönderebilir

Başka sistemlerle iletişim kurabilir

Command & Control sunucularıyla bağlantı kurabilir
```

Kavramsal olarak:

```text
Compromised Host
      │
      ▼
Malicious Process
      │
      ▼
Socket
      │
      ▼
Network
      │
      ▼
Remote Infrastructure
```

Ancak:

> Bilinmeyen bir IP'ye bağlantı = Kesin malware

değildir.

Bulut servisleri, CDN'ler, güncelleme sistemleri ve birçok meşru yazılım çok çeşitli IP adresleriyle iletişim kurabilir.

Bağlam yine önemlidir.

---

# 59. Network ve DFIR

Olay müdahalesinde network artefaktları önemli bilgi sağlayabilir.

Örneğin:

```text
Source IP
Destination IP
Source Port
Destination Port
Protocol
Timestamp
Bytes Transferred
Process
Domain
```

gibi bilgiler araştırılabilir.

Analist örneğin:

```text
Process
   │
   ▼
192.168.1.25
   │
   ▼
203.0.113.50
   │
   ▼
Belirli bir zaman aralığı
```

gibi ilişkileri inceleyebilir.

> `203.0.113.0/24` dokümantasyon ve örnekler için ayrılmış TEST-NET adres bloklarından biridir; burada gerçek hedef olarak kullanılmamaktadır.

---

# 60. Network Görünürlüğü Nereden Gelir?

Bir güvenlik analisti network hakkında farklı veri kaynaklarından bilgi alabilir.

Örneğin:

```text
Firewall Logs

Router Logs

DNS Logs

VPN Logs

Proxy Logs

NetFlow / IPFIX

Packet Capture

EDR Network Telemetry

Server Logs
```

Bu veri kaynaklarının her biri farklı seviyede görünürlük sağlar.

Örneğin:

**Packet Capture — PCAP**

paket seviyesinde ayrıntılı veri sağlayabilir.

**NetFlow/IPFIX**

ise iletişim akışlarına ilişkin özet bilgiler sağlayabilir.

Bunları ilerleyen network security ve DFIR derslerinde inceleyeceğiz.

---

# 61. Bir Güvenlik Analisti Gibi Düşün

EDR üzerinde şu olayı gördüğünü düşün:

```text
Process:
unknown.exe

Local IP:
192.168.1.25

Remote IP:
203.0.113.50

Protocol:
TCP
```

Buradan:

> "Bu kesin saldırıdır."

diyemeyiz.

Analist şunları araştırabilir:

```text
Process nereden çalışıyor?

Dosyanın hash'i nedir?

Dijital imzası var mı?

Remote IP kime ait?

Bağlantı hangi port üzerinden kuruldu?

DNS sorgusu var mı?

Ne kadar veri aktarıldı?

Bağlantı ne sıklıkla tekrarlanıyor?

Aynı hedefe başka makineler bağlanıyor mu?

Process'in parent'ı kim?

Başka şüpheli davranış var mı?
```

Bu bize önceki derslerde öğrendiğimiz temel prensibi tekrar gösterir:

> **Tek bir network göstergesi yerine bağlam ve korelasyon önemlidir.**

---

# 🧪 Uygulama 06 — Kendi Networkünü Tanı

Bu uygulamada yalnızca kendi bilgisayarını ve kullanma yetkin bulunan ağ ortamını incele.

Herhangi bir yabancı sisteme tarama veya yetkisiz keşif gerçekleştirme.

---

## Görev 1 — Network Interface'lerini Bul

### Windows

PowerShell:

```powershell
Get-NetAdapter
```

veya:

```cmd
ipconfig /all
```

### Linux

```bash
ip link
```

### macOS

```bash
ifconfig
```

kullanabilirsin.

Şunları belirle:

```text
Aktif interface:

____________________________________

Bağlantı türü:

[ ] Ethernet
[ ] Wi-Fi
[ ] VPN
[ ] Diğer
```

---

# 🧪 Görev 2 — IPv4 Adresini Bul

### Windows

```cmd
ipconfig
```

### Linux

```bash
ip addr
```

### macOS

```bash
ifconfig
```

Aktif interface'in IPv4 adresini bul:

```text
IPv4:

____________________________________
```

Subnet mask veya prefix:

```text
____________________________________
```

Şimdi sor:

> Bu IP RFC1918 private aralıklarından birinde mi?

```text
[ ] Evet
[ ] Hayır
```

---

# 🧪 Görev 3 — Default Gateway'i Bul

### Windows

```cmd
ipconfig
```

veya:

```cmd
route print
```

### Linux

```bash
ip route
```

### macOS

```bash
route -n get default
```

Gateway:

```text
____________________________________
```

Şimdi düşün:

> Default gateway ile bilgisayarımın IPv4 adresi aynı subnet'te mi?

```text
____________________________________________________
```

Tipik bir ev ağında cevap genellikle evettir.

---

# 🧪 Görev 4 — Routing Table'ı İncele

### Windows

```cmd
route print
```

### Linux

```bash
ip route
```

### macOS

```bash
netstat -rn
```

Default route'u bulmaya çalış.

Örneğin Linux'ta:

```text
default via 192.168.1.1 ...
```

benzeri bir çıktı görebilirsin.

Şunları yaz:

```text
Default Route:

____________________________________

Gateway:

____________________________________

Interface:

____________________________________
```

---

# 🧪 Görev 5 — MAC Adresini Bul

### Windows

```cmd
ipconfig /all
```

veya:

```powershell
Get-NetAdapter
```

### Linux

```bash
ip link
```

### macOS

```bash
ifconfig
```

Aktif interface'in MAC adresini bul:

```text
MAC:

____________________________________
```

Şimdi şu soruyu cevapla:

> IP adresi ile MAC adresi neden aynı amaca hizmet etmiyor?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 6 — ARP / Neighbor Tablosunu İncele

Windows:

```cmd
arp -a
```

veya modern PowerShell üzerinde:

```powershell
Get-NetNeighbor
```

Linux:

```bash
ip neigh
```

macOS:

```bash
arp -a
```

kullanabilirsin.

Çıktıda IP ve MAC eşleşmelerini gözlemle.

Her cihazın görünmesi gerekmez.

```text
IP:

____________________________________

MAC:

____________________________________
```

Bu görev yalnızca kendi yerel ağındaki mevcut neighbor/ARP cache bilgisini gözlemlemek içindir.

---

# 🧪 Görev 7 — Loopback'i Test Et

Kendi bilgisayarını test etmek için:

```text
127.0.0.1
```

adresine ping gönderebilirsin.

Windows/Linux/macOS:

```bash
ping 127.0.0.1
```

Bazı sistemlerde komutu durdurmak için:

```text
CTRL + C
```

kullanabilirsin.

Şimdi düşün:

> Bu trafik Internet'e çıktı mı?

Cevap:

```text
____________________________________________________
```

---

# 🧪 Görev 8 — IPv6 Adreslerini Gözlemle

Sisteminde IPv6 etkinse interface üzerinde IPv6 adresleri görebilirsin.

Windows:

```cmd
ipconfig
```

Linux:

```bash
ip -6 addr
```

macOS:

```bash
ifconfig
```

Şuna benzeyen bir adres bulabiliyor musun?

```text
fe80::...
```

Bu bir link-local IPv6 adresi olabilir.

```text
IPv6:

____________________________________
```

IPv6 adresi göremiyorsan sorun değil.

---

# 🧪 Görev 9 — Network Topolojini Çiz

Kendi ev veya laboratuvar ağını bildiğin kadarıyla çiz.

Örneğin:

```text
                  INTERNET
                     │
                     ▼
                 ISP CİHAZI
                     │
                     ▼
              ROUTER / FIREWALL
                /          \
               /            \
              ▼              ▼
           SWITCH       ACCESS POINT
          /     \          /       \
         ▼       ▼        ▼         ▼
        PC    NAS       Laptop    Telefon
```

Cihazının bu topolojinin neresinde bulunduğunu işaretle.

Bilmediğin parçaları tahmin etmek zorunda değilsin.

---

# 🧪 Görev 10 — Yerel mi Uzak mı?

Kendi IPv4 adresinin örneğin:

```text
192.168.1.25/24
```

olduğunu varsay.

Şu hedefleri değerlendir:

```text
192.168.1.50

192.168.2.50

8.8.8.8
```

Hangileri aynı `/24` subnet'tedir?

```text
192.168.1.50 → ____________________

192.168.2.50 → ____________________

8.8.8.8     → ____________________
```

İlk hedefin aynı subnet'te olduğunu fark etmeye çalış.

---

# 🔐 Siber Güvenlik Görevi — Network Profilini Oluştur

Kendi cihazının küçük bir network profilini hazırla:

```text
Hostname:

____________________________________

Aktif Interface:

____________________________________

IPv4:

____________________________________

Subnet / Prefix:

____________________________________

IPv6:

____________________________________

MAC:

____________________________________

Default Gateway:

____________________________________

Private / Public:

____________________________________

Bağlantı Türü:

____________________________________
```

Sonra şu sorulara cevap ver:

```text
1. Cihazım kendi subnet'indeki başka bir sisteme
   giderken router'a ihtiyaç duyar mı?

____________________________________________________


2. Uzak bir IP'ye giderken ilk Layer 2 hedefi
   genellikle kim olur?

____________________________________________________


3. IP ve MAC adresleri hangi farklı görevleri yerine getirir?

____________________________________________________


4. Default gateway neden gereklidir?

____________________________________________________
```

---

# 🧠 Kendini Test Et

## Soru 1

Network nedir?

**A)** Yalnızca Internet bağlantısı  
**B)** Cihazların belirli iletişim teknolojileri ve protokoller kullanarak veri alışverişi yapabildiği yapı  
**C)** Bir CPU özelliği  
**D)** Dosya sistemi

---

## Soru 2

Aşağıdakilerden hangisi RFC1918 private IPv4 adresidir?

**A)** `172.50.10.5`  
**B)** `172.20.10.5`  
**C)** `8.8.8.8`  
**D)** `1.1.1.1`

---

## Soru 3

`192.168.1.10/24` ifadesindeki `/24` neyi belirtir?

**A)** Port numarasını  
**B)** MAC adresini  
**C)** Network prefix uzunluğunu  
**D)** CPU çekirdek sayısını

---

## Soru 4

Bir bilgisayar kendi subnet'i dışındaki hedefe ulaşırken daha özel bir route yoksa genellikle ne kullanır?

**A)** Default route / gateway  
**B)** RAM  
**C)** File system  
**D)** CPU cache

---

## Soru 5

IPv4 Ethernet LAN'ında ARP'nin temel amacı nedir?

**A)** Domain adını IP'ye çevirmek  
**B)** Yerel IPv4 adresiyle MAC adresi arasındaki eşlemeyi öğrenmek  
**C)** Dosya hash'i hesaplamak  
**D)** Router'ın şifresini bulmak

---

## Soru 6

Bir bilgisayar:

```text
192.168.1.10/24
```

adresinde ve hedef:

```text
8.8.8.8
```

ise ilk Ethernet frame'inin destination MAC'i genellikle kime aittir?

**A)** `8.8.8.8` sunucusunun uzak MAC adresine  
**B)** Yerel next-hop/router'ın MAC adresine  
**C)** Kendi MAC adresine  
**D)** DNS sunucusunun MAC adresine

---

## Soru 7

Switch'in temel olarak kullandığı adres türü hangisidir?

**A)** MAC  
**B)** URL  
**C)** Username  
**D)** File hash

---

## Soru 8

Router temel olarak hangi bilgiye göre IP paketlerini yönlendirir?

**A)** Destination IP ve routing table  
**B)** Dosya uzantısı  
**C)** Kullanıcı parolası  
**D)** RAM kapasitesi

---

## Soru 9

NAT ile firewall aynı şey midir?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 10

Hangisi doğrudur?

**A)** Client her zaman fiziksel laptop'tur.  
**B)** Server her zaman veri merkezindeki fiziksel makinedir.  
**C)** Client ve server öncelikle iletişim rolleridir.  
**D)** Aynı bilgisayar hem client hem server olamaz.

---

## Soru 11

`127.0.0.1` neyle ilişkilidir?

**A)** Public Internet adresi  
**B)** IPv4 loopback  
**C)** MAC broadcast  
**D)** Default gateway olmak zorundadır

---

## Soru 12

IPv6 adresleri kaç bittir?

**A)** 16  
**B)** 32  
**C)** 64  
**D)** 128

---

## Soru 13

Aşağıdakilerden hangisi doğru sıralamadır?

**A)** Ethernet Frame → IP Packet → TCP Segment → Application Data  
**B)** Application Data → TCP Segment → IP Packet → Ethernet Frame  
**C)** IP Packet → CPU → File → Ethernet Frame  
**D)** MAC → RAM → DNS → Process

---

## Soru 14

Bir process bilinmeyen bir public IP'ye bağlantı kurdu.

Bundan:

> "Bu process kesin malware."

sonucuna varabilir miyiz?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 15 — Analist Sorusu

Bir olayda aşağıdaki bilgi görüldü:

```text
Process: unknown.exe
Source: 192.168.1.25
Destination: 203.0.113.50
Protocol: TCP
```

Analiz için en az beş ek soru yaz:

```text
1.

2.

3.

4.

5.
```

---

# 🎯 Ana Görev — Bir Paketin Yolculuğunu Açıkla

Bilgisayarın:

```text
IP:
192.168.1.25/24

Default Gateway:
192.168.1.1
```

olsun.

Bir uygulama:

```text
203.0.113.50
```

adresindeki uzak sunucuyla iletişim kurmak istiyor.

Aşağıdaki kavramları kullanarak süreci kendi cümlelerinle açıkla:

```text
Process
Socket
IP
Subnet
Routing Table
Default Gateway
ARP
MAC
Ethernet Frame
Switch / Access Point
Router
IP Packet
Remote Network
```

En az 8 aşama yaz:

```text
1.

2.

3.

4.

5.

6.

7.

8.
```

Şu soruya özellikle cevap verebilmelisin:

> PC neden uzak sunucunun MAC adresini aramak yerine kendi yerel router'ının MAC adresini öğrenir?

---

# 🔍 Bonus — Paket ile Frame'i Ayır

Aşağıdaki senaryoda:

```text
PC
  │
  ▼
Router 1
  │
  ▼
Router 2
  │
  ▼
Server
```

şunları düşün:

```text
IP destination her linkte aynı kalmak zorunda mı?

Layer 2 destination MAC her linkte aynı mı?

NAT varsa hangi bilgiler değişebilir?
```

Cevaplarını yaz:

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

Bu soruların tamamına kusursuz cevap veremiyorsan sorun değil.

Ders 07'de protokol katmanlarını daha ayrıntılı inceleyeceğiz.

---

# 🔐 Siber Güvenlik Bağlantısı

Network bilgisi farklı güvenlik uzmanlıklarının merkezindedir.

```text
NETWORK
│
├── BLUE TEAM
│   ├── Firewall Logs
│   ├── IDS / IPS
│   ├── Network Detection
│   └── Traffic Analysis
│
├── DFIR
│   ├── Source / Destination IP
│   ├── Network Timeline
│   ├── PCAP
│   └── Flow Data
│
├── MALWARE ANALYSIS
│   ├── C2 Traffic
│   ├── DNS Requests
│   ├── Connections
│   └── Data Transfer
│
├── PENETRATION TESTING
│   ├── Network Discovery
│   ├── Routing
│   ├── Segmentation
│   └── Service Enumeration
│
└── CLOUD SECURITY
    ├── Virtual Networks
    ├── Subnets
    ├── Routing
    └── Security Controls
```

Bu dersin kavramları ileride neredeyse bütün güvenlik alanlarında tekrar karşımıza çıkacak.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Bir network bağlantısını artık yalnızca:

```text
Bilgisayar
   │
   ▼
Internet
```

olarak düşünmemelisin.

Daha doğru model:

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
                ROUTING TABLE
                       │
                       ▼
              NETWORK INTERFACE
                       │
                       ▼
                  LAYER 2
               MAC / ETHERNET
                       │
                       ▼
             SWITCH / ACCESS POINT
                       │
                       ▼
                    ROUTER
                       │
                       ▼
                 OTHER NETWORKS
                       │
                       ▼
                 REMOTE SYSTEM
```

Aynı subnet'te:

```text
IP
 │
 ▼
ARP
 │
 ▼
Destination MAC
 │
 ▼
Switch
 │
 ▼
Target
```

Uzak subnet'te ise:

```text
Remote Destination IP
        │
        ▼
   Routing Table
        │
        ▼
 Default Gateway
        │
        ▼
Gateway MAC
        │
        ▼
     Router
        │
        ▼
   Other Networks
```

mantığını kullanırız.

Bu iki akışın farkını anlıyorsan dersin en önemli bölümünü anlamışsın demektir.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Network kavramını açıklayabiliyorum.
- [ ] Internet ile network'ün aynı şey olmadığını biliyorum.
- [ ] LAN ve WAN arasındaki temel farkı biliyorum.
- [ ] Network interface kavramını açıklayabiliyorum.
- [ ] IPv4'ün 32 bit olduğunu biliyorum.
- [ ] RFC1918 private IPv4 aralıklarını tanıyorum.
- [ ] Public ve private IP ayrımını temel seviyede biliyorum.
- [ ] NAT'ın ne olduğunu temel seviyede açıklayabiliyorum.
- [ ] NAT ile firewall'ın aynı şey olmadığını biliyorum.
- [ ] IPv6'nın 128 bit olduğunu biliyorum.
- [ ] IPv6 link-local kavramını tanıyorum.
- [ ] Subnet kavramını temel seviyede anlayabiliyorum.
- [ ] `/24` CIDR gösterimini okuyabiliyorum.
- [ ] Default gateway'in görevini açıklayabiliyorum.
- [ ] Routing table kavramını tanıyorum.
- [ ] MAC adresinin temel görevini biliyorum.
- [ ] MAC'in değiştirilemez cihaz kimliği olmadığını biliyorum.
- [ ] IP ve MAC arasındaki farkı açıklayabiliyorum.
- [ ] ARP'nin ne yaptığını biliyorum.
- [ ] IPv6'nın ARP yerine Neighbor Discovery kullandığını biliyorum.
- [ ] Switch'in temel görevini açıklayabiliyorum.
- [ ] Router'ın temel görevini açıklayabiliyorum.
- [ ] Access Point'in ne yaptığını biliyorum.
- [ ] Modem ve router'ın aynı kavram olmadığını biliyorum.
- [ ] Client ve server'ın öncelikle rol olduğunu biliyorum.
- [ ] localhost ve loopback kavramlarını biliyorum.
- [ ] Packet, frame ve segment arasındaki temel ayrımı tanıyorum.
- [ ] Encapsulation kavramını temel seviyede açıklayabiliyorum.
- [ ] TTL kavramını tanıyorum.
- [ ] Bandwidth, throughput ve latency'nin farklı kavramlar olduğunu biliyorum.
- [ ] VLAN kavramını temel seviyede tanıyorum.
- [ ] Segmentasyonun neden güvenlik açısından önemli olduğunu biliyorum.
- [ ] Kendi IPv4 adresimi buldum.
- [ ] Kendi subnet/prefix bilgimi buldum.
- [ ] Default gateway'imi buldum.
- [ ] MAC adresimi buldum.
- [ ] ARP/neighbor tablosunu gözlemledim.
- [ ] Routing table'ımı inceledim.
- [ ] Loopback adresini test ettim.
- [ ] Network topolojimi çizdim.
- [ ] Quiz sorularını cevapladım.
- [ ] Paket yolculuğu görevini tamamladım.

---

# 🧩 Dersin Özeti

Artık bilgisayarın dış dünya ile iletişimini daha ayrıntılı görebiliyoruz:

```text
                   APPLICATION
                       │
                       ▼
                     PROCESS
                       │
                       ▼
                     SOCKET
                       │
                       ▼
                  TCP / UDP
                       │
                       ▼
                   IP PACKET
                       │
                       ▼
                  ROUTING
                       │
                       ▼
               NETWORK INTERFACE
                       │
                       ▼
               ETHERNET / WI-FI
                       │
                       ▼
             SWITCH / ACCESS POINT
                       │
                       ▼
                    ROUTER
                       │
                       ▼
                  INTERNET
                       │
                       ▼
                REMOTE NETWORK
                       │
                       ▼
                REMOTE SYSTEM
```

Yerel iletişimde:

```text
IPv4 → ARP → MAC → Frame
```

gibi ilişkiler önem kazanırken farklı ağlar arasında:

```text
IP → Routing Table → Router → Next Hop
```

mantığı devreye girer.

Siber güvenlik analisti ise bu iletişime:

```text
Process
   │
   ▼
Source IP
   │
   ▼
Source Port
   │
   ▼
Protocol
   │
   ▼
Destination IP
   │
   ▼
Destination Port
   │
   ▼
Network Behavior
```

şeklinde bakmaya başlayabilir.

Port ve transport protokollerini henüz ayrıntılı öğrenmedik.

Şimdi sıradaki dersimiz tam olarak bunun üzerine kurulacak.

---

# 🚀 Sonraki Ders

## Ders 07 — Network Protocols: TCP, UDP, DNS, HTTP ve Ağ İletişiminin Kuralları

Bir sonraki derste artık verinin hangi kurallara göre taşındığını inceleyeceğiz.

Şu soruların cevaplarını arayacağız:

- Network protocol nedir?
- OSI ve TCP/IP modelleri ne işe yarar?
- TCP nedir?
- UDP nedir?
- TCP ile UDP arasındaki fark nedir?
- Port nedir?
- Socket nedir?
- TCP Three-Way Handshake nasıl çalışır?
- Sequence number ve ACK ne işe yarar?
- DNS bir domain'i IP adresine nasıl dönüştürür?
- DHCP cihazlara nasıl network yapılandırması verir?
- HTTP ve HTTPS arasındaki fark nedir?
- TLS ne işe yarar?
- ICMP nedir?
- SSH nedir?
- SMTP, IMAP ve POP3 ne işe yarar?
- FTP ile SFTP neden aynı şey değildir?

Ve Ders 06'daki:

```text
Process
   │
   ▼
Socket
   │
   ▼
Network
```

modelini:

```text
PROCESS
   │
   ▼
SOCKET
   │
   ▼
PORT
   │
   ▼
TCP / UDP
   │
   ▼
IP
   │
   ▼
NETWORK
```

şeklinde tamamlamaya başlayacağız.