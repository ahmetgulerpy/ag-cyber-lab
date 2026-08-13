# Ders 11 — Module Review & Mini Case: Kanıttan Sonuca

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ders:** 11 / 12  
> **Tür:** Modül Tekrarı + Mini Vaka + Analiz Uygulaması  
> **Ön Koşul:** Ders 01–10

---

## 🎯 Bu Dersin Amacı

Bu derste yeni teknik kavramlar öğrenmekten çok, Ders 01–10 boyunca öğrendiğimiz bilgileri tek bir güvenlik vakasında birleştireceğiz.

Bu dersin sonunda:

- Bir bilgisayar sistemini güvenlik perspektifinden temel bileşenlerine ayırabileceksin.
- Dosya → process → kullanıcı → network ilişkisini kurabileceksin.
- Bir process'i yalnızca adına bakarak değerlendirmemen gerektiğini anlayabileceksin.
- Dosya metadata'sı, hash ve executable path gibi bilgileri değerlendirebileceksin.
- PID, parent process ve command line bilgilerinin neden önemli olduğunu açıklayabileceksin.
- Network bağlantısındaki local/remote IP ve portları yorumlayabileceksin.
- Port numarasından gerçek uygulama protokolünü kesin olarak çıkaramayacağını anlayabileceksin.
- Gözlem, kanıt, hipotez ve sonuç arasındaki farkı açıklayabileceksin.
- Bilinenler ile bilinmeyenleri ayrı şekilde kayıt altına alabileceksin.
- Asset, threat, vulnerability/weakness, exposure, likelihood, impact ve risk kavramlarını vaka üzerinde kullanabileceksin.
- CIA Triad perspektifinden olası etkiyi değerlendirebileceksin.
- Bir güvenlik alarmı karşısında erken hüküm vermeden araştırma planı oluşturabileceksin.
- Teknik bulgularını kısa bir analist raporuna dönüştürebileceksin.

> Bu dersin ana hedefi “doğru cevabı bulmak” değil, elindeki kanıttan hangi sonuçları çıkarabileceğini ve hangi sonuçları henüz çıkaramayacağını öğrenmektir.

---

# 1. Modül 01'de Nereden Nereye Geldik?

Ders 01'de şu soruyla başladık:

> **Bilgisayar nedir?**

Ardından adım adım sistemi büyüttük:

```text
BİLGİSAYAR
    │
    ▼
CPU / RAM / DEPOLAMA
    │
    ▼
İŞLETİM SİSTEMİ
    │
    ▼
DOSYA SİSTEMİ
    │
    ▼
PROGRAM
    │
    ▼
PROCESS / THREAD
    │
    ▼
SOCKET
    │
    ▼
NETWORK
    │
    ▼
PROTOCOL
    │
    ▼
PORT / SERVICE
    │
    ▼
COMMAND LINE
    │
    ▼
SECURITY ANALYSIS
```

Ders 10'da ise teknik sistemin üzerine güvenlik perspektifini ekledik:

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
```

Şimdi bu iki modeli birleştireceğiz.

---

# 2. Güvenlik Analizi Tek Bir Katmanda Yapılmaz

Bir güvenlik olayını yalnızca:

```text
Dosya
```

veya yalnızca:

```text
IP adresi
```

üzerinden değerlendirmek çoğu zaman yeterli değildir.

Örneğin:

```text
KULLANICI
    │
    ▼
  DOSYA
    │
    ▼
 PROCESS
    │
    ├──► CHILD PROCESS
    │
    ├──► DOSYA DEĞİŞİKLİĞİ
    │
    ├──► REGISTRY / OS KAYNAĞI
    │
    └──► NETWORK CONNECTION
               │
               ▼
          REMOTE SYSTEM
```

gibi ilişkiler kurulabilir.

Bir analistin görevi bu parçalar arasındaki bağlantıyı anlamaktır.

---

# 3. Modül 01 Hızlı Tekrarı

Önce bütün modülü kısa bir zihinsel modelle hatırlayalım.

## Ders 01 — Bilgisayar

```text
Hardware
+
Software
+
Operating System
+
Data
```

birlikte çalışan bir sistem oluşturur.

---

## Ders 02 — CPU, RAM ve Depolama

```text
Depolama
    │
    ▼
RAM
    │
    ▼
Cache / Registers
    │
    ▼
CPU
```

CPU komutları yürütür.

RAM aktif çalışma için bellek sağlar.

Depolama verileri uzun süre saklar.

---

## Ders 03 — İşletim Sistemi

```text
Application
    │
    ▼
User Mode
    │
    ▼
System Call
    │
    ▼
Kernel
    │
    ▼
Hardware
```

İşletim sistemi:

- Process'leri,
- Belleği,
- Dosyaları,
- Kullanıcıları,
- Network kaynaklarını,
- Donanımı

yönetir.

---

## Ders 04 — Dosya Sistemi

Bir dosyaya yalnızca adına bakmayız.

```text
DOSYA
│
├── Path
├── Content
├── Metadata
├── Timestamps
├── Permissions
├── Signature
└── Hash
```

Ve:

```text
Dosya mevcut
      │
      ≠
Dosya çalıştırıldı
      │
      ≠
Dosya zararlı
```

---

## Ders 05 — Process

Bir çalışan process için:

```text
PROCESS
│
├── PID
├── Parent
├── Executable Path
├── Command Line
├── User
├── Threads
├── Memory
├── Files
└── Network Connections
```

gibi bilgiler önemli olabilir.

---

## Ders 06 — Network

```text
Process
   │
   ▼
Socket
   │
   ▼
IP
   │
   ▼
Routing
   │
   ▼
Network Interface
   │
   ▼
Remote System
```

IP ve MAC aynı şey değildir.

Aynı subnet ile uzak subnet'e iletişim farklı yollar izleyebilir.

---

## Ders 07 — Protocol

Network iletişiminde:

```text
HTTP
DNS
SSH
SMTP
```

gibi application protocol'leri;

```text
TCP
UDP
```

gibi transport protocol'leri;

```text
IP
```

gibi network katmanı protokolleri birlikte çalışabilir.

Ve:

```text
Port 443
   │
   ≠
Kesin HTTPS
```

---

## Ders 08 — Port ve Service

```text
PROCESS
   │
   ▼
SOCKET
   │
   ▼
BIND ADDRESS
   │
   ▼
PORT
   │
   ▼
SERVICE
```

Ve özellikle:

```text
LISTENING
   ≠
HER YERDEN ERİŞİLEBİLİR
```

```text
OPEN PORT
   ≠
VULNERABILITY
```

---

## Ders 09 — Command Line

Terminal aracılığıyla:

```text
Files
Processes
Users
Network
Ports
Hashes
System Information
```

hakkında veri toplayabiliriz.

Ama:

> Terminal komutu çalıştırmak analiz yapmakla aynı şey değildir.

Komut bize veri sağlar.

Bu veriyi yorumlayan analisttir.

---

## Ders 10 — Security Concepts

```text
ASSET
  │
  ▼
THREAT
  │
  ▼
WEAKNESS / VULNERABILITY
  │
  ▼
RISK
  │
  ▼
CONTROL
  │
  ▼
RESIDUAL RISK
```

Ve:

```text
ALERT
   ≠
INCIDENT
```

---

# 4. Analistin En Önemli Ayrımı

Bir olay incelerken dört kavramı birbirinden ayıracağız:

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
SONUÇ
```

Bunlar aynı şey değildir.

---

# 5. Gözlem Nedir?

**Gözlem**, sistemde gördüğümüz veya veri kaynağının bize gösterdiği şeydir.

Örneğin:

```text
powershell.exe process'i çalışıyor.
```

veya:

```text
Bir TCP connection 203.0.113.50:443 adresine gidiyor.
```

birer gözlemdir.

Gözlem bize:

> **Ne gördüm?**

sorusunun cevabını verir.

---

# 6. Kanıt Nedir?

**Kanıt**, gözlemi destekleyen veri veya artefakttır.

Örneğin:

```text
EDR process creation event

Windows Event Log

Memory image

File system metadata

Network log

PCAP

PowerShell log
```

