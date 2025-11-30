export type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links: {
    self: { href: string };
  };
};

export type CustomerForm = Omit<Customer, "_links">;

export type Training = {
  id: number;
  date: string;
  activity: string;
  duration: number;

  customer: string | null;
};


export type TrainingForm = {
  date: string;
  activity: string;
  duration: number;
  customer: string;   
};
