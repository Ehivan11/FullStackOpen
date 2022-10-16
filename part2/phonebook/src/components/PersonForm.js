export default function PersonForm({newPerson, nameValue, numberValue, pushNewName}) {
  return (
    <form>
      <div>
        Name: <input value={newPerson.name}  onChange={nameValue} />
      </div>
      <div>
        Number: <input value={newPerson.number} type="number"  onChange={numberValue} />
      </div>
      <div>
        <button type="submit" name="submit" onClick={pushNewName}>
          Add
        </button>
      </div>
    </form>
  )
}
