import { useId } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNameFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

export const SearchBox = () => {
   const dispatch = useDispatch();
   const searchId = useId();
   const filterValue = useSelector(state => state.filters.name);

   const handleChange = event => {
      const { value } = event.target;
      dispatch(setNameFilter(value));
   };
   return (
      <div className={css.searchBox}>
         <label htmlFor={searchId}>Faind contacts by name</label>
         <input id={searchId} value={filterValue} onChange={handleChange} />
      </div>
   );
};
