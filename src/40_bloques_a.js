"use strict";
/* =====================================================================
   6. BLOQUES · base, Inicio, 1 Cultivo, 2 Región, 3 Requerimientos
   ===================================================================== */
const BLOQUES = [
  {id:'inicio',      n:'⌂', ill:null,       corto:E('Inicio','Home'),                 titulo:E('Inicio','Home'), render:()=>renderInicio},
  {id:'cultivo',     n:'1', ill:'cult',     corto:E('Cultivo','Crop'),                titulo:E('Cultivo o especie y sistema','Crop or species and system'), render:()=>renderCultivo},
  {id:'region',      n:'2', ill:'i-mapa',   corto:E('Región','Region'),               titulo:E('Región, municipio y localidad','Region, municipality and locality'), render:()=>renderRegion},
  {id:'requerimientos',n:'3',ill:'i-req',   corto:E('Requerimientos','Requirements'), titulo:E('Requerimientos técnicos tradicionales e innovados','Traditional and innovated technical requirements'), render:()=>renderReq},
  {id:'manejo',      n:'4', ill:'i-manejo', corto:E('Manejo','Management'),           titulo:E('Manejo: pasos y actividades','Management: steps and activities'), render:()=>renderManejo},
  {id:'elementos',   n:'5', ill:'i-red',    corto:E('Elementos','Elements'),          titulo:E('Elementos que interactúan en el sistema','Elements interacting in the system'), render:()=>renderElementos},
  {id:'precios',     n:'6', ill:'i-valor',  corto:E('Precio y valor','Price and value'),titulo:E('Precio y valor de los elementos','Price and value of the elements'), render:()=>renderPrecios},
  {id:'formulacion', n:'7', ill:'i-telar',  corto:E('Formulación','Formulation'),     titulo:E('Formulación del sistema complejo adaptativo','Complex adaptive system formulation'), render:()=>renderFormulacion},
  {id:'tablero',     n:'8', ill:'i-panel2', corto:E('Tablero','Dashboard'),           titulo:E('Tablero de resultados','Results dashboard'), render:()=>renderTablero},
  {id:'sostenible',  n:'9', ill:'i-tierra', corto:E('Sostenibilidad','Sustainability'),titulo:E('Sostenibilidad, ODS y huella','Sustainability, SDGs and footprint'), render:()=>renderSostenible},
  {id:'informe',     n:'10',ill:'i-report', corto:E('Informe','Report'),             titulo:E('Informe general y exportación','General report and export'), render:()=>renderInforme},
  {id:'validacion',  n:'✓', ill:'i-check',  corto:E('Validación','Validation'),       titulo:E('Validación','Validation'), render:()=>renderValidacion},
  {id:'teoria',      n:'§', ill:'i-book',   corto:E('Teoría','Theory'),               titulo:E('Marco teórico','Theoretical framework'), render:()=>renderTeoria}
];
const NUMERADOS = BLOQUES.filter(b=>/^\d+$/.test(b.n)).length;
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const esc = t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fmt(v,d=2){ if(v==null||v===''||isNaN(v)) return '—'; return Number(Math.abs(v)<1e-12?0:v).toLocaleString(LOC(),{minimumFractionDigits:d,maximumFractionDigits:d}); }
const B = id=>BLOQUES.find(b=>b.id===id);
const ill = (id, cls='', style='') => `<svg class="ico ${cls}" style="${style}" aria-hidden="true"><use href="#${id}" width="100%" height="100%"/></svg>`;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('on'),2400); }
const marcaDato = ()=>`<span class="dato">● ${T('Dato publicado','Published data')}</span>`;
const marcaInterp = (t)=>`<span class="interp" title="${esc(t||'')}">◆ ${T('Lectura de Ratio Telar','Ratio Telar reading')}</span>`;
const fuenteArt = ()=>`<div class="fuente">${T('Fuente','Source')}: Díaz-José et al. (2026), <a href="https://doi.org/${ART.doi}" target="_blank" rel="noopener">doi:${ART.doi}</a></div>`;
const fuenteTesis = ()=>`<div class="fuente">${T('Fuente','Source')}: Mojica Zárate (2017), ${T('tesis doctoral, UCLV','doctoral thesis, UCLV')}.</div>`;
const fuenteInegi = ()=>`<div class="fuente">${T('Fuente','Source')}: INEGI, ${T('Catálogo Único de Claves Geoestadísticas; Censo de Población y Vivienda 2020','Geostatistical catalogue; 2020 Population and Housing Census')}.</div>`;
function cabecera(id, lead){ const b=B(id);
  const et = /^\d+$/.test(b.n) ? T(`Bloque ${b.n} de ${NUMERADOS}`,`Block ${b.n} of ${NUMERADOS}`) : (id==='validacion'?T('Evaluación de la plataforma','Platform evaluation'):T('Fundamentos','Foundations'));
  const ic = b.ill==='cult' ? cultivoSel().ico : b.ill;
  return `<div class="bhead"><div><div class="eyebrow">${et}</div><h1>${esc(tx(b.titulo))}</h1>${lead?`<p class="lead">${lead}</p>`:''}</div>${ic?`<div class="bill" style="--anim:running">${ill(ic)}</div>`:''}</div>`; }
function siguiente(id){ const i=BLOQUES.findIndex(b=>b.id===id), p=BLOQUES[i-1], n=BLOQUES[i+1];
  return `<div class="next no-print">${p?`<button class="btn ghost" data-ir="${p.id}">← ${esc(tx(p.corto))}</button>`:'<span></span>'}
    ${n?`<button class="btn big-next" data-ir="${n.id}"><small>${T('Siguiente','Next')}</small><span>${/^\d+$/.test(n.n)?n.n+' · ':''}${esc(tx(n.titulo))} →</span></button>`:''}</div>`; }
