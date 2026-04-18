import { writable } from 'svelte/store';

const SHEET_ID = '1YxGlsysyGsMkIfi2E5XJ4mbOkLKnPCBp9nVEdL6cSRg';

export type Sponsor = { name: string; image: string; tier: string; website: string };

function driveImage(url: string) {
	const slashMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	const queryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
	const id = slashMatch?.[1] ?? queryMatch?.[1];
	return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w400` : url;
}

export const sponsors = writable<Sponsor[]>([]);
export const sponsorsLoading = writable(true);
export const sponsorsError = writable(false);

let fetched = false;

export async function loadSponsors() {
	if (fetched) return;
	fetched = true;
	try {
		const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sponsors`;
		const res = await fetch(url);
		const text = await res.text();
		const json = JSON.parse(text.match(/setResponse\(([\s\S]*)\);?\s*$/)![1]);

		let headers: string[] = (json.table?.cols || []).map((col: any) => col.label);
		let rows: any[] = json.table?.rows || [];

		if (headers.every((h) => !h) && rows.length > 0) {
			headers = rows[0].c.map((cell: any) => String(cell?.v ?? '').trim());
			rows = rows.slice(1);
		}

		sponsors.set(rows.map((row) => {
			const c = row.c;
			const get = (key: string) => String(c[headers.indexOf(key)]?.v ?? '').trim();
			return {
				name: get('name'),
				image: get('image') ? driveImage(get('image')) : '',
				tier: get('tier') || 'Bronze',
				website: get('website')
			};
		}));
	} catch {
		sponsorsError.set(true);
	} finally {
		sponsorsLoading.set(false);
	}
}
