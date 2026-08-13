# Ders 09 — Command Line Basics: Sistemi Terminalden Anlamak

> **AG Cyber Lab — Community Edition**
>
> **Seviye:** Başlangıç  
> **Modül:** 01 — Bilgisayar ve Siber Güvenlik Temelleri  
> **Ön Koşul:** Ders 01–08

---

## 🎯 Bu Derste Ne Öğreneceksin?

Bu dersin sonunda:

- CLI, terminal ve shell kavramlarını birbirinden ayırabileceksin.
- CMD, PowerShell, Bash ve Zsh arasındaki temel farkları anlayabileceksin.
- Current Working Directory kavramını açıklayabileceksin.
- Absolute ve relative path'leri terminalde kullanabileceksin.
- Dosya ve dizinleri terminal üzerinden inceleyebileceksin.
- Dosya oluşturma, okuma, kopyalama ve taşıma işlemlerinin temel mantığını anlayabileceksin.
- Wildcard kavramını tanıyabileceksin.
- Quoting'in neden önemli olduğunu anlayabileceksin.
- Komutların yardım ve dokümantasyon sistemlerini kullanabileceksin.
- Standard Input, Standard Output ve Standard Error kavramlarını temel seviyede anlayabileceksin.
- Pipe ve redirection kullanarak komutları birbirine bağlayabileceksin.
- PowerShell pipeline'ının klasik Unix pipeline'ından önemli bir farkını anlayabileceksin.
- Exit code kavramının ne işe yaradığını açıklayabileceksin.
- Environment variable ve PATH kavramlarını anlayabileceksin.
- Command history'nin kullanım ve adli bilişim açısından önemini anlayabileceksin.
- Kullanıcı, process, network ve sistem bilgilerini terminalden inceleyebileceksin.
- Yönetici/root yetkisinin neden dikkatli kullanılması gerektiğini anlayabileceksin.
- İnternetten alınan komutların neden anlamadan çalıştırılmaması gerektiğini açıklayabileceksin.

> Bu dersin amacı onlarca komutu ezberlemek değildir. Amaç, terminalde nasıl düşünüleceğini öğrenmek ve bilmediğin bir komutu kendi başına araştırabilecek seviyeye gelmektir.

---

# 1. Buraya Nasıl Geldik?

İlk sekiz derste bir bilgisayarın farklı katmanlarını öğrendik.

```text
Bilgisayar
   │
   ├── CPU / RAM / Depolama
   │
   ├── İşletim Sistemi
   │
   ├── Dosya Sistemi
   │
   ├── Process / Thread
   │
   ├── Network
   │
   ├── Protocol
   │
   └── Port / Service
```

Bunları şimdiye kadar çoğunlukla grafik arayüzler ve kavramsal modeller üzerinden inceledik.

Ancak gerçek sistem yönetimi ve siber güvenlik çalışmalarında sıkça:

**Command Line Interface — CLI**

kullanırız.

Örneğin bir analist:

```text
Hangi kullanıcıyla çalışıyorum?

Hangi process'ler çalışıyor?

IP adresim nedir?

Hangi portlar listening?

Bir log dosyasında belirli bir ifade var mı?

Dosyanın hash'i nedir?

Hangi route kullanılıyor?
```

gibi soruların cevaplarını terminal üzerinden hızlıca araştırabilir.

---

# 2. CLI Nedir?

**CLI — Command Line Interface**

kullanıcının metin tabanlı komutlarla bilgisayar veya programla etkileşim kurduğu arayüz yaklaşımıdır.

Grafik arayüzde:

```text
Klasöre çift tıkla
```

yaparken CLI üzerinde:

```text
cd klasor
```

gibi bir komut kullanabilirsin.

Basitleştirilmiş model:

```text
KULLANICI
    │
    ▼
  KOMUT
    │
    ▼
  SHELL
    │
    ▼
İŞLETİM SİSTEMİ / PROGRAM
    │
    ▼
   SONUÇ
```

Ancak:

> CLI, terminal ve shell aynı şey değildir.

Şimdi bunları ayıralım.

---

# 3. Terminal Nedir?

**Terminal**, shell ile etkileşim kurmamızı sağlayan kullanıcı arayüzü/terminal emulator uygulamasıdır.

Örneğin:

```text
Windows Terminal
GNOME Terminal
Konsole
iTerm2
```

gibi uygulamalar terminal görevi görebilir.

Terminal:

- Yazdığın karakterleri shell'e iletir.
- Shell/program çıktısını görüntüler.
- Terminal oturumunu kullanıcıya sunar.

Kavramsal olarak:

```text
KULLANICI
    │
    ▼
 TERMINAL
    │
    ▼
  SHELL
```

---

# 4. Shell Nedir?

**Shell**, kullanıcı komutlarını yorumlayan ve programların çalıştırılmasını sağlayan komut yorumlama ortamıdır.

Yaygın shell örnekleri:

```text
Windows
├── cmd.exe
└── PowerShell

Linux / Unix
├── Bash
├── Zsh
├── Fish
└── Diğer shell'ler
```

Örneğin Windows Terminal içerisinde:

```text
PowerShell
```

çalıştırabilirsin.

Aynı terminal uygulamasında:

```text
Command Prompt
```

veya WSL kuruluysa:

```text
Bash
```

da çalıştırılabilir.

Dolayısıyla:

```text
Windows Terminal ≠ PowerShell
```

Windows Terminal terminal uygulamasıdır.

PowerShell ise shell ve otomasyon ortamıdır.

---

# 5. CMD Nedir?

Windows'un klasik komut yorumlayıcılarından biri:

```text
cmd.exe
```

veya yaygın adıyla:

**Command Prompt / CMD**

dir.

Örneğin:

```cmd
dir
```

dosyaları listeler.

```cmd
ipconfig
```

network yapılandırmasını gösterebilir.

```cmd
tasklist
```

process'leri listeleyebilir.

CMD özellikle:

- Eski Windows araçlarında,
- Batch script'lerinde,
- Sistem yönetiminde,
- Troubleshooting sırasında

karşına çıkabilir.

---

# 6. PowerShell Nedir?

PowerShell bir:

- Command shell,
- Scripting dili,
- Otomasyon platformu

olarak kullanılabilir.

PowerShell komutlarının önemli bir bölümü:

**cmdlet**

olarak adlandırılır.

Örneğin:

```powershell
Get-Process
```

```powershell
Get-ChildItem
```

```powershell
Get-Content
```

```powershell
Get-NetTCPConnection
```

gibi.

PowerShell komut adlarında yaygın olarak:

```text
Verb-Noun
```

yapısı kullanılır.

Örneğin:

```text
Get-Process

Get-Service

New-Item

Remove-Item
```

Bu düzen, bilmediğin komutları keşfetmeyi kolaylaştırır.

---

# 7. PowerShell Neden Siber Güvenlik İçin Önemlidir?

PowerShell özellikle Windows ortamlarında güçlü sistem yönetimi ve otomasyon yetenekleri sunar.

Blue Team çalışanları PowerShell ile:

- Process'leri,
- Servisleri,
- Event Log'ları,
- Dosyaları,
- Network yapılandırmasını,
- Kullanıcı ve sistem bilgilerini

inceleyebilir.

Sistem yöneticileri de yoğun biçimde kullanabilir.

Ancak saldırganlar da meşru sistem araçlarını kötüye kullanabilir.

Bu nedenle:

```text
PowerShell çalıştı
      │
      ≠
      │
Saldırı gerçekleşti
```

Ders 05'te öğrendiğimiz gibi bağlam önemlidir:

```text
Parent process ne?

Command line ne?

Hangi kullanıcı?

Ne yaptı?

Hangi sisteme bağlandı?
```

---

# 8. Bash Nedir?

**Bash — Bourne Again Shell**

Linux ve Unix benzeri sistemlerde yaygın kullanılan shell'lerden biridir.

Örneğin:

```bash
pwd
ls
cd
cat
grep
ps
```

gibi komutlar Bash oturumlarında sıkça kullanılır.

Ancak:

```text
Linux Terminal = Bash
```

demek doğru değildir.

Linux sistemlerde:

- Bash
- Zsh
- Fish
- Dash

gibi farklı shell'ler bulunabilir.

---

# 9. Hangi Shell'i Kullanıyorum?

Bu önemli bir sorudur çünkü aynı görünen komut farklı shell'lerde farklı davranabilir.

PowerShell üzerinde:

```powershell
$PSVersionTable
```

PowerShell bilgilerini gösterebilir.

CMD içerisindeysen prompt ve ortam davranışından bunu anlayabilirsin.

Linux/macOS üzerinde:

```bash
echo $SHELL
```