bir olay hakkında kanıt sağlayabilir.

Örneğin:

```text
EDR Telemetry:
Process = powershell.exe
PID = 6420
Parent = WINWORD.EXE
```

teknik bir veri kaynağıdır.

---

# 7. Hipotez Nedir?

**Hipotez**, elimizdeki kanıtlara dayanarak test etmek istediğimiz olası açıklamadır.

Örneğin:

```text
Hipotez:

"Word belgesi PowerShell'i kullanarak
şüpheli bir komut çalıştırmış olabilir."
```

Bu henüz:

```text
Kanıtlanmış gerçek
```

değildir.

Hipotezi doğrulamak veya yanlışlamak için daha fazla veri toplarız.

---

# 8. Sonuç Nedir?

**Sonuç**, yeterli kanıt toplandıktan ve alternatif açıklamalar değerlendirildikten sonra ulaşılan analitik değerlendirmedir.

Örneğin:

```text
Command line incelendi.

Belge kaynağı doğrulandı.

PowerShell script'i analiz edildi.

Network bağlantısı korele edildi.

Endpoint üzerinde dosya oluşturma gözlemlendi.
```

gibi farklı kanıtlar bir araya getirildiğinde daha güçlü bir sonuca ulaşabiliriz.

---

# 9. Analiz Döngüsü

Bu ders boyunca şu modeli kullanacağız:

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
      EK VERİ TOPLAMA
             │
             ▼
          DOĞRULAMA
          /       \
         /         \
        ▼           ▼
   DESTEKLENİYOR  DESTEKLENMİYOR
        │
        ▼
      SONUÇ
```

Bir hipotezin yanlış çıkması:

> Analizin başarısız olduğu

anlamına gelmez.

Yanlış hipotezi elemek de analizdir.

---

# 10. Bilinenler ve Bilinmeyenler

Profesyonel analiz sırasında:

```text
BİLDİKLERİMİZ
```

ile:

```text
BİLMEDİKLERİMİZ
```

ayrı tutulmalıdır.

Örneğin:

```text
BİLDİĞİMİZ:

Bir process TCP 443'e bağlantı kurdu.


BİLMEDİĞİMİZ:

Gerçek application protocol HTTPS mi?

Bağlantının amacı ne?

Remote endpoint güvenilir mi?

Aktarılan veri ne?
```

Bu ayrım yanlış kesinlik üretmemizi engeller.

---

# 11. Kanıt Güvenilirliği

Her veri kaynağı aynı şeyi göstermez ve hiçbir veri kaynağını otomatik olarak kusursuz kabul etmemeliyiz.

Örneğin:

```text
Process Name
```

değiştirilebilir.

```text
File Timestamp
```

manipüle edilebilir veya sistem davranışından etkilenebilir.

```text
Banner
```

yanlış bilgi verebilir.

```text
Command History
```

eksik olabilir.

```text
Log
```

oluşmamış, silinmiş veya toplanmamış olabilir.

Bu nedenle iyi analiz mümkün olduğunda:

**corroboration — bağımsız kanıtlarla doğrulama**

kullanır.

---

# 12. Korelasyon Nedir?

Farklı veri kaynaklarını aynı olay etrafında ilişkilendirmeye:

**correlation**

diyebiliriz.

Örneğin:

```text
14:31
E-mail attachment indirildi
        │
        ▼
14:32
invoice-viewer.exe oluşturuldu
        │
        ▼
14:33
Process başladı
        │
        ▼
14:33
Remote connection kuruldu
```

Bu farklı olaylar birbirini destekliyorsa daha güçlü bir olay hikâyesi oluşturabiliriz.

Ancak:

> Zamansal yakınlık tek başına nedensellik kanıtı değildir.

Bu ayrım önemlidir.

---

# 13. Timeline Neden Önemlidir?

Bir güvenlik olayında:

> **Ne oldu?**

sorusunun yanında:

> **Hangi sırayla oldu?**

sorusu da önemlidir.

Örneğin:

```text
14:30 → Kullanıcı login

14:31 → Dosya indirildi

14:32 → Dosya oluşturuldu

14:33 → Process başladı

14:34 → Child process başladı

14:35 → Network connection

14:36 → Yeni dosya oluşturuldu
```

gibi bir timeline olayın anlaşılmasına yardımcı olabilir.

Ders 04'te öğrendiğimiz timestamp bilgileri burada devreye girer.

---

# 14. Mini Vaka — İlk Bildirim

SOC ekibine aşağıdaki bildirim geliyor:

> Bir çalışan bilgisayarında tanımadığı bir programın çalıştığını ve cihazın Internet'e beklenmeyen bağlantılar oluşturduğunu düşünüyor.

Endpoint:

```text
Hostname:
WORKSTATION-07

Operating System:
Windows 11

User:
ahmet
```

EDR üzerinde şu process görülüyor:

```text
Process:
invoice-viewer.exe

PID:
5624

Executable Path:
C:\Users\ahmet\Downloads\invoice-viewer.exe

Parent:
explorer.exe
```

Process'in şu network connection'ı bulunuyor:

```text
Local:
192.168.1.45:52341

Remote:
198.51.100.25:443

Transport:
TCP

State:
ESTABLISHED
```

Kullanıcı:

> Dosyanın bir e-posta attachment'ından geldiğini hatırladığını

söylüyor.

---

# 15. Örnek IP Adresi Hakkında Önemli Not

Bu vakada kullanılan:

```text
198.51.100.25
```

gerçek bir saldırgan IP adresi değildir.

`198.51.100.0/24`:

**TEST-NET-2**

olarak dokümantasyon ve eğitim örneklerinde kullanılmak üzere ayrılmış IPv4 bloklarından biridir.

Benzer şekilde:

```text
192.0.2.0/24
198.51.100.0/24
203.0.113.0/24
```

dokümantasyon için ayrılmış örnek IPv4 bloklarıdır.

Bu platformdaki vakalarda gerçek kişilere veya sistemlere ait hedefler yerine mümkün olduğunca dokümantasyon adresleri kullanacağız.

---

# 16. İlk İşimiz: Hüküm Vermemek

Şu anda elimizde:

```text
invoice-viewer.exe
```

isminde bir process var.

Dosya:

```text
Downloads
```

dizininde.

Ayrıca:

```text
TCP 443
```

üzerinden dış bağlantısı var.

Bunlardan:

```text
Kesin malware
```

sonucuna varabilir miyiz?

Hayır.

Aynı belirtilerin meşru açıklamaları da olabilir.

Örneğin:

- Meşru invoice uygulaması olabilir.
- Cloud API ile iletişim kuruyor olabilir.
- Update kontrolü yapıyor olabilir.
- Telemetry gönderiyor olabilir.

Aynı şekilde kötü amaçlı bir açıklama da mümkün olabilir.

Analistin görevi:

> **Olasılıkları kanıtlarla test etmektir.**

---

# 17. Bildiklerimiz

Elimizdeki ilk veriye göre bildiklerimizi yazalım.

```text
1. Host Windows 11.

2. Kullanıcı ahmet.

3. invoice-viewer.exe adlı process gözlemlendi.

4. PID 5624.

5. Executable Downloads klasöründe.

6. Parent process explorer.exe olarak raporlandı.

7. Process TCP connection kullanıyor.

8. Local port 52341.

9. Remote port 443.

10. Remote IP 198.51.100.25.

11. Connection ESTABLISHED.

12. Kullanıcı dosyanın e-mail attachment'ından
    geldiğini hatırladığını söylüyor.
```

Ancak son maddeye dikkat:

> Kullanıcının ifadesi değerlidir ancak teknik telemetry ile aynı tür kanıt değildir.

Mümkünse başka artefaktlarla doğrulanmalıdır.

---

# 18. Henüz Bilmediklerimiz

Şu anda bilmiyoruz:

```text
Dosyanın SHA-256 değeri ne?

Dosya dijital olarak imzalı mı?

İmza geçerli mi?

Dosyanın gerçek file type'ı ne?

Dosya ne zaman oluşturuldu?

Dosya gerçekten e-mail'den mi geldi?

Hangi e-mail'den geldi?

Process command line ne?

