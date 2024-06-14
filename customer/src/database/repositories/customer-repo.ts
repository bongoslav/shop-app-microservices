import Customer, { CustomerData } from "../models/Customer";
import Address, { AddressData } from "../models/Address";
import CustomersAddresses, {
  CustomersAddressesData,
} from "../models/CustomersAddresses";

// Dealing with database operations
class CustomerRepository {
  async CreateCustomer({
    email,
    hashedPassword,
    phone,
    salt,
  }: CustomerData): Promise<Customer> {
    const customer = await Customer.create({
      email,
      hashedPassword,
      salt,
      phone,
      address: [],
    });
    return customer;
  }

  async CreateAddress({
    customerId,
    street,
    postalCode,
    city,
    country,
  }: AddressData & CustomersAddressesData): Promise<Address> {
    const customer = await Customer.findByPk(customerId);
    let newAddress: Address;
    if (customer) {
      newAddress = await Address.create({
        street,
        postalCode,
        city,
        country,
      });
      await CustomersAddresses.create({
        customerId,
        addressId: newAddress.id,
      });
      return newAddress;
    } else {
      throw new Error("Customer not found");
    }
  }

  //   async FindCustomerByEmail({ email }): Promise<Customer | null> {
  //     const existingCustomer = await Customer.findOne({ where: { email } });
  //     return existingCustomer;
  //   }

  //   async FindCustomerById({ id }): Promise<Customer | null> {
  //     const existingCustomer = await Customer.findByPk(id, { include: Address });
  //     return existingCustomer;
  //   }

  //   async Wishlist(customerId: string): Promise<any[]> {
  //     const customer = await Customer.findByPk(customerId, { include: Wishlist });
  //     return customer ? customer.wishlist : [];
  //   }

  //   async AddWishlistItem(
  //     customerId: string,
  //     { _id, name, description, price, available, banner }
  //   ): Promise<any[]> {
  //     const product = { _id, name, description, price, available, banner };
  //     const customer = await Customer.findByPk(customerId, { include: Wishlist });
  //     if (customer) {
  //       let wishlist = customer.wishlist || [];
  //       const existingIndex = wishlist.findIndex((item) => item._id === _id);
  //       if (existingIndex !== -1) {
  //         wishlist.splice(existingIndex, 1);
  //       }
  //       wishlist.push(product);
  //       await customer.update({ wishlist });
  //       return wishlist;
  //     }
  //     throw new Error("Unable to add to wishlist!");
  //   }

  //   async AddCartItem(
  //     customerId: string,
  //     { _id, name, price, banner },
  //     qty: number,
  //     isRemove: boolean
  //   ): Promise<any[]> {
  //     const customer = await Customer.findByPk(customerId, { include: Cart });
  //     if (customer) {
  //       let cartItems = customer.cart || [];
  //       const existingIndex = cartItems.findIndex(
  //         (item) => item.product._id === _id
  //       );
  //       if (existingIndex !== -1) {
  //         if (isRemove) {
  //           cartItems.splice(existingIndex, 1);
  //         } else {
  //           cartItems[existingIndex].unit = qty;
  //         }
  //       } else {
  //         cartItems.push({ product: { _id, name, price, banner }, unit: qty });
  //       }
  //       await customer.update({ cart: cartItems });
  //       return cartItems;
  //     }
  //     throw new Error("Unable to add to cart!");
  //   }

  //   async AddOrderToProfile(customerId: string, order): Promise<Customer | null> {
  //     const customer = await Customer.findByPk(customerId);
  //     if (customer) {
  //       if (!customer.orders) {
  //         customer.orders = [];
  //       }
  //       customer.orders.push(order);
  //       customer.cart = [];
  //       return await customer.save();
  //     }
  //     throw new Error("Unable to add order!");
  //   }
}

export default CustomerRepository;
