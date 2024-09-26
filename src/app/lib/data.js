import { createClient } from "@vercel/postgres";

export const connectToDB = async () => {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log('Connected to DB');
      return client;
    }
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};