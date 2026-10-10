// =====================================================================
// 50_app.js — estado, navegación y secciones de Ratio Telar
// =====================================================================
const CLAVE = 'ratio-telar-v1';
const CONFIG = {version:'0.1.0', doi:null, repo:'https://github.com/hectortecumshe-ai/RatioTelar'};
const VARS_MICMAC = [
  ['Humedad del suelo','Soil moisture'],['Semilla criolla','Landrace seed'],['Densidad y arreglo de siembra','Sowing density and layout'],
  ['Nutrición del cultivo','Crop nutrition'],['Vigilancia (plagas, malezas)','Monitoring (pests, weeds)'],['Conocimiento tácito','Tacit knowledge'],
  ['Conocimiento explícito (I+D+i)','Explicit knowledge (R&D&I)'],['Academia local','Local academia'],['Asesoría técnica','Technical advice'],
  ['Fenómenos climáticos','Climate phenomena'],['Precio y mercado','Price and market'],['Rendimiento','Yield']];
const OBJ_EJ = [['Conservar la semilla criolla','Conserve landrace seed'],['Aumentar el rendimiento','Raise yield'],['Reducir costos de insumos','Cut input costs'],['Fortalecer la transmisión del saber local','Strengthen local knowledge transfer']];
const AHORRO_FILAS = [['Agua','Water','m³/ha'],['Fertilizante nitrogenado (N)','Nitrogen fertilizer (N)','kg/ha'],['Herbicida','Herbicide','L/ha'],['Insecticida','Insecticide','L/ha'],
  ['Diésel (maquinaria)','Diesel (machinery)','L/ha'],['Semilla comprada','Purchased seed','kg/ha'],['Jornales','Labour days','jornal/ha'],['Costo total','Total cost','$/ha']];

function estadoInicial(){ const n=VARS_MICMAC.length, a=ACTORES.length, o=OBJ_EJ.length;
  return {sec:'inicio', modo:'prod', reg:'C', est:'21', mun:'026', com:0, siembra:79, filtroB:null, dim:'social',
    prec:new Array(10).fill(''), vc:'', vrup:'',
    red:{nodos:ACTORES.map(x=>({id:x.id, nombre:x.es})), aristas:ACTORES.filter(x=>x.id!=='AL').map(x=>({a:'AL', b:x.id, w:1}))},
    mic:{M:Array.from({length:n},()=>new Array(n).fill(0)), ver:'indirecto'},
    mac:{obj:OBJ_EJ.map(o=>o[0]), MID:Array.from({length:a},()=>new Array(a).fill(0)), MAO:Array.from({length:a},()=>new Array(o).fill(0))},
    esc:{t0:new Date().getFullYear(), H:15, ind:[{n:'Rendimiento de maíz criollo (t/ha)', x0:5.5, xd:'', k:0.6, t0:5}]},
    espejo:[{n:'Humedad aprovechable', x:0, y:0}],
    aho:{ha:1, filas:AHORRO_FILAS.map(f=>({r:f[0], conv:'', local:''}))} }; }
let ST = estadoInicial();
try{ const g = JSON.parse(localStorage.getItem(CLAVE)||'null'); if(g && g.prec) ST = Object.assign(estadoInicial(), g); }catch(e){}
const guardar = ()=>{ try{ localStorage.setItem(CLAVE, JSON.stringify(ST)); }catch(e){} };

const SECS = [
  ['inicio','Inicio','Home'],['territorio','Territorio','Territory'],['stack','Stack','Stack'],['red','Red de actores','Actor network'],
  ['dimensiones','Dimensiones','Dimensions'],['gei','Gestión integrada','Integrated management'],['prospectiva','Prospectiva','Foresight'],
  ['ahorro','Ahorro de recursos','Resource savings'],['tablero','Tablero','Dashboard'],['ciencia','Ciencia','Science']];
const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fuenteArt = ()=>`<div class="fuente">${T('Fuente','Source')}: Díaz-José et al. (2026), <a href="https://doi.org/${ART.doi}" target="_blank" rel="noopener">doi:${ART.doi}</a></div>`;
const fuenteTesis = ()=>`<div class="fuente">${T('Fuente','Source')}: Mojica Zárate (2017), ${T('tesis doctoral, UCLV','doctoral thesis, UCLV')}.</div>`;
const fuenteInegi = ()=>`<div class="fuente">${T('Fuente','Source')}: INEGI, ${T('Catálogo Único de Claves Geoestadísticas; Censo de Población y Vivienda 2020','Geostatistical catalogue; 2020 Population and Housing Census')}.</div>`;
const marcaInterp = (t)=>`<span class="interp" title="${esc(t||'')}">◆ ${T('Lectura de Ratio Telar','Ratio Telar reading')}</span>`;
const marcaDato = ()=>`<span class="dato">● ${T('Dato publicado','Published data')}</span>`;

// ---------- barra y navegación ----------
function pintarBarra(){
  $('#nav').innerHTML = SECS.map((s,i)=>`<button data-sec="${s[0]}" class="${ST.sec===s[0]?'act':''}"><span class="n">${i}</span>${T(s[1],s[2])}</button>`).join('');
  $('#bModo').innerHTML = ST.modo==='prod' ? T('Vista: Productor','View: Producer') : T('Vista: Científico','View: Scientist');
  $('#bLang').textContent = LANG==='es' ? 'EN' : 'ES';
  document.documentElement.lang = LANG; document.documentElement.dataset.modo = ST.modo; }
function ir(sec){ ST.sec=sec; guardar(); $$('.sec').forEach(s=>s.classList.toggle('on', s.id==='s-'+sec)); pintarBarra(); pintar(sec); scrollTo({top:0,behavior:'smooth'}); }
const PINTA = {};
function pintar(sec){ const el=$('#s-'+sec); if(!el||!PINTA[sec]) return; el.innerHTML = PINTA[sec](); enlazarTips(el); if(PINTA[sec+'_ev']) PINTA[sec+'_ev'](el); }
function repintar(){ pintarBarra(); pintar(ST.sec); }

// ---------- utilidades de territorio ----------
const estadoDe = (c)=> TERR.estados.find(e=>e[0]===c);
const munDe = (e,m)=> (TERR.municipios[e]||[]).find(x=>x[0]===m);
const esCalpan = ()=> ST.est==='21' && ST.mun==='026';

// =====================================================================
PINTA.inicio = ()=>{ const nm = TERR.estados.reduce((s,e)=>s+(TERR.municipios[e[0]]||[]).length,0);
  return `<section class="hero-telar">${trama()}<div class="eyebrow">Ratio Complexus · ${T('primera aplicación','first application')}</div>
  <h1>Ratio <em>Telar</em></h1>
  <p class="big">${T('El conocimiento agrícola local tejido como un <b>sistema complejo adaptativo</b>: territorio, pasos, actividades, actores, recursos y sostenibilidad, en un solo tablero para productores y científicos.',
   'Local farming knowledge woven as a <b>complex adaptive system</b>: territory, steps, activities, actors, resources and sustainability on one dashboard for farmers and scientists.')}</p>
  <div class="ctas"><button class="btn lg" data-ir="stack">${T('Recorrer el Stack del maíz criollo','Explore the landrace-maize Stack')}</button>
  <button class="btn ghost lg" data-ir="gei">${T('Evaluar mi unidad de producción','Assess my farm')}</button>
  <button class="btn ghost lg" data-ir="tablero">${T('Ver el tablero','Open the dashboard')}</button></div>
  <div class="cifras">
   <div class="cifra"><b>${ART.informantes}</b><span>${T('informantes clave (2022–2024)','key informants (2022–2024)')}</span></div>
   <div class="cifra"><b>${ART.reglas}</b><span>${T('reglas básicas: las 5B','basic rules: the 5B')}</span></div>
   <div class="cifra"><b>${ART.pasos}</b><span>${T('pasos en el año agrícola','steps in the farming year')}</span></div>
   <div class="cifra"><b>${ART.actividades}</b><span>${T('actividades agrícolas','farming activities')}</span></div>
   <div class="cifra"><b>5</b><span>${T('grupos de actores en red','actor groups in the network')}</span></div>
   <div class="cifra"><b>${f0(nm)}</b><span>${T('municipios de México (INEGI)','Mexican municipalities (INEGI)')}</span></div>
  </div>${fuenteArt()}</section>
  <div class="grid g2">
   <div class="card"><h2>${T('Cómo está tejido','How it is woven')}</h2>
    <div class="howto">
     <div><span class="k">1</span><b>${T('Territorio','Territory')}</b><span>${T('Región → estado → municipio → comunidad, con el catálogo oficial del INEGI.','Region → state → municipality → community, with the official INEGI catalogue.')}</span></div>
     <div><span class="k">2</span><b>${T('Stack de conocimiento local','Local knowledge stack')}</b><span>${T('Las 5B, los 38 pasos y las 83 actividades del maíz criollo de Calpan, en su calendario.','The 5B, 38 steps and 83 activities of Calpan landrace maize, on their calendar.')}</span></div>
     <div><span class="k">3</span><b>${T('Red de actores','Actor network')}</b><span>${T('Quién articula el conocimiento: centralidad, intermediación y cercanía.','Who weaves knowledge together: centrality, betweenness and closeness.')}</span></div>
     <div><span class="k">4</span><b>${T('Gestión estratégica integrada','Integrated strategic management')}</b><span>${T('Los 10 preceptos, el nivel de conocimiento ambiental, MICMAC, MACTOR y escenarios futuribles.','The 10 precepts, environmental-knowledge level, MICMAC, MACTOR and future scenarios.')}</span></div>
    </div></div>
   <div class="card"><h2>${T('Dos miradas','Two views')}</h2>
    <div class="vistas">
     <div class="vista ${ST.modo==='prod'?'on':''}"><h3>${T('Productor','Producer')}</h3><ul><li>${T('Su calendario y sus pasos','Your calendar and steps')}</li><li>${T('Cuánto ahorra con su forma de cultivar','How much your way of farming saves')}</li><li>${T('Semáforo de los preceptos de sostenibilidad','Traffic light for the sustainability precepts')}</li></ul><button class="btn sm" data-modo="prod">${T('Usar esta vista','Use this view')}</button></div>
     <div class="vista ${ST.modo==='cien'?'on':''}"><h3>${T('Científico','Scientist')}</h3><ul><li>${T('Métricas de red, clústeres e IIC','Network metrics, clusters and IIC')}</li><li>${T('MICMAC, MACTOR y trayectorias no lineales','MICMAC, MACTOR and nonlinear trajectories')}</li><li>${T('Fórmulas, fuentes y exportación JSON','Formulas, sources and JSON export')}</li></ul><button class="btn sm" data-modo="cien">${T('Usar esta vista','Use this view')}</button></div>
    </div></div></div>
  <div class="card"><h2>${T('Rigor: dato publicado o lectura','Rigour: published data or reading')}</h2>
   <p>${marcaDato()} ${T('Cifras tomadas de una fuente citada (artículo, tesis, INEGI).','Figures taken from a cited source (paper, thesis, INEGI).')}</p>
   <p>${marcaInterp()} ${T('Agrupaciones o relaciones que propone Ratio Telar para leer los datos; se pueden discutir y cambiar.','Groupings or links proposed by Ratio Telar to read the data; open to debate and change.')}</p>
   <p class="nota">${T('Lo que aún no está documentado se muestra como «sin dato»: Ratio Telar no inventa valores.','What is not yet documented is shown as “no data”: Ratio Telar does not invent values.')}</p></div>`; };
