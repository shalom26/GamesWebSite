/**f
 * Created by Shalom on 11/30/2015.
 */

function mailToUs(elForm){

    //"mailto:gamesAreUs@gmail.com?subject=Your Subject&body=Message for the body;
    var mailBody = "mailto:gamesAreUs@gmail.com?subject=a customer says "+elForm[2].value+"&body=";
    // lenght-1 because the last element is a submit btn - ignores it
    for (var i = 0; i < elForm.length-1; i++){
        mailBody += elForm[i].getAttribute('id');
        mailBody +="=";
        mailBody += elForm[i].value;
        if ( i !== elForm.length-2) {
            mailBody += ", "
        }else{
            mailBody += ";"
        }
    }

    console.log(mailBody);
    var pressedA = document.querySelector("#sendMail");
    pressedA.setAttribute("href", mailBody);
    pressedA.click();

    window.location.assign("index.html")
}
