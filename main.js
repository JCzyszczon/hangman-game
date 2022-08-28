/* Main Menu Section + setting variables for game */

// Loading a sound set
var yes = new Audio("sounds/yes.wav"); // played when we guess a letter in the password
var no = new Audio("sounds/no.wav"); // played when we miss a letter in the password
var click = new Audio("sounds/click.wav"); // clicking sound 
var victory = new Audio("sounds/sfx-victory5.mp3"); // played when we guess a password
var lose = new Audio("sounds/mixkit-retro-arcade-lose-2027.wav"); // played when we don't guess a password
var theme = new Audio("sounds/themev2.mp3") // main music theme

// local storage (to save music and sounds settings) - after re-entering the page, the settings will be loaded
var glosnosc = localStorage.getItem('volume');
var wybor_dzwiekow = localStorage.getItem('sounds');
var wybor_click = localStorage.getItem('clicks');

// session storage (to save our score)
var punkty = sessionStorage.getItem('game-points');

// some helpful variables
var active = false;
var active2 = false;
var activeS = false;

// game variables
var zycia = 9;
var blad = 0;

// reading from local memory how many points the player has
if(punkty === null) // if there is no value in memory
{   
    sessionStorage.setItem('game-points', '0'); // setting points as 0
}
else
{
    points = punkty; // else setting points from loaded value
}

if(glosnosc === null) // same
{
    theme.volume = 0.05;
    localStorage.setItem('volume', '0.05')
}
else
{
    theme.volume = glosnosc;
}

if(wybor_dzwiekow === null) // same
{
    yes.volume = 1.00;
    no.volume = 1.00;
    victory.volume = 1.00;
    lose.volume = 1.00;
    localStorage.setItem('sounds', '1.00');
}
else
{
    yes.volume = wybor_dzwiekow;
    no.volume = wybor_dzwiekow; 
    victory.volume = wybor_dzwiekow; 
    lose.volume = wybor_dzwiekow;
}

if(wybor_click === null) // same
{
    click.volume = 0.25;
    localStorage.setItem('clicks', '0.25');
}
else
{
    click.volume = wybor_click;
}

// depending on sounds and music values - displaing elements on page (like muted icons etc.)
if(wybor_click == 0.25)
{
    document.getElementById("wl2").style.backgroundColor = "var(--theme1)";
    document.getElementById("wl2").style.border = "2px solid var(--text)";
    document.getElementById("wyl2").style.border = "2px solid #5B61BA";
    document.getElementById("wyl2").style.backgroundColor = "#5B61BA";
    document.getElementById("wl2").style.cursor = "default";
    document.getElementById("wyl2").style.cursor = "pointer";
    activeS = true;
}

if(wybor_click == 0.00)
{
    document.getElementById("wyl2").style.backgroundColor = "var(--theme1)";
    document.getElementById("wyl2").style.border = "2px solid var(--text)";
    document.getElementById("wl2").style.border = "2px solid #5B61BA";
    document.getElementById("wl2").style.backgroundColor = "#5B61BA";
    document.getElementById("wyl2").style.cursor = "default";
    document.getElementById("wl2").style.cursor = "pointer";
    activeS = false;
}

if(wybor_dzwiekow == 1.00)
{
    document.getElementById("wl").style.backgroundColor = "var(--theme2)";
    document.getElementById("wl").style.border = "2px solid var(--text)";
    document.getElementById("wyl").style.border = "2px solid #A947A0";
    document.getElementById("wyl").style.backgroundColor = "#A947A0";
    document.getElementById("wl").style.cursor = "default";
    document.getElementById("wyl").style.cursor = "pointer";
}

if(wybor_dzwiekow == 0.00)
{
    document.getElementById("wyl").style.backgroundColor = "var(--theme2)";
    document.getElementById("wyl").style.border = "2px solid var(--text)";
    document.getElementById("wl").style.border = "2px solid #A947A0";
    document.getElementById("wl").style.backgroundColor = "#A947A0";
    document.getElementById("wyl").style.cursor = "default";
    document.getElementById("wl").style.cursor = "pointer";
}

