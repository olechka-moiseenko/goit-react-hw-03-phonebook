import s from "./ContactListItem.module.css";

export default function ContactListItem({ name, number, deleteContact }) {
  return (
    <li className={s.li}>
      {name}: {number}
      <button type="button" className={s.button} onClick={deleteContact}>
        Delete
      </button>
    </li>
  );
}
