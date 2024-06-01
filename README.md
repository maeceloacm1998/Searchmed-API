# Searchmed-API
> Serviço para aplicativo de busca por hospitais

## Descrição
Essa serviço foi criado para catalogar os hospitais públicos em Belo Horizonte, fornecidos pela api PLACE API do Google Maps. O objetivo é através do endereço da pessoa, enviado pelo body das requisições, retornar uma lista de hospitais ordenados pela distância onde a pessoa está.

## Índice

- [Descrição](#descrição)
- [Instruções de Instalação e Configuração](#instruções-de-instalação-e-configuração)
- [Endpoints da API](#endpoints-da-api)
  - [GET - Pegar latitude e longitude a partir do endereço do usuário](#get---pegar-latitude-e-longitude-a-partir-do-endereço-do-usuário)
  - [GET - Lista de busca de hospitais pelo nome](#get---lista-de-busca-de-hospitais-pelo-nome)

## Instruções de Instalação e Configuração

1. Clone este repositório.
2. Rode `npm install` ou `yarn install` para instalar as dependências.
3. Crie um arquivo `.env` e configure quaisquer variáveis de ambiente necessárias.
4. Rode `npm start` ou `yarn start` para iniciar o servidor.

## Endpoints da API

### GET - Pegar Hospitais proximos ao endereço do usuário

Esse endpoint serve para pegar Hospitais de todos os hospitais no raio de 10km do endereço do usuário. Caso queira aumentar o raio de procura, é possível, basta passar `range=<valor> Ex: range=20`

**Requisição:**

```bash
curl --location 'http://localhost:3000/place/hospitals/maps?latitude=-19.8374075&longitude=-43.9836488&range=3000' \
--data ''
```

**Resposta:**
```json
// SUCESSO
{
    "status": "200",
    "result": [
        {
            "place_id": "ChIJx6aBpCCQpgARKbbLCMWV7a0",
            "address": "Rua Dr. Álvaro Camargos, 2002 - São João Batista, Belo Horizonte - MG, 31565-413, Brasil",
            "name": "Hospital",
            "rating": 5,
            "distance": 2134.2881050294654,
            "isEmergencyHospital": false,
            "phoneNumber": "",
            "reviews": [
                {
                    "author": "Daniela Souza de Jesus",
                    "authorUrl": "https://www.google.com/maps/contrib/110812265570076002874/reviews",
                    "photo": "https://lh3.googleusercontent.com/a/ACg8ocKNNVgdPAHkibTHH7jFar-o1gLLengFoPBS_eHPTfLISh9_zCU=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "comment": "",
                    "date": "2024-03-20T20:25:13.000Z"
                },
                {
                    "author": "Sara Paula",
                    "authorUrl": "https://www.google.com/maps/contrib/111131077039161517866/reviews",
                    "photo": "https://lh3.googleusercontent.com/a-/ALV-UjWCAJE0Nw_WYKkLr9oWeTWf3SFiz10a1pRW6dP85LRDkC5JBBgHhg=s128-c0x00000000-cc-rp-mo-ba4",
                    "rating": 5,
                    "comment": "",
                    "date": "2020-08-22T11:17:40.000Z"
                }
            ],
            "location": {
                "latitude": -19.82703099999999,
                "longitude": -43.96651019999999
            }
        }
    ]
}

// SUCESSO - Hospitais não encontrados
{
    "status": "200",
    "result": []
}

// ERROR - Longitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "longitude",
            "message": "Longitude is required"
        }
    ]
}

// ERROR - Latitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "latitude",
            "message": "latitude is required"
        }
    ]
}
```

### GET - Lista de busca de hospitais pelo nome

Esse endpoint serve para pegar a lista de hospitais de acordo com o nome digitado pelo usuário. Vale
ressaltar que esses hospitais são ordenados baseados na localidade do usuário.

**Requisição:**

```bash
curl --location 'http://localhost:3000/place/hospital/search?latitude=-19.8374075&longitude=-43.9836488&hospitalName=Hosp&range=3000' \
--header 'Content-Type: application/json' \
--data ''
```

**Resposta:**
```json
// SUCESSO
{
    "status": "200",
    "result": [
        {
            "place_id": "ChIJx6aBpCCQpgARKbbLCMWV7a0",
            "address": "Rua Dr. Álvaro Camargos, 2002 - São João Batista, Belo Horizonte - MG, 31565-413, Brasil",
            "name": "Hospital",
            "rating": 5,
            "distance": 2134.2881050294654,
            "isEmergencyHospital": false,
            "phoneNumber": "",
            "reviews": [
                {
                    "author": "Daniela Souza de Jesus",
                    "authorUrl": "https://www.google.com/maps/contrib/110812265570076002874/reviews",
                    "photo": "https://lh3.googleusercontent.com/a/ACg8ocKNNVgdPAHkibTHH7jFar-o1gLLengFoPBS_eHPTfLISh9_zCU=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "comment": "",
                    "date": "2024-03-20T20:25:13.000Z"
                },
                {
                    "author": "Sara Paula",
                    "authorUrl": "https://www.google.com/maps/contrib/111131077039161517866/reviews",
                    "photo": "https://lh3.googleusercontent.com/a-/ALV-UjWCAJE0Nw_WYKkLr9oWeTWf3SFiz10a1pRW6dP85LRDkC5JBBgHhg=s128-c0x00000000-cc-rp-mo-ba4",
                    "rating": 5,
                    "comment": "",
                    "date": "2020-08-22T11:17:40.000Z"
                }
            ],
            "location": {
                "latitude": -19.82703099999999,
                "longitude": -43.96651019999999
            }
        }
    ]
}

// SUCESSO - Hospitais não encontrados
{
    "status": "200",
    "result": []
}

// ERROR - Nome do hospital não fornecido
{
    "status": "409",
    "result": [
        {
            "path": "hospitalName",
            "message": "Hospital name is required"
        }
    ]
}

// ERROR - Longitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "longitude",
            "message": "Longitude is required"
        }
    ]
}

// ERROR - Latitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "latitude",
            "message": "latitude is required"
        }
    ]
}
```

### GET - Pegar o hospital mais próximo do usuário (Casos de emergência)

Esse endpoint serve para pegar o hospital mais próximo dele, usando como uma função de emergência, na qual ao passar
a latitude e a longitude, sem importar com o range, vai buscar o hospital mais próximo.

**Requisição:**

```bash
curl --location 'http://localhost:3000/place/hospitals/emergency?latitude=-19.8374075&longitude=-43.9836488' \
--data ''
```

**Resposta:**
```json
// SUCESSO
{
    "status": "200",
    "result": [
        {
            "place_id": "ChIJx6aBpCCQpgARKbbLCMWV7a0",
            "address": "Rua Dr. Álvaro Camargos, 2002 - São João Batista, Belo Horizonte - MG, 31565-413, Brasil",
            "name": "Hospital",
            "rating": 5,
            "distance": 2134.2881050294654,
            "isEmergencyHospital": false,
            "phoneNumber": "",
            "reviews": [
                {
                    "author": "Daniela Souza de Jesus",
                    "authorUrl": "https://www.google.com/maps/contrib/110812265570076002874/reviews",
                    "photo": "https://lh3.googleusercontent.com/a/ACg8ocKNNVgdPAHkibTHH7jFar-o1gLLengFoPBS_eHPTfLISh9_zCU=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "comment": "",
                    "date": "2024-03-20T20:25:13.000Z"
                },
                {
                    "author": "Sara Paula",
                    "authorUrl": "https://www.google.com/maps/contrib/111131077039161517866/reviews",
                    "photo": "https://lh3.googleusercontent.com/a-/ALV-UjWCAJE0Nw_WYKkLr9oWeTWf3SFiz10a1pRW6dP85LRDkC5JBBgHhg=s128-c0x00000000-cc-rp-mo-ba4",
                    "rating": 5,
                    "comment": "",
                    "date": "2020-08-22T11:17:40.000Z"
                }
            ],
            "location": {
                "latitude": -19.82703099999999,
                "longitude": -43.96651019999999
            }
        }
    ]
}

// SUCESSO - Hospitais não encontrados
{
    "status": "200",
    "result": []
}

// ERROR - Longitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "longitude",
            "message": "Longitude is required"
        }
    ]
}

// ERROR - Latitude não passada por parâmetro
{
    "status": "409",
    "result": [
        {
            "path": "latitude",
            "message": "latitude is required"
        }
    ]
}
```

### Autocomplete de endereço 
- POST ```/place/autocomplete```
  
Retorna uma lista de endereços compatíveis no Brasil, de acordo com o endereço passado pelo body.

Request:
```
{
	"address": <Endereço aqui>
}
```

Respomse:
```
[
	{
		"id": "0",
		"address": "Rua Hildebrando de Oliveira, 235 - Vila Copacabana, Belo Horizonte - MG, Brasil"
	},
	{
		"id": "1",
		"address": "Rua Hildebrando de Oliveira, 235 - São Sebastião do Uatumã, AM, Brasil"
	}
]
```

Curl Exemple:
```
curl --request POST \
  --url https://searchmed.onrender.com/place/autocomplete \
  --header 'Content-Type: application/json' \
  --data '{
	"address": "Rua hildebrando de Oliveira, 235"
}'
```