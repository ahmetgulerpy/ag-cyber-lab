# Ders 12 — Final Assessment: Modül 01

> **AG Cyber Lab — Community Edition**
>
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ders:** 12 / 12  
> **Seviye:** Başlangıç  
> **Tür:** Final Değerlendirmesi  
> **Toplam Puan:** 100  
> **Önerilen Süre:** 90–120 dakika

---

# 🎯 Final Assessment'ın Amacı

Bu değerlendirme, Modül 01 boyunca öğrendiğin bilgileri yalnızca hatırlayıp hatırlamadığını değil, yeni bir durum karşısında kullanıp kullanamadığını ölçmek için hazırlanmıştır.

Bu sınavda yeni konu anlatılmayacaktır.

Senden beklenen:

- Bilgisayarın temel çalışma mantığını açıklayabilmek,
- İşletim sistemi ve dosya sistemi kavramlarını yorumlayabilmek,
- Program, process ve thread arasındaki ilişkiyi kurabilmek,
- Temel network iletişimini açıklayabilmek,
- IP, port, protocol ve service kavramlarını ayırabilmek,
- Terminal çıktılarından anlamlı bilgiler çıkarabilmek,
- Dosya ve process bilgilerini değerlendirebilmek,
- Threat, vulnerability, exposure ve risk kavramlarını doğru kullanabilmek,
- Gözlem ile yorumu birbirinden ayırabilmek,
- Bilmediğin bir bilgiyi tahmin ederek gerçek gibi yazmamak,
- Bir güvenlik vakası için sistematik araştırma planı oluşturabilmek.

Bu değerlendirmede yalnızca:

> **Doğru cevap nedir?**

değil:

> **Bu sonuca hangi kanıtla ulaştın?**

sorusu da önemlidir.

---

# ⚠️ Değerlendirme Kuralları

Bu sınavın vaka bölümlerinde aşağıdaki prensipleri kullan:

```text
GÖZLEM ≠ SONUÇ

ŞÜPHE ≠ KANIT

ALERT ≠ INCIDENT

OPEN PORT ≠ VULNERABILITY

PORT NUMARASI ≠ SERVİSİN KESİN KİMLİĞİ
```

Bilmediğin bir bilgi varsa:

```text
Bilinmiyor
```

yazabilirsin.

Bu yanlış cevap değildir.

Kanıt olmadan kesin bir iddia üretmekten daha doğru bir analist davranışıdır.

---

# 🛡️ Güvenli Uygulama Kuralı

Uygulamalı bölümde yalnızca:

- Kendi bilgisayarını,
- Kendi oluşturduğun zararsız dosyaları,
- Açıkça kullanma yetkin bulunan sistemleri

incele.

Bu değerlendirme için:

- Yabancı sistem taramak,
- Şüpheli dosya indirmek,
- Malware çalıştırmak,
- Process sonlandırmak,
- Firewall ayarı değiştirmek,
- Sistem dosyası silmek

gerekmemektedir.

---

# 📊 Değerlendirme Yapısı

| Bölüm | Konu | Puan |
|---|---|---:|
| Bölüm 1 | Bilgisayar ve İşletim Sistemi | 10 |
| Bölüm 2 | Dosya Sistemi ve Dosya Analizi | 10 |
| Bölüm 3 | Process, Thread ve Bellek | 10 |
| Bölüm 4 | Network, Protocol, Port ve Service | 15 |
| Bölüm 5 | Command Line Uygulaması | 10 |
| Bölüm 6 | Temel Siber Güvenlik ve Risk | 10 |
| Bölüm 7 | Analist Muhakemesi | 10 |
| Bölüm 8 | Final Incident Case | 25 |
| **Toplam** | | **100** |

---

# BÖLÜM 1 — Bilgisayar ve İşletim Sistemi

> **10 Puan**

---

## Soru 1 — 2 Puan

CPU, RAM ve depolamanın temel görevlerini kendi cümlelerinle açıkla.

```text
CPU:

____________________________________________________

RAM:

____________________________________________________

Depolama:

____________________________________________________
```

---

## Soru 2 — 2 Puan

Bir program çalıştırıldığında aşağıdaki kavramları kullanarak temel süreci açıkla:

```text
Depolama
İşletim Sistemi
Process
RAM
Thread
CPU
```

Cevabın:

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

## Soru 3 — 2 Puan

İşletim sistemi neden gereklidir?

En az üç farklı görevini yaz.

```text
1.

2.

3.
```

---

## Soru 4 — 2 Puan

Kernel ile işletim sistemi aynı şey midir?

User mode ile kernel mode ayrımının neden önemli olduğunu açıkla.

```text
____________________________________________________

____________________________________________________
```

---

## Soru 5 — 2 Puan

Aşağıdaki süreci tamamla:

```text
User Mode Application
        │
        ▼
____________________
        │
        ▼
Kernel
        │
        ▼
System Resource
```

Boşluğa gelebilecek temel mekanizma nedir ve neden kullanılır?

```text
____________________________________________________

____________________________________________________
```

---

# BÖLÜM 2 — Dosya Sistemi ve Dosya Analizi

> **10 Puan**

---

## Soru 6 — 2 Puan

Aşağıdaki Windows path'ini parçalarına ayır:

```text
C:\Users\ahmet\Downloads\invoice.pdf.exe
```

```text
Drive / Volume:

____________________________

Kullanıcı dizini:

____________________________

Bulunduğu klasör:

____________________________

Dosya adı:

____________________________

Son uzantı:

____________________________
```

Bu dosyanın adında güvenlik açısından dikkatini çeken bir şey var mı?

