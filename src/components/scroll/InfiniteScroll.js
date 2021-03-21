import React from 'react';

const InfiniteScroll = (callback, parentElement, childElement) => {
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
    var lastEl = document.querySelector(parentElement + ' > ' + childElement + ':last-child');
    if (lastEl === null) return
    var lastElOffset = lastEl.offsetTop + lastEl.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset <= lastElOffset || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default InfiniteScroll;