export function statuscodeconvert(code) {
  // console.log(code);
  const status = {
    0o0: '게시 대기',
    0o1: '수정 대기',
    0o2: '삭제 대기',
    10: '게시 완료',
    11: '수정 완료',
    12: '삭제 완료',
    20: '게시 거부',
    21: '수정 거부',
    22: '삭제 거부',
    30: '기타',
  };
  return status[code];
}