```text
____________________________________________________
```

---

## Soru 7 — 2 Puan

Bir dosyanın:

```text
report.jpg
```

olarak adlandırılması onun kesinlikle JPEG olduğunu kanıtlar mı?

Gerçek dosya türünü anlamak için başka hangi bilgi incelenebilir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 8 — 2 Puan

Aşağıdakilerden hangileri dosya metadata'sı veya dosya sistemi artefaktlarıyla ilişkili olabilir?

```text
[ ] Dosya boyutu

[ ] Timestamp

[ ] Sahiplik

[ ] İzinler

[ ] Dosya sistemi kayıtları
```

Timestamp'lerin neden tek başına kesin olay kanıtı olmadığını açıkla:

```text
____________________________________________________

____________________________________________________
```

---

## Soru 9 — 2 Puan

SHA-256 hash'in iki kullanım amacını yaz.

```text
1.

2.
```

Şu ifade doğru mudur?

> "Hash reputation sisteminde bulunmayan dosya güvenlidir."

```text
[ ] Evet
[ ] Hayır
```

Neden?

```text
____________________________________________________
```

---

## Soru 10 — 2 Puan

Bir dosyanın geçerli dijital imzaya sahip olması:

> "Bu programın bütün davranışları kesinlikle güvenlidir."

anlamına gelir mi?

Açıkla.

```text
____________________________________________________

____________________________________________________
```

---

# BÖLÜM 3 — Process, Thread ve Bellek

> **10 Puan**

Aşağıdaki process bilgisini incele:

```text
Name:
browser-update.exe

PID:
4820

Parent:
explorer.exe

Path:
C:\Users\user\AppData\Roaming\browser-update.exe

CPU:
12%

Memory:
84 MB
```

---

## Soru 11 — 2 Puan

Program ile process arasındaki fark nedir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 12 — 2 Puan

PID `4820` bize ne sağlar?

PID neden process'in sonsuza kadar benzersiz kimliği değildir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 13 — 2 Puan

Thread nedir?

Aynı process içerisindeki thread'ler hangi kaynakları paylaşabilir ve hangi önemli yürütme alanlarından biri her thread için ayrıdır?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 14 — 2 Puan

`browser-update.exe` process'inin:

```text
C:\Users\user\AppData\Roaming\
```

altında bulunması tek başına malware olduğunu kanıtlar mı?

Araştırmak istediğin dört ek bilgi yaz:

```text
1.

2.

3.

4.
```

---

## Soru 15 — 2 Puan

Aşağıdaki process tree görülüyor:

```text
explorer.exe
    │
    └── browser-update.exe
            │
            └── powershell.exe
```

Bundan:

> "Kesin saldırı gerçekleşmiştir."

sonucuna varabilir misin?

```text
[ ] Evet
[ ] Hayır
```

Hangi iki bilgiyi özellikle incelemek isterdin?

```text
1.

2.
```

---

# BÖLÜM 4 — Network, Protocol, Port ve Service

> **15 Puan**

Aşağıdaki bağlantıyı incele:

```text
192.168.1.25:52341
        │
        │ TCP
        ▼
198.51.100.40:443
```

> `198.51.100.0/24`, dokümantasyon örnekleri için ayrılmış TEST-NET bloklarından biridir. Bu sınavdaki adres gerçek bir IOC değildir.

---

## Soru 16 — 2 Puan

Bağlantıyı parçalarına ayır:

```text
Local IP:

____________________________

Local Port:

____________________________

Remote IP:

____________________________

Remote Port:

____________________________

Transport Protocol:

____________________________
```

---

## Soru 17 — 2 Puan

`52341` portunun client tarafından kullanılan ephemeral bir port olması neden mantıklıdır?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 18 — 2 Puan

Remote port `443` görülmesi:

```text
[ ] Kesin HTTPS
[ ] HTTPS ile yaygın ilişki hakkında ipucu
```

hangisidir?

Port numarası gerçek application protocol'ü neden kesin olarak kanıtlamaz?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 19 — 2 Puan

Aşağıdaki kavramları temel görevleriyle eşleştir:

```text
ARP
DNS
TCP
UDP
Router
Switch
```

```text
IPv4 → yerel MAC eşlemesi:

____________________________

Domain/isim çözümleme:

____________________________

Güvenilir byte stream:

____________________________

Connectionless datagram:

____________________________

Farklı IP networkleri arasında routing:

____________________________

Yerel Ethernet frame forwarding:

____________________________
```

---

## Soru 20 — 2 Puan

Bilgisayarın:

```text
192.168.1.25/24
```

adresinde.

Hedef:

```text
192.168.1.90
```

Aynı subnet'te mi?

```text
[ ] Evet
[ ] Hayır
```

Hedef:

```text
8.8.8.8
```

Aynı subnet'te mi?

```text
[ ] Evet
[ ] Hayır
```

Uzak hedef için bilgisayar genellikle hangi network cihazına/next-hop'a başvurur?

```text
____________________________________________________
```

---

## Soru 21 — 2 Puan

TCP Three-Way Handshake sırasını yaz:

```text
1.

2.

3.
```

TCP'deki `reliable` kelimesinin:

> "Trafik kriptografik olarak güvenlidir."

anlamına gelip gelmediğini açıkla.

```text
____________________________________________________
```

---

## Soru 22 — 1 Puan

HTTPS iletişiminde TLS'in üç temel güvenlik amacıyla ilişkisini yaz:

```text
1.

2.

3.
```

---

## Soru 23 — 2 Puan

Aşağıdaki üç kavramın farkını açıkla:

```text
LISTENING:

____________________________________________________

OPEN:

____________________________________________________

FILTERED:

____________________________________________________
```

