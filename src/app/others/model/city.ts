export class City {
	public _id: String;
	public name: String;
	public country: String;
	public temp: number;
	public maxtemp: number;
	public mintemp: number;
	public weather: String;
	public humidity: number;
	public windspeed: number;
	public userid: String;
	public addedOnDate: number;

	public day1: Date;
	public day1temp: number;
	public day1maxtemp: number;
	public day1mintemp: number;
	public day1weather: String;
	public day1humidity: number;
	public day1windspeed: number;
	public day2: Date;
	public day2temp: number;
	public day2maxtemp: number;
	public day2mintemp: number;
	public day2weather: String;
	public day2humidity: number;
	public day2windspeed: number;
	public day3: Date;
	public day3temp: number;
	public day3maxtemp: number;
	public day3mintemp: number;
	public day3weather: String;
	public day3humidity: number;
	public day3windspeed: number;


	constructor(name, country, temp, maxtemp, mintemp, weather, humidity, windspeed) {
		this.name = name;
		this.country = country;
		this.temp = temp;
		this.maxtemp = maxtemp;
		this.mintemp = mintemp;
		this.weather = weather;
		this.humidity = humidity;
		this.windspeed = windspeed;
	}

}