kullanıcı hesabı için yapılandırılmış shell hakkında bilgi sağlayabilir.

Mevcut process bağlamını anlamak için başka yöntemler de vardır.

Temel prensip:

> **Komut çalıştırmadan önce hangi shell'de olduğunu bil.**

---

# 10. Prompt Nedir?

Terminalde örneğin:

```text
PS C:\Users\Ahmet>
```

veya:

```text
ahmet@linux:~$
```

gibi bir ifade görebilirsin.

Buna:

**prompt**

denir.

Prompt:

- Kullanıcı,
- Host,
- Mevcut dizin,
- Shell

gibi bilgiler gösterebilir.

Ancak prompt tamamen özelleştirilebilir.

Dolayısıyla yalnızca prompt'a bakarak sistem hakkında kesin sonuç çıkarmamalıyız.

---

# 11. Current Working Directory Nedir?

Shell içerisinde komut çalıştırırken bir:

**Current Working Directory — Mevcut Çalışma Dizini**

vardır.

Örneğin:

```text
C:\Users\Ahmet\Documents
```

veya:

```text
/home/ahmet/Documents
```

olabilir.

Relative path'ler bu dizine göre yorumlanır.

Bu nedenle:

> "Şu anda hangi dizindeyim?"

sorusu terminalde çok önemlidir.

---

# 12. Mevcut Dizini Görmek

## PowerShell

```powershell
Get-Location
```

veya:

```powershell
pwd
```

kullanılabilir.

## CMD

```cmd
cd
```

mevcut dizini gösterebilir.

## Linux / macOS

```bash
pwd
```

kullanılır.

`pwd`:

**Print Working Directory**

ifadesiyle ilişkilidir.

---

# 13. Dosyaları ve Dizinleri Listelemek

## PowerShell

```powershell
Get-ChildItem
```

PowerShell ayrıca:

```powershell
ls
```

ve:

```powershell
dir
```

gibi alias'ları destekler.

## CMD

```cmd
dir
```

## Linux / macOS

```bash
ls
```

Daha ayrıntılı bilgi:

```bash
ls -l
```

Gizli dosyaları da görmek için tipik olarak:

```bash
ls -la
```

kullanılabilir.

---

# 14. PowerShell Alias Konusunda Dikkat

PowerShell'de:

```powershell
ls
```

yazdığında bu Unix/Linux `ls` programının kendisi olmak zorunda değildir.

PowerShell'de:

```text
ls
```

`Get-ChildItem` için bir alias olabilir.

Bunu kontrol etmek için:

```powershell
Get-Alias ls
```

kullanabilirsin.

Bu önemli çünkü:

```text
PowerShell ls
```

ile:

```text
GNU/Linux ls
```

aynı isimle çağrılsa bile aynı implementasyon değildir ve parametreleri aynı olmak zorunda değildir.

---

# 15. Dizin Değiştirmek

Bir dizine geçmek için çoğu shell'de:

```text
cd
```

kullanılır.

Örneğin:

```bash
cd Documents
```

Bir üst dizine:

```bash
cd ..
```

ile çıkabilirsin.

Ders 04'ten hatırla:

```text
.  → Mevcut dizin

.. → Parent dizin
```

Linux/Unix shell'lerde:

```bash
cd ~
```

kullanıcının home dizinine geçebilir.

PowerShell'de de `~` home konumuyla ilişkili kullanılabilir.

---

# 16. Absolute ve Relative Path

Ders 04'te gördüğümüz kavramları şimdi terminalde uygulayalım.

Windows absolute path:

```text
C:\Users\Ahmet\Documents\report.txt
```

Linux absolute path:

```text
/home/ahmet/Documents/report.txt
```

Relative path:

```text
Documents/report.txt
```

veya platforma göre:

```text
Documents\report.txt
```

olabilir.

Relative path current working directory'ye göre yorumlanır.

---

# 17. Dosya veya Dizin Adında Boşluk Varsa?

Şöyle bir dizin düşün:

```text
Cyber Security Notes
```

Şunu yazarsan:

```bash
cd Cyber Security Notes
```

shell bunu birden fazla argument olarak yorumlayabilir.

Bu nedenle quoting kullanılabilir.

Örneğin:

```bash
cd "Cyber Security Notes"
```

PowerShell'de de:

```powershell
Set-Location "Cyber Security Notes"
```

kullanılabilir.

Bu bizi önemli bir kavrama getirir:

**Quoting**

---

# 18. Quoting Nedir?

Shell, boşluk ve bazı özel karakterlere özel anlam yükleyebilir.

Tırnak işaretleri metnin nasıl yorumlanacağını kontrol etmeye yardımcı olur.

Örneğin:

```text
"My Documents"
```

tek bir argument olarak değerlendirilebilir.

Ancak:

```text
" "
```

ve:

```text
' '
```

farklı shell'lerde farklı davranışlara sahip olabilir.

Özellikle Bash ve PowerShell'de:

- Variable expansion
- Escape karakterleri
- Command substitution

gibi konularda farklılıklar vardır.

> İnternette gördüğün bir Bash komutunu PowerShell'e birebir yapıştırıp aynı davranışı bekleme.

---

# 19. Tab Completion

Terminalde uzun dosya ve komut adlarını sürekli elle yazmak gerekmez.

Birçok shell:

**Tab Completion**

özelliğine sahiptir.

Örneğin:

```text
cybersecurity-training-materials
```

isimli dizin varsa:

```text
cyb<TAB>
```

ile tamamlanabilir.

Tab completion:

- Yazım hatalarını azaltır.
- Hız kazandırır.
- Komut/parametre keşfine yardımcı olabilir.

Özellikle path yazarken çok kullanışlıdır.

---

# 20. Wildcard Nedir?

Birden fazla dosyayı pattern üzerinden eşleştirmek için:

**wildcard**

kullanılabilir.

En yaygın karakterlerden biri:

```text
*
```

Örneğin:

```text
*.log
```

genellikle `.log` ile eşleşen dosyaları ifade eden bir pattern olabilir.

Linux shell'de:

```bash
ls *.log
```

PowerShell'de:

```powershell
Get-ChildItem *.log
```

kullanılabilir.

Ancak wildcard expansion davranışı shell ve komuta göre farklılık gösterebilir.

---

# 21. Wildcard Kullanırken Neden Dikkat Etmeliyiz?

Şu komut:

```text
Bir dosyayı sil
```

ile:

```text
Bir pattern'e uyan bütün dosyaları sil
```

aynı riskte değildir.

Örneğin:

```text
*.log
```

çok sayıda dosyayla eşleşebilir.

Bu nedenle özellikle:

- Delete
- Move
- Permission change

gibi işlemlerde wildcard kullanmadan önce hangi dosyaların eşleşeceğini kontrol et.

Güvenli yaklaşım:

```text
ÖNCE LİSTELE
      │
      ▼
SONUCU DOĞRULA
      │
      ▼
SONRA DEĞİŞİKLİK YAP
```

---

# 22. Dizin Oluşturmak

Yeni bir dizin oluşturmak için:

```text
mkdir
```

birçok ortamda kullanılabilir.

Örneğin:

```bash
mkdir ag-cyber-lab
```

PowerShell'de daha açık biçimde:

```powershell
New-Item -ItemType Directory -Name "ag-cyber-lab"
```

kullanılabilir.

CMD:

```cmd
mkdir ag-cyber-lab
```

---

# 23. Dosya Oluşturmak

PowerShell:

```powershell
New-Item -ItemType File -Name "test.txt"
```

Linux/macOS:

```bash
touch test.txt
```

kullanılabilir.

Ancak önemli bir teknik ayrım:

> `touch` temel olarak "dosya oluşturma komutu" değildir.

`touch` mevcut dosyanın timestamp bilgilerini güncelleyebilir.

Dosya mevcut değilse genellikle boş bir dosya oluşturur.

Bu ayrıntı ileride DFIR açısından önemlidir.

---

# 24. Dosyaya Veri Yazmak

PowerShell:

```powershell
"AG Cyber Lab" | Set-Content test.txt
```

Bash:

```bash
echo "AG Cyber Lab" > test.txt
```

Bu komutlar dosyaya veri yazabilir.

Ancak:

```text
>
```

operatörü mevcut içeriğin üzerine yazabilir.

Bu yüzden redirection kullanırken dikkatli olmak gerekir.

Birazdan `>` ve `>>` arasındaki farkı inceleyeceğiz.

---

# 25. Dosya İçeriğini Görmek

PowerShell:

```powershell
Get-Content test.txt
```

CMD:

```cmd
type test.txt
```

Linux/macOS:

```bash
cat test.txt
```

Metin dosyalarını terminalde görüntülemek:

- Log analizi
- Configuration inceleme
- Script inceleme

