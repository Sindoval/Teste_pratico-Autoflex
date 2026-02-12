# 🚗 AutoFlex - Sistema de Gestão de Inventário e Produção

O **AutoFlex** é uma solução Full Stack moderna projetada para otimizar o fluxo de fabricação e controle de estoque de peças e materiais. O diferencial do sistema é o seu **Dashboard Inteligente**, que realiza o cruzamento de dados entre o estoque de matérias-primas e as receitas dos produtos para sugerir automaticamente o que pode ser fabricado no momento.

---

## 🛠️ Tecnologias e Ferramentas

### **Frontend**
* **React + TypeScript**: Interface reativa com tipagem estrita para evitar erros em tempo de execução.
* **Redux Toolkit**: Gerenciamento de estado global centralizado através de Slices (Inventory, Products, Suggestions).
* **Tailwind CSS**: Estilização moderna e utilitária.
* **Shadcn/UI**: Componentes de interface de alta qualidade e acessibilidade.
* **SweetAlert2**: Mensagens de feedback e diálogos de confirmação profissionais.
* **Lucide React**: Biblioteca de ícones consistente.

### **Backend**
* **Java + Spring Boot**: Arquitetura REST robusta e escalável.
* **Spring Data JPA**: Abstração de banco de dados e persistência.
* **Postgre**: Banco de dados relacional para armazenamento de dados críticos.

---

## 🏗️ Arquitetura de Dados

O sistema utiliza uma estrutura de "Receitas" onde cada produto é vinculado a múltiplos materiais. No Frontend, utilizamos o padrão de **Async Thunks** para garantir que a interface reflita exatamente o estado do banco de dados (Single Source of Truth).



---

## 🐳 Inicialização com Docker

O projeto está configurado para subir o ambiente completo (Frontend, Backend e Banco de Dados) utilizando containers.

### **Pré-requisitos**
* Docker e Docker Compose instalados.

### **Passo a Passo**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Sindoval/Teste_pratico-Autoflex.git](https://github.com/Sindoval/Teste_pratico-Autoflex.git)
    cd autoflex
    ```
2.  **Suba os containers:**
    Na raiz do projeto, execute:
    ```bash
    docker-compose up -d --build
    ```

3.  **Acesse as interfaces:**
    * **Frontend**: `http://localhost:5173`
    * **Backend API**: `http://localhost:8081`

---

## 📋 Funcionalidades Principais

* ✅ **Dashboard de Sugestões**: Insights automáticos de produção baseados no estoque atual.
* ✅ **Gestão de Inventário**: CRUD completo de materiais com controle de unidades de medida (`KG`, `GRAMS`, `LITERS`, etc).
* ✅ **Catálogo de Produtos**: Sistema de criação de produtos com receitas dinâmicas e vinculação de múltiplos insumos.
* ✅ **Segurança de Integridade**: Tratamento de erros de integridade referencial (impede a exclusão de materiais que compõem produtos ativos).

---

## 🧪 Status de Desenvolvimento: Testes

> 🚧 **EM DESENVOLVIMENTO**: A cobertura de testes automatizados é uma prioridade atual do roadmap.
>
>O projeto está em fase de expansão para incluir testes automatizados, focando em testes de integração no backend com JUnit e Mockito para validar as regras de cálculo de produção e integridade de dados, enquanto o frontend receberá cobertura de testes de componentes e integração de estados utilizando Vitest e React Testing Library, garantindo uma interface resiliente e livre de regressões.

---

## ✒️ Autor

* **Sindoval Alves** - *Desenvolvimento Full Stack*
* [LinkedIn](https://www.linkedin.com/in/sindoval-alves/)

---