function consejo(prod, cien){ return `<div class="consejo prod">${ill('i-prod')}<p><span class="k">${T('Consejo','Tip')}</span>${prod}</p></div>${cien?`<div class="consejo sci">${ill('i-cien')}<p><span class="k">${T('Para el científico','For the scientist')}</span>${cien}</p></div>`:''}`; }
function descargar(nombre, texto, tipo){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([texto],{type:tipo})); a.download=nombre; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},500); }
const csv = filas => '﻿'+filas.map(f=>f.map(c=>{ const s=String(c??''); return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }).join(',')).join('\n');
const slug = ()=> (S.proyecto.nombre||'ratio_telar').replace(/[^\w\-]+/g,'_');
const locSel = ()=> (TERR.localidades[S.edo+S.mun]||[]).find(l=>l[0]===S.loc) || (TERR.localidades[S.edo+S.mun]||[])[0];
const munSel = ()=> (TERR.municipios[S.edo]||[]).find(m=>m[0]===S.mun);
const esCalpan = ()=> S.edo==='21' && S.mun==='026';

/* ================= INICIO ================= */
function telarVivo(){ const cols=['#9a6a3a','#d9a441','#5f8f3e','#2f7d8a','#7a4f9a']; let s=`<svg class="telar-vivo" viewBox="0 0 520 420" aria-hidden="true">`;
  cols.forEach((c,i)=>{ const x=70+i*95; s+=`<path class="hilo" d="M${x} 30 V390" stroke="${c}" stroke-width="9" stroke-linecap="round" style="--l:360;stroke-dasharray:360;animation-delay:${i*.15}s"/>`; });
  [110,200,290].forEach((y,j)=>{ let d=`M30 ${y}`; for(let i=0;i<5;i++){ const x=70+i*95; d+=` Q ${x-47} ${y+((i+j)%2?22:-22)} ${x} ${y}`; } d+=` Q 515 ${y+20} 500 ${y}`;
    s+=`<path class="hilo" d="${d}" stroke="var(--text)" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7" style="--l:620;stroke-dasharray:620;animation-delay:${.8+j*.4}s"/>`; });
  s+=`<g class="lanzadera"><rect x="30" y="${330}" width="70" height="22" rx="11" fill="var(--accent)"/><circle cx="65" cy="341" r="5" fill="#fff"/></g></svg>`; return s; }