Parent gerçekten beklediğimiz zincirin parçası mı?

Child process oluşturdu mu?

Dosya başka dosyalar oluşturdu mu?

Registry değiştirdi mi?

Persistence oluşturdu mu?

443 üzerinde gerçekten TLS/HTTPS mi konuşuyor?

Hangi domain ile iletişim kuruyor?

TLS certificate ne gösteriyor?

Ne kadar veri gönderildi?

Benzer bağlantılar tekrar ediyor mu?

Diğer endpoint'lerde aynı dosya var mı?
```

Bu liste araştırma planımızı oluşturur.

---

# 19. Dosya Analizi — İlk Sorular

Dosya:

```text
C:\Users\ahmet\Downloads\invoice-viewer.exe
```

Önce güvenli şekilde metadata toplayabiliriz.

Örneğin PowerShell:

```powershell
Get-Item "C:\Users\ahmet\Downloads\invoice-viewer.exe" |
Select-Object FullName, Length, CreationTime, LastWriteTime
```

Bu komut bize temel dosya bilgileri sağlayabilir.

Ancak timestamp'lerin tek başına kesin olay zamanı olmadığını Ders 04'ten biliyoruz.

---

# 20. Dosyanın SHA-256 Hash'i

Dosyayı tanımlamak ve karşılaştırmak için:

```powershell
Get-FileHash "C:\Users\ahmet\Downloads\invoice-viewer.exe" -Algorithm SHA256
```

kullanılabilir.

Örnek:

```text
Algorithm : SHA256

Hash      : A1B2C3...

Path      : C:\Users\ahmet\Downloads\invoice-viewer.exe
```

Hash bize:

> Dosyanın içeriğinden türetilen bir tanımlayıcı

sağlar.

Ancak:

```text
Hash var
     │
     ≠
Dosya malware
```

---

# 21. Hash Reputation

Gerçek bir olayda kurum politikası izin veriyorsa hash:

- Kurum içi threat intelligence,
- EDR,
- Malware repository,
- Güvenilir reputation service

ile karşılaştırılabilir.

Ancak:

```text
Hash hiçbir yerde bulunamadı
      │
      ≠
Dosya güvenli
```

Bir saldırgan dosyada küçük değişiklik yaparak yeni bir hash oluşturabilir.

Bu nedenle hash yalnızca analiz parçalarından biridir.

---

# 22. Dijital İmza

Windows executable'larında dijital imza bilgisi önemli bağlam sağlayabilir.

PowerShell'de:

```powershell
Get-AuthenticodeSignature "C:\Users\ahmet\Downloads\invoice-viewer.exe"
```

kullanılabilir.

Örneğin:

```text
SignerCertificate
Status
StatusMessage
```

gibi bilgiler görülebilir.

Ancak:

```text
İmzalı
   │
   ≠
Kesin güvenli
```

ve:

```text
İmzasız
   │
   ≠
Kesin malware
```

Meşru bazı yazılımlar imzasız olabilir.

Ayrıca kötü amaçlı yazılımlar bazı durumlarda geçerli veya kötüye kullanılmış imzalarla da karşımıza çıkabilir.

---

# 23. File Type ve Extension

Dosya adı:

```text
invoice-viewer.exe
```

olduğuna göre Windows executable olması beklenebilir.

Ancak Ders 04'ten biliyoruz:

```text
Extension
   │
   ≠
Gerçek file type'ın kesin kanıtı
```

Daha ileri analizde:

- File signature,
- PE header,
- Dosya yapısı

incelenebilir.

Şu anda dosyayı çalıştırmadan metadata toplamamız yeterlidir.

---

# 24. Process Analizi

Process hakkında ilk bildiğimiz:

```text
Name:
invoice-viewer.exe

PID:
5624

Parent:
explorer.exe
```

Windows üzerinde:

```powershell
Get-Process -Id 5624
```

ile temel process bilgileri alınabilir.

Daha ayrıntılı:

```powershell
Get-CimInstance Win32_Process -Filter "ProcessId = 5624" |
Select-Object Name, ProcessId, ParentProcessId, ExecutablePath, CommandLine
```

kullanılabilir.

---

# 25. Command Line Neden Önemli?

Process adı:

```text
invoice-viewer.exe
```

bize hangi executable'ın çalıştığı hakkında bilgi sağlar.

Ancak process şu şekilde başlatılmış olabilir:

```text
invoice-viewer.exe invoice.pdf
```

veya farklı argument'lerle çalışabilir.

Command line:

- Programın nasıl başlatıldığını,
- Hangi parametreleri aldığını,
- Hangi dosyayı işlediğini

anlamamıza yardımcı olabilir.

> Gerçek olaylarda command line hassas veri içerebilir. Toplama ve paylaşım sırasında buna dikkat edilmelidir.

---

# 26. Parent Process

İlk veri:

```text
Parent:
explorer.exe
```

diyor.

Bu, kullanıcının dosyaya Explorer üzerinden çift tıklaması gibi normal bir açıklamayla uyumlu olabilir.

Ama tek başına bunu kanıtlamaz.

Analist:

```text
Parent PID ne?

Parent ne zaman başladı?

Process creation telemetry var mı?

Grandparent process ne?

Kullanıcı aktivitesiyle zaman eşleşiyor mu?
```

gibi sorular sorabilir.

---

# 27. Parent Process Tek Başına Karar Verdirir Mi?

Hayır.

Örneğin:

```text
explorer.exe
    │
    └── invoice-viewer.exe
```

meşru olabilir.

Aynı şekilde:

```text
WINWORD.EXE
    │
    └── powershell.exe
```

şüpheli bağlam oluşturabilir ama yine de tek başına saldırı kanıtı değildir.

Process tree:

> **Bağlam sağlar.**

Kararı tek başına vermez.

---

# 28. Child Process'ler

`invoice-viewer.exe` şu process'leri oluşturmuş olsun:

```text
invoice-viewer.exe
        │
        ├── cmd.exe
        │
        └── powershell.exe
```

Bu durum araştırmayı daha ilginç hâle getirebilir.

Analist:

```text
Neden invoice viewer shell başlattı?

Command line ne?

Ne zaman başladı?

Bu uygulamanın normal davranışı mı?
```

diye sorabilir.

Ancak yine:

```text
PowerShell var
      │
      ≠
Kesin malware
```

---

# 29. Process Kullanıcı Bağlamı

Process'in hangi kullanıcı altında çalıştığı önemlidir.

Örneğin:

```text
User:
ahmet
```

ise process kullanıcının güvenlik bağlamında çalışıyor olabilir.

Analist:

```text
User normal kullanıcı mı?

Administrator mı?

Process elevated mı?

Hangi privilege'lara sahip?

Kullanıcının normal davranışı ne?
```

gibi soruları araştırabilir.

Ders 03 ve 10'daki:

**Least Privilege**

prensibi burada tekrar karşımıza çıkar.

---

# 30. Network Analizi

Connection:

```text
Local:
192.168.1.45:52341

Remote:
198.51.100.25:443

Transport:
TCP

State:
ESTABLISHED

PID:
5624
```

Buradan ne biliyoruz?

```text
Process'in TCP connection'ı var.

Local ephemeral benzeri port:
52341

Remote port:
443

Connection established durumda.
```

Ancak henüz:

```text
HTTPS kesin kullanılıyor.
```

diyemeyiz.

---

# 31. Process → Network İlişkisini Doğrulamak

Windows üzerinde:

```powershell
Get-NetTCPConnection -OwningProcess 5624
```

kullanılabilir.

Örnek çıktı:

```text
LocalAddress  : 192.168.1.45

LocalPort     : 52341

RemoteAddress : 198.51.100.25

RemotePort    : 443

State         : Established

OwningProcess : 5624
```

Artık:

```text
invoice-viewer.exe
       │
       ▼
PID 5624
       │
       ▼
TCP Socket
       │
       ▼
192.168.1.45:52341
       │
       ▼
198.51.100.25:443
```

ilişkisini kurabiliriz.

---

# 32. 443 Bize Ne Söyler?

Remote port:

```text
443
```

HTTPS ile yaygın olarak ilişkilidir.

Ama Ders 07'den biliyoruz:

```text
TCP 443
   │
   ≠
