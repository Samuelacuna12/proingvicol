# Proingvicol

Exportación estática del sitio de Hostinger a partir del respaldo del 17 de noviembre de 2026. Incluye las páginas y entradas publicadas, archivos de proyectos, medios, estilos y componentes de navegación de la web original.

## Vista local

Desde la raíz del repositorio, ejecuta `python3 -m http.server 8080` y abre `http://localhost:8080/`.

## Publicación

El sitio se sirve desde la raíz del dominio, sin compilación. Selecciona la raíz del repositorio como directorio de publicación en un alojamiento estático y configura `404.html` como página de error. Los directorios contienen `index.html` para que el alojamiento sirva rutas como `/services/`, `/insights/` y `/contact-us/`. Los enlaces antiguos con `?page_id=` o `?p=` se redirigen desde la portada y desde la página de error.

Antes de mover el dominio, comprueba los registros DNS actuales del correo y consérvalos durante el cambio de alojamiento web.

## Contacto

Los botones de teléfono y WhatsApp mantienen los números publicados en el respaldo. Las direcciones visibles usan enlaces de correo directos. Los formularios abren un borrador dirigido a `Contacto@proingvicol.com` en la aplicación de correo del visitante. Los adjuntos se agregan en esa aplicación. Para envío automático desde la web o para mantener una lista de suscriptores, hace falta conectar un servicio de formularios.

El respaldo incluía 24 páginas de servicios sin texto ni diseño de Elementor. Se completaron con el título y la imagen destacada del respaldo, la navegación del sitio y un acceso a cotización. Se conservaron también las páginas de demostración que figuraban como publicadas en WordPress.
