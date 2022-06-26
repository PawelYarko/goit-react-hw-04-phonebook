import { useState } from 'react';
import Form from '../Form/Form';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const formValue = {
      id: nanoid(),
      name,
      number,
    };

    const foundContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (foundContact) {
      window.alert(`${name} is already in contacts`);
      return;
    } else if (!foundContact) {
      setContacts([formValue, ...contacts]);
    }
  };

  const onFilterChange = e => setFilter(e.currentTarget.value);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const handleDeleteContact = id => {
    const index = contacts.findIndex(contact => contact.id === id);

    if (index === -1) return;
    setContacts(contacts.splice(index, 1));
  };

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <Form formData={formSubmitHandler} />
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onFilterChange={onFilterChange} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
