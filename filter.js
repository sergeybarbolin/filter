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



	var form = document.createElement('form');
	form.classList.add('filter');


	var btnApply = document.createElement('button');
	btnApply.type = 'button';
	btnApply.innerHTML = "Apply";
	form.appendChild(btnApply);

	var countRow = 0;


	document.body.appendChild(form);
	


	function addRowForm(form) {

		if (countRow < 10) {

		var formRow = document.createElement('div');
		
		formRow.classList.add('filter__row');
		formRow.setAttribute('data-count', countRow);

		var formFragment = document.createDocumentFragment();


		var selectField = document.createElement('select');
		selectField.name = 'field';
		selectField.addEventListener('change', renderDependentFields);
		formFragment.appendChild(selectField);


		var selectOperations = document.createElement('select');
		selectOperations.name = 'operations';
		formFragment.appendChild(selectOperations);


		var input = document.createElement('input');
		input.name = 'input';
		formFragment.appendChild(input);

		if (countRow > 0) {
			var btnDelete = document.createElement('button');
			btnDelete.type = 'button';
			btnDelete.innerHTML = 'Delete';
			btnDelete.addEventListener('click', function() { deleteRowForm(btnDelete) }, false);
			formFragment.appendChild(btnDelete);
		}



		formRow.appendChild(formFragment);

		form.insertBefore(formRow, form.lastChild);

		for (key in filters) {

			var option = new Option(filters[key].field, filters[key].field);
			selectField.appendChild(option);

		}

		countRow++;

		var obj = {
			field: selectField,
			operations: selectOperations,
			input: input,
			count: countRow
		}

		renderDependentFields(obj);

		if (countRow === 10) {
			btnApply.remove();
		}

		return obj;



		} else {
			return false;
		}

	};

	addRowForm(form);

	
	btnApply.addEventListener('click', function() { addRowForm(form) }, false);

	function deleteRowForm(el) {
		el.parentElement.remove();
	}


	function renderDependentFields(obj) {



		console.log(this);

		if (this !== window) {
			selectField = this;

			currentRow = this.parentElement.getAttribute('data-count');

			input = document.querySelector(`.filter__row[data-count="${currentRow}"] input[name="input"]`);
			selectOperations = document.querySelector(`.filter__row[data-count="${currentRow}"] select[name="operations"]`);

		} else {
			var result = obj;
			var selectField = result.field;
			var selectOperations = result.operations;
			var input = result.input;
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