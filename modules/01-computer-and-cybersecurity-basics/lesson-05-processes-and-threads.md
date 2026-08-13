# Ders 05 — Process ve Thread: Çalışan Programları Anlamak

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–04

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- Program ile process arasındaki farkı açıklayabileceksin.
- Bir program çalıştırıldığında işletim sisteminde temel olarak neler gerçekleştiğini anlayabileceksin.
- PID kavramını ve sınırlamalarını açıklayabileceksin.
- Process'in sanal adres alanı hakkında temel bir zihinsel model oluşturabileceksin.
- Code, stack ve heap kavramlarını temel seviyede tanıyabileceksin.
- Thread kavramını açıklayabileceksin.
- Process ile thread arasındaki farkı anlayabileceksin.
- Scheduler ve context switch kavramlarını temel seviyede tanıyabileceksin.
- Process durumlarının neden var olduğunu anlayabileceksin.
- Parent ve child process ilişkisini açıklayabileceksin.
- Process tree'nin güvenlik analizinde neden önemli olduğunu anlayabileceksin.
- Process'in kullanıcı, dosya ve ağ kaynaklarıyla ilişkisini açıklayabileceksin.
- Windows ve Linux üzerinde çalışan process'leri gözlemleyebileceksin.
- Bir process'i yalnızca adına bakarak değerlendirmenin neden hatalı olduğunu anlayabileceksin.
- Şüpheli process incelemesinde hangi soruların sorulması gerektiğini öğrenebileceksin.

> Bu derste işletim sistemlerinin process yönetimini tam teknik ayrıntısıyla incelemeyeceğiz. Amacımız ileride işletim sistemi güvenliği, malware analysis, DFIR ve reverse engineering konularının üzerine kurulacağı doğru zihinsel modeli oluşturmaktır.

---

# 1. Önceki Derslerden Buraya Nasıl Geldik?

İlk dört derste bilgisayarın farklı katmanlarını inceledik.

Ders 01:

```text
Program
  │
  ▼
Process
  │
  ▼
RAM / CPU
```

Ders 02:

```text
Depolama
   │
   ▼
RAM
   │
   ▼
Cache / Register
   │
   ▼
CPU
```

Ders 03:

```text
Uygulama
   │
   ▼
User Mode
   │
   ▼
System Call
   │
   ▼
Kernel
```

Ders 04:

```text
Dosya
│
├── Path
├── Metadata
├── Permissions
└── Hash
```

Şimdi önemli bir soruya odaklanacağız:

> Depolamada bulunan bir program çalıştırıldığında işletim sistemi onu nasıl yönetir?

Bu sorunun merkezinde:

**Process**

ve:

**Thread**

kavramları bulunur.

---

# 2. Program Nedir?

Program, bilgisayarın gerçekleştireceği işlemleri tanımlayan kod ve ilgili verilerden oluşan yazılımdır.

Bir programın çalıştırılabilir bileşenleri depolama üzerinde bulunabilir.

Windows üzerinde örneğin:

```text
notepad.exe
powershell.exe
chrome.exe
```

gibi dosyalarla karşılaşabiliriz.

Linux üzerinde programların:

```text
/usr/bin/ls
/usr/bin/bash
/usr/bin/python3
```

gibi yolları olabilir.

Programın depolamada bulunması:

> Program şu anda çalışıyor.

anlamına gelmez.

Bu ayrımı Ders 04'te de görmüştük.

---

# 3. Process Nedir?

**Process (işlem)**, işletim sistemi tarafından yönetilen çalışan program örneğidir.

Bir program çalıştırıldığında işletim sistemi:

- Process için gerekli yönetim yapılarını oluşturur.
- Sanal adres alanını hazırlar.
- Programın ilgili kod ve verilerini belleğe eşleyebilir.
- En az bir yürütme thread'i oluşturur.
- Gerekli sistem kaynaklarına erişimi yönetir.
- Process'e bir kimlik atar.

Basitleştirilmiş model:

```text
DEPOLAMADAKİ PROGRAM
         │
         │ çalıştırılır
         ▼
   İŞLETİM SİSTEMİ
         │
         ▼
      PROCESS
      │
      ├── PID
      ├── Sanal Adres Alanı
      ├── Thread'ler
      ├── Açık Kaynaklar
      ├── Kullanıcı / Güvenlik Bağlamı
      └── Diğer Process Bilgileri
```

Başlangıç seviyesinde:

> **Program depolanmış yazılımdır; process ise çalışan programın işletim sistemi tarafından yönetilen örneğidir.**

---

# 4. Aynı Program Birden Fazla Process Olabilir Mi?

Evet.

Örneğin aynı programı iki kez açtığını düşün.

```text
notepad.exe
     │
     ├── Process A
     │      PID 4120
     │
     └── Process B
            PID 5632
```

Her ikisi de aynı program dosyasından başlatılmış olabilir fakat farklı process'lerdir.

Aynı şekilde bazı modern uygulamalar tek pencere gösterse bile birden fazla process kullanabilir.

Google Chrome gibi tarayıcılar buna iyi bir örnektir.

Bir tarayıcı:

```text
Tarayıcı
│
├── Ana Process
├── Renderer Process
├── GPU Process
├── Utility Process
└── Diğer Process'ler
```

gibi çok-process'li bir mimari kullanabilir.

Bunun güvenlik ve kararlılık gibi çeşitli nedenleri olabilir.

Dolayısıyla:

```text
Bir program = Her zaman tek process
```

değildir.

---

# 5. PID Nedir?

Her çalışan process işletim sistemi tarafından tanımlanabilmelidir.

Bunun için kullanılan temel kimliklerden biri:

**PID — Process Identifier**

değeridir.

Örneğin:

```text
Process         PID
--------------------
chrome.exe      4216
notepad.exe     7348
code.exe        8120
```

PID sayesinde işletim sistemi ve yönetim araçları belirli bir process'i tanımlayabilir.

---

# 6. PID Kalıcı Bir Kimlik Midir?

Hayır.

Bu çok önemli bir ayrımdır.

Bir process'in PID değeri:

```text
4216
```

olabilir.

Process sonlandıktan sonra işletim sistemi bu PID değerini ileride başka bir process için tekrar kullanabilir.

Örneğin:

```text
10:00
PID 4216 → notepad.exe

Process sonlandı

15:00
PID 4216 → başka-bir-program.exe
```

gibi bir durum mümkün olabilir.

Bu nedenle DFIR sırasında yalnızca:

```text
PID = 4216
```

bilgisi genellikle yeterli değildir.

Şunlar da önem kazanabilir:

```text
PID
+
Process adı
+
Başlangıç zamanı
+
Executable path
+
Parent
+
Kullanıcı
```

> **PID bir process'in çalıştığı süre boyunca onu tanımlamaya yardımcı olur; global ve sonsuza kadar benzersiz bir kimlik değildir.**

---

# 7. PPID Nedir?

Bir process başka bir process'in oluşturulmasına neden olduğunda parent-child ilişkisi oluşabilir.

Parent process'in kimliği için sıkça:

**PPID — Parent Process Identifier**

kavramıyla karşılaşırız.

Örneğin:

```text
Process       PID      PPID
---------------------------
bash          1200     900
python3       1450     1200
```

Burada:

```text
bash
 │
 └── python3
```

ilişkisi görülebilir.

Ancak parent process'in child process boyunca mutlaka çalışmaya devam etmesi gerekmez.

İşletim sistemine bağlı olarak parent sonlandıktan sonra child process çalışmaya devam edebilir ve process ilişkilerinin temsili değişebilir.

Bu nedenle process ağacını yorumlarken işletim sisteminin davranışını da dikkate almak gerekir.

