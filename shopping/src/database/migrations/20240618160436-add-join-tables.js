"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "Carts_Products",
        {
          cartId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "Carts", key: "id" },
            onDelete: "CASCADE",
          },
          productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "Products", key: "id" },
            onDelete: "CASCADE",
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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

      await queryInterface.createTable(
        "Orders_Products",
        {
          orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "Orders",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: "Products",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        "Carts_Products",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Orders_Products",
        { cascade: true },
        { transaction }
      );
    });
  },
};
