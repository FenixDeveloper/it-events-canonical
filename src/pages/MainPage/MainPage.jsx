import styles from './styles.module.scss';
import { useEffect } from 'react';
import {
  useEventsContext,
  useFiltersContext,
  useIsMobileResolution,
  Loader,
  SearchField,
  LeftFilterBar,
  CardList,
  PaddingWrapper
} from "it-events-frontend";

const MainPage = () => {
  const { resetFilters, isFiltersOpen } = useFiltersContext();
  const { isLoading, upcomingEvents } =
    useEventsContext();

  const isMobile = useIsMobileResolution(1080);

  useEffect(() => {
    resetFilters();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    upcomingEvents.length && (
      <div className={styles.page}>
        {isMobile ? (
          <>
             <SearchField />
            {isFiltersOpen ? (
              <LeftFilterBar />
            ) : (
              <CardList events={upcomingEvents} />
            )}
          </>
        ) : (
          <>
            <LeftFilterBar />
            <div>
              <CardList events={upcomingEvents} />
            </div>
          </>
        )}
      </div>
    )
  );
};

export default PaddingWrapper(MainPage);
