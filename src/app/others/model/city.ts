export class City {
	public _id: String;
	public name: String;
	public temperature: String;
	public weather: String;
	public humidity: number;
	public windspeed: number;
	public userid: String;
	public weatherIcon: String;
	public addedOnDate: number;

	constructor(name, temperature, weather, humidity, windspeed) {
		this.name = name;
		this.temperature = temperature;
		this.weather = weather;
		this.humidity = humidity;
		this.windspeed = windspeed;
		this.userid = null;
		this.weatherIcon = null;
		this.addedOnDate = null;
	}

}
