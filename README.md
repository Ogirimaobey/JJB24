Project: JJB24

How to run locally (Windows PowerShell):

1. Open PowerShell and change to the project directory:

	cd "C:\Users\DELL USER\Desktop\JJB24"

2. Start a simple HTTP server (requires Python 3):

	python -m http.server 8000

3. Open the site in your browser:

	http://localhost:8000/index.html

To stop the server, close the terminal or press Ctrl+C in the terminal running the server.

Notes:
- Project is a static site (HTML/CSS/JS). Admin pages are under the `admin/` folder.
- If you don't have Python, you can open `index.html` directly in your browser, but some features may need a server.
# skate-winery