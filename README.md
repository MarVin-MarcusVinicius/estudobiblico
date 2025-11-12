# Estudio Bíblico — Sitio estático

Este repositorio contiene el sitio estático del grupo "Grupo Wao Gijón — Estudio bíblico".

Qué hay en este repo
- `index.html` — página principal
- `styles.css` — estilos globales (aplica imagen de fondo si existe `assets/background.jpg`)
- Carpetas por bloques: `bloque1-patriarcas/`, `bloque2-exodo/`, `bloque3-reyes-profetas/`, `bloque4-profetas/`, `bloque5-nuevo-testamento/`.

Cómo probar localmente
1. Abrir con un servidor local (recomendado para evitar problemas con rutas):

```powershell
cd 'c:\Users\marcus\Desktop\estudobiblico'
python -m http.server 8000
# Luego abrir http://localhost:8000 en tu navegador
```

2. O abrir `index.html` con doble clic (menos recomendado para pruebas de rutas).

Cómo añadir la imagen de fondo (recomendado)
- Coloca la imagen que quieres usar en `assets/` y nómbrala `background.jpg`.
  - Ruta esperada: `assets/background.jpg`
- Si quieres usar otra imagen, edita `styles.css` en la regla `html, body { background-image: url("assets/background.jpg"); }` y cambia la ruta.
- Opcional: ajusta la opacidad del overlay en la regla `body::before { background: rgba(2,6,23,0.45); }`.

Cómo compartir con amigos
- Asegúrate de que los cambios estén en la rama `main` del repo remoto en GitHub.
- Verifica GitHub Pages en: `Settings → Pages` y comprueba que la fuente sea `main` y la carpeta `/ (root)`.
- La URL pública será: `https://MarVin-MarcusVinicius.github.io/estudobiblico` (puede tardar unos minutos en desplegar).

Notas y recuperación
- Hice un backup de la versión previa en la rama remota `remote-main-backup` por seguridad.

Si quieres que coloque la imagen que adjuntaste en el repo, súbela a `assets/` (arrastrando el archivo a la carpeta `assets` en este workspace) y yo la commiteo por ti.

---
Pequeñas tareas pendientes:
- Colocar la imagen en `assets/background.jpg` si quieres que la vea en la web y la suba al repo.
- Ajustar overlay u opciones por si quieres otro estilo.
