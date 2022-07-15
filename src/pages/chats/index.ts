import { Block } from 'utils';
import {
  Avatar,
  ChatItem,
  Message,
  MessageField,
  Search,
} from 'components';

import './styles.pcss';
import imageDesk from 'images/desk.jpg';
import imageDodge from 'images/dodge.jpg';
import iconDots from 'images/dots.svg';
import iconMenu from 'images/menu.svg';
import imagePepe from 'images/pepe.png';
import template from './template.hbs';

const getElements = () => ({
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
    text: 'Упер с работы стол. А ты как поживаешь?',
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
});

export class PageChats extends Block {
  constructor() {
    super({ iconDots, iconMenu, ...getElements() });
  }

  render() {
    return this.compile(template, this.props);
  }
}
