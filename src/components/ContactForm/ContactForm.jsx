import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const userValidation = Yup.object().shape({
   name: Yup.string()
      .min(3, 'Too short, at least 3 characters')
      .max(50, 'Too long')
      .required('Required'),
   number: Yup.string()
      .min(3, 'Too short, at least 3 characters')
      .max(50, 'Too long')
      .required('Required'),
});

export const ContactForm = () => {
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         name: '',
         number: '',
      },
      validationSchema: userValidation,
      onSubmit: (values, actions) => {
         dispatch(addContact({ id: nanoid(), ...values }));
         actions.resetForm();
      },
   });

   return (
      <form className={css.form} onSubmit={formik.handleSubmit}>
         <div className={css.wrap}>
            <label htmlFor="nameId">Name</label>
            <input type="text" id="nameId" {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && (
               <span className={css.error}>{formik.errors.name}</span>
            )}
         </div>
         <div className={css.wrap}>
            <label htmlFor="numberId">Number</label>
            <input type="text" id="numberId" {...formik.getFieldProps('number')} />
            {formik.touched.number && formik.errors.number && (
               <span className={css.error}>{formik.errors.number}</span>
            )}
         </div>
         <div className={css.wrapper}>
            <button className={css.button} type="submit">
               Add Contact
            </button>
         </div>
      </form>
   );
};
