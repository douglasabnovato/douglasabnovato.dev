<#
.SYNOPSIS
  Verificação local do douglasabnovato.dev (lote de 26/10/2026).

.DESCRIPTION
  Rode na raiz do projeto:
    powershell -ExecutionPolicy Bypass -File .\docs\claudeia\verificar.ps1

  Etapas bloqueantes (o script para no primeiro erro):
    0. pré-requisitos  1. npm install  2. npm test  3. npm run build
  Etapa informativa (nunca para o script):
    4. npm run lint  (6 erros conhecidos, item 2.2 do plano)

.PARAMETER PularInstall
  Pula a etapa 1. Use só depois que o package-lock.json atualizado já estiver commitado.
#>
param(
  [switch]$PularInstall
)

$ErrorActionPreference = 'Stop'
$raiz = Resolve-Path (Join-Path $PSScriptRoot '..\..')
Set-Location $raiz

function Titulo($n, $texto) {
  Write-Host ''
  Write-Host ("=== Etapa {0} - {1}" -f $n, $texto) -ForegroundColor Cyan
}

function Falhar($etapa, $dica) {
  Write-Host ''
  Write-Host ("FALHOU na etapa {0}." -f $etapa) -ForegroundColor Red
  Write-Host $dica -ForegroundColor Yellow
  Write-Host 'Consulte docs\claudeia\04-testes-automatizados.md, seção "Se algo falhar".'
  exit 1
}

function Rodar($etapa, $comando, $dica) {
  Write-Host ("> {0}" -f $comando) -ForegroundColor DarkGray
  & cmd /c $comando
  if ($LASTEXITCODE -ne 0) { Falhar $etapa $dica }
}

# ---------------------------------------------------------------- 0
Titulo 0 'Pré-requisitos'
Write-Host 'Confere se Node e npm estão instalados e se esta é a raiz do projeto.'
if (-not (Test-Path (Join-Path $raiz 'package.json'))) {
  Falhar 0 "package.json não encontrado em $raiz."
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Falhar 0 'Node não encontrado no PATH.' }
if (-not (Get-Command npm  -ErrorAction SilentlyContinue)) { Falhar 0 'npm não encontrado no PATH.' }
$versaoNode = (& node --version).Trim()
Write-Host ("Node {0} · npm {1} · pasta {2}" -f $versaoNode, (& npm --version).Trim(), $raiz)
$partes = $versaoNode.TrimStart('v').Split('.')
$maior = [int]$partes[0]; $menor = [int]$partes[1]
$ok = ($maior -gt 22) -or ($maior -eq 22 -and $menor -ge 12) -or ($maior -eq 20 -and $menor -ge 19)
if (-not $ok) { Falhar 0 'O Vite 8 exige Node 20.19+ ou 22.12+. O CI usa Node 24.' }

# ---------------------------------------------------------------- 1
if ($PularInstall) {
  Titulo 1 'npm install (pulada a pedido)'
} else {
  Titulo 1 'npm install'
  Write-Host 'O package.json mudou em 26/10 (saíram 6 pacotes, entrou o vitest), mas o'
  Write-Host 'package-lock.json é de 07/10. O npm install reescreve o lock; sem isso o'
  Write-Host 'npm test não encontra o vitest e o npm ci do CI recusa o lock.'
  Rodar 1 'npm install' 'Se aparecer ETARGET ou ERESOLVE para o vitest, a versão ^5.0.2 precisa ser trocada por uma que aceite o Vite 8. Não use --force.'
  Write-Host 'Lembrete: commite o package-lock.json junto com o package.json.' -ForegroundColor Yellow
}

# ---------------------------------------------------------------- 2
Titulo 2 'npm test'
Write-Host 'Roda os 14 testes de integridade: certificados, currículo e Blog.'
Rodar 2 'npm test' 'Leia o nome do teste que falhou: ele diz qual arquivo de dado está inconsistente.'

# ---------------------------------------------------------------- 3
Titulo 3 'npm run build'
Write-Host 'Roda tsc -b (com strict: true) e o vite build. É o mesmo comando da Vercel.'
Rodar 3 'npm run build' 'Erro TS: corrija o código apontado. Não desligue o strict.'

# ---------------------------------------------------------------- 4
Titulo 4 'npm run lint (informativo)'
Write-Host 'Esperado: 6 erros e 1 aviso já conhecidos (item 2.2). Não interrompe o script.'
& cmd /c 'npm run lint'
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Lint com erros (esperado enquanto o item 2.2 estiver aberto). Confira se são só os 6 conhecidos.' -ForegroundColor Yellow
} else {
  Write-Host 'Lint limpo. Já dá para tirar o continue-on-error do ci.yml.' -ForegroundColor Green
}

Write-Host ''
Write-Host 'Etapas bloqueantes concluídas: install, testes e build verdes.' -ForegroundColor Green
Write-Host 'Próximo passo: docs\claudeia\05-testes-manuais.md'
exit 0
