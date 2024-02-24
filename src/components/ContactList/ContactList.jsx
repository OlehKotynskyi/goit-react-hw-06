import { useSelector, useDispatch } from 'react-redux';
import { Contact } from '../Contact/Contact';
import { deleteContact } from '../../redux/contactsSlice';

import css from './ContactList.module.css';

export const ContactList = () => {
   const users = useSelector(state => state.contacts.items);
   const filterValue = useSelector(state => state.filters.name);
   const dispatch = useDispatch();

   const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(filterValue.toLowerCase())
   );

   if (!filteredUsers || filteredUsers.length === 0) {
      return <div>No contacts</div>;
   }
   return (
      <div>
         <ul className={css.list}>
            {filteredUsers.map(({ id, name, number }) => (
               <Contact
                  key={id}
                  name={name}
                  number={number}
                  onDelete={() => dispatch(deleteContact(id))}
               />
            ))}
         </ul>
      </div>
   );
};