PINTA.inicio_ev = (el)=>{};

// =====================================================================
PINTA.territorio = ()=>{ const e=estadoDe(ST.est), muns=TERR.municipios[ST.est]||[], m=munDe(ST.est,ST.mun);
  const ests=TERR.estados.filter(x=>x[3]===ST.reg);
  const pobE = muns.reduce((s,x)=>s+(x[2]||0),0); const orden=[...muns].filter(x=>x[2]).sort((a,b)=>b[2]-a[2]); const pos = m ? orden.findIndex(x=>x[0]===m[0])+1 : 0;
  const com = esCalpan() ? CALPAN.comunidades : [];
  return `<div class="bhead"><div class="eyebrow">${T('Paso 1 · Caracterización integral','Step 1 · Integral characterisation')}</div><h1>${T('Territorio','Territory')}</h1>
   <p class="lead">${T('Acerca la mirada del país a la comunidad. Cada productor cultiva a su manera: el territorio es el primer hilo del telar.','Zoom from the country to the community. Every farmer works in their own way: territory is the first thread.')}</p></div>
  <div class="card"><div class="zoom">
   <div><label>${T('Región','Region')}</label><select id="zReg">${Object.keys(REGIONES).map(k=>`<option value="${k}" ${k===ST.reg?'selected':''}>${nomReg(k)}</option>`).join('')}</select></div>
   <div><label>${T('Estado (subregión)','State (subregion)')}</label><select id="zEst">${ests.map(x=>`<option value="${x[0]}" ${x[0]===ST.est?'selected':''}>${esc(x[1])}</option>`).join('')}</select></div>
   <div><label>${T('Municipio','Municipality')}</label><select id="zMun">${muns.map(x=>`<option value="${x[0]}" ${x[0]===ST.mun?'selected':''}>${esc(x[1])}</option>`).join('')}</select></div>
   <div><label>${T('Comunidad','Community')}</label><select id="zCom" ${com.length?'':'disabled'}>${com.length?com.map((c,i)=>`<option value="${i}" ${i===ST.com?'selected':''}>${esc(c[0])}</option>`).join(''):`<option>${T('sin comunidades documentadas','no documented communities')}</option>`}</select></div>
  </div>
  <div class="ruta"><span>${T('México','Mexico')}</span><i>›</i><span>${nomReg(ST.reg)}</span><i>›</i><span>${esc(e?e[1]:'')}</span><i>›</i><span>${esc(m?m[1]:'')}</span>${com.length?`<i>›</i><span>${esc(com[ST.com][0])}</span>`:''}</div></div>
  <div class="grid g2">
   <div class="card"><h3>${T('México por regiones','Mexico by region')}</h3>${mosaico(ST.est,null,(k)=>REGIONES[k][2])}
    <div class="leyenda">${Object.keys(REGIONES).map(k=>`<span><i style="background:${REGIONES[k][2]}"></i>${nomReg(k)}</span>`).join('')}</div>
    <p class="nota">${T('Cartograma esquemático: cada estado es un mosaico en su posición aproximada; no es un mapa a escala. Regiones del Banco de México (Reporte sobre las Economías Regionales).','Schematic cartogram: each state is a tile in its approximate position; not a scale map. Regions from Banco de México (Regional Economies Report).')}</p></div>
   <div class="card"><h3>${esc(m?m[1]:'')}, ${esc(e?e[1]:'')}</h3>
    <div class="kpis">
     <div class="kpi"><div class="l">${T('Población 2020','Population 2020')}</div><div class="v">${m&&m[2]?f0(m[2]):'—'}</div><div class="s">${pos?T('lugar ','rank ')+pos+T(' de ',' of ')+orden.length+T(' en el estado',' in the state'):''}</div></div>
     <div class="kpi"><div class="l">${T('Viviendas habitadas','Inhabited dwellings')}</div><div class="v">${m&&m[3]?f0(m[3]):'—'}</div><div class="s">${m&&m[2]&&m[3]?f1(m[2]/m[3])+T(' hab./vivienda',' people/dwelling'):''}</div></div>
     <div class="kpi"><div class="l">${T('Municipios del estado','Municipalities in the state')}</div><div class="v">${muns.length}</div><div class="s">${f0(pobE)} ${T('hab.','people')}</div></div>
    </div>${fuenteInegi()}
    ${esCalpan() ? `<div class="alert ok" style="margin-top:12px"><p>${marcaDato()} <b>${T('Caso documentado','Documented case')}:</b> ${T('el Stack del maíz criollo de Calpan (2022–2024).','the Calpan landrace-maize Stack (2022–2024).')}</p>
      <ul><li>${T('Coordenadas','Coordinates')}: ${CALPAN.coord}</li>
      <li>${T('Colinda al norte con','Borders to the north')} ${CALPAN.limites.N.join(T(' y ',' and '))}; ${T('al sur con','south')} ${CALPAN.limites.S[0]}; ${T('al este con','east')} ${CALPAN.limites.E.join(T(' y ',' and '))}; ${T('al oeste con','west')} ${CALPAN.limites.O[0]}.</li>
      <li>${T('Población aproximada según el artículo','Approximate population per the paper')}: ${f0(CALPAN.pobArt)} (${CALPAN.mujeres} % ${T('mujeres','women')}, ${CALPAN.hombres} % ${T('hombres','men')}); ${CALPAN.cabecera} % ${T('en la cabecera y','in the municipal seat and')} ${CALPAN.juntas} % ${T('en las juntas auxiliares de San Mateo Ozolco y San Lucas Atzala','in the auxiliary boards of San Mateo Ozolco and San Lucas Atzala')}.</li>
      <li>${T('Sistemas','Systems')}: ${CALPAN.sistemas.map(s=>T(s[0],s[1])).join('; ')}; ${T('unidades de producción menores a 5 ha','farms under 5 ha')}.</li></ul>${fuenteArt()}
      <button class="btn sm" data-ir="stack">${T('Ver su Stack','See its Stack')}</button></div>`
     : `<div class="alert info" style="margin-top:12px"><p><b>${T('Sin caso documentado todavía.','No documented case yet.')}</b> ${T('Este municipio tiene su catálogo oficial, pero aún no un Stack de conocimiento local publicado. Usa la Gestión integrada para documentarlo: caracterización, preceptos, actores y variables.','This municipality has its official catalogue but no published local-knowledge Stack yet. Use Integrated management to document it.')}</p>
       <button class="btn sm" data-ir="gei">${T('Documentar este territorio','Document this territory')}</button> <button class="btn sm ghost" id="aCalpan">${T('Ir al caso de Calpan','Go to the Calpan case')}</button></div>`}
   </div></div>`; };
PINTA.territorio_ev = (el)=>{
  $('#zReg',el).onchange=(e)=>{ ST.reg=e.target.value; const x=TERR.estados.find(s=>s[3]===ST.reg); ST.est=x[0]; ST.mun=TERR.municipios[ST.est][0][0]; ST.com=0; guardar(); pintar('territorio'); };
  $('#zEst',el).onchange=(e)=>{ ST.est=e.target.value; ST.mun=TERR.municipios[ST.est][0][0]; ST.com=0; guardar(); pintar('territorio'); };
  $('#zMun',el).onchange=(e)=>{ ST.mun=e.target.value; ST.com=0; guardar(); pintar('territorio'); };
  const zc=$('#zCom',el); if(zc) zc.onchange=(e)=>{ ST.com=+e.target.value; guardar(); pintar('territorio'); };
  $$('[data-estado]',el).forEach(g=>g.onclick=()=>{ ST.est=g.dataset.estado; ST.reg=estadoDe(ST.est)[3]; ST.mun=TERR.municipios[ST.est][0][0]; ST.com=0; guardar(); pintar('territorio'); });
  const ac=$('#aCalpan',el); if(ac) ac.onclick=()=>{ ST.reg='C'; ST.est='21'; ST.mun='026'; ST.com=0; guardar(); pintar('territorio'); };
};

