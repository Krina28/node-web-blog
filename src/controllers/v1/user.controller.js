var { AppController } = require('./app.controller');
var User = require('../../models/user.model');
//const { to, ReE, ReS } = require('../../services/util.service');
//const authService = require('../../services/auth.service');

class UserController extends AppController {
  constructor() {
    super();
  }

  /**
	* Create User
	* Used for user creation
	*
	* @param {*} req It contains email, firstname, lastname, password, role_id
	* @param {*} res 	*test@test.com
	*
	* @returns object It's contains status_code, message and userdata
	*/
  async createUser(req, res) {
    try {
      req = {};
      req = {
        firstName: "test",
        lastName: "test",
        email: "test@test.com",
        password: "123456",
      };
      /* var UserObj = new User(req); */
      // select only the adventures name and length
      /* User.findById('5cab3caa502bfc22b860c279', 'password', function (err, user) {

      }); */
      /* var UserObj = new User(req);
      let resData = await UserObj.createUser(); */
      res.json(resData);

    } catch (err) {
      res.json(err);
    }
  }

  /**
	* Delete User
	* Used for user deletion
	*
	* @param {*} req objectId
	* @param {*} res 
	*
	* @returns object It's contains status_code, message and userdata
	*/
  async deleteUser(req, res) {
    try {
      req = {};
      req = {
        objId: '5cab3caa502bfc22b860c279'
      };
      var UserObj = new User();
      let resData = await UserObj.deleteUser(req);
      res.json(resData);
    } catch (err) {
      res.json(err);
    }
  }

  /**
	* Update User
	* Used for user updation
	*
	* @param {*} req objectId
	* @param {*} res 
	*
	* @returns object It's contains status_code, message and userdata
	*/
  async updateUser(req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
      if (err.message.includes('E11000')) {
        if (err.message.includes('email')) {
          err = 'This email address is already in use';
        } else {
          err = 'Duplicate Key Entry';
        }
      }
      return res.json(res, err);
    }
    return res.json(res, { message: 'Updated User: ' + user.email });
  }

  /**
	* Login User
	* Used for user login
	*
	* @param {*} req objectId
	* @param {*} res 
	*
	* @returns object It's contains status_code, message and userdata
	*/
  async login(req, res) {
    //const {email,password} = req.allParams();
    let err, user;

   // user = await authService.authUser(req.body);
   user = []
    // if(err) return ReE(res, err, 422);
    return res.json({
      token: user.getJWT(),
      user: user.toWeb()
    })
    // return ReS(res, {token:user.getJWT(), user:user.toWeb()});
  }

  async list(req, res) {
    try {
      console.log('>>>>>>>CALL')
      return res.json({
        status: 200,
        message: 'Success'
      })
    } catch (err) {
      console.log('>>>>>>>err', err)
    }
  }
}

module.exports = new UserController();