---

# BÖLÜM 5 — Command Line Uygulaması

> **10 Puan**

Bu bölümde kendi bilgisayarındaki zararsız ve normal verileri kullan.

Windows kullanmıyorsan Linux/macOS eşdeğer araçlarını kullanabilirsin.

---

## Görev 1 — 2 Puan

Aşağıdaki bilgileri terminal üzerinden bul:

```text
Kullanıcı:

____________________________

Hostname:

____________________________

İşletim Sistemi:

____________________________

IPv4:

____________________________

Default Gateway:

____________________________
```

Kullandığın komutları yaz:

```text
____________________________________________________
```

---

## Görev 2 — 2 Puan

Kendi sisteminden normal bir process seç.

```text
Process:

____________________________

PID:

____________________________

Executable Path:

____________________________
```

Bu bilgileri hangi komut/araçlarla bulduğunu yaz:

```text
____________________________________________________
```

---

## Görev 3 — 2 Puan

Bir normal network connection veya listening endpoint seç:

```text
Transport:

____________________________

Local Endpoint:

____________________________

Remote Endpoint:

____________________________

State:

____________________________

PID:

____________________________
```

PID'yi process'e nasıl bağladığını açıkla:

```text
____________________________________________________
```

---

## Görev 4 — 2 Puan

Kendi oluşturduğun zararsız bir metin dosyasının SHA-256 hash'ini hesapla.

```text
Dosya:

____________________________

SHA-256:

____________________________________________________
```

Kullandığın komut:

```text
____________________________________________________
```

---

## Görev 5 — 2 Puan

Aşağıdaki kavramları kısa şekilde açıkla:

```text
Pipe:

____________________________________________________

stdout:

____________________________________________________

stderr:

____________________________________________________

Exit Code:

____________________________________________________
```

---

# BÖLÜM 6 — Temel Siber Güvenlik ve Risk

> **10 Puan**

---

## Soru 24 — 2 Puan

CIA Triad'ı yaz ve her bileşen için bir örnek ver.

```text
Confidentiality:

____________________________________________________

Integrity:

____________________________________________________

Availability:

____________________________________________________
```

---

## Soru 25 — 2 Puan

Aşağıdaki kavramların farkını açıkla:

```text
Threat:

____________________________________________________

Vulnerability:

____________________________________________________

Exposure:

____________________________________________________

Risk:

____________________________________________________
```

---

## Soru 26 — 2 Puan

Bir web server:

```text
TCP 443
```

üzerinden Internet'e açık.

Bu bilgi tek başına:

```text
[ ] Vulnerability
[ ] Exposure
[ ] Confirmed Incident
```

kavramlarından hangisiyle en doğrudan ilişkilidir?

Neden?

```text
____________________________________________________
```

---

## Soru 27 — 2 Puan

Risk için kullandığımız basitleştirilmiş:

```text
Risk ≈ Likelihood × Impact
```

modelini kendi cümlelerinle açıkla.

Neden yalnızca vulnerability severity'sine bakmak yeterli değildir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 28 — 2 Puan

Aşağıdaki güvenlik kontrollerini değerlendir:

```text
MFA
EDR
Backup
Security Awareness Training
```

Her biri için bir kontrol işlevi yaz:

```text
MFA:

____________________________________________________

EDR:

____________________________________________________

Backup:

____________________________________________________

Security Awareness Training:

____________________________________________________
```

Bir kontrolün birden fazla işleve sahip olabileceğini unutma.

---

# BÖLÜM 7 — Analist Muhakemesi

> **10 Puan**

Bu bölümde ezberden çok analiz yaklaşımın değerlendirilecektir.

---

## Soru 29 — 2 Puan

Aşağıdaki iki cümleden hangisi daha doğru analist dilidir?

### A

```text
Bu dosya malware.
```

### B

```text
Dosya beklenmeyen bir path'ten çalışıyor ve bilinmeyen
bir remote endpoint'e bağlantı oluşturuyor. Mevcut
bulgular şüpheli ancak malicious activity henüz
doğrulanmadı.
```

Seçimin:

```text
[ ] A
[ ] B
```

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 30 — 2 Puan

Aşağıdakileri:

```text
Gözlem
Hipotez
```

olarak sınıflandır.

### A

```text
PID 6420 process'i TCP 443 remote endpoint'ine
ESTABLISHED connection'a sahip.
```

```text
Kategori:
____________________________
```

### B

```text
Process Command & Control iletişimi gerçekleştiriyor olabilir.
```

```text
Kategori:
____________________________
```

---

## Soru 31 — 2 Puan

Bir dosyanın:

- Downloads dizininde bulunması,
- `.exe` olması,
- TCP 443 bağlantısı oluşturması

gözlemlendi.

Bundan:

> "Kesin malware."

sonucuna neden varamazsın?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 32 — 2 Puan

Confirmation Bias nedir?

Bir güvenlik analisti bunu azaltmak için ne yapabilir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 33 — 2 Puan

Bir olay hakkında yeterli kanıtın yok.

Hangisi daha doğru?

### A

```text
Tahmin ederek kesin sonuç yazmak.
```

### B

```text
Bilinmeyenleri açıkça belirtmek ve hangi kanıtın
gerektiğini yazmak.
```

Seçim:

```text
[ ] A
[ ] B
```

Neden?

```text
____________________________________________________
```

---

# BÖLÜM 8 — Final Incident Case

> **25 Puan**

Bu bölüm Modül 01'in ana değerlendirmesidir.

Burada tek bir "sihirli doğru cevap" yoktur.

Puan:

