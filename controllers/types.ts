import { ObjectId } from 'mongoose';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface PatchMePayload {
  email: string;
  name: string;
}

export interface SignupPayload {
  email: string;
  name: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
  password: string;
}

export interface Movie {
  country: string;
  director: string;
  duration: number;
  year: number;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner: ObjectId;
  movieId: string;
  nameRU: string;
  nameEN: string;
}

export interface MoviePayload {
  country: string;
  director: string;
  duration: number;
  year: number;
  description: string;
  image: string;
  trailer: string;
  thumbnail: string;
  movieId: string;
  nameRU: string;
  nameEN: string;
}
