// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [0, 100]
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 25]
      }
    },

    company: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 100]
          }  
      },
  
      last_name: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 50]
          }  
      },
  
      first_name: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 50]
          }  
      },
  
      business_phone: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 15]
          }  
      },
  
      fax_number: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 15]
          }  
      },
  
      address: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 100]
          }  
      },
  
      city: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 50]
          }  
      },
  
      state: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 2]
          }  
      },
  
      zip: {
      type: DataTypes.STRING,
          validate: {
          len: [1, 8]
          }  
      },
  
      membership_start_date: {
      type: DataTypes.DATE
      },
      
      membership_paid_date: {
      type: DataTypes.DATE
      },
  
      membership_renewal_date: {
      type: DataTypes.DATE
      },
  
      membership_end_date: {
      type: DataTypes.DATE
      },

      user_type: {
        type: DataTypes.STRING,
        validate: {
        len: [1, 2]
        }  
    },

  },{
  
  timestamps: false
  });

 // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);

  });

  User.associate = function(models) {
        User.hasMany(models.order_summary, {
        onDelete: "cascade"
    }),
      User.hasMany(models.products, {
      onDelete: "cascade"
  })

  };
  return User;
};
