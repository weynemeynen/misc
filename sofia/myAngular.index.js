angular.module('App', [])
		.controller('Ctrl', function($scope) {
			$scope.name = ucFirst('софия');

			function ucFirst(str) {
				// только пустая строка в логическом контексте даст false
				if (!str) {
					return str;
				}

				return str[0].toUpperCase() + str.slice(1);
			}
		});