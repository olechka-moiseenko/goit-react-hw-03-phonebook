import s from "./SearchContact.module.css";

export default function SearchContact({ value, inputChange }) {
  return (
    <label>
      <title className={s.title}>Find contacts by name</title>
      <input type="text" value={value} onChange={inputChange} />
    </label>
  );
}
