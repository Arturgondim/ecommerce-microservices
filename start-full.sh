#!/bin/bash

# Cores para o terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # Sem cor

echo -e "${GREEN}🚀 Iniciando CRF Store (Modo Linux)...${NC}"

# 1. Subir Docker
echo -e "🐳 Subindo Docker..."
docker-compose up -d

# Aguarda o banco subir
sleep 5

# Função para abrir nova aba no terminal (Padrão Ubuntu/Gnome)
open_tab() {
    NAME=$1
    PATH_DIR=$2
    CMD=$3
    
    # Abre uma aba nova, entra na pasta e roda o comando
    gnome-terminal --tab --title="$NAME" -- bash -c "cd $PATH_DIR; $CMD; exec bash"
}

# 2. Iniciar Serviços
open_tab "Identity" "src/Services/Identity.API" "dotnet run"
open_tab "Stock"    "src/Services/Stock.API"    "dotnet run"
open_tab "Sales"    "src/Services/Sales.API"    "dotnet run"
open_tab "Payment"  "src/Services/Payment.API"  "dotnet run"
open_tab "Gateway"  "src/Gateways/ApiGateway"   "dotnet run"

# 3. Iniciar Front-end
open_tab "Frontend" "src/Web/StoreFront"        "npm run dev"

echo -e "${GREEN}✅ Tudo rodando!${NC}"