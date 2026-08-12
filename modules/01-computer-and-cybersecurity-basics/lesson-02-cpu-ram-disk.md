# Ders 02 — CPU, RAM ve Disk

> AG Cyber Lab — Community Edition
>
> Seviye: Başlangıç
> Modül: 01 — Bilgisayar ve Siber Güvenlik Temelleri

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- CPU'nun ne olduğunu açıklayabileceksin.
- RAM'in ne işe yaradığını anlayabileceksin.
- SSD ve HDD'nin temel farklarını açıklayabileceksin.
- CPU, RAM ve disk arasındaki görev farkını anlayabileceksin.
- Bir program çalıştırıldığında bu üç bileşenin nasıl birlikte çalıştığını anlayabileceksin.
- Siber güvenlik açısından CPU, RAM ve diskin neden önemli olduğunu anlayabileceksin.

---

# 1. Bilgisayarın Temel Bileşenleri

Bir bilgisayarın çalışması için birçok farklı donanım bileşeni birlikte görev yapar.

Ancak bilgisayarın çalışma mantığını anlamaya başlamak için özellikle üç bileşeni iyi anlamamız gerekir:

- CPU
- RAM
- Disk

Bu üç bileşenin görevleri birbirinden farklıdır.

Basitleştirirsek:

```text
                 BİLGİSAYAR
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
         CPU        RAM        DİSK
          │          │          │
        İşler      Geçici      Kalıcı
                   çalışma    depolama
                    alanı       alanı
```

Buradaki temel mantık:

> **CPU işler, RAM çalışırken kullanılan verileri tutar, disk ise verileri kalıcı olarak saklar.**

Bu üç bileşenin görevini anlamak, bilgisayarın çalışma mantığını anlamanın önemli adımlarından biridir.

---

# 2. CPU Nedir?

CPU, bilgisayarın merkezi işlem birimidir.

Açılımı:

**Central Processing Unit**

Türkçesi:

**Merkezi İşlem Birimi**

CPU'yu basitçe bilgisayarın işlemleri gerçekleştiren temel bileşeni olarak düşünebiliriz.

Bir program çalışırken bilgisayarın gerçekleştirmesi gereken birçok işlem vardır.

CPU bu işlemleri gerçekleştirir.

Örneğin CPU:

- Matematiksel işlemler yapabilir.
- Mantıksal işlemler gerçekleştirebilir.
- Program talimatlarını işleyebilir.
- İşletim sistemi tarafından verilen işlemleri gerçekleştirebilir.
- Diğer donanım bileşenleriyle birlikte çalışabilir.

Kısaca:

> **CPU = İşlemleri gerçekleştiren temel işlem birimi**

---

# 3. CPU Nasıl Çalışır?

CPU'yu anlamanın en basit yollarından biri işlem mantığını incelemektir.

Bir program CPU'ya çeşitli talimatlar verir.

CPU bu talimatları işler ve gerekli işlemleri gerçekleştirir.

Basitleştirilmiş şekilde:

```text
Program
   │
   ▼
Talimat
   │
   ▼
 CPU
   │
   ▼
İşlem
   │
   ▼
Sonuç
```

Örneğin basit bir matematik işlemi düşünelim:

```text
5 + 3
```

Bilgisayarın gerçekleştirdiği işlem kabaca:

```text
5 ve 3 değerleri
       │
       ▼
      CPU
       │
       ▼
Toplama işlemi
       │
       ▼
       8
```

Gerçek bilgisayarların yaptığı işlemler bundan çok daha karmaşıktır.

Ancak temel mantık benzerdir:

> **Program bir işlem yapılmasını ister, CPU bu işlemi gerçekleştirir.**

---

# 4. CPU Hızı Neden Önemlidir?

CPU performansı birçok farklı faktöre bağlıdır.

Bunlardan biri işlemci saat hızıdır.

Saat hızı genellikle **GHz** cinsinden ifade edilir.

Örneğin:

```text
3.0 GHz
4.0 GHz
5.0 GHz
```

Ancak yalnızca GHz değerine bakarak iki işlemciyi karşılaştırmak doğru değildir.

Çünkü işlemci performansını etkileyen başka faktörler de vardır:

- Çekirdek sayısı
- İş parçacığı sayısı
- Mimari
- Önbellek
- İşlemci nesli
- Güç tüketimi
- İş yükünün türü

