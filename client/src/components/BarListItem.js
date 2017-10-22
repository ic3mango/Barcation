import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUserToPatrons } from '../actions';
import YelpStars, { toYelpRatingString } from './YelpStars';

class BarListItem extends Component {
  state = {
    userGoing: this.props.bar.userGoing || false
  }

  handleAddToGoing(barId) {
    this.props.postUserToPatrons(barId, {
      type: "add"
    });
    this.setState({
      userGoing: true
    });
  }

  handleRemoveFromGoing(barId, patron) {
    this.props.postUserToPatrons(barId, {
      type: "remove"
    });
    this.setState({
      userGoing: false
    });
  }

  render() {
    const { bar, user, index } = this.props;
    return (
      <div className="col l6 m12">
        <div className="card small grey darken-4 white-text">
          <div className="card-content">
            <span className={`card-title activator ${this.state.userGoing && "yellow-text"}`}>
              <strong>
                {index + 1}. {bar.name}
              </strong>
              {this.state.userGoing &&
              <span role="img" aria-label="going">&nbsp;💃</span>
              }
              <i className="material-icons right">more_vert</i>
            </span>
            <div className="row">
              <div className="col s5">
                <img src={bar.image_url} className="left" alt={bar.name} />
              </div>
              <div className="col s7">
                <img src={YelpStars[toYelpRatingString(bar.rating)]} alt="yelp stars" />
                <p>{bar.price} </p>
                <p className="white-text"><span role="img" aria-label="label">🏷 &nbsp;|</span>{bar.categories.map(cat => <span key={cat.alias}>&nbsp;{cat.title} | </span>)}</p>
                <p><span role="img" aria-label="tele">☎️ &nbsp;</span>{bar.display_phone}</p>
              </div>
            </div>
          </div>
          <div className="card-action">
            <a className="left waves-effect waves-yellow btn-flat" href={bar.url}>Yelp Site</a>
            { user ?
            <a
              href="#"
              onClick={() => this.handleAddToGoing(bar.id)}
              disabled={this.state.userGoing}
              className="right waves-effect waves-light btn-flat white-text activator">
              Add to Going
            </a> :
            <a className="right" href="/auth/twitter">
              Login
            </a>
            }
          </div>
          <div className="card-reveal">
            <span className="card-title blue-grey-text">Who's going tonight<i className="material-icons right">close</i></span>
            {bar.patrons.map(patron => <a key={patron} href={`https://twitter.com/${patron}`}>@{patron}</a>)}
            {this.state.userGoing &&
            <div className="card-action">
              <button
                onClick={() => this.handleRemoveFromGoing(bar.id, user.twitterName)}
                className="btn-flat waves-effect waves-light">
                Remove Self
              </button>
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { postUserToPatrons })(BarListItem);
