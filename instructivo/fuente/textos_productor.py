"""Glosario y figuras propias (SVG) del Instructivo del Productor de Ratio Telar."""
from armar import bi, fig, BLOQUES

GLOS = [
  ['5B', '5B', 'Las cinco reglas básicas del saber local del maíz en Calpan: buena tierra, buena semilla, buena siembra, buena alimentación y buena vigilancia.', 'The five basic rules of local maize knowledge in Calpan: good soil, good seed, good sowing, good nutrition and good watchfulness.'],
  ['Actividad', 'Activity', 'Lo que se hace dentro de un paso de manejo (por ejemplo, «trabajo con arado reversible»). Cada actividad liga a los elementos que participan en ella.', 'What is done within a management step (for example, “reversible plough work”). Each activity links the elements taking part in it.'],
  ['Actividad innovadora', 'Innovative activity', 'Una práctica nueva que la localidad agregó al manejo tradicional; en la app se agrega con «+ Actividad innovadora».', 'A new practice the locality added to traditional management; in the app it is added with “+ Innovative activity”.'],
  ['Capacidad adaptativa', 'Adaptive capacity', 'Qué tanto puede el sistema absorber un golpe y reorganizarse. Ratio Telar la mide con la regeneración, la diversificación, el conocimiento técnico y las instituciones.', 'How well the system can absorb a shock and reorganise. Ratio Telar measures it with regeneration, diversification, technical knowledge and institutions.'],
  ['Cladograma', 'Cladogram', 'Árbol que agrupa a los elementos según qué tan cerca están en la red: las ramas cortas son vecinos muy ligados.', 'Tree that groups elements by how close they are in the network: short branches are tightly linked neighbours.'],
  ['Comunidad', 'Community', 'Grupo de elementos que se relacionan más entre sí que con el resto de la red.', 'Group of elements more related to each other than to the rest of the network.'],
  ['Correlación φ', 'φ correlation', 'Qué tanto dos elementos aparecen juntos en las mismas actividades, de −1 (nunca juntos) a 1 (siempre juntos).', 'How much two elements appear together in the same activities, from −1 (never together) to 1 (always together).'],
  ['Elemento', 'Element', 'Todo lo que interviene en el sistema: actores, instituciones, insumos, equipo, recursos naturales y financieros, conocimientos, políticas, perturbaciones y productos.', 'Everything taking part in the system: actors, institutions, inputs, equipment, natural and financial resources, knowledge, policies, disturbances and products.'],
  ['Escenario', 'Scenario', 'Un futuro posible construido con supuestos explícitos. No es un pronóstico.', 'A possible future built on explicit assumptions. It is not a forecast.'],
  ['Huella de carbono', 'Carbon footprint', 'Gases de efecto invernadero emitidos por hectárea (diésel, nitrógeno y urea), en kg de CO₂ equivalente.', 'Greenhouse gases emitted per hectare (diesel, nitrogen and urea), in kg of CO₂ equivalent.'],
  ['Índice de regeneración', 'Regeneration index', 'Promedio de las ocho perillas de regeneración, de 0 a 100. Dice si el sistema devuelve más de lo que toma.', 'Average of the eight regeneration knobs, from 0 to 100. Tells whether the system gives back more than it takes.'],
  ['Índice de riesgo', 'Risk index', 'Promedio del riesgo de todas las amenazas que aplican, de 0 a 100.', 'Average risk of all applicable hazards, from 0 to 100.'],
  ['Índice de sostenibilidad (IS)', 'Sustainability index (IS)', 'Qué tanto suma o resta cada actividad al suelo, el agua, la atmósfera, la vegetación y la fauna, de 0 a 1 (0.5 es neutro).', 'How much each activity adds to or subtracts from soil, water, atmosphere, vegetation and fauna, from 0 to 1 (0.5 is neutral).'],
  ['Intermediación', 'Betweenness', 'Cuántos caminos cortos de la red pasan por un elemento: mide quién sirve de puente.', 'How many short network paths pass through an element: it measures who acts as a bridge.'],
  ['ISGen', 'ISGen', 'Índice general de sostenibilidad de Sarandón: promedio de las dimensiones económica, ecológica y sociocultural, de 0 a 4.', 'Sarandón’s general sustainability index: average of the economic, ecological and socio-cultural dimensions, from 0 to 4.'],
  ['Línea base', 'Baseline', 'La foto del sistema en una fecha, para compararla después y ver si mejora.', 'A snapshot of the system on a date, to compare later and see whether it improves.'],
  ['Lectura de Ratio Telar', 'Ratio Telar reading', 'Un valor o una agrupación propuesta por la app, no publicada en la fuente. Siempre está marcada y se puede cambiar.', 'A value or grouping proposed by the app, not published in the source. It is always flagged and can be changed.'],
  ['Matriz de riesgos', 'Risk matrix', 'Tabla de 5 × 5 que cruza qué tan probable es un riesgo con cuánto daño haría.', 'A 5 × 5 table crossing how likely a risk is with how much damage it would do.'],
  ['MIAF', 'MIAF', 'Milpa intercalada con árboles frutales.', 'Maize intercropped with fruit trees.'],
  ['Modularidad (Q)', 'Modularity (Q)', 'Qué tan marcados están los grupos (comunidades) de la red. Por encima de 0.3, los grupos son claros.', 'How marked the network’s groups (communities) are. Above 0.3, groups are clear.'],
  ['ODS', 'SDG', 'Objetivos de Desarrollo Sostenible de la Agenda 2030 de las Naciones Unidas.', 'Sustainable Development Goals of the United Nations 2030 Agenda.'],
  ['Paso de manejo', 'Management step', 'Una etapa del ciclo productivo (por ejemplo, «selección de semilla»). En Calpan se documentaron 38.', 'A stage of the production cycle (for example, “seed selection”). Thirty-eight were documented in Calpan.'],
  ['Perilla', 'Knob', 'Control deslizante que se mueve como el volumen de un aparato, de un valor bajo a uno alto.', 'A slider you move like a volume control, from a low value to a high one.'],
  ['Prospectiva', 'Foresight', 'Disciplina que explora futuros posibles para decidir mejor hoy.', 'Discipline that explores possible futures to decide better today.'],
  ['Red ponderada', 'Weighted network', 'Red donde cada vínculo tiene un grosor: más grueso si los elementos comparten muchas actividades valiosas.', 'Network in which each link has a thickness: thicker if the elements share many valuable activities.'],
  ['Regeneración', 'Regeneration', 'Que el sistema mejore con cada ciclo el suelo, el agua y la biodiversidad de los que depende.', 'The system improving, each cycle, the soil, water and biodiversity it depends on.'],
  ['Sistema complejo adaptativo', 'Complex adaptive system', 'Conjunto de agentes y recursos que interactúan, aprenden y se adaptan; de sus relaciones surgen comportamientos que nadie diseñó.', 'A set of interacting agents and resources that learn and adapt; behaviours nobody designed emerge from their relationships.'],
  ['Sostenibilidad', 'Sustainability', 'Producir hoy sin comprometer la capacidad de producir mañana, en lo ambiental, lo económico y lo social.', 'Producing today without compromising the capacity to produce tomorrow, environmentally, economically and socially.'],
  ['Stack de conocimiento local', 'Local knowledge stack', 'Organización en capas del saber de una localidad sobre un cultivo: reglas, pasos y actividades (Díaz-José et al., 2026).', 'Layered organisation of a locality’s knowledge of a crop: rules, steps and activities (Díaz-José et al., 2026).'],
  ['Valor', 'Value', 'Importancia de un elemento para el sistema en cuatro dimensiones: económica, de uso, cultural y ecológica. No es lo mismo que el precio.', 'An element’s importance to the system in four dimensions: economic, use, cultural and ecological. Not the same as price.'],
]


