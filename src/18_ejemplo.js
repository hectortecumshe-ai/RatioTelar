"use strict";
/* =====================================================================
   Ventana «Así se hizo con el maíz criollo de Calpan, Puebla».
   Aparece en cada bloque cuando el cultivo o la especie elegida no tiene
   Stack documentado: muestra cómo se llenó ese bloque en el caso de referencia
   (Díaz-José et al., 2026) y los pasos para llenarlo con el cultivo propio.
   Todo dato sale de 13_stack.js y 15_elementos.js; lo que es lectura de
   Ratio Telar se marca como tal.
   ===================================================================== */
const _li = a => '<ul>'+a.map(x=>`<li>${x}</li>`).join('')+'</ul>';
const _ol = a => '<ol>'+a.map(x=>`<li>${x}</li>`).join('')+'</ol>';
const _mes = m => new Date(2026, m-1, 1).toLocaleDateString(LOC(), {month:'long'});
const EJEMPLO = {
  cultivo: ()=>({
    corto: T('Se eligió el maíz criollo (<i>Zea mays</i> L.), cultivado en milpa y en MIAF, en unidades de producción de menos de 5 ha.','Landrace maize (<i>Zea mays</i> L.) was chosen, grown in milpa and MIAF, on farms under 5 ha.'),
    hecho: _li([
      T('Cultivo: <b>maíz criollo</b>; el artículo no especifica la raza (en Puebla se reportan cerca de '+CONTEXTO.razasPuebla+').','Crop: <b>landrace maize</b>; the paper does not name the race (about '+CONTEXTO.razasPuebla+' are reported in Puebla).'),
      T('Sistemas: ','Systems: ')+CALPAN.sistemas.map(s=>T(s[0],s[1])).join(T(' y ',' and '))+'.',
      T('Frutales del MIAF: ','MIAF fruit trees: ')+CALPAN.frutales.map(f=>`${f[0]} (<i>${f[1]}</i>)`).join(', ')+'.',
      T('Unidad de producción: ','Farm size: ')+CALPAN.up+T('; rendimiento de ',' ; yield ')+CALPAN.rend.join('–')+' t/ha.',
      T('Parcelas de seguimiento: ','Monitored plots: ')+CALPAN.parcelas.map(p=>p[0]+(p[1]?` (${p[1]} ha)`:'')).join(', ')+'.'
    ]),
    pasos: _ol([
      T('Elige tu cultivo o especie en el catálogo (si es maíz o bovino, precisa raza o tipo).','Choose your crop or species in the catalogue (for maize or cattle, set race or type).'),
      T('Marca el sistema de producción tal como lo practicas (milpa, monocultivo, traspatio, apiario…).','Mark the production system as you practise it (milpa, monoculture, backyard, apiary…).'),
      T('Indica el tipo de unidad y la superficie en hectáreas; ponle nombre a la parcela y al productor.','Set the unit type and area in hectares; name the plot and the farmer.')
    ])}),
  region: ()=>({
    corto: T('Se ubicó en Puebla → Calpan (clave INEGI 21026) → localidad de la cabecera municipal.','It was located in Puebla → Calpan (INEGI code 21026) → municipal seat.'),
    hecho: _li([
      T('Estado: Puebla; región Centro.','State: Puebla; Central region.'),
      T('Municipio: San Andrés Calpan, clave ','Municipality: San Andrés Calpan, code ')+CALPAN.cve+'; '+CALPAN.coord+'.',
      T('Colinda con ','Borders ')+[...CALPAN.limites.N,...CALPAN.limites.S,...CALPAN.limites.E,...CALPAN.limites.O].join(', ')+'.',
      T('Comunidades estudiadas: ','Communities studied: ')+CALPAN.comunidades.map(c=>c[0]).join('; ')+'.',
      T('Población según el artículo: cerca de ','Population per the paper: about ')+fmt(CALPAN.pobArt,0)+T(' habitantes; PEA de ',' inhabitants; labour force ')+fmt(CALPAN.pea,0)+T(' personas, '+CALPAN.peaPrim+' % en el sector primario.',' people, '+CALPAN.peaPrim+' % in the primary sector.')
    ]),
    pasos: _ol([
      T('Elige el estado; la región se asigna sola.','Choose the state; the region is set automatically.'),
      T('Elige el municipio y luego la localidad: verás su altitud y su punto en el mapa.','Choose the municipality, then the locality: you will see its altitude and map point.'),
      T('Si tu localidad no aparece, elige la más cercana y anótalo en las notas del proyecto.','If your locality is missing, pick the nearest one and note it in the project notes.')
    ])}),
  requerimientos: ()=>({
    corto: T('Los productores resumieron su saber en cinco reglas básicas, las 5B: buena tierra, buena semilla, buena siembra, buena alimentación y buena vigilancia.','Farmers summed up their knowledge in five basic rules, the 5B: good soil, seed, sowing, nutrition and watchfulness.'),
    hecho: _li(B5.filter(b=>!b.interp).map(b=>`<b style="color:${b.col}">${esc(tx(b))}</b>: ${esc(T(b.d[0],b.d[1]))}`))
      + `<p class="nota">${T(`Se obtuvieron de ${ART.informantes} informantes entre ${ART.periodo}.`,`Drawn from ${ART.informantes} informants in ${ART.periodo}.`)}</p>`,
    pasos: _ol([
      T('Pregunta a los productores: «¿qué se necesita para que este cultivo salga bien?». Agrupa las respuestas en pocas reglas, como las 5B.','Ask farmers: “what does this crop need to do well?”. Group the answers into a few rules, like the 5B.'),
      T('Escribe cada requerimiento tradicional con una descripción corta y su fuente (quién lo dijo o dónde se publicó).','Write each traditional requirement with a short description and its source (who said it or where it was published).'),
      T('Agrega aparte los requerimientos <b>innovados</b>: lo que la localidad ha incorporado (análisis de suelo, bioinsumos, nuevas variedades…).','Add the <b>innovated</b> requirements separately: what the locality has adopted (soil tests, bio-inputs, new varieties…).')
    ])}),
  manejo: ()=>({
    corto: T(`Se documentaron ${ART.pasos} pasos y ${ART.actividades} actividades, del trabajo del suelo en diciembre a la cosecha y el balance económico.`,`${ART.pasos} steps and ${ART.actividades} activities were documented, from tillage in December to harvest and economic balance.`),
    hecho: `<p>${T('Los primeros pasos, tal como aparecen en la Figura 4 del artículo:','The first steps, as in Figure 4 of the paper:')}</p>`
      + _li(PASOS.slice(0,6).map(p=>`<b>${T('Paso','Step')} ${p.n}. ${esc(T(p.es,p.en))}</b> <span class="muted">(${p.v.map(_mes).join('–')})</span>: ${p.a.map(a=>`${a[0]}) ${esc(T(a[1],a[2]))}`).join('; ')}`))
      + `<p class="nota">${T('… y así hasta el paso 38. Cada actividad lleva una letra (A, B, C…) y cada paso su ventana de fechas en el calendario.','… and so on to step 38. Each activity has a letter (A, B, C…) and each step its date window in the calendar.')}</p>`,
    pasos: _ol([
      T('Lista los pasos en el orden en que se hacen durante el ciclo (preparar el suelo, sembrar, cuidar, cosechar, vender).','List the steps in the order they happen in the season (prepare soil, sow, tend, harvest, sell).'),
      T('Dentro de cada paso, anota sus actividades concretas y quiénes intervienen.','Within each step, note its concrete activities and who takes part.'),
      T('Pon las fechas de las actividades principales (siembra, deshierbe, poda, corte): alimentan el calendario circular del Tablero y del Informe.','Enter the dates of the main activities (sowing, weeding, pruning, harvest): they feed the circular calendar in the Dashboard and Report.'),
      T('Marca cuáles son tradicionales y cuáles innovadas.','Mark which are traditional and which are innovated.')
    ])}),
  regeneracion: ()=>({
    corto: T('El artículo de Calpan no mide la regeneración, pero su Stack permite leerla: tres pasos de labranza, rastrojo devuelto al suelo, selección de semilla criolla y análisis de suelo.','The Calpan paper does not measure regeneration, but its Stack lets us read it: three tillage passes, stubble returned to the soil, landrace seed selection and soil testing.'),
    hecho: _li([
      T('Labranza: primer, segundo y tercer paso de arado (subsoleador, arado reversible o de discos, rastra y vigado; pasos 3 a 5).','Tillage: first, second and third tillage passes (subsoiler, reversible or disc plough, harrow and levelling; steps 3–5).')+' '+marcaDato(),
      T('Materia orgánica: rastreo para incorporar materia orgánica y captar humedad (paso 32) y análisis de suelo (paso 13).','Organic matter: harrowing to incorporate organic matter and capture moisture (step 32) and soil testing (step 13).')+' '+marcaDato(),
      T('Saber local: selección de la mazorca y desgranado (paso 6) y almacenamiento de semilla (paso 8).','Local knowledge: ear selection and shelling (step 6) and seed storage (step 8).')+' '+marcaDato(),
      T('Las puntuaciones 0–4 que propone la app a partir de estas actividades son lectura de Ratio Telar.','The 0–4 scores the app proposes from these activities are Ratio Telar readings.')+' '+marcaInterp()]),
    pasos: _ol([
      T('Revisa el valor sugerido de cada perilla y muévela según lo que pasa en tu parcela.','Check each knob’s suggested value and move it to match your plot.'),
      T('Si tienes análisis de suelo, anota el % de materia orgánica de antes y de ahora.','If you have soil tests, enter the % organic matter before and now.'),
      T('Guarda una línea base y vuelve en el siguiente ciclo para ver si el sistema se regenera.','Save a baseline and come back next cycle to see whether the system regenerates.')])}),
  riesgos: ()=>({
    corto: T('En Calpan, el Stack registra perturbaciones climáticas que mueven la fecha de siembra: El Niño y La Niña, ciclones del Atlántico, la Oscilación Madden-Julian y la Ártica. No publica probabilidades.','In Calpan, the Stack records climate disturbances that shift the sowing date: El Niño and La Niña, Atlantic cyclones, the Madden-Julian and Arctic oscillations. It publishes no probabilities.'),
    hecho: _li([
      T('Perturbaciones del entorno: ','Environmental disturbances: ')+CALPAN.clima.join(', ')+'. '+marcaDato(),
      T('Productores y asesores siguen el pronóstico del tiempo y el calendario lunar para decidir.','Farmers and advisers follow the weather forecast and the lunar calendar to decide.')+' '+marcaDato(),
      T('Las probabilidades e impactos 1–5 son sugerencias de Ratio Telar a partir de tus datos y de los escenarios de la prospectiva.','The 1–5 likelihoods and impacts are Ratio Telar suggestions from your data and the outlook scenarios.')+' '+marcaInterp()]),
    pasos: _ol([
      T('Desmarca los riesgos que no aplican a tu localidad.','Untick the risks that do not apply to your locality.'),
      T('Para cada riesgo, mueve la probabilidad (qué tan seguido pasa) y el impacto (cuánto daño hace) de 1 a 5.','For each risk, move likelihood (how often it happens) and impact (how much damage) from 1 to 5.'),
      T('Indica el control que ya tienes: seguro, reserva de semilla, bordos, venta anticipada, organización.','Set the control you already have: insurance, seed reserve, bunds, forward sale, organisation.')])}),
  elementos: ()=>{ const porCat=Object.keys(CATS).map(k=>[k,ELEM.filter(e=>e.cat===k).length]).filter(x=>x[1]);
    return {
    corto: T(`Se identificaron ${ELEM.length} elementos en ${porCat.length} categorías; los actores clave fueron productores, proveedores de insumos, asesores técnicos, investigadores y la academia local (CBTA 255).`,`${ELEM.length} elements in ${porCat.length} categories were identified; key actors were farmers, input suppliers, technical advisers, researchers and local academia (CBTA 255).`),
    hecho: _li(porCat.map(([k,n])=>`<b style="color:${CATS[k].col}">${CATS[k].sym} ${esc(tx(CATS[k].n))}</b>: ${n} — ${ELEM.filter(e=>e.cat===k).slice(0,3).map(e=>esc(tx(e.n))).join(', ')}${n>3?'…':''}`))
      + `<p class="nota">${T('Participantes por ciclo (Cuadro 1): ','Participants per cycle (Table 1): ')}${CUADRO1.map(c=>`${c.ciclo}: ${c.PM+c.PI+c.IAC+c.AT}`).join(' · ')}.</p>`,
    pasos: _ol([
      T('Recorre cada paso de manejo y pregunta: ¿quién lo hace?, ¿qué se usa?, ¿de dónde sale el dinero?, ¿qué recurso natural interviene?','Go through each management step and ask: who does it? what is used? where does the money come from? which natural resource is involved?'),
      T('Ubica cada respuesta en su categoría: actores, instituciones, insumos, equipo, recursos naturales y financieros, conocimientos, políticas, perturbaciones y productos.','Place each answer in its category: actors, institutions, inputs, equipment, natural and financial resources, knowledge, policies, disturbances and products.'),
      T('Liga cada elemento a las actividades donde participa: así se teje la red.','Link each element to the activities it takes part in: that is how the network is woven.')
    ])}; },
  precios: ()=>({
    corto: T('El artículo de Calpan no publica precios: este bloque se llena con los datos de cada productor. Aquí se distingue lo que cuesta un elemento de lo que vale para el sistema.','The Calpan paper publishes no prices: this block is filled with each farmer’s data. It separates what an element costs from what it is worth to the system.'),
    hecho: _li([
      T('<b>Precio</b>: lo que se paga en el mercado por unidad (kg, L, jornal, ha) y la cantidad usada por hectárea.','<b>Price</b>: what the market charges per unit (kg, L, day’s labour, ha) and the amount used per hectare.'),
      T('<b>Valor</b>: importancia de 0 a 5 en cuatro dimensiones: económica, de uso, cultural y ecológica.','<b>Value</b>: importance from 0 to 5 in four dimensions: economic, use, cultural and ecological.'),
      T('Ejemplo de lectura: la semilla criolla seleccionada en casa (paso 6) casi no tiene precio de mercado, pero su valor cultural y ecológico es alto; un herbicida puede costar más y valer menos para el sistema.','Example reading: home-selected landrace seed (step 6) has almost no market price, yet high cultural and ecological value; a herbicide may cost more and be worth less to the system.')+' '+marcaInterp()
    ]),
    pasos: _ol([
      T('Elige una categoría (insumos, equipo, actores…).','Pick a category (inputs, equipment, actors…).'),
      T('Anota precio, unidad y cantidad por hectárea de lo que compras o pagas.','Enter price, unit and amount per hectare of what you buy or pay for.'),
      T('Califica el valor de 0 a 5 en cada dimensión, aunque el elemento no tenga precio.','Rate value from 0 to 5 in each dimension, even if the element has no price.'),
      T('Si te falta algún elemento, agrégalo al catálogo: queda disponible para todo el proyecto.','If an element is missing, add it to the catalogue: it becomes available for the whole project.')
    ])}),
  formulacion: ()=>({
    corto: T(`Con los ${ART.pasos} pasos, sus actividades y los elementos ligados, Ratio Telar tejió la red del sistema del maíz de Calpan.`,`From the ${ART.pasos} steps, their activities and linked elements, Ratio Telar wove the Calpan maize network.`),
    hecho: _li([
      T(`Nodos: los elementos del Bloque 7; aristas: compartir una actividad (${LAZOS.length} lazos adicionales entre actores e instituciones descritos en el artículo).`,`Nodes: the Block 7 elements; edges: sharing an activity (${LAZOS.length} extra ties among actors and institutions described in the paper).`),
      T('Peso de cada vínculo: la raíz del producto de los valores de los dos elementos (Bloque 8).','Each tie’s weight: the square root of the product of the two elements’ values (Block 8).'),
      T('Seguimiento en tres ciclos: ','Monitoring over three cycles: ')+CUADRO1.map(c=>c.ciclo).join(', ')+'.'
    ]),
    pasos: _ol([
      T('Revisa que los bloques 3 a 8 tengan datos: sin pasos ni elementos no hay red.','Check that Blocks 3–8 have data: without steps or elements there is no network.'),
      T('Formula el sistema: la app calcula la red y sus indicadores.','Formulate the system: the app computes the network and its indicators.'),
      T('Si algo se ve raro, vuelve al bloque correspondiente y corrige.','If something looks odd, go back to the relevant block and fix it.')
    ])}),
  tablero: ()=>{ const ii=PASOS.filter(p=>p.iic).sort((a,b)=>b.iic-a.iic).slice(0,3);
    return {
    corto: T('En Calpan, la academia local (CBTA 255) resultó el puente principal de la red de actores, y el conocimiento se agrupó en cinco clústeres.','In Calpan, local academia (CBTA 255) was the main bridge of the actor network, and knowledge clustered into five groups.'),
    hecho: _li([
      T('Intermediación publicada: academia local ','Published betweenness: local academia ')+ACTORES.find(a=>a.id==='AL').inter+T('; asesores técnicos ','; technical advisers ')+ACTORES.find(a=>a.id==='AT').inter+'.',
      T('Cercanía entre ','Closeness between ')+RED_PUB.cercania.join(T(' y ',' and '))+'.',
      T('Pasos con mayor intensidad de conocimiento: ','Steps with highest knowledge intensity: ')+ii.map(p=>`${esc(T(p.es,p.en))} (${p.iic})`).join('; ')+'.',
      T(`${CLUSTERS.length} clústeres en el dendrograma (Figura 3).`,`${CLUSTERS.length} clusters in the dendrogram (Figure 3).`)
    ]),
    pasos: _ol([
      T('Mira primero qué nodos tienen más grado e intermediación: son los que sostienen tu sistema.','First look at which nodes have the highest degree and betweenness: they hold your system together.'),
      T('Revisa las comunidades: muestran qué actividades y elementos trabajan juntos.','Check the communities: they show which activities and elements work together.'),
      T('Usa el calendario circular para ver si las fechas que capturaste se enciman o dejan huecos.','Use the circular calendar to see whether your dates overlap or leave gaps.')
    ])}; },
  sostenible: ()=>({
    corto: T('El artículo vincula el saber local del maíz con los ODS 2 (hambre cero) y 15 (vida de ecosistemas terrestres); Ratio Telar lo evalúa por compartimento y con el índice general de sostenibilidad de Sarandón (2002).','The paper links local maize knowledge to SDG 2 (zero hunger) and 15 (life on land); Ratio Telar assesses it by compartment and with Sarandón’s (2002) general sustainability index.'),
    hecho: _li([
      T('ODS citados en el artículo: ','SDGs cited in the paper: ')+CONTEXTO.ods.join(T(' y ',' and '))+'.',
      T('Compartimentos evaluados: ','Compartments assessed: ')+COMP.map(c=>tx(c)).join(', ')+'.',
      T('La huella de carbono usa diésel, nitrógeno y urea por hectárea con factores del IPCC.','The carbon footprint uses diesel, nitrogen and urea per hectare with IPCC factors.')
    ]),
    pasos: _ol([
      T('Revisa el efecto de cada actividad sobre suelo, agua, atmósfera, vegetación y fauna.','Review each activity’s effect on soil, water, atmosphere, vegetation and fauna.'),
      T('Captura litros de diésel, kg de nitrógeno y de urea, y el rendimiento: con eso se calcula la huella.','Enter litres of diesel, kg of nitrogen and urea, and yield: the footprint is computed from them.'),
      T('Completa precios y valores del Bloque 8: el índice de Sarandón necesita la dimensión económica.','Complete the Block 8 prices and values: Sarandón’s index needs the economic dimension.')
    ])}),
  prospectiva: ()=>({
    corto: T('El artículo de Calpan no hace prospectiva: este bloque es una herramienta de Ratio Telar para mirar el futuro de cualquier unidad a partir de su propio Stack.','The Calpan paper does no foresight: this block is a Ratio Telar tool to look at any farm’s future from its own Stack.'),
    hecho: _li([T('Con el maíz de Calpan, el cambio de rendimiento por °C es el publicado para maíz (−7.4 %; Zhao et al., 2017) y la adopción parte de las actividades innovadas que captures.','For Calpan maize, the yield change per °C is the published maize value (−7.4 %; Zhao et al., 2017) and adoption starts from the innovated activities you enter.')+' '+marcaInterp()]),
    pasos: _ol([T('Captura antes tus actividades innovadas (Bloque 4) y, si puedes, ingreso y costo por hectárea (Bloque 8).','First enter your innovated activities (Block 4) and, if you can, income and cost per hectare (Block 8).'),T('Revisa los supuestos de cada escenario y ajústalos a tu región.','Review each scenario’s assumptions and adjust them to your region.'),T('Compara los tres futuros a 2, 5 y 10 años y anota qué decisiones de hoy acercan el deseable.','Compare the three futures at 2, 5 and 10 years and note which decisions today bring the desirable one closer.')])}),
  informe: ()=>({
    corto: T('El caso de Calpan se presenta como informe con calendario, red, sostenibilidad y fuentes; tu cultivo genera el mismo informe con tus datos.','The Calpan case is presented as a report with calendar, network, sustainability and sources; your crop produces the same report with your data.'),
    hecho: _li([
      T('Fuente del caso: ','Case source: ')+esc(ART.cita)+` <a href="https://doi.org/${ART.doi}" target="_blank" rel="noopener">doi:${ART.doi}</a>`
    ]),
    pasos: _ol([
      T('Revisa que cada bloque tenga sus datos; lo que falte aparece como «sin dato».','Check every block has its data; anything missing shows as “no data”.'),
      T('Imprime o guarda en PDF, y exporta en JSON o CSV para compartirlo sin conexión.','Print or save as PDF, and export JSON or CSV to share offline.')
    ])})
};
/* Botón discreto en cada bloque: el ejemplo NUNCA se mezcla con los campos del usuario; se abre en una ventana aparte */
function ejemploCalpan(id){
  if(EJ || !EJEMPLO[id]) return '';
  return `<div class="ejemplo-calpan aparece no-print"><span class="ej-ico">${ill('c-maiz')}</span><div class="ej-txt">
    <div class="ej-k">${T('¿No sabes cómo llenarlo? Mira un caso publicado','Not sure how to fill it in? See a published case')}</div>
    <p class="nota" style="margin:2px 0 6px">${T('Maíz criollo de Calpan, Puebla (Díaz-José et al., 2026). Se abre en una ventana aparte y no cambia tus datos.','Landrace maize in Calpan, Puebla (Díaz-José et al., 2026). It opens in a separate window and does not change your data.')}</p>
    <button class="btn ghost sm" data-ejemplo="${id}">${T('Ver el ejemplo publicado','See the published example')} →</button></div></div>`; }
