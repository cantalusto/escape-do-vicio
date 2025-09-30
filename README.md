# 🚭 Escape do Vício

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

##  

Uma aplicação web interativa e educacional desenvolvida para conscientizar jovens sobre os perigos dos cigarros eletrônicos (vapes) e fornecer estratégias práticas para escapar do vício. Combina gamificação, educação científica e suporte psicológico em uma experiência envolvente.

## 🎯 Objetivo do Projeto

Criar uma ferramenta educativa impactante que:

- **🎓 Eduque Cientificamente:** Informações baseadas em evidências sobre os riscos do vaping
- **🛡️ Prevenção Proativa:** Estratégias para resistir à pressão social
- **🚨 Conscientização Imediata:** Mostrar consequências reais do uso de vapes
- **💪 Empoderamento:** Ferramentas práticas para superar o vício
- **🌐 Acessibilidade Universal:** Suporte multilíngue e design inclusivo

## ✨ Funcionalidades Principais

### 🎮 **Jornada Gamificada de Aprendizado**
- **5 Desafios Progressivos:** Conteúdo educativo em sequência lógica
- **Sistema de Desbloqueio:** Cadeados que liberam conforme o progresso
- **Feedback Construtivo:** Explicações detalhadas para cada resposta
- **Progresso Visual:** Barras e indicadores de conclusão

### 🏃‍♂️ **Simulações Práticas Interativas**
- **Simulador Pulmonar:** Visualização do impacto respiratório
- **Cenários de Pressão Social:** Prática de resistência em situações reais
- **Classificação de Estratégias:** Identificação de técnicas eficazes vs. prejudiciais
- **Drag-and-Drop Educativo:** Aprendizado através de interação tátil

### 🌍 **Experiência Multilíngue**
- **Português Brasileiro:** Idioma nativo com localização cultural
- **Inglês Completo:** Tradução integral para alcance global
- **Troca Dinâmica:** Alternância suave entre idiomas
- **Contexto Cultural:** Adaptação de exemplos e referências

### 📱 **Design Responsivo e Acessível**
- **Mobile-First:** Experiência otimizada para smartphones
- **Tablet e Desktop:** Interface adaptável a todos os dispositivos
- **Animações Suaves:** Transições com Framer Motion
- **Navegação Intuitiva:** Fluxo de usuário claro e direto

## 🛠️ Stack Tecnológica

### **Frontend de Última Geração**
- **Framework:** Next.js 15 com App Router
- **UI Library:** React 19 com hooks modernos
- **Tipagem:** TypeScript para código robusto
- **Estilização:** Tailwind CSS 4 com design system

### **Experiência do Usuário**
- **Animações:** Framer Motion para transições fluidas
- **Ícones:** Lucide React para interface consistente
- **Interatividade:** React DnD para drag-and-drop
- **Performance:** Turbopack para desenvolvimento rápido

### **Arquitetura Escalável**
- **Componentização:** Estrutura modular e reutilizável
- **Gerenciamento de Estado:** Context API para estado global
- **Roteamento:** Next.js App Router com layouts aninhados
- **Internacionalização:** Sistema próprio de traduções

## 🚀 Implementação Rápida

### ⚡ **Pré-requisitos**
- Node.js 18.0+
- npm, yarn, pnpm ou bun

### 🛠️ **Configuração em 4 Passos**

1. **Clone o Repositório:**
```bash
git clone https://github.com/cantalusto/escape-do-vicio.git
cd escape-do-vicio
```

2. **Instalação de Dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execução do Servidor:**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesso à Aplicação:**
```
http://localhost:3000
```

## 🎯 Estrutura da Jornada Educativa

### **Parte 1: Fundamentos Científicos 🧪**
1. **Mitos vs. Fatos:** Desmistificando conceitos errados sobre vapes
2. **Composição Química:** Análise dos componentes nocivos
3. **Impacto Neurológico:** Efeitos da nicotina no cérebro jovem
4. **Consequências Respiratórias:** Danos ao sistema pulmonar
5. **Dependência Química:** Mecanismos do vício em nicotina

### **Parte 2: Habilidades Práticas 💪**
1. **Simulação Pulmonar:** Visualização interativa do impacto
2. **Resistência Social:** Técnicas para dizer "não"
3. **Estratégias de Enfrentamento:** Alternativas saudáveis
4. **Plano de Ação:** Passos concretos para mudança

## 🏗️ Arquitetura do Projeto

```
escape-do-vicio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # Página institucional
│   │   ├── game/              # Desafios educativos (Parte 1)
│   │   ├── game2/             # Atividades práticas (Parte 2)
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes reutilizáveis
│   │   ├── challenges/        # Componentes específicos de desafios
│   │   ├── ui/                # Componentes de interface
│   │   ├── Header.tsx         # Navegação global
│   │   └── ProgressBar.tsx    # Indicador de progresso
│   ├── contexts/              # Gerenciamento de estado
│   │   ├── GameContext.tsx    # Estado do jogo e progresso
│   │   └── LanguageContext.tsx # Gerenciamento de idiomas
│   └── lib/
│       └── translations.ts    # Sistema de internacionalização
├── public/                    # Assets estáticos
└── package.json              # Dependências e scripts
```

## 🌍 Público-Alvo e Impacto

### **👨‍🎓 Jovens e Adolescentes**
- Idade: 13-25 anos
- Foco: Prevenção primária e educação
- Abordagem: Linguagem acessível e relatable

### **👨‍👩‍👧‍👦 Pais e Educadores**
- Recursos informativos complementares
- Guias de conversa e abordagem
- Indicadores de alerta e apoio

### **🏫 Instituições de Ensino**
- Material educativo para escolas
- Atividades em grupo
- Capacitação de educadores

## 📊 Metodologia Educacional

### **🧠 Base Científica**
- Dados da OMS e ANVISA
- Pesquisas sobre tabagismo juvenil
- Evidências sobre dependência química

### **🎯 Abordagem Psicológica**
- Teoria da Mudança de Comportamento
- Técnicas de Terapia Cognitivo-Comportamental
- Estratégias de Redução de Danos

### **🕹️ Elementos de Gamificação**
- Progressão por níveis
- Sistema de recompensas
- Feedback imediato
- Metas alcançáveis

## 👨‍💻 Autor

**Lucas Cantarelli Lustosa**

[![GitHub](https://img.shields.io/badge/GitHub-Escape_do_Vício-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cantalusto/escape-do-vicio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Lucas_Cantarelli-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-cantarelli-lustosa-aab5492ba/)

---

**⚠️ Aviso Importante**: Este projeto tem fins exclusivamente educativos e preventivos. Não substitui acompanhamento médico ou psicológico profissional. Se você ou alguém que conhece precisa de ajuda com dependência química, procure profissionais de saúde qualificados.

Feito com ❤️ para uma juventude mais consciente e saudável.