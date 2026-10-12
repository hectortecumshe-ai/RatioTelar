"use strict";
/* =====================================================================
   1. DATOS BASE · CONFIGURACIÓN, IDIOMA, ESTADO Y CATÁLOGO
   Ratio Telar — Ratio Complexus («lo que está tejido junto»)
   ===================================================================== */
const CONFIG = {
  app:'Ratio Telar', version:'0.4.0', anio:2026, doi:'10.5281/zenodo.23293557',
  repo:'https://github.com/hectortecumshe-ai/RatioTelar',
  autores:'Héctor Tecumshé Mojica-Zárate · Óscar Díaz-José · Luis Ángel Barrera-Guzmán · Guadalupe Velázquez-Vázquez',
  citaAutores:{es:'Mojica-Zárate, H. T., Díaz-José, O., Barrera-Guzmán, L. A., y Velázquez-Vázquez, G.',en:'Mojica-Zárate, H. T., Díaz-José, O., Barrera-Guzmán, L. A., & Velázquez-Vázquez, G.'},
  titulo:{es:'El conocimiento agrícola local como sistema complejo adaptativo',en:'Local farming knowledge as a complex adaptive system'}
};
let LANG = 'es', MODO = 'prod';
try{ LANG = localStorage.getItem('telar_lang') || ((navigator.language||'es').slice(0,2)==='en'?'en':'es'); MODO = localStorage.getItem('telar_modo') || 'prod'; }catch(e){}
const T = (es,en)=> LANG==='en' ? en : es;
const tx = o => o==null ? '' : (typeof o==='string' ? o : (LANG==='en' ? (o.en??o.es) : (o.es??o.en)));
const E = (es,en)=>({es,en});
const LOC = ()=> LANG==='en' ? 'en-US' : 'es-MX';

/* ---------- Catálogo de cultivos y especies (Bloque 1) ----------
   doc: 'stack' = con Stack de conocimiento local documentado; 'base' = catálogo para documentar.  */
