// URLからプロジェクト名を取る
const seg = location.href.split("index.html")[0].split("/").filter(v => v.trim().length > 0).at(-1);

const text = `
<p>© 2023 なおしむ</p>
<p><a href="https://github.com/naosim/p5sample/tree/main/docs/${seg}" target="_blank">ソースコード</a>
<p><a href="https://github.com/naosim/p5sample" target="_blank">トップページ</a>
`
const footer = document.createElement("footer");
footer.innerHTML = text;
document.querySelector("body").appendChild(footer);