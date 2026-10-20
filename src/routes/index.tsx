import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import hero from "@/assets/hero.jpg";
import barber1 from "@/assets/barber1.jpg";
import barber2 from "@/assets/barber2.jpg";
import corte from "@/assets/corte.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barber Shop — Cortes, barba e estilo" },
      { name: "description", content: "Barbearia moderna: corte, barba, sobrancelha, pigmentação e combos. Agende seu horário online." },
      { property: "og:title", content: "Barber Shop — Cortes, barba e estilo" },
      { property: "og:description", content: "Agende seu corte e barba com os melhores barbeiros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Dados (exemplos — substitua pelos reais) ---------- */
const WHATSAPP = "5571999999999";

const servicos = [
  { nome: "Corte de cabelo", desc: "Degradê, social, tesoura ou máquina", preco: 45 },
  { nome: "Barba", desc: "Toalha quente, navalha e hidratação", preco: 35 },
  { nome: "Sobrancelha", desc: "Design na navalha ou pinça", preco: 15 },
  { nome: "Pigmentação", desc: "Cabelo ou barba, efeito natural", preco: 40 },
  { nome: "Combo Corte + Barba", desc: "O clássico da casa", preco: 70, destaque: true },
  { nome: "Combo Completo", desc: "Cabelo + barba + sobrancelha", preco: 85, destaque: true },
  { nome: "Combo Premium", desc: "Completo + pigmentação", preco: 120, destaque: true },
];

const pagamentos = ["Pix", "Dinheiro", "Débito", "Crédito em até 3x"];

const equipe = [
  { nome: "Rafael Costa", esp: "Degradê e barba", foto: barber1 },
  { nome: "Diego Santos", esp: "Freestyle e pigmentação", foto: barber2 },
  { nome: "Lucas Almeida", esp: "Cortes clássicos e navalha", foto: barber1 },
];

const depoimentos = [
  { nome: "João P.", texto: "Melhor degradê que já fiz. Ambiente top e atendimento pontual." },
  { nome: "Marcos V.", texto: "O combo completo vale cada centavo. Saio renovado sempre." },
  { nome: "André L.", texto: "Agendei pelo site em 1 minuto. Virei cliente fixo." },
];

const horarios = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const links = [
  ["#servicos", "Serviços"], ["#sobre", "Sobre"], ["#equipe", "Equipe"],
  ["#galeria", "Galeria"], ["#agendar", "Agendar"], ["#local", "Local"],
];

/* ---------- Validação do agendamento ---------- */
const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(80),
  telefone: z.string().trim().regex(/^[\d\s()+-]{10,16}$/, "Telefone inválido"),
  servico: z.string().min(1, "Escolha um serviço"),
  barbeiro: z.string().min(1, "Escolha um barbeiro"),
  data: z.string().min(1, "Escolha a data"),
  hora: z.string().min(1, "Escolha o horário"),
});

