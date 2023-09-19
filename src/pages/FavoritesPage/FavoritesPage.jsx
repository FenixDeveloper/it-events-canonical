import React, { useState, useEffect } from 'react';
import {
  useEventsContext,
  parsePrice,
  Loader,
  PageTitle,
  SortBar,
  PrimaryButton,
  CardList,
  PaddingWrapper
} from "it-events-frontend";
import styles from './styles.module.scss';

const FavoritesPage = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortByName, setSortByName] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByDate, setSortByDate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteEvents } = useEventsContext();
  const noEvents = !favoriteEvents.length;

  useEffect(() => {
    setFilteredEvents(favoriteEvents);
  }, [favoriteEvents]);

  const handleFilter = (option) => {
    let sortedList = [...filteredEvents];

    switch (option) {
      case 'name':
        sortedList.sort((a, b) => {
          const sortOrder = sortByName ? 1 : -1;
          return sortOrder * a.title.localeCompare(b.title);
        });
        setSortByName((prevValue) => !prevValue);
        break;
      case 'price':
        sortedList.sort((a, b) => {
          const sortOrder = sortByPrice ? 1 : -1;
          if (a.price === b.price) {
            const dateA = new Date(a.date_start).getTime();
            const dateB = new Date(b.date_start).getTime();
            return (dateA - dateB) * sortOrder;
          } else if (a.price === 'Бесплатно' || b.price === 'Бесплатно') {
            return a.price === 'Бесплатно' ? -1 * sortOrder : 1 * sortOrder;
          } else {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            return (priceA - priceB) * sortOrder;
          }
        });
        setSortByPrice((prevValue) => !prevValue);
        break;
      case 'date':
        sortedList.sort((a, b) => {
          const sortOrder = sortByDate ? 1 : -1;
          const dateA = new Date(a.date_start).getTime();
          const dateB = new Date(b.date_start).getTime();
          return (dateA - dateB) * sortOrder;
        });
        setSortByDate((prevValue) => !prevValue);
        break;
      default:
        break;
    }

    setFilteredEvents([...sortedList]);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageTitle
            title='Избранное'
            subtitle='Сохраненные мероприятия'
            size='48px'
          />
          <SortBar onSort={handleFilter} />
          {noEvents && (
            <div className={styles.favoritesContainer}>
              <h3 className={styles.favoritesText}>Список пуст</h3>
              <p className={styles.favoritesDesc}>
                Вы пока ничего не сохранили в избранное, но вы можете начать
                пополнять свой список избранного прямо сейчас. Для этого
                воспользуйтесь поиском на нашем сайте и найдите интересующие вас
                события.
              </p>
              <PrimaryButton variant='link' to='/' title='Начать поиск' />
            </div>
          )}
          <CardList events={filteredEvents} />
        </>
      )}
    </div>
  );
};

export default PaddingWrapper(FavoritesPage);