- Gözlemleri doğru ayırman,
- Bilinmeyenleri fark etmen,
- Teknik kavramları doğru kullanman,
- Alternatif açıklamalar düşünmen,
- Sonraki analiz adımlarını gerekçelendirmen

üzerinden verilecektir.

---

# Vaka — OFFICE-PC-12

Bir şirket çalışanı bilgisayarının son iki gündür zaman zaman yavaşladığını bildiriyor.

İlk endpoint telemetry'sinde:

```text
HOST
OFFICE-PC-12

OS
Windows 11

USER
employee
```

Aşağıdaki process görülüyor:

```text
PROCESS
service-helper.exe

PID
7312

PATH
C:\Users\employee\AppData\Local\Temp\service-helper.exe

PARENT
WINWORD.EXE
```

Process'in başlangıç zamanı:

```text
14:32:18
```

Dosya metadata'sı:

```text
File:
service-helper.exe

Size:
684 KB

Creation Time:
14:32:16

Modification Time:
14:32:16

Digital Signature:
Unknown / Not yet checked

SHA-256:
Not yet collected
```

Process creation'dan kısa süre sonra şu connection gözlemleniyor:

```text
14:32:21

192.168.1.50:52144
        │
        │ TCP
        ▼
203.0.113.90:443

State:
ESTABLISHED

Owning Process:
7312
```

Kullanıcı aynı zaman aralığında e-posta ile gelen bir Word belgesini açtığını söylüyor.

> `203.0.113.0/24`, dokümantasyon için ayrılmış TEST-NET-3 bloğudur. Gerçek malicious IP olarak yorumlama.

Başka teknik veri henüz toplanmadı.

---

## Görev 34 — Confirmed Observations — 3 Puan

Yalnızca elindeki verilerle kesin olarak söyleyebileceğin en az 6 gözlem yaz.

Yorum veya hipotez ekleme.

```text
1.

2.

3.

4.

5.

6.
```

---

## Görev 35 — Unknowns — 2 Puan

Henüz bilmediğin en az 6 önemli bilgiyi yaz.

```text
1.

2.

3.

4.

5.

6.
```

---

## Görev 36 — Process Analysis — 3 Puan

Process hakkında hangi ek bilgileri toplamak istersin?

En az 5 bilgi yaz.

```text
1.

2.

3.

4.

5.
```

Herhangi bir tanesi için neden önemli olduğunu açıkla:

```text
____________________________________________________
```

---

## Görev 37 — File Analysis — 3 Puan

Dosya üzerinde çalıştırmadan önce hangi analizleri yaparsın?

En az 5 madde:

```text
1.

2.

3.

4.

5.
```

Şu iki ifadeyi ayrıca değerlendir:

```text
Temp klasöründe = Kesin malware

[ ] Doğru
[ ] Yanlış


Dijital imza yok = Kesin malware

[ ] Doğru
[ ] Yanlış
```

---

## Görev 38 — Network Analysis — 3 Puan

Network bağlantısı hakkında bildiklerini ve bilmediklerini ayır.

### Bildiklerim

```text
1.

2.

3.
```

### Bilmediklerim

```text
1.

2.

3.
```

Şu soruyu cevapla:

> Remote port 443 neden gerçek application protocol'ü tek başına kanıtlamaz?

```text
____________________________________________________
```

---

## Görev 39 — Timeline — 2 Puan

Elimizdeki olayları zaman sırasına koy:

```text
14:32:16
____________________________________

14:32:18
____________________________________

14:32:21
____________________________________
```

Bu zaman yakınlığı bize neden ilginç bir korelasyon sağlar ama tek başına nedensellik kanıtlamaz?

```text
____________________________________________________
```

---

## Görev 40 — Hipotezler — 2 Puan

En az iki alternatif hipotez oluştur.

### Hipotez A

```text
____________________________________________________
```

### Hipotez B

```text
____________________________________________________
```

Her iki hipotezi de test edebilecek bir kanıt yaz:

```text
____________________________________________________
```

---

## Görev 41 — Asset ve CIA Impact — 2 Puan

En az üç asset belirle:

```text
1.

2.

3.
```

Threat scenario kötü amaçlı çıkarsa potansiyel CIA etkilerini yaz:

```text
Confidentiality:

____________________________________________________

Integrity:

____________________________________________________

Availability:

____________________________________________________
```

Kanıtlanmamış bir etkiyi gerçekleşmiş gibi yazma.

---

## Görev 42 — Vulnerability / Weakness — 2 Puan

Şu ifade doğru mudur?

```text
"Vulnerability = Kullanıcının Word belgesini açması."
```

```text
[ ] Evet
[ ] Hayır
```

Neden?

```text
____________________________________________________

____________________________________________________
```

Araştırmak istediğin iki olası control weakness yaz:

```text
1.

2.
```

---

## Görev 43 — Risk Assessment — 1 Puan

Şu aşamadaki değerlendirmene göre:

```text
Likelihood:

[ ] Low
[ ] Medium
[ ] High
[ ] Unknown


Potential Impact:

[ ] Low
[ ] Medium
[ ] High
[ ] Unknown
```

Gerekçen:

```text
____________________________________________________

____________________________________________________
```

---

## Görev 44 — Next Actions — 2 Puan

Analizin sonraki 5 adımını öncelik sırasına koy.

```text
1.

2.

3.

4.

5.
```

İlk sıradaki işlemi neden seçtiğini açıkla:

```text
____________________________________________________

____________________________________________________
```

> Gerçek olay müdahalesinde kurumun Incident Response prosedürleri, yetkiler ve kanıt koruma gereksinimleri önceliklidir.