def fig_telar():
    W, H = 780, 300
    fases = [(0, 4, 'Tus datos', 'Your data', '#4f7d3a'), (4, 8, 'Evaluar', 'Assess', '#b8562e'), (8, 11, 'Tejer y leer', 'Weave and read', '#3f6fb0'), (11, 13, 'Futuro e informe', 'Future and report', '#8a3f5a')]
    s = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Ratio Telar">']
    cw = (W - 40) / 13
    for a, b, es, en, col in fases:
        x0, x1 = 20 + a * cw, 20 + b * cw
        s.append(f'<rect x="{x0+3:.1f}" y="18" width="{x1-x0-6:.1f}" height="30" rx="8" fill="{col}" opacity=".14"/>')
        s.append(bi(es, en, x=f'{(x0+x1)/2:.1f}', y='38', text_anchor='middle', font_size='13', font_weight='700', fill=col))
    for i, bl in enumerate(BLOQUES):
        cx = 20 + i * cw + cw / 2
        s.append(f'<circle cx="{cx:.1f}" cy="120" r="22" fill="var(--b{i+1})"/><text x="{cx:.1f}" y="126" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">{i+1}</text>')
        s.append(f'<g transform="translate({cx:.1f} 156) rotate(40)">' + bi(bl[1], bl[2], x='0', y='0', font_size='12.5') + '</g>')
        if i < 12:
            s.append(f'<line x1="{cx+23:.1f}" y1="120" x2="{cx+cw-23:.1f}" y2="120" stroke="var(--line2)" stroke-width="2"/>')
    # flechas de retroalimentación
    def arco(i, j, es, en, y):
        xi, xj = 20 + i * cw + cw / 2, 20 + j * cw + cw / 2
        return (f'<path d="M{xi:.1f},96 C{xi:.1f},{y} {xj:.1f},{y} {xj:.1f},96" fill="none" stroke="var(--acc)" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#fl)"/>'
                + bi(es, en, x=f'{(xi+xj)/2:.1f}', y=str(y + 12), text_anchor='middle', font_size='11.5', class_='mu'))
    s.append('<defs><marker id="fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--acc)"/></marker></defs>')
    s.append(arco(3, 4, 'actividades', 'activities', 64))
    s.append(arco(5, 11, 'riesgo → escenarios', 'risk → scenarios', 58))
    s.append('</svg>')
    return fig(''.join(s), '<b>Los trece bloques.</b> Los bloques 1 a 4 describen tu unidad; del 5 al 8 la evalúas; en el 9 se teje la red, que lees en el 10 y el 11; el 12 mira al futuro y el 13 lo resume todo. Las flechas punteadas son ejemplos de cómo un bloque alimenta a otro.',
               '<b>The thirteen blocks.</b> Blocks 1–4 describe your farm; 5–8 assess it; block 9 weaves the network, which you read in 10 and 11; 12 looks ahead and 13 sums it all up. Dashed arrows are examples of one block feeding another.')


