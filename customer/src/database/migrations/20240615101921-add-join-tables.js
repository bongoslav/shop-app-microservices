"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // wishlist -> products
      await queryInterface.createTable(
        "Wishlist_Products",
        {
          wishlistId: {
            allowNull: false,
            references: { model: "Wishlists", key: "id" },
            onDelete: "CASCADE",
            type: DataTypes.UUID,
          },
          productId: {
            allowNull: false,
            references: { model: "Products", key: "id" },
            onDelete: "CASCADE",
            type: DataTypes.UUID,
          },
          quantity: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.INTEGER,
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

      // order -> products
      await queryInterface.createTable(
        "Order_Products",
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

      // carts -> products
      await queryInterface.createTable(
        "Cart_Products",
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
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.INTEGER,
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
        "Wishlist_Products",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Order_Products",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Customers_Addresses",
        { cascade: true },
        { transaction }
      );
      await queryInterface.dropTable(
        "Cart_Products",
        { cascade: true },
        { transaction }
      );
    });
  },
};