---

# 📝 Final Incident Report

Final vakayı tamamladıktan sonra aşağıdaki kısa raporu doldur.

Bu bölüm Bölüm 8'in puanlamasına dahildir.

```text
=====================================================
AG CYBER LAB — MODULE 01 FINAL INCIDENT REPORT
=====================================================

CASE ID:
AG-M01-FINAL-001


SYSTEM
-----------------------------------------------------

Hostname:
OFFICE-PC-12

OS:
Windows 11

User:
employee


PROCESS
-----------------------------------------------------

Name:
service-helper.exe

PID:
7312

Parent:
WINWORD.EXE

Path:
C:\Users\employee\AppData\Local\Temp\service-helper.exe


FILE
-----------------------------------------------------

SHA-256:
____________________________________

Digital Signature:
____________________________________

File Type:
____________________________________


NETWORK
-----------------------------------------------------

Transport:
TCP

Local Endpoint:
192.168.1.50:52144

Remote Endpoint:
203.0.113.90:443

Application Protocol:
____________________________________


CONFIRMED OBSERVATIONS
-----------------------------------------------------

1.

2.

3.


UNKNOWNS
-----------------------------------------------------

1.

2.

3.


HYPOTHESES
-----------------------------------------------------

1.

2.


CIA IMPACT
-----------------------------------------------------

Confidentiality:
____________________________________

Integrity:
____________________________________

Availability:
____________________________________


RISK
-----------------------------------------------------

Likelihood:
____________________________________

Impact:
____________________________________


CONFIDENCE
-----------------------------------------------------

[ ] Low
[ ] Medium
[ ] High


CURRENT ASSESSMENT
-----------------------------------------------------

____________________________________________________

____________________________________________________


NEXT ACTIONS
-----------------------------------------------------

1.

2.

3.
```

---

# 📋 Değerlendirme Rubriği

Bu bölüm değerlendirici/eğitmen tarafından kullanılabilir.

---

## Bölüm 1 — 10 Puan

Öğrenci:

```text
[ ] CPU/RAM/Storage ayrımını doğru yapıyor.
[ ] Program → Process ilişkisini açıklıyor.
[ ] OS görevlerini biliyor.
[ ] Kernel ayrımını biliyor.
[ ] System call mantığını biliyor.
```

Her madde:

```text
2 puan
```

---

## Bölüm 2 — 10 Puan

Öğrenci:

```text
[ ] Path'i doğru yorumluyor.
[ ] Extension ≠ File Type prensibini biliyor.
[ ] Metadata'yı doğru yorumluyor.
[ ] Hash'in sınırlarını biliyor.
[ ] Digital signature'ın sınırlarını biliyor.
```

Her madde:

```text
2 puan
```

---

## Bölüm 3 — 10 Puan

Öğrenci:

```text
[ ] Program/process farkını biliyor.
[ ] PID'nin kullanımını ve reuse ihtimalini biliyor.
[ ] Thread kavramını biliyor.
[ ] Path'ten kesin malware sonucu çıkarmıyor.
[ ] Process tree'yi bağlam olarak yorumluyor.
```

Her madde:

```text
2 puan
```

---

## Bölüm 4 — 15 Puan

Öğrenci:

```text
[ ] Endpoint bilgilerini doğru ayırıyor.
[ ] Ephemeral port mantığını biliyor.
[ ] Port ≠ Protocol doğrulamasını biliyor.
[ ] ARP/DNS/TCP/UDP/Switch/Router ayrımını biliyor.
[ ] Subnet/gateway mantığını biliyor.
[ ] TCP handshake/reliability mantığını biliyor.
[ ] TLS amaçlarını biliyor.
[ ] LISTENING/OPEN/FILTERED ayrımını biliyor.
```

Puanlar ilgili soruların üzerinde belirtilmiştir.

---

## Bölüm 5 — 10 Puan

Öğrenci:

```text
[ ] Sistem profilini terminalden çıkarabiliyor.
[ ] Process/PID/path bulabiliyor.
[ ] Network endpoint'i process'e bağlayabiliyor.
[ ] SHA-256 hesaplayabiliyor.
[ ] Pipe/stdout/stderr/exit code kavramlarını biliyor.
```

Her görev:

```text
2 puan
```

---

## Bölüm 6 — 10 Puan

Öğrenci:

```text
[ ] CIA Triad'ı uygulayabiliyor.
[ ] Threat/Vulnerability/Exposure/Risk ayırabiliyor.
[ ] Exposure'ı vulnerability sanmıyor.
[ ] Likelihood/Impact ilişkisini biliyor.
[ ] Security control'leri doğru yorumluyor.
```

Her madde:

```text
2 puan
```

---

## Bölüm 7 — 10 Puan

Öğrenci:

```text
[ ] Temkinli analist dili kullanıyor.
[ ] Observation ile hypothesis'i ayırıyor.
[ ] Tek göstergeden kesin sonuca varmıyor.
[ ] Confirmation Bias'ı anlıyor.
[ ] Bilinmeyenleri açıkça ifade ediyor.
```

Her madde:

```text
2 puan
```

---

# 🧠 Bölüm 8 Rubriği — 25 Puan

Final vaka aşağıdaki yetkinliklere göre değerlendirilir:

| Yetkinlik | Puan |
|---|---:|
| Confirmed observation'ları doğru ayırma | 3 |
| Bilinmeyenleri fark etme | 2 |
| Process analysis planı | 3 |
| File analysis planı | 3 |
| Network analysis | 3 |
| Timeline / correlation | 2 |
| Alternatif hipotez oluşturma | 2 |
| Asset / CIA impact | 2 |
| Vulnerability / weakness ayrımı | 2 |
| Risk değerlendirmesi | 1 |
| Next action planı | 2 |
| **Toplam** | **25** |

