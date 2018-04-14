import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propType = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    let showingContacts
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state


    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((c) => match.test(c.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Procurar pessoas'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to="/create" 
          className="add-contact">
          Adicionar Contato
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span> Mostrando {showingContacts.length} de {contacts.length} total</span>
            <button onClick={this.clearQuery}> Mostrar todos </button>
          </div>
        )}
        <ol className="contact-list">
        {showingContacts.map((c) => (
          <li key={c.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${c.avatarURL})`
            }} />
            <div className='contact-details'>
              <p>{c.name}</p>
              <p>{c.email}</p>
            </div>
            <button onClick={() => onDeleteContact(c)} className="contact-remove">
              Remove
            </button>
          </li>
        ))}
        </ol>
      </div>

    )
  }
}

export default ListContacts