// =====================================================================
const fechaDia = (d)=>{ const dt=new Date(2026,0,1+Math.round(d)); return dt.toLocaleDateString(LANG==='en'?'en-US':'es-MX',{day:'numeric',month:'long'}); };
PINTA.stack = ()=>{ const fb=ST.filtroB; const lista=PASOS.filter(p=>!fb||p.b===fb);
  const iic=PASOS.filter(p=>p.iic).sort((a,b)=>b.iic-a.iic);
  return `<div class="bhead"><div class="eyebrow">${T('Stack de Conocimiento Local · Calpan, Puebla','Local Knowledge Stack · Calpan, Puebla')}</div><h1>${T('Las 5B del maíz criollo','The 5B of landrace maize')}</h1>
   <p class="lead">${T('Cinco reglas básicas que se desagregan en 38 pasos y 83 actividades, distribuidos a lo largo del año y marcados por la temperatura y la lluvia.','Five basic rules broken into 38 steps and 83 activities, spread over the year and set by temperature and rainfall.')}</p></div>
  <div class="cinco">${B5.map(b=>`<div class="regla ${fb===b.id?'on':''}" data-b="${b.id}" style="background:${b.col}" title="${esc(T(b.d[0],b.d[1]))}"><b>${T(b.es,b.en)}</b><small>${PASOS.filter(p=>p.b===b.id).length} ${T('pasos','steps')}${b.interp?' ◆':''}</small></div>`).join('')}</div>
  <p class="nota" style="margin-top:8px">${marcaInterp()} ${T('El artículo define las 5B pero no asigna cada paso a una regla; la asignación por color es una lectura de Ratio Telar a partir de esas definiciones. Haz clic en una regla para filtrar.','The paper defines the 5B but does not assign each step to a rule; colour assignment is a Ratio Telar reading of those definitions. Click a rule to filter.')}</p>
  ${fb?`<div class="alert info"><p><b>${T(B5.find(b=>b.id===fb).es,B5.find(b=>b.id===fb).en)}.</b> ${T(B5.find(b=>b.id===fb).d[0],B5.find(b=>b.id===fb).d[1])}</p></div>`:''}
  <div class="grid g2">
   <div class="card"><h3>${T('Calendario del año agrícola','Farming-year calendar')}</h3>${ruedaStack(ST.siembra, fb)}
    <label class="f"><span class="h">${T('Fecha de siembra','Sowing date')}: <b>${fechaDia(ST.siembra)}</b></span><input type="range" id="rSiembra" min="59" max="119" value="${ST.siembra}"></label>
    <p class="nota">${T('El artículo señala dos posibles fechas de siembra según la precipitación y fenómenos como El Niño y La Niña, los ciclones del Atlántico, la Oscilación Madden-Julian y la Oscilación Ártica. La siembra aparece entre marzo y abril en la Figura 4; los pasos con DDS se recorren con la fecha que elijas.','The paper reports two possible sowing dates depending on rainfall and phenomena such as El Niño/La Niña, Atlantic hurricanes, the Madden-Julian and Arctic oscillations. Figure 4 places sowing in March–April; steps given in days after sowing (DAS) move with the date you choose.')}</p>
    <p class="nota">${marcaInterp()} ${T('Las ventanas de los pasos sin DDS son una lectura aproximada de la Figura 4.','Windows of steps without DAS are an approximate reading of Figure 4.')}</p>${fuenteArt()}</div>
   <div class="card"><h3>${T('Intensidad de conocimiento (IIC)','Knowledge intensity (IIC)')}</h3>
    <p class="nota">${T('Índice de Intensidad de Conocimiento por paso. El artículo publica los seis valores más altos y los cinco más bajos; los demás no se publicaron.','Knowledge Intensity Index per step. The paper publishes the six highest and five lowest values; the rest were not published.')}</p>
    ${barrasH(iic.map(p=>({l:p.n+'. '+T(p.es,p.en).slice(0,34), v:p.iic, c:colB(p.b), vl:f1(p.iic)})),{max:100,izq:270})}
    <p>${marcaDato()} ${T('El IIC mostró predominio del conocimiento tácito, cultural y ambiental, combinado con prácticas de investigación e innovación.','The IIC showed tacit, cultural and environmental knowledge predominating, combined with research and innovation practices.')}</p>${fuenteArt()}
    <div class="sci"><h3 style="margin-top:18px">${T('De las reglas a los clústeres de conocimiento','From rules to knowledge clusters')}</h3>${flujoBC()}
    <p class="nota">${T('Izquierda: reglas (lectura de Ratio Telar). Derecha: los cinco clústeres del dendrograma de la Figura 3 (dato publicado). El artículo no indica qué clúster corresponde a cada grupo de conocimiento.','Left: rules (Ratio Telar reading). Right: the five clusters of the Figure 3 dendrogram (published). The paper does not state which cluster matches each knowledge group.')}</p></div>
   </div></div>
  <div class="card"><h3>${T('Los cinco grupos de conocimiento','The five knowledge groups')}</h3><div class="grid g3">${GRUPOS.map((g,i)=>`<div class="card soft" style="margin:0"><h4>${i+1}. ${T(g.es,g.en)}</h4><p class="nota">${T(g.d[0],g.d[1])}</p></div>`).join('')}</div>
   <p class="nota">${T('El primero tiene fuerte arraigo cultural; el segundo y el quinto requieren más acceso a información técnica; el tercero y el cuarto son espacios intermedios. Es un gradiente, no una dicotomía entre tradición e innovación.','The first has deep cultural roots; the second and fifth need more access to technical information; the third and fourth are intermediate. It is a gradient, not a tradition/innovation dichotomy.')}</p>${fuenteArt()}</div>
  <div class="card"><div class="between"><h3>${T('Catálogo de pasos y actividades','Catalogue of steps and activities')} (${lista.length})</h3>${fb?`<button class="btn sm ghost" id="bTodos">${T('Ver los 38','Show all 38')}</button>`:''}</div>
   <div class="pasos">${lista.map(p=>`<div class="paso" style="--pc:${colB(p.b)}"><div class="num">${p.n}</div><div><h4>${T(p.es,p.en)}</h4>
    <div class="acts">${p.a.map(a=>`<span><code>${a[0]}</code>${esc(T(a[1],a[2]))}</span>`).join(' · ')}</div></div>
    <div class="meta">${p.dds?p.dds.join('–')+' DDS':MESES()[p.v[0]-1]+(p.v.length>1?'–'+MESES()[p.v[p.v.length-1]-1]:'')}${p.iic?`<br><span class="iicb">IIC ${f1(p.iic)}</span>`:''}<br><span class="sci">C${p.c}</span>${p.n===18?'<br>*':''}${p.n===30?'<br><span title="'+esc(T('La figura imprime «1000 DDS»; probable errata.','The figure prints “1000 DAS”; likely a typo.'))+'">†</span>':''}</div></div>`).join('')}</div>
   <p class="nota">${T('Códigos de actividad tal como aparecen en la Figura 4. Al transcribirla resultan 85 renglones; el artículo reporta 83 actividades. ZV y YV se imprimen como «ZY» y «YY».','Activity codes as printed in Figure 4. Transcription yields 85 lines; the paper reports 83 activities. ZV and YV are printed “ZY” and “YY”.')}</p>${fuenteArt()}</div>`; };
PINTA.stack_ev = (el)=>{ $$('[data-b]',el).forEach(d=>d.onclick=()=>{ ST.filtroB = ST.filtroB===d.dataset.b ? null : d.dataset.b; guardar(); pintar('stack'); });
  const r=$('#rSiembra',el); r.oninput=()=>{ ST.siembra=+r.value; guardar(); const card=r.closest('.card'); const svg=card.querySelector('svg'); svg.outerHTML=ruedaStack(ST.siembra, ST.filtroB); card.querySelector('.h b').textContent=fechaDia(ST.siembra); enlazarTips(card); };
  const bt=$('#bTodos',el); if(bt) bt.onclick=()=>{ ST.filtroB=null; guardar(); pintar('stack'); }; };

// =====================================================================
PINTA.red = ()=>{ const nod=ACTORES.map(a=>({id:a.id, nombre:T(a.es,a.en), col: a.id==='AL'?'var(--accent)':'var(--primary)'}));
  const ar=ACTORES.filter(a=>a.id!=='AL').map(a=>({a:'AL', b:a.id, w:2}));
  const otros=ACTORES.filter(a=>a.id!=='AL'); for(let i=0;i<otros.length;i++) for(let j=i+1;j<otros.length;j++) ar.push({a:otros[i].id, b:otros[j].id, w:1, dash:true});
  const metPub={nodos:ACTORES.map(a=>({id:a.id, grado:(a.cent[0]+a.cent[1])/2, inter:a.inter||0, cerc:0}))};
  const u=ST.red, mu=metricasRed(u.nodos, u.aristas);
  return `<div class="bhead"><div class="eyebrow">${T('Mapeo de actores clave','Key-actor mapping')}</div><h1>${T('La red que sostiene el conocimiento','The network that holds the knowledge')}</h1>
   <p class="lead">${T('La gestión del conocimiento local no depende de un solo actor, sino de un entramado de relaciones.','Local knowledge management depends not on one actor but on a web of relationships.')}</p></div>
  <div class="grid g2">
   <div class="card"><h3>${T('Red de grupos de actores en Calpan','Actor-group network in Calpan')}</h3>${dibujarRed(nod, ar, metPub, {clave:'grado', h:400, centro:'AL'})}
    <div class="leyenda"><span><i style="background:var(--accent)"></i>${T('Academia local: vinculada con todos los actores','Local academia: linked to all actors')}</span><span><i style="background:var(--border-strong)"></i>${T('línea punteada: red densa con múltiples conexiones (pesos no publicados)','dashed: dense network, many ties (weights not published)')}</span></div>
    <p class="nota">${T('Tamaño del nodo: centralidad ponderada publicada (AL = 16; los demás grupos entre 11 y 14, se dibuja el punto medio).','Node size: published weighted centrality (AL = 16; other groups 11–14, midpoint drawn).')}</p>${fuenteArt()}</div>
   <div class="card"><h3>${T('Métricas publicadas','Published metrics')} ${marcaDato()}</h3>
    <table class="tbl"><thead><tr><th>${T('Grupo','Group')}</th><th class="r">${T('Centralidad ponderada','Weighted centrality')}</th><th class="r">${T('Intermediación','Betweenness')}</th></tr></thead><tbody>
    ${ACTORES.map(a=>`<tr><td><b>${a.id}</b> ${T(a.es,a.en)}</td><td class="r">${a.cent[0]===a.cent[1]?a.cent[0]:a.cent[0]+'–'+a.cent[1]}</td><td class="r">${a.inter!=null?f1(a.inter,2):'<span class="sindato">'+T('no publicada','not published')+'</span>'}</td></tr>`).join('')}
    </tbody></table>
    <ul><li>${T('Cercanía de los nodos: de 0.50 a 0.95 (red compacta).','Node closeness: 0.50 to 0.95 (compact network).')}</li>
    <li>${T('Ventaja estructural (leverage) mayor que 1 en algunos productores, proveedores y asesores técnicos.','Structural leverage above 1 for some farmers, suppliers and advisers.')}</li>
    <li>${T('Red relativamente centralizada: la academia local y los asesores técnicos articulan la circulación del conocimiento.','Fairly centralised network: local academia and technical advisers weave knowledge flows.')}</li></ul>
    <h4>${T('Participantes por ciclo (Cuadro 1)','Participants per cycle (Table 1)')}</h4>
    ${barrasH(CUADRO1.map(c=>({l:c.ciclo, v:c.PM+c.PI+c.IAC+c.AT, t:`PM ${c.PM} · PI ${c.PI} · IAC ${c.IAC} · AT ${c.AT}`, vl:`${c.PM+c.PI+c.IAC+c.AT}`})),{izq:110,max:50})}
    <p class="nota">PM ${T('productores líderes','lead farmers')} · PI ${T('proveedores','suppliers')} · IAC ${T('investigadores','researchers')} · AT ${T('extensionistas','extension agents')}. ${T('Total','Total')}: 21 + 32 + 47 = 100.</p>${fuenteArt()}</div></div>
  <div class="card"><h2>${T('Teje tu propia red','Weave your own network')}</h2>
   <p>${T('Registra los actores de tu territorio y la fuerza de sus vínculos (1 débil, 2 media, 3 fuerte). Ratio Telar calcula la centralidad, la intermediación y la cercanía para identificar a quien articula el sistema.','Record the actors in your territory and tie strength (1 weak, 2 medium, 3 strong). Ratio Telar computes centrality, betweenness and closeness to find who holds the system together.')}</p>
   <div class="grid g2"><div>${dibujarRed(u.nodos.map(n=>({...n, col:'var(--primary)'})), u.aristas, mu, {clave:'inter', h:380})}
     <p class="nota">${T('Tamaño del nodo: intermediación calculada. Densidad de la red','Node size: computed betweenness. Network density')}: <b>${f1(mu.densidad,2)}</b></p></div>
    <div><table class="tbl"><thead><tr><th>${T('Actor','Actor')}</th><th class="r">${T('Grado','Degree')}</th><th class="r">${T('Interm.','Betw.')}</th><th class="r">${T('Cercanía','Closeness')}</th><th></th></tr></thead><tbody>
     ${mu.nodos.map((m,i)=>`<tr><td><b>${esc(m.id)}</b> <span class="nota">${esc(u.nodos[i].nombre||'')}</span></td><td class="r">${f1(m.grado)}</td><td class="r">${f1(m.inter,2)}</td><td class="r">${f1(m.cerc,2)}</td><td><button class="btn sm ghost" data-quitan="${i}">×</button></td></tr>`).join('')}
     </tbody></table>
     <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px"><input id="nId" placeholder="${T('Clave (p. ej. MUN)','Code (e.g. MUN)')}" style="width:110px"><input id="nNom" placeholder="${T('Nombre del actor','Actor name')}" style="flex:1;min-width:140px"><button class="btn sm" id="bNodo">${T('Agregar actor','Add actor')}</button></div>
     <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px"><select id="eA">${u.nodos.map(n=>`<option>${esc(n.id)}</option>`).join('')}</select><select id="eB">${u.nodos.map((n,i)=>`<option ${i===1?'selected':''}>${esc(n.id)}</option>`).join('')}</select>
      <select id="eW"><option value="1">1 ${T('débil','weak')}</option><option value="2">2 ${T('media','medium')}</option><option value="3">3 ${T('fuerte','strong')}</option></select><button class="btn sm" id="bArista">${T('Vincular','Link')}</button></div>
     <p class="nota">${u.aristas.length} ${T('vínculos','ties')}. ${u.aristas.map((e,i)=>`<a href="#" data-quitaa="${i}" title="${T('quitar','remove')}">${esc(e.a)}–${esc(e.b)} (${e.w})</a>`).join(', ')}</p>
     <p class="nota sci">${T('Distancia de un vínculo = 1/peso. Intermediación por el algoritmo de Brandes (2001); cercanía de Wasserman y Faust para redes no conexas.','Tie distance = 1/weight. Betweenness via Brandes (2001); Wasserman–Faust closeness for disconnected graphs.')}</p></div></div></div>`; };
