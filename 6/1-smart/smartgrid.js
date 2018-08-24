const smartgrid = require('smart-grid');

//объект настроек для smartgrid
const settings = {
    columns: 12, //настройка - сколько будет колонок в сетке
    /*% будут точнее при уменьшении экрана в % будет пропорционально
    межколоночники идти с сеткой*/
    offset: '32px',
    container: { //настройки для примеси wrapper-для центровки сайта
        maxWidth: '1280px',
        fields: '30px'
    },
    outputStyle: 'scss',
    oldSizeStyle: false, //убираем старый стиль записи
    /*properties: [] */
};

smartgrid('./src/precss', settings);