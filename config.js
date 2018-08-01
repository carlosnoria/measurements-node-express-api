/**
	postgres data:
		user: devuser,
		password: backend123,
		db_name: measurements 
*/

module.exports = {
    port: process.env.PORT || 3000,
    db1: {
		user: 'devuser',
	    database: 'measurements',
	    password: 'backend123',
	    port: 5432
	},
    db2: "" 
}