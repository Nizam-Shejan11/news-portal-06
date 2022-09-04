// fetch category names
const fetchCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((d) => displayCategories(d.data.news_category));
};

fetchCategories();

// category
const displayCategories = (categories) => {
  const categoryParent = document.getElementById("categoryParent");
  categories.forEach((category, index) => {
    // console.log(category, index + 1);
    const div = document.createElement("span");
    div.innerHTML = `
        <li class="customList">
        <button onclick="fetchNews(${category.category_id})" class="customButton">${category.category_name}</button>
        </li>
    `;
    categoryParent.appendChild(div);
  });
};

const fetchNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data, id));
};

const displayNews = (data, id) => {
  if (data.length > 0) {
    document.getElementById("categoryNumber").innerText = data.length;
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((d) => {
        document.getElementById("categoryName").innerText =
          d.data.news_category[id - 1].category_name;
      });
    const cardParent = document.getElementById("cardParent");
    cardParent.innerText = "";
    for (const item of data) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card mb-3">
        <div class="row">
          <div class="col col-3 m-auto">
            <img
              src="${item.image_url}"
              class="card-img-left rounded img-thumbnail"
              alt="..."
            />
          </div>
          <div class="card-body col col-9">
            <h5 class="card-title">
              ${item.title}
            </h5>
            <p class="card-text">
              ${item.details.slice(0, 280)}...
            </p>
            <div
              class="card-footer d-flex justify-content-around align-items-center"
            >
              <div class="writter">
                <img class="writter-img" src="${item.author.img}" alt="" />
                <p style="margin-left: 10px">${item.author.name}</p>
              </div>
              <div>${item.total_view}</div>
              <a class="anchor" href="">=></a>
              
            </div>
          </div>
        </div>
      </div>
        `;
      cardParent.appendChild(div);
    }
  } else {
    document.getElementById("categoryNumber").innerText = data.length;
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((d) => {
        document.getElementById("categoryName").innerText =
          d.data.news_category[id - 1].category_name;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no data in this category",
        });
      });

    const cardParent = document.getElementById("cardParent");
    cardParent.innerText = "";
    for (const item of data) {
      console.log(item);
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card mb-3">
        <div class="row">
          no data in this category
        </div>
      </div>
        `;
      cardParent.appendChild(div);
    }
  }
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