const CATALOGO = [
  {id:'uva', tipo:'cultivo', ico:'c-uva', n:E('Uva (vid)','Grape (vine)'), sci:'Vitis spp.', doc:'base', col:'#6b3fa0', destacado:true},
  {id:'maiz', tipo:'cultivo', ico:'c-maiz', n:E('Maíz criollo','Landrace maize'), sci:'Zea mays L.', doc:'stack', col:'#d9a441'},
  {id:'chayote', tipo:'cultivo', ico:'c-chayote', n:E('Chayote','Chayote'), sci:'Sechium edule (Jacq.) Sw.', doc:'base', col:'#7fa84f'},
  {id:'frijol', tipo:'cultivo', ico:'c-frijol', n:E('Frijol','Common bean'), sci:'Phaseolus vulgaris L.', doc:'base', col:'#7a3b3b'},
  {id:'calabaza', tipo:'cultivo', ico:'c-calabaza', n:E('Calabaza','Squash'), sci:'Cucurbita spp.', doc:'base', col:'#e8913a'},
  {id:'chile', tipo:'cultivo', ico:'c-chile', n:E('Chile','Chili pepper'), sci:'Capsicum annuum L.', doc:'base', col:'#c9302c'},
  {id:'cafe', tipo:'cultivo', ico:'c-cafe', n:E('Café','Coffee'), sci:'Coffea arabica L.', doc:'base', col:'#7d5a2c'},
  {id:'cacao', tipo:'cultivo', ico:'c-cacao', n:E('Cacao','Cacao'), sci:'Theobroma cacao L.', doc:'base', col:'#8a3a2a'},
  {id:'aguacate', tipo:'cultivo', ico:'c-aguacate', n:E('Aguacate','Avocado'), sci:'Persea americana Mill.', doc:'base', col:'#3f6b2a'},
  {id:'maguey', tipo:'cultivo', ico:'c-maguey', n:E('Maguey','Agave'), sci:'Agave spp.', doc:'base', col:'#6f9e8a'},
  {id:'nopal', tipo:'cultivo', ico:'c-nopal', n:E('Nopal','Prickly pear'), sci:'Opuntia spp.', doc:'base', col:'#6aa148'},
  {id:'jitomate', tipo:'cultivo', ico:'c-jitomate', n:E('Jitomate','Tomato'), sci:'Solanum lycopersicum L.', doc:'base', col:'#d7372e'},
  {id:'trigo', tipo:'cultivo', ico:'c-trigo', n:E('Trigo','Wheat'), sci:'Triticum aestivum L.', doc:'base', col:'#c9a24a'},
  {id:'cana', tipo:'cultivo', ico:'c-cana', n:E('Caña de azúcar','Sugarcane'), sci:'Saccharum officinarum L.', doc:'base', col:'#7d9a3a'},
  {id:'jamaica', tipo:'cultivo', ico:'c-jamaica', n:E('Jamaica','Roselle (jamaica)'), sci:'Hibiscus sabdariffa L.', doc:'base', col:'#c2185b'},
  {id:'maracuya', tipo:'cultivo', ico:'c-maracuya', n:E('Maracuyá','Passion fruit'), sci:'Passiflora edulis Sims', doc:'base', col:'#e3b92f'},
  {id:'guanabana', tipo:'cultivo', ico:'c-guanabana', n:E('Guanábana','Soursop'), sci:'Annona muricata L.', doc:'base', col:'#5f9a4a'},
  {id:'mango', tipo:'cultivo', ico:'c-mango', n:E('Mango','Mango'), sci:'Mangifera indica L.', doc:'base', col:'#f2a33a'},
  {id:'granja', tipo:'especie', ico:'a-granja', n:E('Granja de traspatio','Backyard farm'), sci:E('Varias especies','Several species'), doc:'base', col:'#b5462a', especial:true},
  {id:'bovino', tipo:'especie', ico:'i-steer', n:E('Bovino','Cattle'), sci:'Bos taurus / B. indicus', doc:'base', col:'#8a4b2e'},
  {id:'porcino', tipo:'especie', ico:'a-cerdo', n:E('Porcino','Pig'), sci:'Sus scrofa domesticus', doc:'base', col:'#e3a3a0'},
  {id:'ovino', tipo:'especie', ico:'a-ovino', n:E('Ovino','Sheep'), sci:'Ovis aries', doc:'base', col:'#8a8f86'},
  {id:'caprino', tipo:'especie', ico:'a-caprino', n:E('Caprino','Goat'), sci:'Capra hircus', doc:'base', col:'#c9a27a'},
  {id:'ave', tipo:'especie', ico:'i-chicken', n:E('Aves de traspatio','Backyard poultry'), sci:'Gallus gallus domesticus', doc:'base', col:'#b05434'},
  {id:'abeja', tipo:'especie', ico:'a-abeja', n:E('Abeja melífera (apiario)','Honeybee (apiary)'), sci:'Apis mellifera L.', doc:'base', col:'#f4c242', up:'apiario'},
  {id:'conejo', tipo:'especie', ico:'a-conejo', n:E('Conejo','Rabbit'), sci:'Oryctolagus cuniculus', doc:'base', col:'#b8a58c'},
  {id:'gallo', tipo:'especie', ico:'a-gallo', n:E('Gallos de pelea','Gamefowl'), sci:'Gallus gallus domesticus', doc:'base', col:'#c9622a'},
  {id:'chinicuil', tipo:'especie', ico:'a-chinicuil', n:E('Chinicuil (gusano rojo de maguey)','Chinicuil (red agave worm)'), sci:'Comadia redtenbacheri', doc:'base', col:'#c62f2f'}
];
/* Razas de maíz de México (CONABIO, 2020; clasificación de Sánchez et al., 2000): 64 razas en 7 grupos.
   RAZAS_EXT: descritas inicialmente fuera de México (Caribe y Guatemala) pero colectadas en el país. */
