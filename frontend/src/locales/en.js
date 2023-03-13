/* eslint-disable import/no-anonymous-default-export */
export default {
  translation: {
    headers: {
      navbar_header: 'Hexlet Chat',
      login_header: 'Sign in',
      signup_header: 'Sign up',
      channels_header: 'Channels',
      notfound_header: 'Page not found',
      modal: {
        adding_header: 'Add channel',
        removing_header: 'Remove channel',
        renaming_header: 'Rename channel',
        removing_confirmation: 'Sure?',
      },
      dropDown_links: {
        remove: 'Remove',
        rename: 'Rename',
      },
    },

    buttons: {
      login: 'Log in',
      logout: 'Log out',
      registration: 'Sign up',
      modal: {
        sent: 'Confirm',
        cancel: 'Cancel',
        remove: 'Remove',
      },
    },
    placeholders: {
      login: {
        name: 'Name',
        password: 'Password',
      },
      signup: {
        name: 'Name',
        password: 'Password',
        confirmPassword: 'Confirm password',
      },
      message_input: 'Message',
    },
    errors_feedbacks: {
      login: {
        invalid_user: 'Incorrect username or password',
      },
      validate: {
        name_length: '3 to 20 characters',
        password_length: 'At least 6 characters',
        field_required: 'Field required',
        passwords_did_match: 'Passwords must match',
        userName_alreadyUsed: 'User already exists',
        uniqueName_required: 'Must be unique',
      },
      toasts: {
        network_error: 'Connection error!',
        createChannel: 'Channel created',
        removeChannel: 'Channel removed',
      },
    },
    messages_count: {
      message_one: '{{count}} message',
      message_other: '{{count}} messages',
    },

    createAccount_section: {
      noaccount_text: "Don't have an account?  ",
      registration_link: 'Sign up',
    },

    notfound_page: {
      text: 'You can return  ',
      link_to_main: 'to the main page',
    },
  },
};