Kesin HTTPS
```

Bu nedenle:

```text
TLS handshake var mı?

Certificate ne?

Domain / SNI bilgisi var mı?

DNS sorgusu ne?

Protocol detection ne diyor?
```

gibi ek veriler araştırılabilir.

---

# 33. Domain Bilgisi

Remote IP tek başına yeterli bağlam sağlamayabilir.

Analist:

```text
Bu connection'dan önce hangi DNS sorgusu yapıldı?

Hangi domain bu IP'ye çözüldü?

Process hangi domain'le ilişkilendirildi?
```

sorularını araştırabilir.

Ama DNS kaydı ile connection arasında yalnızca zamansal yakınlık varsa:

> Kesin olarak aynı connection'a aittir

sonucuna dikkatli yaklaşılmalıdır.

EDR/network telemetry bu korelasyonu daha güçlü biçimde sağlayabilir.

---

# 34. Network Reputation Tek Başına Yeterli Mi?

Hayır.

Remote IP:

```text
Known malicious
```

olarak işaretlenmiş olabilir.

Bu önemli bir sinyaldir.

Ancak:

- Shared hosting,
- CDN,
- Cloud infrastructure,
- Eski reputation bilgisi,
- Dinamik IP kullanımı

gibi faktörler vardır.

Benzer şekilde:

```text
Reputation temiz
      │
      ≠
Kesin güvenli
```

Threat intelligence bir kanıt kaynağıdır; tek başına bütün karar değildir.

---

# 35. Trafik Miktarı ve Zamanlama

Network analizinde yalnızca:

```text
Nereye bağlandı?
```

sorusunu sormayız.

Ayrıca:

```text
Ne zaman başladı?

Ne kadar sürdü?

Kaç kez tekrarlandı?

Ne kadar veri gönderildi?

Ne kadar veri alındı?

Belirli aralıklarla mı tekrar ediyor?
```

soruları da önemlidir.

Örneğin:

```text
Her 60 saniye
aynı endpoint'e
küçük bağlantı
```

beaconing hipotezini araştırmamıza neden olabilir.

Ama update/monitoring yazılımları da periyodik trafik oluşturabilir.

---

# 36. File Activity

Şüpheli process'in hangi dosyalarla etkileşime girdiğini bilmek önemlidir.

Örneğin:

```text
invoice-viewer.exe
        │
        ├── C:\Users\ahmet\AppData\Local\Temp\a.tmp
        │
        ├── C:\Users\ahmet\AppData\Roaming\config.dat
        │
        └── C:\Users\ahmet\Documents\invoice.pdf
```

gibi bir telemetry olabilir.

Analist:

```text
Hangi dosyaları oluşturdu?

Hangilerini değiştirdi?

Hangilerini okudu?

Yeni executable oluşturdu mu?
```

sorularını sorabilir.

---

# 37. Persistence Hipotezi

Eğer process sistem yeniden başlatıldıktan sonra tekrar çalışabilecek mekanizmalar oluşturmuşsa:

**Persistence**

hipotezi araştırılabilir.

Örneğin Windows üzerinde persistence birçok farklı mekanizma üzerinden gerçekleştirilebilir.

Bu derste teknik yöntemlerine girmiyoruz.

Analistin şu soruyu sorması yeterlidir:

> **Process yeniden başlatma veya kullanıcı login sonrası kendisini tekrar başlatacak değişiklik yaptı mı?**

Bunu kanıtlamadan:

```text
Persistence oluşturdu.
```

demeyiz.

---

# 38. Bellek Analizi

Process çalışmaya devam ediyorsa memory içerisinde önemli bilgiler bulunabilir.

Örneğin:

```text
Loaded modules

Memory regions

Strings / runtime data

Network-related structures

Injected code indicators
```

gibi bilgiler ileri memory forensics analizlerinde değerlendirilebilir.

Bu nedenle olay müdahalesinde:

> "Hemen bilgisayarı kapat."

kararı otomatik olarak doğru olmayabilir.

Ders 02'den hatırla:

```text
RAM
=
Volatile evidence source
```

---

# 39. Şüpheli Sistemde Ne Yapmamalıyız?

Gerçek olaylarda plansız hareket etmek kanıt kaybına veya iş etkisine yol açabilir.

Örneğin:

```text
Şüpheli executable'ı tekrar çalıştırmak

Rastgele dosya silmek

Her şeyi hemen kapatmak

Evidence toplamadan sistemi temizlemek

Yetkisiz biçimde remote infrastructure'a bağlanmak

Şüpheli dosyayı kişisel cihazına kopyalamak
```

uygun olmayabilir.

Gerçek incident response:

- Kurum prosedürlerine,
- Yetkiye,
- Hukuki gerekliliklere,
- Olayın kritikliğine

göre yürütülmelidir.

Bu mini vaka eğitim amaçlıdır.

---

# 40. Containment Nedir?

Bir olay doğrulandığında veya yeterince ciddi şüphe bulunduğunda:

**Containment**

olayın yayılmasını veya etkisini sınırlamaya yönelik müdahaleleri ifade eder.

Örneğin bağlama göre:

- Endpoint'i networkten izole etmek,
- Hesabı geçici olarak devre dışı bırakmak,
- Zararlı domain/IP erişimini engellemek

gibi işlemler düşünülebilir.

Ancak containment:

> Her durumda ilk iş olarak cihazın fişini çekmek

demek değildir.

Karar olayın koşullarına göre verilmelidir.

---

# 41. Risk Perspektifi

Şimdi Ders 10 modelini vakaya uygulayalım.

## Asset

```text
WORKSTATION-07

Kullanıcı hesabı

Kullanıcının dosyaları

Kurumsal erişim bilgileri

Kurumsal network
```

asset olabilir.

---

# 42. Threat Scenario

Henüz kesinleştirilmemiş bir hipotez:

```text
E-mail attachment'ı üzerinden gelen
kötü amaçlı executable'ın kullanıcı tarafından
çalıştırılması ve dış sistemle iletişim kurması.
```

Bu:

```text
Confirmed incident
```

değildir.

Araştırılan threat scenario'dur.

---

# 43. Vulnerability / Weakness Konusunda Dikkat

Şu ifadeyi kullanmak hatalı olabilir:

```text
Vulnerability:
Kullanıcı dosyayı çalıştırdı.
```

Çünkü bu bir:

**davranış / olay**

dır.

Vulnerability veya control weakness olarak araştırabileceğimiz şeyler örneğin:

```text
Attachment filtering yetersiz miydi?

Executable attachment'a izin verildi mi?

Application control yok muydu?

MFA eksik miydi?

Endpoint policy yetersiz miydi?

Security awareness süreci yeterli miydi?

Least privilege uygulanıyor muydu?
```

olabilir.

Bunların da gerçekten eksik olduğunu varsaymamalıyız.

Önce doğrularız.

---

# 44. Exposure

Olayda exposure açısından şunları düşünebiliriz:

```text
Endpoint Internet'e çıkabiliyor mu?

Hangi destination'lara erişebilir?

Egress filtering var mı?

Web proxy var mı?

DNS filtering var mı?

Kullanıcının hangi kurumsal kaynaklara erişimi var?
```

Exposure yalnızca:

```text
Açık inbound port
```

demek değildir.

---

# 45. Impact

Threat scenario doğruysa potansiyel olarak:

```text
Confidentiality
│
├── Credential theft
└── Data exfiltration


Integrity
│
├── File modification
└── System configuration changes


Availability
│
├── System disruption
└── Ransomware benzeri etkiler
```

araştırılabilir.

Ama bunların hiçbiri henüz gerçekleşmiş olmak zorunda değildir.

---

# 46. Likelihood ve Impact

Başlangıç değerlendirmesinde:

```text
Likelihood:
Henüz belirsiz / araştırılıyor

Impact:
Asset ve erişimlere göre Medium–High olabilir
```

gibi bir değerlendirme yapılabilir.

Bu,:

```text
Malware kesin
```

demekten daha sağlıklıdır.

Risk değerlendirmesi yeni kanıt geldikçe değişebilir.

---

# 47. Mevcut Security Controls

Araştırmak isteyebileceğimiz kontroller:

```text
EDR

