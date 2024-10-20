import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("Check all items on screen",  () => {
    render(<ToDoList />);

    test("Check items", () => {
        const apple = screen.getByText("Apples");
        const banana = screen.getByText("Bananas");
        expect(apple).toBeInTheDocument();
        expect(banana).toBeInTheDocument();
    });

    test("Check number of items ticked", () => {
        const apple = screen.getByText("Apples");
        const banana = screen.getByText("Bananas");
        fireEvent.click(apple);
        fireEvent.click(banana);
    });
});