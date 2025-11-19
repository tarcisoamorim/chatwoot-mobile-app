# 📦 Guia de Build - meu.bot Mobile App v4.4.0

Este documento contém instruções completas para fazer build do aplicativo meu.bot em ambiente de desenvolvimento e produção.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Build Local](#build-local)
- [Build em Nuvem (EAS)](#build-em-nuvem-eas)
- [Submissão para Lojas](#submissão-para-lojas)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

### Ferramentas Obrigatórias

```bash
# Node.js v20+ e pnpm
node --version  # Deve ser v20 ou superior
pnpm --version  # Gerenciador de pacotes

# Expo CLI
pnpm add -g expo-cli eas-cli

# Para builds locais iOS (apenas macOS)
xcode-select --install
pod --version

# Para builds locais Android
java -version    # Java 17+
android --version # Android SDK instalado
```

### Instalação de Dependências

```bash
# Clone o repositório
git clone https://github.com/tarcisoamorim/chatwoot-mobile-app.git
cd chatwoot-mobile-app

# Instale as dependências
pnpm install

# Para iOS (apenas macOS)
cd ios && pod install && cd ..
```

---

## 🔐 Variáveis de Ambiente

### Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

### Variáveis Obrigatórias

```bash
# URL base do servidor meu.bot
EXPO_PUBLIC_CHATWOOT_BASE_URL=https://desk.meu.bot

# Firebase (obrigatório para notificações push)
EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE=./ios/GoogleService-Info.plist
EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE=./android/app/google-services.json

# Sentry (opcional, para monitoramento de erros)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# EAS Build (para builds em nuvem)
EXPO_PUBLIC_APP_SLUG=meubot-mobile
```

### Arquivos de Configuração Firebase

**IMPORTANTE**: Você precisa adicionar os arquivos do Firebase manualmente:

1. **Android**: Baixe `google-services.json` do Firebase Console
   - Coloque em: `android/app/google-services.json`

2. **iOS**: Baixe `GoogleService-Info.plist` do Firebase Console
   - Coloque em: `ios/GoogleService-Info.plist`

⚠️ **Esses arquivos NÃO devem ser commitados no Git** (já estão no `.gitignore`)

---

## 🏗️ Build Local

### Build de Desenvolvimento (iOS)

```bash
# 1. Inicie o Metro bundler
pnpm start

# 2. Em outro terminal, rode no simulador iOS
pnpm run:ios

# Ou especifique um dispositivo
pnpm run:ios -- --device="iPhone 15 Pro"
```

### Build de Desenvolvimento (Android)

```bash
# 1. Inicie o Metro bundler
pnpm start

# 2. Em outro terminal, rode no emulador Android
pnpm run:android

# Ou especifique um dispositivo conectado
adb devices  # Liste os dispositivos
pnpm run:android -- --device=<device-id>
```

### Build de Produção Local

#### Android (APK/AAB)

```bash
# Build local de produção (gera .aab)
pnpm build:android:local

# O arquivo será gerado em:
# build-<timestamp>.aab
```

**Requisitos**:
- Android SDK instalado
- Keystore configurada (veja seção de Keystore abaixo)
- Variáveis de ambiente configuradas

#### iOS (IPA)

```bash
# Build local de produção (gera .ipa)
pnpm build:ios:local

# O arquivo será gerado em:
# build-<timestamp>.ipa
```

**Requisitos**:
- macOS com Xcode instalado
- Certificados Apple Developer configurados
- Provisioning Profiles válidos

---

## ☁️ Build em Nuvem (EAS)

Expo Application Services (EAS) permite fazer builds em servidores da Expo, sem precisar configurar ambiente local.

### Configuração Inicial

```bash
# 1. Login no Expo
eas login

# 2. Configure o projeto
eas build:configure
```

### Build Android

```bash
# Build de produção na nuvem
pnpm build:android

# Ou para build interno (development)
eas build -p android --profile preview
```

### Build iOS

```bash
# Build de produção na nuvem
pnpm build:ios

# Ou para build interno (development)
eas build -p ios --profile preview
```

### Build de Ambas as Plataformas

```bash
# Build de produção para iOS e Android
pnpm build:all

# Isso executará sequencialmente:
# - eas build -p ios --profile production
# - eas build -p android --profile production
```

### Perfis de Build

O projeto tem 3 perfis configurados em `eas.json`:

1. **development**: Build de desenvolvimento com dev client
2. **preview**: Build interno para testes (TestFlight/Play Internal Testing)
3. **production**: Build final para lojas

---

## 📤 Submissão para Lojas

### Google Play Store (Android)

```bash
# 1. Build de produção
pnpm build:android

# 2. Submissão automática
pnpm submit:android
```

**Requisitos**:
- Conta Google Play Developer ativa
- App criado no Google Play Console
- Service Account JSON configurado

### Apple App Store (iOS)

```bash
# 1. Build de produção
pnpm build:ios

# 2. Submissão automática
pnpm submit:ios
```

**Requisitos**:
- Conta Apple Developer ativa
- App criado no App Store Connect
- Certificados e Provisioning Profiles válidos
- App Store Connect API Key configurada

### Build e Submissão Combinados

```bash
# Android: Build local + Submit
pnpm build-and-submit:android:local

# iOS: Build local + Submit
pnpm build-and-submit:ios:local

# Ambas plataformas
pnpm submit:all
```

---

## 🔑 Configuração de Keystore (Android)

### Gerar Keystore

```bash
# Gere uma nova keystore
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore meubot-release.keystore \
  -alias meubot-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Você será solicitado a criar uma senha
# GUARDE ESSA SENHA COM SEGURANÇA!
```

### Configurar no EAS

Adicione ao `eas.json`:

```json
{
  "build": {
    "production": {
      "android": {
        "credentialsSource": "local",
        "releaseChannel": "production"
      }
    }
  }
}
```

Ou use credenciais gerenciadas pelo EAS:

```bash
eas credentials
```

---

## 🔍 Verificação Pré-Build

Antes de fazer build de produção, execute estes checks:

```bash
# 1. Verificar configuração Expo
pnpm run:doctor

# 2. Validar app.config
pnpm check:config

# 3. Rodar testes
pnpm test

# 4. Verificar TypeScript
pnpm tsc --noEmit

# 5. Rodar linter
pnpm lint
```

---

## 🐛 Troubleshooting

### Erro: "Could not find gradle"

```bash
# Solução: Instale o Gradle
brew install gradle  # macOS
# ou baixe em https://gradle.org/install/
```

### Erro: "Unable to find a destination matching the provided destination"

```bash
# iOS: Liste os simuladores disponíveis
xcrun simctl list devices

# Use um simulador válido
pnpm run:ios -- --device="iPhone 15 Pro"
```

### Erro: "ENOSPC: System limit for number of file watchers reached"

```bash
# Linux: Aumente o limite de watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Erro: "Execution failed for task ':app:processReleaseGoogleServices'"

```bash
# Verifique se google-services.json existe
ls -la android/app/google-services.json

# Se não existir, baixe do Firebase Console
# e coloque no caminho correto
```

### Erro: "CocoaPods could not find compatible versions"

```bash
# iOS: Limpe e reinstale pods
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Build trava em "Building JavaScript bundle"

```bash
# Limpe cache e reconstrua
pnpm clean
rm -rf node_modules
pnpm install
pnpm generate:soft
```

---

## 📊 Monitoramento de Builds

### Via EAS CLI

```bash
# Liste todos os builds
eas build:list

# Veja status de um build específico
eas build:view <build-id>

# Baixe um build completo
eas build:download <build-id>
```

### Via Dashboard

Acesse: https://expo.dev/accounts/[seu-username]/projects/meubot-mobile/builds

---

## 🔄 Versionamento

A cada build de produção, incremente a versão:

```bash
# Edite package.json
{
  "version": "4.4.0"  # Incremente aqui
}

# Edite app.config.ts
{
  version: "4.4.0",   # Mantenha sincronizado
  android: {
    versionCode: 44   # Incremente para cada build Android
  },
  ios: {
    buildNumber: "44" # Incremente para cada build iOS
  }
}
```

---

## 📞 Suporte

- **Documentação Expo**: https://docs.expo.dev/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Issues**: https://github.com/tarcisoamorim/chatwoot-mobile-app/issues

---

**Última atualização**: 2025-11-19
**Versão do documento**: 1.0
**Versão do app**: 4.4.0
