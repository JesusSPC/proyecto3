import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";

export default class News extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="news-box container">

        <div className="row1">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://ep01.epimg.net/elpais/imagenes/2018/09/06/laboratorio_de_felicidad/1536224706_924059_1536224870_noticia_normal.jpg"
                    alt="Time Management Hacks"
                  />
                </div>
                <div className="card-content">
                  <p>
                    Managing one’s time properly is something that many people
                    find difficulty in doing...
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://www.hunted.com/industry-content/productivity-hacks-time-management-special">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://cache.lovethispic.com/uploaded_images/328122-Relax-Take-Your-Time-And-Enjoy-Life.jpg"
                    alt="Time Management Hacks"
                  />
                </div>
                <div className="card-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam dghkjadgb qdb jkad...
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://www.lovethispic.com/image/328122/relax,-take-your-time-and-enjoy-life">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="news-box container">
          <div className="row">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://www.thebalancesmb.com/thmb/4qO_PuV4XY3rJmhA9fiR2vEl2QA=/950x0/filters:format(webp)/time-management-tips-2947336-Final-5c8fa6ed46e0fb000172f06d.png"
                    alt="Time Management Hacks"
                  />
                </div>
                <div className="card-content">
                  <p>
                    Do you feel the need to be more organized and/or more
                    productive? Do you spend your day in a frenzy of activity
                    and then wonder why you haven't accomplished much? Then
                    these time management tips are for you — they'll help you
                    increase your productivity and stay cool and collected.
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://www.hunted.com/industry-content/productivity-hacks-time-management-special">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="news-box container">

        <div className="row">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://res.cloudinary.com/dxgjsxlzb/image/fetch/w_600,q_auto,c_limit/https://www.hunted.com/blog/wp-content/uploads/2019/01/Productivity-Hacks_-Time-Management-Special-1.jpg"
                    alt="Time Management Hacks"
                  />
                </div>
                <div className="card-content">
                  <p>
                    How’re those New Years resolutions holding up? Forgive
                    yourself if you’ve bailed on them. On average, almost all of
                    the interviewed ...
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://www.hunted.com/industry-content/productivity-hacks-time-management-special">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div>

        <div className="row">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://imagevars.gulfnews.com/2017/1/19/1_16a07fe7297.1964552_3808496569_16a07fe7297_large.jpg"
                    alt="Time Management Hacks"
                  />
                  <span class="card-title">Careful with Time Management</span>
                </div>
                <div className="card-content">
                  <p>
                    The eternal human struggle to live meaningfully in the face
                    of inevitable death entered its newest phase one Monday in
                    the summer of 2007...
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://gulfnews.com/lifestyle/time-management-is-ruining-our-lives-1.1964520">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>




          {/* <div className="row">
            <div className="news-article">
              <div className="card">
                <div className="card-image">
                  <img
                    src="https://res.cloudinary.com/dxgjsxlzb/image/fetch/w_600,q_auto,c_limit/https://www.hunted.com/blog/wp-content/uploads/2019/01/Productivity-Hacks_-Time-Management-Special-1.jpg"
                    alt="Time Management Hacks"
                  />
                </div>
                <div className="card-content">
                  <p>
                    How’re those New Years resolutions holding up? Forgive
                    yourself if you’ve bailed on them. On average, almost 80% of
                    resolutions don’t last until February anyway...
                  </p>
                </div>
                <div className="card-action">
                  <a href="https://www.hunted.com/industry-content/productivity-hacks-time-management-special">
                    CHECK IT OUT
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        <div className="last-box"></div>
      </React.Fragment>
    );
  }
}
