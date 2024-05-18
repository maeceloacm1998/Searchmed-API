# Detalhes da Rota

Método HTTP:  `GET/POST/PUT/DELETE`

URL:  `Ex: /place/hospitals/emergency`

Controlador: `NOME DA CONTROLLER`

***Parâmetros: ***

``` bash
// DIGITE OS PARAMETROS (Query params ou body params)
Ex:
@param latitude: a latitude do usuário
@param longitude: a longitude do usuário
@param range: o alcance para buscar hospitais
```

Retorno: ESCREVA PARA QUE SERVE ESSA ROTA

Fixes # (SUA ISSUE)

## Tipo de mudança

Por favor, delete as opções que não são relevantes.

- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (fix ou feature que causa mudança em uma funcionalidade existente)
- [ ] Esta mudança requer uma atualização de documentação

# Como foi testado?

Por favor, descreva os testes que você realizou para verificar as suas mudanças. Forneça instruções para que possamos reproduzir. Por favor, liste todas as detalhes relevantes.

- [ ] Teste A
***Descrição:*** ESCREVA QUAIS SÃO OS PARAMETROS Ex:Usei dois query params, `latitude=-19.8374075&longitude=-43.9836488`

```bash
// ESCREVA O CURL
Ex:
curl --location 'http://localhost:3000/place/hospitals/emergency?latitude=-19.8374075&longitude=-43.9836488' \
--data ''
```

- [ ] Teste B
***Descrição:*** ESCREVA QUAIS SÃO OS PARAMETROS Ex:Usei dois query params, `latitude=-19.8374075&longitude=-43.9836488`

```bash
// ESCREVA O CURL
Ex:
curl --location 'http://localhost:3000/place/hospitals/emergency?latitude=-19.8374075&longitude=-43.9836488' \
--data ''
```

# Checklist:

- [ ] Meu código segue as guidelines de estilo deste projeto
- [ ] Eu fiz uma auto revisão do meu próprio código
- [ ] Eu comentei meu código, especialmente em partes difíceis de entender
- [ ] Eu fiz as mudanças correspondentes na documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Eu adicionei testes que provam que minha correção é efetiva ou que minha feature funciona
- [ ] Testes unitários novos e existentes passam localmente com minhas mudanças.