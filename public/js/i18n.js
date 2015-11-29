var reTrans;

// This is an IIFE (Immediately Invoked Function Expression)
// that handles all Translation Related stuff
(function () {
    console.log('init is called');
    var trans= {
        he : {
            CODING_GAMES : 'משחקי קידוד',
            DESC: 'משחקי קידוד היא יוזמה חברתית לעידוד משחקים'
        },
        sp : {
            CODING_GAMES : 'Juegos Del Todos',
            DESC: 'Juegos estan muy Keif'
        }

    };

    // Find all DOM elements that needs translation, and translate
    function handleTrans(lang) {
        if (lang === 'en' && !trans.en) return;

        var elsToTrans = document.querySelectorAll('[data-i18n]');
        var en = {};

        [].forEach.call(elsToTrans, function (elToTrans) {
            var transKey = elToTrans.getAttribute('data-i18n');
            var translated = trans[lang][transKey];

            // On the first time switching from english
            // keep the english version in the trans object
            if (!trans.en) {
                en[transKey] = elToTrans.innerText;
            }

            elToTrans.innerText = translated;

        });
        if (!trans.en) trans.en = en;
    }
    reTrans = handleTrans;


})();


function changeLang(lang) {
    reTrans(lang);
}