Bu nedenle:

> **Daha yüksek GHz her zaman daha hızlı bilgisayar anlamına gelmez.**

Başlangıç seviyesinde önemli olan, CPU'nun temel görevinin **işlem gerçekleştirmek** olduğunu anlamaktır.

---

# 5. RAM Nedir?

RAM, bilgisayarın geçici çalışma belleğidir.

Açılımı:

**Random Access Memory**

RAM, bilgisayar çalışırken ihtiyaç duyulan verilerin geçici olarak tutulduğu alandır.

Örneğin Google Chrome'u açtığında Chrome'un çalışması için gerekli verilerin bir bölümü RAM'e yüklenir.

Benzer şekilde:

- Oyunlar
- Web tarayıcıları
- Editörler
- Terminal uygulamaları
- İşletim sistemi bileşenleri

çalışırken RAM kullanır.

Kısaca:

> **RAM = Bilgisayar çalışırken kullanılan geçici çalışma alanı**

---

# 6. RAM Neden Gereklidir?

Bir programın bilgisayarda çalışabilmesi için programın ihtiyaç duyduğu verilerin çalışma sırasında erişilebilir olması gerekir.

Örneğin bilgisayarında bir uygulama açtığını düşün.

Basitleştirilmiş olarak:

```text
Disk
 │
 │ Program dosyaları
 ▼
RAM
 │
 │ Çalışma sırasında kullanılan veriler
 ▼
CPU
 │
 │ İşlemler
 ▼
Sonuç
```

Burada disk programın kalıcı olarak bulunduğu yerdir.

RAM ise program çalışırken kullanılan çalışma alanıdır.

CPU ise gerekli işlemleri gerçekleştirir.

---

# 7. RAM Neden Geçicidir?

RAM'in en önemli özelliklerinden biri verilerin geçici olarak tutulmasıdır.

Bilgisayar kapatıldığında RAM'deki veriler korunmaz.

Örneğin:

```text
Bilgisayar açık
      │
      ▼
     RAM
      │
      ▼
Program verileri
```

Bilgisayar kapatıldığında:

```text
Bilgisayar kapandı
      │
      ▼
RAM'deki geçici veriler temizlenir
```

Bu nedenle RAM'i kalıcı depolama alanı olarak düşünmemeliyiz.

Kalıcı olarak saklamak istediğimiz dosyalar genellikle disk üzerinde tutulur.

---

# 8. RAM Miktarı Neden Önemlidir?

RAM miktarı bilgisayarın aynı anda ne kadar çalışma verisini bellekte tutabileceğini etkiler.

Örneğin:

- 4 GB RAM
- 8 GB RAM
- 16 GB RAM
- 32 GB RAM

gibi farklı kapasitelere sahip bilgisayarlar vardır.

Bir bilgisayarda aynı anda çok sayıda uygulama çalıştırıldığında RAM kullanımı artabilir.

Örneğin:

```text
Chrome
   +
Visual Studio Code
   +
Discord
   +
Bir oyun
   +
İşletim sistemi
```

Bu uygulamaların tamamı çalışma sırasında RAM kullanabilir.

RAM yetersiz kaldığında sistem performansı olumsuz etkilenebilir.

Ancak:

> **Daha fazla RAM her durumda bilgisayarı otomatik olarak hızlandırmaz.**

RAM miktarının etkisi, bilgisayarda yapılan iş yüküne bağlıdır.

---

# 9. Disk Nedir?

Disk, verilerin kalıcı olarak saklandığı depolama birimidir.

Günümüzde en yaygın depolama teknolojileri:

- HDD
- SSD

şeklindedir.

Disk üzerinde:

- İşletim sistemi
- Programlar
- Belgeler
- Fotoğraflar
- Videolar
- Oyunlar
- Kullanıcı dosyaları

saklanabilir.

Kısaca:

> **Disk = Verilerin kalıcı olarak saklandığı alan**

---

# 10. HDD Nedir?

HDD, **Hard Disk Drive** ifadesinin kısaltmasıdır.

Geleneksel bir mekanik depolama teknolojisidir.

HDD içerisinde hareket eden mekanik parçalar bulunur.

Basitleştirilmiş olarak:

```text
HDD
 │
 ├── Manyetik disk
 ├── Okuma/yazma kafası
 └── Hareketli mekanik parçalar
```

