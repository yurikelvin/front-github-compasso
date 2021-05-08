import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'components/Spinner';

import useKeyPress from 'hooks/useKeyPress';

const InfiniteScrollList = ({
  initialItems,
  initialPage,
  getItems,
  children,
  onSelectItem,
  onItemsChange,
  message,
  scrollableTarget,
  handleClickItem,
}) => {
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(items.length < 5);
  const [selected, setSelected] = useState(-1);
  const [error, setError] = useState('');
  const [page, setPage] = useState(initialPage);

  const fetchMoreData = async () => {
    if (!hasMore) return;

    const fromPage = page + 1;

    const size = 10;

    try {
      const response = await getItems(fromPage, size);
      const itemsRecovered = response.data
      setPage(fromPage);
      const newItems = [...items];
      if (itemsRecovered.length > 0) {
        newItems.push(...itemsRecovered);
        setItems(newItems);
      }

      if (itemsRecovered.length < size) {
        setHasMore(false);
      }

      setError('');
    } catch (e) {
      setError(
        'Não foi possível recuperar os dados no momento. Tente novamente em alguns minutos.'
      );
      setHasMore(false);
    }
  };

  useEffect(() => {
    setItems(initialItems);
    setSelected(-1);
    setHasMore(true);
    // eslint-disable-next-line
  }, [initialItems]);

  useEffect(() => {
    if (onItemsChange) {
      onItemsChange(items);
    }
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    if (items.length > 0 && downPress) {
      setSelected(prevState => (prevState < items.length - 1 ? prevState + 1 : prevState));
    }
    // eslint-disable-next-line
  }, [downPress]);

  useEffect(() => {
    if (items.length > 0 && upPress) {
      setSelected(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    // eslint-disable-next-line
  }, [upPress]);

  useEffect(() => {
    if (onSelectItem) {
      onSelectItem(selected);
    }
    // eslint-disable-next-line
  }, [selected]);

  if (items.length === 0) {
    return <div />;
  }

  const onClickItem = item => {
    if (item !== null && items.indexOf(item) !== selected) {
      const itemIndex = items.indexOf(item);
      if (itemIndex !== selected) {
        setSelected(itemIndex);
      }
    }
    if (handleClickItem) {
      handleClickItem(item);
    }
  };

  return (
    <div>
      <InfiniteScroll
        scrollableTarget={scrollableTarget}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        className="pb-2"
        loader={
          <div className="w-full h-full flex">
            <Spinner />
          </div>
        }
        endMessage={
          <p className="text-gray-500" style={{ textAlign: 'center', marginTop: '15px' }}>
            <b>{message}</b>
          </p>
        }>
        {items.map((item, i) => {
          return React.cloneElement(children, {
            item,
            key: `infinite-scroll-list-${item.id}`,
            isSelected: selected !== -1 && selected === i,
            isLastChild: i + 1 === items.length,
            onClickItem,
          });
        })}
        {error && (
          <div className="InfiniteScrollList_errorContainer">
            Ops ! {error}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollList;
