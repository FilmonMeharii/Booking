export interface Booking {
  _id: string;
  name: string;
  passportNumber: string;
  appointmentDate: string;
}

export interface Admin {
  username: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 