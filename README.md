# 🔴⚫ CRF Store - E-Commerce Microservices

Sistema de e-commerce temático do Flamengo desenvolvido com arquitetura de microserviços, utilizando **.NET 9** no backend e **React + Vite** no frontend. Este projeto foi desenvolvido como parte de um desafio técnico para criar uma solução robusta e escalável.

> 🤖 **Nota:** O projeto simula uma loja oficial com produtos reais, integrando estoque, vendas, pagamentos e autenticação em um ecossistema distribuído.

---
## 🎬 Demonstração Visual

![Demonstração do Sistema](assets/demo.gif)


---
## 🚀 Como Executar o Projeto

### Pré-requisitos

- **.NET 9.0 SDK** instalado
- **Node.js** (v18+ recomendado)
- **Docker** instalado e rodando

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone <git@github.com:Arturgondim/ecommerce-microservices.git>
   cd ecommerce-microservices


2. **Execute o script de configuração:**:

   **No Windows (PowerShell)**:

   ```powershell
   ./Setup.ps1
   ```

   **No Linux/Mac (Bash)**:

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
3. **Iniciar a Aplicação:**

   **No Windows (PowerShell)**:

   ```powershell
   ./start-full.ps1
   ```

   **No Linux/Mac (Bash)**:

   ```bash
   chmod +x ./start-full.sh
   ./start-full.sh
   ```
4. **Acesso**
   - Frontend (Loja): http://localhost:5173

   - API Gateway: http://localhost:5144

   - RabbitMQ Management: http://localhost:15672 (Usuário: guest / Senha: guest)

5. **Acessar o Swagger do Gateway**
   - Abra seu navegador e acesse: `https://localhost:5144/swagger`
   - O Swagger do Gateway agrega todas as APIs (Inventory e Sales)
   - Você pode testar todos os endpoints diretamente pelo Swagger

### Credenciais de Teste

O sistema já vem com usuários pré-configurados:

- **Usuário Comum**:

  - Email: `torcedor@flamengo.com`
  - Senha: `Torcedor@123`

- **Gerente de Estoque**:
  - Email: `admin@flamengo.com`
  - Senha: `Admin@123`


### 🏗️ Arquitetura e Decisões Técnicas

    O sistema foi desenhado seguindo o padrão de Microserviços, garantindo desacoplamento e escalabilidade.

### Estrutura de pastas


```text
ecommerce-microservices/
├── src/
│   ├── Gateways/
│   │   └── ApiGateway/        # Ocelot Gateway (.NET 9)
│   ├── Services/
│   │   ├── Identity.API/      # Autenticação, Usuários e JWT
│   │   ├── Stock.API/         # Gestão de Produtos e Estoque (Consumer RabbitMQ)
│   │   ├── Sales.API/         # Gestão de Pedidos (Publisher RabbitMQ)
│   │   └── Payment.API/       # Processamento de Pagamentos (Simulação)
│   └── Web/
│       └── StoreFront/        # Frontend React + Tailwind CSS
└── docker-compose.yml         # Infraestrutura (SQL Server + RabbitMQ)
```
   

### ⚙️ Funcionalidades Implementadas
## 🔐 Identity.API (Segurança & Usuários)
- Autenticação JWT: Login seguro com geração de Token contendo Claims e Roles (Admin/Customer).

- Cadastro Completo: Registro de usuários com validação de senha forte, CPF e endereço detalhado.

- Integração ViaCEP: Preenchimento automático de endereço baseado no CEP.

- Recuperação de Senha: Simulação de fluxo de "Esqueci minha senha".

## 📦 Stock.API (Estoque & Admin)
- Catálogo Dinâmico: Listagem de produtos (Camisas, Ingressos, Acessórios).

- Painel Administrativo:

- Funcionalidade exclusiva para usuários Admin.

- Adicionar Produto: Formulário integrado para lançar novos itens.

- Excluir Produto: Botão de remoção rápida na vitrine.

- Seed Automático: Popula o banco com produtos reais do Flamengo e imagens ao iniciar.

- Consumer RabbitMQ: Ouve eventos de venda e atualiza a quantidade em estoque automaticamente   (Background Service).

## 🛒 Sales.API (Vendas)

- Gestão de Pedidos: Criação e processamento de compras.

- Validação Síncrona: Checagem de estoque em tempo real (HTTP) antes de confirmar a venda.

- Integração de Pagamento: Conexão com serviço de Pagamento (Gatekeeper).

- Publisher RabbitMQ: Notifica o sistema de forma assíncrona quando uma venda é concluída com sucesso.

## 💳 Payment.API (Pagamentos)
- Gateway Simulado: Validação de transações financeiras.

- Regras de Negócio: Aprovação ou recusa de pagamentos baseada em regras pré-definidas.

## 🌐 API Gateway (Ocelot)
- Ponto Único de Entrada: Todo o tráfego do Frontend passa por aqui.

- Roteamento Inteligente: Redirecionamento transparente para os microserviços (Stock, Sales, Identity).

- Segurança Centralizada: Validação de Tokens JWT e bloqueio de rotas não autorizadas.

## 💻 Frontend (StoreFront)
- Desenvolvido em React + Vite com estilização via Tailwind CSS.

- Design System Rubro-Negro: Identidade visual personalizada do Flamengo.

- Navegação SPA: Uso de React Router para transições fluidas sem recarregar a página.

- Carrinho de Compras: Gerenciamento de estado global via Context API (adicionar, remover, calcular   total).

- Área Logada:

- Detecção automática de usuário logado.

- Menu condicional (Entrar/Cadastrar ou Olá Usuário/Sair).

- Proteção de rotas e funcionalidades exclusivas de Admin.

## 📝 Licença
Este projeto foi desenvolvido com base em um desafio técnico da Avanade para demonstrar uma arquitetura completa de microserviços.