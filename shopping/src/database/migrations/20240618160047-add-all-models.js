"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "Products",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          supplier: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "Carts",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          customerId: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "Orders",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
          customerId: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
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
        "Products",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Carts",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Orders",
        { cascade: true },
        { transaction }
      );
    });
  },
};
