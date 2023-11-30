import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SUPABASE_URL??"";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY??"";

const supabase = createClient(supabaseURL, supabaseAnonKey);

/**
 * Create or update user in Supabase
 * 
 * After a user signs in, we check if the user exists in the database.
 * - If the user exists, we do nothing.
 * - If the user does not exist, we create a new user.
 * 
 * This is called in the signIn event of the next-auth config.
 * 
 * User data is stored in the "users" table with the following schema:
 * - id: UUID
 * - name: String
 * - email: String
 * - image: String
 * - created_at: Timestamp
 * - updated_at: Timestamp
 * 
 * @param user 
 */
export const createOrUpdateUser = async (user: any) => {
    let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

    if (userError && userError.message !== 'No rows found') {
        throw userError;
    }

    if (!userData) {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
            ]);

        if (error) {
            throw error;
        }
    }
}
