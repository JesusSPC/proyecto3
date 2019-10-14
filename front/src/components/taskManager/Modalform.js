import React, { Component } from "react";
import M from 'materialize-css/dist/js/materialize.min.js'

export default class Modalform extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
    });
  }

  render() {
    return (
      <div>
          <button data-target="modal1" className="btn modal-trigger">Modal</button>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">
              Agree
            </a>
          </div>
        </div>
      </div>
    );
  }
}