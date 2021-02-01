class DepartmentConst {
    static MIN_NAME_LENGHT = 5
    static MAX_NAME_LENGHT = 20

    static MODEL = 'Department'
}

class UserConst {
    static MIN_NAME_LENGHT = 3
    static MAX_NAME_LENGHT = 15

    static MIN_EMAIL_LENGHT = 5
    static MAX_EMAIL_LENGHT = 30
    static EMAIL_NOT_VALID_MESSAGE = 'Email is not valid'

    static MIN_PASSWORD_LENGHT = 6
    static PASSWORD_NOT_VALID_MESSAGE = 'Password is not valid'

    static MIN_PHONE_LENGHT = 5
    static MAX_PHONE_LENGHT = 15

    static MODEL = 'User'
}

class NewsConst {
    static MIN_TITLE_LENGHT = 5
    static MAX_TITLE_LENGHT = 100

    static MIN_CONTENT_LENGHT = 10
    static MAX_CONTENT_LENGHT = 20000

    static MIN_IMAGE_LENGHT = 5
    static MAX_IMAGE_LENGHT = 50

    static MODEL = 'News'
}

class EventConst {
    static MIN_NAME_LENGHT = 3
    static MAX_NAME_LENGHT = 50

    static MIN_DESCRIPTION_LENGHT = 10
    static MAX_DESCRIPTION_LENGHT = 500

    static MIN_IMAGE_LENGHT = 5
    static MAX_IMAGE_LENGHT = 50

    static MODEL = 'Event'
}

class RoleConst {
    static ADMIN = 'Admin'
    static USER = 'User'
}

class AuthConst {
    static EXPIRATION_TIME = '1h'

    static MISSING_AUTORIZATION_HEADER_MESSAGE = 'Missing authorization header!'
    static INCORECT_AUTORIZATION_HEADER_MESSAGE = 'Incorrect autorization header!'

    static INVALID_TOKEN_MESSAGE = 'The provided token is invalid or expired!'
    static REQUIRED_ADMIN_ROLE = 'Execute access forbidden'
}

module.exports = {
    DepartmentConst,
    UserConst,
    NewsConst,
    RoleConst,
    EventConst,
    AuthConst
}