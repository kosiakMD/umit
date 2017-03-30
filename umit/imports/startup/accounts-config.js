/**
 * Created by WebStorm.
 * User: Anton Kosiak
 * Date: 3/19/17
 * Time: 01:02
 */
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    //'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default)
    // requestPermissions: {
    //     facebook: ['user_likes'],
    //     github: ['user', 'repo']
    // },
    // requestOfflineToken: {
    //     google: true
    // },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});