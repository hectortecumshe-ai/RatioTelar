<p align="center"><img src="logo.svg" width="96" alt="Ratio Telar"></p>

# Ratio Telar

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23290103.svg)](https://doi.org/10.5281/zenodo.23290103)

👉 **https://hectortecumshe-ai.github.io/RatioTelar/**

**El conocimiento agrícola local como sistema complejo adaptativo.** Primera aplicación de **Ratio Complexus**, el ala de la suite [Ratio](https://hectortecumshe-ai.github.io/) dedicada a los sistemas complejos adaptativos: *lo que está tejido junto*.

Ratio Telar teje en un solo tablero el territorio, los pasos y actividades del cultivo, los actores que sostienen el conocimiento, los recursos naturales y la sostenibilidad. Está hecha para productores y para científicos, en español y en inglés.

## Qué contiene (versión 0.5.0)

Trece bloques que se alimentan con los datos de la localidad, como en RatioBos:

| Bloque | Contenido |
|---|---|
| 1 · Cultivo | Catálogo ilustrado: 18 cultivos (uva primero, maíz con sus 64 razas de CONABIO, chayote, jamaica, maracuyá, guanábana, mango…), 9 especies (bovino por propósito, sistema y raza; abeja con su apiario; conejo, gallos de pelea, chinicuil…) y la granja de traspatio. Variedades, tipos o razas para cada uno. Se pueden agregar cultivos, especies y sistemas de producción propios |
| 2 · Región | Mapa real de México; estado, municipio y localidad (2,478 municipios y 54,357 localidades del INEGI con altitud y coordenadas) |
| 3 · Requerimientos | Requerimientos técnicos tradicionales (las 5B) y los innovados en la localidad |
| 4 · Manejo | 38 pasos con sus actividades tradicionales, impacto editable, actividades innovadoras y fechas de las actividades principales |
| 5 · Regeneración | Ocho perillas 0–4 (labranza mínima, suelo cubierto, diversidad, raíces vivas, integración animal, menos insumos de síntesis, materia orgánica, saber local) con valores sugeridos a partir del manejo; índice de regeneración, perfil, línea base y materia orgánica del suelo |
| 6 · Riesgos | 19 amenazas climáticas, biológicas, de mercado, sociales, institucionales y de recursos; probabilidad, impacto y control con perillas; matriz 5 × 5, capacidad adaptativa e índice de riesgo |
| 7 · Elementos | 63 elementos en 10 categorías: actores, instituciones, insumos, equipo, recursos naturales y financieros, conocimientos, políticas, perturbaciones y productos |
| 8 · Precio y valor | Precio por unidad y por hectárea; valor económico, de uso, cultural y ecológico con pesos ajustables |
| 9 · Formulación | Modelo del sistema complejo adaptativo, propiedades emergentes y formulación matemática |
| 10 · Tablero | Red ponderada interactiva, nodos y vínculos clave, comunidades (Louvain), distribución de grados, correlaciones φ (matriz y por elemento), matriz entre categorías, calendario circular y **cladograma del vecino más cercano** |
| 11 · Sostenibilidad | Suma y resta por compartimento (suelo, agua, atmósfera, vegetación, fauna), índice por paso, índice de Sarandón (2002), 17 ODS y huella de carbono (IPCC) |
| 12 · Prospectiva | Tres escenarios (deseable, tendencial y no deseado) a 2, 5 y 10 años: rendimiento, precio, costo, ingreso ÷ costo, mano de obra, adopción de innovaciones y sostenibilidad; supuestos editables |
| 13 · Informe | Resumen redactado, calendario, cladograma, prospectiva, tablas, CSV, impresión o PDF y proyecto completo |

Además: **Validación** (caso publicado, motor de redes frente a NetworkX, cladograma frente a SciPy, cálculo de control de la huella), **Teoría** y, en cada bloque, la ventana **«Así se hizo con el maíz criollo de Calpan»** para los cultivos aún por documentar.

## Novedades de la versión 0.5.0

- **La aplicación arranca en blanco.** El caso de Calpan ya no viene precargado: se consulta en una ventana aparte, con marca de agua, o en un «modo ejemplo» con una franja fija que lo anuncia. Nunca se copia a los campos del usuario ni se guarda.
- **Bloque 4:** las actividades del Stack publicado se responden «Sí la practico» o «No»; sin respuesta no cuentan.
- **Perillas de regeneración y de riesgo:** el valor sugerido se ve punteado hasta que la persona lo mueve o lo acepta; mientras falten, el índice es provisional.
- **«Llenado por ti»:** la barra y las marcas del menú (pendiente, en proceso, completo) cuentan solo lo que llenó la persona.
- Los bloques de resultados sin datos dicen qué falta. Los proyectos de versiones anteriores se recuperan o se convierten al abrirlos.
- Instructivos del Productor y del Científico (2.ª edición) actualizados.

## Novedades de la versión 0.4.0

- **Bloque 5 · Regeneración del sistema productivo:** mide si el sistema devuelve al suelo, al agua y a la biodiversidad más de lo que toma, con ocho perillas 0–4 basadas en los principios de salud del suelo (USDA-NRCS) y de agricultura regenerativa (Newton et al., 2020; Schreefel et al., 2020); índice de regeneración, línea base y materia orgánica.
- **Bloque 6 · Riesgos del sistema:** 19 amenazas con perillas de probabilidad, impacto y control; matriz 5 × 5 (IEC 31010:2019; ISO 31000:2018), capacidad adaptativa e índice de riesgo en el marco del IPCC (2014).
- Sus resultados aparecen en Elementos, Formulación, Tablero, Sostenibilidad, Prospectiva (regeneración y riesgo a 2, 5 y 10 años) e Informe. Los bloques se renumeraron: el Informe es ahora el 13.

## Novedades de la versión 0.3.0

- Jamaica, maracuyá, guanábana y mango; apiario como sistema y unidad de producción.
- Bovinos por propósito (carne, leche, doble propósito), sistema (extensivo, semiintensivo, intensivo, traspatio) y raza.
- Variedades, tipos o razas para todos los cultivos y especies (lista orientativa y texto libre).
- Cultivos, especies, sistemas de producción y tipos de unidad propios.
- Correlaciones por elemento y cladograma del vecino más cercano (enlace simple sobre distancias de la red, correlación cofenética), validado contra SciPy.
- Bloque de prospectiva a 2, 5 y 10 años, con su marco teórico.
- Impresión revisada en todos los bloques; enlaces directos `#bloque/vista/idioma`; enlaces a las demás aplicaciones de la familia Ratio.

## Instructivos

| | Español | English |
|---|---|---|
| **Productor** · paso a paso, con el caso de Calpan, guía de entrevista y hojas de campo | [web](https://hectortecumshe-ai.github.io/RatioTelar/instructivo-productor.html) · [PDF](instructivo/RatioTelar-Instructivo-Productor.pdf) | [web](https://hectortecumshe-ai.github.io/RatioTelar/instructivo-productor.html?lang=en) · [PDF](instructivo/RatioTelar-Producer-Guide.pdf) |
| **Científico** · modelo, ecuaciones, validación y ejemplo resuelto | [web](https://hectortecumshe-ai.github.io/RatioTelar/instructivo-cientifico.html) · [PDF](instructivo/RatioTelar-Instructivo-Cientifico.pdf) | [web](https://hectortecumshe-ai.github.io/RatioTelar/instructivo-cientifico.html?lang=en) · [PDF](instructivo/RatioTelar-Scientist-Guide.pdf) |

Texto bajo licencia CC BY 4.0. Se arman con `python instructivo/fuente/armar.py`; las capturas se toman en automático con `instructivo/fuente/capturar.py`.

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
python pruebas/verificar_clado.py        # verifica el cladograma con SciPy
```

## Cómo citar

Mojica-Zárate, H. T., Díaz-José, O., Barrera-Guzmán, L. A., y Velázquez-Vázquez, G. (2026). *Ratio Telar: el conocimiento agrícola local como sistema complejo adaptativo* (Versión 0.4.0) [Software]. Zenodo. https://doi.org/10.5281/zenodo.23309505

## Autores

Héctor Tecumshé Mojica-Zárate ([ORCID 0000-0002-9067-3983](https://orcid.org/0000-0002-9067-3983)) · Óscar Díaz-José · Luis Ángel Barrera-Guzmán · Guadalupe Velázquez-Vázquez. Licencia MIT.

## Fuentes principales

- Díaz-José O, Mojica-Zárate HT, Díaz-José J, Vilaboa-Arróniz J. 2026. El conocimiento agrícola local: el stack del maíz criollo en Calpan, Puebla. *Agricultura, Sociedad y Desarrollo* 23(3). https://doi.org/10.22231/asyd.v23i3.1822
- Mojica Zárate HT. 2017. *Modelo y procedimiento para la gestión estratégica integrada de los recursos naturales en territorios áridos con orientación agroproductiva*. Tesis doctoral, Universidad Central «Marta Abreu» de Las Villas.
- INEGI. 2020. Censo de Población y Vivienda; Catálogo Único de Claves Geoestadísticas.
