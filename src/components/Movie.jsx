
export function Movie({ title, year, poster }) {
    return (
        <div className="movie">
            <h3>{title}</h3>
            <p>{year}</p>
            <img src={poster} alt={title} />
        </div>
    )
}