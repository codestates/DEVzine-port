export function userGenerationDataConvert(str) {
  const status = {
    users_under20: '10대',
    users_20: '20대',
    users_30: '30대',
    users_40: '40대',
    users_over50: '50대 이상',
  };
  return status[str];
}
