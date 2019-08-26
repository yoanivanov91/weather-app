export class City {
	public _id?: String;
	public name: String;
	public temperature: String;
	public humidity: number;
	public windspeed: number;

	constructor(name, temperature, humidity, windspeed) {
		this.name = name;
		this.temperature = temperature;
		this.humidity = humidity;
		this.windspeed = windspeed;
	}

}
