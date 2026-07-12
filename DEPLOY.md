# EconoMonteiro Deploy Checklist
## ✅ Pré-deploy
- [x] Build de produção funcionando
- [x] PWA manifest configurado
- [x] Service worker implementado
- [x] Ícones PWA (192x192, 512x512)

## 🚀 Deploy Steps

### 1. Cloudflare Setup
```bash

# Instalar Wrangler
npm install -g wrangler


# Login
wrangler auth login

# Criar projeto
wrangler pages project create economonteiro-global-money
```

### 2. Deploy
```bash
# Build e deploy
npm run deploy

# Ou manualmente
npm run build
wrangler pages deploy dist
```

### 3. Configurar Domínio (Opcional)
- Vá para Cloudflare Dashboard
- Pages > economonteiro-global-money
- Custom domains > Adicione seu domínio

## 🔍 Pós-deploy Checks
- [ ] App carrega corretamente
- [ ] PWA instala no mobile
- [ ] Service worker registra

- [ ] Offline funciona
- [ ] HTTPS ativo
## 📊 URLs de Exemplo
- Produção: https://economonteiro-global-money.pages.dev

## 🐛 Troubleshooting
- Se PWA não instalar: Verificar manifest.json
- Se offline não funcionar: Verificar service worker
- Se erro 404: Verificar rotas do TanStack Router
