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


var logCarProperties = bind(logObjectsProperties, car);
var	logUserProperies = bind(logObjectsProperties, user);
console.log('Пример 1: \n' + logCarProperties() + '\n' + logUserProperies());


var userAge = bind(car.logAge, user, 2019);
console.log('Пример 2: \n' + car.logAge(2019) + '\n' + userAge());


var carSayHi = bind(user.sayHi, car, car.make, car.model);

console.log('Пример 3:\n' + user.sayHi(user.firstName, user.lastName) + '\n' + carSayHi());