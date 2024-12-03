export default function ({ text, handleStatusChange }) {
    return <button onClick={handleStatusChange}>{text}</button>;
}
