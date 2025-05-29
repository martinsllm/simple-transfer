
# Simple Transfer

O objetivo foi desenvolver uma plataforma para simplificar a transferência de dinheiro entre usuários.


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/martinsllm/simple-transfer
```

Entre no diretório do projeto

```bash
  cd simple-transfer
```

Instale as dependências

```bash
  yarn
```

Inicie o servidor

```bash
  yarn dev
```


## Documentação da API

#### Retorna todas as transações realizadas

```http
  GET /transactions
```

#### Retorna uma transação pelo id informado

```http
  GET /transaction/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cadastra uma nova transação

```http
  POST /transaction
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `payerId`      | `number` | **Obrigatório**. O ID do usuário que vai realizar a transferência |
| `receiverId`      | `number` | **Obrigatório**. O ID do usuário que vai receber a transferência |
| `value`      | `number` | **Obrigatório**. O valor a ser enviado |


#### Retorna o histórico de transações de um determinado usuário pelo id informado

```http
  GET /user/transactions/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |


#### Retorna as informações do usuário pelo id informado

```http
  GET /user/profile/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

