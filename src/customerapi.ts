import type { Customer, CustomerForm } from "./types";

const BASE = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi";

export async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${BASE}/api/customers`);
  const data = await res.json();
  return data._embedded.customers;
}

export function addCustomer(customer: CustomerForm) {
  return fetch(`${BASE}/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
}

export function updateCustomer(url: string, customer: CustomerForm) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
}

export function deleteCustomer(url: string) {
  return fetch(url, {
    method: "DELETE",
  });
}