sırasında çok kullanışlıdır.

---

# 26. Büyük Dosyaları Nasıl İnceleriz?

Çok büyük bir log dosyasını tamamen terminale basmak pratik olmayabilir.

Linux/macOS üzerinde:

```bash
less file.log
```

kullanılabilir.

İlk satırları görmek için:

```bash
head file.log
```

son satırlar için:

```bash
tail file.log
```

Örneğin:

```bash
tail -n 20 file.log
```

son 20 satırı gösterebilir.

PowerShell'de:

```powershell
Get-Content file.log -Tail 20
```

kullanılabilir.

Bu tür araçlar log analizinde çok değerlidir.

---

# 27. Dosya Kopyalamak

## PowerShell

```powershell
Copy-Item source.txt copy.txt
```

## CMD

```cmd
copy source.txt copy.txt
```

## Linux/macOS

```bash
cp source.txt copy.txt
```

Kopyalama işlemi:

```text
SOURCE
   │
   ▼
COPY
   │
   ▼
DESTINATION
```

mantığını kullanır.

Hedef path'i her zaman kontrol et.

---

# 28. Dosya Taşımak veya Yeniden Adlandırmak

PowerShell:

```powershell
Move-Item old.txt new.txt
```

Linux/macOS:

```bash
mv old.txt new.txt
```

CMD:

```cmd
move old.txt new.txt
```

Aynı komut ailesi dosyayı başka dizine taşımak için de kullanılabilir.

Bu nedenle:

> Destination path

özellikle önemlidir.

---

# 29. Dosya Silmek

PowerShell:

```powershell
Remove-Item test.txt
```

Linux/macOS:

```bash
rm test.txt
```

CMD:

```cmd
del test.txt
```

Silme komutları terminalde dikkatle kullanılmalıdır.

Bazı terminal silme işlemleri grafik arayüzdeki:

```text
Recycle Bin / Trash
```

mekanizmasını kullanmadan doğrudan dosya sistemi işlemi gerçekleştirebilir.

Bu davranış kullandığın araç ve platforma bağlıdır.

---

# 30. Güvenli Silme Alışkanlığı

Silme işleminden önce:

```text
1. pwd / Get-Location

2. ls / dir

3. Hedefi doğrula

4. Komutu tekrar oku

5. Sonra çalıştır
```

alışkanlığı edin.

Özellikle recursive silme:

```text
Bir dizinin tamamını ve altındakileri sil
```

gibi işlemler ciddi sonuçlara yol açabilir.

Bu derste recursive silme komutlarını ezberlemen gerekmiyor.

> **Hızdan önce doğruluk.**

---

# 31. Komut Yapısı

Bir komut çoğunlukla:

```text
COMMAND + OPTIONS + ARGUMENTS
```

yapısıyla düşünülebilir.

Örneğin:

```bash
ls -l /tmp
```

burada:

```text
ls   → Command

-l   → Option

/tmp → Argument
```

PowerShell:

```powershell
Get-Process -Name explorer
```

burada:

```text
Get-Process → Cmdlet

-Name       → Parameter

explorer    → Argument/Value
```

Terminoloji araca göre farklılaşabilir.

---

# 32. Yardım Sistemlerini Kullanmak

Profesyonel terminal kullanımı:

> Bütün komutları ezberlemek

anlamına gelmez.

Asıl beceri:

> Bilmediğin komutun kullanımını hızlı şekilde öğrenebilmektir.

---

# 33. PowerShell Yardımı

PowerShell:

```powershell
Get-Help Get-Process
```

Daha ayrıntılı:

```powershell
Get-Help Get-Process -Full
```

Örnekler:

```powershell
Get-Help Get-Process -Examples
```

Ayrıca:

```powershell
Get-Command
```

komut keşfi için kullanılabilir.

Örneğin:

```powershell
Get-Command *Process*
```

process ile ilişkili komutları bulmaya yardımcı olabilir.

---

# 34. Linux / Unix Yardımı

Birçok komutta:

```bash
command --help
```

kullanılabilir.

Örneğin:

```bash
ls --help
```

Sistem manual sayfaları için:

```bash
man ls
```

kullanılabilir.

`man` içerisinden çıkmak için genellikle:

```text
q
```

tuşuna basabilirsin.

> Her program `--help` seçeneğini desteklemek zorunda değildir.

---

# 35. CMD Yardımı

CMD içerisinde:

```cmd
help
```

kullanılabilir.

Belirli bazı komutlarda:

```cmd
dir /?
```

gibi yardım seçenekleri bulunur.

Yani yardım biçimi kullandığın shell ve programa göre değişebilir.

---

# 36. Standard Input, Output ve Error

Unix tarzı sistemlerde programlar için üç temel standart I/O akışı bulunur:

```text
STDIN  → Standard Input

STDOUT → Standard Output

STDERR → Standard Error
```

Tipik file descriptor numaraları:

```text
0 → stdin

1 → stdout

2 → stderr
```

Ders 05'te file descriptor kavramına giriş yapmıştık.

Şimdi gerçek kullanımını görüyoruz.

---

# 37. Standard Input — stdin

Programın girdi aldığı standart akıştır.

Genellikle terminalde klavyeden yazdığın veri olabilir.

Kavramsal olarak:

```text
KLAVYE
   │
   ▼
 STDIN
   │
   ▼
PROGRAM
```

Ancak stdin başka bir kaynaktan da yönlendirilebilir.

---

# 38. Standard Output — stdout

Programın normal çıktısını gönderdiği akıştır.

Kavramsal olarak:

```text
PROGRAM
   │
   ▼
STDOUT
   │
   ▼
TERMINAL
```

Örneğin:

```bash
echo "Hello"
```

çıktısını stdout üzerinden yazabilir.

---

# 39. Standard Error — stderr

Hata veya diagnostic mesajları için ayrı bir standart akıştır.

```text
PROGRAM
   │
   ├── stdout → Normal çıktı
   │
   └── stderr → Hata/diagnostic çıktı
```

Bu ayrım otomasyon sırasında çok değerlidir.

Çünkü:

> Normal sonuçlar ile hata mesajlarını ayrı yönetebilirsin.

---

# 40. Redirection Nedir?

Bir komutun çıktısını terminal yerine başka bir yere yönlendirmeye:

**redirection**

denir.

Bash benzeri shell'lerde:

```bash
echo "Hello" > output.txt
```

stdout'u dosyaya yönlendirebilir.

Kavramsal olarak:

```text
COMMAND
   │
   ▼
STDOUT
   │
   X Terminal
   │
   ▼
FILE
```

---

# 41. `>` ile `>>` Farkı

Bu ayrım çok önemlidir.

```text
>
```

genellikle hedef dosyanın içeriğini overwrite ederek çıktı yazar.

```text
>>
```

ise çıktıyı mevcut dosyanın sonuna ekler.

Örneğin:

```bash
echo "Line 1" > notes.txt
```

ardından:

```bash
echo "Line 2" >> notes.txt
```

dosya:

```text
Line 1
Line 2
```

içerebilir.

> `>` kullanırken mevcut dosyanın üzerine yazabileceğini unutma.

---

# 42. PowerShell'de Redirection

PowerShell de:

```powershell
"Hello" > output.txt
```

gibi redirection destekler.

Ancak PowerShell'in stream modeli klasik Unix modelinden daha kapsamlıdır.

Ayrıca dosya işlemlerinde açık PowerShell cmdlet'leri de kullanılabilir:

```powershell
Set-Content
Add-Content
Out-File
```

Örneğin:

```powershell
"Line 1" | Set-Content notes.txt
```

ve:

```powershell
"Line 2" | Add-Content notes.txt
```

kullanılabilir.

---

# 43. Pipe Nedir?

**Pipe**, bir komutun çıktısını başka bir komutun girdisine bağlamaya yarar.

Sembol:

```text
|
```

Kavramsal olarak:

```text
COMMAND A
    │
    │ Output
    ▼
   PIPE
    │
    ▼
COMMAND B
```

Bu, terminal kullanımının en güçlü fikirlerinden biridir.

---

# 44. Unix Tarzı Pipe Örneği

Örneğin:

```bash
ps aux | grep ssh
```

kavramsal olarak:

```text
ps aux
   │
   │ Text output
   ▼
 grep ssh
   │
   ▼
ssh içeren satırlar
```

şeklinde düşünülebilir.

Bu, process listesinden belirli ifadeleri filtrelemek için kullanılabilir.

Ancak kendi `grep` process'inin de eşleşebileceği gibi ayrıntılar vardır.

---

# 45. PowerShell Pipeline Neden Farklıdır?

PowerShell'in en önemli özelliklerinden biri pipeline üzerinden çoğunlukla yalnızca düz text değil:

**.NET objects**

aktarabilmesidir.

Örneğin:

```powershell
Get-Process | Where-Object CPU -gt 10
```

burada `Get-Process` çıktısını text satırları olarak parse etmek yerine process object'lerinin özellikleri üzerinden filtreleme yapılabilir.

Kavramsal olarak:

```text
Get-Process
     │
     ▼
PROCESS OBJECTS
     │
     ▼
Where-Object
     │
     ▼
FILTERED OBJECTS
```

Bu PowerShell'in sistem yönetiminde güçlü olmasının önemli nedenlerinden biridir.

---

# 46. PowerShell Object Nedir?

Örneğin:

```powershell
Get-Process
```

çıktısı ekranda tablo gibi görünse de arka planda process object'leri olabilir.

Bir object'in özelliklerini görmek için:

```powershell
Get-Process | Get-Member
```

kullanabilirsin.

Belirli alanları seçmek için:

```powershell
Get-Process |
Select-Object ProcessName, Id, CPU
```

Bu yaklaşım siber güvenlik otomasyonunda çok değerlidir.

---

# 47. Text Aramak

Log ve çıktı analizinde en sık yaptığımız işlemlerden biri:

> Belirli bir ifadeyi bulmak

tır.

Linux/macOS:

```bash
grep "error" application.log
```

PowerShell:

```powershell
Select-String "error" application.log
```

Windows CMD:

```cmd
findstr "error" application.log
```

kullanılabilir.

Bu üç araç aynı implementasyon değildir ancak temel amaçları metin arama konusunda benzerdir.

---

# 48. Birden Fazla Komutu Birleştirmek

Örneğin Linux'ta:

```bash
ps aux | grep ssh
```

veya:

```bash
cat application.log | grep error
```

gibi kullanım görebilirsin.

Ancak ikinci örnekte birçok durumda daha basit:

```bash
grep error application.log
```

yeterlidir.

Komut satırında yalnızca:

> Çalışıyor mu?

değil:

> Daha açık ve doğru nasıl yazabilirim?

sorusunu da sormak iyi bir alışkanlıktır.

---

# 49. Exit Code Nedir?

Ders 05'te process'lerin:

**exit code**

döndürebildiğini öğrenmiştik.

Komut satırında bu bilgi özellikle script ve otomasyon için önemlidir.

Unix/Linux geleneğinde genellikle:

```text
0 → Başarı

0 dışı → Hata veya farklı durum
```

anlamına gelir.

Ancak exact anlam programa bağlıdır.

---

# 50. Linux'ta Exit Code

Bir komut çalıştır:

```bash
ls
```

Ardından:

```bash
echo $?
```

çalıştır.

Bu, son pipeline/komutla ilişkili exit status değerini gösterebilir.

Örneğin:

```text
0
```

görebilirsin.

Var olmayan bir path üzerinde:

```bash
ls /this-path-does-not-exist
```

çalıştırıp ardından:

```bash
echo $?
```

ile farklı bir değer gözlemleyebilirsin.

---

# 51. PowerShell'de Exit Durumu

PowerShell'in hata/başarı modeli Unix shell'lerinden farklı ayrıntılara sahiptir.

Native executable'ların exit code'u için:

```powershell
$LASTEXITCODE
```

kullanılabilir.

PowerShell işlemlerinin son başarılı durumuyla ilişkili:

```powershell
$?
```

değeri de bulunur.

Ancak:

```text
$?
```

ile:

```text
$LASTEXITCODE
```

aynı şey değildir.

Bu ayrımı ilerleyen PowerShell derslerinde daha ayrıntılı inceleyeceğiz.

---

# 52. Environment Variable Nedir?

Ders 05'te process environment kavramına giriş yapmıştık.

**Environment Variable**, process'lerin çalışma ortamına ilişkin key-value biçimindeki bilgileri taşıyabilen değişkenlerdir.

Örneğin:

```text
PATH
HOME
TEMP
USERPROFILE
```

gibi.

---

# 53. Environment Variable Görüntüleme

## PowerShell

```powershell
Get-ChildItem Env:
```

Belirli bir değer:

```powershell
$env:PATH
```

## CMD

```cmd
set
```

Belirli değer:

```cmd
echo %PATH%
```

## Bash / Zsh

```bash
env
```

Belirli değer:

```bash
echo $PATH
```

Environment variable isimleri ve davranışları platforma göre değişebilir.

---

# 54. PATH Nedir?

Shell'e:

```text
python
```

veya:

```text
ssh
```

gibi bir komut yazdığında shell/program başlatma mekanizması çalıştırılabilir dosyanın nerede bulunduğunu bulmak zorundadır.

Burada:

**PATH**

environment variable'ı önemli rol oynar.

Kavramsal olarak:

```text
Kullanıcı:
"python"
    │
    ▼
Shell
    │
    ▼
PATH içerisindeki dizinleri araştır
    │
    ▼
Executable bulundu
    │
    ▼
Process oluştur
```

PATH bir executable'ın bütün disk üzerinde rastgele aranması anlamına gelmez.

Belirli dizinlerin sıralı listesi kullanılır.

---

# 55. PATH Neden Güvenlik İçin Önemlidir?

Bir process hangi executable'ın çalıştırılacağını yanlış veya güvensiz bir search path üzerinden belirlerse güvenlik problemleri oluşabilir.

Örneğin saldırganın yazabildiği bir dizin PATH'in güvenli olmayan bir noktasında bulunuyorsa bazı yanlış yapılandırma senaryoları risk oluşturabilir.

Şu anda privilege escalation tekniğine girmiyoruz.

Temel fikir:

> **Bir komut adı yazıldığında hangi executable'ın gerçekten çalıştırıldığını bilmek önemlidir.**

---

# 56. Bir Komutun Nereden Geldiğini Bulmak

PowerShell:

```powershell
Get-Command python
```

veya:

```powershell
Get-Command ssh
```

kullanılabilir.

Linux/macOS shell'lerde:

```bash
command -v python3
```

ve:

```bash
command -v ssh
```

kullanılabilir.

Bazı sistemlerde:

```bash
which
```

aracı da görülebilir.

Ancak shell built-in, alias ve function'ları değerlendirirken `command -v` çoğu shell kullanımında daha anlamlı olabilir.

---

# 57. Command History Nedir?

Shell'ler geçmişte çalıştırılan komutların bazılarını oturumda veya kalıcı history dosyalarında tutabilir.

PowerShell:

```powershell
Get-History
```

mevcut session history'sini gösterebilir.

Bash:

```bash
history
```

kullanılabilir.

Ancak:

> Her çalıştırılan komut mutlaka history'de sonsuza kadar bulunur.

demek doğru değildir.

---

# 58. History Neden Kusursuz Kanıt Değildir?

Command history:

- Silinebilir.
- Devre dışı bırakılabilir.
- Farklı shell'lerde farklı tutulabilir.
- Session kapanışına bağlı yazılabilir.
- Boyut sınırına sahip olabilir.
- Birden fazla session tarafından etkilenebilir.
- Bazı komutlar kaydedilmeyebilir.

Dolayısıyla DFIR açısından:

```text
History'de komut yok
       │
       ≠
       │
Komut kesinlikle çalıştırılmadı
```

Aynı şekilde history'deki bir satırın bağlamı da ayrıca doğrulanmalıdır.

---

# 59. History'de Hassas Veri Riski

Komut satırına:

```text
password
token
API key
secret
```

gibi hassas bilgileri doğrudan argument olarak yazmak bazı durumlarda riskli olabilir.

Bu bilgiler:

- Shell history,
- Process command line,
- Log,
- Monitoring/EDR telemetry

gibi yerlerde görünebilir.

Bu nedenle:

> Parola ve secret'ları komut satırında açık şekilde kullanmanın iz bırakabileceğini bilmelisin.

Güvenli yöntem kullanılan araç ve sisteme göre değişir.

---

# 60. `whoami` — Ben Kimim?

Windows, Linux ve macOS sistemlerde:

```bash
whoami
```

mevcut kullanıcı kimliği hakkında bilgi verir.

Bu basit komut güvenlik açısından çok değerlidir.

Çünkü her işlemde şu soruyu bilmek isteriz:

> **Bu komutu hangi kullanıcı bağlamında çalıştırıyorum?**

---

# 61. Yetki ile Kimlik Aynı Şey Mi?

Hayır.

Kullanıcı adını bilmek bütün izinlerini bildiğimiz anlamına gelmez.

Bir kullanıcı:

- Farklı grupların üyesi olabilir.
- Belirli privilege'lara sahip olabilir.
- `sudo` hakkına sahip olabilir.
- Windows security token içerisinde farklı yetkilere sahip olabilir.

