import { Component } from "react";

import s from './App.module.css';

import ContactForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleAddContact = (newContact) =>
    this.setState (({ contacts }) => ({
      contacts: [...contacts, newContact]
    }));

  handleCheckUnique = (name) => {
    const { contacts } = this.state;

    const isExistContact = !!contacts.find((contact) => contact.name === name);

    isExistContact && alert("Contact is already exist");

    return !isExistContact;
  };

  handleRemoveContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  handelFilterChange = (filter) => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount = () => {
        const parseJsonContacts = JSON.parse(localStorage.getItem('CONTACTS'));

        if(parseJsonContacts)
        this.setState({contacts: parseJsonContacts})
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { contacts } = this.state;

        if(contacts !== prevState.contacts){
            localStorage.setItem('CONTACTS', JSON.stringify(contacts));
        }
    }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className = {s.App}>
        <h1>Phone book</h1>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUnique={this.handleCheckUnique}
        />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onChange={this.handelFilterChange}
        />
        <ContactsList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}