function abrirEjemplo(id){ const e=EJEMPLO[id](); let d=$('#dlgEjemplo');
  if(!d){ d=document.createElement('dialog'); d.id='dlgEjemplo'; d.className='dlg-ejemplo'; document.body.appendChild(d); d.addEventListener('click',ev=>{ if(ev.target===d) d.close(); }); }
  d.innerHTML=`<div class="marca-agua" aria-hidden="true">${T('EJEMPLO · NO SON TUS DATOS','EXAMPLE · NOT YOUR DATA')}</div>
   <div class="dh"><h2>${ill('c-maiz','','width:30px;height:36px;vertical-align:middle;margin-right:6px')}${T('Ejemplo publicado: maíz criollo, Calpan, Puebla','Published example: landrace maize, Calpan, Puebla')} · ${esc(tx(B(id).corto))}</h2><button class="ibtn round" onclick="this.closest('dialog').close()" aria-label="×">✕</button></div>
   <div class="db ej-dlg"><p class="ej-aviso">${T('Esto es solo de consulta: son los datos de otra localidad. Al cerrar esta ventana, tus campos siguen exactamente como los dejaste.','This is for reference only: these are another locality’s data. When you close this window your fields stay exactly as you left them.')}</p>
   <h3>${T('Lo que se registró en Calpan','What was recorded in Calpan')} ${marcaDato()}</h3>${e.hecho}
   <h3>${T('Cómo llenarlo con tus propios datos','How to fill it in with your own data')}</h3>${e.pasos}
   ${fuenteArt()}
   <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn" onclick="this.closest('dialog').close()">${T('Cerrar y volver a mis datos','Close and return to my data')}</button><button class="btn ghost" data-entrar-ej>${T('Explorar el ejemplo completo en la app','Explore the full example in the app')}</button></div></div>`;
  d.showModal(); }
document.addEventListener('click',ev=>{ const t=ev.target.closest('[data-ejemplo]'); if(t) abrirEjemplo(t.dataset.ejemplo); });
function ponerEjemplo(id, el){ const h=ejemploCalpan(id); if(!h) return; const cab=$('.bhead',el); if(cab) cab.insertAdjacentHTML('afterend',h); else el.insertAdjacentHTML('afterbegin',h); }
