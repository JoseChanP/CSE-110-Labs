import { render, screen, fireEvent, within } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("Check all items on screen",  () => {

    test("Check items", () => {
        render(<ToDoList />);
        const apple = screen.getByText("Apples");
        const banana = screen.getByText("Bananas");
        expect(apple).toBeInTheDocument();
        expect(banana).toBeInTheDocument();
    });

    test("Check number of items ticked", () => {
        render(<ToDoList />);
        const allCheckboxes = screen.getAllByRole('checkbox');
        fireEvent.click(allCheckboxes[0]);
        fireEvent.click(allCheckboxes[0]);

        const msg = screen.getByText(/Items bought:/i);
        expect(msg).toBeInTheDocument();
    });

    test("Test not equal to -1 items", () => {
        render(<ToDoList />);
        const allCheckboxes = screen.getAllByRole('checkbox');
        expect(screen.queryByText(/Items bought: -1/i)).not.toBeInTheDocument();

        fireEvent.click(allCheckboxes[0]);
        expect(screen.queryByText(/Items bought: -1/i)).not.toBeInTheDocument();

        fireEvent.click(allCheckboxes[0]);
        expect(screen.queryByText(/Items bought: -1/i)).not.toBeInTheDocument();
    });
});