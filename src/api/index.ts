import { HttpClient } from "@duplojs/http-client";

export const httpClient = new HttpClient({
	baseUrl: "https://nestjs-pokedex-api.vercel.app",
});
