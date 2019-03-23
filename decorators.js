function bind(method, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function() {
        var a = args.concat(Array.prototype.slice.call(arguments, 0));
        return method.apply(context, a);
    }
}

function logObjectsProperties() {
    var properties = '';
    var object = this;
    for (key in object) {
    	properties += key + ':' + object[key] + '\n';
    }
    return properties;

}

var car = {
	make: 'BMV',
	model: 'X5',
	year: 2005,
	logAge: function(currentYear) {return currentYear - this.year; }
}

var user = {
	firstName: 'Сергей',
	lastName: 'Барболин',
	year: 1996,
	sayHi: function(firstName, lastName) { return `Hello ${firstName} ${lastName}!`; }
}

// Пример 1. Привязка контекста car и user к функции logObjectsProperties
var logCarProperties = bind(logObjectsProperties, car);
var	logUserProperies = bind(logObjectsProperties, user);
console.log('Пример 1: \n' + logCarProperties() + '\n' + logUserProperies());

//Пример 2. Привязка контекста user к методу logAge объекта car
var userAge = bind(car.logAge, user, 2019);
console.log('Пример 2: \n' + car.logAge(2019) + '\n' + userAge());

//Пример 3. Привязка контекста car к методу sayHi объекта user
var carSayHi = bind(user.sayHi, car, car.make, car.model);
console.log('Пример 3:\n' + user.sayHi(user.firstName, user.lastName) + '\n' + carSayHi());