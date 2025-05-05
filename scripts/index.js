try {
  const response = await fetch("/.netlify/functions/hello-world");
  if(!response.ok) throw response;
  const message = await response.text();
  document.getElementById("message").textContent = message;
} catch (err) {
  console.log(err)
}

try {
  const response = await fetch("/.netlify/functions/get-cars");
  if(!response.ok) throw response;
  const data = await response.json();
  document.getElementById("cars-data").textContent = JSON.stringify(data, null, 2);
} catch (err) {
  console.log(err)
}