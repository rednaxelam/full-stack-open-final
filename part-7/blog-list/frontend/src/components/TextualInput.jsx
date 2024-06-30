const handleInputChange = (stateUpdater) => {
  return ({ target }) => stateUpdater(target.value)
}

const TextualInput = ({ nom, state, stateUpdater }) => {
  return (
    <div className="form-control">
      <label htmlFor={nom}>{nom}:</label>
      <input
        type="text"
        name={nom}
        id={nom}
        value={state}
        onChange={handleInputChange(stateUpdater)}
      />
    </div>
  )
}

export default TextualInput