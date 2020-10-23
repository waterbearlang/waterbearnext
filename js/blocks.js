import {define, ref, render, html} from "../lib/heresy.min.js";


class WBTab extends SVGSVGElement{
  static get name(){ return 'WBTab'; }
  static get tagName(){ return 'wb-tab'; }
  oninit(){
    this.className = this.props.type;
    this.setAttribute('width', '40');
    this.setAttribute('height', '12');
    // this.width = 40;
    // this.height = 12;
  }
  onconnected() { console.log(this.outerHTML); }
  static style(WBTab){
    return `${WBTab}{
       border: 2px solid black;
    }`;
  }
  render(){
    return this.svg`<path d="M 0 12 
    a 6 6 90 0 0 6 -6 
    a 6 6 90 0 1 6 -6
    h 16
    a 6 6 90 0 1 6 6
    a 6 6 90 0 0 6 6"></path>`;
  }
}

define(WBTab);

class WBStep extends HTMLElement{
  static get name(){ return 'WBStep'; }
  static get tagName() { return 'wb-step'; }
   onconnected() { console.log(this.outerHTML); }
  static style(WBStep){
    return `${WBStep} {
      border: 2px solid black;
    }`
  }
  // (optional) event driven initialization that will happen only once
  // the ideal constructor substitute for any sort of one-off init
  // this is triggered only once the component goes live, never before *
  // * unless explicitly dispatched, of course
  oninit(event) {
    this.ns = this.props.ns;
    this.fn = this.props.fn;
  }

  // (optional) event driven lifecycle methods, added automatically when
  // no Custom Elements native methods such as connectedCallback, and others
  // have been explicitly set as methods
  onconnected(event) {}
  ondisconnected(event) {}
  onattributechanged(event) {} // event = {attributeName, oldValue, newValue}
  // define this to return the signature as text
  get signature(){}
  // define this to return the signature as html
  get signatureHTML(){}
  render() {
    // this.html or this.svg are provided automatically
    this.html`<wb-tab type="tab"/><header>${this.signatureHTML}</header><wb-tab type="slot"/>`;
  }
}

define(WBStep);