function renderInicio(el){
  const nl=Object.values(TERR.localidades).reduce((s,l)=>s+l.length,0), nm=Object.values(TERR.municipios).reduce((s,l)=>s+l.length,0);
  const pasos=[['cultivo',T('Cultivo o especie','Crop or species'),T(`Elige entre ${CATALOGO.filter(c=>c.tipo==='cultivo').length} cultivos (la uva primero), ${CATALOGO.filter(c=>c.tipo==='especie'&&!c.especial).length} especies y la granja de traspatio; y el sistema: viñedo, milpa, MIAF, traspatio…`,`Choose among ${CATALOGO.filter(c=>c.tipo==='cultivo').length} crops (grape first), ${CATALOGO.filter(c=>c.tipo==='especie'&&!c.especial).length} species and the backyard farm; and the system: vineyard, milpa, MIAF, backyard…`)],
    ['region',T('Región','Region'),T(`Del país a la localidad: ${fmt(nm,0)} municipios y ${fmt(nl,0)} localidades del INEGI, con altitud y ubicación en el mapa.`,`From country to locality: ${fmt(nm,0)} municipalities and ${fmt(nl,0)} INEGI localities with altitude and map position.`)],
    ['requerimientos',T('Requerimientos','Requirements'),T('Las 5B del saber local y los requerimientos que la localidad ha innovado.','The 5B of local knowledge and the requirements the locality has innovated.')],
    ['manejo',T('Manejo','Management'),T('38 pasos y sus actividades tradicionales; agrega las innovadoras de tu localidad.','38 steps and their traditional activities; add your locality’s innovations.')],
    ['elementos',T('Elementos','Elements'),T('Actores, instituciones, insumos, equipo, recursos naturales y financieros, conocimientos, políticas, perturbaciones y productos.','Actors, institutions, inputs, equipment, natural and financial resources, knowledge, policies, disturbances and products.')],
    ['precios',T('Precio y valor','Price and value'),T('El precio lo pone el mercado; el valor, el sistema: económico, de uso, cultural y ecológico.','Price is set by the market; value by the system: economic, use, cultural and ecological.')],
    ['formulacion',T('Formulación','Formulation'),T('Teje el modelo: agentes, interacciones, retroalimentaciones y propiedades emergentes.','Weave the model: agents, interactions, feedbacks and emergent properties.')],
    ['tablero',T('Tablero','Dashboard'),T('Red ponderada, nodos clave, comunidades, correlaciones y estadísticas.','Weighted network, key nodes, communities, correlations and statistics.')],
    ['sostenible',T('Sostenibilidad','Sustainability'),T('Lo que cada actividad suma o resta al suelo, el agua, la atmósfera, la vegetación y la fauna; los 17 ODS y la huella de carbono.','What each activity adds or subtracts for soil, water, air, vegetation and fauna; the 17 SDGs and the carbon footprint.')],
    ['informe',T('Informe','Report'),T('Resumen redactado, tablas, CSV, PDF y el proyecto completo.','Written summary, tables, CSV, PDF and the full project.')]];
  el.innerHTML = `<section class="hero">
    <div><div class="eyebrow">Ratio Complexus · ${T('lo que está tejido junto','what is woven together')}</div>
      <h1>${T('Ratio <em>Telar</em>: el saber local como <span class="acc">sistema vivo</span>','Ratio <em>Telar</em>: local knowledge as a <span class="acc">living system</span>')}</h1>
      <p class="big">${T('Una milpa, una parcela o una unidad pecuaria es un <b>sistema complejo adaptativo</b>: personas, semillas, suelo, agua, saberes, instituciones y mercados que interactúan, aprenden y se transforman. Ratio Telar lo <b>teje bloque a bloque</b> con datos de tu localidad y te muestra quién sostiene el sistema, cuánto vale cada hilo y qué tan sostenible es cada paso.','A milpa, a plot or a livestock farm is a <b>complex adaptive system</b>: people, seeds, soil, water, knowledge, institutions and markets that interact, learn and change. Ratio Telar <b>weaves it block by block</b> with your locality’s data and shows who holds the system together, what each thread is worth and how sustainable each step is.')}</p>
      <div class="ctas"><button class="btn lg" data-ir="cultivo">${T('Empezar a tejer →','Start weaving →')}</button>
        <button class="btn ghost lg" data-ir="tablero">${T('Ver el ejemplo del maíz de Calpan','See the Calpan maize example')}</button>
        <button class="btn link" data-ir="teoria">${T('Leer la teoría','Read the theory')}</button></div>
      <div class="chips"><span class="chip">${T('Todo el cálculo ocurre en tu navegador','All calculations run in your browser')}</span><span class="chip">${T('Sin cookies ni recursos de terceros','No cookies or third-party resources')}</span><span class="chip">${T('Español e inglés','Spanish and English')}</span><span class="chip">${T('Libre (MIT)','Free (MIT)')}</span></div></div>
    <div class="art" aria-hidden="true" style="--anim:running"><div class="stage"></div>${telarVivo()}
      <svg class="big float" style="left:2%;top:2%;width:22%;height:30%"><use href="#c-maiz"/></svg>
      <svg class="big float d2" style="right:0;top:6%;width:20%;height:26%"><use href="#c-frijol"/></svg>
      <svg class="big float d3" style="right:4%;bottom:4%;width:24%;height:26%"><use href="#c-calabaza"/></svg>
      <svg class="big float d2" style="left:0;bottom:8%;width:24%;height:22%"><use href="#a-abeja"/></svg>
      <div class="chip-n" style="left:30%;top:0">${T('Paso de mayor intensidad','Most knowledge-intensive step')}<b>${T('Siembra · IIC 100','Sowing · IIC 100')}</b></div>
      <div class="chip-n" style="right:18%;bottom:0">${T('Nodo articulador','Weaving node')}<b>${T('Academia local','Local academia')}</b></div></div></section>
  <div class="stats">
    <div class="stat"><div class="v">${CATALOGO.length}</div><div class="l">${T('cultivos y especies en el catálogo','crops and species in the catalogue')}</div></div>
    <div class="stat"><div class="v">${fmt(nl,0)}</div><div class="l">${T('localidades de México','Mexican localities')}</div></div>
    <div class="stat"><div class="v">38 · 83</div><div class="l">${T('pasos y actividades del maíz criollo','landrace-maize steps and activities')}</div></div>
    <div class="stat"><div class="v">${ELEM.length}</div><div class="l">${T('elementos del sistema en 10 categorías','system elements in 10 categories')}</div></div>
    <div class="stat"><div class="v">17</div><div class="l">${T('ODS evaluados','SDGs assessed')}</div></div></div>
  <h2 class="section-t">${T('Una herramienta, dos miradas','One tool, two views')}</h2>
  <div class="vistas"><div class="vista ${MODO==='prod'?'on':''}"><h3>${ill('i-prod')}${T('Vista productor','Producer view')}</h3><ul><li>${T('Tu cultivo, tu localidad y tus pasos, en lenguaje sencillo','Your crop, locality and steps in plain language')}</li><li>${T('Qué actividades suman y cuáles restan','Which activities add and which subtract')}</li><li>${T('Cuánto vale cada recurso para tu sistema','What each resource is worth to your system')}</li></ul>${MODO==='prod'?'':`<button class="btn sm" data-vista="prod">${T('Usar vista productor','Use producer view')}</button>`}</div>
    <div class="vista ${MODO==='cien'?'on':''}"><h3>${ill('i-cien')}${T('Vista científica','Scientist view')}</h3><ul><li>${T('Estadística de redes: centralidades, modularidad, mundo pequeño','Network statistics: centralities, modularity, small world')}</li><li>${T('Correlaciones φ, matrices y fórmulas','φ correlations, matrices and formulas')}</li><li>${T('Validación externa del motor y referencias','External engine validation and references')}</li></ul>${MODO==='cien'?'':`<button class="btn sm" data-vista="cien">${T('Usar vista científica','Use scientist view')}</button>`}</div></div>
  <h2 class="section-t">${T('Diez bloques para tejer el sistema','Ten blocks to weave the system')}</h2>
  <div class="inc">${pasos.map((p,i)=>`<button data-ir="${p[0]}"><span class="num">${i+1}</span><h3>${p[1]}</h3><p>${p[2]}</p></button>`).join('')}</div>
  <div class="card"><h2>${T('Rigor: dato publicado o lectura','Rigour: published data or reading')}</h2>
   <p>${marcaDato()} ${T('Cifras tomadas de una fuente citada (artículo, tesis, INEGI, IPCC).','Figures from a cited source (paper, thesis, INEGI, IPCC).')}</p>
   <p>${marcaInterp()} ${T('Relaciones y perfiles que propone Ratio Telar para leer los datos; todos son editables.','Links and profiles proposed by Ratio Telar to read the data; all are editable.')}</p>
   <p class="nota">${T('Lo que no está documentado aparece como «sin dato». Ratio Telar no inventa valores.','What is undocumented appears as “no data”. Ratio Telar does not invent values.')}</p></div>
  ${siguiente('inicio')}`; }

