<div align="center">

# ☀️ Solar Smart

### Sistema de Otimização e Monitoramento de Painéis Solares

*Monitore, analise e otimize o desempenho do seu sistema fotovoltaico em tempo real.*

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/licença-MIT-blue?style=for-the-badge)

</div>

---

## 📋 Sobre o Projeto

O **Solar Smart** é um sistema web desenvolvido para o monitoramento inteligente e a otimização de painéis solares fotovoltaicos. A plataforma permite que usuários e gestores acompanhem em tempo real o desempenho energético de seus sistemas, identifiquem falhas, analisem perdas de eficiência e planejem manutenções preventivas — tudo em um único painel de controle moderno e intuitivo.

O objetivo central é **maximizar a eficiência energética** e **reduzir custos operacionais** por meio de dados precisos, históricos de desempenho e alertas automáticos.

---

## ⚡ Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| 📡 **Monitoramento em Tempo Real** | Acompanhe a geração de energia, tensão, corrente e temperatura dos painéis ao vivo |
| 📊 **Dashboard Analítico** | Visualize indicadores de desempenho com gráficos interativos e métricas consolidadas |
| 🗂️ **Histórico de Dados** | Acesse e filtre registros históricos de geração e consumo energético por período |
| 🚨 **Identificação de Falhas** | Receba alertas automáticos sobre anomalias, quedas de desempenho e falhas nos painéis |
| 📄 **Relatórios e Indicadores** | Gere relatórios detalhados com exportação de dados e indicadores de eficiência (KPIs) |
| 🔧 **Manutenção Preventiva** | Planeje e registre manutenções com base em alertas e histórico de ocorrências |
| 🌐 **Simulação de Desempenho** | Simule cenários e estime a produção energética com base em parâmetros configuráveis |

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **HTML5** — Estrutura semântica das páginas
- **CSS3** — Estilização, responsividade e animações
- **JavaScript (ES6+)** — Lógica de interface e consumo de APIs
- **Bootstrap 5** — Framework de layout responsivo
- **Google Fonts** — Tipografias Syne e DM Sans

### Back-end & Dados
- **Node.js** — Servidor e processamento de dados
- **SQL** — Banco de dados relacional para histórico e registros
- **API REST** — Comunicação entre front-end e back-end
- **Supabase** — Backend-as-a-Service para autenticação e banco de dados

### Ferramentas
- **Git & GitHub** — Controle de versão e colaboração

---

## 🚀 Instruções de Execução Local

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/anajuliaberzin/solar-smart.git
```

**2. Acesse a pasta do projeto**

```bash
cd solar-smart
```

**3. Instale as dependências**

```bash
npm install
```

**4. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais (Supabase, etc.).

**5. Execute o projeto em modo de desenvolvimento**

```bash
npm run dev
```

**6. Acesse no navegador**

```
http://localhost:5500
```

> **Alternativa rápida (sem Node.js):** abra diretamente o arquivo `index.html` no navegador ou utilize a extensão **Live Server** do VS Code.

---

## 📁 Estrutura de Pastas

```
solar-smart/
│
├── css/
│   └── style.css               # Estilos globais da aplicação
│
├── js/
│   ├── auth.js                 # Lógica de autenticação
│   ├── cliente.js              # Gerenciamento de clientes
│   ├── dashboard.js            # Lógica do dashboard
│   ├── login.js                # Controle de login
│   ├── ocorrencias.js          # Gerenciamento de ocorrências
│   ├── relatorios.js           # Geração de relatórios
│   └── supabase.js             # Configuração do cliente Supabase
│
├── index.html                  # Página inicial / landing page
├── login.html                  # Tela de autenticação
├── dashboard.html              # Painel principal de monitoramento
├── simulacao.html              # Simulador de desempenho
├── relatorios.html             # Relatórios e exportações
├── ocorrencias.html            # Registro de falhas e ocorrências
├── cliente.html                # Área do cliente
├── configuracoes.html          # Configurações do sistema
│
├── .env.example                # Modelo de variáveis de ambiente
├── README.md                   # Documentação do projeto
└── package.json                # Dependências e scripts do projeto
```

---

## 👥 Integrantes do Grupo

| Nome | 
|---|---|
| Ana Julia Berzin |
| Eros Henrique Ferreira Vasconcelos |
| Gabriel Henrique de Oliveira |
| Jhenifer Beatriz Quirino Dos Santos |
| Luiz Henrique de França Aranha |
| Pedro Veloso Santiago Lima |

---