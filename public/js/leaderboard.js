const populate_table = async () => {
  const response = await fetch('/api/leaderboard', {
    method: 'GET',
  })
  const tbody = document.getElementById("tbody")
  const body = await response.json();
  console.log(body)
  for (let i = 0; i < body.length; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th")
    th.setAttribute("scope", "row");
    th.innerText = i + 1;
    tr.appendChild(th);
    console.log(body[i])
    console.log(body[i].user)
    const td_name = document.createElement("th")
    td_name.innerText = body[i].user;
    const td_clicks = document.createElement("th")
    td_clicks.innerText = body[i].numClicks;
    tr.appendChild(td_name);
    tr.appendChild(td_clicks);
    tbody.appendChild(tr);
  }
}
populate_table()