Antimalware

Email Security Gateway

Application Control

Web Proxy

DNS Filtering

MFA

Least Privilege

Firewall

Central Logging

Backup
```

Önemli soru:

> Bunlar var mı?

değil yalnızca.

Ayrıca:

> **Varsa gerçekten etkili ve doğru yapılandırılmış mı?**

---

# 48. Kontrol Başarısızlığı ile Kontrol Yokluğu Aynı Şey Mi?

Hayır.

Örneğin:

```text
EDR mevcut
```

olabilir ancak:

- Policy yanlış,
- Agent çalışmıyor,
- Detection coverage eksik,
- Alert gözden kaçmış

olabilir.

Benzer şekilde:

```text
Email filtering mevcut
```

ama belirli attachment filtreden geçmiş olabilir.

Bu nedenle:

```text
Kontrol var
      │
      ≠
Risk tamamen yönetiliyor
```

---

# 49. Araştırma Önceliklerimiz

Bu vakada ilk araştırma planı şöyle olabilir:

```text
1. Process telemetry'yi koru.

2. Executable metadata ve hash al.

3. Digital signature'ı kontrol et.

4. Parent/child process tree'yi incele.

5. Command line'ı incele.

6. Dosyanın kaynağını doğrula.

7. Network connection'ı process'e bağla.

8. DNS / domain / TLS metadata araştır.

9. Oluşturulan/değiştirilen dosyaları araştır.

10. Persistence belirtilerini araştır.

11. Kullanıcı hesabındaki anormal aktiviteleri incele.

12. Diğer endpoint'lerde aynı IOC/davranış var mı bak.
```

Bu bir başlangıç planıdır.

Gerçek olayda kurumun Incident Response prosedürü önceliklidir.

---

# 50. IOC Nedir?

Burada yeni ama önemli bir terimi temel seviyede tanıyalım:

**IOC — Indicator of Compromise**

bir compromise ile ilişkili olabilecek gözlemlenebilir göstergedir.

Örneğin bağlama göre:

```text
File hash

Domain

IP address

File path

Registry artifact
```

IOC olarak kullanılabilir.

Ancak:

> IOC eşleşmesi her durumda saldırıyı kesin kanıtlar

demek doğru değildir.

IOC'lar context içerisinde değerlendirilmelidir.

---

# 51. IOA / Davranış Perspektifi

Sadece statik göstergeler yerine:

> Sistemde ne davranış gerçekleşti?

sorusuna da bakabiliriz.

Örneğin:

```text
Office application
      │
      ▼
Script interpreter başlattı
      │
      ▼
Yeni executable oluşturdu
      │
      ▼
Remote connection kurdu
```

gibi davranış zinciri tek bir hash'ten daha dayanıklı detection bağlamı sağlayabilir.

İleride:

**Indicators of Attack / Behavioral Detection**

gibi kavramlara daha ayrıntılı döneceğiz.

Şimdilik:

```text
IOC → "Neyi gördüm?"

Behavior → "Ne yaptı?"
```

ayrımını bilmen yeterlidir.

---

# 52. Mini Case — Öğrenci Analizi

Şimdi ana vakayı sen analiz edeceksin.

```text
HOST
WORKSTATION-07

OS
Windows 11

USER
ahmet

PROCESS
invoice-viewer.exe

PID
5624

PATH
C:\Users\ahmet\Downloads\invoice-viewer.exe

PARENT
explorer.exe

NETWORK
192.168.1.45:52341
        │
        │ TCP
        ▼
198.51.100.25:443

STATE
ESTABLISHED

SOURCE
Kullanıcı dosyanın e-mail attachment'ından
geldiğini hatırladığını söylüyor.
```

---

# 53. Görev — Gözlemleri Yaz

Yalnızca gözlem/veri olarak bildiğin şeyleri yaz.

Yorum yapma.

```text
1.

2.

3.

4.

5.

6.
```

Örneğin:

```text
"Remote port 443."
```

gözlemdir.

```text
"Malware C2 kullanıyor."
```

ise henüz yorum/hipotezdir.

---

# 54. Görev — Bilinmeyenleri Yaz

En az 8 bilinmeyen yaz:

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

Bu görev çok önemli.

İyi bir analist:

> Ne bildiği kadar ne bilmediğini de bilir.

---

# 55. Görev — Hipotezler Oluştur

En az üç farklı açıklama oluştur.

### Hipotez A — Meşru

```text
____________________________________________________
```

### Hipotez B — Şüpheli

```text
____________________________________________________
```

### Hipotez C — Alternatif Açıklama

```text
____________________________________________________
```

Amaç tek bir hikâyeye çok erken bağlanmamaktır.

---

# 56. Görev — Her Hipotez İçin Kanıt

Her hipotezi destekleyecek veya çürütecek hangi veriyi toplardın?

### Hipotez A

```text
Destekleyen kanıt:

____________________________________________________

Çürüten kanıt:

____________________________________________________
```

### Hipotez B

```text
Destekleyen kanıt:

____________________________________________________

Çürüten kanıt:

____________________________________________________
```

### Hipotez C

```text
Destekleyen kanıt:

____________________________________________________

Çürüten kanıt:

____________________________________________________
```

Bu yaklaşım:

**confirmation bias**

riskini azaltmaya yardımcı olur.

---

# 57. Confirmation Bias Nedir?

**Confirmation Bias — Doğrulama Yanlılığı**, kişinin ilk inandığı açıklamayı destekleyen kanıtları ararken tersini gösteren kanıtları göz ardı etme eğilimidir.

Örneğin:

```text
"Bu malware."
```

diye erken karar verirsek yalnızca bunu destekleyen verileri fark edebiliriz.

Daha iyi yaklaşım:

```text
Hipotezim ne?

Bunu ne doğrular?

Bunu ne yanlışlar?

Alternatif açıklama ne?
```

sorularını birlikte sormaktır.

Bu, güvenlik analistliği için çok değerli bir alışkanlıktır.

---

# 58. Görev — Process Analiz Planı

Şunları doldur:

```text
Process Name:

____________________________________

PID:

____________________________________

Executable Path:

____________________________________

Parent:

____________________________________

Parent PID:

____________________________________

Command Line:

____________________________________

User:

____________________________________

Start Time:

____________________________________

Child Processes:

____________________________________

Digital Signature:

____________________________________
```

Elimizde olmayan bilgilere:

```text
Bilinmiyor
```

yaz.

Tahmin etme.

---

# 59. Görev — Dosya Analiz Planı

```text
File Name:

____________________________________

Full Path:

____________________________________

Size:

____________________________________

SHA-256:

____________________________________

File Type:

____________________________________

Digital Signature:

____________________________________

Creation Time:

____________________________________

Modification Time:

____________________________________

Source:

____________________________________

Reputation:

____________________________________
```

Yine bilinmeyenlere:

```text
Bilinmiyor
```

yaz.

---

# 60. Görev — Network Analiz Planı

```text
Transport:

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

Associated PID:

____________________________________

DNS Domain:

____________________________________

TLS Observed:

____________________________________

Certificate:

____________________________________

Connection Start:

____________________________________

Duration:

____________________________________

Bytes Sent:

____________________________________

Bytes Received:

____________________________________
```

---

# 61. Görev — 443'ü Yorumla

Aşağıdaki cümleyi tamamla:

```text
Remote port 443 olması bize:

____________________________________________________

hakkında ipucu verir.

Ancak:

____________________________________________________

konusunu tek başına kanıtlamaz.
```

Beklenen düşünce:

```text
443 HTTPS ile yaygın ilişkilidir,
ancak gerçek application protocol'ü tek başına kanıtlamaz.
```

---

# 62. Görev — CIA Triad

Threat scenario kötü amaçlı çıkarsa potansiyel etkileri değerlendir.

### Confidentiality

```text
____________________________________________________
```

### Integrity

```text
____________________________________________________
```

### Availability

```text
____________________________________________________
```

Her kategorinin mutlaka etkilendiğini varsayma.

Kanıt ile potansiyel etkiyi ayır.

---

# 63. Görev — Asset'ler

En az beş asset belirle:

```text
1.

