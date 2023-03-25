import * as yup from 'yup';
import i18n from 'i18next';
import store from '../slices';

const ModalInputSchema = (text) => {
  const state = store.getState();
  const { ids, entities } = state.channels;
  const alreadyExists = ids.map(
    ((id) => entities[id].name),
  );

  const schema = yup.string()
    .required(i18n.t('errors_feedbacks.validate.field_required'))
    .min(3, i18n.t('errors_feedbacks.validate.name_length'))
    .max(20, i18n.t('errors_feedbacks.validate.name_length'))
    .notOneOf(
      alreadyExists,
      i18n.t('errors_feedbacks.validate.uniqueName_required'),
    );
  try {
    return schema.validate(text);
  } catch (e) {
    return e;
  }
};

const SignupSchema = () => yup.object().shape({
  username: yup.string()
    .min(3, i18n.t('errors_feedbacks.validate.name_length'))
    .max(20, i18n.t('errors_feedbacks.validate.name_length'))
    .required(i18n.t('errors_feedbacks.validate.field_required')),
  password: yup.string()
    .min(6, i18n.t('errors_feedbacks.validate.password_length'))
    .required(i18n.t('errors_feedbacks.validate.field_required')),
  confirmPassword: yup.string().oneOf(
    [yup.ref('password'), null],
    i18n.t('errors_feedbacks.validate.passwords_did_match'),
  ),
});

export { ModalInputSchema, SignupSchema };
