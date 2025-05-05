# Node Clean Arch

Node (x SQL) Clean Architecture

## Process

Repository:

```bash
git clone https://github.com/DmnChzl/NodeCleanArch.git
```

Install:

```bash
pnpm install
```

Dev:

```bash
pnpm run dev
```

Unit Testing:

```bash
pnpm run test
```

Build:

```bash
pnpm run build
```

Preview:

```bash
pnpm run preview
```

## cURL

Read All Users:

```bash
curl --request GET \
  --url http://localhost:8080/api/users
```

Create New User:

```bash
curl --request POST \
  --url http://localhost:8080/api/users \
  --header 'Content-Type: application/json' \
  --data '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@pm.me"
}'
```

Read One User:

> `:id` As Path Variable `string`

```bash
curl --request GET \
  --url http://localhost:8080/api/users/:id
```

Update User:

> `:id` As Path Variable `string`

```bash
curl --request PUT \
  --url http://localhost:8080/api/users/:id \
  --header 'Content-Type: application/json' \
  --data '{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@pm.me"
}'
```

Delete User:

> `:id` As Path Variable `string`

```bash
curl --request DELETE \
  --url http://localhost:1234/api/users/:id
```

## License

```
Copyright (c) 2025 Damien Chazoule

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
