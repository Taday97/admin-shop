import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';


 interface RegisterError {
  ok: false;
  message: string;
}
 interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (name: string, email: string, password: string): Promise<RegisterError | RegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      name
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (err) {
    console.log(err);
    return {
        ok: false,
        message: 'Der Benutzer konnte nicht erstellt werden',
      };
  }
};
