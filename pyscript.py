import webview

url_web = "https://fextyv8.github.io/To-Do-list"

window = webview.create_window(
    "To-Do List",
    url=url_web,
    width=600,
    height=700,
    resizable=True
)

def hideBtn(window):
    script = """
        const btn = document.getElementById('downloadBtn');
        if (btn) {
            btn.style.display = 'none';
        }
    """
    window.evaluate_js(script)

webview.start(hideBtn, window)