/* ================= BLOQUE 1 · CULTIVO ================= */
function renderCultivo(el){ const tipo=renderCultivo.tipo||cultivoSel().tipo; const c=cultivoSel();
  el.innerHTML = `${cabecera('cultivo',T('Todo sistema se teje alrededor de algo que se siembra o se cría. Elige el cultivo o la especie doméstica y la forma en que se produce. El maíz criollo tiene su Stack de conocimiento local documentado en Calpan, Puebla; los demás están listos para que documentes el tuyo.','Every system is woven around something sown or raised. Choose the crop or livestock species and how it is produced. Landrace maize has its local-knowledge Stack documented in Calpan, Puebla; the others are ready for you to document yours.'))}
  ${consejo(T('Si es tu primera vez, deja el maíz criollo: verás el sistema completo de Calpan y luego podrás adaptarlo a tu parcela.','If this is your first time, keep landrace maize: you will see the full Calpan system and can then adapt it to your plot.'),T('El catálogo separa lo documentado (Stack publicado) de lo que está por documentar; en estos últimos el manejo se captura desde cero.','The catalogue separates documented (published Stack) from to-be-documented; for the latter, management is entered from scratch.'))}
  <div class="card"><div class="row between"><h3 style="margin:0">${T('Catálogo','Catalogue')}${ayuda('cultivo')}</h3>
    <div class="tipo-tabs"><button data-tipo="cultivo" class="${tipo==='cultivo'?'on':''}">${T('Cultivos','Crops')}</button><button data-tipo="especie" class="${tipo==='especie'?'on':''}">${T('Especies animales','Livestock species')}</button></div></div>
    <div class="cat-grid">${CATALOGO.filter(x=>x.tipo===tipo).map((x,i)=>`<div class="cat-card aparece ${x.id===S.cultivo?'sel':''}" data-cult="${x.id}" style="--cc:${x.col};animation-delay:${i*40}ms" tabindex="0" role="button">
      <span class="est ${x.doc==='stack'?'doc':''}">${x.doc==='stack'?T('Stack documentado','Documented Stack'):T('Por documentar','To document')}</span>
      <svg viewBox="${x.ico==='i-steer'?'0 0 170 120':x.ico.startsWith('a-')||x.ico==='i-chicken'?'0 0 120 100':'0 0 100 120'}"><use href="#${x.ico}"/></svg><b>${esc(tx(x.n))}</b><i>${esc(tx(x.sci))}</i></div>`).join('')}</div></div>
  ${S.cultivo==='maiz'?`<div class="card aparece" style="border-top:4px solid #d9a441"><div class="row between"><h3 style="margin:0">${ill('c-maiz','','width:34px;height:40px;vertical-align:middle;margin-right:6px')}${T('Tipo de maíz','Maize type')}</h3>
     <div class="tipo-tabs" style="margin:0"><button data-mtipo="nativo" class="${S.maizTipo==='nativo'?'on':''}">${T('Nativo o criollo (raza)','Native landrace (race)')}</button><button data-mtipo="mejorado" class="${S.maizTipo==='mejorado'?'on':''}">${T('Mejorado o híbrido','Improved or hybrid')}</button></div></div>
    ${S.maizTipo==='nativo'?`<p class="nota">${T('Las 64 razas de maíz reportadas para México, en sus siete grupos raciales. 59 son nativas; las marcadas con ° se describieron primero en el Caribe o Guatemala y también se han colectado en México.','The 64 maize races reported for Mexico in their seven racial groups. 59 are native; those marked ° were first described in the Caribbean or Guatemala and have also been collected in Mexico.')}</p>
     <label class="f"><span>${T('Raza','Race')}</span><select id="mRaza"><option value="">${T('— Sin especificar —','— Not specified —')}</option>${RAZAS_MAIZ.map(g=>`<optgroup label="${esc(T('Grupo','Group')+' '+tx(g.g))}">${g.r.map(r=>`<option value="${esc(r)}" ${S.maizRaza===r?'selected':''}>${esc(r)}${RAZAS_EXT.includes(r)?' °':''}</option>`).join('')}</optgroup>`).join('')}</select></label>
     <div class="razas">${RAZAS_MAIZ.map(g=>`<div><b>${esc(tx(g.g))}</b> <span class="muted">(${g.r.length})</span><div class="elchips">${g.r.map(r=>`<button type="button" class="elchip ${S.maizRaza===r?'on':''}" style="--ec:#c98b21" data-raza="${esc(r)}">${esc(r)}${RAZAS_EXT.includes(r)?' °':''}</button>`).join('')}</div></div>`).join('')}</div>
     <div class="fuente">${T('Fuente','Source')}: CONABIO (2020), ${T('Razas de maíz de México; clasificación de Sánchez et al. (2000)','Maize races of Mexico; classification by Sánchez et al. (2000)')}. ${T('El artículo de Calpan trata maíces criollos sin especificar raza; en Puebla se reportan cerca de 22.','The Calpan paper covers landraces without specifying race; about 22 are reported in Puebla.')}</div>`
    :`<label class="f"><span>${T('Nombre de la variedad o del híbrido','Variety or hybrid name')}</span><input id="mVar" value="${esc(S.maizVar)}" placeholder="${T('escríbelo tal como lo compras o lo nombra la institución','as you buy it or as the institution names it')}"></label>`}</div>`:''}
  ${S.cultivo==='bovino'?(()=>{ const P=BOV.find(x=>x.id===S.bovProp)||BOV[0], s=bovSisSel(); return `<div class="card aparece" style="border-top:4px solid ${P.col}"><div class="row between"><h3 style="margin:0">${ill('i-steer','','width:52px;height:38px;vertical-align:middle;margin-right:6px')}${T('Tipo de ganado bovino','Cattle type')}</h3>
     <div class="tipo-tabs" style="margin:0">${BOV.map(p=>`<button data-bprop="${p.id}" class="${p.id===P.id?'on':''}">${esc(tx(p.n))}</button>`).join('')}</div></div>
    <p class="nota">${T('Elige el propósito y el sistema de producción; cada sistema indica si es extensivo, semiintensivo, intensivo o de traspatio, y ajusta el sistema y el tipo de unidad de abajo.','Choose the purpose and production system; each states whether it is extensive, semi-intensive, intensive or backyard, and sets the system and unit type below.')}</p>
    <div class="opts">${P.sis.map(x=>`<label class="opt ${x.id===s.id?'sel':''}"><input type="radio" name="bsis" value="${x.id}" ${x.id===s.id?'checked':''}><b>${esc(tx(x.n))}</b><small><span class="badge ${x.reg==='int'?'warn':x.reg==='tras'?'info':'ok'}">${esc(tx(REGIMEN[x.reg]))}</span> ${esc(tx(x.d))}</small></label>`).join('')}</div>
    <label class="f" style="margin-top:12px"><span>${T('Raza o cruza','Breed or cross')}</span><input id="bRaza" list="bRazas" value="${esc(S.bovRaza)}" placeholder="${T('elige abajo o escribe la tuya','pick below or type your own')}"><datalist id="bRazas">${s.r.flatMap(g=>g[1]).map(r=>`<option value="${esc(r)}">`).join('')}</datalist></label>
    <div class="razas">${s.r.map(g=>`<div><b>${esc(tx(g[0]))}</b> <span class="muted">(${g[1].length})</span><div class="elchips">${g[1].map(r=>`<button type="button" class="elchip ${S.bovRaza===r?'on':''}" style="--ec:${P.col}" data-braza="${esc(r)}">${esc(r)}</button>`).join('')}</div></div>`).join('')}</div>
    <div class="fuente">${T('Tipología usual de la ganadería bovina en México y lista orientativa de razas que se crían en el país: «Lectura de Ratio Telar»; verifícalas con la asociación de criadores de tu región.','Usual typology of Mexican cattle farming and an indicative list of breeds raised in the country: «Ratio Telar reading»; check them with your regional breeders’ association.')}</div></div>`; })():''}
  ${S.cultivo==='abeja'?`<div class="card aparece" style="border-top:4px solid #f4c242"><div class="row" style="gap:14px;align-items:center">${ill('a-apiario','','width:120px;height:100px;flex:0 0 auto')}<div><h3 style="margin:0 0 4px">${T('Unidad de producción: apiario','Production unit: apiary')}</h3><p class="nota" style="margin:0">${T('El apiario es el conjunto de colmenas que maneja el apicultor en un sitio, fijo o trashumante (que se mueve siguiendo las floraciones). Al elegir la abeja, el sistema y el tipo de unidad quedan como apiario; puedes cambiarlos abajo.','The apiary is the set of hives a beekeeper manages at one site, fixed or migratory (moving with the blooms). Choosing the honeybee sets the system and unit type to apiary; you can change them below.')}</p></div></div></div>`:''}
  ${S.cultivo==='granja'?`<div class="card granja aparece"><h3>${ill('a-granja','','width:46px;height:38px;vertical-align:middle;margin-right:8px')}${T('Especies de tu granja de traspatio','Species in your backyard farm')}</h3><p class="nota">${T('Marca las especies que conviven en la granja; cada una aporta sus propios pasos de manejo, insumos y productos.','Tick the species living together on the farm; each brings its own management steps, inputs and products.')}</p>
    <div class="cat-grid mini">${CATALOGO.filter(x=>x.tipo==='especie'&&!x.especial).map(x=>`<div class="cat-card ${S.granja.includes(x.id)?'sel':''}" data-gesp="${x.id}" style="--cc:${x.col}" tabindex="0" role="button"><svg viewBox="${x.ico==='i-steer'?'0 0 170 120':'0 0 120 100'}"><use href="#${x.ico}"/></svg><b>${esc(tx(x.n))}</b></div>`).join('')}</div>
    <p><b>${S.granja.length}</b> ${T('especies seleccionadas','species selected')}${S.granja.length?': '+S.granja.map(id=>esc(tx(CATALOGO.find(c=>c.id===id).n))).join(', '):''}</p></div>`:''}
  <div class="grid g2"><div class="card"><h3>${T('Sistema de producción','Production system')}${ayuda('sistema')}</h3>
    <div class="opts">${SISTEMAS.map(s=>`<label class="opt ${S.sistema===s.id?'sel':''}"><input type="radio" name="sis" value="${s.id}" ${S.sistema===s.id?'checked':''}><b>${esc(tx(s.n))}</b><small>${s.doc?T('documentado en Calpan','documented in Calpan'):T('captura tu propia descripción','enter your own description')}</small></label>`).join('')}</div></div>
   <div class="card"><h3>${T('Unidad de producción','Production unit')}</h3>
    <label class="f"><span>${T('Tipo de unidad','Unit type')}</span><select id="tUP">${TIPOS_UP.map((t,i)=>`<option value="${i}" ${+S.tipoUP===i?'selected':''}>${esc(tx(t))}</option>`).join('')}</select></label>
    <label class="f"><span>${T('Superficie (ha)','Area (ha)')}${ayuda('superficie')}</span><input type="number" id="sup" min="0" step="0.1" value="${S.superficie}"></label>
    <label class="f"><span>${T('Nombre del proyecto o de la parcela','Project or plot name')}</span><input id="pNom" value="${esc(S.proyecto.nombre)}" placeholder="${T('p. ej., Parcela El Llano','e.g., El Llano plot')}"></label>
    <label class="f"><span>${T('Productor o productora','Farmer')}</span><input id="pProd" value="${esc(S.proyecto.productor)}"></label>
    <div class="kpis" style="margin-top:10px"><div class="kpi"><div class="l">${T('Seleccionado','Selected')}</div><div class="v" style="font-size:20px">${esc(tx(c.n))}</div><div class="s"><i>${esc(tx(c.sci))}</i></div></div>
    <div class="kpi"><div class="l">${T('Pasos de manejo','Management steps')}</div><div class="v">${c.doc==='stack'?38:Object.keys(S.manejo).length}</div><div class="s">${c.doc==='stack'?T('83 actividades publicadas','83 published activities'):T('captúralos en el Bloque 4','enter them in Block 4')}</div></div></div></div></div>
  ${siguiente('cultivo')}`;
  $$('[data-tipo]',el).forEach(b=>b.onclick=()=>{ renderCultivo.tipo=b.dataset.tipo; render(); });
  $$('[data-cult]',el).forEach(c=>c.onclick=()=>{ S.cultivo=c.dataset.cult; S.formulado=false; if(S.cultivo==='granja') S.sistema='traspatio'; if(S.cultivo==='uva'&&S.sistema==='milpa') S.sistema='vinedo'; if(S.cultivo==='abeja'){ S.sistema='apiario'; S.tipoUP=TIPOS_UP.length-1; } if(S.cultivo==='bovino'){ S.sistema=REG_SIS[bovSisSel().reg]; S.tipoUP=3; } guardar(); render(); toast(tx(cultivoSel().n)); });
  const bovAplica=()=>{ S.bovRaza=S.bovRaza||''; S.sistema=REG_SIS[bovSisSel().reg]; S.tipoUP=3; guardar(); render(); };
  $$('[data-bprop]',el).forEach(x=>x.onclick=()=>{ S.bovProp=x.dataset.bprop; S.bovSis=(BOV.find(p=>p.id===S.bovProp)||BOV[0]).sis[0].id; S.bovRaza=''; bovAplica(); });
  $$('input[name=bsis]',el).forEach(x=>x.onchange=()=>{ S.bovSis=x.value; S.bovRaza=''; bovAplica(); toast(tx(bovSisSel().n)); });
  $$('[data-braza]',el).forEach(x=>x.onclick=()=>{ S.bovRaza = S.bovRaza===x.dataset.braza ? '' : x.dataset.braza; guardar(); render(); });
  if($('#bRaza',el)) $('#bRaza',el).onchange=e=>{ S.bovRaza=e.target.value.trim(); guardar(); render(); };
  $$('[data-mtipo]',el).forEach(b=>b.onclick=()=>{ S.maizTipo=b.dataset.mtipo; guardar(); render(); });
  $$('[data-raza]',el).forEach(b=>b.onclick=()=>{ S.maizRaza = S.maizRaza===b.dataset.raza ? '' : b.dataset.raza; guardar(); render(); toast(S.maizRaza||T('Raza sin especificar','Race not specified')); });
  const mr=$('#mRaza',el); if(mr) mr.onchange=()=>{ S.maizRaza=mr.value; guardar(); render(); };
  const mv=$('#mVar',el); if(mv) mv.onchange=()=>{ S.maizVar=mv.value.trim(); guardar(); actualizarPill(); };
  $$('[data-gesp]',el).forEach(c=>c.onclick=()=>{ const id=c.dataset.gesp; S.granja = S.granja.includes(id) ? S.granja.filter(x=>x!==id) : S.granja.concat(id); guardar(); render(); });
  $$('input[name=sis]',el).forEach(r=>r.onchange=()=>{ S.sistema=r.value; guardar(); render(); });
  $('#tUP',el).onchange=e=>{ S.tipoUP=+e.target.value; guardar(); };
  $('#sup',el).onchange=e=>{ S.superficie=+e.target.value||0; guardar(); };
  $('#pNom',el).onchange=e=>{ S.proyecto.nombre=e.target.value; guardar(); actualizarPill(); };
  $('#pProd',el).onchange=e=>{ S.proyecto.productor=e.target.value; guardar(); }; }

