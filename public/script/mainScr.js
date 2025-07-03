const method = document.querySelector("#selectMethod");
const title = document.querySelector("#title");
const id = document.querySelector("#id");
const content = document.querySelector("#content");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#apiForm");
const errorContainer = document.querySelector("#errorsContainer");
const whitespace = document.querySelector("#whiteSpace");
const updateMethod = () => {
  if (method.value === "GET") {
    title.disabled = true;
    content.disabled = true;
    id.disabled = false;
    title.value = "";
    content.value = "";
    id.required = false;
  } else if (method.value === "POST") {
    id.disabled = true;
    title.disabled = false;
    content.disabled = false;
    id.value = "";
    title.required = true;
    content.required = true;
  } else if (method.value === "PUT") {
    title.disabled = false;
    content.disabled = false;
    id.disabled = false;
    title.required = true;
    content.required = true;
    id.required = true;
  } else if (method.value === "DELETE") {
    title.disabled = true;
    content.disabled = true;
    id.disabled = false;
    id.required = true;
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
  formdata.forEach((value, key) => {
    paramsObj[key] = value;
  });
  if (method.value === "GET") {
    if (paramsObj["ID"].includes(" ")) {
      let err = new Error("white space");
      whitespace.textContent = "Id Cannot have any white space";
      throw err;
    }
    window.location.href = `http://localhost:5000/api/notes/${paramsObj["ID"]}`;
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
  } else if (method.value === "PUT" && !isNaN(paramsObj["ID"])) {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((response) => {
        if (paramsObj["ID"].includes(" ")) {
          let err = new Error("white space");
          whitespace.textContent = "Id Cannot have any white space";
          throw err;
        }
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
      .catch((err) => console.error(err));
  } else if (method.value === "DELETE" && !isNaN(paramsObj["ID"])) {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "DELETE",
    })
      .then((response) => {
        if (paramsObj["ID"].includes(" ")) {
          let err = new Error("white space");
          whitespace.textContent = "Id Cannot have any white space";
          throw err;
        }
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
      .catch((err) => console.error(err));
  }
});
method.addEventListener("change", updateMethod);
