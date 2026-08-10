# Portafolio Web — Victoria Vial

Sitio estático simple (HTML/CSS) para el portafolio fotográfico.

## Estructura

- `index.html` — página principal
- `css/style.css` — estilos
- `img/` — imágenes del sitio (crear subcarpetas: `fotografia/`, `proyectos/`)

## Ver el sitio localmente

Abrí `index.html` en el navegador, o corré un servidor simple:

```
python3 -m http.server 8000
```

y entrá a `http://localhost:8000`.

## Publicar con GitHub Pages

1. Conectar este repo a GitHub (ver instrucciones abajo).
2. En GitHub: Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. El sitio queda publicado en `https://<usuario>.github.io/<nombre-repo>/`.

## Conectar a GitHub (primera vez)

Desde esta carpeta, en la Terminal de tu Mac:

```
git remote add origin https://github.com/<tu-usuario>/<nombre-repo>.git
git branch -M main
git push -u origin main
```

Después de esto, cada vez que quieras guardar una nueva versión:

```
git add .
git commit -m "Descripción del cambio"
git push
```
