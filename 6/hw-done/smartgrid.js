const smartgrid = require('smart-grid');

//объект настроек для smartgrid
const settings = {
    columns: 24, //настройка - сколько будет сеток на сайте
    offset: '10px', //растояние (margin) между колонками (сетками)
    container: { //настройки для примеси wrapper-для центровки сайта
        maxWidth: '960px',
        fields: '30px'
    },
    /*значения для разных устройство по пикселям и отступам, 
    которые затем можно использовать в media запросах*/
    breakPoints: {
        plancshet: {
            width: "992px",
            fields: "20px"
        },
        sm: {
            width: "720px",
            fields: "10px"
        },
        xs: {
            width: "576px",
            fields: "5px"
        },
        xss: {
            width: "380px",
            fields: "5px"
        }
    },
    outputStyle: 'scss',
    oldSizeStyle: false, //убираем старый стиль записи
    /*properties: [] */
};

smartgrid('./src/precss', settings);