document.getElementById("volume").innerHTML = Math.round(theme.volume*1000)+"%";
if(theme.volume >= 0.099)
{
    document.getElementById("plus").style.cursor = "default";
}
else{
    document.getElementById("plus").style.cursor = "pointer";
}

if(theme.volume <= 0.001)
{
    document.getElementById("minus").style.cursor = "default";
}
else{
    document.getElementById("minus").style.cursor = "pointer";
}

// displaying how many lives the player has left
document.getElementById('zycia').innerHTML = "Życia: " + zycia;
// displaying how much points the player has
document.getElementById('points').innerHTML = "Punkty: " + points;
// displaying category of the game password
document.getElementById("kategoria").innerHTML = "Kategoria: " + kategoria;

// reading at what point the player is on the page (this prevents items from being displayed anew after a page refresh)
const isLoggedIn = sessionStorage.getItem('loggedIn');
var isingame = isLoggedIn;

window.onload = function() {
    if(isingame == "null") // if null - it means that the player enters the site for the first time in a given session - the home screen is displayed
    {
        document.getElementById('start').style.display = 'flex';
        document.getElementById('wybor-kategorii').style.display = 'none';
        document.getElementById('game').style.display = 'none';
    }
    if(isingame == "false") // if false - it means that the player has gone to the main menu, but is not in the game yet - after refreshing, the start screen will not be displayed, only the main menu
    {
        toChoice();
    }
    if(isingame == "true") // if true - it means that the player is in the game - after refreshing the page, he will not have to go to the next sections from the beginning
    {
        document.title = "Gra w Wisielca - w Trakcie Gry";
        document.getElementById('start').style.display = 'none';
        document.getElementById('wybor-kategorii').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
    }
}

// function that goes to the main menu (after clicking start button or "back" icon)
document.getElementById('start-button').addEventListener('click', toChoice); 
function toChoice()
{
    document.title = "Gra w Wisielca - Menu";
    click.play();
    theme.play();
    sessionStorage.setItem('loggedIn', 'false');
    document.getElementById("start").style.display = "none";
    document.getElementById("wybor-kategorii").style.display = "flex";
    document.getElementById('ustawienia').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    if(theme.volume <= 0.00)
    {
        document.getElementById('volume-icon').style.display = 'none';
        document.getElementById('volume-icon-mute').style.display = 'flex';
    }
    else
    {
        document.getElementById('volume-icon').style.display = 'flex';
        document.getElementById('volume-icon-mute').style.display = 'none';
    }
}

// function that mute music on site
document.getElementById('volume-icon').addEventListener('click', muteMusic)
function muteMusic()
{
    click.play();
    theme.volume = 0.00;
    localStorage.setItem('volume', '0.00');
    document.getElementById('volume-icon').style.display = 'none';
    document.getElementById('volume-icon-mute').style.display = 'flex';
    document.getElementById("volume").innerHTML = Math.round(theme.volume*1000)+"%";
}

// function that unmute music on site
document.getElementById('volume-icon-mute').addEventListener('click', unmuteMusic);
function unmuteMusic() 
{
    click.play();
    theme.volume = 0.05
    localStorage.setItem('volume', '0.05');
    document.getElementById('volume-icon').style.display = 'flex';
    document.getElementById('volume-icon-mute').style.display = 'none';
    document.getElementById("volume").innerHTML = Math.round(theme.volume*1000)+"%";
};

// function going to game settings
document.getElementById('settings').addEventListener('click', toSettings);
function toSettings() 
{
    document.title = "Gra w Wisielca - Ustawienia";
    click.play();
    document.getElementById('ustawienia').style.display = 'flex';
    document.getElementById('wybor-kategorii').style.display = 'none';
}

// return to the main menu (from settings)
document.getElementById('back').addEventListener('click', toChoice);

