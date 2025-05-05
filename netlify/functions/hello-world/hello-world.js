// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default (request, context) => {
  console.log("🚀 ~ request:", request);
  console.log("🚀 ~ context:", context);
  try {
    const url = new URL(request.url);
    const subject = url.searchParams.get("name") || "World";

    return new Response(`Hello ${subject}`);
    // return  Response.json(`{ "name" : "James" }`);
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
