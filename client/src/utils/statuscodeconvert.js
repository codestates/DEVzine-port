export function statuscodeconvert(code) {
  // console.log(code);
  const status = {
    100: '게시 대기',
    101: '수정 대기',
    102: '삭제 대기',
    110: '게시 완료',
    111: '수정 완료',
    112: '삭제 완료',
    120: '게시 거부',
    121: '수정 거부',
    122: '삭제 거부',
    130: '기타',
  };
  return status[code];
}
