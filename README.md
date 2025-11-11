# Simbora - Plataforma de conexão de pessoas através de eventos/atividades

Plataforma web para descobrir, conectar e celebrar momentos incríveis com amigos e novas pessoas.

Este repositório contém os protótipos front-end convertidos em HTML/CSS, preparados para futura integração com Django.

---

## Estrutura do projeto

```
tela-cadastro-login/
├── index.html              # Central do Front-end (página de navegação)
├── auth.html               # Página de login/cadastro
├── static/                 # Arquivos estáticos (padrão Django)
│   ├── css/
│   │   ├── home.css        # Estilos da Central do Front-end
│   │   └── style.css       # Estilos da autenticação
│   ├── js/
│   │   └── script-form.js  # Scripts do formulário de login/cadastro
│   └── images/             # Imagens do projeto
│       └── img.webp        
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

---

## Como usar este repositório

### **Visualizar os protótipos**

Abra o arquivo `index.html` no navegador para acessar a **Central do Front-end**, onde você pode:
- Visualizar todos os módulos do projeto
- Ver o status de cada módulo (Concluído, Em Revisão, Em Andamento)
- Navegar para as páginas implementadas

```bash
# Abrir no navegador
open index.html

```
### **Estrutura CSS modular**

O projeto usa CSS modular para facilitar manutenção e integração com Django:

- **`home.css`** → Estilos da página inicial (Central do Front-end)
- **`style.css`** → Estilos da página de autenticação (Login/Cadastro)

**Ao criar novas páginas:**
1. Crie um novo arquivo CSS específico (ex: `perfil.css`, `eventos.css`)
2. Extraia estilos compartilhados para um `common.css` (futuro)
3. Importe apenas o CSS necessário em cada HTML

```html
<!-- Exemplo: nova página de perfil -->
<link rel="stylesheet" href="static/css/common.css">
<link rel="stylesheet" href="static/css/perfil.css">
```

---

## Páginas implementadas

### 1. **Central do Front-end** (`index.html`)
**Status:** Concluído

**Descrição:** Página principal de navegação entre todos os módulos do projeto.

**Recursos:**
- Cards de navegação para cada módulo
- Sistema de badges de status (Concluído, Em Revisão, Em Andamento)
- Legenda explicativa dos status
- Design responsivo
- Grid adaptativo

**Tecnologias:** HTML5, CSS3, Font Awesome 6.4.0

---

### 2. **Autenticação** (`auth.html`)
**Status:** Em revisão

**Descrição:** Tela de login e cadastro com transição suave entre formulários.

**Recursos:**
- Layout split-screen (50% imagem, 50% formulário)
- Formulário de cadastro (nome, email, senha)
- Formulário de login (email, senha)
- Transição animada entre formulários
- Inputs com ícones (Font Awesome)
- Imagem com overlay e filtro quente
- Card flutuante para formulário
- Design responsivo

**Tecnologias:** HTML5, CSS3, JavaScript, Font Awesome 6.4.0

---

## Como contribuir

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd tela-cadastro-login
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

3. **Desenvolva seguindo as convenções**
   - Crie arquivos CSS separados para novas páginas
   - Mantenha a paleta de cores consistente
   - Teste em diferentes resoluções

4. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona página de perfil"
   ```

5. **Push e crie Pull Request**
   ```bash
   git push origin feature/nome-da-feature
   ```

---

## Contato e suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

