(function() {
    var magicLink = '68$121$116$66$88$110$114$116$115$37$85$116$121$121$106$119$37$65$120$110$114$116$115$69$120$111$117$51$104$116$51$115$127$67';
    var magicText = '120$110$114$116$115$69$120$111$117$51$104$116$51$115$127';
    var mailSpan = document.getElementById('mail');
    var mailLink = magicLink.split('$');
    var mailText = magicText.split('$');
    var emailLink = new String();
    var emailText = new String();
    for (var i = 0; i < mailLink.length; i++) {
        emailLink = emailLink.concat(String.fromCharCode(parseInt(mailLink[i], 10) - 5));
    }
    for (var i = 0; i < mailText.length; i++) {
        emailText = emailText.concat(String.fromCharCode(parseInt(mailText[i], 10) - 5));
    }
    mailSpan.innerHTML = '<a href="mailto:' + emailLink + '">' + emailText + '</a>';
})();
