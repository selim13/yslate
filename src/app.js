import "regenerator-runtime/runtime";
import ky from "ky";

const key =
  "trnsl.1.1.20200515T062433Z.0e8c9f48ef5f842d.a63f59cec435152209d55b38ca2e0ec3da5a6a13";
const entrypoint = "https://translate.yandex.net/api/v1.5/tr.json/translate";

const form = document.forms.translator;
const to = document.getElementById("to");
const from = document.getElementById("from");

async function translate() {
  const searchParams = new URLSearchParams();
  searchParams.set("text", from.value);
  console.log("go");
  console.log(from.value);
  try {
    const res = await ky
      .post(entrypoint, {
        searchParams: { key, lang: "ru-en", format: "html" },
        body: searchParams
      })
      .json();
    console.log(res.text);
    if (res.text.length > 0) {
      to.value = res.text[0];
    }
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  translate();
});
