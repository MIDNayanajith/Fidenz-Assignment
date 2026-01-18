export function calculateComfortScore(temperature, humidity, windSpeed) {
  let tempScore = 100 - Math.abs(temperature - 22) * 4;
  tempScore = Math.max(0, Math.min(100, tempScore));

  let humidityScore = 100 - Math.abs(humidity - 50) * 2;
  humidityScore = Math.max(0, Math.min(100, humidityScore));

  let windScore = 100 - windSpeed * 10;
  windScore = Math.max(0, Math.min(100, windScore));

  //average and round
  const score = Math.round((tempScore + humidityScore + windScore) / 3);
  return score;
}
