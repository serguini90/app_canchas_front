import jwt_decode from 'jwt-decode';

export function decodeToken(token: string): any {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}