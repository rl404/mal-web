import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Content from './Content';

const Search = (props) => {
  const order = new URLSearchParams(props.location.search).get('order');
  const type = new URLSearchParams(props.location.search).get('type');
  const status = new URLSearchParams(props.location.search).get('status');
  const season = new URLSearchParams(props.location.search).get('season');
  const producer = new URLSearchParams(props.location.search).get('producer');
  const genre = new URLSearchParams(props.location.search).get('genre');

  const defaultQuery = {
    query: '',
    order: order ? order : '-',
    type: type ? parseInt(type) : 0,
    status: status ? parseInt(status) : 0,
    season: season ? season : '-',
    producer: producer ? parseInt(producer) : null,
    genre: genre ? genre.split(',').map(g => parseInt(g)) : [],
    genre2: [-12],
  }

  const [queryState, setQueryState] = React.useState(defaultQuery)
  const setQuery = (query) => {
    setQueryState({
      ...queryState,
      ...query,
    });
  };

  React.useEffect(() => {
    setQueryState(defaultQuery);
  }, [props.match.params.type]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header
          sType={props.match.params.type}
          setQuery={setQuery}
          query={queryState} />
      </Grid>
      <Grid item xs={12}>
        <Content
          sType={props.match.params.type}
          query={queryState}
          showEntryDrawer={props.showEntryDrawer}
          animelist={props.animelist}
          mangalist={props.mangalist} />
      </Grid>
    </Grid>
  );
};

Search.propTypes = {
  showEntryDrawer: PropTypes.func.isRequired,
  animelist: PropTypes.object,
  mangalist: PropTypes.object,
};

export default Search;