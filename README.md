## Manual de utilizador Help_ipvc Localhost

1) Pré requisitos:
    - Node.js
    - pnpm (Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression) <- Introduzir este comando no terminal
    - docker desktop

2) Abrir o docker, após aberto, confirmar no terminal se o docker está a correr (docker ps) <- Introduzir este comando no terminal

3) Criar o ficheiro .env na raiz do projeto e introduzir o seguinte comando: DATABASE_URL="postgres://postgres:projeto3@localhost:5432/help_ipvc"

4) Iniciar a Base de Dados (Docker), utilizando o seguinte comando no terminal na raiz do projeto: docker compose up -d

5) Instalar as dependências do projeto (pnpm install) <- Introduzir este comando no terminal

6) Criar as tabelas (pnpm db:migrate) <- Introduzir este comando no terminal

7) Criar o utilizador Admin, presente no ficheiro seed.ts na raiz do projeto (pnpm tsx seed.ts) <- Introduzir este comando no terminal

8) Arrancar o servidor (pnpm dev) <- Introduzir este comando no terminal


## Manual de utilizador Help_ipvc Servidor da escola 

