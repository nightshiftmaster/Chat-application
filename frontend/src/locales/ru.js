/* eslint-disable import/no-anonymous-default-export */
export default {
  translation: {
    headers: {
      navbar_header: "Hexlet Chat",
      login_header: "Войти",
      signup_header: "Регистрация",
      channels_header: "Каналы",
      notfound_header: "Страница не найдена",
      modal: {
        adding_header: "Добавить канал",
        removing_header: "Удалить канал",
        renaming_header: "Переиминовать канал",
        removing_confirmation: "Уверены?",
      },
      dropDown_links: {
        removing: "Удалить",
        renaming: "Переимeновать",
      },
    },

    buttons: {
      login: "Войти",
      logout: "Выйти",
      registration: "Зарегистрироваться",
      modal: {
        sent: "Отправить",
        cancel: "Отменить",
        remove: "Удалить",
      },
    },
    placeholders: {
      login: {
        name: "Ваш ник",
        password: "Пароль",
      },
      signup: {
        username: "Имя пользователя",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
      },
      message_input: "Введите сообщение",
    },
    errors_feedbacks: {
      login: {
        invalid_user: "Неверные имя пользователя или пароль",
      },
      validate: {
        name_length: "От 3 до 20 символов",
        password_length: "Не менее 6 символов",
        field_required: "Обязательное поле",
        passwords_did_match: "Пароли должны совпадать",
        userName_alreadyUsed: "Такой пользователь уже существует",
        uniqueName_required: "Должно быть уникальным",
      },
      toasts: {
        network_error: "Ошибка соединения!",
        createChannel: "Канал создан",
        removeChannel: "Канал удалён",
      },
    },
    messages_count: {
      message_one: "{{count}} сообщение",
      message_few: "{{count}} сообщения",
      message_many: "{{count}} сообщений",
    },

    createAccount_section: {
      noaccount_text: "Нет аккаунта?  ",
      registration_link: " Регистрация",
    },

    notfound_page: {
      text: "Но вы можете перейти  ",
      link_to_main: "на главную страницу",
    },
  },
};
