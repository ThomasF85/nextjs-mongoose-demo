import dbConnect from "@/db/connect.js";
import { jokes } from "../../../lib/data.js";
import Joke from "@/db/models/Joke.js";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(joke);
  }

  response.status(405).json({ message: "Method not allowed" });
}
