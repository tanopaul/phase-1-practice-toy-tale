let addToy = false;
const url = 'http://localhost:3000/toys';
const toyDiv = document.querySelector('#toy-collection');
const form = document.querySelector('.add-toy-form');


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target.name.value, e.target.image.value)
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
})

function renderToy(toy) {
  let currToy = toy;
  let card = document.createElement('div');
  card.className = 'card';
  let h2 = document.createElement('h2');
  h2.textContent = toy.name;
  let img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  let button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.innerText = 'Like ❤️';

  toyDiv.append(card);
  card.append(h2);
  card.append(img);
  card.append(p);
  card.append(button);

  button.addEventListener('click', () => {
    let newLikes = currToy.likes + 1;

    let obj = {
      likes:newLikes
    }

    fetch(`${url}/${currToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
       },
      body: JSON.stringify(obj)
    })
    // console.log(currToy)
  })

}


fetch(url)
.then(resp => resp.json())
.then(toys => {
  toys.forEach(toy => {
    renderToy(toy);
  });
})