---

# 8. Process'in İçerisinde Ne Var?

Process'i yalnızca:

> "Çalışan program"

olarak tanımlamak başlangıç için yararlıdır fakat artık biraz daha derine inebiliriz.

Bir process kavramsal olarak:

```text
PROCESS
│
├── Kimlik Bilgileri
│   ├── PID
│   └── Parent bilgisi
│
├── Sanal Adres Alanı
│   ├── Code
│   ├── Data
│   ├── Heap
│   ├── Stack'ler
│   └── Yüklenen modüller
│
├── Thread'ler
│
├── Açık Kaynaklar
│   ├── Dosyalar
│   ├── Socket'ler
│   └── Diğer OS nesneleri
│
├── Kullanıcı / Güvenlik Bağlamı
│
└── Environment / Çalışma Bilgileri
```

içerebilir.

Gerçek process yapısı işletim sistemine göre daha karmaşıktır.

Şimdilik bu model yeterlidir.

---

# 9. Sanal Adres Alanı Nedir?

Ders 02'de virtual memory kavramına giriş yapmıştık.

Modern işletim sistemlerinde bir process genellikle kendi:

**virtual address space — sanal adres alanı**

içerisinde çalışıyormuş gibi görünür.

Basitleştirilmiş olarak:

```text
Process A
│
└── Virtual Address Space A

Process B
│
└── Virtual Address Space B
```

Bu, process izolasyonunun önemli parçalarından biridir.

Process'in gördüğü adreslerin fiziksel RAM adresleriyle birebir aynı olması gerekmez.

İşletim sistemi ve işlemci bellek yönetim mekanizmaları sanal adresleri fiziksel belleğe eşlemek için birlikte çalışır.

Bu konunun ayrıntılarını daha ileri işletim sistemi ve exploit derslerine bırakacağız.

---

# 10. Process Belleği

Bir process'in sanal adres alanında farklı amaçlarla kullanılan bölgeler bulunabilir.

Basitleştirilmiş bir model:

```text
PROCESS VIRTUAL MEMORY
│
├── Code / Text
│
├── Data
│
├── Heap
│
├── Stack
│
└── Loaded Libraries / Modules
```

Bunların yerleşimi ve ayrıntıları işletim sistemine, executable formatına, mimariye ve çalışma zamanına göre değişebilir.

Şimdi kavramları temel seviyede tanıyalım.

---

# 11. Code / Text Bölgesi

Programın CPU tarafından yürütülebilen kodu belleğe eşlendiğinde executable kodun bulunduğu bölgeler oluşabilir.

Basitleştirilmiş olarak:

```text
Program dosyası
      │
      ▼
Executable code
      │
      ▼
Process belleği
      │
      ▼
CPU tarafından yürütülür
```

Gerçek sistemlerde bellek sayfalarının:

```text
Read
Write
Execute
```

gibi koruma özellikleri bulunabilir.

Bu konu ileride exploit mitigation ve malware analysis açısından önemli hâle gelecek.

---

# 12. Stack Nedir?

**Stack**, thread'lerin fonksiyon çağrıları ve yerel çalışma verileri için kullandıkları bellek bölgeleriyle ilişkilidir.

Örneğin bir fonksiyon çağrıldığında:

- Dönüş bilgileri
- Bazı yerel değişkenler
- Kaydedilmiş register değerleri

gibi bilgiler stack üzerinde bulunabilir.

Önemli teknik nokta:

> **Her thread'in kendi stack'i vardır.**

Basitleştirilmiş olarak:

```text
PROCESS
│
├── Thread 1
│   └── Stack 1
│
└── Thread 2
    └── Stack 2
```

Stack kavramı ileride:

- Reverse Engineering
- Debugging
- Exploit Development
- Memory Forensics

konularında çok önemli olacak.

---

# 13. Heap Nedir?

**Heap**, programın çalışma sırasında dinamik olarak bellek ayırmasıyla ilişkili bellek alanlarından biridir.

Örneğin program çalışma sırasında:

> "Yeni bir veri yapısı için belleğe ihtiyacım var."

dediğinde dinamik bellek mekanizmalarından yararlanabilir.

Kavramsal olarak:

```text
PROCESS
│
├── Code
├── Heap
│   └── Dinamik veriler
│
└── Thread
    └── Stack
```

Stack ve heap aynı şey değildir.

Ancak şu anda bellek yönetiminin bütün ayrıntılarını öğrenmen gerekmiyor.

Temel model:

```text
Stack → Thread'in çağrı/yürütme bağlamıyla yakından ilişkili

Heap → Dinamik bellek tahsisiyle ilişkili
```

---

# 14. Thread Nedir?

**Thread (iş parçacığı)**, bir process içerisindeki yürütme akışıdır.

Bir process bir veya birden fazla thread içerebilir.

Örneğin:

```text
PROCESS
│
├── Thread 1
├── Thread 2
└── Thread 3
```

Thread'ler aynı process'in:

- Adres alanını,
- Açık kaynaklarının çoğunu,
- Kodunu,
- Heap gibi ortak alanlarını

paylaşabilir.

Ancak her thread'in kendi yürütme bağlamı bulunur.

Örneğin:

- Kendi stack'i
- Register durumu
- Instruction pointer/program counter durumu
- Thread kimliği

gibi.

---

# 15. CPU Aslında Process'i Mi Thread'i Mi Çalıştırır?

Burada önemli bir teknik ayrım vardır.

Günlük kullanımda:

> "CPU process'i çalıştırıyor."

demek anlaşılır.

Ancak işletim sistemi zamanlama açısından CPU üzerinde yürütülen birim genellikle:

**thread**

ile ilişkilidir.

Daha doğru model:

```text
PROCESS
│
├── Thread A ─────┐
├── Thread B ─────┼──► Scheduler ──► CPU Core
└── Thread C ─────┘
```

Dolayısıyla process kaynakların ve adres alanının konteyneri gibi düşünülebilirken thread yürütme akışını temsil eder.

Başlangıç seviyesinde:

> **Process çalışma ortamını ve kaynakları temsil eder; thread ise bu ortam içerisindeki yürütme akışıdır.**

---

# 16. Hardware Thread ile Software Thread Aynı Şey Mi?

Ders 02'de şu örneği görmüştük:

```text
6 Cores
12 Threads
```

CPU özelliklerinde gördüğümüz bu "12 thread":

**hardware thread / logical processor**

kavramıyla ilişkilidir.

Bu derste konuştuğumuz:

```text
Process
└── Software Thread
```

ise işletim sistemi tarafından zamanlanan yazılım yürütme akışıdır.

İşletim sistemi çok sayıdaki yazılım thread'ini mevcut mantıksal işlemciler üzerinde zamanlar.

Kavramsal olarak:

```text
Software Threads
T1 T2 T3 T4 T5 T6 T7 ...
          │
          ▼
       Scheduler
          │
          ▼
Logical Processors
LP1 LP2 LP3 LP4 ...
```

> **Software thread ile CPU'nun "12 threads" özelliği birebir aynı kavram değildir.**

---

# 17. Neden Birden Fazla Thread Kullanılır?

Bir programın farklı işleri aynı zaman aralığında ilerletmesi gerekebilir.

Örneğin bir uygulama:

```text
Kullanıcı arayüzü
Ağ işlemleri
Dosya işlemleri
Arka plan hesaplamaları
```

gerçekleştirebilir.

Bunların bazıları farklı thread'lerde yürütülebilir.

Kavramsal örnek:

```text
UYGULAMA PROCESS
│
├── Thread 1 → Kullanıcı arayüzü
├── Thread 2 → Arka plan işi
├── Thread 3 → Veri işleme
└── Thread 4 → Başka görev
```

