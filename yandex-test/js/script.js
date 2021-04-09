$(function() {

// 2 Контрол оценки и показа рейтинга
	$('#rating').rating({
		fx: 'float',
		image: 'images/stars.png',
		loader: 'images/ajax-loader.gif',
		minimal: 0.0,
		url: '', // 'rating.php' надо создать обработчик рейтинга
		callback: function(responce){
				
				this.vote_success.fadeOut(2000);
				if(responce.msg) alert(responce.msg);
		}
	});

// 3 Прогресс-бар
	$( "#progressbar" ).progressbar({ value: 20 });

// 4 Кнопка
	$("button:first").button({ label: 'ccs3-Кнопка' });

// 5 Список из иконок	
	$( ".icons button" )
							.button({
								icons: {
										primary: "ui-icon-heart"
								}
			}).next().button({
					icons: {
							primary: "ui-icon-star"
					}
			}).next().button({
					icons: {
							primary: "ui-icon-gear"
					}
			}).next().button({
					icons: {
							primary: "ui-icon-help"
					}
			}).next().button({
					icons: {
							primary: "ui-icon-trash"
					}
			});

});