import webview
from player import notification

url_web = "https://fextyv8.github.io/To-Do-list"

class API:
    def notificar_tarea(self, name, hour):
        notification.notify(
            title="¡Tarea pendiente!",
            message=f"{name} - {hour}",
            app_name="To-Do List",
            app_icon="icon.ico",
            timeout=10
        )

api = API()

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
        if (btn) btn.style.display = 'none';
    """
    window.evaluate_js(script)

webview.start(hideBtn, window, api=api)
