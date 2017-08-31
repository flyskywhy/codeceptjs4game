'use strict';
/**
 * Элементы и методы для работы со страницей ratings - RF Online — сайт сообщества: представители рас.
 */

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    /**
     * Элементы основной страницы представители рас
     */
    url: "/rf/play/ratings/",
    title: "RF Online — сайт сообщества: представители рас",
    forumLink: "[href='https://ru.4gamesupport.com/kb/articles/626-view']",
    forumText: "Узнать больше о бонусах",
    content: "#GlobalContent",
    serversButton: ".jsServerSelector",
    serversList: ".prf-ratings_popup-fadein",
    serversSelected: ".prf-ratings_selector_item-selected",
    servers:[
        "Месса",
        "Агат",
        "Аур",
        "Дейвул",
        "Хаст"
    ],
    aboutHeader: ".prf-ratings_about_header",
    selectedRanks: ".jsSelectedRanks ",
    appointedRanks: ".jsAppointedRanks",
    patriarchIcon: ".prf-ratings_graph_node_icon__rank-patriarch",
    icons:[
        ".prf-ratings_graph_node_icon__rank-archon",
        ".prf-ratings_graph_node_icon__rank-attack",
        ".prf-ratings_graph_node_icon__rank-protection",
        ".prf-ratings_graph_node_icon__rank-support"
    ],
    popupTextSelected: {
        "archon":[
            "Архонт",
            "Кандидат, занявший 2 место:",
            "увеличивает свою Защиту на 50%;",
            "использует в Войне за Чип Ядерные ракеты;",
            "голосует за наказания, предложенные Патриархом."
        ],
        "attack":[
            "Атакующий",
            "Кандидат, занявший 3 место:",
            "увеличивает свою Атаку на 40%;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ],
        "protection":[
            "Защитник",
            "Кандидат, занявший 4 место:",
            "увеличивает свою Защиту на 40%;",
        ],
        "support":[
            "Поддержка",
            "Кандидат, занявший 5 место:",
            "использует умение Аура Поддержки, которое для всех игроков расы в определенном радиусе повышает здоровье, атаку и защиту на 40%;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ]},
    popupTextAppointed: {
        "archon":[
            "Архонт",
            "увеличивает свою Защиту на 50%;",
            "использует в Войне за Чип Ядерные ракеты;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ],
        "attack":[
            "Атакующий",
            "увеличивает свою Атаку на 40%;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ],
        "protection":[
            "Защитник",
            "увеличивает свою Защиту на 40%;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ],
        "support":[
            "Поддержка",
            "использует умение Аура Поддержки, которое для всех игроков расы в определенном радиусе повышает здоровье, атаку и защиту на 40%;",
            "имеет доступ к Броне Представителей Расы;",
            "голосует за наказания, предложенные Патриархом."
        ]},
    popup: ".prf-ratings_popup",
    exclude: [
        ".footer-4game__social-section",    // соцсети в футере
        ".userbar-tray",                    // юзербар
        ".prf-ratings_graph_node_label",    // Имена игроков
        ".prf-ratings_graph_node_text",     // Сервер
        ".prf-ratings_sticker_text",        // Стикер
        ".prf-ratings_header_info"          // инфо
    ]
}