/* ================= BLOQUE 2 · REGIÓN ================= */
function renderRegion(el){ const e=edoDe(S.edo), muns=TERR.municipios[S.edo]||[], m=munSel(), locs=TERR.localidades[S.edo+S.mun]||[], l=locSel();
  const pobE=muns.reduce((s,x)=>s+(x[2]||0),0);
  el.innerHTML = `${cabecera('region',T('Cada productor cultiva a su manera y cada lugar tiene su propio clima, altitud y gente. Elige tu estado en el mapa y baja hasta el municipio y la localidad: Ratio Telar ubica tu punto y trae los datos oficiales del INEGI.','Every farmer works their own way and every place has its own climate, altitude and people. Pick your state on the map and go down to municipality and locality: Ratio Telar places your point and loads official INEGI data.'))}
  <div class="card"><div class="mapa-wrap"><div>${mapaTelar(S.edo, l?[l[4],l[5]]:null)}
      <div class="chips" style="margin-top:8px">${Object.entries(REG_BX).map(([k,r])=>`<span class="chip rchip ${k===e[3]?'on':''}" style="--rc:${r.col}"><i></i>${esc(tx(r.n))}</span>`).join('')}</div>
      <p class="tiny muted">${T('Contornos: Natural Earth (dominio público). Regiones: Banco de México. El punto de la localidad usa sus coordenadas del INEGI (posición aproximada sobre contornos simplificados).','Outlines: Natural Earth (public domain). Regions: Banco de México. The locality dot uses its INEGI coordinates (approximate position on simplified outlines).')}</p></div>
    <div class="rinfo"><div class="eyebrow">${esc(tx(REG_BX[e[3]].n))}</div><h2 style="margin:4px 0 8px">${esc(e[1])}</h2>
      <label class="f"><span>${T('Estado','State')}</span><select id="zEst">${TERR.estados.map(x=>`<option value="${x[0]}" ${x[0]===S.edo?'selected':''}>${esc(x[1])}</option>`).join('')}</select></label>
      <label class="f"><span>${T('Municipio','Municipality')}</span><select id="zMun">${muns.map(x=>`<option value="${x[0]}" ${x[0]===S.mun?'selected':''}>${esc(x[1])}</option>`).join('')}</select></label>
      <label class="f"><span>${T('Localidad','Locality')}${ayuda('localidad')}</span><select id="zLoc">${locs.map(x=>`<option value="${x[0]}" ${x[0]===S.loc?'selected':''}>${esc(x[1])}${x[2]!=null?' · '+fmt(x[2],0)+' hab.':''}</option>`).join('')}</select></label>
      <div class="lugares"><span class="nota">${T('Lugares de trabajo','Work places')}:</span>${LUGARES.map((p,i)=>`<button class="chip ${S.edo===p.edo&&S.mun===p.mun&&S.loc===p.loc?'on':''}" data-lugar="${i}">📍 ${esc(tx(p.n))}</button>`).join('')}</div>
      <div class="ruta"><span>${T('México','Mexico')}</span><i>›</i><span>${esc(tx(REG_BX[e[3]].n))}</span><i>›</i><span>${esc(e[1])}</span><i>›</i><span>${esc(m?m[1]:'')}</span><i>›</i><span>${esc(l?l[1]:'')}</span></div></div></div></div>
  <div class="kpis">
   <div class="kpi"><div class="l">${T('Localidad: población 2020','Locality: population 2020')}</div><div class="v">${l&&l[2]!=null?fmt(l[2],0):'—'}</div><div class="s">${l?(l[6]?T('urbana','urban'):T('rural','rural')):''}</div></div>
   <div class="kpi"><div class="l">${T('Altitud','Altitude')}</div><div class="v">${l&&l[3]!=null?fmt(l[3],0)+' m':'—'}</div><div class="s">${l&&l[4]!=null?fmt(l[5],3)+'° N, '+fmt(-l[4],3)+'° O':''}</div></div>
   <div class="kpi"><div class="l">${T('Municipio: población 2020','Municipality: population 2020')}</div><div class="v">${m&&m[2]?fmt(m[2],0):'—'}</div><div class="s">${m&&m[3]?fmt(m[3],0)+' '+T('viviendas habitadas','inhabited dwellings'):''}</div></div>
   <div class="kpi"><div class="l">${T('Estado','State')}</div><div class="v">${fmt(e[4],0)}</div><div class="s">${muns.length} ${T('municipios','municipalities')} · ${fmt(pobE,0)} ${T('hab.','people')}</div></div></div>
  ${fuenteInegi()}
  ${esCalpan()?`<div class="card"><h3>${marcaDato()} ${T('Caso documentado: Calpan, Puebla','Documented case: Calpan, Puebla')}</h3><div class="grid g2"><ul>
     <li>${T('Coordenadas del municipio','Municipal coordinates')}: ${CALPAN.coord}</li>
     <li>${T('Colinda con','Borders')} ${[...CALPAN.limites.N,...CALPAN.limites.S,...CALPAN.limites.E,...CALPAN.limites.O].join(', ')}.</li>
     <li>${T('Población aproximada según el artículo: 16,000 (52 % mujeres); 72 % en la cabecera y 28 % en San Mateo Ozolco y San Lucas Atzala.','Approximate population per the paper: 16,000 (52 % women); 72 % in the seat and 28 % in San Mateo Ozolco and San Lucas Atzala.')}</li></ul>
    <ul><li>${T('PEA de 4,882 personas: 50 % sector primario, 15 % transformación, ~35 % comercio y servicios.','EAP of 4,882 people: 50 % primary, 15 % processing, ~35 % trade and services.')}</li>
     <li>${T('Milpa y MIAF; unidades menores a 5 ha; rendimiento de maíz de 5 a 6 t.','Milpa and MIAF; farms under 5 ha; maize yield of 5–6 t.')}</li>
     <li>${T('Frutales: tejocote, pera lechera, nuez de castilla, manzana panochera, durazno y capulín.','Fruit: tejocote, pear, walnut, apple, peach and capulin cherry.')}</li></ul></div>${fuenteArt()}</div>`
   :`<div class="alert info"><p><b>${T('Sin caso documentado en este municipio.','No documented case in this municipality.')}</b> ${T('El catálogo oficial está listo; documenta tu sistema en los bloques siguientes o revisa el ejemplo de Calpan.','The official catalogue is ready; document your system in the next blocks or review the Calpan example.')}</p><button class="btn sm ghost" id="aCalpan">${T('Ir a Calpan, Puebla','Go to Calpan, Puebla')}</button></div>`}
  ${siguiente('region')}`;
  const ponEdo=(c)=>{ S.edo=c; S.mun=TERR.municipios[c][0][0]; S.loc=(TERR.localidades[S.edo+S.mun]||[[null]])[0][0]; guardar(); render(); };
  $$('[data-edo]',el).forEach(p=>p.onclick=()=>ponEdo(p.dataset.edo));
  $('#zEst',el).onchange=ev=>ponEdo(ev.target.value);
  $('#zMun',el).onchange=ev=>{ S.mun=ev.target.value; S.loc=(TERR.localidades[S.edo+S.mun]||[[null]])[0][0]; guardar(); render(); };
  $('#zLoc',el).onchange=ev=>{ S.loc=ev.target.value; guardar(); render(); };
  $$('[data-lugar]',el).forEach(b=>b.onclick=()=>{ const p=LUGARES[+b.dataset.lugar]; S.edo=p.edo; S.mun=p.mun; S.loc=p.loc; guardar(); render(); toast(tx(p.n)); });
  const ac=$('#aCalpan',el); if(ac) ac.onclick=()=>{ S.edo='21'; S.mun='026'; S.loc='0001'; guardar(); render(); }; }

