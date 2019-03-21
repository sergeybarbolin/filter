var objFilters = {
	text: {
		field: 'Text field',
		operations: ['Equal', 'Greater than', 'Less than'],
		typeValue: 'text'

	},
	number: {
		field: 'Number field',
		operations: ['Containing', 'Exactly matching', 'Begins with', 'Ends with'],
		typeValue: 'number'

	},
	test: {
		field: 'Test field',
		operations: ['Test-operation-0', 'Test-operation-1'],
		typeValue: 'text'

	},
};



var filter = {
	parent: 'body',
	filterClass: 'filter',
	maxCountRows: 10,
	inputData: {}, 

	createForm: function () {
		var context = this;
		var filters = context.inputData;

		filterWrapper = document.querySelector(context.parent);

		var form = document.createElement('form');
		form.classList.add(context.filterClass);

		var filterNav = document.createElement('div');
		filterNav.classList.add(context.filterClass + '-nav');

		var btnAdd = document.createElement('button');
		btnAdd.type = 'button';
		btnAdd.innerHTML = "Add";
		filterNav.appendChild(btnAdd);

		var btnApply = document.createElement('button');
		btnApply.type = 'button';
		btnApply.innerHTML = "Apply";
		filterNav.appendChild(btnApply);

		var btnClear = document.createElement('button');
		btnClear.type = 'button';
		btnClear.innerHTML = "Clear";
		btnClear.addEventListener('click', function() { clearFilter() }, false);

		filterNav.appendChild(btnClear);
		filterWrapper.appendChild(form);
		filterWrapper.appendChild(filterNav);

		var countRow = 0;

		function addRowForm(form) {

			if (countRow < context.maxCountRows) {

				var formRow = document.createElement('div');
				
				formRow.classList.add(context.filterClass + '__row');
				formRow.setAttribute('data-count', countRow);

				var selectField = document.createElement('select');
				selectField.name = 'field';
				selectField.addEventListener('change', renderDependentFields);
				formRow.appendChild(selectField);


				var selectOperations = document.createElement('select');
				selectOperations.name = 'operations';
				formRow.appendChild(selectOperations);


				var input = document.createElement('input');
				input.name = 'input';
				formRow.appendChild(input);

				
				var btnDelete = document.createElement('button');
				btnDelete.type = 'button';
				btnDelete.value = 'btnDelete';
				btnDelete.innerHTML = 'Delete';
				btnDelete.addEventListener('click', function() { deleteRowForm(btnDelete) }, false);
				formRow.appendChild(btnDelete);


				if (countRow === 0) {
					btnDelete.disabled = true;
				} else if (countRow === 1) {
					form.firstChild.querySelector('button[value="btnDelete"]').disabled = false;
				}


				form.appendChild(formRow);


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

				if (countRow === context.maxCountRows) {
					btnAdd.disabled = true;
				}

				return obj;

			} else {
				return false;
			}

		};

		addRowForm(form);
		btnAdd.addEventListener('click', function() { addRowForm(form) }, false);

		function deleteRowForm(el) {
			el.parentElement.remove();
			countRow--;
			rows = form.querySelectorAll(`.${context.filterClass}__row`);
			for (var i = 0; i < rows.length; i++) {
				rows[i].setAttribute('data-count', i);
			}
			console.log(countRow);
			if (countRow === 1) {
				form.firstChild.querySelector('button[value="btnDelete"]').disabled = true;
			}
			btnAdd.disabled = false;
		}

		function clearFilter() {
			countRow = 0;
			form.innerHTML = '';
			addRowForm(form);
			btnAdd.disabled = false;
			return countRow;
		}

		function renderDependentFields(obj) {

			if (this !== window) {
				selectField = this;

				currentRow = this.parentElement.getAttribute('data-count');

				input = document.querySelector(`.${context.filterClass}__row[data-count="${currentRow}"] input[name="input"]`);
				selectOperations = document.querySelector(`.${context.filterClass}__row[data-count="${currentRow}"] select[name="operations"]`);

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


		function resultData(filters) {

		}



		btnApply.addEventListener('click', function() { context.outputData; }, false);


		return true;
	},


	set addFilters(objFilters) {
		this.inputData = objFilters;
	},

	get outputData() {

		var currentStateForm = document.querySelector('.' + this.filterClass);
		
		var data = {};

		for (key in this.inputData) {
			data[key] = [];
		};

		var array = [];

		for (var i = 0; i < currentStateForm.childNodes.length; i++) {
			var currentField = currentStateForm.childNodes[i].querySelector('select[name="field"]').options;
			var currentSelectedField = currentField[currentField.selectedIndex].value;

			var currentOperations = currentStateForm.childNodes[i].querySelector('select[name="operations"]').options;
			var currentSelectedOperation = currentOperations[currentOperations.selectedIndex].value;

			var currentInput = currentStateForm.childNodes[i].querySelector('input[name="input"]').value;

			var resultItem = {}
			resultItem.operation = currentSelectedOperation;
			resultItem.value = currentInput;

			for (key in this.inputData) {
				if (this.inputData[key].field === currentSelectedField) {
					data[key].push(resultItem);
				}
			}

		}

		return data;		
	}	

};


filter.addFilters = objFilters;
filter.createForm();

var test = filter.outputData;
console.log(test);