// volume up in-game music
document.getElementById('plus').addEventListener('click', volumeUp);
function volumeUp()
{
    var glosnosc_muzyki = theme.volume;
    document.getElementById("volume-icon").style.display = "flex";
    document.getElementById("volume-icon-mute").style.display = "none";
    if(glosnosc_muzyki <= 0.09)
    {
        document.getElementById("minus").style.cursor = "pointer"; 
        theme.volume = theme.volume + 0.01;
        glosnosc_muzyki = theme.volume.toFixed(2);
        localStorage.setItem('volume', glosnosc_muzyki);
        document.getElementById("volume").innerHTML = Math.round(glosnosc_muzyki*1000)+"%";
        click.play();
    }
    else
    {
        click.pause();
    }

    if(glosnosc_muzyki > 0.09)
    {
        document.getElementById("plus").style.cursor = "default"; 
    }
}

// volume down in-game music
document.getElementById('minus').addEventListener('click', volumeDown);
function volumeDown()
{
    if(theme.volume > 0.00)
    {
        document.getElementById("plus").style.cursor = "pointer";
        if(theme.volume > 0.01)
        {          
            theme.volume = theme.volume - 0.01;
            glosnosc_muzyki = theme.volume.toFixed(2);
            document.getElementById("volume").innerHTML = Math.round(glosnosc_muzyki*1000)+"%";
        }
        else
        {
            theme.volume = 0.00;
            glosnosc_muzyki = 0.00;
            document.getElementById("volume").innerHTML = Math.round(glosnosc_muzyki*1000)+"%";
            document.getElementById("volume-icon").style.display = "none";
            document.getElementById("volume-icon-mute").style.display = "block";
        }
        click.play();
    }
    else{
        click.pause();
    }

    if(glosnosc_muzyki == 0.00)
    {
        document.getElementById("minus").style.cursor = "default";
    }
    localStorage.setItem('volume', glosnosc_muzyki);
}

// mute sounds (win, lose, hit, miss, etc.)
document.getElementById("wyl").addEventListener("click", soundsOff);
function soundsOff()
{
    click.play();
    localStorage.setItem('sounds', '0.00');
    document.getElementById("wyl").style.backgroundColor = "var(--theme2)";
    document.getElementById("wyl").style.border = "2px solid var(--text)";
    document.getElementById("wl").style.border = "2px solid #A947A0";
    document.getElementById("wl").style.backgroundColor = "#A947A0";
    document.getElementById("wyl").style.cursor = "default";
    document.getElementById("wl").style.cursor = "pointer";
    yes.volume = 0.00;
    no.volume = 0.00;
    victory.volume = 0.00;
    lose.volume = 0.00;
    if(active == true)
    {
        click.pause();
    }
    else{
        click.play();
        active = false;
    }
    activated();
}
function activated()
{
    active = true;
    active2 = false;
}

// unmute sounds (win, lose, hit, miss, etc.)
document.getElementById("wl").addEventListener("click", soundsOn);
function soundsOn()
{
    click.play();
    localStorage.setItem('sounds', '1.00');
    document.getElementById("wl").style.backgroundColor = "var(--theme2)";
    document.getElementById("wl").style.border = "2px solid var(--text)";
    document.getElementById("wyl").style.border = "2px solid #A947A0";
    document.getElementById("wyl").style.backgroundColor = "#A947A0";
    document.getElementById("wl").style.cursor = "default";
    document.getElementById("wyl").style.cursor = "pointer";
    yes.volume = 1.00;
    no.volume = 1.00;
    victory.volume = 1.00;
    lose.volume = 1.00;
    if(active2 == true)
    {
        click.pause();
    }
    else{
        click.play();
        active2 = false;
    }
    activated2();
}
function activated2()
{
    active2 = true;
    active = false;
}

// mute click sounds in the game
document.getElementById("wyl2").addEventListener("click", clickOff);
function clickOff()
{
    click.play();
    localStorage.setItem('clicks', '0.00');
    document.getElementById("wyl2").style.backgroundColor = "var(--theme1)";
    document.getElementById("wyl2").style.border = "2px solid var(--text)";
    document.getElementById("wl2").style.border = "2px solid #5B61BA";
    document.getElementById("wl2").style.backgroundColor = "#5B61BA";
    document.getElementById("wyl2").style.cursor = "default";
    document.getElementById("wl2").style.cursor = "pointer";
    click.volume = 0.00;
    activeS = false;
}

