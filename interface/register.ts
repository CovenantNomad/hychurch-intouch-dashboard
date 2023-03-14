import { Gender } from "../graphql/generated";

export interface RegisterForm {
  name: string;
  gender: Gender;
  birthdayYear?: string;
  birthdayMonth?: string;
  birthdayDay?: string;
  phone: string;
  address?: string;
  description?: string;
  registrationYear?: string;
  registrationMonth?: string;
  registrationDay?: string;
}

export interface EditForm {
  name: string;
  gender: Gender;
  isActive: string;
  year?: string;
  month?: string;
  day?: string;
  phone: string;
  address?: string;
  description?: string;
}