2.

3.

4.

5.
```

Örneğin yalnızca:

```text
Laptop
```

düşünme.

Şunları da düşün:

```text
User Account

Credentials

Corporate Data

Business Access

Network Resources
```

---

# 64. Görev — Vulnerability/Weakness Analizi

Bu olaydan hangi güvenlik zayıflıkları çıkarılabilir?

Dikkat:

Şu anda control environment hakkında yeterli bilgi olmayabilir.

Dolayısıyla:

```text
"Email filtering yok."
```

demek yerine:

```text
"Email attachment filtering'in mevcut ve etkili olup
olmadığı araştırılmalı."
```

gibi ifade kullan.

En az dört araştırma sorusu:

```text
1.

2.

3.

4.
```

---

# 65. Görev — Risk

Şu aşamada:

```text
Likelihood:

[ ] Low
[ ] Medium
[ ] High
[ ] Unknown


Impact:

[ ] Low
[ ] Medium
[ ] High
[ ] Unknown
```

seç.

Gerekçeni yaz:

```text
____________________________________________________

____________________________________________________
```

`Unknown` seçmek başarısızlık değildir.

Kanıt yetersizse doğru seçenek olabilir.

---

# 66. Görev — Security Controls

Bu threat scenario için hangi kontroller:

### Preventive

```text
1.

2.

3.
```

### Detective

```text
1.

2.

3.
```

### Corrective / Recovery

```text
1.

2.

3.
```

olabilir?

---

# 67. Görev — Sonraki 5 Analiz Adımı

Öncelik sırasına göre yaz:

```text
1.

2.

3.

4.

5.
```

Her adım için:

> Bu veriye neden ihtiyacım var?

sorusunu da cevapla.

```text
1. ____________________
   Çünkü: _______________________________

2. ____________________
   Çünkü: _______________________________

3. ____________________
   Çünkü: _______________________________

4. ____________________
   Çünkü: _______________________________

5. ____________________
   Çünkü: _______________________________
```

---

# 68. Uygulama — Kendi Sisteminde Güvenli Triage

Şimdi teorik vakadan kendi sistemimize geçelim.

Bu uygulamada yalnızca kendi bilgisayarındaki normal ve güvenilir process'leri incele.

Şüpheli dosya indirip çalıştırma.

Sistem ayarlarını değiştirme.

Process sonlandırma.

Dosya silme.

Amacımız yalnızca bilgi toplamak.

---

# 69. Adım 1 — Sistem Bilgisi

Windows PowerShell:

```powershell
Get-ComputerInfo |
Select-Object WindowsProductName, WindowsVersion, OsArchitecture
```

Alternatif olarak:

```cmd
systeminfo
```

kullanılabilir.

Kaydet:

```text
Hostname:

____________________________________

OS:

____________________________________

Version:

____________________________________

Architecture:

____________________________________
```

---

# 70. Adım 2 — Kullanıcı

```cmd
whoami
```

çalıştır.

Sonuç:

```text
User:

____________________________________
```

İstersen grupları:

```cmd
whoami /groups
```

ile gözlemleyebilirsin.

---

# 71. Adım 3 — Normal Bir Process Seç

PowerShell:

```powershell
Get-Process |
Select-Object ProcessName, Id |
Sort-Object ProcessName
```

Kendi bildiğin normal bir process seç.

Örneğin:

```text
notepad
chrome
code
```

gibi.

```text
Process:

____________________________________

PID:

____________________________________
```

---

# 72. Adım 4 — Process Detayları

PID'yi kullan:

```powershell
Get-CimInstance Win32_Process -Filter "ProcessId = <PID>" |
Select-Object Name, ProcessId, ParentProcessId, ExecutablePath, CommandLine
```

Kaydet:

```text
Name:

____________________________________

PID:

____________________________________

Parent PID:

____________________________________

Path:

____________________________________

Command Line:

____________________________________
```

Bazı alanlara erişim yetki nedeniyle sınırlı olabilir.

Bu normaldir.

---

# 73. Adım 5 — Executable Hash

Yalnızca güvendiğin normal process'in executable dosyasını kullan.

```powershell
Get-FileHash "<DOSYA_YOLU>" -Algorithm SHA256
```

Sonuç:

```text
SHA-256:

____________________________________________________
```

Hash'in:

> Dosyanın güvenli olduğunu tek başına kanıtlamadığını

hatırla.

---

# 74. Adım 6 — Dijital İmza

Aynı güvenilir dosya için:

```powershell
Get-AuthenticodeSignature "<DOSYA_YOLU>"
```

incele.

```text
Status:

____________________________________

Signer:

____________________________________
```

İmzalı olup olmamasını otomatik:

```text
good / bad
```

olarak yorumlama.

Bağlamı düşün.

---

# 75. Adım 7 — Network Connection

```powershell
Get-NetTCPConnection |
Where-Object State -eq "Established" |
Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, OwningProcess
```

Bir normal connection seç.

PID ile process'i eşleştir:

```powershell
Get-Process -Id <PID>
```

Kaydet:

```text
Process:

____________________________________

Local Endpoint:

____________________________________

Remote Endpoint:

____________________________________
```

---

# 76. Adım 8 — Kanıt ve Yorum Ayrımı

Kendi gözlemin üzerinden iki cümle yaz.

### Kanıta dayalı gözlem

```text
____________________________________________________
```

Örneğin:

```text
chrome.exe PID 4216 bir TCP connection'a sahip.
```

### Yorum / Hipotez

```text
____________________________________________________
```

Örneğin:

```text
Bu connection web içeriğiyle ilişkili olabilir.
```

Bu iki cümle arasındaki farkı anlamak dersin en önemli hedeflerinden biridir.

---

# 77. Analist Notu Nasıl Yazılır?

Zayıf analist notu:

```text
"Şüpheli process malware."
```

Daha iyi:

```text
"invoice-viewer.exe process'i Downloads dizininden
çalışıyor ve TCP 443 üzerinden external endpoint ile
ESTABLISHED connection'a sahip. Bu gözlemler tek
başına malicious activity'yi doğrulamıyor.

Dosyanın source, hash, digital signature, process tree,
command line ve network protocol bilgileri doğrulanmalı."
```

İyi analist dili:

- Ne bildiğini açıklar.
- Ne bilmediğini açıklar.
- Varsayımları ayırır.
- Kanıtı belirtir.
- Sonraki adımı önerir.

---

# 78. Confidence Seviyesi

Bir değerlendirme yazarken güven seviyesini belirtmek yararlı olabilir.

Örneğin:

```text
Assessment:

Activity is suspicious but not confirmed malicious.

Confidence:
Low / Medium
```

Neden?

```text
File source user statement'e dayanıyor.

Hash reputation bilinmiyor.

Protocol doğrulanmadı.

Process behavior'ın tamamı görünmüyor.
```

Kanıt arttıkça confidence değişebilir.

---

# 79. Mini Analist Raporu Şablonu

Vakayı şu formatta tamamla:

```text
==================================================
AG CYBER LAB — MINI INCIDENT ANALYSIS
==================================================

CASE ID:
AG-M01-CASE-001

DATE:
____________________________

ANALYST:
____________________________


1. EXECUTIVE SUMMARY
--------------------------------------------------

__________________________________________________

__________________________________________________


2. SYSTEM
--------------------------------------------------

Hostname:
____________________________

OS:
____________________________

User:
____________________________


3. PROCESS
--------------------------------------------------

Name:
____________________________

PID:
____________________________

Parent:
____________________________

Path:
____________________________

Command Line:
____________________________


4. FILE
--------------------------------------------------

Name:
____________________________

Path:
____________________________

SHA-256:
____________________________

Digital Signature:
____________________________

Timestamps:
____________________________


5. NETWORK
--------------------------------------------------

Transport:
____________________________

Local Endpoint:
____________________________

Remote Endpoint:
____________________________

Domain:
____________________________

TLS:
____________________________


6. CONFIRMED OBSERVATIONS
--------------------------------------------------

1.