def fig_perilla():
    W, H = 760, 210
    x0, x1 = 60, 700
    X = lambda v: x0 + v / 4 * (x1 - x0)
    niv = [('0 · Nulo', '0 · None'), ('1 · Bajo', '1 · Low'), ('2 · Medio', '2 · Medium'), ('3 · Alto', '3 · High'), ('4 · Muy alto', '4 · Very high')]
    cols = ['#c43a2f', '#e0803a', '#d9b13a', '#7fb35a', '#2f8f6a']
    s = [f'<svg viewBox="0 0 {W} {H}" role="img">']
    s.append(f'<rect x="{x0}" y="70" width="{x1-x0}" height="10" rx="5" fill="var(--soft)"/>')
    s.append(f'<rect x="{x0}" y="70" width="{X(3)-x0:.1f}" height="10" rx="5" fill="var(--b5)"/>')
    s.append(f'<circle cx="{X(3):.1f}" cy="75" r="14" fill="var(--paper)" stroke="var(--b5)" stroke-width="4"/>')
    for v in range(5):
        s.append(f'<line x1="{X(v):.1f}" x2="{X(v):.1f}" y1="92" y2="100" class="ln"/>')
        s.append(f'<circle cx="{X(v):.1f}" cy="124" r="8" fill="{cols[v]}"/>')
        s.append(bi(niv[v][0], niv[v][1], x=f'{X(v):.1f}', y='154', text_anchor='middle', font_size='13.5', font_weight='700'))
    s.append(bi('Como el volumen de un aparato: mueve la perilla hasta que diga lo que pasa en tu parcela.',
                'Like a volume control: move the knob until it says what happens on your plot.', x=str(x0), y='34', font_size='15', font_weight='700'))
    s.append(bi('La app propone un valor a partir de tus actividades; si lo cambias, la tarjeta se colorea y aparece «volver al sugerido».',
                'The app proposes a value from your activities; if you change it, the card is shaded and “back to suggested” appears.', x=str(x0), y='190', font_size='12.5', class_='mu'))
    s.append('</svg>')
    return fig(''.join(s), '<b>La escala de las perillas.</b> Regeneración y valor usan escalas ordinales: cada punto tiene un significado claro, no un número inventado.',
               '<b>The knob scale.</b> Regeneration and value use ordinal scales: each point has a clear meaning, not a made-up number.')


