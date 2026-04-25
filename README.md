# EconoMonteiro — Smart Finance Assistant

Um assistente financeiro inteligente e privado que ajuda você a controlar suas finanças pessoais em 7 idiomas.

## ✨ Funcionalidades

- 📊 **Dashboard interativo** com gráficos de receitas, despesas e tendências
- 💳 **Gerenciamento de cartões** com limites e uso seguro
- 📈 **Analytics avançados** com gráficos de gastos por categoria
- 🎯 **Metas de economia** com acompanhamento visual
- 🤖 **Aracy AI** - Assistente sem censura para qualquer pergunta
- 🌍 **7 idiomas** - PT, EN, ES, FR, DE, IT, JA
- 🌓 **Tema claro/escuro**
- 🔒 **Privacidade total** - Dados ficam no seu dispositivo
- 📱 **PWA completo** - Instale como app nativo

## 🚀 Deploy

### Cloudflare Pages (Recomendado)

Este projeto usa TanStack Start com Cloudflare. Para deploy:

1. **Instale Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Configure Cloudflare**:
   ```bash
   wrangler auth login
   wrangler pages project create economonteiro-global-money
   ```

3. **Deploy**:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

### Alternativas

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### CI/CD Automático

O arquivo `.github/workflows/deploy.yml` está configurado para deploy automático no push para main branch.

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 📱 PWA Features

- **Offline-first**: Funciona sem internet
- **Installable**: Adicione à tela inicial
- **Fast**: Carregamento instantâneo
- **Secure**: HTTPS obrigatório

## 🤖 Aracy AI

A Aracy é uma assistente de IA integrada que responde qualquer pergunta sem censura. Acesse via a sidebar do app.

## 🔐 Segurança

- Dados armazenados localmente (localStorage)
- Sem coleta de dados pessoais
- Criptografia de informações sensíveis
- Sem dependência de APIs externas

## 📊 Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Build**: Vite
- **PWA**: Workbox + Vite PWA Plugin
- **Deploy**: Cloudflare Pages

## 📄 Licença

Este projeto é open source e gratuito para uso pessoal.

---

**EconoMonteiro** - Domine seu dinheiro com inteligência artificial! 💰🤖