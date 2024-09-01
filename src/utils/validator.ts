import { PATTERN } from "../lib/constants";

export const isValidUsername = (str: string) => str.match(PATTERN.USERNAME);

export const isValidEmail = (str: string) => str.match(PATTERN.EMAIL);

export const isValidPassword = (str: string) => str.match(PATTERN.PASSWORD);
