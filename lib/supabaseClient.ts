import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { link } from "fs";
import { use } from "react";
import useSWR, { mutate } from "swr";
import { notFound } from "next/navigation";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseKey);
const supabase = createClientComponentClient();

export const signUp = async (payload: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data, error } = await supabase.auth.signUp(payload);
  if (error) throw error;

  // Once signed up, insert into `profiles`
  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id, // match with auth.users.id
      username: payload.username,
    });
  }
  return data;
};

export const signIn = async (payload: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword(payload);
  return data;
};

export const signOut = async () => await supabase.auth.signOut();

export const isLoggedIn = async () => {
  const data = await supabase.auth.getUser();

  return data;
};

export const getCurrentUser = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const user = session?.user;
  let profileData;
  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profileData = data;
  }

  if (sessionError || !session) {
    return notFound();
  }

  return { user, profileData };
};

export const saveProfile = async (name: string, bio: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .update([
        {
          id: user.id, // links to auth.users
          name,
          bio,
          // username: user.user_metadata.username,
          // social_links: {},
        },
      ])
      .eq("id", user.id);

    return { data };
  }
};

export const saveLink = async (platform: string, url: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("links").upsert([
      {
        profile_id: user.id, // links to auth.users
        platform,
        url,
        // social_links: {},
      },
    ]);
  }
};

export const getLinks = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const user = session?.user;
  let links;
  if (user) {
    const { data, error } = await supabase
      .from("links")
      .select("platform, url")
      .eq("profile_id", user.id);
    links = data;
    console.log(session, data);
  }

  if (sessionError || !session) {
    console.error("No active session");
    return null;
  }

  return links;
};
export const getUserDataByUsername = async (username: string) => {
  let profileData;
  if (username) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();
    profileData = data;
  }

  return { profileData };
};

////// SWRs //////

export const useLinks = () => {
  const { data, error, isLoading, mutate } = useSWR(`links`, getLinks);

  return {
    linkData: data,
    isLoading,
    isError: error,
    mutateLinks: mutate,
  };
};

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(`user`, getCurrentUser);

  return {
    currentUserData: data ?? null,
    isLoading,
    isError: error,
    mutateCurrentUser: mutate,
  };
};

export const useUserByUsername = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `user-${username}` : null,
    () => getUserDataByUsername(username)
  );
  return {
    userByUsernameData: data ?? null,
    isLoading,
    isError: error,
    mutateUserByUsername: mutate,
  };
};
