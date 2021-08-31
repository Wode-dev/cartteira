# Cartteira

## Setup do projeto

1. Tenha um banco de dados NoSQL instalado.
2. Defina as urls no arquivo _.env_
3. Instale as dependências
```
npm install
```

### Variáveis importantes no arquivo .env

- DB_URL => Define a URL do banco de dados
- PORT => Define a porta em que o serviço irá estar disponível
- JWT_SECRET => Secret usado para gerar o JWT

### Ambiente de desenvolvimento
```
npm run start
```

### Docker

Comando para usar o docker, em ambiente local

```
docker-compose -f Dockerfile-local up
```
