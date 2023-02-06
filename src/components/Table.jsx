import { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table({ planetName, compared, organizationByColunm }) {
  const { dataPlanets, isLoading } = useContext(PlanetsContext);

  if (isLoading || !dataPlanets) {
    return <Loading />;
  }

  let PLANETS = dataPlanets.results;
  delete PLANETS[0].residents;

  const THEADRES = Object.keys(PLANETS[0]);

  const transformLink = (item) => (
    Array.isArray(item)
      ? item.map((url, index) => (
        <a key={ url + index } href={ url }>
          {url}
          <br />
        </a>
      )) : item);

  const tableData = (planet, index) => THEADRES.map((theader, i) => (
    <td
      key={ `${planet[theader]}${index}${i}` }
      data-testid={ `planet-${theader}` }
    >
      {transformLink(planet[theader])}
    </td>
  ));

  if (planetName) {
    PLANETS = PLANETS.filter((planet) => planet.name.toLowerCase()
      .includes(planetName.toLowerCase()));
  }

  if (Object.keys(compared).length) {
    PLANETS = compared.reduce((acc, item) => {
      const { filterValue, filterColunm, comparedFilter } = item;
      return acc.filter((planet) => {
        switch (comparedFilter) {
        case 'maior que':
          return +planet[filterColunm] > filterValue;
        case 'menor que':
          return +planet[filterColunm] < filterValue;
        case 'igual a':
          return planet[filterColunm] === filterValue;
        default: return acc;
        }
      });
    }, PLANETS);
  }

  if (Object.keys(organizationByColunm).length) {
    const { sort, column } = organizationByColunm.order;
    PLANETS = PLANETS.reduce((acc, curr) => {
      if (curr[column] === 'unknown') {
        acc.push(curr);
      } else {
        const index = acc.findIndex((item) => item[column] === 'unknown');
        acc.splice(index, 0, curr);
      }
      return acc;
    }, []);
    PLANETS = PLANETS.sort((a, b) => (sort === 'ASC' ? a[column] - b[column]
      : b[column] - a[column]));
  }

  return (
    <table>
      <thead>
        <tr>
          {
            THEADRES.map((theader, index) => (
              <th
                key={ `${theader}${index}` }
              >
                {theader}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          PLANETS.map((planet, index) => (
            <tr
              key={ planet.name + index }
            >
              { tableData(planet, index) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  planetName: PropTypes.string,
}.isRequired;

Table.propTypes = {
  tdatas: PropTypes.arrayOf(),
  theaders: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default Table;
