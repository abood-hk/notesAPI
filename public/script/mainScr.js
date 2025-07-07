const method = document.querySelector("#selectMethod");
const title = document.querySelector("#title");
const id = document.querySelector("#id");
const limit = document.querySelector("#limit");
const content = document.querySelector("#content");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#apiForm");
const errorContainer = document.querySelector("#errorsContainer");
const updateMethod = () => {
  if (method.value === "GET") {
    title.disabled = true;
    content.disabled = true;
    id.disabled = false;
    limit.disabled = false;
    limit.value = "";
    title.value = "";
    content.value = "";
    id.required = false;
  } else if (method.value === "POST") {
    id.disabled = true;
    title.disabled = false;
    content.disabled = false;
    limit.disabled = true;
    limit.value = "";
    id.value = "";
    title.required = true;
    content.required = true;
  } else if (method.value === "PUT") {
    title.disabled = false;
    content.disabled = false;
    id.disabled = false;
    limit.disabled = true;
    limit.value = "";
    title.required = true;
    content.required = true;
    id.required = true;
  } else if (method.value === "DELETE") {
    title.disabled = true;
    content.disabled = true;
    id.disabled = false;
    id.required = true;
    limit.disabled = true;
    limit.value = "";
    title.value = "";
    content.value = "";
  }
};
updateMethod();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(form);
  const params = new URLSearchParams(formdata).toString();
  let paramsObj = {};
  function allIndeces(str, ltr) {
    let indexes = [];
    let index = str.indexOf(ltr);
    while (index !== -1) {
      indexes.push(index);
      index = str.indexOf(ltr, index + 1);
    }
    return indexes;
  }
  const allIndexes = allIndeces(params, "&");
  const indexStart = params.indexOf("limit");
  const indexEnd = allIndexes[1];

  formdata.forEach((value, key) => {
    paramsObj[key] = value;
  });
  if (paramsObj["ID"]) {
    if (paramsObj["ID"].includes(" ")) {
      let err = new Error("white space");
      errorContainer.innerHTML = "";
      let h3 = document.createElement("h3");
      h3.classList.add("error");
      h3.innerText = "Id Cannot have any white space";
      errorContainer.appendChild(h3);
      throw err;
    }
  }
  if (method.value === "GET") {
    fetch(
      `http://localhost:5000/api/notes/${paramsObj["ID"]}?${params.substring(
        indexStart,
        indexEnd
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        if (typeof data === "string") {
          console.log("gh");
          return (window.location.href = `http://localhost:5000/api/notes/${
            paramsObj["ID"]
          }?${params.substring(indexStart, indexEnd)}`);
        }
        errorContainer.innerHTML = "";
        let h3 = document.createElement("h3");
        h3.innerText = data["error"];
        h3.classList.add("error");
        errorContainer.appendChild(h3);
        return;
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else if (method.value === "POST") {
    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        if (typeof data === "string") {
          return (window.location.href = `http://localhost:5000/api/notes`);
        }
        errorContainer.innerHTML = "";
        data.forEach((dt) => {
          let h3 = document.createElement("h3");
          h3.innerText = dt;
          h3.classList.add("error");
          errorContainer.appendChild(h3);
        });
        return;
      })
      .catch((err) => console.error("err :" + err.message));
  } else if (method.value === "PUT") {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        if (typeof data === "string") {
          return (window.location.href = `http://localhost:5000/api/notes`);
        }
        errorContainer.innerHTML = "";
        data.forEach((dt) => {
          let h3 = document.createElement("h3");
          h3.innerText = dt;
          h3.classList.add("error");
          errorContainer.appendChild(h3);
        });
        return;
      })
      .catch((err) => {
        errorContainer.innerHTML = "";
        let h3 = document.createElement("h3");
        h3.classList.add("error");
        h3.innerText = "There is no element with this id";
        errorContainer.appendChild(h3);
        console.error(err);
      });
  } else if (method.value === "DELETE") {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "DELETE",
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        if (typeof data === "string") {
          return (window.location.href = `http://localhost:5000/api/notes`);
        }
        errorContainer.innerHTML = "";
        data.forEach((dt) => {
          let h3 = document.createElement("h3");
          h3.innerText = dt;
          h3.classList.add("error");
          errorContainer.appendChild(h3);
        });
        return;
      })
      .catch((err) => {
        errorContainer.innerHTML = "";
        let h3 = document.createElement("h3");
        h3.classList.add("error");
        h3.innerText = "There is no element with this id";
        errorContainer.appendChild(h3);
        console.error(err);
      });
  }
});
method.addEventListener("change", updateMethod);