Bu yüzden:

```text
WHO AM I?
```

sorusundan sonra:

```text
WHAT AM I ALLOWED TO DO?
```

sorusu gelir.

Bu konuyu ilerleyen sistem güvenliği derslerinde detaylandıracağız.

---

# 62. Windows Kullanıcı / Grup Bilgisi

Windows üzerinde:

```cmd
whoami
```

kullanıcıyı gösterir.

Grupları görmek için:

```cmd
whoami /groups
```

kullanılabilir.

Privilege bilgileri için:

```cmd
whoami /priv
```

kullanılabilir.

Çıktıyı şu anda tamamen anlaman gerekmiyor.

Ama kullanıcı kimliği ile yetkilerin ayrı kavramlar olduğunu gözlemle.

---

# 63. Linux Kullanıcı Bilgisi

Linux üzerinde:

```bash
whoami
```

mevcut efektif kullanıcı adını gösterir.

Daha ayrıntılı kimlik bilgisi için:

```bash
id
```

kullanılabilir.

Örnek:

```text
uid=1000(ahmet)
gid=1000(ahmet)
groups=...
```

Burada:

```text
UID
GID
Groups
```

gibi kavramlarla karşılaşırsın.

Bunları Linux güvenliği derslerinde ayrıntılı inceleyeceğiz.

---

# 64. Process'leri Terminalden İncelemek

Ders 05'te process kavramını öğrendik.

Şimdi terminal üzerinden inceleyelim.

## PowerShell

```powershell
Get-Process
```

Belirli process:

```powershell
Get-Process -Name explorer
```

PID üzerinden:

```powershell
Get-Process -Id 4216
```

---

# 65. CMD Process Bilgisi

CMD:

```cmd
tasklist
```

process listesini gösterebilir.

Belirli bir PID'yi filtrelemek için araç parametreleri kullanılabilir.

Yardım:

```cmd
tasklist /?
```

Bu noktada amacımız bütün parametreleri ezberlemek değil.

> Yardım sistemini kullanarak kendin bulabilmek.

---

# 66. Linux Process Bilgisi

Linux:

```bash
ps aux
```

process'ler hakkında bilgi sağlayabilir.

Canlı gözlem:

```bash
top
```

Bazı sistemlerde:

```bash
htop
```

bulunabilir.

Process tree:

```bash
pstree
```

uygun sistemlerde kullanılabilir.

Ders 05'te öğrendiğin:

```text
PID
Parent
User
CPU
Memory
```

alanlarını bulmaya çalış.

---

# 67. Sistem Bilgisi Toplamak

Bir olay sırasında ilk sorulardan biri:

> **Hangi sistem üzerinde çalışıyorum?**

olabilir.

Windows:

```cmd
systeminfo
```

çok sayıda sistem bilgisi sağlayabilir.

PowerShell'de ayrıca:

```powershell
Get-ComputerInfo
```

kullanılabilir.

Çıktı oldukça uzun olabilir.

---

# 68. Linux Sistem Bilgisi

Kernel bilgisi:

```bash
uname -a
```

Dağıtım bilgisi:

```bash
cat /etc/os-release
```

CPU:

```bash
lscpu
```

Bellek:

```bash
free -h
```

Depolama:

```bash
lsblk
```

Bu komutların hepsi her Unix-benzeri işletim sisteminde bulunmak zorunda değildir.

---

# 69. Network Bilgisini Terminalden İncelemek

## Windows

```cmd
ipconfig
```

Daha ayrıntılı:

```cmd
ipconfig /all
```

Routing:

```cmd
route print
```

Neighbor bilgileri:

```cmd
arp -a
```

veya PowerShell:

```powershell
Get-NetNeighbor
```

---

# 70. Linux Network Bilgisi

Interface ve IP:

```bash
ip addr
```

Routing:

```bash
ip route
```

Neighbor:

```bash
ip neigh
```

Bu komutlarla Ders 06'daki:

```text
IP
Subnet
Gateway
Routing
ARP/Neighbor
```

kavramlarını terminalde gözlemleyebilirsin.

---

# 71. DNS Sorgusu

Bir domain'in DNS bilgilerini incelemek için:

```bash
nslookup example.com
```

birçok sistemde kullanılabilir.

PowerShell:

```powershell
Resolve-DnsName example.com
```

Linux/macOS'ta `dig` kuruluysa:

```bash
dig example.com
```

kullanılabilir.

Bunların çıktıları ve özellikleri aynı değildir.

---

# 72. Network Connection'ları İncelemek

Windows:

```cmd
netstat -ano
```

PowerShell:

```powershell
Get-NetTCPConnection
```

Linux:

```bash
ss -tun
```

Listening TCP ve UDP socket'leri:

```bash
ss -tuln
```

Process bilgileri uygun yetkiyle:

```bash
ss -tulnp
```

gibi incelenebilir.

---

# 73. Process → Port İlişkisini Terminalden Kurmak

Ders 08'de yaptığımız bağlantıyı hatırla:

```text
PORT
 │
 ▼
PID
 │
 ▼
PROCESS
```

Windows:

```cmd
netstat -ano
```

çıktısından PID al.

Sonra:

```powershell
Get-Process -Id <PID>
```

kullan.

Bu bize örneğin:

```text
TCP 443
  │
  ▼
PID 4216
  │
  ▼
Process X
```

ilişkisini kurmaya yardımcı olabilir.

---

# 74. Dosya Hash'i Terminalden Hesaplamak

Ders 04'te hash kavramını öğrendik.

PowerShell:

```powershell
Get-FileHash test.txt -Algorithm SHA256
```

Linux:

```bash
sha256sum test.txt
```

macOS:

```bash
shasum -a 256 test.txt
```

Bu bize modülün farklı derslerini tek terminal oturumunda birleştirebildiğimizi gösterir.

---

# 75. Basit Bir Analist Akışı

Şüpheli bir dosya bulunduğunu düşün.

Analist terminalden şu sorulara cevap arayabilir:

```text
Dosya nerede?

Hash'i ne?

Dosya metadata'sı ne?

İlişkili process var mı?

Process hangi kullanıcı altında?

Network bağlantısı var mı?

Hangi remote endpoint'e bağlanıyor?
```

Kavramsal akış:

```text
FILE
 │
 ▼
HASH
 │
 ▼
PROCESS
 │
 ▼
PID
 │
 ▼
SOCKET
 │
 ▼
REMOTE IP : PORT
```

Terminal bu bilgilerin bazılarını hızlı biçimde toplamak için çok değerlidir.

---

# 76. Administrator ve root

Bazı işlemler daha yüksek yetki gerektirir.

Windows üzerinde:

```text
Administrator / Elevated Process
```

Linux/Unix dünyasında:

```text
root
```

yüksek ayrıcalıklı bağlamlarla ilişkilidir.

Ancak:

> Terminal kullanmak için her zaman Administrator/root olmak gerekmez.

Hatta güvenlik açısından mümkün olduğunda standart kullanıcı bağlamında çalışmak tercih edilir.

---

# 77. `sudo` Nedir?

Linux/Unix benzeri sistemlerde:

```bash
sudo
```

uygun yapılandırmada yetkili bir kullanıcının belirli komutları başka bir kullanıcı, çoğunlukla root yetkisiyle çalıştırmasına olanak verebilir.

Örneğin:

```text
Normal User
    │
    ▼
sudo
    │
    ▼
Yetkilendirme kontrolü
    │
    ▼
Belirli komut yüksek yetkiyle çalışır
```

`sudo`:

> "Beni root kullanıcısına dönüştüren sihirli komut"

olarak düşünülmemelidir.

Davranışı sistem yapılandırmasına ve sudo politikasına bağlıdır.

---

# 78. Least Privilege Terminalde Nasıl Görünür?

Ders 03'te:

**Least Privilege**

prensibini öğrenmiştik.

Terminal kullanımında bunun anlamı:

```text
Normal işlem
      │
      ▼
Normal kullanıcı

Yüksek yetki gerçekten gerekiyor
      │
      ▼
Kontrollü privilege elevation
```

şeklinde düşünülebilir.

Bütün terminal oturumunu gereksiz yere yüksek yetkiyle çalıştırmak hata etkisini artırabilir.

---

# 79. İnternetten Komut Kopyalamak

Bir forumda veya videoda şu tarz bir komut gördüğünü düşün:

```text
curl ... | shell
```

veya:

```text
download something
      │
      ▼
immediately execute it
```

Bu tür zincirlerde uzaktan alınan içerik doğrudan çalıştırılabilir.

Kaynağa güvenmiyorsan ciddi risk oluşturabilir.

Temel prensip:

