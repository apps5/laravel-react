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
docker compose exec backend_l_r composer install
```

Открыть в браузере http://react-laravel-app.local
