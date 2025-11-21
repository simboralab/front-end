# 📝 Guia de Tipografia - Simbora

## 🎨 Fontes Utilizadas

### 1. **Roboto Condensed**
- **Uso:** Títulos e cabeçalhos
- **Características:** Condensada, geométrica, moderna
- **Variável CSS:** `--font-heading`

### 2. **Poppins**
- **Uso:** Corpo de texto, formulários, interface
- **Características:** Sans-serif, arredondada, legível
- **Variável CSS:** `--font-body`

---

## 📊 Hierarquia Tipográfica

### 🎯 **TÍTULOS - Roboto Condensed**

| Elemento | Fonte | Tamanho | Peso | Letter-spacing | Quando Usar |
|----------|-------|---------|------|----------------|-------------|
| **H1** (Títulos principais) | Roboto Condensed | 40px | 700 | -0.03em | Títulos de formulários, páginas principais |
| **H2** (Hero text) | Roboto Condensed | 40px | 700 | -0.02em | Textos hero em imagens de fundo |
| **H3** | Roboto Condensed | - | 700 | -0.02em | Subtítulos, seções |

**Exemplos:**
- "Crie sua conta" (formulário)
- "Que bom te ver de volta!" (login)
- "Descubra. Conecte-se. Celebre." (hero text)

---

### 📄 **CORPO DE TEXTO - Poppins**

| Elemento | Fonte | Tamanho | Peso | Quando Usar |
|----------|-------|---------|------|-------------|
| **Parágrafos** | Poppins | 17px | 400 | Textos descritivos em formulários |
| **Hero text (p)** | Poppins | 18px | 300 | Textos hero em imagens |
| **Body padrão** | Poppins | 16px | 400 | Texto geral da página |

---

### 📝 **FORMULÁRIOS - Poppins**

| Elemento | Fonte | Tamanho | Peso | Quando Usar |
|----------|-------|---------|------|-------------|
| **Labels** | Poppins | 15px | 500 | Labels de campos de formulário |
| **Inputs** | Poppins | 16px | 400 | Campos de entrada (text, email, password) |
| **Placeholders** | Poppins | 16px | 400 | Textos de placeholder |
| **Select/Textarea** | Poppins | 16px | 400 | Dropdowns e áreas de texto |

---

### 🔘 **BOTÕES E AÇÕES - Poppins**

| Elemento | Fonte | Tamanho | Peso | Letter-spacing | Quando Usar |
|----------|-------|---------|------|----------------|-------------|
| **Botões principais** | Poppins | 16px | 600 | 0.8px | Botões de ação (CADASTRE-SE, ENTRAR) |
| **Botões gerais** | Poppins | 16px | 600 | 0.02em | Outros botões |
| **Links de ação** | Poppins | - | 600 | - | Links que são botões (btn-link) |

---

### 🔗 **LINKS E NAVEGAÇÃO - Poppins**

| Elemento | Fonte | Tamanho | Peso | Quando Usar |
|----------|-------|---------|------|-------------|
| **Links gerais** | Poppins | - | 500 | Links de navegação |
| **Links no footer** | Poppins | 15px | 600 | Links no rodapé |

---

### 📌 **RODAPÉ E INFORMAÇÕES LEGAIS - Poppins**

| Elemento | Fonte | Tamanho | Peso | Cor | Quando Usar |
|----------|-------|---------|------|-----|-------------|
| **Texto alternância** (form-switch) | Poppins | 15px | 400 | Cinza escuro (#4A5568) | "Ainda não tem conta?" |
| **Links legais** (legal-links) | Poppins | 13px | 400 | Cinza médio (#A0AEC0) | "Termos de Serviço · Política" |
| **Footer texto** | Poppins | 15px | 400 | Cinza escuro | Textos gerais no footer |

---

### 💬 **MENSAGENS E FEEDBACK - Poppins**

| Elemento | Fonte | Tamanho | Peso | Quando Usar |
|----------|-------|---------|------|-------------|
| **Mensagens de erro** | Poppins | 12px | 400 | Validação de formulários |
| **Mensagens de sucesso** | Poppins | 12px | 400 | Confirmações |

---

## ⚡ Resumo Rápido

### ✅ **Quando usar Roboto Condensed:**
- ✅ Títulos principais (H1, H2, H3)
- ✅ Textos hero em imagens de fundo
- ✅ Elementos que precisam de impacto visual

### ✅ **Quando usar Poppins:**
- ✅ Todo o resto: corpo de texto, formulários, botões, links, footer, mensagens

---

## 🎨 Variáveis CSS Disponíveis

```css
--font-heading: 'Roboto Condensed', sans-serif;
--font-body: 'Poppins', sans-serif;
--font-size-base: 16px;
--font-size-small: 14px;
--font-size-title: 32px;
--font-size-subtitle: 18px;
```

---

## 📋 Regra Geral

**🎯 Títulos = Roboto Condensed** (700, letter-spacing negativo)  
**📝 Todo o resto = Poppins** (pesos variam conforme elemento)

---

*Este guia garante consistência visual em todo o projeto Simbora.*

