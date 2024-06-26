"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // customers -> addresses
      await queryInterface.createTable(
        "Customers_Addresses",
        {
          customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "Customers",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          addressId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "Addresses",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable(
        "Customers_Addresses",
        { cascade: true },
        { transaction }
      );
    });
  },
};
