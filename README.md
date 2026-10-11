<p align="center"><img src="logo.svg" width="96" alt="Ratio Telar"></p>

# Ratio Telar

**El conocimiento agrícola local como sistema complejo adaptativo.** Primera aplicación de **Ratio Complexus**, el ala de la suite [Ratio](https://hectortecumshe-ai.github.io/) dedicada a los sistemas complejos adaptativos: *lo que está tejido junto*.

Ratio Telar teje en un solo tablero el territorio, los pasos y actividades del cultivo, los actores que sostienen el conocimiento, los recursos naturales y la sostenibilidad. Está hecha para productores y para científicos, en español y en inglés.

## Qué contiene (versión 0.2.0)

Diez bloques que se alimentan con los datos de la localidad, como en RatioBos:

| Bloque | Contenido |
|---|---|
| 1 · Cultivo | Catálogo ilustrado de 12 cultivos y 6 especies domésticas; sistema (milpa, MIAF, traspatio…) y unidad de producción |
| 2 · Región | Mapa real de México; estado, municipio y localidad (2,478 municipios y 54,357 localidades del INEGI con altitud y coordenadas) |
| 3 · Requerimientos | Requerimientos técnicos tradicionales (las 5B) y los innovados en la localidad |
| 4 · Manejo | 38 pasos con sus actividades tradicionales, impacto editable, actividades innovadoras y fechas de las actividades principales |
| 5 · Elementos | 63 elementos en 10 categorías: actores, instituciones, insumos, equipo, recursos naturales y financieros, conocimientos, políticas, perturbaciones y productos |
| 6 · Precio y valor | Precio por unidad y por hectárea; valor económico, de uso, cultural y ecológico con pesos ajustables |
| 7 · Formulación | Modelo del sistema complejo adaptativo, propiedades emergentes y formulación matemática |
| 8 · Tablero | Red ponderada interactiva, nodos y vínculos clave, comunidades (Louvain), distribución de grados, correlaciones φ, matriz entre categorías y calendario circular |
| 9 · Sostenibilidad | Suma y resta por compartimento (suelo, agua, atmósfera, vegetación, fauna), índice por paso, índice de Sarandón (2002), 17 ODS y huella de carbono (IPCC) |
| 10 · Informe | Resumen redactado, calendario, tablas, CSV, impresión o PDF y proyecto completo |

Además: **Validación** (caso publicado, motor de redes frente a NetworkX en la red de Krackhardt y en la red real del maíz, cálculo de control de la huella) y **Teoría**.

## Rigor

Cada cifra muestra su fuente. Lo que es agrupación o lectura de la app se marca como **«Lectura de Ratio Telar»**. Lo que no está documentado aparece como **«sin dato»**: la aplicación no inventa valores.

## Uso

Abre `index.html` en cualquier navegador; funciona sin conexión. No usa cookies, rastreadores ni recursos de terceros. Las evaluaciones se guardan en el navegador y se pueden exportar e importar en JSON.

```bash
python armar.py                    # arma index.html a partir de src/
python herramientas/bajar_localidades.py  # descarga las localidades del INEGI (fuentes/datos/loc, no se versiona)
python herramientas/proyeccion.py        # ajusta la proyección lon/lat → mapa
python herramientas/territorio.py        # regenera src/11_territorio.js
python pruebas/verificar_red.py          # verifica la red con NetworkX
```

## Autores

Héctor Tecumshé Mojica-Zárate ([ORCID 0000-0002-9067-3983](https://orcid.org/0000-0002-9067-3983)) · Óscar Díaz-José · Luis Ángel Barrera-Guzmán · Guadalupe Velázquez-Vázquez. Licencia MIT.

## Fuentes principales

- Díaz-José O, Mojica-Zárate HT, Díaz-José J, Vilaboa-Arróniz J. 2026. El conocimiento agrícola local: el stack del maíz criollo en Calpan, Puebla. *Agricultura, Sociedad y Desarrollo* 23(3). https://doi.org/10.22231/asyd.v23i3.1822
- Mojica Zárate HT. 2017. *Modelo y procedimiento para la gestión estratégica integrada de los recursos naturales en territorios áridos con orientación agroproductiva*. Tesis doctoral, Universidad Central «Marta Abreu» de Las Villas.
- INEGI. 2020. Censo de Población y Vivienda; Catálogo Único de Claves Geoestadísticas.
