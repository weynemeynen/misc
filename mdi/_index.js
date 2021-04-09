/*раскраска*/
var colors = { 1: 'lightblue', 2: 'lime', 3: 'lightcyan', 4: 'whitesmoke' }
$('tbody tr').each(function(index){
	var lvl = $(this).attr('class').replace(/level-(\d+)/, '$1')
	$(this).find('td:lt(6):not(".empty-cell"),th:lt(1)').addClass(colors[lvl]);
	$(this).find('td:last-child,td:eq(-2)').addClass('empty-cell');
})

/*сворачивание/разворачивание*/
$("#mdi").treetable({
	column: 0,
	columnElType: 'th',
	expandable: true,
	indent: 0,
	initialState: 'expanded'
//	clickableNodeNames: true
});


/**/
var progressbar = $(".progressbar"),
	progressLabel = $(".progress-label");

$('.progressbar').progressbar({
	value: 65
})
	.attr({
		'data-date-begin': '15.03.10',
		'data-date-finish': '12.06.10'
	})
	.closest('td')
	.wrapInner('<div class="relative"></div>');

progressLabel.attr({
	'data-value': '65' + '%'
})

$(".progressbar_m_1").progressbar({
	value: 100
})
