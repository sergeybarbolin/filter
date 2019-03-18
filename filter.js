// var operations = {

// 	filterType = [],

// 	numeric: ['Equal', 'Greater than', 'Less than'],
// 	text: ['Containing', 'Exactly matching', 'Begins with', 'Ends with'],
// 	currentOption: (function() {

// 		var options = document.querySelectorAll('.js-filter-type option');

// 		for (var i = 0; i < options.length; i++) {
// 		  if(options[i].selected) {
// 		    return options[i].value;
// 		  }
// 		}

// 	})()
// }



function Filter (field, operations, typeValue, value) {
	this.field = field;
	this.operations = operations;
	this.typeValue = typeValue;
	this.value = value;
}

var filters = {
	textFilter: new Filter ('Text field', ['Equal', 'Greater than', 'Less than'], 'text', ''),
	namberFilter: new Filter ('Number field', ['Containing', 'Exactly matching', 'Begins with', 'Ends with'], 'number', '')
}

console.log(filters);

function render() {



	var selectField = document.querySelector('.js-filter-field');
	var option;



	for (key in filters) {
		option = document.createElement('option');
		option.innerHTML = filters[key].field;
  		selectField.appendChild(option);


		if (filters[key].field === 'Text field') {
			console.log(filters[key].operations);
		};  		
	}




	var selectFieldOptions = document.querySelectorAll('.js-filter-field option');
	selectFieldOptions[0].select = true;
	selectFieldOptions[0].setAttribute('selected', '');

	
	var operations = (function() {
		for (key in selectFieldOptions) {

			if (selectFieldOptions[key].select) {
				return selectFieldOptions[key].value;
			}

		}
	})();	

	console.log(operations);


	



	var selectOperation = document.querySelector('js-filter-operation');


}



render();