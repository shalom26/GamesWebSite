/**
 * Created by Shalom on 12/1/2015.
 */

$.getJSON('api/about', function (langs) {
    var elAboutContainer = $('.container');
    var strHTML = '';

    langs.forEach(function(lang){
        if(lang.id === localStorage.lang) {
            strHTML += lang.contant;
        }
    });
    elAboutContainer.html(strHTML);
});