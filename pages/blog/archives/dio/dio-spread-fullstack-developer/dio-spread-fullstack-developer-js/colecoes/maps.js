const getAdmins = (map) => {
	let admins = [];

	for ([key, value] of map) {
		if (value === 'ADMIN') {
			admins.push(key);
		}
	}

	return admins;
};

const userRoles = new Map();

userRoles.set('Joana', 'SUDO');
userRoles.set('Marcos', 'USER');
userRoles.set('Maria', 'ADMIN');
userRoles.set('Roberto', 'USER');
userRoles.set('Amanda', 'ADMIN');

console.log(getAdmins(userRoles));