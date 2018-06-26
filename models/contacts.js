//THIS PAGE CREATED A CONTACT TABLE

module.exports = function(sequelize, DataTypes) {
 //define the products data model
 var contact = sequelize.define("contact", {
    name: {
		type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }  
    },

    email: {
		type: DataTypes.STRING,
		allowNull: false,
        validate: {
            isEmail: true
        }
    },
    
    phone: {
		type: DataTypes.STRING,
		allowNull: false,
        validate: {
            len: [10, 12]
        }
    },
    
    message: {
		type: DataTypes.STRING,
        allowNull: true,
    }
},{

timestamps: false
});
    return contact;
};