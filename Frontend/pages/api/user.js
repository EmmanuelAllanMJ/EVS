import { MongoClient } from "mongodb";
async function handler(req, res) {
  // To get which kind of request we get
  console.log(process.env.NEXT_PUBLIC_MONGODB_URL);
  if (req.method === "POST") {
    // This contains body of incoming request
    const email = JSON.parse(req.body);

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_URL
    );

    const db = client.db();
    const adminCollection = db.collection("user");

    const result = await adminCollection.findOne({ emailId: email });
    console.log(result);
    client.close();

    res.status(201).json({ message: "Admin inserted!" });
  }
}
export default handler;
