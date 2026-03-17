export default function ErrorBanner({ message }) {

    if (!message) return null

    return (
        <div style={{
            background: "red",
            color: "white",
            padding: "10px",
            margin: "10px 0"
        }}>
            {message}
        </div>
    )
}