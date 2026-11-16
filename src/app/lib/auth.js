// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { betterAuth } from "better-auth";
// import { admin } from "better-auth/plugins";
// import { MongoClient } from "mongodb";


// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("emarvision");

// export const auth = betterAuth({
//     database: mongodbAdapter(db, {
//         client
//     }),
//     emailAndPassword: {
//         enabled: true,
//     },
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//     },
//     plugins: [
//         admin()
//     ],
// });