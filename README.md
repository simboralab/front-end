# Simbora App | Front-end

Plataforma web para descobrir, conectar e celebrar momentos incríveis com amigos e novas pessoas.

Este repositório contém os protótipos front-end convertidos em HTML/CSS, preparados para futura integração com Django.

---

## Como contribuir

1. **Clone o repositório**

- Acesse o terminal e digite o comando: 
  
   ```bash
   git clone https://github.com/simboralab/front-end.git
 
   ```
- Abra o projeto no VSCode 
  
2. **Crie uma branch para sua feature**

- Abra o terminal do VSCode 
  
   ```bash
   git checkout -b <nome-da-sua-branch>
   ```

  *O nome da branch deve representar o que você está fazendo: Exemplo - feat/pagina-editar-perfil*

3. **Desenvolva seguindo as convenções**
   - Crie arquivos CSS separados para novas páginas
   - Mantenha a paleta de cores consistente
   - Teste em diferentes resoluções
   - Use classes no HTML ao invés de `:has()` para compatibilidade com navegadores antigos

4. **Commit suas mudanças**
   ```bash
   git add <nome_do_arquivo>
   git commit -m "<coloque-a-msg>"
   ```

5. **Push e crie Pull Request**
   ```bash
   git push origin <nome-da-sua-branch>
   ```

---

## Estrutura do projeto

```
front-end/
├── index.html              # Central do Front-end (página de navegação)
├── account.html            # Página de login/cadastro
├── create-event.html       # Página de criar evento
├── edit-profile.html       # Página de editar perfil
├── event-details.html      # Página de detalhes do evento
├── static/                 # Arquivos estáticos (padrão Django)
│   ├── css/
│   │   ├── style.css       # Estilos gerais/compartilhados
│   │   ├── account.css     # Estilos específicos da autenticação
│   │   ├── home.css        # Estilos da Central do Front-end
│   │   ├── create-event.css # Estilos da página criar evento
│   │   ├── edit-profile.css # Estilos da página editar perfil
│   │   └── event-details.css # Estilos da página detalhes do evento
│   ├── js/
│   │   ├── script-form.js  # Scripts de alternância entre login/cadastro
│   │   ├── validation.js   # Validação de formulários
│   │   ├── create-event.js # Scripts da página criar evento
│   │   └── event-details.js # Scripts da página detalhes do evento
│   └── img/                # Imagens do projeto
│       ├── logo/
│       │   ├── marca_azul.png
│       │   └── marca_verde.png
│       └── bg-acesso-amigos-grupo.jpg
├── docs/                   # Documentação
│   └── guia-tipografia.md  # Guia de tipografia do projeto
├── package.json            # Configuração do projeto Node.js
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

---

## Como usar este repositório

### **Opção 1: Desenvolvimento com Live Reload (Recomendado)**

Para ter atualização automática ao salvar arquivos:

```bash
# Instalar dependências (primeira vez)
npm install

# Iniciar servidor com live reload
npm start
```

O servidor abrirá automaticamente em `http://localhost:8080` e recarregará a página sempre que você salvar alterações em HTML, CSS ou JavaScript.

**Scripts disponíveis:**
- `npm start` - Inicia o servidor e abre automaticamente o `index.html`
- `npm run dev` - Inicia o servidor monitorando todos os arquivos

### **Opção 2: Visualização Simples**

Abra o arquivo `index.html` no navegador para acessar a **Central do Front-end**, onde você pode:
- Visualizar todos os módulos do projeto
- Ver o status de cada módulo (Concluído, Em Revisão, Em Andamento)
- Navegar para as páginas implementadas

```bash
# Abrir no navegador
open index.html
```

---

## Estrutura CSS modular

O projeto usa CSS modular para facilitar manutenção e integração com Django:

### **Arquivos CSS:**

- **`style.css`** → Estilos gerais/compartilhados
  - Variáveis CSS (`:root`)
  - Reset e base
  - Tipografia geral
  - Componentes de formulário reutilizáveis (`.input-group`, `.input-container`, `.row-inputs`, `.checkbox-container`)
  - Botões compartilhados (`.btn-primary`, `.btn-cancel`)
  - Header (`.main-header`)
  - Componentes compartilhados (tags, disclaimer, footer)
  - Validação geral

- **`account.css`** → Estilos específicos da página de autenticação (Login/Cadastro)
  - Layout split-screen (50% imagem, 50% formulário)
  - Elementos visuais específicos (`.image-section`, `.hero-text`, `.logo-overlay`)
  - Formulários de autenticação (`.form-card`, `.form-wrapper`)
  - Transições entre login e cadastro
  - Responsividade específica da autenticação

- **`home.css`** → Estilos da página inicial (Central do Front-end)

- **`create-event.css`** → Estilos da página criar evento

- **`edit-profile.css`** → Estilos da página editar perfil

- **`event-details.css`** → Estilos da página detalhes do evento

**Ao criar novas páginas:**
1. Crie um novo arquivo CSS específico (ex: `perfil.css`, `eventos.css`)
2. Use `style.css` para estilos compartilhados
3. Importe apenas o CSS necessário em cada HTML

```html
<!-- Exemplo: nova página -->
<link rel="stylesheet" href="static/css/style.css">
<link rel="stylesheet" href="static/css/sua-pagina.css">
```

---

## Compatibilidade de navegadores

O projeto foi desenvolvido com foco em compatibilidade ampla:

- ✅ **Navegadores modernos**: Chrome, Firefox, Safari, Edge (últimas versões)
- ✅ **Navegadores antigos**: IE11+, Safari 9+, Chrome 49+, Firefox 31+
- ✅ **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile

### **Boas práticas implementadas:**