const RAZAS_MAIZ = [
  {g:E('Cónico','Conical'), r:['Arrocillo','Cacahuacintle','Cónico','Cónico Norteño','Chalqueño','Dulce','Elotes cónicos','Mixteco','Mushito','Mushito de Michoacán','Negrito','Palomero de Chihuahua','Palomero de Jalisco','Palomero toluqueño','Uruapeño']},
  {g:E('Sierra de Chihuahua','Sierra de Chihuahua'), r:['Apachito','Azul','Complejo Serrano de Jalisco','Cristalino de Chihuahua','Gordo','Mountain Yellow (Amarillo de Montaña)']},
  {g:E('Ocho Hileras','Eight-rowed'), r:['Ancho','Blando','Bofo','Bolita','Elotes occidentales','Harinoso de ocho','Jala','Onaveño','Tablilla de ocho','Tabloncillo','Tabloncillo Perla','Zamorano Amarillo']},
  {g:E('Chapalote','Chapalote'), r:['Chapalote','Dulcillo del Noroeste','Elotero de Sinaloa','Reventador']},
  {g:E('Tropicales precoces','Early tropical'), r:['Conejo','Nal-Tel','Ratón','Zapalote Chico']},
  {g:E('Dentados tropicales','Tropical dents'), r:['Celaya','Chiquito','Choapaneco','Cubano Amarillo','Nal-Tel de Altura','Pepitilla','Tepecintle','Tuxpeño','Tuxpeño Norteño','Vandeño','Zapalote Grande']},
  {g:E('Maduración tardía','Late maturing'), r:['Dzit Bacal','Comiteco','Coscomatepec','Mixeño','Motozinteco','Negro de Chimaltenango','Olotillo','Olotón','Quicheño','Serrano','Serrano Mixe','Tehua']}
];
const RAZAS_EXT = ['Cubano Amarillo','Nal-Tel de Altura','Serrano','Negro de Chimaltenango','Quicheño'];
const SISTEMAS = [
  {id:'milpa', n:E('Milpa (maíz–frijol–calabaza)','Milpa (maize–bean–squash)'), doc:true},
  {id:'vinedo', n:E('Viñedo (espaldera o parral)','Vineyard (trellis or pergola)'), doc:false},
  {id:'miaf', n:E('MIAF (maíz intercalado con árboles frutales)','MIAF (maize intercropped with fruit trees)'), doc:true},
  {id:'mono', n:E('Monocultivo','Monoculture'), doc:false},
  {id:'agrofor', n:E('Sistema agroforestal','Agroforestry system'), doc:false},
  {id:'traspatio', n:E('Traspatio o solar','Backyard (solar)'), doc:false},
  {id:'pastoreo', n:E('Pastoreo o agostadero','Grazing or rangeland'), doc:false},
  {id:'apiario', n:E('Apiario (colmenas fijas o trashumantes)','Apiary (fixed or migratory hives)'), doc:false},
  {id:'cinegetico', n:E('Rancho cinegético (vida silvestre bajo manejo, UMA)','Game ranch (managed wildlife, UMA)'), doc:false},
  {id:'confinado', n:E('Producción en confinamiento','Confined production'), doc:false}
];
const TIPOS_UP = [E('Milpa','Milpa'),E('Parcela','Plot'),E('Unidad de producción agrícola','Farm (crops)'),E('Unidad de producción pecuaria','Farm (livestock)'),E('Unidad mixta agrícola–pecuaria','Mixed crop–livestock farm'),E('Rancho cinegético (UMA de aprovechamiento cinegético)','Game ranch (UMA for hunting use)'),E('Apiario (unidad de producción apícola)','Apiary (beekeeping unit)')];

/* Subcategoría de bovinos: propósito → sistema de producción (régimen) → razas.
   Tipología usual de la ganadería bovina en México (carne: vaca–becerro, desarrollo en pastoreo y engorda en corral;
   leche: familiar o de traspatio, semiespecializado y especializado o intensivo; doble propósito en el trópico).
   Las razas son una lista orientativa de las que se crían en el país: «Lectura de Ratio Telar»; verifícalas con la asociación de criadores. */
