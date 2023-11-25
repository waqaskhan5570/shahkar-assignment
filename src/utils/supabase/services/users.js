import { supabase } from '../supabaseClient';

export const getUserByUid = async uid => {
  const response = await supabase.from('users').select('*').eq('uid', uid);
  return response;
};
