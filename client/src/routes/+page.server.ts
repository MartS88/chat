import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const refreshToken = cookies.get('refreshToken');

  if (refreshToken) {
    throw redirect(303, '/user-are');
  }


};
