const mongoose = require('mongoose');

const roleSetupSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	mobileNo: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

const RoleSetup = mongoose.model('RoleSetup', roleSetupSchema);

module.exports = RoleSetup;