// unmute click sounds in the game
document.getElementById("wl2").addEventListener("click", clickOn);
function clickOn()
{
    localStorage.setItem('clicks', '0.25');
    document.getElementById("wl2").style.backgroundColor = "var(--theme1)";
    document.getElementById("wl2").style.border = "2px solid var(--text)";
    document.getElementById("wyl2").style.border = "2px solid #5B61BA";
    document.getElementById("wyl2").style.backgroundColor = "#5B61BA";
    document.getElementById("wl2").style.cursor = "default";
    document.getElementById("wyl2").style.cursor = "pointer";
    if(activeS == true)
    {
        click.pause();
    }
    else{
        click.volume = 0.25;
        click.play();
    }
    activatedS();
}
function activatedS()
{
    activeS = true;
}

// go to the game from the main menu
document.getElementById('toGame').addEventListener('click', toGamefun);
function toGamefun()
{
    document.title = "Wisielec - W trakcie gry!";
    sessionStorage.setItem('loggedIn', 'true');
    document.getElementById('game').style.display = "flex";
}

document.getElementById('toGame2').addEventListener('click', toGamefun);
document.getElementById('toGame3').addEventListener('click', toGamefun);

// going back to the main menu
document.getElementById('back2').addEventListener('click', toChoice);


/* Game Section */

// letters to choose from in the game
var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "Y";
litery[31] = "X";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

// based on the password taken from the database (passed from index.php)
haslo = haslo.toUpperCase();
var dlugosc = haslo.length;
var haslo1 = "";

// replace the password with the characters "-"
for(i = 0; i < dlugosc; i++)
{
    if(haslo.charAt(i) == " ")
    {
        haslo1 = haslo1 + " ";
    }
    else
    {
        haslo1 = haslo1 + "-";
    }
}
wypisz_haslo();

var tresc_diva = "";

// displaying letters on page
for(i = 0; i<= 34; i++)
{
    var element = "lit" + i;
    tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+','+dlugosc+')" id="'+ element + '">' + litery[i] + '</div>';
}

document.getElementById("alfabet").innerHTML = tresc_diva;

// function that updates and displays the password 
function wypisz_haslo()
{
    document.getElementById("plansza").innerHTML = haslo1;
}

// function that insert a character in a hidden password
String.prototype.ustawZnak = function(miejsce, znak)
{
    if(miejsce > this.length-1)
    {
        return this.toString();
    }
    else
    {
        return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
    }
}

// function that checks if selected letter is correct
function sprawdz(nr)
{
    var trafiona = false;

    for(i = 0; i<dlugosc; i++)
    {
        if(haslo.charAt(i) == litery[nr])
        {
            haslo1 = haslo1.ustawZnak(i, litery[nr]);
            trafiona = true;
        }
    }

    // if user select correct letter
    if(trafiona == true)
    {
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        wypisz_haslo();
    }
    else // if user select incorrect letter
    {
        no.play();
        var element = "lit" + nr;
        blad++;
        zycia--;
        document.getElementById('zycia').innerHTML = "Życia: " + zycia;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        document.getElementById("szubienica").innerHTML = '<img src="img/s' + blad + '.jpg"/>'
    }

    // if user select all letters correct
    if( haslo == haslo1)
    {
        victory.play();
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: <span class='password-style'>" + haslo + '</span><br><br><span class="reset" onclick="location.reload()">Jeszcze raz?</span><br><br><span class="bledy">Ilość błędów: '+ blad;
        points++;
        sessionStorage.setItem('game-points', points);
        document.getElementById("points").innerHTML = "Punkty: " + points;
        document.getElementById("alfabet").style.display = "block";
    }
    // if the user makes too many mistakes while guessing the password
    if (blad >= 9)
    {
        lose.play();
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: <span class='password-style'>" + haslo + '</span><br><br><span class="reset2" onclick="location.reload()">Jeszcze raz?</span>';
        points = 0;
        sessionStorage.setItem('game-points', points);
        document.getElementById("points").innerHTML = "Punkty: " + points;
        document.getElementById("alfabet").style.display = "block";
    }
}
