import AV from 'leancloud-storage';

var APP_ID = 'CfVFhqgldTz7UnDAcemuKHxi-gzGzoHsz';
var APP_KEY = 'EbRyjg9NAX4KyJjggD00nvbf';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function  signUp(username,password,successFn,errorFn) {
   // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  // user.setEmail();
  user.signUp().then(function (loginedUser) {
      let user=getUserFromAvUser(loginedUser)
      successFn.call(null,user)
  }, function (error) {
      errorFn.call(null,error)
  });

}


export function signIn(username,password,successFn,errorFn){

  AV.User.logIn(username, password).then(function (loginedUser) {
      let user=getUserFromAvUser(loginedUser)
      successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  })
}

export function getCurrentUser(){
    var currentUser = AV.User.current();
    if (currentUser) {
      return getUserFromAvUser(currentUser)
    }
    else {
      return
    }
}

export function signOut(){
  AV.User.logOut()
}

function getUserFromAvUser(AVUser){
  return {
    id:AVUser.id,
    ...AVUser.attributes
  }
}