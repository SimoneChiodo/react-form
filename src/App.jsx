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
    const [authorForm, setAuthorForm] = useState("");
    const [statusForm, setStatusForm] = useState("");

    // Warning text placed at the top of the page
    const [warningText, setWarningText] = useState("");

    // Variables
    const [isEditing, setIsEditing] = useState(undefined); // Warn that im EDITING an element and not ADDING a new one

    // On Form Submit
    function handleFormSubmit(e) {
        e.preventDefault();

        // Check if input is not empty
        if (titleForm === "" || authorForm === "" || statusForm === "") {
            setWarningText("\nRiempire tutte le caselle!");
            return;
        }

        // Check if the text doesn't already exist
        let alreadyExist = false;
        articles.map((element) => {
            element.title === titleForm && (alreadyExist = true);
        });
        if (alreadyExist) {
            setWarningText("\nQuesto titolo esiste già");
            return;
        }

        // Check if an element is being edited
        if (isEditing !== undefined) {
            const newArticles = [...articles];

            // find the index to change
            const indexToChange = newArticles.findIndex(
                (element) => element.id === isEditing
            );

            // change the index
            newArticles[indexToChange] = {
                id: newArticles[indexToChange].id,
                title: titleForm,
                author: authorForm,
                status: statusForm,
                isBeingEdited: false,
            };

            setArticles(newArticles);
            setIsEditing(undefined);
            setWarningText("");
            return;
        }

        // Add the new Article
        const newArticles = [...articles];
        newArticles.push({
            id: getLastId(articles),
            title: titleForm,
            author: authorForm,
            status: statusForm,
            isBeingEdited: false,
        });
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
                {/* Container */}
                <div className="w-50">
                    {/* WARNING TEXT (Default: empty) */}
                    <h1 className="underline-red text-center mb-3">
                        {warningText}
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleFormSubmit} className="row g-3">
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

                        {/* Author Input */}
                        <div className="col-12">
                            <label htmlFor="inputAuthor" className="form-label">
                                Autore articolo:
                            </label>

                            <input
                                type="text"
                                onChange={(e) => setAuthorForm(e.target.value)}
                                className="form-control"
                                id="inputAuthor"
                            />
                        </div>

                        {/* Status Input */}
                        <div className="col-12">
                            <label htmlFor="inputStatus" className="form-label">
                                Stato articolo:
                            </label>

                            <input
                                type="text"
                                onChange={(e) => setStatusForm(e.target.value)}
                                className="form-control"
                                id="inputStatus"
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
                                <li
                                    key={article.id}
                                    className={
                                        "d-flex justify-content-between align-items-center py-2 px-3" +
                                        (article.isBeingEdited === true &&
                                            " bg-secondary")
                                    }
                                >
                                    {/* Article Details */}
                                    <div>
                                        <p className="m-0 mb-1">
                                            <b>{"Titolo:"}</b> {article.title}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Autore:"}</b> {article.author}
                                        </p>
                                        <p className="m-0">
                                            <b>{"Stato:"}</b> {article.status}
                                        </p>
                                    </div>

                                    {/* Utility Buttons */}
                                    <div>
                                        {/* Pulsante Modifica */}
                                        <Button
                                            key={"mod-" + article.id}
                                            text={"✏"}
                                            handleStatusChange={() => {
                                                setIsEditing(article.id);
                                                setWarningText(
                                                    "Modifica dell'elemento \"" +
                                                        article.title +
                                                        '"'
                                                );
                                                article.isBeingEdited = true;
                                            }}
                                        />

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
                                    </div>
                                </li>
                            ))
                        ) : (
                            // Print Empty Array Message
                            <h2>Ancora nessun post...</h2>
                        )}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default App;
