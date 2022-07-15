import './styles.pcss';
import { Block } from 'utils';
import {
  Avatar,
  ChatItem,
  Message,
  MessageField,
  Search,
} from 'components';
import imageDesk from 'images/desk.jpg';
import imageDodge from 'images/dodge.jpg';
import iconDots from 'images/dots.svg';
import iconMenu from 'images/menu.svg';
import imagePepe from 'images/pepe.png';

const template = `
<main class="chats-page flex-full flex mx-auto shadow-sheet">
  <aside class="sidebar bg-gray-lightest">
    <header class="flex align-center gap-2 px-3 py-2">
      <button class="sidebar__menu-button flex pa-3">
        <img src="${iconMenu}" class="m-auto">
      </button>
      {{{ search }}}
    </header>

    <nav class="chats">
      {{{ chatItem1 }}}
      {{{ chatItem2 }}}
      {{{ chatItem3 }}}
    </nav>
  </aside>

  <section class="chat flex-grow-1 flex flex-column">
    <header class="chat__header flex-grow-0 flex align-center gap-3 px-4 py-2">
      {{{ avatar }}}
      <span class="text-body-medium">Олег</span>
      <button class="chat__menu-button flex ml-auto pa-3">
        <img src="${iconDots}" class="m-auto">
      </button>
    </header>

    <section class="chat__window flex-grow-1 px-4 py-6">
      <div class="chat__messages chat__messages--outcoming flex flex-column align-end gap-3">
        {{{ message1 }}}
        {{{ message2 }}}
      </div>

      <div class="chat__date flex align-center gap-3 mt-5 mb-4 text-center text-caption-medium gray">01 Фев 2022</div>

      <div class="chat__messages chat__messages--outcoming flex flex-column align-start gap-3">
        {{{ message3 }}}
        {{{ message4 }}}
      </div>

      <div class="chat__messages chat__messages--outcoming flex flex-column align-end gap-3">
        {{{ message5 }}}
        {{{ message6 }}}
      </div>
    </section>

    <footer class="chat__footer flex-grow-0">
      {{{ messageField }}}
    </footer>
  </section>
</main>
`;

const elements = {
  search: new Search({
    class: 'flex-grow-1',
  }),
  chatItem1: new ChatItem({
    date: '10:20',
    isGroup: true,
    name: 'Дмитрий',
    message: 'Gloomhaven весит 10 кг',
    title: 'Настолки',
    unreadCount: 12,
  }),
  chatItem2: new ChatItem({
    date: 'Пн',
    imagePath: imagePepe,
    isActive: true,
    message: 'Проснувшись однажды утром после…',
    name: 'Вы',
    title: 'Олег',
  }),
  chatItem3: new ChatItem({
    date: '1 Фев 2022',
    message: 'Где макет? Сколько можно?',
    title: 'dodo',
    unreadCount: 1,
  }),
  avatar: new Avatar({
    smallest: true,
    imagePath: imagePepe,
  }),
  messageField: new MessageField(),
  message1: new Message({
    incoming: false,
    image: imageDesk,
    time: '12:00',
    read: true,
  }),
  message2: new Message({
    incoming: false,
    text: 'Упер с работы стол. Ты как поживаешь?',
    time: '12:00',
    read: true,
  }),
  message3: new Message({
    incoming: true,
    text: 'А я вон с первой зарплаты взял…',
    time: '12:00',
  }),
  message4: new Message({
    incoming: true,
    image: imageDodge,
    time: '12:00',
  }),
  message5: new Message({
    incoming: false,
    text: 'Круто! Тогда читай',
    time: '12:00',
    read: true,
  }),
  message6: new Message({
    incoming: false,
    text: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами.',
    time: '12:00',
    sent: true,
  }),
};

export class PageChats extends Block {
  constructor() {
    super({ ...elements });
  }

  render() {
    return this.compile(template, this.props);
  }
}
