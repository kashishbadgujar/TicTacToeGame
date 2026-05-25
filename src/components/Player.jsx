import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(!isEditing); // => schedules a state update to true //isEditing ? false : true;
    // setIsEditing(!isEditing); // =>schedules a state update to true //thought false, but if user clicks the button multiple times in quick succession, the state value will be stale and will not update as expected. This is because React batches state updates for performance reasons, and the state value may not have been updated yet when the next click event is processed.

    // Updating state based on old state, instead pass a function to state updating function and this function will automatically be called by React and will receive guaranteed latest state value
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // btnCaption = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        {/* <span className="player-name">{name}</span> */}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      {/* <button onClick={handleEditClick}>{btnCaption}</button> */}
    </li>
  );
}