2.

3.


7. UNKNOWNS
--------------------------------------------------

1.

2.

3.


8. HYPOTHESES
--------------------------------------------------

Hypothesis A:

__________________________________________________


Hypothesis B:

__________________________________________________


9. CIA IMPACT
--------------------------------------------------

Confidentiality:
____________________________

Integrity:
____________________________

Availability:
____________________________


10. RISK
--------------------------------------------------

Likelihood:
____________________________

Impact:
____________________________

Risk:
____________________________


11. CONFIDENCE
--------------------------------------------------

[ ] Low
[ ] Medium
[ ] High

Reason:

__________________________________________________


12. NEXT ACTIONS
--------------------------------------------------

1.

2.

3.

4.

5.


13. CURRENT CONCLUSION
--------------------------------------------------

__________________________________________________

__________________________________________________
```

Bu format gerçek kurum raporlarının birebir standardı değildir.

Ama analitik düşünmeyi yapılandırmak için iyi bir başlangıçtır.

---

# 80. Kendini Test Et

## Soru 1

Aşağıdakilerden hangisi gözlemdir?

**A)** `invoice-viewer.exe` kesin malware'dir.  
**B)** PID 5624 process'i TCP 443 remote endpoint'ine bağlantıya sahiptir.  
**C)** Saldırgan credential çalmaktadır.  
**D)** Sistem ele geçirilmiştir.

---

## Soru 2

Bir process'in executable dosyası `Downloads` klasöründe bulunuyor.

Bu neyi kanıtlar?

**A)** Dosya malware'dir.  
**B)** Dosya phishing ile gelmiştir.  
**C)** Dosyanın bu path'te bulunduğunu; niyetini tek başına kanıtlamaz.  
**D)** Sistem compromise olmuştur.

---

## Soru 3

Remote port `443` olması hangisini kesin olarak kanıtlar?

**A)** Malware C2  
**B)** HTTPS  
**C)** TLS  
**D)** Bunların hiçbirini tek başına kesin olarak kanıtlamaz.

---

## Soru 4

Dosya hash'i reputation kaynağında bulunamadı.

Hangisi doğrudur?

**A)** Dosya kesin güvenlidir.  
**B)** Dosya kesin malware'dir.  
**C)** Bu sonuç tek başına dosyanın güvenli veya zararlı olduğunu kanıtlamaz.  
**D)** Dosya çalıştırılmamıştır.

---

## Soru 5

Valid digital signature hangisini kanıtlar?

**A)** Dosyanın bütün davranışlarının güvenli olduğunu  
**B)** İmzanın belirli publisher/sertifika zinciriyle doğrulanabildiğine ilişkin bilgi sağlar ancak güvenli davranışı tek başına garanti etmez.  
**C)** Dosyanın hiç değiştirilmediğini her koşulda garanti eder.  
**D)** Process'in network kullanmadığını

---

## Soru 6

`explorer.exe → invoice-viewer.exe` ilişkisi ne sağlayabilir?

**A)** Process'in nasıl başlatılmış olabileceğine ilişkin bağlam  
**B)** Kesin malware kanıtı  
**C)** Dosyanın hash'i  
**D)** Remote IP'nin kimliği

---

## Soru 7

Bir process PowerShell child process'i oluşturdu.

Bundan:

> "Kesin saldırı."

diyebilir miyiz?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 8

Aşağıdakilerden hangisi daha güçlü analiz yaklaşımıdır?

**A)** Tek hash  
**B)** Tek IP  
**C)** Tek process adı  
**D)** File + Process + Network + User + Timeline korelasyonu

---

## Soru 9

Kullanıcının bilinmeyen executable'a çift tıklaması otomatik olarak vulnerability midir?

**A)** Evet  
**B)** Hayır

Açıkla:

```text
____________________________________________________

____________________________________________________
```

---

## Soru 10

Bir güvenlik kontrolünün ortamda bulunması neyi garanti etmez?

**A)** Kontrolün etkili çalıştığını  
**B)** Kontrolün adı olduğunu  
**C)** Sistemin işletim sistemi olduğunu  
**D)** IP adresinin var olduğunu

---

## Soru 11

Aşağıdakilerden hangisi hipotezdir?

**A)** Remote port 443'tür.  
**B)** PID 5624'tür.  
**C)** Process C2 iletişimi gerçekleştiriyor olabilir.  
**D)** Host Windows 11'dir.

---

## Soru 12

Bir hipotezi yalnızca doğrulamaya çalışmak hangi analitik probleme yol açabilir?

**A)** Confirmation Bias  
**B)** NAT  
**C)** Context Switch  
**D)** Hash Collision

---

## Soru 13

Incident response sırasında bilgisayarı hemen kapatmak neden her durumda doğru olmayabilir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 14

Risk konusunda yeterli kanıt yoksa:

```text
Likelihood = Unknown
```

yazmak kabul edilebilir mi?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________
```

---

## Soru 15 — Analist Sorusu

Elinde yalnızca:

```text
Process:
unknown.exe

Remote:
198.51.100.25:443
```

var.

İlk beş araştırma sorunu yaz:

```text
1.

2.

3.

4.

5.
```

---

# 81. Modül 01 Bağımsız Açıklama Testi

Şimdi hiçbir yere bakmadan aşağıdaki soruları kendi cümlelerinle cevapla.

## 1.

Bir programı çalıştırdığında işletim sisteminde temel olarak ne olur?

```text
____________________________________________________
```

---

## 2.

RAM ile depolama arasındaki temel fark nedir?

```text
____________________________________________________
```

---

## 3.

Kernel neden gereklidir?

```text
____________________________________________________
```

---

## 4.

Bir dosyanın `.exe` olması bize ne söyler ve neyi söylemez?

```text
____________________________________________________
```

---

## 5.

Program ile process arasındaki fark nedir?

```text
____________________________________________________
```

---

## 6.

PID neden kalıcı bir kimlik değildir?

```text
____________________________________________________
```

---

## 7.

IP ile MAC arasındaki fark nedir?

```text
____________________________________________________
```

---

## 8.

Bir bilgisayar farklı subnet'teki hedefe giderken neden default gateway kullanabilir?

```text
____________________________________________________
```

---

## 9.

TCP ile UDP arasındaki temel fark nedir?

```text
____________________________________________________
```

---

## 10.

TCP Three-Way Handshake nedir?

```text
____________________________________________________
```

---

## 11.

Port numarası neden gerçek servisi kesin olarak göstermez?

```text
____________________________________________________
```

---

## 12.

LISTENING ile OPEN arasındaki fark nedir?

```text
____________________________________________________
```

---

## 13.

Terminal ile shell arasındaki fark nedir?

```text
____________________________________________________
```

---

## 14.

Pipe ne işe yarar?

```text
____________________________________________________
```

---

## 15.

Threat, Vulnerability ve Risk arasındaki fark nedir?

```text
____________________________________________________
```

---

## 16.

CIA Triad nedir?

```text
____________________________________________________
```

---

## 17.

Alert ile Incident neden aynı şey değildir?

```text
____________________________________________________
```

---

## 18.

Bir güvenlik analizinde:

```text
Gözlem
```

ile:

```text
Sonuç
```

arasındaki fark nedir?

```text
____________________________________________________
```

---

# 82. Modül 01 Yetkinlik Kontrolü

Bu noktada öğrenci aşağıdaki işlemleri temel seviyede yapabilmelidir:

### Sistem

- [ ] CPU, RAM ve depolamanın görevlerini açıklayabiliyorum.
- [ ] İşletim sisteminin rolünü açıklayabiliyorum.
- [ ] Kernel ve user mode kavramlarını temel seviyede biliyorum.

### Dosya Sistemi

- [ ] Absolute ve relative path'i ayırt edebiliyorum.
- [ ] Metadata kavramını açıklayabiliyorum.
- [ ] SHA-256 hash hesaplayabiliyorum.
- [ ] Dosya extension'ının gerçek içeriği garanti etmediğini biliyorum.

### Process

