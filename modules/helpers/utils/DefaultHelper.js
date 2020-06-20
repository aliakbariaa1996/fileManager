const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class DefaultHelper {
    checkPage(page) {
        if (page == null) {
            return 1;
        } else if (page == undefined) {
            return 1;
        } else if (page == 0) {
            return 1;
        } else {
            return page;
        }
    }

    hashPassword(password) {
        const bcrypt = require('bcrypt');
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    reject(false);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    checkValidUri(uri) {
        return new Promise((resolve, reject) => {
            resolve(uri.replace(/\\/g, '/').replace('../' + configApp.upload.directoryName, ''));
        });
    }

    async sendEmail(subject, email) {
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new DefaultHelper();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;