Ancak:

> Her görev için mutlaka ayrı thread kullanılır.

diye bir kural yoktur.

Modern uygulamalar ayrıca:

- Asenkron I/O
- Event loop
- Worker process
- Thread pool

gibi farklı tasarımlar kullanabilir.

---

# 18. Concurrency ve Parallelism

Bu iki kavram sık karıştırılır.

**Concurrency**, birden fazla işin aynı zaman aralığında ilerleyebilmesidir.

**Parallelism**, birden fazla işin gerçekten aynı anda farklı işlem kaynaklarında yürütülebilmesidir.

Basitleştirilmiş olarak tek CPU çekirdeğinde:

```text
ZAMAN ─────────────────────────►

Thread A ███       ███
Thread B    ███       ███
Thread C       ███
```

işler çok hızlı sırayla çalışarak ilerleyebilir.

Birden fazla çekirdekte ise:

```text
Core 1 → Thread A █████████

Core 2 → Thread B █████████
```

bazı işler gerçekten aynı anda yürütülebilir.

Bu ayrım performans ve programlama derslerinde tekrar karşımıza çıkacaktır.

---

# 19. Scheduler Nedir?

Bilgisayarda yüzlerce veya binlerce thread bulunabilir.

Ancak CPU'nun sınırlı sayıda logical processor'ı vardır.

Peki hangisi ne zaman CPU kullanacak?

Burada işletim sisteminin:

**scheduler — zamanlayıcı**

mekanizması devreye girer.

Basitleştirilmiş olarak:

```text
Thread A ─────┐
Thread B ─────┤
Thread C ─────┼──► SCHEDULER ──► CPU
Thread D ─────┤
Thread E ─────┘
```

Scheduler:

- Hangi thread'in çalışabileceğini,
- Ne zaman CPU zamanı alacağını,
- Öncelik ve sistem politikalarına göre nasıl zamanlanacağını

yönetir.

Gerçek scheduling algoritmaları işletim sistemine göre oldukça karmaşıktır.

---

# 20. Context Switch Nedir?

CPU bir thread'i çalıştırırken başka bir thread'e geçmek zorunda kalabilir.

Bu geçiş sırasında mevcut yürütme durumunun kaydedilmesi ve yeni thread'in durumunun yüklenmesi gerekir.

Bu işleme genel olarak:

**Context Switch**

denir.

Basitleştirilmiş olarak:

```text
Thread A çalışıyor
       │
       ▼
Durumu kaydet
       │
       ▼
Thread B'nin durumunu yükle
       │
       ▼
Thread B çalışıyor
```

Kaydedilen/yüklenen bağlam işlemci mimarisine ve işletim sistemine göre farklı bilgiler içerebilir.

Context switch ücretsiz değildir; belirli bir performans maliyeti vardır.

Ancak modern işletim sistemlerinin multitasking yapabilmesinde temel mekanizmalardan biridir.

---

# 21. Process Durumları

Bir process/thread yaşam döngüsü sırasında farklı durumlarda bulunabilir.

İşletim sistemlerine göre isimler ve ayrıntılar değişse de basitleştirilmiş model:

```text
             OLUŞTURULDU
                  │
                  ▼
                READY
                  │
                  ▼
               RUNNING
               /     \
              /       \
             ▼         ▼
         WAITING     TERMINATED
             │
             │ Olay tamamlandı
             ▼
            READY
```

---

## Ready

Thread çalışmaya hazırdır ancak CPU üzerinde zamanlanmayı bekleyebilir.

---

## Running

Thread şu anda bir CPU üzerinde yürütülmektedir.

---

## Waiting / Blocked

Thread bir olayın tamamlanmasını bekliyor olabilir.

Örneğin:

- Disk I/O
- Ağ verisi
- Kullanıcı girdisi
- Senkronizasyon olayı

bekliyor olabilir.

Beklemek:

> Program bozuldu.

anlamına gelmez.

Bu normal bir sistem davranışıdır.

---

## Terminated

Process/thread çalışmasını tamamlamış veya sonlandırılmıştır.

Gerçek işletim sistemlerinde bunlardan daha fazla durum ve alt durum bulunabilir.

---

# 22. Process Nasıl Sonlanır?

Bir process farklı nedenlerle sona erebilir.

Örneğin:

```text
Normal şekilde işini tamamladı
```

veya:

```text
Kullanıcı kapattı
```

veya:

```text
Başka yetkili bir process tarafından sonlandırıldı
```

veya:

```text
Hata nedeniyle çöktü
```

veya:

```text
İşletim sistemi tarafından sonlandırıldı
```

Process sonlandığında işletim sistemi ona ait çeşitli kaynakları serbest bırakır.

---

# 23. Exit Code Nedir?

Bir program sonlandığında işletim sistemine bir:

**exit code / exit status**

döndürebilir.

Genel bir gelenek olarak:

```text
0 → Başarılı

0 dışı → Bir hata veya farklı durum
```

anlamına gelebilir.

Ancak bunun tam anlamı programa ve platforma bağlıdır.

Linux shell içerisinde son komutun exit status değerini örneğin:

```bash
echo $?
```

ile görebilirsin.

PowerShell'de native programların çıkış koduyla ilişkili:

```powershell
$LASTEXITCODE
```

gibi mekanizmalar bulunur.

Exit code'lar otomasyon, troubleshooting ve bazı güvenlik analizleri için yararlı olabilir.

---

# 24. Parent ve Child Process

Bir process başka bir process oluşturabilir veya işletim sistemi aracılığıyla yeni bir process'in başlatılmasına neden olabilir.

Kavramsal olarak:

```text
PARENT PROCESS
       │
       └── CHILD PROCESS
```

Örneğin normal bir kullanıcı davranışında:

```text
explorer.exe
    │
    └── notepad.exe
```

gibi bir ilişki görebiliriz.

Bir terminal üzerinden program başlatıldığında:

```text
powershell.exe
     │
     └── python.exe
```

benzeri bir ilişki oluşabilir.

Bu ilişkiler güvenlik analizinde bağlam sağlar.

---

# 25. Parent Process Her Zaman Kötü veya İyi Davranışı Kanıtlar Mı?

Hayır.

Örneğin:

```text
powershell.exe
   │
   └── python.exe
```

tamamen normal bir geliştirici davranışı olabilir.

Aynı şekilde saldırgan da meşru sistem araçlarını kötü amaçla kullanabilir.

Bu nedenle:

```text
powershell.exe gördüm
       ↓
Saldırı var
```

şeklinde bir çıkarım yapmamalıyız.

Bunun yerine:

```text
Parent kim?
        +
Command line ne?
        +
Hangi kullanıcı?
        +
Executable nerede?
        +
Ne yaptı?
        +
Nereye bağlandı?
        =
      BAĞLAM
```

şeklinde düşünmeliyiz.

---

# 26. Process Tree Nedir?

Process'lerin parent-child ilişkilerini hiyerarşik biçimde gösteren yapıya:

**Process Tree**

denir.

Linux örneği:

```text
systemd
│
├── sshd
│   └── sshd
│       └── bash
│           └── python3
│
└── başka-servis
    └── worker
```

Windows üzerinde kavramsal bir örnek:

```text
explorer.exe
│
├── chrome.exe
│   ├── chrome.exe
│   └── chrome.exe
│
└── notepad.exe
```

Process tree bize yalnızca:

> "Hangi process çalışıyor?"

sorusunu değil:

> "Bu process nasıl ortaya çıktı?"

sorusunu da sorma imkânı verir.

---

# 27. Command Line Neden Önemlidir?

