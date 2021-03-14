## Project Description
OjoMager adalah website berisi konten olahraga rumahan untuk kamu beraktivitas dirumah.

## Get Started
``` bash
# copy .env.example ke .env
$ cp .env.example .env
# jangan lupa untuk edit lagi file .env menyesuaikan konfigurasi database postgresql di server masing2

# install packages
$ npm install

# buat database dari konfigurasi
$ sequelize db:create

# migrasi tabel
$ sequelize db:migrate

# seeding dummy data & default data
$ sequelize db:seed

# jalankan api pada local server anda :
$ npm run dev
```
## Dependency Libraries
- @sendgrid/mail
- bcrypt
- cors
- crypto-js
- dotenv
- express-validator
- jsonwebtoken
- nanoid
- passport
- passport-jwt
- pg
- sequelize
  
## Database Schema
![Move Card To Doing](./guideline/ERD.png)
## [WIP] Project Structure / File Grouping

### Visualisasi
```bash
├── config
|   ├── database.js
├── database
|   ├── migrations
|   ├── models
|   ├── seeders
|   ├── connection.js
├── helpers
|   ├── response.js
├── middleware
|   ├── middleware-name.js
├── routes
|   ├── api
|   |   ├── index.js
|   |   ├── feature-name
|   |   |   ├── feature-name.route.js
|   |   |   ├── feature-name.controller.js
├── utils
|   ├── jwt.js
|   ├── bcrypt.js
```

### Penjelasan 

- Folder `config` digunakan untuk menyimpan konfigurasi yang akan digunakan pada project ini, contohnya adalah konfigurasi untuk server database
- Folder `database` digunakan untuk menyimpan keperluan database. 
  - Terdapat 1 file bernama `connection.js` yaitu file untuk koneksi ke server postgreSQL menggunakan Sequelize.
  - Terdapat 3 folder yang digunakan yaitu : 
    - `Migration` : untuk blueprint atau skema database dari tabel yang akan dibuat.
    - `Models` : untuk object modeling tiap tabel yang ada di database.
    - `Seeders` : untuk mengisi data default / dummy pada tabel yang ada di database.
- Folder `guideline` digunakan untuk menyimpan media yang diperlukan untuk membuat guideline ini (tidak berhubugnan dengan project).
- Folder `helpers` digunakan untuk menyimpan shortcut dari **function** yang sering dipakai di beberapa tempat dan menggunakan dependency dari module lain. Contoh dari helpers adalah untuk membuat jwt token dari payload yang diberikan di parameter dan menggunakan libraries/module dari jsonwebtoken
- Folder `middleware` digunakan untuk menyimpan semua middleware yang akan digunakan pada **REST API**. Contoh dari middleware adalah middleware untuk **validasi jwt token**, **error handling**.
- Folder `routes` digunakan untuk menyimpan endpoint pada project. Untuk detailnya silahkan cek di Coding Style bagian Controller & Route.
- Folder `utils` digunakan untuk menyimpan helpers yang memperlukan dependencies lain. contohnya adalah format response API pada semua endpoint sama, maka dari itu kita membuat utils untuk merubah 2 parameter yang diberikan menjadi sebuah object yang sesuai dengan standart yang sudah ditentukan diawal.

## RESTful API Design

### API Documentation
[POSTMAN](https://documenter.getpostman.com/view/14768408/Tz5m9zeK)

### Response Format
- Response sucess api dengan mengembalikan 1 data berupa object
  
  ```json
  {
    "success": true,
    "message": "This is successful message",
    "data": {
        "id": 1,
        "type": "articles",
        "created_at": "2019-10-04 14:33"
    }
  }
  ```

- Response sucess api dengan mengembalikan beberapa data berupa array of object
  
  ```json
  {
    "success": true,
    "message": "This is successful message",
    "data": [
        {
            "id": 1,
            "type": "articles",
            "created_at": "2019-10-04 13:33"
        },
        {
            "id": 2,
            "type": "articles",
            "created_at": "2019-10-04 14:33"
        }
    ]
  }
  ```

- Response success api tanpa mengembalikan data apapun (hanya message)
  
  ```json
  {
    "success": true,
    "message": "This is successful message",
  }
  ```

- Response failed api normal
  
  ```json
  {
    "success": false,
    "error": {
      "code": 500,
      "message": "Error xyz has occurred"
    }
  }
  ```

- Response failed api pada proses validasi request payload

  ```json
  {
      "success": false,
      "message": "Error xyz has occurred",
      "error": {
        "code": 422,
        "message": "error validating user input",
        "errors": {
          "field": "KEYWORD_ERROR",
        }
      }
  }
  ```