PINTA.red_ev = (el)=>{ const u=ST.red;
  $('#bNodo',el).onclick=()=>{ const id=$('#nId',el).value.trim(); if(!id||u.nodos.some(n=>n.id===id)) return; u.nodos.push({id, nombre:$('#nNom',el).value.trim()}); guardar(); pintar('red'); };
  $('#bArista',el).onclick=()=>{ const a=$('#eA',el).value, b=$('#eB',el).value, w=+$('#eW',el).value; if(a===b) return; const ex=u.aristas.find(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a)); if(ex) ex.w=w; else u.aristas.push({a,b,w}); guardar(); pintar('red'); };
  $$('[data-quitan]',el).forEach(b=>b.onclick=()=>{ const id=u.nodos[+b.dataset.quitan].id; u.nodos.splice(+b.dataset.quitan,1); u.aristas=u.aristas.filter(e=>e.a!==id&&e.b!==id); guardar(); pintar('red'); });
  $$('[data-quitaa]',el).forEach(b=>b.onclick=(ev)=>{ ev.preventDefault(); u.aristas.splice(+b.dataset.quitaa,1); guardar(); pintar('red'); }); };

// =====================================================================
function hechosDim(id){ if(!esCalpan()){ const m=munDe(ST.est,ST.mun);
    return id==='social' && m ? [[`${T('Población 2020','Population 2020')}: ${f0(m[2])}; ${T('viviendas habitadas','dwellings')}: ${f0(m[3])}.`,'inegi']] : []; }
  const H={
   social:[[`${T('Población 2020 (INEGI)','Population 2020 (INEGI)')}: 15,271.`,'inegi'],[T(`Población aproximada (artículo): 16,000; 52 % mujeres y 48 % hombres; 72 % en la cabecera y 28 % en las juntas auxiliares.`,`Approximate population (paper): 16,000; 52 % women, 48 % men; 72 % in the seat, 28 % in auxiliary boards.`),'art'],
     [T('La población dedicada al campo tiene edad avanzada y baja escolaridad.','The farming population is older with little schooling.'),'art'],[T('El conocimiento se transmite entre generaciones y se intercambia entre productores, proveedores, asesores, investigadores y la academia local.','Knowledge passes between generations and is exchanged among farmers, suppliers, advisers, researchers and local academia.'),'art']],
   economico:[[T('Población económicamente activa: 4,882 personas; 50 % en el sector primario, 15 % en transformación y cerca de 35 % en comercio y servicios.','Economically active population: 4,882; 50 % primary sector, 15 % processing, ~35 % trade and services.'),'art'],[T('Rendimientos de maíz entre 5 y 6 toneladas.','Maize yields of 5–6 tonnes.'),'art'],[T('Unidades de producción familiares menores a 5 ha.','Family farms under 5 ha.'),'art'],[T('Pasos 37 y 38: comercialización de grano y forraje, y balance de ingresos netos y costos.','Steps 37–38: selling grain and fodder; balance of net income and costs.'),'art']],
   agricola:[[T('Sistemas milpa (maíz–frijol–calabaza) y MIAF (maíz intercalado con árboles frutales).','Milpa (maize–bean–squash) and MIAF (maize intercropped with fruit trees).'),'art'],[T('Maíces criollos manejados con 5 reglas, 38 pasos y 83 actividades.','Landrace maize managed through 5 rules, 38 steps and 83 activities.'),'art'],[T('Siembra para solo grano o doble propósito.','Sowing for grain only or dual purpose.'),'art'],[T('Frutales: tejocote, pera lechera, nuez de castilla, manzana panochera, durazno y capulín.','Fruit: tejocote, pear, walnut, apple, peach and capulin cherry.'),'art']],
   pecuario:[[T('Paso 34, obtención de forraje: molienda, encostalado, cocido, almacenamiento, empacado y transporte.','Step 34, fodder: grinding, bagging, cooking, storage, baling and transport.'),'art'],[T('Paso 37: comercialización de grano y forraje; la siembra puede ser de doble propósito.','Step 37: selling grain and fodder; sowing may be dual purpose.'),'art'],[T('Inventario ganadero del municipio: sin dato en las fuentes de Ratio Telar.','Municipal livestock inventory: no data in Ratio Telar sources.'),'sin']],
   ambiental:[[T('La buena tierra se centra en captar y manejar la humedad (pasos 1–5 y 32).','Good soil centres on capturing and managing moisture (steps 1–5, 32).'),'art'],[T('Análisis de suelo con muestreo y verificación de resultados (paso 13).','Soil analysis with sampling and result checks (step 13).'),'art'],[T('Uso de herbicidas (paso 27) e insecticidas en el tratamiento de semilla (paso 7).','Herbicides (step 27) and insecticides in seed treatment (step 7).'),'art']],
   ecologico:[[T('México: 59 razas nativas de maíz (otras fuentes señalan 64); cerca de 22 en Puebla.','Mexico: 59 native maize races (others report 64); about 22 in Puebla.'),'art'],[T('Puebla, Oaxaca, Chiapas, Jalisco y Guerrero concentran la mayor diversidad de maíces.','Puebla, Oaxaca, Chiapas, Jalisco and Guerrero hold the greatest maize diversity.'),'art'],[T('Criollos que soportan periodos largos sin agua en el suelo; milpa y MIAF como policultivos.','Landraces that withstand long dry spells; milpa and MIAF as polycultures.'),'art']],
   emergencia:[[T('Fenómenos considerados para elegir la fecha de siembra: El Niño y La Niña, temporada de ciclones del Atlántico, Oscilación Madden-Julian y Oscilación Ártica.','Phenomena weighed to choose the sowing date: El Niño/La Niña, Atlantic hurricane season, Madden-Julian and Arctic oscillations.'),'art'],[T('Declaratorias de emergencia o riesgos específicos del municipio: sin dato en las fuentes de Ratio Telar.','Emergency declarations or specific municipal hazards: no data in Ratio Telar sources.'),'sin']],
   recursos:[[T('La humedad del suelo y la competencia por agua guían la preparación del terreno y la densidad de siembra.','Soil moisture and competition for water drive land preparation and sowing density.'),'art'],[T('Siguiendo el método de la gráfica de espejo, el agua sería el recurso limitativo; el suelo y la vegetación, dependientes.','Following the mirror-graph method, water would be the limiting resource; soil and vegetation dependent.'),'interp']],
   sostenibilidad:[[T('Rescatar el conocimiento local contribuye al ODS 2 (Hambre cero) y al ODS 15 (Vida de ecosistemas terrestres) (FAO, 2019).','Rescuing local knowledge contributes to SDG 2 (Zero hunger) and SDG 15 (Life on land) (FAO, 2019).'),'art'],[T('El Stack puede orientar programas como Sembrando Vida y Producción para el Bienestar.','The Stack can guide programmes such as Sembrando Vida and Producción para el Bienestar.'),'art'],[T('Puede extenderse a frijol, chile, cacao, maguey o aguacate.','It can extend to beans, chilli, cacao, agave or avocado.'),'art']]};
  return H[id]||[]; }
PINTA.dimensiones = ()=>{ const d=DIMENSIONES.find(x=>x.id===ST.dim)||DIMENSIONES[0]; const m=munDe(ST.est,ST.mun), e=estadoDe(ST.est); const hs=hechosDim(d.id);
  const marca=(k)=> k==='art'?marcaDato():k==='inegi'?marcaDato():k==='interp'?marcaInterp():`<span class="interp" style="color:var(--muted);background:var(--bg-soft)">○ ${T('Sin dato','No data')}</span>`;
  return `<div class="bhead"><div class="eyebrow">${esc(m?m[1]:'')}, ${esc(e?e[1]:'')}</div><h1>${T('Nueve dimensiones de un mismo sistema','Nine dimensions of one system')}</h1>
   <p class="lead">${T('Social, económica, agrícola, pecuaria, ambiental, ecológica, de emergencia ambiental, de recursos naturales y de sostenibilidad: cada una mira el mismo territorio desde otro ángulo.','Social, economic, agricultural, livestock, environmental, ecological, emergency, natural resources and sustainability: each looks at the same territory from another angle.')}</p></div>
  <div class="dims">${DIMENSIONES.map(x=>`<div class="dim ${x.id===d.id?'on':''}" data-dim="${x.id}" style="--dc:${x.col}"><h3>${T(x.es,x.en)}</h3><p>${T(x.q[0],x.q[1])}</p><div class="odsr">${x.ods.map(o=>`<span class="odsb" style="background:${ODS[o-1][3]}" title="ODS ${o}: ${esc(T(ODS[o-1][1],ODS[o-1][2]))}">${o}</span>`).join('')}</div></div>`).join('')}</div>
  <div class="card ficha" style="border-top:4px solid ${d.col}"><h2>${T(d.es,d.en)}</h2>
   ${hs.length?`<ul>${hs.map(h=>`<li>${marca(h[1])} ${h[0]}</li>`).join('')}</ul>`:`<p class="sindato">${T('Aún no hay información documentada de esta dimensión para este municipio.','No documented information for this dimension in this municipality yet.')}</p>`}
   ${esCalpan()?fuenteArt():fuenteInegi()}
   <h4>${T('Objetivos de Desarrollo Sostenible relacionados','Related Sustainable Development Goals')} ${marcaInterp(T('Relación propuesta por Ratio Telar','Link proposed by Ratio Telar'))}</h4>
   <div class="ods-grid">${ODS.map(o=>`<div class="ods-c ${d.ods.includes(o[0])?'on':''}" style="background:${o[3]}"><b>${o[0]}</b>${esc(T(o[1],o[2]))}</div>`).join('')}</div></div>`; };
