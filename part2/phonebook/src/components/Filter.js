export default function Filter ({filterPerson}) {
    return (
        <form>
            Filter shown with: <input type="text" onChange={filterPerson} />
        </form>
    )
}