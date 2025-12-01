Write-Host "🚀 Iniciando o Ecossistema Flamengo E-commerce..." -ForegroundColor Green

# 1. Subir Infraestrutura (Banco e RabbitMQ)
Write-Host "--> Subindo Docker (SQL Server + RabbitMQ)..." -ForegroundColor Yellow
docker-compose up -d

# Função para abrir terminal e rodar projeto
function Start-Service {
    param (
        [string]$Path,
        [string]$Name,
        [string]$Color
    )
    Write-Host "--> Iniciando $Name..." -ForegroundColor $Color
    # Abre uma nova janela do PowerShell rodando o projeto
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $Path; dotnet run; Read-Host"
}

# 2. Iniciar Microserviços (Back-end)
Start-Service -Path "src/Services/Identity.API" -Name "Identity API (Auth)" -Color Cyan
Start-Service -Path "src/Services/Stock.API"    -Name "Stock API (Estoque)" -Color Magenta
Start-Service -Path "src/Services/Sales.API"    -Name "Sales API (Vendas)"  -Color Blue

# 3. Iniciar Gateway
Start-Service -Path "src/Gateways/ApiGateway"   -Name "API Gateway (Ocelot)" -Color White

# 4. Iniciar Front-end (React)
Write-Host "--> Iniciando Front-end (StoreFront)..." -ForegroundColor Red
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd src/Web/StoreFront; npm run dev"

Write-Host "✅ Tudo iniciado! Terminais estão abertos." -ForegroundColor Green
Write-Host "------------------------------------------------"
Write-Host "Gateway:   http://localhost:5144"
Write-Host "Front-end: http://localhost:5173"
Write-Host "------------------------------------------------"