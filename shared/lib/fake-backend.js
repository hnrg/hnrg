export default class FakeBackend {

 /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * email: "barton@foo.com"
   * id: "Z4yvP19OeL"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * username: "barton"
   *
   */
  login(data) {}

  /**
   * ### logout
   * prepare the request and call _fetch
   */
  logout() {}

  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  resetPassword(data) {}

  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  id: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  getProfile() {}

  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  updateProfile(userId, data) {}
}
