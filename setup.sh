#!/bin/bash

# Cores para o terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${RED}🔴⚫ INICIANDO CONFIGURAÇÃO DO AMBIENTE CRF STORE (LINUX)...${NC}"

# 1. Verificar Pré-requisitos
echo -e "${YELLOW}--> Verificando Ferramentas:${NC}"
dotnet --version
node -v
docker --version
echo "----------------------------------------------------"

# 2. Restaurar Pacotes do Back-end (.NET)
echo -e "${CYAN}📦 1/4 - Restaurando pacotes do Back-end (Nuget)...${NC}"
dotnet restore Ecommerce.sln

if [ $? -ne 0 ]; then
    echo -e "${RED}Falha ao restaurar .NET${NC}"
    exit 1
fi

# 3. Restaurar Ferramentas Locais
echo -e "${CYAN}🛠️ 2/4 - Configurando Ferramentas (.NET Tools)...${NC}"
dotnet tool restore

# 4. Instalar Dependências do Front-end (React)
echo -e "${CYAN}⚛️ 3/4 - Instalando dependências do Front-end (NPM)...${NC}"
cd src/Web/StoreFront
npm install
cd ../../.. # Volta para a raiz

# 5. Preparar Docker
echo -e "${CYAN}🐳 4/4 - Baixando imagens do Docker (SQL/RabbitMQ)...${NC}"
docker-compose pull

echo "----------------------------------------------------"
echo -e "${GREEN}✅ AMBIENTE CONFIGURADO COM SUCESSO!${NC}"
echo -e "Agora você pode rodar: ${YELLOW}./start-full.sh${NC}"