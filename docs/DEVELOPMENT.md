# 🛠️ Guia de Desenvolvimento - meu.bot Mobile App

Este documento contém informações essenciais para desenvolvedores que vão trabalhar no projeto meu.bot mobile.

## 📋 Índice

- [Setup Inicial](#setup-inicial)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Testing](#testing)
- [Debug](#debug)
- [Git Workflow](#git-workflow)

---

## 🚀 Setup Inicial

### 1. Pré-requisitos

```bash
# Instale Node.js v20+
nvm install 20
nvm use 20

# Instale pnpm (gerenciador de pacotes)
npm install -g pnpm

# Instale Expo CLI
pnpm add -g expo-cli eas-cli

# Para desenvolvimento iOS (apenas macOS)
xcode-select --install

# Para desenvolvimento Android
# Instale Android Studio e configure ANDROID_HOME
```

### 2. Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/tarcisoamorim/chatwoot-mobile-app.git
cd chatwoot-mobile-app

# Instale dependências
pnpm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Para iOS (apenas macOS)
cd ios && pod install && cd ..
```

### 3. Rode o App

```bash
# Inicie o Metro bundler
pnpm start

# Em outro terminal:
# iOS
pnpm run:ios

# Android
pnpm run:android

# Web (para preview rápido)
pnpm start -- --web
```

---

## 📁 Estrutura do Projeto

```
chatwoot-mobile-app/
├── src/
│   ├── components/          # Componentes compartilhados (renomeado de components-next)
│   │   ├── button/         # Componentes de botão
│   │   ├── common/         # Componentes comuns (Avatar, Spinner, etc)
│   │   ├── list-components/# Componentes de lista
│   │   └── ...
│   ├── screens/            # Telas do app
│   │   ├── auth/          # Telas de autenticação
│   │   ├── chat-screen/   # Tela principal de chat
│   │   ├── conversations/ # Lista de conversas
│   │   ├── inbox/         # Inbox/notificações
│   │   └── settings/      # Configurações
│   ├── navigation/         # Navegação (React Navigation v7)
│   ├── store/             # Redux Toolkit state
│   │   ├── conversation/  # State de conversas
│   │   ├── notification/  # State de notificações
│   │   ├── auth/          # State de autenticação
│   │   └── ...
│   ├── utils/             # Funções utilitárias
│   │   ├── audioConverter.ios.ts    # Conversão de áudio iOS
│   │   ├── audioConverter.android.ts# Conversão de áudio Android
│   │   └── ...
│   ├── hooks/             # Custom hooks
│   ├── context/           # React contexts
│   ├── constants/         # Constantes do app
│   ├── i18n/             # Internacionalização (pt_BR, en)
│   ├── theme/            # Temas e estilos (Tailwind + NativeWind)
│   ├── types/            # TypeScript types
│   └── svg-icons/        # Ícones SVG
├── assets/               # Imagens, fontes, etc
├── android/             # Código nativo Android
├── ios/                 # Código nativo iOS
├── docs/                # Documentação
├── .storybook/         # Configuração Storybook
├── app.config.ts       # Configuração Expo
├── eas.json            # Configuração EAS Build
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configuração TypeScript
```

---

## 🔧 Tecnologias Utilizadas

### Core

- **React Native**: 0.76.9
- **React**: 19.2.0
- **Expo SDK**: 52
- **TypeScript**: 5.7.2

### State Management

- **Redux Toolkit**: 2.5.0
- **React Redux**: 9.2.0
- **Redux Persist**: Persistência de state

### Navegação

- **React Navigation v7**: 7.1.20
  - Stack Navigator
  - Tab Navigator
  - Deep Linking configurado

### UI/Styling

- **NativeWind (Tailwind)**: 4.1.23
- **React Native Reanimated**: 4.1.5
- **React Native Gesture Handler**: 2.21.2
- **FlashList**: 1.7.2 (listas otimizadas)

### Formulários e Validação

- **React Hook Form**: 7.54.2
- **Zod**: Validação de schemas

### Mídia e Assets

- **Expo Image**: Carregamento otimizado de imagens
- **Expo AV**: Reprodução de áudio/vídeo
- **FFmpeg Kit**: Conversão de áudio (OGG→WAV)
- **React Native Image Crop Picker**: Seleção de imagens

### Networking

- **Axios**: 1.13.2
- **WebSockets**: Para chat em tempo real

### Push Notifications

- **Expo Notifications**: Push notifications
- **Firebase Cloud Messaging**: Backend de notificações

### Monitoramento

- **Sentry**: 7.6.0 (error tracking)
- **React Native Performance**: Monitoramento de performance

### Development Tools

- **Storybook**: Desenvolvimento de componentes isolados
- **Jest**: Testing framework
- **ESLint**: Linting
- **Prettier**: Code formatting

---

## 🔄 Workflow de Desenvolvimento

### 1. Branching Strategy

```bash
# Branch principal
main - Código de produção

# Branches de feature
feature/nome-da-feature

# Branches de fix
fix/descricao-do-bug

# Branches Claude (geradas automaticamente)
claude/descricao-sessionid
```

### 2. Criar Nova Feature

```bash
# 1. Crie uma branch a partir da main
git checkout main
git pull origin main
git checkout -b feature/minha-feature

# 2. Desenvolva e teste
pnpm start
# Faça suas alterações

# 3. Rode testes e linter
pnpm test
pnpm lint

# 4. Commit seguindo convenção
git add .
git commit -m "feat: adiciona minha feature

- Implementa funcionalidade X
- Adiciona testes para Y
- Atualiza documentação Z"

# 5. Push e crie PR
git push -u origin feature/minha-feature
# Crie Pull Request no GitHub
```

### 3. Convenção de Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <descrição curta>

[corpo opcional]

[rodapé opcional]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `perf`: Melhoria de performance
- `refactor`: Refatoração de código
- `docs`: Alterações em documentação
- `style`: Formatação de código
- `test`: Adição/alteração de testes
- `chore`: Tarefas de manutenção

**Exemplos:**

```bash
feat: adiciona conversão de áudio no Android

- Implementa convertOggToWav e convertAacToWav
- Adiciona integração com FFmpeg
- Corrige bug de áudio quebrado

fix: corrige re-renders excessivos na lista de mensagens

- Adiciona React.memo ao MessageComponent
- Implementa useMemo para grouping de mensagens
- Reduz 85% dos re-renders desnecessários
```

---

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ BOM: Tipos explícitos
interface MessageProps {
  id: number;
  content: string;
  senderId: number;
  timestamp: number;
}

const Message: React.FC<MessageProps> = ({ id, content }) => {
  return <Text>{content}</Text>;
};

// ❌ RUIM: Tipos implícitos
const Message = ({ id, content }) => {
  return <Text>{content}</Text>;
};
```

### React Hooks

```typescript
// ✅ BOM: Dependencies corretas
useEffect(() => {
  fetchConversation(conversationId);
}, [conversationId, fetchConversation]);

// ❌ RUIM: Disable de exhaustive-deps sem justificativa
useEffect(() => {
  fetchConversation(conversationId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

### Performance

```typescript
// ✅ BOM: Memoização para computações pesadas
const messagesWithGrouping = useMemo(() => {
  return groupMessages(messages);
}, [messages]);

// ✅ BOM: React.memo para componentes complexos
export const MessageComponent = React.memo(
  (props: MessageProps) => { ... },
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id;
  }
);

// ❌ RUIM: Recalcular em cada render
const messagesWithGrouping = groupMessages(messages);
```

### Naming Conventions

```typescript
// Componentes: PascalCase
MessageComponent
ChatScreen
AvatarImage

// Funções/variáveis: camelCase
fetchConversation
conversationId
isLoading

// Constantes: UPPER_SNAKE_CASE
MAX_FILE_SIZE
API_BASE_URL
DEFAULT_TIMEOUT

// Types/Interfaces: PascalCase
interface UserProfile { }
type MessageType = 'text' | 'file';

// Files:
// - Components: PascalCase (Message.tsx)
// - Utils: camelCase (audioConverter.ts)
// - Hooks: camelCase (useAppKeyboardAnimation.ts)
```

---

## 🧪 Testing

### Rodar Testes

```bash
# Todos os testes
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage
pnpm test -- --coverage

# Teste específico
pnpm test -- MessageComponent
```

### Estrutura de Teste

```typescript
// MessageComponent.test.tsx
import { render, screen } from '@testing-library/react-native';
import { MessageComponent } from './Message';

describe('MessageComponent', () => {
  it('deve renderizar mensagem de texto', () => {
    const props = {
      item: {
        id: 1,
        content: 'Hello',
        messageType: 'incoming',
      },
      index: 0,
      isEmailInbox: false,
      currentUserId: 1,
    };

    render(<MessageComponent {...props} />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('não deve re-renderizar com mesmas props', () => {
    const { rerender } = render(<MessageComponent {...props} />);
    const renderCount = jest.fn();

    // Adicione lógica de teste...
  });
});
```

---

## 🐛 Debug

### React Native Debugger

```bash
# Instale React Native Debugger
brew install --cask react-native-debugger  # macOS

# Ou baixe em:
# https://github.com/jhen0409/react-native-debugger/releases
```

### Flipper (Recomendado)

```bash
# Já integrado no projeto
# Abra Flipper Desktop e conecte ao app
```

### Console Logs

```typescript
// ✅ BOM: Use console.log para debug local
console.log('[MessageComponent] Rendering with props:', props);

// ⚠️ ATENÇÃO: Remova console.logs antes de commit de produção
// Use __DEV__ para logs condicionais:
if (__DEV__) {
  console.log('Debug info:', data);
}
```

### Redux DevTools

```bash
# Instale extensão no Chrome
# Redux DevTools será habilitado automaticamente em desenvolvimento
```

### Sentry (Produção)

```typescript
// Erros são automaticamente reportados ao Sentry
import * as Sentry from '@sentry/react-native';

try {
  // código que pode falhar
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

---

## 🔄 Git Workflow

### Pull Requests

1. **Crie branch descritiva**
2. **Desenvolva e teste**
3. **Rode checks localmente**:
   ```bash
   pnpm lint
   pnpm test
   pnpm tsc --noEmit
   ```
4. **Commit com mensagem clara**
5. **Push e crie PR**
6. **Aguarde review**

### Code Review Checklist

- [ ] Código segue padrões do projeto
- [ ] Testes passando
- [ ] TypeScript sem erros
- [ ] Sem console.logs em produção
- [ ] Performance otimizada (useMemo/useCallback onde necessário)
- [ ] Documentação atualizada
- [ ] Commits seguem convenção

---

## 📚 Recursos Úteis

### Documentação

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation v7](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NativeWind](https://www.nativewind.dev/)

### Ferramentas

- [Expo Snack](https://snack.expo.dev/) - Playground online
- [React Native Directory](https://reactnative.directory/) - Bibliotecas
- [Expo Icons](https://icons.expo.fyi/) - Ícones disponíveis

---

## 🆘 Problemas Comuns

### Metro bundler trava

```bash
pnpm clean
rm -rf node_modules
pnpm install
```

### Cache de build corrompido

```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && rm -rf Pods && pod install && cd ..

# Expo
expo prebuild --clean
```

### Tipos TypeScript não encontrados

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm tsc --noEmit
```

---

## 📞 Contato

- **Repositório**: https://github.com/tarcisoamorim/chatwoot-mobile-app
- **Issues**: https://github.com/tarcisoamorim/chatwoot-mobile-app/issues
- **Documentação**: `/docs`

---

**Última atualização**: 2025-11-19
**Versão**: 1.0