HDD'lerin bazı avantajları:

- Büyük kapasitelere ulaşabilir.
- Genellikle kapasite başına daha düşük maliyetlidir.

Dezavantajları:

- SSD'lere göre daha yavaştır.
- Mekanik parçalar içerir.
- Fiziksel darbelere karşı daha hassastır.

---

# 11. SSD Nedir?

SSD, **Solid State Drive** ifadesinin kısaltmasıdır.

SSD'ler verileri elektronik bellek üzerinde saklar.

HDD'nin aksine hareketli mekanik parçalar içermez.

Basitleştirilmiş olarak:

```text
SSD
 │
 ├── Flash bellek
 ├── Denetleyici
 └── Hareketli mekanik parça yok
```

SSD'lerin bazı avantajları:

- Genellikle HDD'den daha hızlıdır.
- Sessiz çalışır.
- Mekanik hareketli parça içermez.
- İşletim sistemi ve programların daha hızlı açılmasını sağlayabilir.

---

# 12. SSD ve HDD Arasındaki Temel Fark

Basit bir karşılaştırma:

| Özellik | HDD | SSD |
|---|---|---|
| Teknoloji | Mekanik | Elektronik |
| Hareketli parça | Var | Yok |
| Hız | Daha düşük | Daha yüksek |
| Sessizlik | Daha düşük | Daha yüksek |
| Darbe dayanıklılığı | Daha düşük | Genellikle daha yüksek |
| Maliyet / kapasite | Genellikle daha uygun | Genellikle daha yüksek |

Burada önemli olan:

> **HDD ve SSD'nin ikisi de verileri kalıcı olarak saklar.**

Aralarındaki temel fark depolama teknolojisidir.

---

# 13. CPU, RAM ve Disk Arasındaki Fark

Şimdi üç bileşeni birlikte karşılaştıralım.

| Bileşen | Temel Görevi |
|---|---|
| CPU | İşlemleri gerçekleştirir |
| RAM | Çalışma sırasında kullanılan verileri geçici olarak tutar |
| Disk | Verileri kalıcı olarak saklar |

Bunu günlük hayattan basit bir örnekle düşünebiliriz.

Bir çalışma masası düşün.

```text
                 ÇALIŞMA ALANI
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
       CPU           RAM           DİSK
        │             │             │
      Çalışan       Masa         Dolap
       kişi         üzeri
```

Bu sadece kavramları zihinde canlandırmak için kullanılan bir benzetmedir.

- **CPU:** Çalışan kişi gibi düşünülebilir.
- **RAM:** Çalışma sırasında kullanılan masa alanı gibidir.
- **Disk:** Dosyaların saklandığı dolap gibidir.

---

# 14. Bir Program Çalıştırdığımızda Ne Olur?

Şimdi öğrendiğimiz bilgileri birleştirelim.

Örneğin bilgisayarında Google Chrome'u açtığını düşün.

Sen sadece Chrome simgesine tıklarsın.

Ancak arka planda birçok işlem gerçekleşir.

Basitleştirilmiş şekilde:

```text
        Chrome dosyaları
              │
              │ Diskten okunur
              ▼
             RAM
              │
              │ Çalışma verileri
              ▼
             CPU
              │
              │ İşlemleri gerçekleştirir
              ▼
           Chrome
              │
              ▼
            Ekran
```

Burada:

**Disk:**

Chrome'un dosyalarının kalıcı olarak bulunduğu yerdir.

**RAM:**

Chrome çalışırken ihtiyaç duyduğu verilerin tutulduğu çalışma alanıdır.

**CPU:**

Chrome'un gerçekleştirmesi gereken işlemleri işler.

---

# 15. Basit Bir Örnek

Bir web tarayıcısında bir web sitesini açtığını düşün.

```text
1. Chrome disk üzerinde bulunur.
          │
          ▼
2. Chrome çalıştırılır.
          │
          ▼
3. Gerekli veriler RAM'e yüklenir.
          │
          ▼
4. CPU gerekli işlemleri gerçekleştirir.
          │
          ▼
5. Sonuç ekranda gösterilir.
```

Gerçek sistemlerde bu süreç çok daha karmaşıktır.

Ancak bu model başlangıç seviyesinde bilgisayarın temel çalışma mantığını anlamak için yeterlidir.

---

