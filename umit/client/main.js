import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../imports/routes';

console.log(
    '\n\t ██╗   ██╗███╗   ███╗██╗████████╗'+
    '\n\t ██║   ██║████╗ ████║██║╚══██╔══╝'+
    '\n\t ██║   ██║██╔████╔██║██║   ██║   '+
    '\n\t ██║   ██║██║╚██╔╝██║██║   ██║   '+
    '\n\t ╚██████╔╝██║ ╚═╝ ██║██║   ██║   '+
    '\n\t  ╚═════╝ ╚═╝     ╚═╝╚═╝   ╚═╝   ');

var console_info = [
    "%c UMIT umit.com.ua %c Developed by KosiakMD " +
    "%c \n\t https://fb.com/kosiakMD" +
    "%c \n\t https://vk.com/kosiakMD" +
    "%c \n\t https://github.com/kosiakMD",
    "background: #000000; color: #7EBE45",
    "background: #000000; color: #ffffff",
    "color: blue",
    "color: violet",
    "color: black"];
console.log.apply(console, console_info);