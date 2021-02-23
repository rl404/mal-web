import React from 'react';

const InfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default InfiniteScroll;