Aynı executable farklı parametrelerle çok farklı işler gerçekleştirebilir.

Örneğin:

```text
program.exe
```

ile:

```text
program.exe --option value
```

aynı executable dosyasını kullanabilir fakat farklı davranış gösterebilir.

Bu nedenle güvenlik analistleri process'in:

**command line**

bilgisini inceleyebilir.

Örneğin yalnızca:

```text
powershell.exe
```

görmek yerine:

```text
Executable
+
Command Line
+
Parent
+
User
```

bilgilerini birlikte değerlendirmek çok daha anlamlıdır.

> Command line hassas bilgiler de içerebilir. Gerçek sistemlerde toplarken ve paylaşırken veri güvenliğine dikkat edilmelidir.

---

# 28. Process'in Executable Path'i Neden Önemlidir?

Ders 04'te bir dosyanın konumunun bağlam sağladığını gördük.

Aynısı process'ler için de geçerlidir.

Örneğin Windows'ta belirli bir sistem executable'ının beklenen bir sistem dizininde bulunmasıyla aynı isimli bir dosyanın:

```text
C:\Users\...\Downloads\
```

altında bulunması aynı bağlama sahip değildir.

Bir saldırgan meşru bir process adına benzeyen dosya oluşturabilir.

Örneğin kavramsal olarak:

```text
Meşru sistem adı
      │
      ▼
Benzer isimli sahte dosya
```

Bu nedenle:

```text
Process adı
```

tek başına yeterli değildir.

Analist:

```text
Process adı
+
Executable path
+
Hash
+
Dijital imza
+
Parent
+
Command line
+
Davranış
```

gibi verileri birlikte değerlendirebilir.

---

# 29. Process ve Kullanıcı Bağlamı

Process'ler belirli güvenlik bağlamlarında çalışır.

Basitleştirilmiş olarak:

```text
KULLANICI
    │
    ▼
 PROCESS
    │
    ▼
KULLANICININ / TOKEN'IN
İZİN VERDİĞİ KAYNAKLAR
```

Windows üzerinde güvenlik token'ları, Linux üzerinde UID/GID ve capability mekanizmaları gibi daha ayrıntılı yapılar vardır.

Bunları ilerleyen derslerde inceleyeceğiz.

Şimdilik önemli olan:

> **Process'in ne yapabildiği, hangi güvenlik bağlamında çalıştığıyla yakından ilişkilidir.**

Bu bizi Ders 03'teki:

**Least Privilege**

prensibine geri götürür.

---

# 30. Environment Variables Nedir?

Process oluşturulurken çalışma ortamına ilişkin çeşitli:

**environment variables — ortam değişkenleri**

aktarılabilir.

Örneğin:

```text
PATH
TEMP
HOME
USERPROFILE
```

gibi değerlerle karşılaşabilirsin.

Programlar bu değerlerden yararlanabilir.

Örneğin:

```text
PATH
```

bir komutun hangi dizinlerde aranacağını etkileyebilir.

Environment variable'lar ileride:

- Program çalıştırma
- Sistem yönetimi
- Misconfiguration
- Privilege escalation

gibi konularda önemli hâle gelebilir.

---

# 31. Process ve Açık Dosyalar

Çalışan bir process dosyalarla etkileşim kurabilir.

Örneğin:

```text
Process
   │
   ├── Dosya açar
   ├── Dosya okur
   ├── Dosyaya yazar
   └── Dosyayı kapatır
```

İşletim sistemleri açık kaynakları takip etmek için farklı mekanizmalar kullanır.

Linux/Unix dünyasında:

**File Descriptor**

kavramıyla sıkça karşılaşacağız.

Windows'ta:

**Handle**

kavramı daha genel bir kernel nesnesi referansı olarak karşımıza çıkar.

Başlangıç seviyesinde:

```text
Process
   │
   ▼
İşletim Sistemi Tarafından
Yönetilen Kaynak Referansı
   │
   ▼
Dosya / Socket / Diğer Nesne
```

şeklinde düşünebilirsin.

---

# 32. File Descriptor Nedir?

Unix/Linux sistemlerde bir process açtığı I/O kaynaklarına sayısal:

**file descriptor**

değerleri üzerinden erişebilir.

Örneğin geleneksel olarak:

```text
0 → Standard Input

1 → Standard Output

2 → Standard Error
```

değerleriyle karşılaşırız.

Örneğin bir shell komutu:

```bash
echo "Merhaba"
```

çıktısını standard output üzerinden terminale gönderebilir.

Bu konu Ders 09'daki command-line eğitiminde çok daha anlamlı hâle gelecek.

---

# 33. Process ve Network İlişkisi

Bir process ağ iletişimi gerçekleştirmek için işletim sisteminin socket ve network mekanizmalarını kullanabilir.

Basitleştirilmiş olarak:

```text
Process
   │
   ▼
Socket
   │
   ▼
OS Network Stack
   │
   ▼
TCP / UDP
   │
   ▼
Network
```

Örneğin:

```text
chrome.exe
    │
    └── Web sunucularına bağlantılar
```

normal olabilir.

Ancak bağlam önemlidir.

Örneğin daha önce ağ iletişimi beklemediğimiz bir process'in bilinmeyen bir uzak sisteme düzenli bağlantı oluşturması araştırılabilir.

Yine:

> Ağ bağlantısı kurmak tek başına zararlı davranış değildir.

---

# 34. Socket Nedir?

**Socket**, process'lerin ağ iletişimi gerçekleştirmek için işletim sistemi tarafından sağlanan ağ iletişim uç noktalarından biridir.

İlerleyen ağ derslerinde:

```text
IP
Port
TCP
UDP
Socket
```

arasındaki ilişkiyi ayrıntılı inceleyeceğiz.

Şimdilik:

```text
Process
   │
   ▼
Socket
   │
   ▼
Network Connection
```

modelini bilmen yeterlidir.

---

# 35. Process ve Dosya Sistemi İlişkisi

Ders 04'te:

```text
Şüpheli Dosya
```

üzerinden analiz yapmıştık.

Şimdi bunun çalışan sisteme olan bağlantısını kurabiliriz.

Örneğin:

```text
Process A
   │
   └──► Dosya oluşturdu
              │
              ▼
        suspicious.exe
              │
              │ çalıştırıldı
              ▼
           Process B
```

Analist şunları araştırabilir:

```text
Dosyayı hangi process oluşturdu?

Dosya nereden geldi?

Dosya ne zaman oluşturuldu?

Dosyayı hangi process çalıştırdı?

Child process oluşturdu mu?

Ağ bağlantısı kurdu mu?
```

Bu şekilde dosya sistemi ile process telemetry'sini birlikte değerlendiririz.

---

# 36. Process ve Registry İlişkisi

Windows sistemlerde process'ler:

**Windows Registry**

ile de etkileşime girebilir.

Örneğin bir program:

- Yapılandırma okuyabilir.
- Ayar yazabilir.
- Sistem veya kullanıcıyla ilişkili belirli Registry değerlerine erişebilir.

Zararlı yazılımlar da bazı durumlarda Registry'yi persistence veya yapılandırma amacıyla kullanabilir.

Ancak:

```text
Registry değişikliği = Malware
```

değildir.

Meşru programlar sürekli Registry ile etkileşim kurar.

Registry'yi ilerleyen Windows güvenliği ve DFIR derslerinde ayrıntılı inceleyeceğiz.

---

# 37. Process ve Malware

Bir zararlı program çalıştırıldığında process veya process'ler oluşturabilir.

Örneğin kavramsal bir olay:

