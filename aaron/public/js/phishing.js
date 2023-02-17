const submit = document.getElementById('submit');
const name = document.getElementById('name');
const url_path = document.getElementById('url');
const generated_url = document.getElementById('generated_url');
console.log(submit)
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const response = await fetch('/generate_url', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      url: url_path.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }     
  })
  const body = await response.json();
  if (!body.url) return;
  generated_url.value = body.url;
  console.log(body.url)
}); 

