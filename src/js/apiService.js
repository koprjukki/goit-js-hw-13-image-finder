const baseUrl = "https://pixabay.com/api/";

export default {
	APIKEY: "15907105-43debff38290e81cd457c4c67",

	async fetchImg(query = "", page = 1) {
		const urlOptionString = `?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${this.APIKEY}`;

		const response = await fetch(baseUrl + urlOptionString);
		const parsed = await response.json();
		const hits = await parsed.hits;
		return hits;
	},
};
