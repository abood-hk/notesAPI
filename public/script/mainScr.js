const method = document.querySelector("#selectMethod");
const title = document.querySelector("#title");
const id = document.querySelector("#id");
const content = document.querySelector("#content");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#apiForm");
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
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        window.location.href = `http://localhost:5000/api/notes`;
      })
      .catch((err) => console.error("err :" + err.message));
  } else if (method.value === "PUT" && !isNaN(paramsObj["ID"])) {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      })
      .then(
        (data) => (window.location.href = `http://localhost:5000/api/notes`)
      )
      .catch((err) => console.error(err));
  } else if (method.value === "DELETE" && !isNaN(paramsObj["ID"])) {
    fetch("http://localhost:5000/api/notes/" + paramsObj["ID"], {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      })
      .then(
        (data) => (window.location.href = `http://localhost:5000/api/notes`)
      )
      .catch((err) => console.error(err));
  }
});
method.addEventListener("change", updateMethod);
