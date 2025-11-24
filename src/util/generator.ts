export const getRandomString = (strings: String[]): String => {
	if (strings.length <= 0) return "Strings are empty";
	return strings[Math.floor(Math.random() * strings.length)];
};
