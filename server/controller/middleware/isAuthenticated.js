module.exports = {
  isAuthenticated(req, res, next) {
    // 서버에 요청을 보낸 사용자가 인증이 되어있는 상태인지 확인하여 boolean 값 반환
    if (req.isAuthenticated()) {
      return next();
    }
    return res.send('fail');
  },
};
