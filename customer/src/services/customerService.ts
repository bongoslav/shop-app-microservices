// src/customer/src/services/customerService.ts

import Customer from "../database/models/Customer";

export class CustomerService {
  static async getAllCustomers(): Promise<Customer[]> {
    try {
      return await Customer.findAll();
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }
  }

  static async getCustomerById(id: number): Promise<Customer | null> {
    try {
      return await Customer.findByPk(id);
    } catch (error) {
      throw new Error(
        `Error fetching customer with id ${id}: ${error.message}`
      );
    }
  }

  static async createCustomer(data: any): Promise<Customer> {
    try {
      return await Customer.create(data);
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  static async updateCustomer(
    id: number,
    data: any // TODO
  ): Promise<[number, Customer[]]> {
    try {
      const [affectedRows, updatedCustomers] = await Customer.update(data, {
        where: { id },
        returning: true,
      });
      return [affectedRows, updatedCustomers];
    } catch (error) {
      throw new Error(
        `Error updating customer with id ${id}: ${error.message}`
      );
    }
  }

  static async deleteCustomer(id: number): Promise<number> {
    try {
      return await Customer.destroy({
        where: { id },
      });
    } catch (error) {
      throw new Error(
        `Error deleting customer with id ${id}: ${error.message}`
      );
    }
  }
}