# 16. RAM ile Disk Aynı Şey Değildir

Başlangıç seviyesinde sık yapılan hatalardan biri RAM ile diski aynı şey olarak düşünmektir.

Örneğin:

> "Bilgisayarımda 16 GB RAM var ve 1 TB SSD var. İkisi de depolama değil mi?"

Hayır.

İkisi farklı amaçlara hizmet eder.

### RAM

```text
Geçici
Çalışma sırasında kullanılır
Bilgisayar kapanınca içerik kaybolur
```

### Disk

```text
Kalıcı
Dosyalar burada saklanır
Bilgisayar kapansa bile veriler korunur
```

Bu nedenle:

> **RAM çalışma alanıdır, disk kalıcı depolama alanıdır.**

---

# 17. Siber Güvenlik Açısından Neden Önemli?

Şimdi konuyu siber güvenliğe bağlayalım.

Bir siber güvenlik uzmanı yalnızca programları kullanmayı değil, bilgisayarın nasıl çalıştığını da bilmelidir.

Çünkü saldırılar ve güvenlik olayları bilgisayarın farklı bileşenlerini etkileyebilir.

Örneğin:

- Zararlı yazılımlar disk üzerinde dosyalar oluşturabilir.
- Bir zararlı yazılım RAM üzerinde çalışan işlemler oluşturabilir.
- Bir saldırgan çalışan süreçlerden yararlanabilir.
- Bellekte bulunan hassas bilgiler incelenebilir.
- Disk üzerinde adli bilişim açısından önemli izler bulunabilir.

Bu nedenle CPU, RAM ve disk kavramları siber güvenlik açısından önemlidir.

---

# 18. Disk ve Dijital Adli Bilişim

Dijital adli bilişim açısından disk özellikle önemlidir.

Bir olay sonrasında bilgisayarda şu tür veriler incelenebilir:

- Dosyalar
- Log kayıtları
- Tarayıcı geçmişi
- İndirilen dosyalar
- Kullanıcı klasörleri
- Silinmiş dosyalar
- Dosya zaman bilgileri
- İşletim sistemi artefaktları

Bu veriler bir olayın nasıl gerçekleştiğini anlamaya yardımcı olabilir.

Örneğin:

```text
Şüpheli dosya
     │
     ▼
Disk üzerinde bulundu
     │
     ▼
Dosya zamanları incelendi
     │
     ▼
İlgili loglar incelendi
     │
     ▼
Olayın zaman çizelgesi oluşturuldu
```

Bu nedenle disk ve dosya sistemlerini anlamak ileride DFIR çalışmalarında oldukça önemlidir.

---

# 19. RAM ve Dijital Adli Bilişim

RAM de siber güvenlik ve dijital adli bilişim açısından önemlidir.

Çünkü bazı bilgiler yalnızca bilgisayar çalışırken bellekte bulunabilir.

Örneğin:

- Çalışan süreçler
- Ağ bağlantıları
- Bellekte bulunan bazı zararlı yazılım bileşenleri
- Komutlar
- Geçici veriler
- Çalışan uygulamalara ait bilgiler

RAM üzerinde bulunabilir.

Bilgisayar kapatıldığında RAM'deki birçok geçici bilgi kaybolabilir.

Bu nedenle bellek analizi bazı olaylarda kritik olabilir.

İlerleyen derslerde:

> **Memory Forensics**

konusuna daha detaylı şekilde değineceğiz.

---

# 20. CPU ve Siber Güvenlik

CPU da sistem güvenliğinin temel parçalarından biridir.

Çünkü çalışan programların gerçekleştirdiği işlemler CPU üzerinde yürütülür.

Örneğin bir zararlı yazılım çalıştırıldığında:

```text
Zararlı yazılım
      │
      ▼
   Çalıştırılır
      │
      ▼
     RAM
      │
      ▼
     CPU
      │
      ▼
 Zararlı işlemler
```

Bu nedenle ileride:

- Process
- Thread
- Malware Analysis
- Exploit
- Privilege Escalation

gibi konuları öğrenirken CPU, RAM ve işletim sistemi arasındaki ilişkiyi anlamak işimizi kolaylaştıracaktır.

---

# 21. Üç Bileşeni Birlikte Hatırlayalım

Dersin en önemli bölümünü tek bir şemada toparlayalım:

