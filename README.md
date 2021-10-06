# Проект «Movies-explorer»

Сервис, позволяющий пользователям искать фильмы по запросу и сохранять понравившиеся в личном кабинете.

### 🔧 Функционал:
-  реализована авторизация, регистрация, редактирование профиля пользователя;
-  реализован поиск фильмов по ключевому слову;
-  реализована возможность добавления и удаления понравившихся фильмов в «Сохраненные»;

### 🔧 Используемые технологии:

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" /> 
____

### 🔧 Методы API:
Репозиторий для  Бэкенд части приложения Movies Explorer. </br>
| Метод  | Путь  | Описание | Требует авторизации |
|--------|-------|-----------|---------------------|
|  POST  | `/signup`| Cоздаёт пользователя с переданными в теле email, password и name|  false |
|  POST  | `/signin`| Проверяет переданные в теле почту и пароль и возвращает JWT     |  false |
|   GET  | `/movies`| Возвращает все сохранённые пользователем фильмы                 |  true  |
|  POST  | `/movies`| Создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId  | true |
| DELETE | `/movies/movieId` | Удаляет сохранённый фильм из избранного по id  | true |

[Фронтенд часть проекта](https://github.com/Anel1da/movies-explorer-frontend/)
