import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";
import { isLabeledStatement } from "typescript";



describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

//Makes sure num of items in dummynotes is the same amount of rendered notes
 test("Reading Sticky Note", async () => {
  const size = dummyNotesList.length
  render(<StickyNotes/>);
  var dummyNotes = await screen.findByTestId("dummyNotes")
  var numNotes = dummyNotes.querySelectorAll('.note-item').length
  expect(numNotes).toBe(size)
 })

 test("Updating values", () => {
  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  render(<StickyNotes/>);
  dummyNotesList.forEach(function(item, index) {
    const title = makeid(10)
    const content = makeid(15)
    const label = makeid(5)

    const titleInput = screen.getByTestId(item.title)
    const contentInput = screen.getByTestId(item.content)
    const labelInput = screen.getByTestId(item.id + ' ' + item.label)
    titleInput.innerHTML = title;
    contentInput.innerHTML = content;
    labelInput.innerHTML = label;

    expect(screen.getByTestId(item.title).innerHTML).toBe(title)
    expect(screen.getByTestId(item.content).innerHTML).toBe(content)
    expect(screen.getByTestId(item.id + ' ' + item.label).innerHTML).toBe(label)
  });
 });

 test("Deleting Notes", ()=> {
  render(<StickyNotes/>)
  
  dummyNotesList.forEach(async function(notes, index) {
    const deleteButton = screen.getByTestId('note' + notes.id + 'delete')
    fireEvent.click(deleteButton);
    var deletedNode = await screen.queryByTestId("Note" + notes.id)
    expect(deletedNode).not.toBeInTheDocument();
  })
 })

 test("Edge Case", () => {
  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  render(<StickyNotes />);
  const title = makeid(10)
  const content = makeid(20)

  const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
  const createNoteContentTextarea =
    screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(createNoteTitleInput, { target: { value: title } });
  fireEvent.change(createNoteContentTextarea, {
    target: { value: content },
  });
  fireEvent.click(createNoteButton);

  const newNoteTitle = screen.getByText(title);
  const newNoteContent = screen.getByText(content);

  expect(newNoteTitle).toBeInTheDocument();
  expect(newNoteContent).toBeInTheDocument();

  });

});