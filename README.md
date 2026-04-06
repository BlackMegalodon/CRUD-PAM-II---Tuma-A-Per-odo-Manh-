# CRUD-PAM-II---Tuma-A-Per-odo-Manh-

Para usar o projeto baixe o VSCode
Abra a pasta extraida para no VSCode e use os seguintes comandos no terminal
CD backend
npm i -g json-server
npm i -g localtunnel
Para iniciar o banco de dados virtual use
npx json-server --watch db.json --port 3000
Agora para inicializar o local tunnel duplique o terminal e use
npx lt --port 3000
Coloque o link entregue pelo Local Tunnel no ConfigApi.json substituindo o Link antigo
Abra outro terminal e vá para a pasta meu crud com o comando
cd frontend/meucrud
Agora baixe os dados para iniciar o projeto com o comando
npm i
Para iniciar o projeto agora use
npx expo start