PINTA.dimensiones_ev = (el)=>{ $$('[data-dim]',el).forEach(x=>x.onclick=()=>{ ST.dim=x.dataset.dim; guardar(); pintar('dimensiones'); }); };

// =====================================================================
const valsPrec = ()=> PRECEPTOS.map((p,i)=> ST.prec[i]===''? null : valorPrecepto(p, ST.prec[i]));
const promPrec = ()=>{ const v=valsPrec().filter(x=>x!=null); return v.length? v.reduce((a,b)=>a+b,0)/v.length : null; };
PINTA.gei = ()=>{ const v=valsPrec(), pr=promPrec(), mn = v.some(x=>x!=null) ? Math.min(...v.filter(x=>x!=null)) : null;
  const NCA = (ST.vc!==''&&ST.vrup!==''&&mn!=null) ? nca(ST.vc, ST.vrup, mn) : null;
  return `<div class="bhead"><div class="eyebrow">${T('Modelo y procedimiento de la tesis doctoral','Doctoral-thesis model and procedure')}</div><h1>${T('Gestión Estratégica Integrada','Integrated Strategic Management')}</h1>
   <p class="lead">${T('Tres fundamentos (socioeconómico, ambiental y turístico-ecotecnológico) y tres enfoques (participativo, de sistemas complejos y sostenible), en cuatro fases y nueve pasos que vuelven a empezar.','Three foundations (socio-economic, environmental, tourism–eco-technological) and three approaches (participatory, complex systems, sustainable), in four phases and nine steps that loop back.')}</p></div>
  <div class="fases">${FASES.map(f=>`<div class="fase"><div class="fn">${f.n}</div><b>${T(f.es,f.en)}</b><ol start="${f.pasos[0][0]}">${f.pasos.map(p=>`<li>${T(p[1],p[2])}</li>`).join('')}</ol></div>`).join('')}</div>
  <p class="nota">${T('El paso 9 regresa al inicio: la gestión es un ciclo de mejora continua.','Step 9 returns to the start: management is a continuous-improvement loop.')}</p>${fuenteTesis()}
  <div class="grid g2">
   <div class="card"><h2>${T('Paso 2 · Los diez preceptos','Step 2 · The ten precepts')}</h2>
    <p>${T('Escribe cuántas evidencias tiene tu unidad de producción para cada precepto. La escala de la tesis convierte el conteo en un valor de 0 a 1.','Enter how many pieces of evidence your farm has for each precept. The thesis scale turns the count into a 0–1 value.')}</p>
    ${PRECEPTOS.map((p,i)=>{ const x=v[i], r=x!=null?leerRegla(x):null; return `<div class="prec"><span class="pn">${p.n}</span><div><b>${T(p.es,p.en)}</b><small>${T(p.ind[0],p.ind[1])} · ${p.n===8?T('1.0 si existe alguna','1.0 if any'):'+'+f1(p.paso,2)+' '+T('c/u','each')}</small>
     <div class="barra"><i style="width:${(x||0)*100}%;background:var(--${r?r.cls:'border'})"></i></div></div>
     <input type="number" min="0" step="1" data-prec="${i}" value="${ST.prec[i]}" placeholder="${T('núm.','no.')}"><span class="pv">${x!=null?f1(x,2):'—'}</span></div>`; }).join('')}
    <div class="alert ${pr==null?'info':leerRegla(pr).cls}" style="margin-top:12px"><p><b>${T('Cumplimiento promedio','Average compliance')}: ${pr!=null?f1(pr,2):'—'}</b>${pr!=null?' · '+T(leerRegla(pr).es,leerRegla(pr).en):''}</p></div>${fuenteTesis()}</div>
   <div class="card"><h3>${T('Perfil de los preceptos','Precept profile')}</h3>${radar(v.map(x=>x||0), PRECEPTOS.map(p=>'P'+p.n))}
    <div class="leyenda">${REGLAS_PRECEPTO.map((r,i)=>`<span><i style="background:var(--${r.cls})"></i>${i===0?'< 0.5':i===1?'0.5–0.8':'0.8–1.0'}</span>`).join('')}</div>
    <h2 style="margin-top:18px">${T('Paso 3 · Nivel de conocimiento ambiental','Step 3 · Environmental knowledge level')}</h2>
    <div class="formula">NCA = (VC + VRUP) × VMPUP</div>
    <div class="grid g2"><label class="f"><span class="h">VC · ${T('valor del cuestionario','questionnaire score')}</span><input type="number" step="0.01" id="iVC" value="${ST.vc}"></label>
     <label class="f"><span class="h">VRUP · ${T('valor del recorrido en la UP','farm walk score')}</span><input type="number" step="0.01" id="iVRUP" value="${ST.vrup}"></label></div>
    <p>VMPUP · ${T('valor mínimo de los preceptos','minimum precept value')}: <b>${mn!=null?f1(mn,2):'—'}</b> ${T('(se toma de la tabla de preceptos)','(taken from the precept table)')}</p>
    <div class="kpis"><div class="kpi"><div class="l">NCA</div><div class="v">${NCA!=null?f1(NCA,2):'—'}</div><div class="s">${T('nivel de conocimiento ambiental','environmental knowledge level')}</div></div></div>${fuenteTesis()}</div></div>
  <div class="card"><h2>${T('Paso 4 · Gráfica de espejo','Step 4 · Mirror graph')}</h2>
   <p>${T('Ubica cada indicador según dos reflejos. Los que quedan al centro son estratégicos (la tesis recomienda no más de 12).','Place each indicator by two reflections. Those in the centre are strategic (the thesis recommends no more than 12).')}</p>
   <div class="grid g2"><div>${espejo()}</div><div>
    <table class="tbl"><thead><tr><th>${T('Indicador','Indicator')}</th><th>X</th><th>Y</th><th></th></tr></thead><tbody>
    ${ST.espejo.map((x,i)=>`<tr><td><input value="${esc(x.n)}" data-en="${i}"></td><td><select data-ex="${i}">${[-1,0,1].map(k=>`<option value="${k}" ${x.x===k?'selected':''}>${k<0?'< 0':k>0?'> 0':'0'}</option>`).join('')}</select></td><td><select data-ey="${i}">${[-1,0,1].map(k=>`<option value="${k}" ${x.y===k?'selected':''}>${k<0?'< 0':k>0?'> 0':'0'}</option>`).join('')}</select></td><td><button class="btn sm ghost" data-eq="${i}">×</button></td></tr>`).join('')}
    </tbody></table><button class="btn sm" id="bEsp">${T('Agregar indicador','Add indicator')}</button>
    <ul class="nota"><li><b>X = 0</b> ${T('restringe la capacidad del recurso para proteger la actividad','restricts resource capacity to protect the activity')}; <b>X &lt; 0</b> ${T('la restringe pero vulnera la actividad','restricts it but harms the activity')}; <b>X &gt; 0</b> ${T('no la restringe pero vulnera la actividad','does not restrict it but harms the activity')}.</li>
    <li><b>Y = 0</b> ${T('uso racional en el tiempo','rational use over time')}; <b>Y &lt; 0</b> ${T('no racional porque el recurso no se usa','not rational: resource unused')}; <b>Y &gt; 0</b> ${T('no racional porque se usa sin medida ni control','not rational: used without limit or control')}.</li></ul>${fuenteTesis()}</div></div></div>`; };
function espejo(){ const S=110, W=3*S+90, H=3*S+70; let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  for(let i=0;i<3;i++) for(let j=0;j<3;j++){ const c=i===1&&j===1; s+=`<rect x="${60+i*S}" y="${20+j*S}" width="${S-4}" height="${S-4}" rx="8" fill="${c?'var(--accent)':'var(--primary)'}" fill-opacity="${c?.18:.06}" stroke="var(--border)"/>`; }
  s+=`<text x="${60+1.5*S}" y="${H-8}" text-anchor="middle" font-size="12.5" class="m">X: ${T('restricción del recurso por la actividad','resource restriction by the activity')}</text>`+
     `<text transform="translate(18 ${20+1.5*S}) rotate(-90)" text-anchor="middle" font-size="12.5" class="m">Y: ${T('uso racional','rational use')}</text>`;
  ['< 0','0','> 0'].forEach((l,i)=>{ s+=`<text x="${60+i*S+S/2}" y="${20+3*S+14}" text-anchor="middle" font-size="12" class="m">${l}</text><text x="50" y="${20+(2-i)*S+S/2}" text-anchor="end" font-size="12" class="m">${l}</text>`; });
  const celdas={}; ST.espejo.forEach(x=>{ const k=(x.x+1)+','+(1-x.y); (celdas[k]=celdas[k]||[]).push(x.n); });
  Object.entries(celdas).forEach(([k,l])=>{ const [i,j]=k.split(',').map(Number); l.slice(0,5).forEach((n,q)=>{ s+=`<text x="${60+i*S+8}" y="${20+j*S+20+q*17}" font-size="12">${esc(n.slice(0,16))}</text>`; }); if(l.length>5) s+=`<text x="${60+i*S+8}" y="${20+j*S+20+5*17}" font-size="12" class="m">+${l.length-5}</text>`; });
  s+=`<text x="${60+1.5*S}" y="${20+1.5*S+S/2-12}" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--accent-text)">++++ ${T('estratégicos','strategic')}</text>`;
  return s+'</svg>'; }
