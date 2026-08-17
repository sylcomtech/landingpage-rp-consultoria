# RP Consultoria | HS Consórcios — Landing Page

Landing page de captação de clientes para **consórcio de imóveis e veículos**, desenvolvida em HTML, CSS e JavaScript puros (sem frameworks ou build step), com identidade visual em **vermelho e preto**.

> Marca: **RP Consultoria | HS Consórcios**

---

## 🧱 Estrutura do projeto

```
LandingPageRP/
├── index.html              # Página única com todas as seções
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos (tokens, layout, responsivo)
│   ├── js/
│   │   └── main.js         # Menu mobile, modal, formulários, scroll reveal
│   └── img/
│       └── favicon.svg     # Ícone da aba do navegador
├── package.json            # Scripts opcionais para rodar localmente
├── .gitignore
└── README.md
```

## 📑 Seções da página

1. **Header/Navbar** — logo "RP Consultoria | HS Consórcios" + menu + CTA
2. **Hero + Formulário de simulação** — headline principal e formulário de captação
3. **Prova social (números)** — maior administradora, bens entregues, contemplações
4. **Por que escolher o Consórcio** — Poder é seu / Economia sem juros / Investimento planejado
5. **Como funciona** — 4 passos + caixa de dica + CTA "Quero simular"
6. **Qual será sua próxima conquista?** — cards Imóvel / Veículo / Investimento, cada um com botão "Simule agora"
7. **Cartas contempladas** — tabela compacta (crédito, parcelas pagas, parcela) com botão "Tenho interesse" por linha, ao lado de um espaço para foto do especialista e selos de confiança
8. **Quem somos e diferencial** — missão + 4 diferenciais
9. **Regulamentado pelo Banco Central e ABAC**
10. **Contato** — WhatsApp/telefone, e-mail, endereço, redes sociais e formulário

Todos os botões de simulação abrem o **mesmo modal** de captação, já pré-preenchendo o tipo de produto de acordo com o botão clicado.

## ✏️ Itens marcados como placeholder (ajustar antes de publicar)

Busque por `placeholder` no `index.html` e ajuste:

- **Número de WhatsApp**: em `assets/js/main.js`, constante `WHATSAPP_NUMBER` (topo do arquivo) e no link do botão flutuante em `index.html` (`.whatsapp-fab`).
- **Telefone, e-mail e endereço** na seção de Contato (`#contato`).
- **Links de redes sociais** (Instagram, Facebook, LinkedIn) na seção de Contato.
- **Valores da tabela de Cartas Contempladas** (`#contempladas`) — atualmente ilustrativos.

A foto do especialista está em `assets/img/Rapha.jpeg` e é exibida em `#contempladas .photo-frame` (com o fundo original da foto). Para trocar por outra: substitua o arquivo ou aponte o `src` do `<img>` para o novo caminho. Uma versão com fundo removido também está disponível em `assets/img/rapha-especialista.png`, caso queira usá-la no futuro.

## 🔌 Como os formulários funcionam

Todos os formulários (`#simForm`, `#modalForm`, `#contactForm`) capturam os dados e, ao enviar, **abrem o WhatsApp** (`wa.me`) com uma mensagem pré-formatada contendo os dados preenchidos — não é necessário backend para começar a captar leads.

Para evoluir a captação (ex: salvar em CRM/planilha/e-mail), há duas opções comuns:

- Trocar o `wa.me` por um endpoint próprio (ex: função serverless) em `handleSimFormSubmit` (`assets/js/main.js`).
- Integrar um serviço de formulários (ex: Formspree, Web3Forms) adicionando o `action`/`fetch` correspondente.

## 🚀 Como rodar localmente

Não há dependências — basta abrir o `index.html` no navegador. Para rodar com um servidor local (recomendado, evita bloqueios de CORS/fontes):

```bash
npm run dev
```

Isso sobe um servidor estático em `http://localhost:5500` usando `npx serve`.

## 🌐 Deploy (GitHub Pages)

1. Vá em **Settings → Pages** no repositório.
2. Em "Build and deployment", selecione **Deploy from a branch**.
3. Branch: `main`, pasta: `/ (root)`.
4. Salve — a URL pública aparecerá em alguns instantes.

## 🎨 Identidade visual

- **Preto** (`#0b0b0c`) e **vermelho** (`#d81324`) como cores primárias.
- Tipografia: [Poppins](https://fonts.google.com/specimen/Poppins) (títulos) e [Inter](https://fonts.google.com/specimen/Inter) (texto).
- Todos os tokens de cor, raio e sombra ficam centralizados em `:root` no topo de `assets/css/style.css`, facilitando ajustes de marca.

## ✅ Próximos passos sugeridos

- Substituir os placeholders de contato e o número de WhatsApp.
- Adicionar fotos reais (equipe/imóveis/veículos) em `assets/img/` e referenciá-las nas seções `hero`, `solutions` etc.
- Conectar os formulários a um CRM ou planilha para gestão dos leads.
- Configurar domínio próprio (ex: `www.rpconsultoria.com.br`) apontando para o GitHub Pages ou outro host.