```text
Kullanıcı
   │
   ▼
Şüpheli Dosya
   │
   ▼
Process A
   │
   ├── Dosya oluşturdu
   │
   ├── Child process başlattı
   │
   ├── Registry değiştirdi
   │
   └── Ağ bağlantısı kurdu
```

Ancak her malware aynı şekilde davranmaz.

Bazı zararlı teknikler:

- Başka process'lerin belleğinde çalışmayı,
- Meşru process'leri kötüye kullanmayı,
- Script interpreter'larını kullanmayı,
- Bellek ağırlıklı davranışları

içerebilir.

Bu nedenle:

> "Listede şüpheli isimli process yok, sistem temiz."

sonucu doğru değildir.

---

# 38. Meşru Araçlar Kötü Amaçla Kullanılabilir Mi?

Evet.

İşletim sisteminde zaten bulunan veya meşru amaçlarla kullanılan araçlar saldırganlar tarafından da kötüye kullanılabilir.

Örneğin Windows üzerinde:

```text
PowerShell
cmd
rundll32
certutil
```

gibi araçların meşru kullanım alanları vardır.

Bunların çalışması tek başına saldırı göstergesi değildir.

Ancak saldırganlar da bazı senaryolarda bu araçlardan yararlanabilir.

Bu yaklaşım genel olarak:

**Living off the Land**

kavramıyla ilişkilidir.

Analistin sorusu:

```text
"PowerShell çalıştı mı?"
```

ile sınırlı olmamalıdır.

Daha iyi sorular:

```text
PowerShell'i kim başlattı?

Parent process neydi?

Command line neydi?

Hangi kullanıcı bağlamında çalıştı?

Ne yaptı?

Hangi dosyalara erişti?

Ağ bağlantısı kurdu mu?
```

olmalıdır.

---

# 39. Process Injection Kavramına İlk Bakış

İleride malware analysis sırasında önemli bir kavramla karşılaşacağız:

**Process Injection**

Bazı tekniklerde bir process başka bir process'in adres alanında kod veya veri yerleştirmeye ve hedef process bağlamında yürütme elde etmeye çalışabilir.

Kavramsal olarak:

```text
Process A
   │
   │
   └────► Process B'nin belleği
                 │
                 ▼
          Enjekte Edilen Kod
```

Burada teknik adımlara girmiyoruz.

Şimdilik önemli olan:

> **Zararlı kodun çalışması her zaman disk üzerindeki aynı isimli bağımsız bir process olarak görünmek zorunda değildir.**

Bu nedenle memory forensics ve EDR telemetry önemli olabilir.

---

# 40. Memory Forensics ve Process'ler

Bir RAM imajı, sistemin belirli bir andaki çalışma durumuna ilişkin önemli bilgiler içerebilir.

Analist bellek üzerinde:

- Process yapılarını,
- Thread bilgilerini,
- Yüklenmiş modülleri,
- Process bellek bölgelerini,
- Bazı açık kaynakları,
- Ağ yapılarıyla ilişkili verileri,
- Şüpheli bellek bölgelerini

araştırabilir.

Örneğin:

```text
MEMORY IMAGE
      │
      ▼
Process List
      │
      ▼
Process Tree
      │
      ▼
Memory Regions
      │
      ▼
Loaded Modules
      │
      ▼
Suspicious Behavior
```

gibi bir analiz akışı oluşturulabilir.

Bu konu ileride Memory Forensics modülünde çok daha ayrıntılı ele alınacaktır.

---

# 41. EDR Nedir?

Process davranışlarını incelerken sık karşılaşacağımız güvenlik teknolojilerinden biri:

**EDR — Endpoint Detection and Response**

sistemleridir.

EDR çözümleri ürüne ve yapılandırmaya bağlı olarak endpoint üzerinde:

- Process creation
- Parent-child ilişkileri
- Command line
- Dosya aktiviteleri
- Registry aktiviteleri
- Network aktiviteleri
- Kullanıcı bağlamı

gibi telemetri toplayabilir.

Bu sayede analist tek bir process'i izole görmek yerine olay zincirini değerlendirebilir.

Örneğin:

```text
User
 │
 ▼
Document
 │
 ▼
Process A
 │
 ▼
PowerShell
 │
 ▼
File Created
 │
 ▼
Network Connection
```

Ancak EDR verisinin de her zaman eksiksiz olduğunu varsaymamalıyız.

---

# 42. Şüpheli Process Nasıl Değerlendirilir?

Bir process'in adı:

```text
suspicious.exe
```

olsun.

Yalnızca isminden:

> "Bu malware."

diyemeyiz.

Daha sistematik yaklaşalım.

```text
PROCESS
│
├── Adı ne?
├── PID nedir?
├── Ne zaman başladı?
├── Executable path neresi?
├── Dosya hash'i nedir?
├── Dijital imzası var mı?
├── Parent process ne?
├── Child process'leri neler?
├── Command line ne?
├── Hangi kullanıcı altında çalışıyor?
├── Yetki seviyesi ne?
├── Hangi dosyalara erişiyor?
├── Hangi dosyaları oluşturuyor?
├── Hangi modülleri yükledi?
├── Hangi ağ bağlantılarını kuruyor?
└── Davranışı beklenen davranışla uyumlu mu?
```

Bu listeyi ezberlemene gerek yok.

Önemli olan düşünme biçimi:

> **Tek bir gösterge yerine bağlam ve davranış analizi.**

---

# 43. Process Adı Neden Yeterli Değildir?

Bir saldırgan dosyasına istediği adı verebilir.

Örneğin:

```text
system-service.exe
```

gibi güvenilir görünen bir ad kullanılabilir.

Hatta meşru sistem process'ine çok benzeyen bir ad seçilebilir.

Bu nedenle:

```text
Process Name
     │
     ▼
Executable Path
     │
     ▼
File Hash / Signature
     │
     ▼
Parent / Command Line
     │
     ▼
Behavior
```

zinciri çok daha anlamlıdır.

---

# 44. CPU veya RAM Kullanımı Malware Kanıtı Mıdır?

Hayır.

Bir process:

```text
%90 CPU
```

kullanıyor olabilir.

Bu:

> "Kesin malware."

anlamına gelmez.

Video işleme, oyun, derleme veya bilimsel hesaplama yapan meşru uygulamalar yüksek CPU kullanabilir.

Benzer şekilde:

```text
4 GB RAM
```

kullanan bir process de otomatik olarak zararlı değildir.

Kaynak tüketimi bir sinyal olabilir ancak bağlam içerisinde değerlendirilmelidir.

---

# 45. Windows'ta Process'leri Görüntüleme

Windows üzerinde process'leri incelemek için çeşitli araçlar kullanılabilir.

## Görev Yöneticisi

Kısayol:

```text
CTRL + SHIFT + ESC
```

Ardından:

```text
İşlemler
```

ve:

```text
Ayrıntılar
```

sekmelerini inceleyebilirsin.

Burada örneğin:

- Process adı
- PID
- CPU
- RAM
- Kullanıcı

gibi çeşitli bilgileri görebilirsin.

---

# 46. Windows `tasklist`

Command Prompt veya PowerShell içerisinde:

```cmd
tasklist
```

çalıştırılabilir.

Örnek çıktı kavramsal olarak:

```text
Image Name                     PID
========================= ========
explorer.exe                  4216
notepad.exe                   7348
chrome.exe                    8120
```

Belirli bir PID'yi filtrelemek için Windows komut seçenekleri kullanılabilir.

---

# 47. PowerShell `Get-Process`

PowerShell içerisinde:

```powershell
Get-Process
```

çalışan process'leri görüntüler.

Belirli bir process adı için:

```powershell
Get-Process -Name explorer
```

PID üzerinden:

```powershell
Get-Process -Id 4216
```

kullanılabilir.

