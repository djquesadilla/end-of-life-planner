import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL??"";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??"";

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

/**
 * Create or update wish in Supabase
 * 
 * - Each user has only one wish.
 * - We get the user_id from the user object by the email.
 * 
 * - If the user has no wish, we create a new wish.
 * - If the user has a wish, we update the existing wish. 
* 
 * - A wish is stored in the "wishes" table with the following schema:
 *  - id: UUID
 *  - user_id: UUID
 *  - content: String
 *  - created_at: Timestamp
 *  - updated_at: Timestamp
 * @param user 
 * @param wish 
 */
export const createOrUpdateWish = async (user: any, wish: any) => {
    let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email);
    
    if (userError) {
        throw userError;
    }
    if (!userData || userData.length === 0) {
        throw new Error('User not found');
    }

    // upsert: insert or update if exists a wish with user_id
    const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('user_id', userData[0].id)
    if (error) {
        throw error;
    }
    if (data && data.length > 0) {
        // update
        const { data: updatedData, error: updatedError } = await supabase
            .from('wishes')
            .update({ content: wish })
            .eq('user_id', userData[0].id)
            .single();
        if (updatedError) {
            throw updatedError;
        }
    }
    else {
        // insert
        const { data: insertedData, error: insertedError } = await supabase
            .from('wishes')
            .insert([{user_id: userData[0].id, content: wish, },]);
        if (insertedError) {
            throw insertedError;
        }
    }

    // return data or error
    return { data, error };
}
