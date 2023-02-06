import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Select from './components/Select';
import Input from './components/Input';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

const COMPARISON_FILTER = ['maior que', 'menor que', 'igual a'];
const OPTION_DROPDOWN = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function App() {
  const [planetName, setPlanetName] = useState('');

  const [filterColunmOption, setFilterColunmOption] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const [compared, setCompared] = useState([]);
  const [comparedFilter, setComperedFilter] = useState(COMPARISON_FILTER[0]);

  const [filterValue, setFilterValue] = useState(0);
  const [filterColunm, setFilterColunm] = useState(filterColunmOption[0]);

  const [organizationColunm, setOrganizationColunm] = useState(OPTION_DROPDOWN[0]);
  const [organizationByColunm, setOrganizationByColunm] = useState({});

  const [directionOrganization, setDiretctionOrganization] = useState('ASC');

  const handleComparationOfValues = (e) => {
    e.preventDefault();
    setCompared([...compared, {
      filterValue,
      filterColunm,
      comparedFilter,
    }]);

    const options = filterColunmOption
      .filter((option) => option !== filterColunm);
    setFilterColunmOption(options);
    setFilterColunm(options[0]);
  };

  const resetedFiltersAll = () => {
    setCompared([]);
    const options = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];

    setFilterColunmOption(options);
    setFilterColunm(options[0]);
  };

  const deleteFiltres = (column) => {
    const deleted = compared.filter((filter) => filter.filterColunm !== column);
    setCompared(deleted);
    setFilterColunmOption([...filterColunmOption, column]);
  };

  const handleOrganization = (e) => {
    e.preventDefault();
    setOrganizationByColunm({
      order: { column: organizationColunm, sort: directionOrganization } });
  };

  return (
    <PlanetsProvider>
      <Input
        value={ planetName }
        onChange={ (e) => setPlanetName(e.target.value) }
        placeholder="Digite o nome de um planeta"
        data-testid="name-filter"
      />
      <br />
      <form
        onSubmit={ handleComparationOfValues }
      >
        <Select
          data-testid="column-filter"
          value={ filterColunm }
          onChange={ (e) => setFilterColunm(e.target.value) }
          options={ filterColunmOption }
        />
        <Select
          data-testid="comparison-filter"
          value={ comparedFilter }
          onChange={ (e) => setComperedFilter(e.target.value) }
          options={ COMPARISON_FILTER }
        />
        <Input
          data-testid="value-filter"
          type="number"
          value={ filterValue }
          onChange={ (e) => setFilterValue(e.target.value) }
        />
        <Button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </Button>
      </form>
      <form
        onSubmit={ handleOrganization }
      >
        <Select
          value={ organizationColunm }
          onChange={ (e) => setOrganizationColunm(e.target.value) }
          data-testid="column-sort"
          options={ OPTION_DROPDOWN }
        />
        <label htmlFor="ascendente-sorte">
          Ascendente
          <input
            data-testid="column-sort-input-asc"
            id="ascendente-sorte"
            type="radio"
            name="ascendente-sorte"
            value="ASC"
            checked={ directionOrganization === 'ASC' }
            onChange={ (e) => setDiretctionOrganization(e.target.value) }
          />
        </label>
        <label htmlFor="descendente-sorte">
          Descendente
          <input
            data-testid="column-sort-input-desc"
            id="descendente-sorte"
            type="radio"
            name="descendente-sorte"
            value="DESC"
            onChange={ (e) => setDiretctionOrganization(e.target.value) }
          />
        </label>

        <button
          type="submit"
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
      <ul>
        {
          compared.map((filter) => (
            <li key={ filter.filterColunm } data-testid="filter">
              <p>
                {
                  `${filter.filterColunm} 
                  ${filter.comparedFilter} ${filter.filterValue}`
                }
              </p>
              <button
                type="button"
                onClick={ () => deleteFiltres(filter.filterColunm) }
              >
                X

              </button>
            </li>
          ))
        }
      </ul>
      <button
        onClick={ resetedFiltersAll }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
      <Table
        planetName={ planetName }
        compared={ compared }
        organizationByColunm={ organizationByColunm }
      />
    </PlanetsProvider>
  );
}

export default App;
