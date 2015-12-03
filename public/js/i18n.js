var reTrans;

// This is an IIFE (Immediately Invoked Function Expression)
// that handles all Translation Related stuff
(function () {
    console.log('init is called');
    var trans= {
        he : {
            Home : 'בית',
            Games: 'משחקים',
            About:'עלינו',
            Contact:'צור קשר',
            Name:'שם',
            Email:'אימייל',
            Subject:'נושא',
            MessageUs:'שלח הודעה',
            aboutContent:'יש דברים שאסור לדבר עליהם '
        },
        sp : {
            Home : 'Casa',
            Games: 'Juegos',
            About:'Acerca',
            Contact:'Contacto',
            Name:'Nombre',
            Email:'Email',
            Subject:'Sujeto',
            MessageUs:'Mensaje nosotros',
            aboutContent:'hay cosas que no podemos hablamos '
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
    $('html').addClass('.displayNon');
    if(localStorage.lang !== null) {
        localStorage.lang = lang;
    }else {
        localStorage.lang = 'en'
    }
    reTrans(lang);
    $('html').removeClass('.displayNon');
}








