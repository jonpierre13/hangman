const INITIAL_HEALTH = 7;

var health = INITIAL_HEALTH;
var score = 0;
var word = '';
var playing = false;
var triedLetters = [];

$(function() {
    $('#hangmanContainer').hide();
    $('#hangman-img-container b').hide();

    $('#btnSubmit').click(function() {
        var input = $('#guessWord').val().toUpperCase();

        if (input === '') {
            alert('Guess Word should not be empty');
        } else if (input.indexOf(' ') != -1) {
            $('#guessWord').val('');
            alert('Only one word supported now. Sorry :/');
        } else {
            word = $('#guessWord').val().toUpperCase();
            startGame();
        }
    });

    $(document).keypress(tryLettterKeyHandler);
});

function tryLettterKeyHandler(e) {
    tryLetter(e.key.toUpperCase());
}

function tryLetterClickHandler(a) {
    tryLetter($(this).text());
}

function startGame() {
    var lbl, i;
    var guessContainer = $('.guessingWordContainer');

    for (i = 0; i < word.length; i++) {
        lbl = $('<label/>')
                .text('_')
                .show();
        guessContainer.append(lbl);
    }

    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ul = $('<ul/>');
    for (i = 0; c = abc[i], i < abc.length; i++) {
        lbl = $('<li/>')
                .text(c)
                .addClass('not-tried')
                .on('click', tryLetterClickHandler)
                .show();
        ul.append(lbl);
    }
    $('.tryLetters').append(ul);

    $('#hangmanContainer').show();
    playing = true;
}

function tryLetter(guessLetter) {
    if (playing && triedLetters.indexOf(guessLetter) == -1) {
        var lnkTryLetter = $('.tryLetters ul li:contains("' + guessLetter + '")');
        lnkTryLetter.removeClass('not-tried');

        if (word.indexOf(guessLetter) != -1) {
            uncoverLetter(guessLetter);
            lnkTryLetter.addClass('ok');
        } else {
            health--;
            refreshHang();
            lnkTryLetter.addClass('notok');
        }
        lnkTryLetter.off('click');
        if (score == word.length) {
            gameWin();
        } else if (health === 0) {
            gameLost();
        }

        triedLetters.push(guessLetter);
    }
}

function refreshHang() {
    var d = INITIAL_HEALTH - health - 1;
    $('#hangman-img-container b:eq(' + d + ')').show();
}

function uncoverLetter(letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            $('.guessingWordContainer label:eq(' + i + ')').text(letter);
            score++;
        }
    }
}

function gameWin() {
    alert('You win :)');
    playing = false;
}

function gameLost() {
    alert('You lost :(');
    playing = false;
}
