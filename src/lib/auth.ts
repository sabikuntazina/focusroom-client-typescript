import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongodbUri = process.env.MONGODB_URI;
const client = mongodbUri ? new MongoClient(mongodbUri) : null;
const db = client ? client.db("FocusRoom") : null;

export const auth = betterAuth({
  database: db ? mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }) : undefined,
  emailAndPassword: { 
    enabled: true, 
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },

      session :{
    cookieCache :{
      enabled:true,
      strategy : "jwt",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    }
  },
      plugins: [
        jwt(), 
    ]
});