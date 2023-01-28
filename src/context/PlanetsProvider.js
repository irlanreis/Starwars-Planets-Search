import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useRequest from '../hooks/useRequest';

function PlanetsProvider({ children }) {
  const { data: dataPlanets, isLoading, error, fetchDataWithLoading } = useRequest();

  useEffect(() => {
    async function executeFetch() {
      await fetchDataWithLoading('https://swapi.dev/api/planets');
    }

    executeFetch();
  }, [fetchDataWithLoading]);

  const value = useMemo(() => ({
    dataPlanets,
    isLoading,
    error,
  }), [dataPlanets, isLoading, error]);

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default PlanetsProvider;
