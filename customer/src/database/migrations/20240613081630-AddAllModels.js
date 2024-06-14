"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // create Addresses table with its columns
      await queryInterface.createTable(
        "Addresses",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          street: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          country: {
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

      // Create Customers table
      await queryInterface.createTable(
        "Customers",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          salt: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phone: {
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

      // Create the join table
      await queryInterface.createTable(
        "Customers_Addresses",
        {
          customerId: {
            allowNull: false,
            references: { model: "Customers", key: "id" },
            onDelete: "CASCADE",
            type: DataTypes.UUID,
          },
          addressId: {
            allowNull: false,
            references: { model: "Addresses", key: "id" },
            onDelete: "CASCADE",
            type: DataTypes.UUID,
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

      // Create the products table
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
          banner: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
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

      // Create the Cart table
      await queryInterface.createTable(
        "Carts",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          unit: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "Customers", key: "id" },
            onDelete: "CASCADE",
          },
          productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "Products", key: "id" },
            onDelete: "CASCADE",
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

      // add the relationship between carts and products
      await queryInterface.addColumn(
        "Products",
        "cartId",
        {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "Carts", key: "id" },
          onDelete: "CASCADE",
        },
        { transaction }
      );

      // create Orders table
      await queryInterface.createTable(
        "Orders",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
          amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "Customers", key: "id" },
            onDelete: "CASCADE",
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

      await queryInterface.addColumn(
        "Customers",
        "cartId",
        {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "Carts", key: "id" },
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
      await queryInterface.dropTable(
        "Addresses",
        { cascade: true },
        { transaction }
      );
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
        "Customers",
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
