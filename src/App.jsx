import { useState } from "react";

// Components
import Button from "./components/Button";

// Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Custom CSS
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    // Articles Array
    const [articles, setArticles] = useState([]);
    // Form Data
    const [titleForm, setTitleForm] = useState("");

    // On Form Submit
    function handleFormSubmit(e) {
        e.preventDefault();

        // Check if input is not empty
        if (titleForm === "") return;

        // Check if the text doesn't already exist
        let alreadyExist = false;
        articles.map(
            (element) => element.title === titleForm && (alreadyExist = true)
        );
        if (alreadyExist) return;

        // Add the new Article
        const newArticles = [...articles];
        newArticles.push({ title: titleForm, id: getLastId(articles) });
        setArticles(newArticles);
    }

    // Get the Last ID of an Array
    function getLastId(obj) {
        let id = 0;
        {
            obj.map((element) => {
                element.id >= id && (id = element.id + 1);
            });
        }
        return id;
    }

    // Delete an element from an array
    function deleteReactiveElementById(array, setFz, id) {
        let newArray = [...array];
        setFz(newArray.filter((element) => element.id !== id));
    }

    return (
        <>
            <main className="d-flex flex-column align-items-center mt-5">
                {/* FORM */}
                <form onSubmit={handleFormSubmit} className="row g-3 w-50">
                    {/* Title Input */}
                    <div className="col-12">
                        <label htmlFor="inputTitle" className="form-label">
                            Titolo articolo:
                        </label>

                        <input
                            type="text"
                            onChange={(e) => setTitleForm(e.target.value)}
                            className="form-control"
                            id="inputTitle"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Invio
                        </button>
                    </div>
                </form>

                {/* ARTICLES LIST */}
                <ul className="mt-5">
                    {articles?.length ? (
                        // Print the Array
                        articles.map((article) => (
                            <li key={article.id}>
                                {/* Nome dell'articolo */}
                                {article.title}

                                {/* Pulsante Elimina */}
                                <Button
                                    key={"del-" + article.id}
                                    text={"🧺"}
                                    handleStatusChange={() =>
                                        deleteReactiveElementById(
                                            articles,
                                            setArticles,
                                            article.id
                                        )
                                    }
                                />
                            </li>
                        ))
                    ) : (
                        // Print Empty Array Message
                        <h2>Ancora nessun post...</h2>
                    )}
                </ul>
            </main>
        </>
    );
}

export default App;
