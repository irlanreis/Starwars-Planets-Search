import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table() {
  const { isLoading, dataPlanets } = useContext(PlanetsContext);

  if (isLoading || !dataPlanets) {
    return <Loading />;
  }

  const ALLPLANETS = dataPlanets.results;
  delete ALLPLANETS[0].residents;

  const THEADERS = Object.keys(ALLPLANETS[0]);

  function transformLink(item) {
    if (Array.isArray(item)) { // verifica se o item é um array
      return item.map((url, i) => (
        <a key={ url + i } href={ url }>
          {url}
        </a>
      ));
    }
    return item;
  }

  function tableData(planet, index) {
    return THEADERS.map((theader) => {
      const value = planet[theader];
      const key = `${theader}-${index}`;
      return <td key={ key }>{transformLink(value)}</td>;
    });
  }

  return (
    <table>
      <thead>
        <tr>
          {
            THEADERS.map((element, i) => (
              <th key={ `${element}-${i}` }>{element}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          ALLPLANETS.map((planet, i) => {
            console.log(ALLPLANETS);
            return (
              <tr key={ planet.name + i }>
                {
                  tableData(planet)
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default Table;
