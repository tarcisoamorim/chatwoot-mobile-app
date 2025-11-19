# 📚 Documentação - meu.bot Mobile App

Bem-vindo à documentação oficial do aplicativo mobile meu.bot!

## 📋 Índice de Documentos

### 🚀 Para Começar

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia completo de desenvolvimento
  - Setup inicial do ambiente
  - Estrutura do projeto
  - Tecnologias utilizadas
  - Workflow de desenvolvimento
  - Padrões de código
  - Testing e debugging

### 📦 Build e Deploy

- **[BUILD.md](./BUILD.md)** - Guia de build e publicação
  - Pré-requisitos
  - Builds locais (iOS/Android)
  - Builds em nuvem (EAS)
  - Submissão para App Store e Google Play
  - Troubleshooting

### 📝 Histórico

- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de versões
  - Mudanças da v4.4.0
  - Releases anteriores
  - Breaking changes

---

## 🎯 Quick Start

### Para Desenvolvedores

```bash
# 1. Clone o projeto
git clone https://github.com/tarcisoamorim/chatwoot-mobile-app.git
cd chatwoot-mobile-app

# 2. Instale dependências
pnpm install

# 3. Configure .env
cp .env.example .env
# Edite .env com suas credenciais

# 4. Rode o app
pnpm start
# Em outro terminal:
pnpm run:ios    # ou pnpm run:android
```

Leia [DEVELOPMENT.md](./DEVELOPMENT.md) para instruções detalhadas.

### Para Build de Produção

```bash
# Android
pnpm build:android

# iOS
pnpm build:ios

# Ambos
pnpm build:all
```

Leia [BUILD.md](./BUILD.md) para o guia completo.

---

## 🏗️ Arquitetura

### Stack Principal

- **React Native** 0.76.9
- **React** 19.2.0
- **Expo SDK** 52
- **TypeScript** 5.7.2

### State Management

- Redux Toolkit
- React Redux
- Redux Persist

### UI

- NativeWind (Tailwind CSS)
- React Native Reanimated v4
- FlashList

### Navegação

- React Navigation v7

---

## 📊 Versão Atual

**v4.4.0** (2025-11-19)

### Principais Mudanças

- ⚡ **Performance**: 85% redução em re-renders na tela de chat
- 🐛 **Bug Fix**: Áudio no Android funcionando
- 🏗️ **Arquitetura**: Renomeação de components-next → components
- 📚 **Docs**: Documentação completa adicionada

Veja [CHANGELOG.md](./CHANGELOG.md) para detalhes completos.

---

## 🆘 Precisa de Ajuda?

### Documentação

1. **Começando**: Leia [DEVELOPMENT.md](./DEVELOPMENT.md)
2. **Build Issues**: Consulte [BUILD.md](./BUILD.md) → Troubleshooting
3. **Mudanças**: Veja [CHANGELOG.md](./CHANGELOG.md)

### Recursos Externos

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

### Reportar Issues

Encontrou um bug? [Abra uma issue](https://github.com/tarcisoamorim/chatwoot-mobile-app/issues)

---

## 📞 Contato

- **Repository**: https://github.com/tarcisoamorim/chatwoot-mobile-app
- **Issues**: https://github.com/tarcisoamorim/chatwoot-mobile-app/issues

---

**Última atualização**: 2025-11-19
**Versão da documentação**: 1.0
**Versão do app**: 4.4.0
