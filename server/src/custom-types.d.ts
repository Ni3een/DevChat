
// this file do not contain any server code just types
interface AuthUser {
  id: number;
  name: string;
  email: string;
  google_id: string;
  image?: string;
  // Add other relevant user properties here
}

declare namespace Express {
  export interface Request {
    user?: AuthUser; // Optional user property
  }
}