```text
İNDİR
  │
  ▼
İNCELE
  │
  ▼
KAYNAĞI DOĞRULA
  │
  ▼
NE YAPTIĞINI ANLA
  │
  ▼
GEREKİYORSA ÇALIŞTIR
```

> **Anlamadığın bir komuta yüksek yetki verme.**

---

# 80. Terminal Komutları İz Bırakabilir

Terminal:

> "Gizli çalışma alanı"

değildir.

Komutlar ve davranışlar farklı yerlerde iz bırakabilir.

Örneğin:

- Shell history
- Process command line
- Windows Event Logs
- PowerShell logging
- Audit logs
- EDR telemetry
- File system artifacts
- Network logs

gibi veri kaynaklarında aktiviteler görülebilir.

Bu durum DFIR için çok değerlidir.

---

# 81. Komut Çıktısı Kanıt Mıdır?

Bir terminal çıktısı değerli bilgi sağlayabilir.

Ancak profesyonel olay müdahalesinde:

- Komutun ne zaman çalıştırıldığı,
- Kim tarafından çalıştırıldığı,
- Çıktının nasıl toplandığı,
- Sistem üzerinde ne etkisi olduğu,
- Çıktının nasıl saklandığı

önemlidir.

Çünkü canlı sistem üzerinde çalıştırılan komutların kendisi de sistem durumunu bir miktar değiştirebilir.

Bu bizi ileride:

**Live Response**

ve:

**Order of Volatility**

konularına götürecek.

---

# 82. Bir Güvenlik Analisti Gibi Düşün

Bir kullanıcı:

> "Bilgisayarımda bir şey internete bağlanıyor."

diyor.

Terminalden yalnızca:

```text
netstat
```

çalıştırıp sonuç çıkarmak yerine sistematik düşün.

Sorular:

```text
Ben hangi kullanıcıyım?

Hangi işletim sistemi?

Hangi process'ler çalışıyor?

Hangi network connection'lar var?

Hangi PID bağlantıyla ilişkili?

Process'in executable path'i ne?

Dosyanın hash'i ne?

Remote IP nedir?

Remote port nedir?

DNS ilişkisi var mı?

Bu davranış normal baseline'a uyuyor mu?
```

Bu artık basit komut kullanımı değil:

**analiz metodolojisidir.**

---

# 🧪 Uygulama 09 — Terminal Laboratuvarı

Bu uygulamada yalnızca kendi bilgisayarında çalış.

Kritik sistem dosyalarını değiştirme.

Çalışma boyunca mümkün olduğunca standart kullanıcı yetkisi kullan.

---

## Görev 1 — Terminal ve Shell'i Tanımla

Şunları doldur:

```text
Terminal Uygulamam:

____________________________________

Shell'im:

____________________________________

İşletim Sistemim:

____________________________________
```

Windows Terminal kullanıyorsan:

> Terminal uygulamasının Windows Terminal, shell'in ise PowerShell veya CMD olabileceğini unutma.

---

# 🧪 Görev 2 — Kimlik ve Konum

Çalıştır:

```bash
whoami
```

Ardından mevcut dizini görüntüle.

PowerShell/Linux:

```text
pwd
```

CMD:

```text
cd
```

Sonuç:

```text
Kullanıcı:

____________________________________

Current Working Directory:

____________________________________
```

---

# 🧪 Görev 3 — Güvenli Lab Dizini Oluştur

Kendi Documents/Belgeler dizinin içinde:

```text
ag-cli-lab
```

isimli bir dizin oluştur.

Örneğin:

```text
Documents
└── ag-cli-lab
```

Bu dersteki bütün dosya değiştirme işlemlerini yalnızca bu dizin içerisinde yap.

Önce:

```text
pwd / Get-Location
```

ile doğru yerde olduğunu kontrol et.

---

# 🧪 Görev 4 — Test Dosyaları Oluştur

Lab dizini içerisinde:

```text
notes.txt
```

ve:

```text
application.log
```

oluştur.

PowerShell örneği:

```powershell
New-Item notes.txt
New-Item application.log
```

Linux/macOS:

```bash
touch notes.txt application.log
```

Dosyaları listele ve gerçekten lab dizininde olduklarını doğrula.

---

# 🧪 Görev 5 — Dosyaya Veri Yaz

PowerShell:

```powershell
"AG Cyber Lab" | Set-Content notes.txt
```

Linux/macOS:

```bash
echo "AG Cyber Lab" > notes.txt
```

İçeriği oku:

PowerShell:

```powershell
Get-Content notes.txt
```

Linux/macOS:

```bash
cat notes.txt
```

---

# 🧪 Görev 6 — Append İşlemini Gözlemle

Dosyanın sonuna yeni satır ekle.

PowerShell:

```powershell
"Command Line Basics" | Add-Content notes.txt
```

Linux/macOS:

```bash
echo "Command Line Basics" >> notes.txt
```

Sonra içeriği tekrar görüntüle.

Şu soruyu cevapla:

> `>` ile `>>` arasındaki temel fark nedir?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 7 — Pipe Kullan

PowerShell:

```powershell
Get-Process |
Select-Object ProcessName, Id |
Select-Object -First 10
```

Linux:

```bash
ps aux | head
```

çıktısını incele.

Şimdi şu soruya cevap ver:

> Pipe ne yaptı?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 8 — Metin Filtreleme

`application.log` içerisine şu satırları ekle:

```text
INFO Application started
INFO User logged in
ERROR Connection failed
INFO Retry started
ERROR Authentication failed
```

PowerShell:

```powershell
Select-String "ERROR" application.log
```

Linux/macOS:

```bash
grep "ERROR" application.log
```

kullan.

Kaç ERROR satırı buldun?

```text
____________________________________
```

Bu küçük örnek ileride yapacağımız log analysis çalışmalarının temelidir.

---

# 🧪 Görev 9 — Environment Variable'ları İncele

PowerShell:

```powershell
$env:PATH
```

CMD:

```cmd
echo %PATH%
```

Linux/macOS:

```bash
echo $PATH
```

çıktısını incele.

Şu soruyu cevapla:

> PATH neden birden fazla dizin içeriyor?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 10 — Bir Komutun Konumunu Bul

PowerShell:

```powershell
Get-Command ssh
```

Linux/macOS:

```bash
command -v ssh
```

SSH kuruluysa executable/command çözümlemesini incele.

Sonuç:

```text
SSH komutu:

____________________________________

Çözümlenen kaynak/yol:

____________________________________
```

SSH bulunmuyorsa başka güvenilir bir komut seçebilirsin.

---

# 🧪 Görev 11 — Exit Code'u Gözlemle

Linux/macOS:

```bash
ls
echo $?
```

Ardından:

```bash
ls /this-path-should-not-exist
echo $?
```

PowerShell üzerinde native bir programın çıkış kodunu gözlemlemek istersen uygun güvenilir sistem aracından sonra:

```powershell
$LASTEXITCODE
```

değerini inceleyebilirsin.

Şu soruyu cevapla:

> Başarılı ve başarısız program çalışmaları otomasyonda neden ayırt edilmek istenir?

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 12 — Kullanıcı ve Grupları İncele

Windows:

```cmd
whoami
whoami /groups
```

Linux:

```bash
whoami
id
```

Sonuç:

```text
Kullanıcı:

____________________________________

Dikkatimi çeken grup:

____________________________________
```

Her grubun anlamını şu anda bilmen gerekmiyor.

---

# 🧪 Görev 13 — Sistem Profilini Topla

### Windows

```cmd
systeminfo
```

ve:

```cmd
ipconfig /all
```

### Linux

```bash
uname -a
cat /etc/os-release
ip addr
ip route
```

Şunları doldur:

```text
Hostname:

____________________________________

OS:

____________________________________

Kernel / Build:

____________________________________

IPv4:

____________________________________

Default Gateway:

____________________________________
```

---

# 🧪 Görev 14 — Process'leri İncele

PowerShell:

```powershell
Get-Process |
Select-Object ProcessName, Id |
Select-Object -First 10
```

Linux:

```bash
ps aux
```

Üç process seç:

| Process | PID | Kullanıcı |
|---|---:|---|
| | | |
| | | |
| | | |

---

# 🧪 Görev 15 — Network Connection'ı Process'e Bağla

Windows:

```cmd
netstat -ano
```

çıktısından bir `ESTABLISHED` TCP connection bulabilirsen PID'yi not et.

Ardından:

```powershell
Get-Process -Id <PID>
```

kullan.

Linux'ta uygun yetkiyle:

```bash
ss -tunp
```

kullanabilirsin.

Sonuç:

```text
Process:

____________________________________

PID:

____________________________________

Local Endpoint:

____________________________________

Remote Endpoint:

____________________________________
```

