Write-Host "🔴⚫ INICIANDO CONFIGURAÇÃO DO AMBIENTE CRF STORE..." -ForegroundColor Red

# 1. Verificar Pré-requisitos Básicos
$dotnetVersion = dotnet --version
$nodeVersion = node -v
$dockerVersion = docker --version

Write-Host "--> Verificando Ferramentas:" -ForegroundColor Yellow
Write-Host "    .NET: $dotnetVersion"
Write-Host "    Node: $nodeVersion"
Write-Host "    Docker: $dockerVersion"
Write-Host "----------------------------------------------------"

# 2. Restaurar Pacotes do Back-end (.NET)
Write-Host "📦 1/4 - Restaurando pacotes do Back-end (Nuget)..." -ForegroundColor Cyan
dotnet restore Ecommerce.sln
if ($LASTEXITCODE -ne 0) { Write-Error "Falha ao restaurar .NET"; exit }

# 3. Restaurar Ferramentas Locais (Entity Framework)
Write-Host "🛠️ 2/4 - Configurando Ferramentas (.NET Tools)..." -ForegroundColor Cyan
dotnet tool restore
if ($LASTEXITCODE -ne 0) { Write-Host "Nenhuma ferramenta local para restaurar ou erro ignorável." -ForegroundColor DarkGray }

# 4. Instalar Dependências do Front-end (React)
Write-Host "⚛️ 3/4 - Instalando dependências do Front-end (NPM)..." -ForegroundColor Cyan
Push-Location "src/Web/StoreFront" # Entra na pasta
try {
    npm install
}
finally {
    Pop-Location # Volta para a raiz aconteça o que acontecer
}

# 5. Preparar Docker (Opcional: Baixar imagens sem rodar)
Write-Host "🐳 4/4 - Baixando imagens do Docker (SQL/RabbitMQ)..." -ForegroundColor Cyan
docker-compose pull

Write-Host "----------------------------------------------------"
Write-Host "✅ AMBIENTE CONFIGURADO COM SUCESSO!" -ForegroundColor Green
Write-Host "Agora você pode rodar: ./Start-All.ps1" -ForegroundColor White