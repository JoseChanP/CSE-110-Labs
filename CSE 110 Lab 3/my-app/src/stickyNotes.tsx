import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { useState, useEffect, useContext } from "react";
import { ThemeContext, themes } from "./themeContext";

export const StickyNotes = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const theme = useContext(ThemeContext);
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleFavorite = (title: string) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(title)) {
          return prevFavorites.filter((favTitle) => favTitle !== title);
        } else {
          return [...prevFavorites, title];
        }
      });
    };

    const toggleTheme = () => {
      setCurrentTheme(
        currentTheme === themes.light ? themes.dark : themes.light
      );
    };

    useEffect(() => {
      console.log("Favorite Titles: ", favorites);
    }, [favorites]);

    useEffect(() => {
      document.body.style.backgroundColor = currentTheme.background;
    }, [currentTheme]);

    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
      id: -1,
      title: "",
      content: "",
      label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

    const createNoteHandler = (event: React.FormEvent) => {
      event.preventDefault();
      console.log("title: ", createNote.title);
      console.log("content: ", createNote.content);
      (document.getElementById("title_input") as HTMLInputElement).value = "";
      (document.getElementById("content_input") as HTMLInputElement).value = "";
      (document.getElementById("label_select") as HTMLSelectElement).value =
        Label.other;
      createNote.id = notes.length + 1;
      setNotes([createNote, ...notes]);
      setCreateNote(initialNote);
    };
    return (
      <ThemeContext.Provider value={currentTheme}>
        <div
          className="app-container"
          style={{ background: currentTheme.background }}
        >
          <form
            className="note-form"
            style={{ background: currentTheme.background }}
            onSubmit={createNoteHandler}
          >
            <input
              placeholder="Note Title"
              id="title_input"
              style={{
                color: currentTheme.textColor,
                background: currentTheme.noteColor,
              }}
              onFocus={(event) => {
                event.currentTarget.style.backgroundColor = "#e0f7fa";
              }}
              onBlur={(event) => {
                event.currentTarget.style.backgroundColor = "";
              }}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>

            <input
              placeholder="Note Content"
              id="content_input"
              style={{
                color: currentTheme.textColor,
                background: currentTheme.noteColor,
              }}
              onFocus={(event) => {
                event.currentTarget.style.backgroundColor = "#e0f7fa";
              }}
              onBlur={(event) => {
                event.currentTarget.style.backgroundColor = "";
              }}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></input>
            <select
              id="label_select"
              style={{
                color: currentTheme.textColor,
                background: currentTheme.noteColor,
              }}
              onFocus={(event) => {
                event.currentTarget.style.backgroundColor = "#e0f7fa";
              }}
              onBlur={(event) => {
                event.currentTarget.style.backgroundColor = "";
              }}
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.work}>Work</option>
              <option value={Label.study}>Study</option>
              <option selected value={Label.other}>
                Other
              </option>
            </select>

            <button type="submit" id="create">
              Create Note
            </button>
            <button onClick={toggleTheme}> Toggle Theme </button>
          </form>
          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-item"
                style={{
                  background: currentTheme.noteColor,
                  border: currentTheme.noteColor,
                  color: currentTheme.textColor,
                }}
                onClick={() => setSelectedNote(note)}
              >
                <div className="notes-header">
                  <button
                    className="heart-button"
                    onClick={() => toggleFavorite(note.title)}
                    style={{
                      color: favorites.includes(note.title)
                        ? "red"
                        : currentTheme.textColor,
                    }}
                  >
                    ♥
                  </button>
                  <button
                    className="delete-button"
                    style={{ color: currentTheme.textColor }}
                    onClick={() => {
                      setNotes(notes.filter((n) => n.id !== note.id));
                    }}
                  >
                    x
                  </button>{" "}
                </div>
                <div>
                  <h2 contentEditable="true"> {note.title} </h2>
                  <p contentEditable="true"> {note.content} </p>
                  <p contentEditable="true"> {note.label} </p>
                </div>
              </div>
            ))}
          </div>
          <div className="extras">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            ></div>
            {favorites.length > 0 && (
              <div className="favorite_notes">
                <h2>Favorite Notes</h2>
                {favorites.map(
                  (
                    item:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined
                  ) => (
                    <p>{item}</p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </ThemeContext.Provider>
    );
};
