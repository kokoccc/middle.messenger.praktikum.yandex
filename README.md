# Веб-приложение «Чат»

## О проекте

Проект в рамках Яндекс Практикума. [Макет в Figma](https://www.figma.com/file/bz3fUfefTOGr6PPyeUTwxR/YaChat?node-id=5%3A895)

Пулреквесты: [#1](https://github.com/kokoccc/middle.messenger.praktikum.yandex/pull/1), [#2](https://github.com/kokoccc/middle.messenger.praktikum.yandex/pull/2)

[Приложение на Netlify](https://soft-frangipane-46bdc2.netlify.app/)

Страницы:  
[/](https://soft-frangipane-46bdc2.netlify.app/) или [/chats](https://soft-frangipane-46bdc2.netlify.app/chats) — список чатов  
[/login](https://soft-frangipane-46bdc2.netlify.app/login) — авторизация  
[/signup](https://soft-frangipane-46bdc2.netlify.app/signup) — регистрация  
[/profile](https://soft-frangipane-46bdc2.netlify.app/profile) — профиль  
[/password](https://soft-frangipane-46bdc2.netlify.app/password) — смена пароля  
[/404](https://soft-frangipane-46bdc2.netlify.app/404) — ошибка 404  
[/500](https://soft-frangipane-46bdc2.netlify.app/500) — ошибка 500


## Основные зависимости

- Parcel
- Handlebars + Parcel Transformer
- Typescript
- PostCSS
- Express
- ESLint
- Stylelint


## Структура проекта

- `src` — общая директория с исходниками
- `src/components` — компоненты
- `src/images` — фотографии и иконки
- `src/layouts` — лейауты
- `src/pages` — страницы
- `src/styles` — normalize и глобальные стили
- `src/types` — типы для TypeScript
- `src/utils` — Block, EventBus, HTTPTransport, валидация

Для стилизации используется БЭМ и немного своих Utility-First хелперов.  
При Production-сборке неиспользуемые стили удаляются.


## Команды

```bash
npm i # Установка зависимостей
npm run dev # Локальная разработка
npm run lint # Линтинг скриптов и стилей
npm run build # Production-сборка
npm run start # build и запуск Express-сервера
npm run clean # Удаление dist и кэша
```

Остальные команды см. в package.json.
