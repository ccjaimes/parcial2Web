import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import esMessages from "./locales/es";
import enMessages from "./locales/en";
import Parcial from './components/parcial';
import * as serviceWorker from './serviceWorker';

function determineLanguage() {
    let navLanguage = navigator.language || navigator.userLanguage;
    if (navLanguage.includes("es")) {
        return esMessages;
    }
    else if (navLanguage.includes("en")) {
        return enMessages;
    }
}

ReactDOM.render(<IntlProvider locale={navigator.language} messages={determineLanguage()}>
    <Parcial />
</IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
