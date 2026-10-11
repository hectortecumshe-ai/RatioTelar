"use strict";
/* =====================================================================
   Variedades, tipos y razas por cultivo o especie (Bloque 1).
   El maíz (64 razas, CONABIO) y los bovinos (propósito → sistema → razas)
   tienen su propia tarjeta. Para los demás, esta es una lista orientativa
   de variedades, tipos o razas que se cultivan o crían en México:
   «Lectura de Ratio Telar». Siempre puede escribirse una variedad propia.
   Para variedades registradas, el referente oficial es el Catálogo Nacional
   de Variedades Vegetales del SNICS; para razas, las asociaciones de criadores.
   ===================================================================== */
const VARIEDADES = {
  uva:{e:E('Variedad','Variety'), g:[
    [E('De mesa','Table'),['Flame Seedless','Perlette','Superior Seedless (Sugraone)','Summer Royal','Red Globe','Thompson Seedless']],
    [E('Para vino (tintas)','Wine (red)'),['Cabernet Sauvignon','Merlot','Tempranillo','Nebbiolo','Syrah','Garnacha (Grenache)','Zinfandel']],
    [E('Para vino (blancas)','Wine (white)'),['Chardonnay','Chenin Blanc','Sauvignon Blanc']]]},
  chayote:{e:E('Tipo','Type'), g:[
    [E('Grupos varietales','Varietal groups'),['Virens levis (verde liso)','Nigrum spinosum (verde oscuro con espinas)','Nigrum xalapensis','Albus levis (blanco liso)','Albus dulcis','Albus minor','Nigrum maxima']]]},
  frijol:{e:E('Variedad','Variety'), g:[
    [E('Negros','Black'),['Negro Jamapa','Negro San Luis']],
    [E('Pintos y bayos','Pinto and bayo'),['Pinto Saltillo','Bayo']],
    [E('Flor de mayo y de junio','Flor de mayo and junio'),['Flor de Mayo','Flor de Junio']],
    [E('Amarillos','Yellow'),['Azufrado','Peruano (Mayocoba)']],
    [E('Otras especies','Other species'),['Ayocote (Phaseolus coccineus)','Criollo local']]]},
  calabaza:{e:E('Especie o tipo','Species or type'), g:[
    [E('Especies cultivadas en México','Species grown in Mexico'),['Calabacita (Cucurbita pepo)','Calabaza de Castilla (C. moschata)','Calabaza pipiana (C. argyrosperma)','Chilacayote (C. ficifolia)','Calabaza (C. maxima)']]]},
  chile:{e:E('Tipo','Type'), g:[
    [E('Frescos','Fresh'),['Jalapeño','Serrano','Poblano','Habanero','De árbol','Manzano (C. pubescens)','Piquín','Chilaca']],
    [E('Secos (nombre del fruto seco)','Dried (name of dried fruit)'),['Ancho (poblano seco)','Pasilla (chilaca seca)','Guajillo (mirasol seco)','Chipotle o morita (jalapeño ahumado)','Costeño','Chilhuacle']]]},
  cafe:{e:E('Variedad','Variety'), g:[
    [E('Arábigos tradicionales','Traditional arabica'),['Typica','Bourbon','Caturra','Catuaí','Mundo Novo','Garnica','Geisha']],
    [E('Tolerantes a roya','Rust-tolerant'),['Oro Azteca','Costa Rica 95','Marsellesa','Sarchimor']],
    [E('Robusta','Robusta'),['Robusta (Coffea canephora)']]]},
  cacao:{e:E('Grupo genético','Genetic group'), g:[
    [E('Grupos','Groups'),['Criollo','Forastero','Trinitario']]]},
  aguacate:{e:E('Variedad','Variety'), g:[
    [E('Comerciales','Commercial'),['Hass','Méndez','Fuerte','Bacon','Reed','Pinkerton']],
    [E('Criollos','Landrace'),['Criollo (raza mexicana, var. drymifolia)']]]},
  maguey:{e:E('Especie','Species'), g:[
    [E('Mezcaleros y tequileros','Mezcal and tequila'),['Espadín (Agave angustifolia)','Azul (A. tequilana Weber var. azul)','Tobalá (A. potatorum)','Cuishe (A. karwinskii)','Papalote (A. cupreata)','Cenizo (A. durangensis)','Tepeztate (A. marmorata)']],
    [E('Pulqueros y otros','Pulque and others'),['Pulquero (A. salmiana)','Americano (A. americana)']]]},
  nopal:{e:E('Variedad o tipo','Variety or type'), g:[
    [E('Nopal verdura','Vegetable pads'),['Milpa Alta','Atlixco','Copena V1']],
    [E('Tuna','Prickly pear fruit'),['Cristalina','Burrona','Alfajayucan','Rojo pelón']],
    [E('Forrajero y otros','Forage and others'),['Nopal forrajero','Xoconostle']]]},
  jitomate:{e:E('Tipo','Type'), g:[
    [E('Tipos','Types'),['Saladette (Roma)','Bola','Cherry (cereza)','Uva','Riñón (criollo)']]]},
  trigo:{e:E('Tipo','Type'), g:[
    [E('Tipos','Types'),['Harinero suave (Triticum aestivum)','Harinero fuerte (T. aestivum)','Cristalino o duro (T. durum)']]]},
  cana:{e:E('Variedad','Variety'), g:[
    [E('Comerciales','Commercial'),['CP 72-2086','Mex 69-290','Mex 79-431','ATEMEX 96-40','CO 997']]]},
  jamaica:{e:E('Variedad o tipo','Variety or type'), g:[
    [E('Tipos','Types'),['Criolla (Guerrero, Oaxaca)','Sudán','China','Tecoanapa','Colima']]]},
  maracuya:{e:E('Tipo','Type'), g:[
    [E('Formas','Forms'),['Amarillo (P. edulis f. flavicarpa)','Morado (P. edulis f. edulis)']]]},
  guanabana:{e:E('Tipo','Type'), g:[
    [E('Tipos','Types'),['Criolla (selección local)']]]},
  mango:{e:E('Variedad','Variety'), g:[
    [E('Mexicanas','Mexican'),['Ataulfo','Manila','Criollo o petacón']],
    [E('De Florida','Florida'),['Tommy Atkins','Kent','Keitt','Haden']]]},
  porcino:{e:E('Raza','Breed'), g:[
    [E('Comerciales','Commercial'),['Yorkshire (Large White)','Landrace','Duroc','Hampshire','Pietrain','Berkshire','Cruza comercial']],
    [E('Criollas','Landrace'),['Pelón mexicano','Cuino','Criollo']]]},
  ovino:{e:E('Raza','Breed'), g:[
    [E('De pelo','Hair'),['Pelibuey','Blackbelly (Barbados)','Katahdin','Dorper']],
    [E('De lana','Wool'),['Suffolk','Hampshire','Rambouillet','Criollo de lana']]]},
  caprino:{e:E('Raza','Breed'), g:[
    [E('Lecheras','Dairy'),['Alpina','Saanen','Nubia','Toggenburg','La Mancha']],
    [E('De carne y criollas','Meat and landrace'),['Boer','Criolla']]]},
  ave:{e:E('Raza o tipo','Breed or type'), g:[
    [E('Gallinas','Hens'),['Criolla (de rancho)','Cuello desnudo','Rhode Island Red','Plymouth Rock (barrada)','Leghorn']],
    [E('Otras aves','Other birds'),['Guajolote nativo (Meleagris gallopavo)','Pato','Codorniz']]]},
  abeja:{e:E('Tipo de abeja','Bee type'), g:[
    [E('Abeja melífera','Honeybee'),['Africanizada','Italiana (A. m. ligustica)','Carniola (A. m. carnica)','Europea (sin especificar)']],
    [E('Nativas sin aguijón','Native stingless'),['Melipona beecheii (xunáan kab)','Scaptotrigona mexicana']]]},
  conejo:{e:E('Raza','Breed'), g:[
    [E('Razas','Breeds'),['Nueva Zelanda blanco','California','Chinchilla','Rex','Mariposa','Gigante de Flandes']]]},
  gallo:{e:E('Línea','Line'), g:[
    [E('Líneas de gallo de pelea','Gamefowl lines'),['Kelso','Hatch','Sweater','Albany','Asil','Criollo']]]}
};
const ICO_NUEVO = {cultivo:'i-semilla', especie:'a-granja'};
const COL_NUEVO = ['#7a9a3a','#b0703e','#2f7d8a','#a87612','#7a4f9a','#c2185b','#3f6b2a','#8a5a2c'];
const catalogoTodos = ()=> CATALOGO.concat((S.catExtra||[]).map(x=>({...x, ico:ICO_NUEVO[x.tipo], doc:'base', usuario:true})));
const variedadTexto = ()=>{ const v=(S.variedad||{})[S.cultivo]; return v||''; };
function tarjetaVariedad(c){
  if(c.id==='maiz'||c.id==='bovino'||c.especial) return '';
  const V=VARIEDADES[c.id]||null, val=(S.variedad||{})[c.id]||'', et=V?tx(V.e):T('Variedad, tipo o raza','Variety, type or breed');
  return `<div class="card aparece" style="border-top:4px solid ${c.col}"><div class="row between"><h3 style="margin:0">${ill(c.ico,'','width:34px;height:40px;vertical-align:middle;margin-right:6px')}${esc(et)} · ${esc(tx(c.n))}</h3>${V?marcaInterp(T('Lista orientativa de lo que se cultiva o cría en México','Indicative list of what is grown or raised in Mexico')):''}</div>
    <label class="f" style="margin-top:8px"><span>${esc(et)}</span><input id="varIn" list="varLista" value="${esc(val)}" placeholder="${T('elige abajo o escribe la tuya, tal como la nombras en tu localidad','pick below or type your own, as it is named locally')}"><datalist id="varLista">${V?V.g.flatMap(g=>g[1]).map(r=>`<option value="${esc(r)}">`).join(''):''}</datalist></label>
    ${V?`<div class="razas">${V.g.map(g=>`<div><b>${esc(tx(g[0]))}</b> <span class="muted">(${g[1].length})</span><div class="elchips">${g[1].map(r=>`<button type="button" class="elchip ${val===r?'on':''}" style="--ec:${c.col}" data-var="${esc(r)}">${esc(r)}</button>`).join('')}</div></div>`).join('')}</div>
    <div class="fuente">${T('Lista orientativa, no exhaustiva: «Lectura de Ratio Telar». Para variedades registradas consulta el Catálogo Nacional de Variedades Vegetales (SNICS); para razas, la asociación de criadores. Si la tuya no está, escríbela arriba.','Indicative, non-exhaustive list: «Ratio Telar reading». For registered varieties see the National Catalogue of Plant Varieties (SNICS); for breeds, the breeders’ association. If yours is missing, type it above.')}</div>`
    :`<p class="nota">${T('Para este cultivo o especie no hay lista precargada: escribe su variedad, tipo o raza.','There is no preset list for this crop or species: type its variety, type or breed.')}</p>`}</div>`; }
