# 🤖 AGENT.md — MeuTrampo

> Este arquivo serve como contexto persistente para agentes de IA que trabalham neste repositório.
> Ele descreve o projeto, a stack, a estrutura, as convenções e o roadmap.

---

## 📚 Contexto Acadêmico

| Campo               | Valor                                      |
|----------------------|--------------------------------------------|
| **Instituição**      | CEUB — Centro Universitário de Brasília     |
| **Curso**            | Ciência da Computação                       |
| **Disciplina**       | Projeto Integrador IV                       |
| **Objetivo**         | Desenvolver a aplicação ao longo das aulas  |
| **Repositório**      | `joaor-matos/meutrampo`                     |

---

## 🎯 Sobre o Projeto

**MeuTrampo** é uma plataforma web para criação de portfólios e perfis profissionais com links personalizáveis — similar ao conceito do Linktree, porém voltado para profissionais e empresas divulgarem seus trabalhos e contatos.

### Funcionalidades implementadas

- **Cadastro e Login** — autenticação com e-mail/senha via Supabase Auth
- **Gerenciamento de Links** — CRUD de links personalizados (título + URL) no Supabase
- **Perfil Público** — página pública acessível por `/:fullName` que exibe dados do usuário
- **Portfólio** — página de portfólio acessível por `/portfolio` e `/portfolio/:fullName`
- **Configurações** — painel para editar nome, biografia e gerenciar links
- **Landing Page** — página institucional em `/page` (em construção)
- **Persistência de sessão** — token armazenado em `sessionStorage`

### Design

- [Protótipo no Figma](https://www.figma.com/design/zNK82R8MZcWgBTyY87ZWLY/Cria%C3%A7%C3%A3o-de-Portf%C3%B3lio?node-id=0-1&p=f&t=Kz8gOUIPQQ3dUPk1-0)

---

## 🛠️ Stack Tecnológica

| Camada       | Tecnologia                        | Versão     |
|--------------|-----------------------------------|------------|
| **Frontend** | React                             | ^19.0.0    |
| **Build**    | Vite                              | ^6.2.0     |
| **Roteamento** | React Router DOM                | ^7.5.0     |
| **Backend/BaaS** | Supabase (Auth + Database)   | ^2.49.4    |
| **Linguagem** | JavaScript (JSX)                 | ES Modules |
| **Linting**  | ESLint                            | ^9.21.0    |

### Supabase

- **Auth** — cadastro e login com e-mail/senha, `user_metadata.fullName`
- **Database** — tabelas `profiles` (fullname, username) e `links` (id_link, link_title, link_url, created_at)
- **Client** — configurado em `src/assets/client.js`

---

## 📁 Estrutura do Projeto

```
meutrampo/
├── public/                    # Arquivos estáticos
├── documentação/              # Pasta para documentação (vazia por enquanto)
├── src/
│   ├── assets/                # Imagens, ícones e client Supabase
│   │   ├── client.js          # Configuração do Supabase client
│   │   ├── logo.png           # Logo principal
│   │   ├── logofooter.png     # Logo do footer
│   │   ├── Check.png/svg      # Ícone de confirmação
│   │   ├── delete.png         # Ícone de deletar
│   │   └── ...                # Demais assets
│   ├── pages/
│   │   ├── index.js           # Barrel file de exports
│   │   ├── Login_Cadastro.jsx # Página de login e cadastro
│   │   ├── Configuracao.jsx   # Painel de configurações do perfil
│   │   ├── Portfolio.jsx      # Página de portfólio público
│   │   ├── Teste.jsx          # Página de perfil dinâmico (/:fullName)
│   │   ├── PortfolioTeste.jsx # Variante de teste do portfólio
│   │   └── LandingPage.jsx    # Landing page institucional
│   ├── App.jsx                # Componente raiz com rotas
│   ├── main.jsx               # Entry point (React + BrowserRouter)
│   ├── App.css                # Estilos do App
│   ├── index.css              # Estilos globais
│   └── styles.css             # Estilos compartilhados dos componentes
├── index.html                 # HTML base
├── vite.config.js             # Configuração do Vite
├── eslint.config.js           # Configuração do ESLint
├── package.json               # Dependências e scripts
├── README.md                  # Documentação básica + link do Figma
└── AGENT.md                   # ← Este arquivo
```

---

## 🗺️ Rotas da Aplicação

| Rota                    | Componente        | Acesso     | Descrição                          |
|-------------------------|-------------------|------------|------------------------------------|
| `/`                     | `Login_Cadastro`  | Público    | Página de login e cadastro         |
| `/page`                 | `LandingPage`     | Público    | Landing page institucional         |
| `/:fullName`            | `Teste`           | Público    | Perfil público do usuário          |
| `/configuracao`         | `Configuracao`    | Protegido  | Painel de configurações            |
| `/portfolio`            | `Portfolio`       | Público    | Portfólio geral                    |
| `/portfolio/:fullName`  | `Portfolio`       | Público    | Portfólio por nome de usuário      |

---

## ⚙️ Setup Local

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint
```

> **Nota:** É necessário configurar as variáveis de ambiente do Supabase em `src/assets/client.js` (URL e anon key).

---

## 📐 Convenções de Código

- **Componentes** — PascalCase com extensão `.jsx` (ex: `Login_Cadastro.jsx`)
- **Estilos** — CSS puro em arquivos separados (`styles.css`, `App.css`, `index.css`)
- **Barrel exports** — `src/pages/index.js` exporta os componentes principais
- **State management** — `useState` e `useEffect` do React (sem Redux/Zustand)
- **Autenticação** — token gerenciado no `App.jsx` via `sessionStorage`
- **Banco de dados** — acesso direto via `@supabase/supabase-js` nos componentes

---

## 🚧 Roadmap / Próximos Passos

> Sugestões baseadas no estado atual do código:

- [ ] Completar a Landing Page (`LandingPage.jsx`)
- [ ] Implementar edição de nome e biografia na página de Configuração
- [ ] Conectar links dinâmicos na página de perfil público (`Teste.jsx`)
- [ ] Adicionar upload de foto de perfil
- [ ] Implementar proteção de rotas com redirect (ao invés de renderização condicional)
- [ ] Separar client Supabase de `assets/` para `src/lib/` ou `src/services/`
- [ ] Adicionar responsividade mobile
- [ ] Adicionar tratamento de erros mais amigável (toasts ao invés de `alert()`)
- [ ] Consolidar `Portfolio.jsx`, `PortfolioTeste.jsx` e `Teste.jsx` em um componente único
- [ ] Criar variáveis de ambiente (`.env`) para as keys do Supabase

---

## 🧠 Notas para o Agente

1. **Supabase é o backend.** Não existe API REST própria — tudo é feito via SDK do Supabase diretamente nos componentes React.
2. **A autenticação usa `sessionStorage`**, não `localStorage`. O token é perdido ao fechar o navegador.
3. **Existem componentes duplicados/de teste** (`Teste.jsx`, `PortfolioTeste.jsx`, `Portfolio.jsx`) que servem propósitos similares — considere consolidá-los ao refatorar.
4. **O CSS é global** em `styles.css` — não há CSS Modules nem styled-components.
5. **A pasta `documentação/` está vazia** — pode ser usada para artefatos da disciplina (diagramas, relatórios, etc).
6. **Este é um projeto acadêmico em desenvolvimento incremental** — novas features são adicionadas a cada aula do Projeto Integrador IV.
