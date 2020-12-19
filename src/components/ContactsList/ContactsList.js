const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <>
      {name}: {number}
      <button onClick={() => onRemove(id)}>Delete</button>
    </>
  );
};

const ContactsList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactListItem {...contact} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
