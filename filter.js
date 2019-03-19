(function() {


	function Filter (field, operations, typeValue, value) {
		this.field = field;
		this.operations = operations;
		this.typeValue = typeValue;
	}


	var filters = {
		text: new Filter ('Text field', ['Equal', 'Greater than', 'Less than'], 'text'),
		namber: new Filter ('Number field', ['Containing', 'Exactly matching', 'Begins with', 'Ends with'], 'number')
	}


	var countRow = 0;

	var form = document.createElement('form');
	form.classList.add('filter');

	var formRow = document.createElement('div');
	formRow.setAttribute('data-count', countRow);
	formRow.classList.add('filter__row');

	var formFragment = document.createDocumentFragment();


	var selectField = document.createElement('select');
	selectField.name = 'field';
	formFragment.appendChild(selectField);


	var selectOperations = document.createElement('select');
	selectOperations.name = 'operations';
	formFragment.appendChild(selectOperations);


	var input = document.createElement('input');
	input.name = 'input';
	formFragment.appendChild(input);


	console.log(input);

	formRow.appendChild(formFragment);
	form.appendChild(formRow);
	document.body.appendChild(form);


	for (key in filters) {

		var option = new Option(filters[key].field, filters[key].field);
		selectField.appendChild(option);

	}


	renderDependentFields();

	selectField.addEventListener('change', renderDependentFields);


	function renderDependentFields() {

		if (this !== window) {
			selectField = this;
			console.log(this.parentElement.childNodes);

			// input = document.queryselector('input[name="input"]');
		}

		var field = selectField.options[selectField.selectedIndex].value;

		for (key in filters) {
			
			if (filters[key].field === field) {
				var selectedOperations = filters[key].operations;
				var inputType = filters[key].typeValue;

				input.value = '';
				input.setAttribute('type', inputType);
				
				selectOperations.options.length = 0;

				for (var i = 0; i < selectedOperations.length; i++ ) {

					var option = new Option(selectedOperations[i], selectedOperations[i]);
					selectOperations.appendChild(option);

				}

				break;
			}

		}

	} 

	return false;


})();