/* ================= BLOQUE 3 · REQUERIMIENTOS ================= */
const REQ_TRAD = [
  {b:'tierra', t:E('Terreno preparado en tiempo y forma, con la humedad captada y conservada','Land prepared on time, with moisture captured and conserved'), pasos:[1,2,3,4,5,32]},
  {b:'semilla', t:E('Semilla criolla seleccionada, tratada y conservada, adaptada a periodos largos sin agua','Selected, treated and stored landrace seed adapted to long dry spells'), pasos:[6,7,8,35]},
  {b:'siembra', t:E('Siembra con densidad y arreglo topológico según la morfología del criollo y el propósito (grano o doble propósito), en la fecha que marcan el clima y la luna','Sowing with density and layout matched to landrace morphology and purpose (grain or dual), on the date set by weather and moon'), pasos:[9,10,11,12,17,18]},
  {b:'alimentacion', t:E('Nutrición granular y foliar en los momentos clave, guiada por el análisis de suelo','Granular and foliar nutrition at key moments, guided by soil analysis'), pasos:[13,14,15,16,23,29]},
  {b:'vigilancia', t:E('Vigilancia periódica de germinación, nutrición, plagas, enfermedades, malezas y humedad','Periodic monitoring of germination, nutrition, pests, diseases, weeds and moisture'), pasos:[19,20,21,22,24,25,26,27,28,30]},
  {b:'cosecha', t:E('Cosecha, poscosecha, selección de semilla y balance económico del ciclo','Harvest, post-harvest, seed selection and economic balance of the cycle'), pasos:[31,33,34,36,37,38]}
];
function renderReq(el){ S.reqEst=S.reqEst||{};
  el.innerHTML = `${cabecera('requerimientos',T('Lo que el saber local exige para que el cultivo prospere. Los requerimientos tradicionales salen de las cinco reglas básicas (las 5B) del Stack; abajo puedes registrar los que tu localidad ha innovado.','What local knowledge demands for the crop to thrive. Traditional requirements come from the Stack’s five basic rules (the 5B); below you can record those your locality has innovated.'))}
  ${conStack()?`<div class="card"><div class="row between"><h3 style="margin:0">${T('Requerimientos técnicos tradicionales','Traditional technical requirements')}${ayuda('req')}</h3>${marcaDato()}</div>
   <p class="nota">${T('Evalúa si tu parcela cumple cada requerimiento. Los números son los pasos del Stack que lo atienden.','Rate whether your plot meets each requirement. Numbers are the Stack steps addressing it.')}</p>
   <div class="reqs">${REQ_TRAD.map((r,i)=>{ const b=B5.find(x=>x.id===r.b), v=S.reqEst[i]||'';
     return `<div class="req aparece" style="--rc:${b.col};animation-delay:${i*60}ms"><div class="rb">${i<5?'B'+(i+1):'+'}</div><div><h4>${esc(tx(b))}${b.interp?' '+marcaInterp():''}</h4><div>${esc(tx(r.t))}</div><div class="nota">${esc(T(b.d[0],b.d[1]))}</div><div class="pasosr">${r.pasos.map(n=>`<span title="${esc(tx(E(PASOS[n-1].es,PASOS[n-1].en)))}">${n}</span>`).join('')}</div></div>
       <div class="semaf" role="group">${[['ok',T('Sí','Yes')],['warn',T('Parcial','Partly')],['bad',T('No','No')]].map(([k,t])=>`<button class="${k} ${v===k?'on':''}" data-req="${i}" data-v="${k}">${t}</button>`).join('')}</div></div>`; }).join('')}</div>${fuenteArt()}</div>`
   :`<div class="alert info"><p>${T('Este cultivo o especie aún no tiene un Stack documentado. Registra sus requerimientos abajo; el ejemplo del maíz criollo muestra cómo se organizan en cinco reglas.','This crop or species has no documented Stack yet. Record its requirements below; the landrace-maize example shows how they are organised in five rules.')}</p></div>`}
  <div class="card"><h3>${T('Requerimientos innovados en la localidad','Requirements innovated in the locality')}${ayuda('reqInn')}</h3>
   ${S.reqInn.length?`<div class="tbl-c"><table class="tbl"><thead><tr><th>${T('Requerimiento','Requirement')}</th><th>${T('Regla','Rule')}</th><th>${T('Fuente','Source')}</th><th></th></tr></thead><tbody>${S.reqInn.map((r,i)=>`<tr><td>${esc(r.t)}${r.d?`<div class="nota">${esc(r.d)}</div>`:''}</td><td>${esc(tx(B5.find(b=>b.id===r.b)||{es:'—'}))}</td><td>${esc(r.fuente||'—')}</td><td><button class="btn sm ghost" data-qreq="${i}">×</button></td></tr>`).join('')}</tbody></table></div>`:`<p class="sindato">${T('Aún no hay requerimientos innovados registrados.','No innovated requirements recorded yet.')}</p>`}
   <div class="nueva"><div class="grid g2"><label class="f"><span>${T('Requerimiento innovado','Innovated requirement')}</span><input id="rT" placeholder="${T('p. ej., Cobertura con abono verde antes de la siembra','e.g., Green-manure cover before sowing')}"></label>
     <label class="f"><span>${T('Regla a la que pertenece','Rule it belongs to')}</span><select id="rB">${B5.map(b=>`<option value="${b.id}">${esc(tx(b))}</option>`).join('')}</select></label>
     <label class="f"><span>${T('Descripción o justificación','Description or rationale')}</span><input id="rD"></label>
     <label class="f"><span>${T('Fuente (productor, asesor, investigación, programa)','Source (farmer, adviser, research, programme)')}</span><input id="rF"></label></div>
     <button class="btn sm" id="rAdd">+ ${T('Agregar requerimiento','Add requirement')}</button></div></div>
  ${siguiente('requerimientos')}`;
  $$('[data-req]',el).forEach(b=>b.onclick=()=>{ S.reqEst[b.dataset.req]= S.reqEst[b.dataset.req]===b.dataset.v?'':b.dataset.v; guardar(); render(); });
  $('#rAdd',el).onclick=()=>{ const t=$('#rT',el).value.trim(); if(!t) return toast(T('Escribe el requerimiento','Write the requirement')); S.reqInn.push({t, b:$('#rB',el).value, d:$('#rD',el).value.trim(), fuente:$('#rF',el).value.trim()}); guardar(); render(); };
  $$('[data-qreq]',el).forEach(b=>b.onclick=()=>{ S.reqInn.splice(+b.dataset.qreq,1); guardar(); render(); }); }