Process'in dosya yolunu görüntülemek bazı process'lerde yetkiye bağlı olabilir.

Örneğin:

```powershell
Get-Process -Id 4216 | Select-Object Id, ProcessName, Path
```

kullanılabilir.

> Bazı sistem process'lerinin bilgilerine standart kullanıcı bağlamında erişemeyebilirsin. Bu normal bir güvenlik davranışı olabilir.

---

# 48. Windows'ta Parent Process Bilgisi

PowerShell üzerinde CIM kullanarak process bilgilerini inceleyebiliriz:

```powershell
Get-CimInstance Win32_Process |
Select-Object ProcessId, ParentProcessId, Name
```

Belirli bir process için:

```powershell
Get-CimInstance Win32_Process -Filter "ProcessId = 4216" |
Select-Object ProcessId, ParentProcessId, Name, ExecutablePath, CommandLine
```

Bazı alanların görüntülenmesi yetkilere bağlı olabilir.

Bu komutlar yalnızca bilgi toplar; process'i değiştirmez.

---

# 49. Linux'ta Process'leri Görüntüleme

Linux üzerinde temel araçlardan biri:

```bash
ps
```

komutudur.

Daha geniş process listesi için:

```bash
ps aux
```

kullanılabilir.

Örnek alanlar:

```text
USER
PID
CPU
MEM
COMMAND
```

gibi bilgiler içerebilir.

Parent-child ilişkilerini görmek için:

```bash
ps -ef --forest
```

bazı Linux sistemlerde kullanılabilir.

Ayrıca:

```bash
pstree
```

aracı process ağacını gösterebilir.

> `pstree` her sistemde varsayılan olarak kurulu olmayabilir.

---

# 50. Linux `top` ve `htop`

Process'leri canlı olarak izlemek için:

```bash
top
```

kullanılabilir.

Bazı sistemlerde:

```bash
htop
```

daha etkileşimli bir arayüz sağlar.

Bunlarla:

- CPU kullanımı
- Bellek kullanımı
- PID
- Kullanıcı
- Process durumu

gibi bilgileri inceleyebilirsin.

---

# 51. Linux `/proc` ile Process İncelemek

Ders 04'te `/proc` dosya sistemini görmüştük.

Linux'ta birçok process bilgisi:

```text
/proc/<PID>/
```

altında bulunabilir.

Örneğin:

```text
/proc/1234/
```

PID'si `1234` olan process ile ilişkili bilgiler sunabilir.

Bazı önemli örnekler:

```text
/proc/1234/cmdline
/proc/1234/status
/proc/1234/fd/
/proc/1234/maps
```

Bunlar sırasıyla process'in:

- Command line'ı
- Durum bilgileri
- Açık file descriptor'ları
- Bellek eşlemeleri

hakkında bilgi sağlayabilir.

> Erişim yetkileri nedeniyle her process'in bütün bilgilerini okuyamayabilirsin.

---

# 52. Process Analizinde Zaman Neden Önemlidir?

Bir olay araştırmasında process'in:

```text
Başlangıç zamanı
```

çok önemli olabilir.

Örneğin:

```text
14:30 Kullanıcı giriş yaptı

14:31 Belge indirildi

14:32 Process A başladı

14:32 Process B oluşturuldu

14:33 Uzak bağlantı kuruldu
```

gibi bir timeline oluşturabiliriz.

Bu bize Ders 04'teki:

**Timeline Analysis**

kavramını çalışan sistem aktiviteleriyle birleştirir.

Ancak yine:

> Tek bir timestamp bütün hikâyeyi kanıtlamaz.

Farklı veri kaynaklarını korele etmek gerekir.

---

# 53. Bir Güvenlik Analisti Gibi Düşün

Şu process tree'yi gördüğünü düşün:

```text
explorer.exe
    │
    └── document-viewer.exe
            │
            └── powershell.exe
                    │
                    └── unknown.exe
```

Bu zincir otomatik olarak saldırı kanıtı değildir.

Ancak araştırmaya değer olabilir.

Analist şu soruları sorabilir:

```text
document-viewer neden PowerShell başlattı?

PowerShell'in command line'ı neydi?

unknown.exe nereden geldi?

Hash'i nedir?

Dijital imzası var mı?

Hangi kullanıcı bağlamında çalıştı?

Ağ bağlantısı kurdu mu?

Dosya veya Registry değişikliği yaptı mı?
```

Ardından:

```text
Process telemetry
+
File system artifacts
+
Network telemetry
+
Logs
+
Memory
```

birlikte değerlendirilir.

> **Siber güvenlik analizi tek bir alarma değil, olayın bağlamına dayanır.**

---

# 🧪 Uygulama 05 — Kendi Process'lerini Tanı

Bu uygulamada yalnızca kendi bilgisayarındaki process'leri gözlemleyeceksin.

Process sonlandırmak, sistem servislerini durdurmak veya ayar değiştirmek gerekmiyor.

---

## Görev 1 — Process Listesini Aç

### Windows

```text
CTRL + SHIFT + ESC
```

ile Görev Yöneticisi'ni aç.

Ardından:

```text
Ayrıntılar
```

sekmesine geç.

### Linux

```bash
ps aux
```

### macOS

Activity Monitor kullanabilir veya:

```bash
ps aux
```

çalıştırabilirsin.

En az 5 process seç:

| Process | PID | Kullanıcı |
|---|---:|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

---

# 🧪 Görev 2 — Aynı Programdan İki Process Oluştur

Windows kullanıyorsan iki ayrı Not Defteri penceresi açmayı dene.

Görev Yöneticisi'nde process yapısını incele.

Kullandığın Windows sürümüne ve uygulama mimarisine göre gözlem farklı olabilir.

Amaç şu soruyu araştırmak:

> Aynı uygulama birden fazla process oluşturabiliyor mu?

Sonucunu yaz:

```text
Gözlemim:

____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 3 — PID'yi İncele

Bir process seç.

```text
Process adı:

____________________________________

PID:

____________________________________

Başlangıç zamanı:

____________________________________

Kullanıcı:

____________________________________
```

Bulabildiğin kadarını doldur.

---

# 🧪 Görev 4 — Executable Path'i Bul

Windows'ta Görev Yöneticisi üzerinden seçtiğin process'e sağ tıklayıp:

```text
Dosya konumunu aç
```

seçeneğini kullanabilirsin.

Dosyayı çalıştırma veya değiştirme.

Yalnızca konumunu incele.

```text
Process:

____________________________________

Executable Path:

____________________________________
```

Şimdi düşün:

> Process adı ile executable dosyanın adı aynı mı?

---

# 🧪 Görev 5 — Parent Process'i Bul

Windows PowerShell:

```powershell
Get-CimInstance Win32_Process |
Select-Object ProcessId, ParentProcessId, Name
```

Linux:

```bash
ps -ef
```

veya uygun sistemlerde:

```bash
ps -ef --forest
```

kullanabilirsin.

Bir process seç:

```text
Process:

____________________________________

PID:

____________________________________

Parent PID:

____________________________________
```

Parent process'in adını bulmaya çalış:

```text
Parent Process:

____________________________________
```

---

# 🧪 Görev 6 — Process Tree Oluştur

Kendi sistemindeki bilinen ve normal process'lerden küçük bir process ağacı oluştur.

Örneğin:

```text
Parent
│
└── Child
    │
    └── Child
```

Kendi gözlemin:

```text
____________________
│
└── ____________________
    │
    └── ____________________
```

Eğer üç seviyeli zincir bulamıyorsan iki seviye yeterlidir.

---

# 🧪 Görev 7 — CPU ve RAM Kullanımını İzle

Bir process seç.

Örneğin tarayıcın.

İlk değerleri not et:

```text
CPU:

