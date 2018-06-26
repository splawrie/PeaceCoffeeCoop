module.exports = function(sequelize, DataTypes) {
 //define the order_summary data model
 var order_summary = sequelize.define("order_summary", {

    pounds: {
    type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    price: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    coop_fee: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    tax: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    sales_total: {
		type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    paid: {
		type: DataTypes.DECIMAL(10,2)
    },

    date_paid: {
		type: DataTypes.DATE
    },

},{

timestamps: false
});


order_summary.associate = function(models) {

    order_summary.belongsTo(models.products, {
    }),
    order_summary.belongsTo(models.User, {
    })
  };

  return order_summary;
};