const REGIMEN = {ext:E('Extensivo','Extensive'), semi:E('Semiintensivo','Semi-intensive'), int:E('Intensivo','Intensive'), tras:E('Traspatio (pequeña escala)','Backyard (small scale)')};
const REG_SIS = {ext:'pastoreo', semi:'pastoreo', int:'confinado', tras:'traspatio'};
const BOV_CEBU = ['Brahman','Indobrasil','Gyr','Nelore','Guzerat','Sardo Negro'];
const BOV_EUR_C = ['Angus','Hereford','Charolais','Simmental','Limousin','Beefmaster','Brangus','Santa Gertrudis','Simbrah','Charbray'];
const BOV = [
  {id:'carne', n:E('Ganado productor de carne','Beef cattle'), col:'#8a4b2e', sis:[
    {id:'vacabecerro', reg:'ext', n:E('Sistema vaca–becerro','Cow–calf system'), d:E('Hato de vientres en pastoreo o agostadero que pare y cría becerros hasta el destete, para venta o para engorda.','Breeding herd on pasture or rangeland raising calves to weaning, for sale or finishing.'),
      r:[[E('Cebuinas','Zebu'),BOV_CEBU],[E('Europeas y sintéticas','European and composite'),BOV_EUR_C],[E('Cruzas y criollas','Crosses and criollo'),['Cruza cebú × europeo','Criollo']]]},
    {id:'repasto', reg:'ext', n:E('Desarrollo y engorda en pastoreo (repasto)','Stocker and grass finishing'), d:E('Becerros destetados que ganan peso en praderas o agostadero antes de venderse o de entrar al corral.','Weaned calves gaining weight on pasture before sale or feedlot entry.'),
      r:[[E('Cebuinas','Zebu'),BOV_CEBU],[E('Europeas y sintéticas','European and composite'),BOV_EUR_C],[E('Cruzas','Crosses'),['Cruza cebú × europeo']]]},
    {id:'corral', reg:'int', n:E('Engorda en corral (finalización intensiva)','Feedlot finishing'), d:E('Toretes y novillos en corral con dieta de alta energía hasta el peso de mercado (el caso que formula RatioBos).','Bulls and steers in pens on high-energy diets to market weight (the case RatioBos formulates).'),
      r:[[E('Europeas y sintéticas','European and composite'),['Charolais','Angus','Hereford','Simmental','Limousin','Beefmaster','Brangus','Charbray','Simbrah']],[E('Cebuinas','Zebu'),['Brahman','Indobrasil','Nelore']],[E('Cruzas y otras','Crosses and others'),['Cruza cebú × europeo','Holstein (machos)']]]}]},
  {id:'leche', n:E('Ganado productor de leche','Dairy cattle'), col:'#2f6b8a', sis:[
    {id:'lechetras', reg:'tras', n:E('Lechería familiar o de traspatio','Family or backyard dairy'), d:E('Pocas vacas en el solar o junto a la casa, ordeña manual o con equipo sencillo; leche para la familia, el queso o la venta local.','A few cows by the house, hand or simple machine milking; milk for the family, cheese or local sale.'),
      r:[[E('Lecheras','Dairy'),['Holstein','Jersey','Pardo Suizo']],[E('Cruzas y criollas','Crosses and criollo'),['Cruza Holstein × cebú','Cruza Pardo Suizo × cebú','Criollo Lechero Tropical','Criollo']]]},
    {id:'lechesemi', reg:'semi', n:E('Lechería semiespecializada','Semi-specialised dairy'), d:E('Hatos medianos con pastoreo y suplemento en pesebre, ordeña mecánica y venta a acopiadores.','Medium herds grazing with manger supplement, machine milking and sale to collectors.'),
      r:[[E('Lecheras','Dairy'),['Holstein','Jersey','Pardo Suizo']],[E('Cruzas','Crosses'),['Cruza Holstein × Jersey','Cruza Holstein × cebú']]]},
    {id:'lecheint', reg:'int', n:E('Lechería especializada o intensiva (estabulada)','Specialised intensive dairy (housed)'), d:E('Vacas estabuladas con ración total mezclada, ordeña mecanizada dos o tres veces al día y alta producción por vaca.','Housed cows on total mixed ration, machine milked two or three times a day, high yield per cow.'),
      r:[[E('Lecheras','Dairy'),['Holstein','Jersey','Pardo Suizo']],[E('Cruzas','Crosses'),['Cruza Holstein × Jersey']]]}]},
  {id:'doble', n:E('Doble propósito (carne y leche)','Dual purpose (beef and milk)'), col:'#6b8f3e', sis:[
    {id:'dobletrop', reg:'ext', n:E('Doble propósito tropical','Tropical dual purpose'), d:E('Vacas cruzadas en pastoreo que se ordeñan con el becerro al pie; se vende leche y becerro destetado.','Crossbred grazing cows milked with the calf at foot; milk and weaned calves are sold.'),
      r:[[E('Cruzas','Crosses'),['Cruza cebú × Pardo Suizo','Cruza cebú × Holstein','Cruza cebú × Simmental','Gyrolando']],[E('Razas','Breeds'),['Pardo Suizo','Simmental','Gyr','Sardo Negro','Criollo Lechero Tropical']]]}]}
];
const bovSisSel = ()=>{ const p=BOV.find(b=>b.id===S.bovProp)||BOV[0]; return p.sis.find(s=>s.id===S.bovSis)||p.sis[0]; };
const bovTexto = ()=>{ const p=BOV.find(b=>b.id===S.bovProp)||BOV[0], s=bovSisSel(); return tx(p.n)+' · '+tx(s.n)+' ('+tx(REGIMEN[s.reg]).toLowerCase()+')'+(S.bovRaza?' · '+S.bovRaza:''); };

