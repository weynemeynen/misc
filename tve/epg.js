/**
 * Двигаем решётку и меню
 */

// левый отступ сетки
var snood = document.getElementsByClassName('b-epg-grid')[0];
var snoodPaddingLeft = getComputedStyle(snood, '').paddingLeft;
snoodPaddingLeft = parseFloat(snoodPaddingLeft);

// смещение сетки
var snoodShift = document.getElementsByClassName('b-epg__snood')[0].style.marginLeft;

snoodShift = parseInt(snoodShift);

// каналы
var channels = document.getElementsByClassName('b-epg-grid__channels');

for (var i = 0; i < channels.length; i++) {
  if (snoodShift < 0) {
    channels[i].style.marginLeft = Math.abs(snoodShift) - snoodPaddingLeft + 'px';
  } else {
    channels[i].style.marginLeft = '-' + (snoodShift + snoodPaddingLeft) + 'px';
  }
}