- ❌ **Evitado**: `:has()` CSS selector (suporte limitado)
- ✅ **Usado**: Classes no HTML (`body.has-header`) para compatibilidade
- ✅ **Box-sizing**: `border-box` aplicado para evitar overflow
- ✅ **Media queries**: Responsividade testada em múltiplos breakpoints

---

## Páginas implementadas

### 1. **Central do Front-end** (`index.html`)
**Status:** ✅ Concluído

**Descrição:** Página principal de navegação entre todos os módulos do projeto.

**Recursos:**
- Cards de navegação para cada módulo
- Sistema de badges de status (Concluído, Em Revisão, Em Andamento)
- Legenda explicativa dos status
- Design responsivo
- Grid adaptativo

**Tecnologias:** HTML5, CSS3, Material Symbols

---

### 2. **Autenticação** (`account.html`)
**Status:** ✅ Concluído

**Descrição:** Tela de login e cadastro com transição suave entre formulários.

**Recursos:**
- Layout split-screen (50% imagem, 50% formulário)
- Formulário de cadastro completo (nome, sobrenome, email, data de nascimento, gênero, senha)
- Formulário de login (email, senha)
- Transição animada entre formulários (desktop)
- Alternância simples no mobile (sem transformações)
- Inputs com ícones (Material Symbols)
- Validação de formulários em JavaScript
- Link do logo Simbora para página inicial
- Design totalmente responsivo

**Arquivos relacionados:**
- `static/css/account.css` - Estilos específicos da autenticação
- `static/css/style.css` - Estilos compartilhados de formulários
- `static/js/script-form.js` - Alternância entre formulários
- `static/js/validation.js` - Validação de campos

**Tecnologias:** HTML5, CSS3, JavaScript, Material Symbols

---

### 3. **Criar Evento** (`create-event.html`)
**Status:** 🔍 Em Revisão

**Descrição:** Página para criação de novos eventos.

**Recursos:**
- Formulário completo de criação de evento
- Upload de imagem de capa
- Sistema de tags
- Validação de campos
- Design responsivo

**Arquivos relacionados:**
- `static/css/create-event.css`
- `static/js/create-event.js`

---

### 4. **Editar Perfil** (`edit-profile.html`)
**Status:** 🔍 Em Revisão

**Descrição:** Página para visualizar e editar perfil do usuário.

**Recursos:**
- Formulário de edição de perfil
- Upload de foto de perfil
- Toggles de preferências
- Design responsivo

**Arquivos relacionados:**
- `static/css/edit-profile.css`

---

### 5. **Detalhes do Evento** (`event-details.html`)
**Status:** 🔍 Em Revisão

**Descrição:** Página para visualizar detalhes completos de um evento.

**Recursos:**
- Banner do evento
- Informações detalhadas (local, data, horário)
- Sistema de confirmação de presença
- Lista de participantes
- Informações do host
- Compartilhamento social
- Design responsivo

**Arquivos relacionados:**
- `static/css/event-details.css`
- `static/js/event-details.js`

---

## Correções e melhorias recentes

### ✅ Correções de bugs

1. **Bug mobile - Página de login em branco**
   - Problema: Ao clicar em "Faça login" no mobile, a página aparecia em branco
   - Solução: Desabilitadas transformações CSS no mobile, mantendo apenas alternância via classe `.active`

2. **Espaço acima da imagem no mobile**
   - Problema: Espaço indesejado acima da imagem na versão mobile
   - Solução: Ajustado alinhamento do `body` e removidos espaçamentos padrão

3. **Conflito de variáveis JavaScript**
   - Problema: Erro `Identifier 'loginForm' has already been declared`
   - Solução: Renomeada variável em `validation.js` de `loginForm` para `loginFormElement`

4. **Compatibilidade com navegadores antigos**
   - Problema: Uso de `:has()` CSS selector com suporte limitado
   - Solução: Substituído por classes no HTML (`body.has-header`)

5. **Background desconexo na página de detalhes**
   - Problema: Partes do background aparecendo em laranja claro
   - Solução: Ajustado background para `var(--cinza-claro)` e adicionados backgrounds brancos consistentes

6. **Link do logo Simbora**
   - Problema: Logo não redirecionava para página inicial
   - Solução: Adicionado link `<a href="index.html">` ao redor da imagem

### ✅ Melhorias de organização

1. **Separação de CSS**
   - Criado `account.css` para estilos específicos da autenticação
   - Mantido `style.css` apenas com estilos gerais/compartilhados
   - Melhor organização e manutenibilidade

2. **Responsividade**
   - Ajustados espaçamentos em diferentes breakpoints
   - Melhorada experiência mobile
   - Prevenção de overflow em campos de formulário

---

## Guia de desenvolvimento

### **Convenções de código**

1. **CSS:**
   - Use variáveis CSS do `:root` em `style.css`
   - Crie arquivos CSS específicos para cada página
   - Mantenha estilos compartilhados em `style.css`
   - Use `box-sizing: border-box` em containers

2. **JavaScript:**
   - Evite conflitos de nomes de variáveis entre arquivos
   - Use nomes descritivos e específicos
   - Documente funções complexas

3. **HTML:**
   - Use classes semânticas
   - Adicione `aria-label` em links e botões importantes
   - Mantenha estrutura acessível

### **Testes recomendados**

Antes de fazer commit, teste:
- ✅ Desktop (1920px, 1366px, 1280px)
- ✅ Tablet (768px, 1024px)
- ✅ Mobile (375px, 414px)
- ✅ Alternância entre formulários (login/cadastro)
- ✅ Validação de campos
- ✅ Links e navegação

---

## Contato e suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de desenvolvimento.

---