def fig_matriz():
    W, H = 760, 330
    c, L, T = 48, 120, 20
    s = [f'<svg viewBox="0 0 {W} {H}" role="img">']
    def col(r): return '#3f9b5f' if r <= 4 else '#d9b13a' if r <= 9 else '#e0803a' if r <= 15 else '#c43a2f'
    for p in range(1, 6):
        for i in range(1, 6):
            x, y = L + (i - 1) * c, T + (5 - p) * c
            s.append(f'<rect x="{x}" y="{y}" width="{c-3}" height="{c-3}" rx="6" fill="{col(p*i)}" fill-opacity=".25" stroke="{col(p*i)}" stroke-opacity=".6"/>'
                     f'<text x="{x+(c-3)/2}" y="{y+c/2+3}" text-anchor="middle" font-size="12" class="mu">{p*i}</text>')
    for p in range(1, 6):
        s.append(f'<text x="{L-8}" y="{T+(5-p)*c+c/2+3}" text-anchor="end" font-size="12" class="mu">{p}</text>')
        s.append(f'<text x="{L+(p-1)*c+c/2-1}" y="{T+5*c+14}" text-anchor="middle" font-size="12" class="mu">{p}</text>')
    s.append(bi('Impacto →', 'Impact →', x=str(L + 2.5 * c), y=str(T + 5 * c + 34), text_anchor='middle', font_size='13', font_weight='700'))
    s.append(f'<g transform="translate({L-34} {T+2.5*c}) rotate(-90)">' + bi('Probabilidad →', 'Likelihood →', x='0', y='0', text_anchor='middle', font_size='13', font_weight='700') + '</g>')
    lx = L + 5 * c + 40
    for k, (es, en, r) in enumerate([('Bajo: 1 a 4', 'Low: 1 to 4', 4), ('Medio: 5 a 9', 'Medium: 5 to 9', 9), ('Alto: 10 a 15', 'High: 10 to 15', 15), ('Muy alto: 16 a 25', 'Very high: 16 to 25', 25)]):
        y = T + 20 + k * 30
        s.append(f'<rect x="{lx}" y="{y-12}" width="16" height="16" rx="3" fill="{col(r)}"/>' + bi(es, en, x=str(lx + 24), y=str(y + 1), font_size='13.5'))
    y = T + 160
    s.append(bi('Ejemplo: sequía con probabilidad 4 e impacto 3', 'Example: drought with likelihood 4 and impact 3', x=str(lx), y=str(y), font_size='13.5', font_weight='700'))
    s.append(bi('riesgo bruto = 4 × 3 = 12 (alto)', 'raw risk = 4 × 3 = 12 (high)', x=str(lx), y=str(y + 24), font_size='13.5'))
    s.append(bi('con capacidad adaptativa de 70: 12 × (1 − 0.4 × 0.70) = 8.6', 'with adaptive capacity of 70: 12 × (1 − 0.4 × 0.70) = 8.6', x=str(lx), y=str(y + 48), font_size='13.5'))
    s.append(bi('→ queda en medio', '→ it ends up medium', x=str(lx), y=str(y + 72), font_size='13.5', font_weight='700'))
    s.append('</svg>')
    return fig(''.join(s), '<b>Cómo se lee la matriz.</b> Cada celda multiplica probabilidad por impacto. La capacidad adaptativa de tu sistema y los controles que ya tienes bajan el riesgo. El ejemplo es la sequía del caso de Calpan con los valores sugeridos.',
               '<b>How to read the matrix.</b> Each cell multiplies likelihood by impact. Your system’s adaptive capacity and the controls you already have lower the risk. The example is drought in the Calpan case with the suggested values.')


def FIGURAS():
    return {'FIG_TELAR': fig_telar(), 'FIG_PERILLA': fig_perilla(), 'FIG_MATRIZ': fig_matriz()}
