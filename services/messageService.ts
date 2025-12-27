import { getSupabaseClient } from '@/template';

export interface Message {
  id: string;
  customer_name: string;
  customer_phone: string;
  message: string;
  is_admin_reply: boolean;
  created_at: string;
}

export interface SendMessageParams {
  customer_name: string;
  customer_phone: string;
  message: string;
}

export async function fetchMessages(): Promise<{ data: Message[] | null; error: string | null }> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function sendMessage(params: SendMessageParams): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('messages')
    .insert({
      customer_name: params.customer_name,
      customer_phone: params.customer_phone,
      message: params.message,
      is_admin_reply: false,
    });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
