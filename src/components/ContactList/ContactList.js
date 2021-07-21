import ContactListItem from "../ContactListItem/ContactListItem.js";

export default function ContactList({ contacts, handleDelete }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          deleteContact={() => handleDelete(id)}
        />
      ))}
    </ul>
  );
}
