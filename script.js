const body = document.body;
const theme = document.querySelector(".theme");
const countries = document.querySelector(".countries");
const select = document.querySelector("select");
document.querySelector("#search").value = "";

theme.addEventListener("click", () => {
  body.classList.toggle("light");
});

let countriesArr = [];
let region = [];

const toggle = () => {
  document.querySelector(".home").classList.toggle("hidden");
  document.querySelector(".selectedCountry").classList.toggle("hidden");
};

const getCountryData = async function () {
  const data = await fetch("data.json");
  const response = await data.json();
  response.forEach((d) => {
    countriesArr.push(d);
    region.push(d.region);
  });

  //select input editing
  let regionTrim = [...new Set(region)].sort();
  regionTrim.forEach((r) => {
    const html = `<option> ${r} </option>`;
    select.insertAdjacentHTML("beforeend", html);
  });

  countriesArr.forEach((d) => {
    // const con = document.createElement("div");
    // con.classList.add("country");
    const html = `
    <div class="country">
        <div class="flag">
            <img
            src=${d.flags.svg}
            alt="${d.name}'s Flag"
            />
        </div>

        <div class="detail">
            <p class="countryName">${d.name}</p>
            <p>
            Population:
            <span class="population">${d.population}</span>
            </p>
            <p>
            Region:
            <span class="region">${d.region}</span>
            </p>
            <p>
            Capital:
            <span class="capital">${d.capital}</span>
            </p>
        </div>
    </div>`;
    countries.insertAdjacentHTML("beforeend", html);
  });
  const search = () => {
    let country = [...document.querySelectorAll(".country")];
    country.forEach((c) => {
      let regionP = c.querySelector(".region");
      c.classList.add("hidden");
      if (regionP.textContent === select.value) {
        regionP.closest(".country").classList.remove("hidden");
      }
    });
  };

  const searchInput = document.querySelector("#search");

  select.addEventListener("change", search);

  searchInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    let country = [...document.querySelectorAll(".country")];
    country.forEach((c) => {
      let countryName = c.querySelector(".countryName");
      c.classList.add("hidden");
      if (
        countryName.textContent
          .toLocaleLowerCase()
          .includes(searchInput.value.toLocaleLowerCase())
      ) {
        countryName.closest(".country").classList.remove("hidden");
      }
    });
  });
  let target;
  body.addEventListener("click", (e) => {
    if (e.target.closest(".country")) {
      target = e.target.textContent;
      toggle();

      countriesArr.forEach((n) => {
        if (target === n.name) {
          const html = `
      <div class="flagImg">
            <img src="${n.flags.svg}" alt="" />
          </div>

          <div class="det">
            <p class="country-name">${n.name}</p>

            <div class="about">
              <p>
                Native Name:
                <span class="native">${n.nativeName}</span>
              </p>
              <p>
                Population:
                <span class="pop">${n.population}</span>
              </p>
              <p>
                Region:
                <span class="reg">${n.region}</span>
              </p>
              <p>
                Sub Region:
                <span class="reg">${n.subregion}</span>
              </p>
              <p>
                Capital:
                <span class="reg">${n.capital}</span>
              </p>
            </div>

            <div class="rel">
              <p>
                Top Level Domain:
                <span class="top-level">${n.topLevelDomain}</span>
              </p>
              <p>
                Currency:
                <span class="cur">${n.currencies[0].name}</span>
              </p>
              <p>
                Languages:
                <span class="lang">${n.languages
                  .map((n) => n.name)
                  .join(", ")}</span>
              </p>
            </div>

            <div class="border">
              <p>Border Countries:</p>

              ${n.borders
                .map((b) => `<div>${b}</div>`)
                .toString()
                .replace(/,/g, "")}
            </div>
          </div>
        </div>
      `;
          document.querySelector(".country-det").innerHTML = "";
          document
            .querySelector(".country-det")
            .insertAdjacentHTML("beforeend", html);
        }
      });
    }
  });
  document.querySelector(".back").addEventListener("click", toggle);
};
getCountryData();