---

## Bölüm 8 Detaylı Puanlama Rehberi

### Confirmed Observations — 3 Puan

**3 Puan**

- Gözlemleri yorumlardan doğru şekilde ayırıyor.
- Yalnızca verilen verilerden çıkarılabilecek gerçekleri yazıyor.
- Kanıtlanmamış iddiaları gerçek olarak sunmuyor.

**2 Puan**

- Gözlemlerin çoğunu doğru ayırıyor ancak küçük yorumlar ekliyor.

**1 Puan**

- Gözlem ile yorumu sık sık karıştırıyor.

**0 Puan**

- Kanıt olmadan doğrudan saldırı veya malware sonucu çıkarıyor.

---

### Unknowns — 2 Puan

**2 Puan**

- Dosya, process ve network açısından önemli bilinmeyenleri belirleyebiliyor.
- Bilmediği bilgileri tahmin etmiyor.

**1 Puan**

- Bazı bilinmeyenleri belirliyor ancak önemli alanları atlıyor.

**0 Puan**

- Bilinmeyen bilgileri varsayarak gerçek gibi kabul ediyor.

---

### Process Analysis — 3 Puan

**3 Puan**

Aşağıdaki alanların çoğunu araştırmayı öneriyor:

- Parent / Parent PID
- Command Line
- Executable Path
- User Context
- Start Time
- Child Processes
- Digital Signature
- Process behavior

**2 Puan**

- Temel process bilgilerini araştırıyor ancak analiz sınırlı.

**1 Puan**

- Yalnızca process adı veya PID gibi birkaç alana bakıyor.

**0 Puan**

- Process analizi yapamıyor veya yalnızca process adına göre karar veriyor.

---

### File Analysis — 3 Puan

**3 Puan**

Aşağıdaki alanların çoğunu araştırmayı öneriyor:

- Full Path
- SHA-256
- File Type / Signature
- Digital Signature
- Metadata
- Timestamps
- File Source
- Reputation

Ayrıca:

```text
Temp klasörü = Malware

İmzasız = Malware
```

gibi hatalı sonuçlara varmıyor.

**2 Puan**

- Hash, metadata ve path gibi temel alanları inceliyor ancak analiz eksik.

**1 Puan**

- Yalnızca dosya adı veya hash gibi tek bir göstergeye odaklanıyor.

**0 Puan**

- Dosya konumundan veya isminden doğrudan malware sonucu çıkarıyor.

---

### Network Analysis — 3 Puan

**3 Puan**

Aşağıdaki alanları doğru değerlendiriyor:

- Local IP
- Local Port
- Remote IP
- Remote Port
- TCP
- Connection State
- Owning Process

Ayrıca:

```text
TCP 443 = Kesin HTTPS
```

sonucuna varmıyor ve DNS/TLS/domain gibi ek verileri araştırmayı öneriyor.

**2 Puan**

- Endpoint bilgilerini doğru okuyor ancak protocol değerlendirmesi sınırlı.

**1 Puan**

- Yalnızca remote IP veya port üzerinden değerlendirme yapıyor.

**0 Puan**

- Network verisini ciddi biçimde yanlış yorumluyor.

---

### Timeline / Correlation — 2 Puan

**2 Puan**

- Dosya oluşturma, process başlama ve network connection zamanlarını doğru sıraya koyuyor.
- Zamansal yakınlığın korelasyon sağladığını ancak tek başına nedensellik kanıtlamadığını açıklıyor.

**1 Puan**

- Timeline'ı doğru oluşturuyor ancak correlation ile causation ayrımını açıklayamıyor.

**0 Puan**

- Zaman bilgilerini yanlış yorumluyor.

---

### Alternatif Hipotezler — 2 Puan

**2 Puan**

- En az iki makul alternatif hipotez oluşturuyor.
- Hipotezleri doğrulayacak veya çürütecek kanıt önerebiliyor.

**1 Puan**

- Birden fazla hipotez oluşturuyor ancak bunları nasıl test edeceğini açıklayamıyor.

**0 Puan**

- İlk şüpheyi doğrudan kesin sonuç kabul ediyor.

---

### Asset / CIA Impact — 2 Puan

**2 Puan**

- Birden fazla doğru asset belirliyor.
- Confidentiality, Integrity ve Availability üzerindeki potansiyel etkileri doğru değerlendiriyor.
- Potansiyel etkiyi gerçekleşmiş olay gibi göstermiyor.

**1 Puan**

- Asset veya CIA değerlendirmesini kısmen doğru yapıyor.

**0 Puan**

- CIA kavramlarını yanlış kullanıyor veya potansiyel etkileri kesinleşmiş gerçek gibi yazıyor.

---

### Vulnerability / Weakness Ayrımı — 2 Puan

**2 Puan**

- Kullanıcının Word belgesini açmasını doğrudan vulnerability olarak sınıflandırmıyor.
- Olası kontrol zayıflıklarını araştırma sorusu şeklinde değerlendiriyor.

Örneğin:

- E-mail filtering etkili miydi?
- Application control mevcut muydu?
- Endpoint policy yeterli miydi?
- Least Privilege uygulanıyor muydu?

**1 Puan**

- Temel ayrımı anlıyor ancak vulnerability ile davranışı zaman zaman karıştırıyor.

**0 Puan**

- Kullanıcı davranışını doğrudan teknik vulnerability olarak kabul ediyor.

---

### Risk Assessment — 1 Puan

**1 Puan**

