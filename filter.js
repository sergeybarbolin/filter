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

	var result = addRowForm();
	addRowForm();

	var selectField = result.field;
	var selectOperations = result.operations;
	var input = result.input;

	// document.body.appendChild(form);


	var form = document.createElement('form');
	form.classList.add('filter');

	function addRowForm() {


		var formRow = document.createElement('div');
		
		formRow.classList.add('filter__row');
		formRow.setAttribute('data-count', countRow);

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


		formRow.appendChild(formFragment);
		form.appendChild(formRow);

		countRow++;

		var obj = {
			field: selectField,
			operations: selectOperations,
			input: input
		}

		for (key in filters) {

			var option = new Option(filters[key].field, filters[key].field);
			selectField.appendChild(option);

		}

		renderDependentFields();

		return obj;

	}







	renderDependentFields();


	selectFields = document.querySelectorAll(`select[name="field"]`);

	for (var i = 0; i < selectFields.length; i++) {
		selectFields[i].addEventListener('change', renderDependentFields);
	}
	


	function renderDependentFields() {

		console.log(this);

		if (this !== window) {
			selectField = this;

			countRow = this.parentElement.getAttribute('data-count');

			input = document.querySelector(`.filter__row[data-count="${countRow}"] input[name="input"]`);
			selectOperations = document.querySelector(`.filter__row[data-count="${countRow}"] select[name="operations"]`);

			console.log(this);

		}

		console.log(selectField);
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