PINTA.gei_ev = (el)=>{ $$('[data-prec]',el).forEach(i=>i.onchange=()=>{ ST.prec[+i.dataset.prec]=i.value===''?'':Math.max(0,Math.round(+i.value)); guardar(); pintar('gei'); });
  $('#iVC',el).onchange=(e)=>{ ST.vc=e.target.value; guardar(); pintar('gei'); }; $('#iVRUP',el).onchange=(e)=>{ ST.vrup=e.target.value; guardar(); pintar('gei'); };
  $$('[data-en]',el).forEach(i=>i.onchange=()=>{ ST.espejo[+i.dataset.en].n=i.value; guardar(); pintar('gei'); });
  $$('[data-ex]',el).forEach(i=>i.onchange=()=>{ ST.espejo[+i.dataset.ex].x=+i.value; guardar(); pintar('gei'); });
  $$('[data-ey]',el).forEach(i=>i.onchange=()=>{ ST.espejo[+i.dataset.ey].y=+i.value; guardar(); pintar('gei'); });
  $$('[data-eq]',el).forEach(b=>b.onclick=()=>{ ST.espejo.splice(+b.dataset.eq,1); guardar(); pintar('gei'); });
  $('#bEsp',el).onclick=()=>{ ST.espejo.push({n:T('Nuevo indicador','New indicator'), x:0, y:0}); guardar(); pintar('gei'); }; };