____________________ %

RAM:

____________________ MB
```

Şimdi uygulamada normal bir işlem gerçekleştir.

Örneğin yeni bir sekme aç veya sayfa yükle.

Tekrar gözlemle:

```text
CPU:

____________________ %

RAM:

____________________ MB
```

Değerlerin zaman içerisinde değiştiğini görebilirsin.

> Tek bir CPU/RAM ölçümü process'in güvenilir veya zararlı olduğunu göstermez.

---

# 🧪 Görev 8 — Thread Sayısını Gözlemle

Windows Görev Yöneticisi'nin `Ayrıntılar` sekmesinde sütun başlıklarına sağ tıklayarak uygun sistemlerde:

```text
İş parçacıkları / Threads
```

sütununu etkinleştirebilirsin.

Alternatif olarak PowerShell:

```powershell
Get-Process | Select-Object ProcessName, Id, @{Name="Threads";Expression={$_.Threads.Count}}
```

kullanılabilir.

Bir process seç:

```text
Process:

____________________________________

PID:

____________________________________

Thread sayısı:

____________________________________
```

Şimdi şu soruyu cevapla:

> Process'in yalnızca bir thread'i mi var?

```text
____________________________________________________
```

---

# 🧪 Görev 9 — Linux `/proc` Gözlemi

Linux kullanıyorsan kendi shell process'inin PID'sini bul:

```bash
echo $$
```

Ardından:

```bash
cat /proc/$$/status
```

komutunu incele.

Command line:

```bash
tr '\0' ' ' < /proc/$$/cmdline
```

File descriptor'lar:

```bash
ls -l /proc/$$/fd
```

Bu görev zorunlu değildir.

Ama Ders 04'te öğrendiğimiz `/proc` ile process kavramının nasıl birleştiğini gözlemlemek için güzel bir örnektir.

---

# 🔐 Siber Güvenlik Görevi — Bir Process Profili Oluştur

Kendi sisteminden bildiğin ve güvendiğin normal bir process seç.

Örneğin:

```text
Notepad
Chrome
VS Code
```

Aşağıdaki profili doldur:

```text
Process Adı:

____________________________________

PID:

____________________________________

Executable Path:

____________________________________

Parent Process:

____________________________________

Parent PID:

____________________________________

Kullanıcı:

____________________________________

Başlangıç Zamanı:

____________________________________

CPU Kullanımı:

____________________________________

RAM Kullanımı:

____________________________________

Thread Sayısı:

____________________________________

Dijital İmza / Publisher:

____________________________________

Ağ Bağlantısı Bekliyor muyum?

____________________________________
```

Sonra şu soruyu cevapla:

> Bu process'in normal olduğuna karar verirken yalnızca adına güvenmek neden yeterli değildir?

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

# 🧠 Kendini Test Et

## Soru 1

Program ile process arasındaki farkı en doğru açıklayan ifade hangisidir?

**A)** Program ve process tamamen aynı şeydir.  
**B)** Program depolanmış yazılımdır; process çalışan program örneğidir.  
**C)** Process yalnızca bir dosya uzantısıdır.  
**D)** Program yalnızca RAM'de bulunabilir.

---

## Soru 2

PID ile ilgili hangisi doğrudur?

**A)** Bir PID sonsuza kadar yalnızca tek bir process'e aittir.  
**B)** Process sonlandıktan sonra PID hiçbir zaman tekrar kullanılamaz.  
**C)** PID çalışan bir process'i tanımlamaya yardımcı olur ancak daha sonra yeniden kullanılabilir.  
**D)** PID bir IP adresidir.

---

## Soru 3

Thread nedir?

**A)** Depolama aygıtı  
**B)** Process içerisindeki yürütme akışı  
**C)** Dosya sistemi  
**D)** Network protokolü

---

## Soru 4

Hangisi thread'ler için doğrudur?

**A)** Aynı process içerisindeki thread'ler hiçbir kaynak paylaşmaz.  
**B)** Her thread farklı bir fiziksel bilgisayarda çalışmak zorundadır.  
**C)** Aynı process içerisindeki thread'ler adres alanı ve bazı kaynakları paylaşabilir.  
**D)** Thread ile PID tamamen aynı şeydir.

---

## Soru 5

Her thread'in kendisine ait hangi yapı bulunur?

**A)** Fiziksel SSD  
**B)** Stack ve yürütme bağlamı  
**C)** Ayrı işletim sistemi  
**D)** Ayrı ağ kartı

---

## Soru 6

Scheduler'ın temel görevi hangisidir?

**A)** Dosya isimlerini değiştirmek  
**B)** Çalışabilir thread'lerin CPU üzerinde ne zaman yürütüleceğini yönetmek  
**C)** SSD kapasitesini artırmak  
**D)** IP adresi oluşturmak

---

## Soru 7

Context switch nedir?

**A)** Bir dosyanın uzantısını değiştirmek  
**B)** CPU'nun bir yürütme bağlamından başka birine geçmesi için gerekli durum değişimi  
**C)** Bilgisayarın IP adresini değiştirmek  
**D)** SSD'yi RAM'e dönüştürmek

---

## Soru 8

Bir process `waiting` durumundaysa bu kesinlikle problem olduğu anlamına gelir mi?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________
```

---

## Soru 9

Aşağıdakilerden hangisi bir process'i güvenlik açısından değerlendirirken yararlı bağlam sağlayabilir?

**A)** Parent process  
**B)** Command line  
**C)** Executable path  
**D)** Kullanıcı  
**E)** Ağ bağlantıları  
**F)** Hepsi

---

## Soru 10

`powershell.exe` process'ini gördün.

Bundan hangisini kesin olarak söyleyebilirsin?

**A)** Sistem saldırı altındadır.  
**B)** PowerShell kesinlikle malware'dir.  
**C)** Tek başına process adı niyet hakkında yeterli değildir; bağlam incelenmelidir.  
**D)** Process kesinlikle yönetici yetkisine sahiptir.

---

## Soru 11

Aynı program dosyasından iki farklı process çalıştırılabilir mi?

**A)** Evet  
**B)** Hayır

Açıkla:

```text
____________________________________________________
```

---

## Soru 12 — Analist Sorusu

Aşağıdaki process tree gözlemlendi:

```text
explorer.exe
    │
    └── document-reader.exe
            │
            └── powershell.exe
```

Bunun saldırı olduğunu hemen söyleyebilir miyiz?

Neden?

Hangi üç bilgiyi daha toplamak isterdin?

```text
1.

2.

3.
```

---

# 🎯 Ana Görev — Bir Process'i Baştan Sona Açıkla

Ders 01'de şu soruyla başladık:

> Chrome'u açtığımda ne olur?

Artık daha ayrıntılı cevap verebiliriz.

Aşağıdaki kavramları kullanarak Chrome gibi bir programın çalıştırılmasını kendi cümlelerinle açıkla:

```text
Executable File
Operating System
Process
PID
Virtual Address Space
Thread
Stack
Heap
Scheduler
CPU
User Context
File
Network
```

En az 8 aşama kullan.

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

Cevabının tamamen teknik olarak kusursuz olması beklenmiyor.

Ama artık:

```text
Disk → RAM → CPU
```

şeklindeki üç kutulu başlangıç modelinden daha ayrıntılı bir açıklama yapabilmelisin.

---

# 🔍 Bonus Analist Sorusu

Sistemde şu process'i gördüğünü düşün:

```text
Name:
svchost.exe

Path:
C:\Users\Ahmet\Downloads\svchost.exe
```

Şu anda:

> "Kesin malware."

