# Веб-приложение «Чат»

## О проекте

Проект в рамках Яндекс Практикума.
[Макет в Figma](https://www.figma.com/file/bz3fUfefTOGr6PPyeUTwxR/YaChat?node-id=5%3A895)


## Основные зависимости

- Parcel
- Handlebars + Parcel Transformer
- PostCSS
- Express


## Структура проекта

- `src` ­— общая директория с исходниками
- `static` ­— статические файлы (изображения)
- `src/components` — компоненты, переиспользуемые в проекте больше 1 раза
- `src/layouts` — основные лейауты страниц: общий, для ошибок, для страниц профиля и авторизации/регистрации. Позднее добавится лейаут для чатов
- `src/helpers` — вспомогательные хелперы для Handlebars
- `src/pages` — страницы
- `src/styles` — normalize; глобальные стили; стили лейаутов, страниц и компонентов

Для стилизации используется БЭМ и немного своих Utility-first хелперов.

При Production-сборке неиспользуемые стили удаляются.


## Команды

```bash
npm i # Установка зависимостей
npm run dev # Локальная разработка
npm run build # Production-сборка
npm run start # build и запуск Express-сервера
npm run clean # Удаление dist и кэша
```
