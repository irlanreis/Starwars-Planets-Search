import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

export const planetsFilterTable = (column, compared, value) => {
    const filterSelectColumn = screen.getByTestId('column-filter');
    const filterSelectCompared = screen.getByTestId('comparison-filter');
    const filterInputValue = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    act(() => {
        userEvent.selectOptions(filterSelectColumn, column);
        userEvent.selectOptions(filterSelectCompared, compared);
        userEvent.clear(filterInputValue);
        userEvent.type(filterInputValue, value)
        userEvent.click(filterButton);
    });
};