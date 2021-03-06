import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Consumer } from '../../context';
import axios from 'axios';

export default class Contact extends React.PureComponent {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id,
      });
    } catch {
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id,
      });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <FontAwesomeIcon
                  icon={faSortDown}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  style={{ cursor: 'pointer', float: 'right' }}
                />
                <Link to={`contact/edit/${id}`}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="blue"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      marginRight: '1rem',
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Ph: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};