diyebilir miyiz?

Hayır.

Ancak neden araştırmaya değer olabilir?

Şunları düşün:

```text
Beklenen executable path

Dijital imza

Dosya hash'i

Parent process

Command line

Kullanıcı bağlamı

Network davranışı
```

Cevabını yaz:

```text
____________________________________________________

____________________________________________________

____________________________________________________
```

---

# 🔐 Siber Güvenlik Bağlantısı

Process bilgisi birçok güvenlik alanının merkezindedir.

```text
PROCESS
│
├── BLUE TEAM
│   ├── Process Telemetry
│   ├── Parent / Child
│   ├── Command Line
│   └── EDR
│
├── DFIR
│   ├── Process Timeline
│   ├── Memory Forensics
│   └── Execution Artifacts
│
├── MALWARE ANALYSIS
│   ├── Process Behavior
│   ├── Threads
│   ├── Memory
│   ├── Modules
│   └── Injection
│
├── REVERSE ENGINEERING
│   ├── Stack
│   ├── Registers
│   ├── Memory
│   └── Threads
│
└── INCIDENT RESPONSE
    ├── User
    ├── Process
    ├── File
    ├── Network
    └── Timeline
```

Artık şu bağlantıyı kurabiliriz:

```text
KULLANICI
    │
    ▼
  DOSYA
    │
    ▼
 PROCESS
    │
    ├──► THREAD
    │       │
    │       ▼
    │      CPU
    │
    ├──► MEMORY
    │
    ├──► FILES
    │
    └──► NETWORK
```

Bu model ilerleyen güvenlik derslerinin önemli temel taşlarından biri olacak.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Bir process'e artık yalnızca:

```text
chrome.exe
```

olarak bakmamalısın.

Bir güvenlik analisti için process:

```text
                         PROCESS
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
    KİMLİK               BELLEK              BAĞLAM
       │                    │                    │
   ┌───┼───┐          ┌─────┼─────┐        ┌─────┼─────┐
   ▼   ▼   ▼          ▼     ▼     ▼        ▼     ▼     ▼
  PID Name Parent    Code  Heap  Stack     User  Path  Cmdline
                            │
                            ▼
                         THREADS
                            │
                            ▼
                         SCHEDULER
                            │
                            ▼
                           CPU
```

ve aynı zamanda:

```text
Process
│
├── Files
├── Registry / Sistem Kaynakları
├── Network Connections
├── Child Processes
└── OS Objects
```

ile etkileşim kuran dinamik bir yapıdır.

Bir analist:

> "Bu process'in adı ne?"

sorusunda durmaz.

Şunu sorar:

> **Kim başlattı, nereden çalıştı, hangi yetkilerle çalıştı, hangi komut satırıyla başladı ve sistem üzerinde ne yaptı?**

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] Program ile process arasındaki farkı açıklayabiliyorum.
- [ ] Aynı programdan birden fazla process oluşabileceğini biliyorum.
- [ ] PID'nin ne olduğunu biliyorum.
- [ ] PID'nin kalıcı ve global olarak benzersiz olmadığını biliyorum.
- [ ] PPID kavramını tanıyorum.
- [ ] Process sanal adres alanı kavramını temel seviyede biliyorum.
- [ ] Code, stack ve heap kavramlarını temel seviyede tanıyorum.
- [ ] Her thread'in kendi stack'i olduğunu biliyorum.
- [ ] Thread'in ne olduğunu açıklayabiliyorum.
- [ ] Software thread ile hardware thread arasındaki farkı temel seviyede biliyorum.
- [ ] Concurrency ve parallelism arasındaki temel farkı biliyorum.
- [ ] Scheduler'ın ne yaptığını anlayabiliyorum.
- [ ] Context switch kavramını tanıyorum.
- [ ] Process/thread durumlarını temel seviyede biliyorum.
- [ ] Exit code kavramını tanıyorum.
- [ ] Parent ve child process ilişkisini açıklayabiliyorum.
- [ ] Process tree'nin neden önemli olduğunu biliyorum.
- [ ] Command line'ın analiz açısından neden önemli olduğunu biliyorum.
- [ ] Executable path'in neden önemli olduğunu biliyorum.
- [ ] Process'in kullanıcı bağlamında çalıştığını biliyorum.
- [ ] Environment variable kavramını tanıyorum.
- [ ] File descriptor ve handle kavramlarını temel seviyede tanıyorum.
- [ ] Process ile network arasındaki ilişkiyi biliyorum.
- [ ] Process ile dosya sistemi arasındaki ilişkiyi biliyorum.
- [ ] Meşru sistem araçlarının kötüye kullanılabileceğini biliyorum.
- [ ] Process adının tek başına malware kanıtı olmadığını biliyorum.
- [ ] Windows'ta process listesini inceledim.
- [ ] Bir process'in PID'sini buldum.
- [ ] Bir process'in parent bilgisini araştırdım.
- [ ] Bir process'in executable path'ini buldum.
- [ ] Thread sayısını gözlemledim.
- [ ] Quiz sorularını cevapladım.
- [ ] Process profili görevini tamamladım.

---

# 🧩 Dersin Özeti

Artık bir programın çalıştırılmasını daha ayrıntılı bir modelle açıklayabiliriz:

```text
              EXECUTABLE FILE
                     │
                     ▼
             OPERATING SYSTEM
                     │
                     ▼
                  PROCESS
           ┌─────────┼─────────┐
           │         │         │
           ▼         ▼         ▼
          PID      MEMORY     USER
                     │       CONTEXT
             ┌───────┼───────┐
             ▼       ▼       ▼
            CODE    HEAP   THREADS
                            │
                            ├── Stack
                            ├── Registers
                            └── Execution State
                                 │
                                 ▼
                             SCHEDULER
                                 │
                                 ▼
                                CPU
```

Process aynı zamanda:

```text
FILES
NETWORK
CHILD PROCESSES
SYSTEM RESOURCES
```

ile etkileşim kurabilir.

Güvenlik analizi ise bunların arasındaki ilişkileri anlamaya çalışır:

```text
USER
  │
  ▼
PROCESS
  │
  ├──► FILE
  │
  ├──► CHILD PROCESS
  │
  ├──► MEMORY
  │
  └──► NETWORK
```

Bu noktadan sonra artık bilgisayarın tek bir cihazdan ibaret olmadığını; birbiriyle ilişkili kullanıcılar, process'ler, dosyalar, bellek bölgeleri ve sistem kaynaklarından oluşan çalışan bir sistem olduğunu görmeye başlıyoruz.

---

# 🚀 Sonraki Ders

## Ders 06 — Network Fundamentals: Bilgisayarlar Birbirleriyle Nasıl Konuşur?

Şimdi tek bir bilgisayarın içerisinden dış dünyaya çıkıyoruz.

Bir sonraki derste:

- Network nedir?
- Client ve Server nedir?
- LAN ve WAN nedir?
- Network interface nedir?
- MAC adresi nedir?
- IP adresi nedir?
- IPv4 nedir?
- Private ve Public IP arasındaki fark nedir?
- Subnet kavramı nedir?
- Default Gateway nedir?
- Switch ne yapar?
- Router ne yapar?
- ARP nedir?
- Paket nedir?
- Bir bilgisayar başka bir bilgisayara nasıl veri gönderir?
- `127.0.0.1` ve localhost nedir?
- Process ile network bağlantısı arasında nasıl ilişki kurulur?

sorularının cevaplarını arayacağız.

Ve Ders 05'te öğrendiğimiz:

```text
Process
   │
   ▼
Socket
   │
   ▼
Network
```

ilişkisini büyüterek:

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
INTERNET
```

modeline ulaşacağız.