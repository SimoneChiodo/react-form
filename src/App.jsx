import { useState } from "react";

// Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Custom CSS
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    const [articles, setArticles] = useState("");
    let title = "";

    function handleFormSubmit(e) {
        e.preventDefault();

        if (title === "" || articles.includes("title")) return;

        const newArticles = [...articles, title];
        setArticles(newArticles);
    }

    function handleInputChange(e) {
        title = e.target.value;
    }

    return (
        <>
            <main className="d-flex flex-column align-items-center mt-5">
                {/* FORM */}
                <form onSubmit={handleFormSubmit} className="row g-3 w-50">
                    <div className="col-12">
                        <label htmlFor="inputTitle" className="form-label">
                            Titolo articolo:
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputTitle"
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Invio
                        </button>
                    </div>
                </form>

                {/* ARTICLES LIST */}
                <ul className="mt-5">
                    {articles?.length ? (
                        articles.map((article) => (
                            <li key={article}>{article}</li>
                        ))
                    ) : (
                        <h2>Ancora nessun post...</h2>
                    )}
                </ul>
            </main>
        </>
    );
}

export default App;
