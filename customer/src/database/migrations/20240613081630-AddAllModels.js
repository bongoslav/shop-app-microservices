"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // Addresses
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

      // Customers
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
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: true,
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

      // Minimal Product Reference method combined with API Composition for fetching complete wishlist data
      // Wishlists
      await queryInterface.createTable(
        "Wishlists",
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

      // WishlistProducts
      await queryInterface.createTable(
        "WishlistProducts",
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          wishlistId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: "Wishlists", key: "id" },
            onDelete: "CASCADE",
          },
          productId: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        "Addresses",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Customers",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Wishlists",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "WishlistProducts",
        { cascade: true },
        { transaction }
      );
    });
  },
};
