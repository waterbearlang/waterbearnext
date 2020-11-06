import { parse } from "./moonshine.js";
import heresy from "../lib/heresy.min.js";
import * as R from "../lib/ramda.min.js";
import * as immer from "../lib/immer.min.js";
import dragula from "../lib/dragula.min.js";

//console.log({ immer, R, parse, dragula, define, ref, render, html });

window.runtime = {};

const parseTreeToAST = parseTree => {
  console.assert(
    parseTree.type === "namespace",
    "Parse tree must be a namespace"
  );
  const name = parseTree.name;
  const AST = {};
  parseTree.values
    .filter(val => val.type === "function")
    .forEach(val => (AST[val.name] = val));
  return [name, AST];
};

const processScript = async (script, menu) => {
  const parseTree = await parse(script);
  const [name, AST] = parseTreeToAST(parseTree);
  window.runtime[name] = AST;
  buildBlockMenu(name, AST, menu);
};

const buildBlockMenu = (name, ast, menu) => {
  Object.keys(ast).forEach(key => {
    const fn = ast[key];
    const target = document.createElement("div");
    // console.warn(
    //   '<wb-step ns="%s" fn="%s" type="%s" body=%o params=%o',
    //   name,
    //   key,
    //   fn.returnType,
    //   fn.body,
    //   fn.params
    // );
    heresy.render(
      target,
      heresy.html`<wb-step ns="${name}" fn="${key}" returntype="${fn.returnType}" body=${fn.body} params=${fn.params} />`
    );
    if (target.firstChild) {
      menu.appendChild(target.firstChild);
    } else {
      console.error("Failed to build step for %o", fn);
    }
  });
};

const processError = script => {
  console.error(script);
};

const blockScripts = ["control", "sprite", "sound", "vector", "stage", "angle"];
const blockmenu = document.querySelector('.blockmenu');

blockScripts.forEach(name => {
  let menu = document.createElement("div");
  menu.innerHTML = `<header class="menu_title">${name}</header>`;
  blockmenu.appendChild(menu);
  fetch(`/blocks/${name}.moon`).then(response =>
    response.text().then(text => processScript(text, menu))
  );
});