- [ ] Program ve process arasındaki farkı açıklayabiliyorum.
- [ ] PID'yi bulabiliyorum.
- [ ] Parent process kavramını biliyorum.
- [ ] Executable path'in neden önemli olduğunu biliyorum.
- [ ] Process'in network bağlantısıyla ilişkilendirilebileceğini biliyorum.

### Network

- [ ] IPv4 adresini temel seviyede okuyabiliyorum.
- [ ] Private IP kavramını biliyorum.
- [ ] Subnet ve default gateway'in temel görevini biliyorum.
- [ ] IP ve MAC arasındaki farkı biliyorum.
- [ ] TCP ve UDP'nin temel farkını açıklayabiliyorum.

### Protocol / Port

- [ ] HTTP, HTTPS, DNS ve SSH gibi protokolleri tanıyorum.
- [ ] Port kavramını açıklayabiliyorum.
- [ ] Port numarasının servisi kesin olarak kanıtlamadığını biliyorum.
- [ ] Listening ve remote open kavramlarının aynı olmadığını biliyorum.

### Command Line

- [ ] Kullanıcı kimliğini terminalden görebiliyorum.
- [ ] Dosya/dizinleri listeleyebiliyorum.
- [ ] Process'leri görüntüleyebiliyorum.
- [ ] Network yapılandırmasını inceleyebiliyorum.
- [ ] Listening portları görüntüleyebiliyorum.
- [ ] PID'yi process'e bağlayabiliyorum.
- [ ] Hash hesaplayabiliyorum.
- [ ] Pipe ve redirection kavramlarını temel seviyede biliyorum.

### Security

- [ ] CIA Triad'ı açıklayabiliyorum.
- [ ] Asset kavramını biliyorum.
- [ ] Threat ve vulnerability'yi ayırt edebiliyorum.
- [ ] Exposure ile vulnerability'nin aynı olmadığını biliyorum.
- [ ] Likelihood ve impact kavramlarını biliyorum.
- [ ] Security Control kavramını açıklayabiliyorum.
- [ ] Alert ile incident arasındaki farkı biliyorum.
- [ ] Defense in Depth kavramını tanıyorum.

### Analiz

- [ ] Gözlem ile yorumu ayırabiliyorum.
- [ ] Bilinenleri ve bilinmeyenleri ayrı yazabiliyorum.
- [ ] Birden fazla hipotez oluşturabiliyorum.
- [ ] Hipotezi doğrulayacak ve çürütecek kanıt arayabiliyorum.
- [ ] Tek bir IOC'den kesin sonuca varmıyorum.
- [ ] File + Process + Network + User + Timeline korelasyonu yapabiliyorum.
- [ ] Confidence seviyemi belirtebiliyorum.
- [ ] Bir sonraki analiz adımını gerekçelendirebiliyorum.

---

# 83. Bu Dersteki En Önemli Beş Kural

Modül 01'den yalnızca beş şey hatırlayacaksan şunları hatırla:

```text
1. GÖZLEM ≠ SONUÇ

2. ŞÜPHE ≠ KANIT

3. TEK BİR IOC ≠ CONFIRMED INCIDENT

4. BİLMİYORSAN "BİLİNMİYOR" YAZ

5. HER SONUÇ İÇİN:
   "BUNU HANGİ KANITLA BİLİYORUM?"
   DİYE SOR
```

Bunlar yalnızca bu modül için değil, ileride yapacağımız:

- SOC Analysis
- Incident Response
- DFIR
- Malware Analysis
- Threat Hunting
- Network Analysis

çalışmaları için de geçerli olacak.

---

# 84. Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Ders 01–10 kavramlarını genel olarak tekrar ettim.
- [ ] Gözlem, kanıt, hipotez ve sonuç arasındaki farkı biliyorum.
- [ ] Bilinen ve bilinmeyen bilgileri ayrı yazabiliyorum.
- [ ] Correlation kavramını temel seviyede biliyorum.
- [ ] Timeline oluşturmanın neden önemli olduğunu biliyorum.
- [ ] Tek bir timestamp'in kesin kanıt olmadığını biliyorum.
- [ ] Hash'in ne sağlayıp ne sağlamadığını biliyorum.
- [ ] Digital signature'ın ne sağlayıp ne sağlamadığını biliyorum.
- [ ] Process tree'yi temel seviyede yorumlayabiliyorum.
- [ ] Command line bilgisinin neden önemli olduğunu biliyorum.
- [ ] Process'i network connection ile ilişkilendirebiliyorum.
- [ ] TCP 443'ün kesin HTTPS anlamına gelmediğini biliyorum.
- [ ] DNS/domain bilgilerinin network analizinde neden önemli olduğunu biliyorum.
- [ ] Network reputation'ın tek başına karar vermemesi gerektiğini biliyorum.
- [ ] File activity'nin neden önemli olduğunu biliyorum.
- [ ] Volatile evidence kavramını hatırlıyorum.
- [ ] Kullanıcı davranışı ile vulnerability kavramını birbirine karıştırmıyorum.
- [ ] Exposure kavramını vaka üzerinde kullanabiliyorum.
- [ ] CIA impact değerlendirmesi yapabiliyorum.
- [ ] Security control'leri vaka üzerinde düşünebiliyorum.
- [ ] IOC kavramını temel seviyede tanıyorum.
- [ ] Davranış analizi ile statik IOC arasındaki temel farkı biliyorum.
- [ ] Confirmation Bias kavramını biliyorum.
- [ ] En az üç alternatif hipotez oluşturabiliyorum.
- [ ] Analist raporu şablonunu tamamladım.
- [ ] Kendi sistemimde güvenli triage uygulamasını yaptım.
- [ ] Bağımsız açıklama sorularını cevapladım.

---

# 🧩 Dersin Özeti

İlk derste yalnızca:

```text
Bilgisayar
```

kavramıyla başladık.

Şimdi bir endpoint'i şu şekilde görebiliyoruz:

```text
                        ENDPOINT
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
         USER             FILE            NETWORK
          │                │                │
          │                ▼                │
          │             PROCESS             │
          │                │                │
          │         ┌──────┼──────┐         │
          │         ▼      ▼      ▼         │
          │       CHILD  MEMORY  SOCKET ────┘
          │                         │
          │                         ▼
          │                   REMOTE SYSTEM
          │
          └─────────────────────────────────┐
                                            ▼
                                         CONTEXT
```

Ve analitik süreç:

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
                      MORE DATA / TEST
                              │
                              ▼
                         CORRELATION
                              │
                              ▼
                          ASSESSMENT
                              │
                              ▼
                            RISK
                              │
                              ▼
                           ACTION
```

Bu noktadan sonra siber güvenliği yalnızca:

```text
Komutlar
Araçlar
Portlar
```

olarak değil;

```text
Sistem
+
Kanıt
+
Bağlam
+
Muhakeme
```

olarak düşünmeye başlamış olmalısın.

---

# 🚀 Sonraki Ders

## Ders 12 — Modül 01 Final Assessment

Bir sonraki ders Modül 01'in final değerlendirmesi olacak.

Yeni konu anlatılmayacak.

Sana:

- Kavram soruları,
- Senaryo soruları,
- Terminal çıktıları,
- Process bilgileri,
- Dosya metadata'sı,
- Network connection'ları,
- Port/service gözlemleri,
- Risk değerlendirme görevleri,
- Analist muhakeme soruları

verilecek.

Ama bu kez Ders 11'deki gibi adım adım yönlendirme daha az olacak.

Amaç şu soruya cevap vermek:

> **Öğrenci öğrendiği bilgileri yardım almadan tek başına kullanabiliyor mu?**

Final Assessment sonunda öğrenci yalnızca puan almayacak.

Performansını şu alanlarda ayrı ayrı değerlendirebilecek:

```text
Computer Fundamentals

Operating Systems

File Systems

Processes

Networking

Protocols & Services

Command Line

Security Concepts

Analytical Reasoning
```

Böylece Modül 02'ye geçmeden önce hangi temellerin güçlü, hangilerinin tekrar edilmesi gerektiği görülebilecek.

---

# 🏁 MODÜL 01 DURUMU

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
Ders 12  →  Final Assessment
```

**Modül 01'in tamamlanmasına yalnızca Final Assessment kaldı.**