```text
                       BİLGİSAYAR
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
           CPU            RAM            DİSK
            │              │              │
          İşler         Geçici         Kalıcı
                       çalışma        depolama
                        alanı           alanı
            │              │              │
            └──────────────┼──────────────┘
                           │
                           ▼
                     ÇALIŞAN SİSTEM
```

Kısaca:

> **CPU işler.**

> **RAM çalışırken kullanılan verileri tutar.**

> **Disk verileri kalıcı olarak saklar.**

Bu üç cümleyi biliyorsan dersin temel amacını anlamışsın demektir.

---

# 🧠 Mini Kontrol

Aşağıdaki soruları cevaplamaya çalış.

### Soru 1

Bilgisayarın işlemleri gerçekleştiren temel bileşeni hangisidir?

- RAM
- CPU
- SSD
- HDD

### Soru 2

Bilgisayar çalışırken kullanılan geçici çalışma alanı hangisidir?

- CPU
- RAM
- SSD
- HDD

### Soru 3

Dosyaların bilgisayar kapatıldıktan sonra da saklanmasını sağlayan bileşen hangisidir?

- CPU
- RAM
- Disk

### Soru 4

Aşağıdakilerden hangisi RAM'in özelliklerinden biridir?

- Verileri kalıcı olarak saklar.
- Bilgisayar çalışırken geçici çalışma alanı olarak kullanılır.
- İşlemci yerine geçer.
- İşletim sisteminin kendisidir.

---

# 🔍 Kendini Test Et

Şimdi şu senaryoyu düşün:

Bilgisayarında Chrome'u açtın.

Aşağıdaki soruları kendi kendine cevapla:

**1. Chrome'un dosyaları nerede bulunur?**

**2. Chrome çalışırken verilerinin bir bölümü nerede tutulur?**

**3. Chrome'un gerçekleştirdiği işlemleri hangi bileşen işler?**

Cevap:

```text
Chrome dosyaları
       │
       ▼
      DİSK
       │
       ▼
      RAM
       │
       ▼
      CPU
       │
       ▼
    İşlemler
```

---

# 🎯 Ders Özeti

Bu derste üç temel bileşeni öğrendik:

### CPU

> İşlemleri gerçekleştirir.

### RAM

> Bilgisayar çalışırken kullanılan geçici çalışma alanıdır.

### Disk

> Verilerin kalıcı olarak saklandığı depolama alanıdır.

Ayrıca:

- HDD'nin mekanik bir depolama teknolojisi olduğunu,
- SSD'nin elektronik bellek kullandığını,
- RAM ile diskin farklı amaçlara hizmet ettiğini,
- Bir program çalışırken CPU, RAM ve diskin birlikte görev yaptığını,
- Bu bileşenlerin siber güvenlik ve dijital adli bilişim açısından neden önemli olduğunu öğrendik.

---

# 🚀 Bir Sonraki Derste

Bir sonraki derste bilgisayarın üzerinde çalışan yazılımları biraz daha yakından inceleyeceğiz.

Özellikle:

- İşletim sistemi
- Process
- Program
- Uygulama
- Kullanıcı ve işletim sistemi arasındaki ilişki

konularını ele alacağız.

Çünkü siber güvenlikte ilerledikçe karşımıza sürekli şu kavramlar çıkacak:

```text
Program
   │
   ▼
Process
   │
   ▼
Memory
   │
   ▼
CPU
   │
   ▼
Operating System
```

Bu kavramları anlamadan ilerideki **malware analysis, DFIR, exploit ve sistem güvenliği** konularını tam olarak anlamak zorlaşacaktır.

---

## ✅ Ders Tamamlama Kriterleri

Bu dersi tamamlamak için:

- [ ] CPU'nun görevini açıklayabiliyorum.
- [ ] RAM'in görevini açıklayabiliyorum.
- [ ] Diskin görevini açıklayabiliyorum.
- [ ] SSD ve HDD arasındaki temel farkı biliyorum.
- [ ] CPU, RAM ve disk arasındaki ilişkiyi açıklayabiliyorum.
- [ ] Bir program çalıştırıldığında temel olarak neler olduğunu anlayabiliyorum.
- [ ] Bu bileşenlerin siber güvenlik açısından neden önemli olduğunu açıklayabiliyorum.

**Hazırsan bir sonraki derse geçebilirsin.**