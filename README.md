# Laravel + React, Notifications

## Запуск

Добавить в `/etc/hosts` запись:

```
127.0.0.1 react-laravel-app.local
```

Запустить проект в docker:

```
docker compose up -d
```

Установить зависимости composer:

```
docker compose exec backend composer install
```

Открыть в браузере http://react-laravel-app.local

Пользователь:
```
maximov@test.ru
```
```
123456
```
или зарегистрировать нового