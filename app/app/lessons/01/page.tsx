"use client";

import { useState } from "react";
import Quiz from "../../components/Quiz";
import LabTask from "../../components/LabTask";

export default function Lesson01() {
  const [completed, setCompleted] = useState(false);


  return (
    <main className="min-h-screen bg-[#070b10] text-white">
      {/* Üst Bilgi */}
      <header className="border-b border-white/10 bg-[#0a0f16]">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="mb-3 flex items-center gap-2 text-sm text-cyan-400">
            <span>AG Cyber Lab</span>
            <span className="text-white/30">/</span>
            <span>Modül 01</span>
            <span className="text-white/30">/</span>
            <span>Ders 01</span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Bilgisayar Nedir?
          </h1>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-400">
              Başlangıç
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
              ⏱ 15 dakika
            </span>
          </div>
        </div>
      </header>

      {/* İçerik */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          
          {/* Ana Ders */}
          <article className="space-y-8">

            {/* Giriş */}
            <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 md:p-8">
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
                  Bu Derste Ne Öğreneceksin?
                </p>

                <h2 className="text-2xl font-bold">
                  Bilgisayarın temel çalışma mantığını anlayacaksın.
                </h2>
              </div>

              <ul className="space-y-3 text-white/70">
                <li>✓ Bilgisayarın ne olduğunu açıklayabileceksin.</li>
                <li>✓ Donanım ve yazılım arasındaki farkı anlayacaksın.</li>
                <li>✓ CPU, RAM ve disk arasındaki farkı öğreneceksin.</li>
                <li>✓ Bir program çalıştırıldığında neler olduğunu anlayacaksın.</li>
                <li>✓ Bu bilgilerin siber güvenlik açısından neden önemli olduğunu öğreneceksin.</li>
              </ul>
            </section>

            {/* Bölüm 1 */}
            <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">
                  01
                </div>

                <h2 className="text-2xl font-bold">
                  Bilgisayar Nedir?
                </h2>
              </div>

              <div className="space-y-5 leading-8 text-white/70">
                <p>
                  En basit haliyle bilgisayar; verileri alan, işleyen,
                  saklayan ve gerektiğinde sonuç üreten elektronik bir
                  sistemdir.
                </p>

                <p>
                  Örneğin bilgisayarında bir hesap makinesi uygulamasını
                  açtığını düşün.
                </p>

                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <ol className="space-y-3 text-sm text-white/70">
                    <li>
                      <span className="mr-2 text-cyan-400">01</span>
                      Bir işlem girersin.
                    </li>

                    <li>
                      <span className="mr-2 text-cyan-400">02</span>
                      Bilgisayar bu veriyi alır.
                    </li>

                    <li>
                      <span className="mr-2 text-cyan-400">03</span>
                      İşlemci gerekli işlemleri gerçekleştirir.
                    </li>

                    <li>
                      <span className="mr-2 text-cyan-400">04</span>
                      Sonuç bellekte işlenir.
                    </li>

                    <li>
                      <span className="mr-2 text-cyan-400">05</span>
                      Sonuç ekranda gösterilir.
                    </li>
                  </ol>
                </div>

                <p>
                  Siber güvenlikte ilerledikçe bu temel çalışma mantığının
                  neden önemli olduğunu daha iyi göreceksin.
                </p>
              </div>
            </section>

            {/* Bölüm 2 */}
            <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">
                  02
                </div>

                <h2 className="text-2xl font-bold">
                  Donanım Nedir?
                </h2>
              </div>

              <div className="space-y-5 leading-8 text-white/70">
                <p>
                  Donanım, bilgisayarın fiziksel olarak dokunabildiğimiz
                  parçalarıdır.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "CPU",
                    "RAM",
                    "SSD / HDD",
                    "Anakart",
                    "Ekran kartı",
                    "Klavye ve Mouse",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                  <p className="font-semibold text-cyan-400">
                    Kısaca:
                  </p>

                  <p className="mt-2">
                    Donanım = Bilgisayarın fiziksel parçaları
                  </p>
                </div>
              </div>
            </section>

            {/* Bölüm 3 */}
            <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">
                  03
                </div>

                <h2 className="text-2xl font-bold">
                  Yazılım Nedir?
                </h2>
              </div>

              <div className="space-y-5 leading-8 text-white/70">
                <p>
                  Yazılım, bilgisayara belirli işlemleri yaptıran
                  program ve kodlardan oluşur.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Windows",
                    "Linux",
                    "Google Chrome",
                    "Visual Studio Code",
                    "Python",
                    "Antivirüs yazılımları",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                  <p className="font-semibold text-cyan-400">
                    Kısaca:
                  </p>

                  <p className="mt-2">
                    Yazılım = Bilgisayara ne yapacağını söyleyen programlar
                  </p>
                </div>
              </div>
            </section>

            {/* Bölüm 4 */}
            <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-bold text-cyan-400">
                  04
                </div>

                <h2 className="text-2xl font-bold">
                  Donanım ve Yazılım Nasıl Çalışır?
                </h2>
              </div>

              <div className="space-y-6 text-white/70">
                <p>
                  Donanım ve yazılım birbirinden bağımsız düşünülemez.
                </p>

                <p>
                  Örneğin Google Chrome'u açtığında Chrome bir yazılımdır.
                  Ancak çalışabilmesi için bilgisayarın donanım
                  kaynaklarını kullanması gerekir.
                </p>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="space-y-4 text-center">
                    <div className="rounded-xl border border-purple-400/20 bg-purple-400/5 p-4">
                      <span className="font-semibold text-purple-300">
                        YAZILIM
                      </span>
                    </div>

                    <div className="text-white/30">↓</div>

                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                      <span className="font-semibold text-cyan-300">
                        İŞLETİM SİSTEMİ
                      </span>
                    </div>

                    <div className="text-white/30">↓</div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <span className="font-semibold">
                        DONANIM
                      </span>
                    </div>

                    <div className="grid gap-3 pt-2 sm:grid-cols-3">
                      {["CPU", "RAM", "Disk"].map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quiz */}
            <Quiz onComplete={() => setCompleted(true)} />

            <LabTask />

            {/* Tamamlama */}
            <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-400">
                    DERS SONU
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Dersi tamamladın mı?
                  </h2>

                  <p className="mt-2 text-sm text-white/50">
                    Sonraki adımda quiz ve uygulamaya geçeceğiz.
                  </p>
                </div>

                <button
                  onClick={() => setCompleted(!completed)}
                  className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                >
                  {completed ? "✓ Tamamlandı" : "Dersi Tamamla"}
                </button>
              </div>
            </section>
          </article>

          {/* Sağ Panel */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0c121a] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Ders İlerlemesi
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold">
                    {completed ? "100" : "0"}%
                  </span>

                  <span className="text-xs text-white/40">
                    Ders 01
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-cyan-400 transition-all"
                    style={{
                      width: completed ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c121a] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  İçindekiler
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <p className="text-cyan-400">
                    01 — Bilgisayar Nedir?
                  </p>

                  <p className="text-white/50">
                    02 — Donanım
                  </p>

                  <p className="text-white/50">
                    03 — Yazılım
                  </p>

                  <p className="text-white/50">
                    04 — Birlikte Çalışma
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}