- Likelihood ve Impact değerlendirmesini mevcut kanıtlara göre gerekçelendiriyor.
- Veri yetersizse `Unknown` seçeneğinin kullanılabileceğini anlıyor.
- Risk değerlendirmesini kanıtlanmamış malware varsayımına dayandırmıyor.

**0 Puan**

- Risk değerlendirmesini gerekçesiz yapıyor veya kanıtlanmamış varsayımları gerçek kabul ediyor.

---

### Next Action Planı — 2 Puan

**2 Puan**

- Mantıklı ve önceliklendirilmiş analiz adımları öneriyor.
- İlk adımının neden önemli olduğunu açıklıyor.
- Kanıt koruma ve kurum prosedürlerini dikkate alıyor.

Örneğin:

```text
1. Process telemetry'yi korumak

2. SHA-256 ve dosya metadata'sını toplamak

3. Digital signature'ı kontrol etmek

4. Process tree ve command line'ı incelemek

5. DNS/TLS/network telemetry'yi korele etmek
```

**1 Puan**

- Mantıklı adımlar öneriyor ancak önceliklendirme veya gerekçelendirme zayıf.

**0 Puan**

- Doğrudan dosyayı silmek, rastgele process sonlandırmak veya şüpheli executable'ı tekrar çalıştırmak gibi analitik olmayan yaklaşım öneriyor.

---

## Bölüm 8 Puan Kontrolü

```text
Confirmed Observations       3
Unknowns                     2
Process Analysis             3
File Analysis                3
Network Analysis             3
Timeline / Correlation       2
Alternative Hypotheses       2
Asset / CIA Impact           2
Vulnerability / Weakness     2
Risk Assessment              1
Next Actions                 2
                            ──
TOTAL                       25
```

Bölüm 8 puanı:

```text
________ / 25
```

---

# 📊 Yetkinlik Profili

Toplam puanın yanında hangi alanda güçlü veya zayıf olduğunu da değerlendir.

Her kategori için:

```text
Güçlü
Yeterli
Tekrar Gerekli
```

seç.

---

## Computer Fundamentals

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Operating Systems

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## File Systems

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Processes & Memory

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Networking

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Protocols & Services

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Command Line

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Security Concepts

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

## Analytical Reasoning

```text
[ ] Güçlü
[ ] Yeterli
[ ] Tekrar Gerekli
```

---

# 📈 Başarı Seviyeleri

## 90–100 — Çok İyi

Modülün temel teknik kavramlarını doğru kullanabiliyor ve yeni bir olay karşısında sistematik analiz yaklaşımı gösterebiliyorsun.

Modül 02'ye geçebilirsin.

---

## 80–89 — İyi

Temeller büyük ölçüde oturmuş durumda.

Yetkinlik profilinde `Tekrar Gerekli` görünen alanları kısa tekrar ettikten sonra ilerleyebilirsin.

---

## 70–79 — Yeterli

Temel kavramların çoğu anlaşılmış ancak bazı alanlarda boşluklar bulunuyor.

Özellikle düşük puan aldığın bölümleri tekrar etmen önerilir.

---

## 60–69 — Geliştirilmeli

Bazı temel kavramlar henüz birbirine doğru bağlanamıyor olabilir.

Modül 02'ye geçmeden önce zayıf bölümlere dönmen önerilir.

---

## 0–59 — Tekrar Gerekli

Modül 01'in temel kazanımları henüz yeterince yerleşmemiş olabilir.

Dersleri baştan tamamen ezberlemek yerine yetkinlik profilindeki zayıf alanlara odaklanarak tekrar çalış.

---

# ⚠️ Kritik Kavram Kontrolü

Toplam puanın yüksek olsa bile aşağıdaki temel yanlışlardan birini sürekli yapıyorsan ilgili dersi tekrar et.

```text
[ ] RAM ile depolamayı aynı şey sanıyorum.

[ ] Program ile process'i aynı şey sanıyorum.

[ ] PID'nin kalıcı benzersiz kimlik olduğunu sanıyorum.

[ ] Dosya extension'ına bakarak gerçek file type'ı kesinleştiriyorum.

[ ] Port numarasından gerçek servisi kesinleştiriyorum.

[ ] LISTENING gördüğüm servisin Internet'e açık olduğunu varsayıyorum.

[ ] Open port'u vulnerability sanıyorum.

[ ] TCP reliable = şifreli/güvenli sanıyorum.

[ ] HTTPS kullanan her siteyi güvenilir sanıyorum.

[ ] Alert gördüğümde confirmed incident olduğunu varsayıyorum.

[ ] Kullanıcı davranışını doğrudan vulnerability olarak sınıflandırıyorum.

[ ] Hash reputation sonucu yoksa dosyayı güvenli kabul ediyorum.

[ ] Tek IOC üzerinden kesin saldırı sonucu çıkarıyorum.

[ ] Bilmediğim bilgileri tahmin edip gerçek gibi yazıyorum.
```

Bu maddelerden herhangi biri işaretliyse:

> Puanından bağımsız olarak ilgili kavramı tekrar et.

Çünkü ileri modüller bu ayrımların doğru anlaşılmasına dayanacak.

---

# 🏆 Final Sonuç

```text
=====================================================
AG CYBER LAB — MODULE 01 RESULT
=====================================================

Student:
____________________________________

Date:
____________________________________


Section 1 — Computer & OS:
________ / 10

Section 2 — File Systems:
________ / 10

Section 3 — Processes:
________ / 10

Section 4 — Networking:
________ / 15

Section 5 — Command Line:
________ / 10

Section 6 — Security Concepts:
________ / 10

Section 7 — Analytical Reasoning:
________ / 10

Section 8 — Final Incident Case:
________ / 25


TOTAL:
________ / 100


RESULT:

[ ] Çok İyi
[ ] İyi
[ ] Yeterli
[ ] Geliştirilmeli
[ ] Tekrar Gerekli
```

