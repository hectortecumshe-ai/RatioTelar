<p align="center"><img src="logo.svg" width="96" alt="Ratio Telar"></p>

# Ratio Telar

**El conocimiento agrícola local como sistema complejo adaptativo.** Primera aplicación de **Ratio Complexus**, el ala de la suite [Ratio](https://hectortecumshe-ai.github.io/) dedicada a los sistemas complejos adaptativos: *lo que está tejido junto*.

Ratio Telar teje en un solo tablero el territorio, los pasos y actividades del cultivo, los actores que sostienen el conocimiento, los recursos naturales y la sostenibilidad. Está hecha para productores y para científicos, en español y en inglés.

## Qué contiene (versión 0.1.0)

| Sección | Contenido | Fuente |
|---|---|---|
| Territorio | Región → estado → municipio → comunidad; 2,478 municipios con población y viviendas del Censo 2020 | INEGI; regiones del Banco de México |
| Stack | Las 5B, los 38 pasos y las actividades del maíz criollo de Calpan, Puebla, en un calendario que se ajusta a la fecha de siembra; IIC publicado; clústeres del dendrograma; cinco grupos de conocimiento | Díaz-José et al. (2026) |
| Red de actores | Red de los cinco grupos de actores con sus métricas publicadas; editor para tejer la red propia con centralidad, intermediación (Brandes) y cercanía | Díaz-José et al. (2026); Freeman (1978); Brandes (2001) |
| Dimensiones | Social, económica, agrícola, pecuaria, ambiental, ecológica, emergencia ambiental, recursos naturales y sostenibilidad, con los ODS relacionados | Artículo, INEGI; relación con ODS propuesta |
| Gestión integrada | Las 4 fases y 9 pasos; los 10 preceptos de desarrollo local y conservación ambiental con su escala; NCA; gráfica de espejo | Mojica Zárate (2017), tesis doctoral |
| Prospectiva | MICMAC (directo e indirecto), MACTOR (relaciones de fuerza, movilización) y escenarios logísticos no lineales | Godet (2007); tesis |
| Ahorro de recursos | Comparación por hectárea entre la forma local y una referencia convencional | Datos del usuario |
| Tablero | Vista de conjunto, telar del sistema y los 17 ODS | — |

## Rigor

Cada cifra muestra su fuente. Lo que es agrupación o lectura de la app se marca como **«Lectura de Ratio Telar»**. Lo que no está documentado aparece como **«sin dato»**: la aplicación no inventa valores.

## Uso

Abre `index.html` en cualquier navegador; funciona sin conexión. No usa cookies, rastreadores ni recursos de terceros. Las evaluaciones se guardan en el navegador y se pueden exportar e importar en JSON.

```bash
python armar.py                    # arma index.html a partir de src/
python herramientas/territorio.py  # regenera src/11_territorio.js desde fuentes/datos (INEGI)
```

## Autores

Héctor Tecumshé Mojica-Zárate ([ORCID 0000-0002-9067-3983](https://orcid.org/0000-0002-9067-3983)) · Óscar Díaz-José · Luis Ángel Barrera-Guzmán · Guadalupe Velázquez-Vázquez. Licencia MIT.

## Fuentes principales

- Díaz-José O, Mojica-Zárate HT, Díaz-José J, Vilaboa-Arróniz J. 2026. El conocimiento agrícola local: el stack del maíz criollo en Calpan, Puebla. *Agricultura, Sociedad y Desarrollo* 23(3). https://doi.org/10.22231/asyd.v23i3.1822
- Mojica Zárate HT. 2017. *Modelo y procedimiento para la gestión estratégica integrada de los recursos naturales en territorios áridos con orientación agroproductiva*. Tesis doctoral, Universidad Central «Marta Abreu» de Las Villas.
- INEGI. 2020. Censo de Población y Vivienda; Catálogo Único de Claves Geoestadísticas.
