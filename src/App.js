import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm.js";
import ContactList from "./components/ContactList/ContactList.js";
import SearchContact from "./components/SearchContact/SearchContact.js";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Klinel", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    // console.log("App componentDidMount");

    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("App componentDidUpdate");

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      // console.log("Обновилось поле contacts, записываю contacts в хранилище");
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: uuidv4(),
    };
    this.state.contacts.find((savedContact) => savedContact.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  handleSearch = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleDelete = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normaliseFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm handleSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <SearchContact value={filter} inputChange={this.handleSearch} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
