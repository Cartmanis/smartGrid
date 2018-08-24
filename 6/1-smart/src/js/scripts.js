window.onload = function () {
    //если calc не поддерживается добавляем стили styles-nocalc.css в DOM 
    if (!checkCalc()) {
        var style = this.document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'css/styles-nocalc.css');
        this.document.body.appendChild(style);
    }
}

/*функция проверки поддержки функции calc в браузере
Если поддерживается true иначе false
*/
function checkCalc() {
    var div = document.createElement('div');
    div.style.cssText = 'width: calc(100%)';
    return div.style.length > 0;
}