// =====================================================================
PINTA.prospectiva = ()=>{ const etiq=VARS_MICMAC.map(v=>T(v[0],v[1])); const M=ST.mic.M; const tot=M.flat().reduce((a,b)=>a+b,0);
  const mm = tot>0 ? micmac(M) : null; const act=ACTORES.map(a=>a.id); const mc = mactor(ST.mac.MID, ST.mac.MAO);
  const escs = ST.esc.ind.filter(x=>x.xd!==''&&isFinite(+x.xd));
  return `<div class="bhead"><div class="eyebrow">${T('Anticipación y complejidad','Anticipation and complexity')}</div><h1>${T('Prospectiva del sistema','System foresight')}</h1>
   <p class="lead">${T('Herramientas de análisis estructural (MICMAC), de juego de actores (MACTOR) y de escenarios no lineales, como en la tesis. Se alimentan con el juicio de los actores del taller: Ratio Telar calcula, tú aportas el conocimiento.','Structural analysis (MICMAC), actor strategy (MACTOR) and nonlinear scenarios, as in the thesis. They feed on workshop participants\' judgement: Ratio Telar computes, you bring the knowledge.')}</p></div>
  <div class="card"><h2>MICMAC · ${T('influencias entre variables','influence between variables')}</h2>
   <p>${T('Califica cuánto influye cada variable de la fila sobre la de la columna: 0 nula, 1 débil, 2 media, 3 fuerte. Las variables parten del Stack y de los actores de Calpan; puedes cambiarlas en una versión futura.','Rate how much each row variable influences each column: 0 none, 1 weak, 2 medium, 3 strong. Variables come from the Calpan Stack and actors.')}</p>
   <div class="mtxw"><table class="mtx"><thead><tr><th></th>${etiq.map((e,j)=>`<th class="rot" title="${esc(e)}">${j+1}. ${esc(e)}</th>`).join('')}</tr></thead><tbody>
   ${M.map((r,i)=>`<tr><th style="text-align:left">${i+1}. ${esc(etiq[i])}</th>${r.map((x,j)=> i===j?'<td class="dg"></td>':`<td><select data-m="${i},${j}">${[0,1,2,3].map(k=>`<option ${k===x?'selected':''}>${k}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}
   </tbody></table></div>
   <div class="row" style="gap:8px;margin-top:10px"><button class="btn sm ghost" id="bMic0">${T('Vaciar matriz','Clear matrix')}</button>
    ${mm?`<label class="row" style="gap:6px"><input type="radio" name="mv" value="directo" ${ST.mic.ver==='directo'?'checked':''}> ${T('Directo','Direct')}</label><label class="row" style="gap:6px"><input type="radio" name="mv" value="indirecto" ${ST.mic.ver==='indirecto'?'checked':''}> ${T('Indirecto','Indirect')} (M^${mm.iter})</label>`:''}</div>
   ${mm?`<div class="grid g2" style="margin-top:12px"><div>${planoMicmac(mm[ST.mic.ver], etiq, mm.umbral)}</div><div>
     ${Object.keys(ZONAS_MICMAC).map(z=>{ const l=mm[ST.mic.ver].filter(r=>r.zona===z); return `<p><b>${T(ZONAS_MICMAC[z][0],ZONAS_MICMAC[z][1])}</b> — <span class="nota">${T(ZONAS_MICMAC[z][2],ZONAS_MICMAC[z][3])}</span><br>${l.length?l.map(r=>esc(etiq[r.i])).join(', '):'<span class="sindato">—</span>'}</p>`; }).join('')}
     <p class="nota sci">${T('Directo: motricidad = suma de la fila; dependencia = suma de la columna (en %). Indirecto: se eleva la matriz a potencias hasta que la jerarquía se estabiliza (Godet, 2007). Umbrales: el promedio','Direct: influence = row sum; dependence = column sum (%). Indirect: matrix powers until the ranking stabilises (Godet, 2007). Thresholds: mean')} (${f1(mm.umbral)} %).</p></div></div>`
     :`<div class="empty"><p>${T('Califica al menos una influencia para ver el plano de influencia–dependencia.','Rate at least one influence to see the influence–dependence plane.')}</p></div>`}</div>
  <div class="card"><h2>MACTOR · ${T('juego de actores','actor strategies')}</h2>
   <div class="grid g2"><div><h4>${T('Influencias directas entre actores (0–4)','Direct influence between actors (0–4)')}</h4>
    <div class="mtxw"><table class="mtx"><thead><tr><th></th>${act.map(a=>`<th>${a}</th>`).join('')}</tr></thead><tbody>
    ${ST.mac.MID.map((r,i)=>`<tr><th>${act[i]}</th>${r.map((x,j)=>i===j?'<td class="dg"></td>':`<td><select data-mid="${i},${j}">${[0,1,2,3,4].map(k=>`<option ${k===x?'selected':''}>${k}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div></div>
    <div><h4>${T('Posición ante los objetivos (−3 a +3)','Position on objectives (−3 to +3)')}</h4>
    <div class="mtxw"><table class="mtx"><thead><tr><th></th>${ST.mac.obj.map((o,k)=>`<th title="${esc(o)}">O${k+1}</th>`).join('')}</tr></thead><tbody>
    ${ST.mac.MAO.map((r,i)=>`<tr><th>${act[i]}</th>${r.map((x,k)=>`<td><select data-mao="${i},${k}">${[-3,-2,-1,0,1,2,3].map(v=>`<option ${v===x?'selected':''}>${v}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <ol class="nota">${ST.mac.obj.map((o,k)=>`<li><input value="${esc(o)}" data-obj="${k}" style="width:100%"></li>`).join('')}</ol>
    <p class="nota">${marcaInterp()} ${T('Objetivos de ejemplo: edítalos con los del taller.','Example objectives: replace them with the workshop\'s.')}</p></div></div>
   <div class="grid g2"><div><h4>${T('Relación de fuerza de cada actor (rᵢ)','Force ratio of each actor (rᵢ)')}</h4>${barrasH(act.map((a,i)=>({l:a+' · '+T(ACTORES[i].es,ACTORES[i].en).slice(0,24), v:mc.r[i]||0, vl:f1(mc.r[i]||0,2)})),{izq:240})}</div>
    <div><h4>${T('Movilización por objetivo','Mobilisation per objective')}</h4>${barrasH(mc.movil.flatMap((m,k)=>[{l:'O'+(k+1)+' '+T('a favor','for'), v:m.pro, c:'var(--ok)', vl:f1(m.pro)},{l:'O'+(k+1)+' '+T('en contra','against'), v:m.contra, c:'var(--bad)', vl:f1(m.contra)}]),{izq:140})}</div></div>
   <p class="nota sci">MIDIᵢⱼ = MIDᵢⱼ + Σₖ min(MIDᵢₖ, MIDₖⱼ); Mᵢ, Dᵢ ${T('influencia y dependencia indirectas','indirect influence and dependence')}; rᵢ = Rᵢ*/R̄*, Rᵢ* = (Mᵢ/ΣM)·Mᵢ/(Mᵢ+Dᵢ); 3MAO = MAO·r (Godet, 2007).</p></div>
  <div class="card"><h2>${T('Escenarios futuribles','Future scenarios')}</h2>
   <p>${T('Para cada indicador estratégico: estado actual, estado deseado y ritmo de cambio. La trayectoria es logística, no lineal: lenta al inicio, rápida en la transición y estable al final.','For each strategic indicator: current state, desired state and pace. The path is logistic, not linear: slow at first, fast through the transition, stable at the end.')}</p>
   <table class="tbl"><thead><tr><th>${T('Indicador','Indicator')}</th><th>${T('Actual','Current')}</th><th>${T('Deseado','Desired')}</th><th>k</th><th>${T('Inflexión (años)','Inflection (yr)')}</th><th></th></tr></thead><tbody>
   ${ST.esc.ind.map((x,i)=>`<tr><td><input value="${esc(x.n)}" data-esn="${i}"></td><td><input type="number" step="any" value="${x.x0}" data-esx0="${i}" style="width:80px"></td><td><input type="number" step="any" value="${x.xd}" data-esxd="${i}" style="width:80px" placeholder="${T('meta','target')}"></td><td><input type="number" step="0.1" value="${x.k}" data-esk="${i}" style="width:64px"></td><td><input type="number" step="1" value="${x.t0}" data-est0="${i}" style="width:64px"></td><td><button class="btn sm ghost" data-esq="${i}">×</button></td></tr>`).join('')}
   </tbody></table><button class="btn sm" id="bEscAdd">${T('Agregar indicador','Add indicator')}</button>
   ${escs.length?escs.map(x=>`<h4 style="margin-top:14px">${esc(x.n)}</h4>${lineas([
      {l:T('Deseable','Desirable'), c:'var(--ok)', v:trayectoria(+x.x0,+x.xd,+x.k,+x.t0,ST.esc.H,1)},
      {l:T('Tendencial','Trend'), c:'var(--warn)', v:trayectoria(+x.x0,+x.xd,+x.k,+x.t0,ST.esc.H,.5), dash:true},
      {l:T('Regresivo','Regressive'), c:'var(--bad)', v:trayectoria(+x.x0,+x.xd,+x.k,+x.t0,ST.esc.H,-.25), dash:true}],{t0:ST.esc.t0})}`).join('')
    :`<p class="nota">${T('Escribe un estado deseado para trazar los escenarios. El valor actual del ejemplo (5.5 t/ha) es el punto medio del rendimiento publicado para Calpan (5–6 t).','Enter a desired state to draw the scenarios. The example current value (5.5 t/ha) is the midpoint of the published Calpan yield (5–6 t).')}</p>`}
   <div class="formula sci">x(t) = x₀ + (x_d − x₀)·a·L(t), L(t) = [σ(k(t−t₀)) − σ(−k t₀)] / [1 − σ(−k t₀)], σ(z) = 1/(1+e^(−z)); a = 1 ${T('deseable','desirable')}, 0.5 ${T('tendencial','trend')}, −0.25 ${T('regresivo','regressive')}.</div>
   <p class="nota">${marcaInterp()} ${T('Las fracciones de los escenarios tendencial (0.5) y regresivo (−0.25) son supuestos de Ratio Telar para ilustrar la no linealidad.','Trend (0.5) and regressive (−0.25) fractions are Ratio Telar assumptions to illustrate nonlinearity.')}</p></div>`; };
PINTA.prospectiva_ev = (el)=>{ $$('[data-m]',el).forEach(s=>s.onchange=()=>{ const [i,j]=s.dataset.m.split(',').map(Number); ST.mic.M[i][j]=+s.value; guardar(); pintar('prospectiva'); });
  $('#bMic0',el).onclick=()=>{ ST.mic.M=ST.mic.M.map(r=>r.map(()=>0)); guardar(); pintar('prospectiva'); };
  $$('input[name=mv]',el).forEach(r=>r.onchange=()=>{ ST.mic.ver=r.value; guardar(); pintar('prospectiva'); });
  $$('[data-mid]',el).forEach(s=>s.onchange=()=>{ const [i,j]=s.dataset.mid.split(',').map(Number); ST.mac.MID[i][j]=+s.value; guardar(); pintar('prospectiva'); });
  $$('[data-mao]',el).forEach(s=>s.onchange=()=>{ const [i,k]=s.dataset.mao.split(',').map(Number); ST.mac.MAO[i][k]=+s.value; guardar(); pintar('prospectiva'); });
  $$('[data-obj]',el).forEach(s=>s.onchange=()=>{ ST.mac.obj[+s.dataset.obj]=s.value; guardar(); });
  const upd=(attr,key,num)=>$$(`[data-${attr}]`,el).forEach(s=>s.onchange=()=>{ ST.esc.ind[+s.dataset[attr]][key]= num ? (s.value===''?'':+s.value) : s.value; guardar(); pintar('prospectiva'); });
  upd('esn','n',false); upd('esx0','x0',true); upd('esxd','xd',true); upd('esk','k',true); upd('est0','t0',true);
  $$('[data-esq]',el).forEach(b=>b.onclick=()=>{ ST.esc.ind.splice(+b.dataset.esq,1); guardar(); pintar('prospectiva'); });
  $('#bEscAdd',el).onclick=()=>{ ST.esc.ind.push({n:T('Nuevo indicador','New indicator'), x0:0, xd:'', k:0.6, t0:5}); guardar(); pintar('prospectiva'); }; };

// =====================================================================
PINTA.ahorro = ()=>{ const res=ahorro(ST.aho.filas, +ST.aho.ha||0); const conDatos=res.filter(r=>r.ah!=null);
  return `<div class="bhead"><div class="eyebrow">${T('Lo que cuesta y lo que se cuida','What it costs and what it saves')}</div><h1>${T('Ahorro de recursos','Resource savings')}</h1>
   <p class="lead">${T('Compara, por hectárea, la forma local de producir con una forma convencional de referencia. Ratio Telar calcula el ahorro por hectárea, en toda tu superficie y en porcentaje.','Compare, per hectare, the local way of farming with a conventional reference. Ratio Telar computes savings per hectare, over your whole area and as a percentage.')}</p></div>
  <div class="card"><div class="row" style="gap:10px;align-items:end"><label class="f" style="max-width:220px"><span class="h">${T('Superficie de la unidad (ha)','Farm area (ha)')}</span><input type="number" step="0.1" min="0" id="iHa" value="${ST.aho.ha}"></label>
   <p class="nota">${T('Calpan: unidades de producción menores a 5 ha; parcelas de seguimiento de 1.8 y 1.5 ha.','Calpan: farms under 5 ha; monitoring plots of 1.8 and 1.5 ha.')}</p></div>
   <table class="tbl"><thead><tr><th>${T('Recurso','Resource')}</th><th>${T('Unidad','Unit')}</th><th>${T('Convencional','Conventional')}</th><th>${T('Local','Local')}</th><th class="r">${T('Ahorro / ha','Saving / ha')}</th><th class="r">${T('Ahorro total','Total saving')}</th><th class="r">%</th></tr></thead><tbody>
   ${res.map((r,i)=>`<tr><td>${T(AHORRO_FILAS[i][0],AHORRO_FILAS[i][1])}</td><td class="nota">${AHORRO_FILAS[i][2]}</td><td><input type="number" step="any" data-ac="${i}" value="${r.conv}" style="width:100px"></td><td><input type="number" step="any" data-al="${i}" value="${r.local}" style="width:100px"></td>
    <td class="r">${r.ah!=null?f1(r.ah):'—'}</td><td class="r">${r.tot!=null?f1(r.tot):'—'}</td><td class="r" style="color:var(--${r.pct==null?'muted':r.pct>=0?'ok-text':'bad-text'})">${r.pct!=null?f1(r.pct)+' %':'—'}</td></tr>`).join('')}
   </tbody></table>
   <div class="formula">${T('Ahorro/ha = convencional − local; ahorro total = ahorro/ha × superficie; % = ahorro/ha ÷ convencional × 100','Saving/ha = conventional − local; total = saving/ha × area; % = saving/ha ÷ conventional × 100')}</div>
   ${conDatos.length?barrasH(conDatos.map(r=>{ const i=ST.aho.filas.indexOf(ST.aho.filas.find(f=>f.r===r.r)); return {l:T(AHORRO_FILAS[i][0],AHORRO_FILAS[i][1]), v:Math.max(0,r.pct), c:r.pct>=0?'var(--ok)':'var(--bad)', vl:f1(r.pct)+' %'}; }),{max:100,izq:240})
    :`<p class="sindato">${T('Las fuentes de Ratio Telar no publican consumos por hectárea para Calpan. Escribe los de tu unidad y los de una referencia convencional para calcular el ahorro.','Ratio Telar sources do not publish per-hectare use for Calpan. Enter your farm\'s values and a conventional reference to compute savings.')}</p>`}</div>`; };
PINTA.ahorro_ev = (el)=>{ $('#iHa',el).onchange=(e)=>{ ST.aho.ha=+e.target.value||0; guardar(); pintar('ahorro'); };
  $$('[data-ac]',el).forEach(i=>i.onchange=()=>{ ST.aho.filas[+i.dataset.ac].conv=i.value; guardar(); pintar('ahorro'); });
  $$('[data-al]',el).forEach(i=>i.onchange=()=>{ ST.aho.filas[+i.dataset.al].local=i.value; guardar(); pintar('ahorro'); }); };

// =====================================================================
PINTA.tablero = ()=>{ const pr=promPrec(); const mu=metricasRed(ST.red.nodos, ST.red.aristas); const e=estadoDe(ST.est), m=munDe(ST.est,ST.mun);
  const odsCubiertos = new Set(DIMENSIONES.flatMap(d=>d.ods)); const v=valsPrec();
  const odsVal = ODS.map(o=>{ const ps=PRECEPTOS.map((p,i)=>p.ods.includes(o[0])&&v[i]!=null?v[i]:null).filter(x=>x!=null); return ps.length? ps.reduce((a,b)=>a+b,0)/ps.length : null; });
  return `<div class="bhead"><div class="eyebrow">${esc(m?m[1]:'')}, ${esc(e?e[1]:'')} · ${nomReg(ST.reg)}</div><h1>${T('Tablero de gestión estratégica integrada','Integrated strategic management dashboard')}</h1>
   <p class="lead">${T('El sistema completo en una vista: conocimiento, actores, recursos y sostenibilidad, hilados entre sí.','The whole system at a glance: knowledge, actors, resources and sustainability, woven together.')}</p></div>
  <div class="kpis">
   <div class="kpi"><div class="l">${T('Pasos del Stack','Stack steps')}</div><div class="v">38</div><div class="s">83 ${T('actividades','activities')} · 5B</div></div>
   <div class="kpi"><div class="l">${T('IIC máximo publicado','Highest published IIC')}</div><div class="v">100</div><div class="s">${T('siembra','sowing')}</div></div>
   <div class="kpi"><div class="l">${T('Articulador de la red','Network weaver')}</div><div class="v">AL</div><div class="s">${T('centralidad 16 · intermediación 12.33','centrality 16 · betweenness 12.33')}</div></div>
   <div class="kpi"><div class="l">${T('Cumplimiento de preceptos','Precept compliance')}</div><div class="v">${pr!=null?f1(pr,2):'—'}</div><div class="s">${pr!=null?T(leerRegla(pr).es,leerRegla(pr).en).split(':')[0]:T('sin evaluar','not assessed')}</div></div>
   <div class="kpi"><div class="l">${T('Densidad de tu red','Your network density')}</div><div class="v">${f1(mu.densidad,2)}</div><div class="s">${ST.red.nodos.length} ${T('actores','actors')} · ${ST.red.aristas.length} ${T('vínculos','ties')}</div></div>
  </div>
  <div class="tablero" style="margin-top:14px">
   <div class="card t6"><h3>${T('El telar del sistema','The system loom')}</h3>${telarSistema()}<p class="nota">${marcaInterp()} ${T('Esquema de Ratio Telar que une los hilos del modelo: territorio, Stack, actores, recursos, dimensiones y ODS.','Ratio Telar diagram linking the model threads: territory, Stack, actors, resources, dimensions and SDGs.')}</p></div>
   <div class="card t6"><h3>${T('Calendario del Stack','Stack calendar')}</h3>${ruedaStack(ST.siembra, null)}</div>
   <div class="card t4"><h3>${T('Perfil de preceptos','Precept profile')}</h3>${radar(v.map(x=>x||0), PRECEPTOS.map(p=>'P'+p.n),null,{w:380})}${pr==null?`<p class="nota">${T('Evalúa tu unidad en Gestión integrada.','Assess your farm in Integrated management.')}</p>`:''}</div>
   <div class="card t4"><h3>${T('Red de actores (tuya)','Actor network (yours)')}</h3>${dibujarRed(ST.red.nodos.map(n=>({...n,col:'var(--primary)'})), ST.red.aristas, mu, {clave:'inter', h:340, w:420})}</div>
   <div class="card t4"><h3>${T('Intensidad de conocimiento','Knowledge intensity')}</h3>${barrasH(PASOS.filter(p=>p.iic).sort((a,b)=>b.iic-a.iic).map(p=>({l:p.n+'. '+T(p.es,p.en).slice(0,20), v:p.iic, c:colB(p.b), vl:f1(p.iic)})),{max:100,izq:190,w:440,fila:24})}</div>
   <div class="card t12"><h3>${T('Los 17 ODS en este sistema','The 17 SDGs in this system')}</h3>
    <div class="ods-grid">${ODS.map((o,i)=>`<div class="ods-c ${odsCubiertos.has(o[0])?'on':''}" style="background:${o[3]}" title="${odsVal[i]!=null?T('preceptos relacionados','related precepts')+': '+f1(odsVal[i],2):''}"><b>${o[0]}${odsVal[i]!=null?` · ${f1(odsVal[i],2)}`:''}</b>${esc(T(o[1],o[2]))}</div>`).join('')}</div>
    <p class="nota">${T('Encendidos: ODS relacionados con alguna de las nueve dimensiones (relación propuesta). El número junto al ODS es el promedio de los preceptos de tu evaluación que lo tocan. El artículo vincula expresamente el conocimiento local con los ODS 2 y 15.','Lit: SDGs linked to one of the nine dimensions (proposed link). The number is the mean of your assessed precepts touching it. The paper explicitly links local knowledge to SDGs 2 and 15.')}</p></div>
  </div>`; };
function telarSistema(){ const W=560,H=380; const hilos=[['Territorio','Territory','var(--tierra)'],['Stack (5B)','Stack (5B)','var(--semilla)'],['Actores','Actors','var(--accent)'],['Recursos','Resources','var(--info)'],['Dimensiones','Dimensions','var(--vigil)'],['ODS','SDGs','var(--ok)']];
  const tramas=[['Socioeconómico','Socio-economic'],['Ambiental','Environmental'],['Turístico-ecotec.','Tourism–eco-tech']];
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`; const x0=150, dx=(W-x0-30)/(hilos.length-1);
  hilos.forEach((h,i)=>{ const x=x0+i*dx; s+=`<line x1="${x}" y1="30" x2="${x}" y2="${H-50}" stroke="${h[2]}" stroke-width="7" stroke-linecap="round" opacity=".85"/><text x="${x}" y="${H-28}" text-anchor="middle" font-size="12.5" font-weight="700">${esc(T(h[0],h[1]))}</text>`; });
  tramas.forEach((t,j)=>{ const y=80+j*95; let d=`M ${x0-20} ${y}`; hilos.forEach((h,i)=>{ const x=x0+i*dx; d+=` Q ${x-dx/2} ${y+((i+j)%2?16:-16)} ${x} ${y}`; });
    s+=`<path d="${d} L ${W-10} ${y}" fill="none" stroke="var(--text)" stroke-width="3" opacity=".55"/><text x="10" y="${y+4}" font-size="13" font-weight="700">${esc(T(t[0],t[1]))}</text>`; });
  s+=`<text x="${(x0+W)/2}" y="16" text-anchor="middle" font-size="12" class="m">${T('urdimbre: hilos del sistema · trama: fundamentos de la GEI','warp: system threads · weft: management foundations')}</text>`;
  return s+'</svg>'; }

// =====================================================================
PINTA.ciencia = ()=>`<div class="bhead"><div class="eyebrow">${T('Fundamentos','Foundations')}</div><h1>${T('Ciencia detrás del telar','Science behind the loom')}</h1>
  <p class="lead">${T('Sistemas complejos adaptativos, racionalidad ambiental, conocimiento tácito y explícito, análisis de redes y prospectiva estratégica.','Complex adaptive systems, environmental rationality, tacit and explicit knowledge, network analysis and strategic foresight.')}</p></div>
  <div class="grid g2">
   <div class="card"><h2>${T('Por qué un sistema complejo adaptativo','Why a complex adaptive system')}</h2>
    <p>${T('En la tesis, las relaciones entre los fundamentos interactúan de manera caórdica —entre el orden y el caos (Prigogine, 1983)—, en una estructura en red donde el todo no es la suma de las partes, cada elemento es un subsistema con autonomía y dependencia, y emergen atractores y resiliencia.','In the thesis, the foundations interact chaordically — between order and chaos (Prigogine, 1983) — in a network where the whole is not the sum of its parts, each element is a subsystem with autonomy and dependence, and attractors and resilience emerge.')}</p>
    <p>${T('En el artículo, el conocimiento local es un proceso dinámico de aprendizaje y adaptación: se construye experimentando en parcela, se transmite entre generaciones y se intercambia entre actores. El Stack lo ordena en capas interdependientes con cuatro rasgos: multidimensionalidad, jerarquización, interdisciplinariedad y aplicabilidad.','In the paper, local knowledge is a dynamic learning-and-adaptation process: built by experimenting in the field, passed between generations and exchanged between actors. The Stack orders it in interdependent layers with four traits: multidimensionality, hierarchy, interdisciplinarity and applicability.')}</p>${fuenteTesis()}${fuenteArt()}</div>
   <div class="card"><h2>${T('Fórmulas','Formulas')}</h2>
    <p><b>${T('Valor de un precepto','Precept value')}</b></p><div class="formula">vᵢ = min(1, nᵢ · pᵢ) ; ${T('precepto 8','precept 8')}: v₈ = 1 ${T('si','if')} n₈ &gt; 0</div>
    <p><b>${T('Nivel de conocimiento ambiental','Environmental knowledge level')}</b></p><div class="formula">NCA = (VC + VRUP) × VMPUP</div>
    <p><b>${T('Centralidad e intermediación','Centrality and betweenness')}</b></p><div class="formula">C_B(v) = Σ_{s≠v≠t} σ_st(v) / σ_st ; C_C(v) = (r/(n−1)) · (r / Σ_t d(v,t))</div>
    <p><b>MICMAC</b></p><div class="formula">I_i = Σ_j M_ij ; D_j = Σ_i M_ij ; ${T('indirecto','indirect')}: M^k</div>
    <p><b>MACTOR</b></p><div class="formula">MIDI_ij = MID_ij + Σ_k min(MID_ik, MID_kj) ; r_i = R_i*/R̄*</div>
    <p><b>${T('Escenario logístico','Logistic scenario')}</b></p><div class="formula">x(t) = x₀ + (x_d − x₀)·a·L(t)</div></div></div>
  <div class="card"><h2>${T('Referencias','References')}</h2><ol>
   <li>${esc(ART.cita)} <a href="https://doi.org/${ART.doi}" target="_blank" rel="noopener">https://doi.org/${ART.doi}</a></li>
   <li>${esc(TESIS.cita)}</li>
   <li>INEGI. 2020. Censo de Población y Vivienda 2020; ${T('Catálogo Único de Claves Geoestadísticas','geostatistical catalogue')}.</li>
   <li>Banco de México. Reporte sobre las Economías Regionales (${T('regionalización','regionalisation')}).</li>
   <li>${T('Naciones Unidas','United Nations')}. 2015. ${T('Transformar nuestro mundo: la Agenda 2030 para el Desarrollo Sostenible','Transforming our world: the 2030 Agenda for Sustainable Development')}.</li>
   ${TEORIA.map(t=>`<li>${esc(t.c)} <span class="nota">— ${esc(t.t)}</span></li>`).join('')}</ol></div>
  <div class="card"><h2>${T('Alcances y límites','Scope and limits')}</h2><ul>
   <li>${T('El caso documentado es Calpan, Puebla (maíz criollo). Para los demás municipios se muestra el catálogo oficial y se invita a documentar su propio Stack.','The documented case is Calpan, Puebla (landrace maize). Other municipalities show the official catalogue and invite documenting their own Stack.')}</li>
   <li>${T('Del IIC solo se publicaron 11 de los 38 valores; Ratio Telar no completa los faltantes.','Only 11 of 38 IIC values were published; Ratio Telar does not fill the gaps.')}</li>
   <li>${T('La red publicada informa centralidades por grupo, no los pesos de cada vínculo; la red que dibuja la app para Calpan es esquemática.','The published network reports group centralities, not tie weights; the Calpan network drawn here is schematic.')}</li>
   <li>${T('MICMAC, MACTOR y los escenarios son herramientas: sus resultados dependen de los juicios que capture el taller.','MICMAC, MACTOR and scenarios are tools: results depend on the judgements captured by the workshop.')}</li>
   <li>${T('La producción agrícola por municipio (SIAP) se integrará cuando su servicio de datos abiertos esté disponible.','Municipal crop production (SIAP) will be added when its open-data service is available.')}</li></ul></div>`;

// ---------- arranque ----------
function exportar(){ const b=new Blob([JSON.stringify({app:'Ratio Telar', version:CONFIG.version, fecha:new Date().toISOString(), territorio:{region:ST.reg, estado:ST.est, municipio:ST.mun}, estado:ST},null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='ratio-telar.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); }
function importar(f){ const r=new FileReader(); r.onload=()=>{ try{ const d=JSON.parse(r.result); if(d.estado&&d.estado.prec){ ST=Object.assign(estadoInicial(), d.estado); guardar(); repintar(); } }catch(e){ alert(T('Archivo no válido','Invalid file')); } }; r.readAsText(f); }
document.addEventListener('click',(e)=>{ const t=e.target.closest('[data-sec],[data-ir],[data-modo]'); if(!t) return;
  if(t.dataset.sec) ir(t.dataset.sec); else if(t.dataset.ir) ir(t.dataset.ir); else if(t.dataset.modo){ ST.modo=t.dataset.modo; guardar(); repintar(); } });
function arrancar(){ let g=null; try{ g=localStorage.getItem('ratio-telar-lang'); }catch(e){} LANG = g || ((navigator.language||'es').slice(0,2)==='en' ? 'en' : 'es');
  const tema = (()=>{ try{ return localStorage.getItem('ratio-telar-tema'); }catch(e){ return null; } })(); if(tema) document.documentElement.dataset.theme=tema;
  $('#bLang').onclick=()=>{ LANG = LANG==='es'?'en':'es'; try{ localStorage.setItem('ratio-telar-lang',LANG); }catch(e){} repintar(); };
  $('#bModo').onclick=()=>{ ST.modo = ST.modo==='prod'?'cien':'prod'; guardar(); repintar(); };
  $('#bTema').onclick=()=>{ const r=document.documentElement; const osc = r.dataset.theme ? r.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; r.dataset.theme = osc?'light':'dark'; try{ localStorage.setItem('ratio-telar-tema', r.dataset.theme); }catch(e){} };
  $('#bExp').onclick=exportar; $('#fImp').onchange=(e)=>{ if(e.target.files[0]) importar(e.target.files[0]); };
  $('#bImp').onclick=()=>$('#fImp').click(); $('#bImpr').onclick=()=>print();
  $$('.sec').forEach(s=>s.classList.toggle('on', s.id==='s-'+ST.sec)); repintar(); }
document.addEventListener('DOMContentLoaded', arrancar);
