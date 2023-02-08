import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';
import App from '../App'
import Select from '../components/Select';
import { planetsFilterTable } from './help';

const loadElement = async () => await
    waitForElementToBeRemoved(await screen.findByText('Loading...'));

describe('Testes do componente App', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch');
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(testData)
        });
    });

afterEach(() => { jest.clearAllMocks(); })

    it('Testes da Tabela', async () => {
        act(() => {
            render(<App />);
        });

        await loadElement();

        Object.keys(testData.results[0]).forEach(async (name) => {

            const element = await screen.findByRole('columnheader', { name });

            expect(element).toBeInTheDocument();
        })
    });

    it('Testa o preenchimento da Tabela com dados da API', async () => {
        act(() => {
            render(<App />)
        })

        expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

        const tableValues = await screen.findAllByRole('cell', { name: 'Tatooine' });

        tableValues.forEach((e) => expect(e).toBeInTheDocument())
    });

    it('Testa Filtros da Tabela', async () => {
        act(() => render(<App />));

        planetsFilterTable('population', 'igual a', '200000')

        await waitFor(() => {
            const tatooine = screen.getByRole('cell', { name: /Tatooine/i });

            expect(tatooine).toBeInTheDocument();
        })
    });

    it('Testa input de pesquisa por planetas', async () => {
        render(<App />);

        await loadElement();

        const filterInputName = screen.getByTestId('name-filter');
        
        expect(filterInputName).toBeInTheDocument();
        
        act(() => {
            userEvent.type(filterInputName, 'Tatooine');
        });

        const tatooine = screen.getByRole('cell', { name: /Tatooine/i })

        expect(tatooine).toBeInTheDocument();
    })

    it('Testa botão de resetar filtros', async () => {
        render(<App />);

        await loadElement();

        planetsFilterTable('population', 'igual a', '200000');

        const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });
        const filter = screen.getByTestId('filter');
        const buttonReset = filter.children[filter.children.length -1];

        expect(planetTatooine).toBeInTheDocument();
        expect(filter).toBeInTheDocument();
        expect(buttonReset).toBeInTheDocument();

        userEvent.click(buttonReset);
        expect(filter).not.toBeInTheDocument();
    })

});