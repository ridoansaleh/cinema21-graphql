# Cinema21 GraphQL

## Version 1

Tutorial : [Build a GraphQL API with Node](https://blog.jscrambler.com/build-a-graphql-api-with-node/)

## Version 2

Tutorial : [Handling authentication in GraphQL – Part 2: JWT
](https://blog.pusher.com/handling-authentication-in-graphql-jwt/)

### Queries

1. Get Profile

Query :

```
    {
        profile {
            id
            username
            password
            name
            email
            address
        }
    }
```

Response :

```
    {
        "data": {
            "profile": {
                "id": 5,
                "username": "messi",
                "password": "$2b$10$ZHcFrBbu6sAF0jzslPbTzOpV.Am7gt0i8ihZ3K04C3e/aSqRrPQHa",
                "name": "Lionel Messi",
                "email": "lionelmessi@gmail.com",
                "address": "Barcelona"
            }
        }
    }
```

### Mutations

1. Signup (Create account)

Mutation :

```
    mutation {
        signup(username: "messi", password: "magician", email: "lionelmessi@gmail.com", name: "Lionel Messi", address: "Barcelona")
    }
```

Response :

```
    {
        "data": {
            "signup": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJ3YXluZXJvb25leSIsImlhdCI6MTU2ODU1ODA0MCwiZXhwIjoxNjAwMTE1NjQwfQ.WA_g4xTEN6WoXJ4rrJR5felse4UXJje3fueLbTnE3rU"
        }
    }
```

2. Login

Mutation :

```
    mutation {
        login(username: "messi", password: "magician")
    }
```

Response :

```
    {
        "data": {
            "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lc3NpIiwiaWF0IjoxNTY4NTU4MTUzLCJleHAiOjE1Njg2NDQ1NTN9.yUFo9bCIK3hA5m7MYZC94IvakyW1KhLi-z25cmRzIz4"
        }
    }
```

### GraphQL Playground

![GraphQL Playground in Development](./images/playground.png)
