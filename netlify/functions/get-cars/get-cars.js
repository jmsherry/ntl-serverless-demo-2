import mongoose, { connect, model } from "mongoose";

const MIN_STRING_LENGTH = 0;
const MAX_STRING_LENGTH = 200;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

const MIN_BHP = 0;
const MAX_BHP = 10000;

const {
  MONGODB_URI = "mongodb://localhost/cars_jump",
} = process.env;


try {
  const conn = await connect(MONGODB_URI);
  // console.log("connected", conn);
  console.log("db connected");

  // this is for errors after a connection has been established
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
} catch (error) {
  // this is for connection error
  console.log(error);
}

const { Schema } = mongoose;

// ******************* CARS **********************//
const carSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: MAX_NAME_LENGTH,
    minLength: MIN_NAME_LENGTH,
  },
  bhp: {
    type: Number,
    required: true,
    max: MAX_BHP,
    min: MIN_BHP,
  },
  avatar_url: {
    type: String,
    default: "https://static.thenounproject.com/png/449586-200.png",
    maxLength: MAX_STRING_LENGTH,
    minLength: MIN_STRING_LENGTH,
  },
});

const Car = model("Car", carSchema);

export default async (request, context) => {
  console.log("🚀 ~ request:", request)
  console.log("🚀 ~ context:", context)

  try {
    // const url = new URL(request.url)
    // const subject = url.searchParams.get('name') || 'World'

    const cars = await Car.find({}).exec();

    return Response.json(cars)
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