/* ---------- Estado / state ---------- */
let S;
function estadoInicial(){ return {
  bloque:'inicio', visitados:{},
  proyecto:{nombre:'', productor:'', fecha:new Date().toISOString().slice(0,10), notas:''},
  cultivo:'maiz', sistema:'milpa', tipoUP:0, superficie:1.5,
  edo:'21', mun:'026', loc:'0001',
  granja:[],                       // especies de la granja de traspatio
  maizTipo:'nativo', maizRaza:'', maizVar:'',   // subcategoría del maíz
  bovProp:'carne', bovSis:'vacabecerro', bovRaza:'',   // subcategoría de bovinos
  catExtra:[],                     // cultivos y especies agregados por el usuario {id, tipo, n, sci, col}
  variedad:{},                     // cultivo -> variedad, tipo o raza elegida o escrita
  sisExtra:[],                     // sistemas de producción agregados por el usuario {id, n, d}
  upOtro:'',                       // tipo de unidad escrito por el usuario (tipoUP = -1)
  regen:{}, regenBase:null, regenMO:{},   // perillas de regeneración (0–4), línea base y materia orgánica
  riesgo:{},                       // riesgo -> {p, i, c, off}
  prosp:null,                      // supuestos editados de la prospectiva (null = valores iniciales)
  reqInn:[],                       // [{t, b, d, fuente}]
  manejo:{},                       // n paso -> {off:{codigo:true}, inn:[{t, el:[ids], imp:[5], nota}], imp:{codigo:[5]}}
  elemExtra:[],                    // elementos agregados por el usuario {id,cat,n}
  precio:{},                       // id -> {p:precio unitario, u:unidad, q:cantidad por ha}
  valor:{},                        // id -> {eco,uso,cul,eia} 0..5
  pesosValor:{eco:1,uso:1,cul:1,eia:1},
  carbono:{diesel:'', nKg:'', urea:'', rend:''},
  siembraDia:79,                  // fecha de siembra (día del año; 79 = 21 de marzo)
  fechas:{},                       // n paso -> {ini, fin, ev}
  formulado:false
}; }
function guardar(){ try{ localStorage.setItem('telar_v2', JSON.stringify(S)); }catch(e){} }
function cargar(){ try{ const g=JSON.parse(localStorage.getItem('telar_v2')||'null'); if(g && g.manejo) return Object.assign(estadoInicial(), g); }catch(e){} return estadoInicial(); }
const sistemasTodos = ()=> SISTEMAS.concat((S.sisExtra||[]).map(x=>({id:x.id, n:x.n, d:x.d, doc:false, usuario:true})));
const sistemaSel = ()=> sistemasTodos().find(s=>s.id===S.sistema) || SISTEMAS[0];
const tipoUPTexto = ()=> +S.tipoUP===-1 ? (S.upOtro||T('Otro','Other')) : tx(TIPOS_UP[S.tipoUP]||TIPOS_UP[0]);
const cultivoSel = ()=> catalogoTodos().find(c=>c.id===S.cultivo) || CATALOGO[0];
const conStack = ()=> cultivoSel().doc==='stack';
/* Lugares de trabajo del autor (accesos directos del Bloque 2) */
const LUGARES = [
  {edo:'21', mun:'026', loc:'0001', n:E('Calpan, Puebla · caso documentado','Calpan, Puebla · documented case')},
  {edo:'30', mun:'134', loc:'0018', n:E('Mata de Zarza, Puente Nacional, Veracruz','Mata de Zarza, Puente Nacional, Veracruz')}
];
