ymaps.ready(init);

function init() {
	var myMap = new ymaps.Map("map", {
			center: [55.766121, 37.582529],
			zoom: 17
		}),

	// Создаем геообъект с типом геометрии "Точка".
		myGeoObject = new ymaps.GeoObject({
			// Описание геометрии.
			geometry: {
				type: "Point",
				coordinates: [55.766121, 37.582529]
			}
		}),

		Placemark = new ymaps.Placemark([55.766121, 37.582529], {
			// Свойства.
			hintContent: 'Интеллектуальные социальные системы'
		}, {
			// Опции.
			// Своё изображение иконки метки.
			iconImageHref: 'images/placemark.png',
			// Размеры метки.
			iconImageSize: [91, 109],
			iconImageOffset: [-40, -120]
		});

	// Добавляем все метки на карту.
	myMap.geoObjects
		//.add(Placemark);
}