Sisteminde uygun established connection bulamazsan bu görevi teorik olarak tamamlayabilirsin.

---

# 🧪 Görev 16 — Listening Portları İncele

Windows:

```powershell
Get-NetTCPConnection -State Listen |
Select-Object LocalAddress, LocalPort, OwningProcess
```

Linux:

```bash
ss -tuln
```

Bir listening endpoint seç:

```text
Address:

____________________________________

Port:

____________________________________

PID:

____________________________________

Process:

____________________________________
```

Ders 08'deki bilgilerinle bind address'i yorumlamaya çalış.

---

# 🧪 Görev 17 — SHA-256 Hesapla

Kendi oluşturduğun:

```text
notes.txt
```

dosyasının hash'ini al.

PowerShell:

```powershell
Get-FileHash notes.txt -Algorithm SHA256
```

Linux:

```bash
sha256sum notes.txt
```

macOS:

```bash
shasum -a 256 notes.txt
```

Sonuç:

```text
SHA-256:

____________________________________________________
```

Böylece Ders 04'teki hash bilgisini command line ile birleştirdik.

---

# 🧪 Görev 18 — Command History

PowerShell:

```powershell
Get-History
```

Bash:

```bash
history
```

çıktısını incele.

Şunları düşün:

```text
Hangi komutlar görünüyor?

Bütün komutlar kesinlikle burada mı?

History bir DFIR analistine ne sağlayabilir?
```

Cevabın:

```text
____________________________________________________

____________________________________________________
```

---

# 🧪 Görev 19 — Yardım Kullanarak Kendi Cevabını Bul

Bu görevde sana doğrudan cevabı vermiyoruz.

Şunu öğren:

> `Get-Process` çıktısında yalnızca belirli bir process'i nasıl seçebilirsin?

PowerShell yardımını kullan:

```powershell
Get-Help Get-Process
```

veya:

```powershell
Get-Help Get-Process -Examples
```

Linux kullanıyorsan:

> `ls` ile dosya boyutlarını okunabilir formatta nasıl gösterebilirsin?

şunu kullanarak araştır:

```bash
man ls
```

veya:

```bash
ls --help
```

Bulduğun çözümü yaz:

```text
____________________________________________________
```

Bu görev özellikle önemli.

Çünkü gerçek dünyada her komutun cevabı sana hazır verilmeyecek.

---

# 🧪 Görev 20 — Lab Dosyalarını Güvenli Şekilde Temizle

Silmeden önce:

```text
1. Current Working Directory'yi kontrol et.

2. Dosyaları listele.

3. Yalnızca ag-cli-lab içindeki test dosyalarını doğrula.
```

Ardından oluşturduğun test dosyalarını sil.

Dizini kaldırmak istiyorsan yalnızca boş olduğundan ve doğru hedef olduğundan emin olduktan sonra kaldır.

Kontrol:

```text
[ ] Doğru dizinde olduğumu kontrol ettim.

[ ] Silinecek dosyaları önce listeledim.

[ ] Yalnızca kendi lab dosyalarımı sildim.

[ ] Sistem dosyalarına dokunmadım.
```

---

# 🔐 Siber Güvenlik Görevi — Mini Live Response

Senaryo:

Bir kullanıcı şöyle diyor:

> "Bilgisayarım garip davranıyor ve bilinmeyen bir bağlantı gördüm."

Sistemde hiçbir şeyi değiştirmeden mümkün olduğunca aşağıdaki bilgileri toplamaya çalış:

```text
1. Mevcut kullanıcı:

2. İşletim sistemi:

3. Hostname:

4. IPv4:

5. Default Gateway:

6. Çalışan process'lerden üç tanesi:

7. Listening portlardan biri:

8. Established connection'lardan biri:

9. Bağlantıyla ilişkili PID:

10. PID ile ilişkili process:
```

Ardından şu soruya cevap ver:

> Bu bilgiler tek başına sistemin ele geçirildiğini kanıtlar mı?

```text
____________________________________________________

____________________________________________________
```

Cevap:

Hayır.

Bunlar analiz için başlangıç verileridir.

---

# 🧠 Kendini Test Et

## Soru 1

Terminal ile shell arasındaki fark hangisidir?

**A)** İkisi her zaman aynı şeydir.  
**B)** Terminal etkileşim arayüzünü sağlar; shell komutları yorumlayan/çalıştıran ortamdır.  
**C)** Shell fiziksel donanımdır.  
**D)** Terminal dosya sistemidir.

---

## Soru 2

PowerShell'de:

```powershell
ls
```

komutu neden Linux'taki `ls` ile tamamen aynı kabul edilmemelidir?

**A)** PowerShell'deki `ls`, `Get-ChildItem` alias'ı olabilir.  
**B)** PowerShell dosya listeleyemez.  
**C)** Linux'ta `ls` yoktur.  
**D)** `ls` yalnızca network komutudur.

---

## Soru 3

Current Working Directory neden önemlidir?

**A)** Relative path'lerin nasıl çözümleneceğini etkiler.  
**B)** CPU hızını değiştirir.  
**C)** MAC adresini belirler.  
**D)** DNS'i kapatır.

---

## Soru 4

Dosya adında boşluk olduğunda neden quoting gerekebilir?

**A)** Shell boşlukları argument ayırıcı olarak yorumlayabileceği için  
**B)** Dosya otomatik olarak malware olduğu için  
**C)** IP adresi değiştiği için  
**D)** RAM dolduğu için

---

## Soru 5

Wildcard ile silme işlemlerinde neden dikkatli olunmalıdır?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 6

`stdout` nedir?

**A)** Programın standart normal çıktı akışı  
**B)** CPU register'ı  
**C)** Network portu  
**D)** Dosya sistemi

---

## Soru 7

`stderr` neden stdout'tan ayrı tutulabilir?

**A)** Hata/diagnostic mesajlarını normal çıktıdan ayırabilmek için  
**B)** CPU'yu hızlandırmak için  
**C)** IP değiştirmek için  
**D)** Dosya uzantısını belirlemek için

---

## Soru 8

`>` ile `>>` arasındaki temel fark nedir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 9

Pipe'ın temel amacı nedir?

**A)** Bir komutun çıktısını başka bir komutun girdisine bağlamak  
**B)** İşletim sistemini kapatmak  
**C)** IP adresini değiştirmek  
**D)** Dosyayı şifrelemek

---

## Soru 10

PowerShell pipeline'ının önemli özelliklerinden biri hangisidir?

**A)** Yalnızca görüntü piksellerini aktarır.  
**B)** Çoğu cmdlet arasında yapılandırılmış .NET object'leri aktarabilir.  
**C)** Network bağlantısını keser.  
**D)** Yalnızca text dosyaları açar.

---

## Soru 11

Exit code neden önemlidir?

**A)** Programın başarı/hata durumunu otomasyon tarafından değerlendirmeye yardımcı olabilir.  
**B)** RAM kapasitesini gösterir.  
**C)** MAC adresini belirler.  
**D)** Kullanıcının parolasını gösterir.

---

## Soru 12

PATH neyle ilişkilidir?

**A)** Komut/executable arama yollarıyla  
**B)** Network routing ile aynı şeydir.  
**C)** Dosya hash'iyle  
**D)** CPU cache ile

---

## Soru 13

Command history'de bir komut bulunmaması:

> "Bu komut kesinlikle hiç çalıştırılmadı."

anlamına gelir mi?

**A)** Evet  
**B)** Hayır

Neden?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 14

Her terminal işlemini Administrator/root olarak yapmak neden kötü bir alışkanlık olabilir?

```text
____________________________________________________

____________________________________________________
```

---

## Soru 15

İnternette:

```text
bir şey indir → doğrudan shell'e gönder → çalıştır
```

şeklinde bir komut gördün.

En güvenli ilk yaklaşım hangisidir?

**A)** Hemen Administrator olarak çalıştırmak  
**B)** İçeriği ve kaynağı incelemek, ne yaptığını anlamak  
**C)** Antivirüsü kapatmak  
**D)** History'yi silmek

---

## Soru 16 — Analist Sorusu

Bir terminal çıktısında:

```text
TCP
192.168.1.25:53142
203.0.113.50:443
ESTABLISHED
PID 6420
```

gördün.

Sonraki beş araştırma adımın ne olurdu?

```text
1.

2.

3.

4.

5.
```

---

# 🎯 Ana Görev — Modülü Terminalde Birleştir

Kendi bilgisayarında aşağıdaki bilgileri yalnızca terminal araçları kullanarak bulmaya çalış:

```text
1. Kullanıcı:

2. İşletim Sistemi:

3. Hostname:

4. CPU:

5. RAM:

6. IPv4:

7. Default Gateway:

8. DNS Server:

9. Bir Process + PID:

10. Bir Listening Port:

11. Listening Port ile ilişkili Process:

12. Bir Established Connection:

13. Connection ile ilişkili Process:

14. Kendi oluşturduğun bir dosyanın SHA-256 hash'i:
```

Sonra bu ilişkiyi kendi bilgisayarından gerçek verilerle doldur:

```text
USER
  │
  ▼
PROCESS
  │
  ▼
PID
  │
  ▼
SOCKET
  │
  ▼
LOCAL IP : PORT
  │
  ▼
REMOTE IP : PORT
```

Bu görevi tamamlayabiliyorsan ilk sekiz derste öğrendiğin kavramları terminal üzerinde bir araya getirebiliyorsun.

---

# 🔐 Siber Güvenlik Bağlantısı

Command line bilgisi neredeyse bütün teknik güvenlik alanlarında kullanılır.

```text
COMMAND LINE
│
├── BLUE TEAM
│   ├── Process Inspection
│   ├── Network Inspection
│   ├── Log Analysis
│   └── System Triage
│
├── DFIR
│   ├── Live Response
│   ├── File Analysis
│   ├── Hashing
│   └── Artifact Collection
│
├── SYSTEM ADMINISTRATION
│   ├── Users
│   ├── Services
│   ├── Files
│   └── Automation
│
├── NETWORK SECURITY
│   ├── IP Configuration
│   ├── Connections
│   ├── DNS
│   └── Ports
│
├── MALWARE ANALYSIS
│   ├── Process Inspection
│   ├── Hashing
│   ├── File Operations
│   └── Lab Automation
│
└── CLOUD / DEVSECOPS
    ├── CLI Tools
    ├── Scripts
    ├── Automation
    └── Pipelines
```

Terminal öğrenmek tek başına bir siber güvenlik uzmanı yapmaz.

Ancak sistemlerle etkili çalışabilmenin en önemli teknik araçlarından biridir.

---

# 💡 Bu Dersten Çıkarman Gereken Ana Fikir

Komut satırını:

```text
Komut ezberleme ekranı
```

olarak düşünme.

Daha doğru model:

```text
                        USER
                          │
                          ▼
                       TERMINAL
                          │
                          ▼
                        SHELL
                          │
                 ┌────────┼────────┐
                 ▼        ▼        ▼
              COMMAND   SCRIPT   PIPELINE
                 │        │        │
                 └────────┼────────┘
                          ▼
                  OPERATING SYSTEM
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
      FILES            PROCESSES         NETWORK
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
                        OUTPUT
                          │
                ┌─────────┼─────────┐
                ▼         ▼         ▼
              STDOUT    STDERR    FILE
```

Terminalde iyi olmak:

> Bütün komutları ezberlemek

değildir.

Şunları yapabilmektir:

```text
Ne yapmak istediğini tanımla

Doğru aracı bul

Dokümantasyonu oku

Komutun kapsamını anla

Çıktıyı yorumla

Hataları kontrol et

Gerekirse komutları birleştir

Sonucu doğrula
```

Bu yaklaşım ilerleyen bütün teknik modüllerde kullanılacak.

---

# ✅ Ders Tamamlama Kontrol Listesi

Bu dersi tamamlamadan önce:

- [ ] CLI kavramını açıklayabiliyorum.
- [ ] Terminal ile shell arasındaki farkı biliyorum.
- [ ] CMD, PowerShell ve Bash'in aynı şey olmadığını biliyorum.
- [ ] Hangi shell içerisinde çalıştığımı kontrol edebiliyorum.
- [ ] Current Working Directory kavramını biliyorum.
- [ ] Absolute ve relative path kullanabiliyorum.
- [ ] Quoting'in neden gerekli olabileceğini biliyorum.
- [ ] Tab completion kullanabiliyorum.
- [ ] Wildcard kavramını biliyorum.
- [ ] Dosya ve dizinleri listeleyebiliyorum.
- [ ] Güvenli bir test dizini oluşturabiliyorum.
- [ ] Dosya oluşturabiliyorum.
- [ ] Dosya içeriğini görüntüleyebiliyorum.
- [ ] Dosya kopyalama ve taşıma mantığını biliyorum.
- [ ] Dosya silmeden önce hedefi doğrulama alışkanlığı edindim.
- [ ] Komut yardım sistemlerini kullanabiliyorum.
- [ ] stdin, stdout ve stderr kavramlarını tanıyorum.
- [ ] Redirection kavramını açıklayabiliyorum.
- [ ] `>` ile `>>` arasındaki farkı biliyorum.
- [ ] Pipe kavramını açıklayabiliyorum.
- [ ] PowerShell pipeline'ın object taşıyabildiğini biliyorum.
- [ ] Metin içerisinde arama yapabiliyorum.
- [ ] Exit code kavramını biliyorum.
- [ ] Environment variable kavramını biliyorum.
- [ ] PATH'in temel görevini açıklayabiliyorum.
- [ ] Bir komutun hangi executable/command'e çözümlendiğini araştırabiliyorum.
- [ ] Command history'nin kusursuz kanıt olmadığını biliyorum.
- [ ] Command line'da secret kullanmanın iz bırakabileceğini biliyorum.
- [ ] Kullanıcı kimliğimi terminalden bulabiliyorum.
- [ ] Kullanıcı ile yetkinin aynı kavram olmadığını biliyorum.
- [ ] Process listesini terminalden görüntüleyebiliyorum.
- [ ] Sistem bilgilerini terminalden toplayabiliyorum.
- [ ] Network yapılandırmasını terminalden inceleyebiliyorum.
- [ ] DNS sorgusu yapabiliyorum.
- [ ] Network connection'larını inceleyebiliyorum.
- [ ] PID'yi process'e bağlayabiliyorum.
- [ ] Listening endpoint'leri inceleyebiliyorum.
- [ ] SHA-256 hash hesaplayabiliyorum.
- [ ] Administrator/root yetkisinin neden dikkatli kullanılması gerektiğini biliyorum.
- [ ] İnternetten aldığım komutları anlamadan çalıştırmamam gerektiğini biliyorum.
- [ ] Quiz sorularını tamamladım.
- [ ] Terminal laboratuvarını tamamladım.

---

# 🧩 Dersin Özeti

Bu derste ilk sekiz dersin kavramlarını tek bir araç üzerinden birleştirdik:

```text
                         TERMINAL
                            │
                            ▼
                          SHELL
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
      FILES              PROCESSES           NETWORK
        │                   │                   │
       PATH                PID                  IP
       HASH               USER                ROUTE
       CONTENT            MEMORY              DNS
                                              PORT
                                                │
                                                ▼
                                            CONNECTION
```

Böylece:

```text
Bilgisayar
→ İşletim Sistemi
→ Dosya Sistemi
→ Process
→ Network
→ Protocol
→ Port
→ Service
→ Command Line
```

zincirini tamamladık.

Şimdi artık:

> "Bilgisayar nasıl çalışıyor?"

sorusundan:

> "Bu sistemi nasıl güvenli tutarız ve güvenlik riskini nasıl düşünürüz?"

sorusuna geçmeye hazırız.

---

# 🚀 Sonraki Ders

## Ders 10 — Temel Siber Güvenlik Kavramları: Neyi, Neden Koruyoruz?

Bir sonraki derste şimdiye kadar öğrendiğimiz teknik sistemi güvenlik perspektifinden değerlendireceğiz.

Şu soruların cevaplarını arayacağız:

- Bilgi güvenliği ile siber güvenlik arasındaki fark nedir?
- Asset nedir?
- CIA Triad nedir?
- Confidentiality nedir?
- Integrity nedir?
- Availability nedir?
- Threat nedir?
- Threat Actor nedir?
- Vulnerability nedir?
- Exploit nedir?
- Risk nedir?
- Likelihood ve Impact ne anlama gelir?
- Security Control nedir?
- Preventive, Detective ve Corrective kontroller nedir?
- Authentication ve Authorization güvenlikte nereye oturur?
- Attack Surface nedir?
- Defense in Depth nedir?
- Zero Trust temel olarak ne söyler?
- Bir güvenlik olayı ile güvenlik açığı aynı şey midir?

Ve ilk defa şu zinciri oluşturacağız:

```text
ASSET
  │
  ▼
THREAT
  │
  ▼
VULNERABILITY
  │
  ▼
RISK
  │
  ▼
SECURITY CONTROL
  │
  ▼
RESIDUAL RISK
```

Bundan sonra öğrendiğimiz teknik bileşenlere yalnızca:

> "Nasıl çalışıyor?"

diye değil,

> **"Neyi korumaya çalışıyoruz, neyden koruyoruz ve riski nasıl azaltıyoruz?"**

diye bakacağız.