function Index() {
  const [menu, setMenu] = useState(false);
  const [erro, setErro] = useState("");

  // Animação suave ao rolar: revela elementos .reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function agendar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(dados);
    if (!r.success) return setErro(r.error.issues[0]?.message ?? "Verifique os campos");
    setErro("");
    const d = r.data;
    const msg = `Olá! Quero agendar:\nNome: ${d.nome}\nTelefone: ${d.telefone}\nServiço: ${d.servico}\nBarbeiro: ${d.barbeiro}\nData: ${d.data.split("-").reverse().join("/")} às ${d.hora}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const campo = "w-full rounded-md border border-input bg-muted px-4 py-3 text-foreground outline-none focus:border-primary";
  const titulo = "font-display text-5xl md:text-6xl tracking-wide";

  return (
    <div className="bg-background text-foreground">
      {/* ===== Menu fixo ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="font-display text-3xl tracking-wider"><span className="text-gold">BARBER</span> SHOP</a>
          <button className="md:hidden text-2xl" onClick={() => setMenu(!menu)} aria-label="Abrir menu">☰</button>
          <ul className={`${menu ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 bg-background p-5 md:static md:flex md:flex-row md:p-0`}>
            {links.map(([h, l]) => (
              <li key={h}><a href={h} onClick={() => setMenu(false)} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary">{l}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ===== 1. Hero ===== */}
      <section id="inicio" className="relative flex min-h-screen items-center">
        <img src={hero} alt="Interior da barbearia" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 reveal">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Barbearia moderna</p>
          <h1 className="font-display text-7xl leading-none md:text-9xl">Estilo é <span className="text-gold">atitude.</span></h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">Cortes precisos, barba alinhada e um ambiente feito pra você relaxar.</p>
          <a href="#agendar" className="mt-8 inline-block rounded-md bg-gold px-8 py-4 font-bold uppercase tracking-wider text-primary-foreground shadow-gold transition hover:scale-105">Agendar horário</a>
        </div>
      </section>

      {/* ===== 2. Serviços e preços ===== */}
      <section id="servicos" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${titulo} reveal`}>Serviços <span className="text-gold">& preços</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <div key={s.nome} className={`reveal rounded-lg border p-6 bg-card ${s.destaque ? "border-primary shadow-gold" : "border-border"}`}>
              {s.destaque && <span className="text-xs uppercase tracking-widest text-primary">Combo</span>}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl tracking-wide">{s.nome}</h3>
                <span className="font-display text-3xl text-gold">{brl(s.preco)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-2xl tracking-wide">Formas de pagamento</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {pagamentos.map((p) => <span key={p} className="rounded-full border border-primary px-4 py-1 text-sm text-primary">{p}</span>)}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Pagando no Pix, 5% de desconto em qualquer serviço.</p>
        </div>
      </section>

      {/* ===== 3. Sobre ===== */}
      <section id="sobre" className="bg-card py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <img src={corte} alt="Corte degradê" loading="lazy" width={912} height={912} className="reveal rounded-lg" />
          <div className="reveal">
            <h2 className={titulo}>Nossa <span className="text-gold">história</span></h2>
            <p className="mt-6 text-muted-foreground">Nascemos em 2015 de uma cadeira só e muita vontade de fazer diferente. Hoje somos referência em cortes modernos, sem perder o cuidado da barbearia tradicional.</p>
            <ul className="mt-6 space-y-3">
              {["Barbeiros certificados", "Produtos premium", "Ambiente climatizado com café e cerveja", "Pontualidade no agendamento"].map((d) => (
                <li key={d} className="flex gap-3"><span className="text-primary">✦</span>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 4. Equipe ===== */}
      <section id="equipe" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${titulo} reveal`}>Nossa <span className="text-gold">equipe</span></h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.map((b) => (
            <div key={b.nome} className="reveal group overflow-hidden rounded-lg bg-card">
              <img src={b.foto} alt={b.nome} loading="lazy" width={768} height={960} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-5">
                <h3 className="font-display text-3xl tracking-wide">{b.nome}</h3>
                <p className="text-sm text-primary">{b.esp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 5. Galeria ===== */}
      <section id="galeria" className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={`${titulo} reveal`}>Galeria</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[hero, corte, barber2, corte, barber1, hero].map((img, i) => (
              <img key={i} src={img} alt="Galeria da barbearia" loading="lazy" className={`reveal h-full w-full rounded-md object-cover ${i === 0 ? "col-span-2 row-span-2" : "aspect-square"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. Depoimentos ===== */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${titulo} reveal`}>O que dizem <span className="text-gold">os clientes</span></h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <blockquote key={d.nome} className="reveal rounded-lg border border-border bg-card p-6">
              <p className="text-primary">★★★★★</p>
              <p className="mt-3 text-muted-foreground">“{d.texto}”</p>
              <footer className="mt-4 font-bold">{d.nome}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ===== 7. Agendamento ===== */}
      <section id="agendar" className="bg-card py-24">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className={`${titulo} reveal text-center`}>Agende seu <span className="text-gold">horário</span></h2>
          <form onSubmit={agendar} className="reveal mt-10 grid gap-4 sm:grid-cols-2">
            <input name="nome" placeholder="Seu nome" className={campo} maxLength={80} />
            <input name="telefone" placeholder="(71) 99999-9999" className={campo} maxLength={16} />
            <select name="servico" className={campo} defaultValue="">
              <option value="" disabled>Serviço</option>
              {servicos.map((s) => <option key={s.nome} value={`${s.nome} (${brl(s.preco)})`}>{s.nome} — {brl(s.preco)}</option>)}
            </select>
            <select name="barbeiro" className={campo} defaultValue="">
              <option value="" disabled>Barbeiro</option>
              <option>Sem preferência</option>
              {equipe.map((b) => <option key={b.nome}>{b.nome}</option>)}
            </select>
            <input type="date" name="data" className={campo} />
            <select name="hora" className={campo} defaultValue="">
              <option value="" disabled>Horário</option>
              {horarios.map((h) => <option key={h}>{h}</option>)}
            </select>
            {erro && <p className="text-sm text-destructive sm:col-span-2">{erro}</p>}
            <button className="rounded-md bg-gold py-4 font-bold uppercase tracking-wider text-primary-foreground shadow-gold sm:col-span-2">Confirmar pelo WhatsApp</button>
          </form>
        </div>
      </section>

      {/* ===== 8. Localização ===== */}
      <section id="local" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2">
        <div className="reveal">
          <h2 className={titulo}>Onde <span className="text-gold">estamos</span></h2>
          <p className="mt-6">Rua das Navalhas, 123 — Centro, Salvador/BA</p>
          <h3 className="mt-8 font-display text-2xl tracking-wide text-primary">Horário de funcionamento</h3>
          <ul className="mt-3 space-y-1 text-muted-foreground">
            <li>Segunda a sexta: 09h às 20h</li>
            <li>Sábado: 08h às 18h</li>
            <li>Domingo: fechado</li>
          </ul>
        </div>
        <iframe title="Mapa" className="reveal h-80 w-full rounded-lg border-0" loading="lazy"
          src="https://www.google.com/maps?q=Salvador+BA&output=embed" />
      </section>

      {/* ===== 9. Rodapé ===== */}
      <footer className="border-t border-border py-10 text-center">
        <p className="font-display text-3xl tracking-wider"><span className="text-gold">BARBER</span> SHOP</p>
        <div className="mt-4 flex justify-center gap-6 text-sm uppercase tracking-widest text-muted-foreground">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">Facebook</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-primary">TikTok</a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Barber Shop. Todos os direitos reservados.</p>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-gold transition hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-background"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
      </a>
    </div>
  );
}
