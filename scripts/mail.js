(function() {
    var mailEl = document.getElementById('mail');
    var mailLink = '68$121$116$66$88$110$114$116$115$37$85$116$121$121$106$119$37$65$120$110$114$116$115$69$120$111$117$51$104$116$51$115$127$67'.split('$');
    var mailText = '120$110$114$116$115$69$120$111$117$51$104$116$51$115$127'.split('$');
    var emailLink = '';
    var emailText = '';
    var i;
    for (i = 0; i < mailLink.length; i++)
        emailLink += String.fromCharCode(parseInt(mailLink[i], 10) - 5);
    for (i = 0; i < mailText.length; i++)
        emailText += String.fromCharCode(parseInt(mailText[i], 10) - 5);
    var linkEl = document.createElement('a');
    linkEl.setAttribute('href', 'mailto:' + emailLink);
    linkEl.textContent = emailText;
    mailEl.replaceChild(linkEl, mailEl.firstChild);
})();
