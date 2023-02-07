const submit = document.getElementById('submit');
const name = document.getElementById('name');
const url = document.getElementById('url');
submit.addEventListener('click', e => {
  e.preventDefault();
  const response = fetch('/generate_url', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value;
      url: url.value;
    }),
    headers: {
      'Content-Type': 'application/json'
    }     
  })

}); 