function tarjetaNuevoCultivo(tipo){
  return `<details class="sis-nuevo cat-nuevo"><summary>＋ ${tipo==='especie'?T('¿No está tu especie? Agrégala al catálogo','Your species is missing? Add it to the catalogue'):T('¿No está tu cultivo? Agrégalo al catálogo','Your crop is missing? Add it to the catalogue')}</summary>
    <div class="grid g2"><label class="f"><span>${T('Nombre común','Common name')}</span><input id="catN" maxlength="60" placeholder="${tipo==='especie'?T('p. ej., Codorniz, Tilapia, Borrego cimarrón','e.g., Quail, Tilapia, Bighorn sheep'):T('p. ej., Pitahaya, Vainilla, Amaranto','e.g., Dragon fruit, Vanilla, Amaranth')}"></label>
    <label class="f"><span>${T('Nombre científico (opcional)','Scientific name (optional)')}</span><input id="catS" maxlength="80" placeholder="${tipo==='especie'?'Oreochromis niloticus':'Vanilla planifolia'}"></label></div>
    <button type="button" class="btn sm" id="catAdd" data-tipo-nuevo="${tipo}">${T('Agregar y elegir','Add and select')}</button>
    <p class="nota">${T('Quedará como «Por documentar»: el manejo, los elementos y los precios se capturan desde cero, con la ventana de ejemplo de Calpan como guía.','It will be marked “To document”: management, elements and prices are entered from scratch, with the Calpan example window as a guide.')}</p></details>`; }