---

# ✍️ Öğrenci Öz Değerlendirmesi

Sınavı bitirdikten sonra puandan önce şu soruları cevapla.

## En rahat olduğum konu:

```text
____________________________________________________
```

## En fazla zorlandığım konu:

```text
____________________________________________________
```

## Tekrar etmem gereken ders:

```text
____________________________________________________
```

## Analiz sırasında en çok zorlandığım şey:

```text
____________________________________________________
```

## Modülün başına göre artık açıklayabildiğim bir konu:

```text
____________________________________________________
```

---

# 🧩 Modül 01'in Büyük Resmi

Modülün başında:

```text
Bilgisayar nedir?
```

sorusuyla başladık.

Şimdi şu zinciri okuyabiliyoruz:

```text
                         USER
                           │
                           ▼
                       APPLICATION
                           │
                           ▼
                        PROCESS
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           MEMORY         FILES        SOCKET
                                         │
                                         ▼
                                      PROTOCOL
                                         │
                                         ▼
                                      IP : PORT
                                         │
                                         ▼
                                  REMOTE SYSTEM
```

Bunun üzerine güvenlik perspektifini ekleyebiliyoruz:

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
              ┌────────────┴────────────┐
              ▼                         ▼
         LIKELIHOOD                   IMPACT
              │                         │
              └────────────┬────────────┘
                           ▼
                          RISK
                           │
                           ▼
                     SECURITY CONTROL
                           │
                           ▼
                     RESIDUAL RISK
```

Ve bir olay sırasında:

```text
OBSERVATION
     │
     ▼
EVIDENCE
     │
     ▼
HYPOTHESIS
     │
     ▼
MORE DATA
     │
     ▼
CORRELATION
     │
     ▼
ASSESSMENT
     │
     ▼
ACTION
```

modelini kullanabiliyoruz.

Bu üç modeli birlikte kullanabilmek Modül 01'in asıl kazanımıdır.

---

# ✅ Modül 01 Tamamlama Kontrolü

Final assessment sonrasında:

- [ ] CPU, RAM ve depolamayı açıklayabiliyorum.
- [ ] İşletim sisteminin rolünü açıklayabiliyorum.
- [ ] Kernel ve user mode ayrımını temel seviyede biliyorum.
- [ ] Dosya sistemi kavramını açıklayabiliyorum.
- [ ] Metadata ve hash kavramlarını biliyorum.
- [ ] Program, process ve thread'i ayırabiliyorum.
- [ ] PID ve parent process kavramlarını biliyorum.
- [ ] IP, MAC, subnet ve gateway kavramlarını temel seviyede biliyorum.
- [ ] TCP ve UDP arasındaki farkı açıklayabiliyorum.
- [ ] DNS, HTTP, HTTPS ve TLS'in temel rollerini biliyorum.
- [ ] Port ile service'i ayırabiliyorum.
- [ ] Listening/Open/Filtered kavramlarını ayırabiliyorum.
- [ ] Terminal ve shell arasındaki farkı biliyorum.
- [ ] Temel sistem bilgilerini terminalden toplayabiliyorum.
- [ ] Process'i network connection ile ilişkilendirebiliyorum.
- [ ] SHA-256 hesaplayabiliyorum.
- [ ] CIA Triad'ı uygulayabiliyorum.
- [ ] Threat, Vulnerability, Exposure ve Risk'i ayırabiliyorum.
- [ ] Security Control kavramını açıklayabiliyorum.
- [ ] Observation ile hypothesis'i ayırabiliyorum.
- [ ] Bilinmeyenleri açıkça belirtebiliyorum.
- [ ] Tek göstergeden kesin saldırı sonucu çıkarmıyorum.
- [ ] Basit bir güvenlik vakası için araştırma planı oluşturabiliyorum.

---

# 🏁 Modül 01 Tamamlandı

```text
Ders 01  ✓  Bilgisayar Nedir?
Ders 02  ✓  CPU, RAM ve Depolama
Ders 03  ✓  İşletim Sistemi
Ders 04  ✓  Dosya Sistemleri
Ders 05  ✓  Process ve Thread
Ders 06  ✓  Network Fundamentals
Ders 07  ✓  Network Protocols
Ders 08  ✓  Ports, Services & Network Discovery
Ders 09  ✓  Command Line Basics
Ders 10  ✓  Temel Siber Güvenlik Kavramları
Ders 11  ✓  Module Review & Mini Case
Ders 12  ✓  Final Assessment
```

## Modül 01 — Bilgisayar ve Siber Güvenlik Temelleri

**TAMAMLANDI ✓**

Bu modülü bitirdiğinde senden beklenen:

> Her aracı bilmen değil.

> Her komutu ezberlemen değil.

> Her saldırı tekniğini bilmen hiç değil.

Beklenen temel beceri şudur:

**Bir bilgisayar sistemine baktığında bileşenlerini anlayabilmek, bu bileşenler arasındaki ilişkileri kurabilmek ve güvenlik açısından bir iddiada bulunmadan önce "Bunu hangi kanıtla biliyorum?" diye sorabilmek.**

Bu temel sağlam olduğunda sonraki modüllerde Linux, programlama, network security, Blue Team, DFIR, malware analysis ve diğer uzmanlık alanlarını çok daha sağlıklı şekilde öğrenebilirsin.